<?php
/**
 * CacheService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

use Application\Data\ApplicationDataManager;

use Zend\Http\Client;
use Content\Data\PageDataManager;


class CacheService {

	protected $container;

	protected $cache;

	/**
	 * Услуга за работа с OpenId Connect.
	 *
	 * @var \Application\Service\OidcService
	 * */
	protected $oidcService;

	public function __construct($container) {

		$this->container = $container;

		$this->cache = $container->get('WinCache');

		$this->oidcService = $container->get(OidcService::class);
	}

	/**
	 * Номенклатура със сатуси при процес на регистрация на външен потребител
	 *
	 * @return array
	 */
	public static function getUserProcessStatus() {

		return [
			'ACTIVATE_USER' => 1,
			'CHANGE_PASSWORD' => 2,
		];
	}

	/**
	 * Статична номенклатура "Статус на заявка за специални права"
	 *
	 * @return array;
	 */
	public function getSpecialAccessStatusList() {

		return [
			0	=> 'EP_USR_SP_ACCESS_WAITING_L',
			1	=> 'EP_USR_SP_ACCESS_APPROVED_L',
			2	=> 'EP_USR_SP_ACCESS_DISAPPROVED_L'
		];
	}

	/**
	 * Статична номенклатура "Статус потребител"
	 *
	 * @return array
	 */
	public function getUserStatusList() {
		return [
			'WAITING' => 0,
			'ACTIVE' => 1,
			'INACTIVE' => 2,
			'LOCKED' => 3
		];
	}

	/**
	 * Статична номенклатура "Регистрация"
	 *
	 * @return array
	 */
	public function getUserAuthTypeList() {

		return [
			'PASSWORD' 		=> 1,
			'CERTIFICATE'	=> 3
		];
	}

	/**
	 * Статична номенклатура "Статус на времеви токън"
	 *
	 * @return array
	 */
	public function getProcessStatusList() {
		return [
			'UNUSED' => 0,
			'USED' => 1,
			'CANCELED' => 2
		];
	}

	/**
	 * Връща списък с езици
	 *
	 * @return array
	 */
	public function getLanguages($getActive = true) {

		try {
			$languagesType = $getActive ? 'activeLanguages' : 'allLanguages';

			$getConfig = $this->container->get('configuration')['config'];
			$config = array_merge($this->getParamList(), $getConfig);

			if (!isset($config['GL_EPZEU_API']))
				return false;

			if ($langArr = $this->cache->getItem($languagesType)) {

				if ($langArr['nextPolling'] > time())
					return $langArr['data'];

				$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$langArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem($languagesType, $langArr);
			}

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $config['GL_EPZEU_API'];
			$uriParams = [$config['rest_service']['language']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $config['http_client']['adapter'];
			$httpAdapterConfig 	= $config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);

			$headers = [
				'Content-Type' => 'application/json',
				'Authorization' => 'Bearer '.$apiAuthToken,
			];

			if (isset($langArr['eTag']))
				$headers['If-None-Match'] = $langArr['eTag'];

			$client
				->setHeaders($headers)
				->setMethod('GET');

			$response = $client->send();

			$responseCode = $response->getStatusCode();

			// Данните не са обновeни
			if ($responseCode == 304 && !empty($langArr))
				return $langArr['data'];

			if (!$response->isOk()) {

				$tryCount = 4;
				$retryIntervalInSeconds = 1;

				$ii = 2;

				while ($ii <= $tryCount) {

					$response = $client->send();

					if ($response->isOk())
						break;

					sleep($retryIntervalInSeconds);

					$ii++;
				}
			}

			if (!$response->isOk()) {

				if (!empty($langArr)) {
					$langArr['nextPolling'] = time();
					$this->cache->replaceItem($languagesType, $langArr);
				}

				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());
			}

			$result = json_decode($response->getBody(), true);

			$normalizeArray = [];

			$filter = new \Zend\Filter\Word\CamelCaseToUnderscore();

			$languageArr = [];

			foreach ($result as $language) {

				if ($getActive && !$language['isActive'])
					continue;

				foreach ($language as $key => $value)
					$normalizeArray[strtolower($filter->filter($key))] = $value;

				$languageArr[strtolower($language['code'])] = $normalizeArray;
			}

			$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
			$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

			$eTag = $response->getHeaders()->get('ETag');

			$cacheArray = [
				'eTag' 			=> $eTag->getFieldValue(),
				'nextPolling'	=> $nextPolling,
				'data'			=> $languageArr
			];

			if ($getActive)
				$this->cache->setItem('activeLanguages', $cacheArray);
			else
				$this->cache->setItem('allLanguages', $cacheArray);

			return $languageArr;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Languages', 'API');
			return [];
		}
	}


	/**
	 * Връща идентификатор на език по подразбиране
	 *
	 * @return int
	 */
	public function getDefaultLanguageId() {

		if ($defaultLanguageId = $this->cache->getItem('defaultLanguageId'))
			return $defaultLanguageId;

		$languages = $this->getLanguages();

		$this->cache->setItem('defaultLanguageId', $languages['bg']['language_id']);

		return $languages['bg']['language_id'];
	}

	/**
	 * Връща код на език по подразбиране
	 *
	 * @return int
	 */
	public function getDefaultLanguageCode() {

		if ($defaultLanguageCode = $this->cache->getItem('defaultLanguageCode'))
			return $defaultLanguageCode;

		$languages = $this->getLanguages();

		$defaultLanguageCode = isset($languages['bg']['code']) ? $languages['bg']['code'] : 'bg';

		$this->cache->setItem('defaultLanguageCode', $defaultLanguageCode);

		return $defaultLanguageCode;
	}


	/**
	 * Номенклатура с тип на параметър
	 *
	 * @return array
	 */
	public static function getParamTypeList() {

		return [
			'GL_DATE_HOUR_MINUTE_L' => 1,
			'GL_TIME_TERM_L' => 2,
			'GL_STRING_L' => 3,
			'GL_INTEGER_L' => 4,
			'GL_HOUR_MINUTE_L' => 5
		];
	}


	/**
	 * Номенклатура "Обекти за одит"
	 *
	 * @return array
	 */
	public function getAuditObjectTypes() {

		return [
			'EAU_APPLICATION' 			=> 1, // Заявление за ЕАУ
			'USER_REGISTRATION_REQUEST' => 2, // Заявка за регистрация на потребител
			'TRRULNC_BATCH' 			=> 3, // Партида в ТРРЮЛНЦ
			'USER_PROFILE' 				=> 4, // Потребителски профил
			'PERMISSION' 				=> 5, // Права за достъп
			'SPECIAL_ACCESS_REQUEST' 	=> 6, // Заявка за специален достъп
			'USER_CERTIFICATE'			=> 7  // Средство за автентикация

		];
	}

	/**
	 * Номенклатура "Действия за одит"
	 *
	 * @return array
	 */
	public function getAuditActionTypes() {

		return [
			'SUBMISSION' 		=> 1, // Подаване
			'PREVIEW' 			=> 2, // Преглед
			'EDIT' 				=> 3, // Редакция
			'REGISTRATION' 		=> 4,
			'APPROVAL' 			=> 5,
			'REJECTION' 		=> 6,
			'ATTACH_DOCUMENT' 	=> 7,
			'CONFIRMATION'		=> 8,
			'ADD'				=> 10, // Добавяне,
			'DELETE'			=> 11 // Изтриване
		];
	}

	/**
	 * Взима функционалности използвани при одит
	 *
	 * @return array
	 */
	public function getAuditFunctionalityList() {
		return [
			'USERS' => 5
		];
	}

	/**
	 * Номенклатура "Функционалности"
	 *
	 * @return array
	 */
	public function getFunctionalityList() {

		$appDM = $this->container->get(ApplicationDataManager::class);

		$result = $appDM->getFunctionalityList();

		$functionalityArr = [];

		foreach ($result as $id => $functionality)
			$functionalityArr[$id] = $functionality;

		return $functionalityArr;
	}


	/**
	 * Взима модули използвани при одит
	 *
	 * @return array
	 */
	public function getAuditModuleList() {

		return [
			'EPZEU' => 1,
			'CR'	=> 2,
			'PR'	=> 3,
		];
	}


	/**
	 * Взима списък с модул и ИС
	 *
	 * @return array
	 */
	public function getModuleList() {

		$appDM = $this->container->get(ApplicationDataManager::class);

		$result = $appDM->getModuleList();

		$moduleArr = [];

		foreach ($result as $row)
			$moduleArr[$row['module_id']] = $row['name'];

		return $moduleArr;
	}

	/**
	 * Номенклатура със списък регистри в ЕПЗЕУ
	 *
	 * @return array
	 */
	public static function getRegisterList() {

		return [
			'CR' => 1,
			'PR' => 2
		];
	}


	/**
	 * Извлича списък с параметри
	 *
	 * @return array
	 */
	public function getParamList() {

		try {

			if ($isAppParamsDown = $this->cache->getItem('isAppParamsDown'))
				return [];

			if ($paramArr = $this->cache->getItem('paramList')) {

				if ($paramArr['nextPolling'] > time())
					return $paramArr['data'];

				$interval = \Application\Service\AppService::fromPg($paramArr['data']['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$paramArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem('paramList', $paramArr);
			}

			if (!$apiAuthToken = $this->oidcService->getApiAuthentication())
				return [];

			$config = $this->container->get('configuration')['config'];

			$url = $config['rest_service']['parameter'];

			$httpAdapter 		= $config['http_client']['adapter'];
			$httpAdapterConfig 	= $config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);

			$headers = [
				'Content-Type' => 'application/json',
				'Authorization' => 'Bearer '.$apiAuthToken,
			];

			if (isset($paramArr['eTag']))
				$headers['If-None-Match'] = $paramArr['eTag'];

			$client
				->setHeaders($headers)
				->setMethod('GET');

			$response = $client->send();

			$responseCode = $response->getStatusCode();

			// Данните не са обновeни
			if ($responseCode == 304 && !empty($paramArr))
				return $paramArr['data'];

			if (!$response->isOk()) {

				$tryCount = 4;
				$retryIntervalInSeconds = 1;

				$ii = 2;

				while ($ii <= $tryCount) {

					$response = $client->send();

					if ($response->isOk())
						break;

					sleep($retryIntervalInSeconds);

					$ii++;
				}
			}

			if (!$response->isOk()) {

				if (!empty($paramArr)) {
					$paramArr['nextPolling'] = time();
					$this->cache->replaceItem('paramList', $paramArr);
				}

				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());
			}

			$result = json_decode($response->getBody());

			if (empty($result))
				return [];

			$paramArr = [];

			$paramTypeList = self::getParamTypeList();

			foreach ($result as $dataObj) {

				$paramType = array_search($dataObj->parameterType, $paramTypeList);

				switch ($paramType) {

					case 'GL_DATE_HOUR_MINUTE_L':
						$paramArr[$dataObj->code] = \DateTime::createFromFormat(\DateTime::ATOM, $dataObj->valueDateTime)->format('Y-m-d H:i');
						break;

					case 'GL_TIME_TERM_L':

						$milliseconds = 0;
						$matches = array();
						preg_match("/([0-9]*[.,]?[0-9]*)[S]/", $dataObj->valueInterval, $matches);

						if (!empty($matches[0])) {

							$matchesArr = explode(".", $matches[0]);

							// милисекунди
							if (!empty($matchesArr[1])) {

								$milliseconds = substr($matchesArr[1], 0, -1);
								$milliseconds = sprintf('%03d', round($milliseconds / pow(10,strlen($milliseconds) - 3)));

								$original = $matches[0];
								$seconds = $matchesArr[0];
								$dataObj->valueInterval = str_replace($original, $seconds."S", $dataObj->valueInterval);
							}
						}

						$interval = new \DateInterval($dataObj->valueInterval);

						$dateInterval = '';

						$days = $interval->format('%d');
						if ($days)
							$dateInterval = $days.' days ';

						$dateInterval .= $interval->format('%H:%I:%S');

						$paramArr[$dataObj->code] = $dateInterval.(!empty($milliseconds) ? '.'.$milliseconds : '');
						break;

					case 'GL_STRING_L':
						$paramArr[$dataObj->code] = $dataObj->valueString;
						break;

					case 'GL_INTEGER_L':
						$paramArr[$dataObj->code] = $dataObj->valueInt;
						break;

					case 'GL_HOUR_MINUTE_L':
						$paramArr[$dataObj->code] = \DateTime::createFromFormat(\DateTime::ATOM, $dataObj->valueHour)->format('H:i');
						break;
				}
			}

			$eTag = $response->getHeaders()->get('ETag');

			$interval = \Application\Service\AppService::fromPg($paramArr['EP_POLLING_INTERVAL']);
			$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

			$cacheArray = [
				'eTag' 			=> $eTag->getFieldValue(),
				'nextPolling'	=> $nextPolling,
				'data' 			=> $paramArr,
			];

			$this->cache->setItem('paramList', $cacheArray);

			return $paramArr;
		}
		catch (\Exception $e) {

			$cacheOptions = $this->cache->getOptions();
			$oldTtl = $cacheOptions->getTtl();
			$cacheOptions->setTtl(10);
			$this->cache->setItem('isAppParamsDown', true);
			$cacheOptions->setTtl($oldTtl);

			AppService::handleException($e, 'E_ERROR', 'Parameters', 'API');
			return [];
		}
	}

	/**
	 * Генерира масив с линкове на страници в публична част
	 *
	 * @return array
	 */
	public function getPageTitle($langId) {

		try{

			if ($pageArr = $this->cache->getItem($langId.'-pageTitle'))
				return $pageArr;

			$pageDM = $this->container->get(PageDataManager::class);

			$redefinedPage = $pageDM->getPageList($totalCount, $langId, ['totalCount' => false], \Content\Controller\PageController::REDEFINED_PAGE);

			$pageArr = [];

			foreach ($redefinedPage as $pageObj)
				$pageArr[$pageObj->getURL()] = $pageObj->getTitle();

			$paramArr = $this->getParamList();


			if (isset($paramArr['GL_POLLING_INTERVAL'])) {

				$interval = \Application\Service\AppService::fromPg($paramArr['GL_POLLING_INTERVAL']);

				$ttl = ($interval->d * 24 * 60 * 60) + ($interval->h * 60 * 60) + ($interval->i * 60) + $interval->s;

				$cacheOptions = $this->cache->getOptions();

				$oldTtl = $cacheOptions->getTtl();

				$cacheOptions->setTtl($ttl);

				$this->cache->setItem($langId.'-pageTitle', $pageArr);

				$cacheOptions->setTtl($oldTtl);
			}

			return $pageArr;
		}
		catch (\Exception $e) {

			AppService::handleException($e, 'E_ERROR', 'COMMON_ERROR_MESSAGE');

			return [];
		}
	}

	/**
	 * Извлича списък със статични страници.
	 *
	 * @return array
	 */
	public function getStaticPageList() {

		try {

			$getConfig = $this->container->get('configuration')['config'];
			$config = array_merge($this->getParamList(), $getConfig);

			if ($paramArr = $this->cache->getItem('staticPageList')) {

				if (isset($config['EP_POLLING_INTERVAL'])) {

					if ($paramArr['nextPolling'] > time())
						return $paramArr['data'];

					$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
					$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

					$paramArr['nextPolling'] = $nextPolling;
					$this->cache->replaceItem('staticPageList', $paramArr);
				}
			}

			if (!$apiAuthToken = $this->oidcService->getApiAuthentication())
				return false;

			if (!isset($config['GL_EPZEU_API']))
				return false;

			$host = $config['GL_EPZEU_API'];
			$url = \Application\Service\AppService::genUrl($host, [$config['rest_service']['static_page']]);

			$httpAdapter 		= $config['http_client']['adapter'];
			$httpAdapterConfig 	= $config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);

			$headers = [
				'Content-Type' => 'application/json',
				'Authorization' => 'Bearer '.$apiAuthToken,
			];

			if (isset($paramArr['eTag']))
				$headers['If-None-Match'] = $paramArr['eTag'];

			$client
			->setHeaders($headers)
			->setMethod('GET');

			$response = $client->send();

			$responseCode = $response->getStatusCode();

			// Данните не са обновeни
			if ($responseCode == 304 && !empty($paramArr))
				return $paramArr['data'];

			if (!$response->isOk()) {

				$tryCount = $config['GL_API_TRY_COUNT'];
				$apiRetryInterval  = $config['GL_API_RETRY_INTERVAL'];

				$dateInterval = AppService::fromPg($apiRetryInterval);
				$retryIntervalInSeconds = AppService::dateIntervalToSeconds($dateInterval);

				$ii = 2;

				while ($ii <= $tryCount) {

					$response = $client->send();

					if ($response->isOk())
						break;

					sleep($retryIntervalInSeconds);

					$ii++;
				}
			}

			if (!$response->isOk()) {

				if (!empty($paramArr)) {
					$paramArr['nextPolling'] = time();
					$this->cache->replaceItem('staticPageList', $paramArr);
				}

				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());
			}

			$staticPageList = json_decode($response->getBody());

			$staticPageArr = [];

			foreach ($staticPageList as $staticPage)
				$staticPageArr[$staticPage->pageKey] = $staticPage;

			$eTag = $response->getHeaders()->get('ETag');

			$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
			$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

			$cacheArray = [
				'eTag' 			=> $eTag->getFieldValue(),
				'nextPolling'	=> $nextPolling,
				'data' 			=> $staticPageArr,
			];

			$this->cache->setItem('staticPageList', $cacheArray);

			return $staticPageArr;

		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'StaticPageList', 'API');
			return [];
		}
	}

	/**
	 * Генерира етикети
	 *
	 * @param string $lang
	 * @return boolean
	 */
	public function createLabels($langCode) {

		try {

			$getConfig = $this->container->get('configuration')['config'];

			$config = array_merge($this->getParamList(), $getConfig);

			if (!is_dir(getcwd().'/data/language/'))
				mkdir(getcwd().'/data/language/', 0775, true);

			$langFilePath = getcwd().'/data/language/'.$langCode.'.php';

			if (($paramArr = $this->cache->getItem('labelList')) && file_exists($langFilePath)) {

				if (isset($config['EP_POLLING_INTERVAL'])) {
					if ($paramArr['nextPolling'] > time())
						return true;

					$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
					$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

					$paramArr['nextPolling'] = $nextPolling;
					$this->cache->replaceItem('labelList', $paramArr);
				}
			}

			if (!isset($config['GL_EPZEU_API']))
				return false;

			$host = $config['GL_EPZEU_API'];
			$uriParams = [$config['rest_service']['label'], $langCode];
			$queryParams = ['prefixes' => 'GL,EP,CR_GL_,PR_GL_'];

			$url = \Application\Service\AppService::genUrl($host, $uriParams, $queryParams);

			$headers['Content-Type'] = 'application/json';

			if (isset($paramArr['eTag']) && file_exists($langFilePath))
				$headers['If-None-Match'] = $paramArr['eTag'];

			$httpAdapter 		= $config['http_client']['adapter'];
			$httpAdapterConfig 	= $config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client
			->setHeaders($headers)
			->setMethod('GET');

			$response = $client->send();

			$responseCode = $response->getStatusCode();

			// Данните не са обновeни
			if ($responseCode == 304 && !empty($paramArr))
				return true;

			if (!$response->isOk()) {

				$tryCount = $config['GL_API_TRY_COUNT'];
				$apiRetryInterval  = $config['GL_API_RETRY_INTERVAL'];

				$dateInterval = AppService::fromPg($apiRetryInterval);
				$retryIntervalInSeconds = AppService::dateIntervalToSeconds($dateInterval);

				$ii = 2;

				while ($ii <= $tryCount) {

					$response = $client->send();

					if ($response->isOk())
						break;

					sleep($retryIntervalInSeconds);

					$ii++;
				}
			}

			if (!$response->isOk()) {

				if (!empty($paramArr)) {
					$paramArr['nextPolling'] = time();
					$this->cache->replaceItem('labelList', $paramArr);
				}

				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());
			}

			$labels = json_decode($response->getBody());

			$textArr = "\n";

			foreach ($labels as $k => $v)
				$textArr .= '\''.$k.'\' => \''.str_replace("'", "\'", $v).'\','."\n";

			file_put_contents($langFilePath, "<?php return [$textArr] ?>");

			opcache_reset();

			$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
			$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

			$eTag = $response->getHeaders()->get('ETag');

			$cacheArray = [
				'eTag' 			=> $eTag->getFieldValue(),
				'nextPolling'	=> $nextPolling,
			];

			$this->cache->setItem('labelList', $cacheArray);

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Labels', 'API');
			return false;
		}
	}

	/**
	 * Взима имена на обекти от номенклатура "Обекти за одит"
	 *
	 * @return array
	 */
	public function getAuditObjectNameTypes() {

		return [
				'Заявление за ЕАУ' 						=> 1, // Заявление за ЕАУ
				'Заявка за регистрация на потребител' 	=> 2, // Заявка за регистрация на потребител
				'Партида в ТРРЮЛНЦ' 					=> 3, // Партида в ТРРЮЛНЦ
				'Потребителски профил' 					=> 4, // Потребителски профил
				'Права за достъп' 						=> 5,
				'Заявка за специален достъп' 			=> 6,
				'Средство за автентикация'				=> 7,
				'Файлово съдържание'					=> 8
		];
	}

	/**
	 * Номенклатура "Действия за одит"
	 *
	 * @return array
	 */
	public function getAuditActionNameTypes() {

		return [
				'Подаване' 												=> 1, // Подаване
				'Преглед' 												=> 2, // Преглед
				'Редакция' 												=> 3, // Редакция
				'Регистрация' 											=> 4,
				'Одобряване' 											=> 5,
				'Отхвърляне' 											=> 6,
				'Прикачване на документ'								=> 7,
				'Потвърждаване'											=> 8,
				'Логин'													=> 9,
				'Добавяне'												=> 10,
				'Изтриване'												=> 11,
				'Изтегляне'												=> 12,
				'Зареждане на данни при промяна на обстоятелства'		=> 13
		];
	}

	/**
	 * Статична номенклатура "Група на права за достъп"
	 * @return array;
	 */
	public function getPermissionsGroupList() {

		return [
			'EP_USR_SPEC_RIGHTS_L'	=> 1,
			'EP_USR_FREE_ACC_RIGHTS_L'	=> 2,
			'EP_USR_ADMIN_RIGHTS_L' => 3
		];
	}

	/**
	 * Взима резултат от базата данни от кеш.
	 *
	 * @param string $cacheKey
	 */
	public function getResultsetFromCache($cacheKey) {

		if ($result = $this->cache->getItem($cacheKey)) {
			return $result;
		}

		return false;
	}

	/**
	 * Добавя резултат от заявка към базата в кеш
	 * @param string $cacheKey
	 * @param string $result
	 */
	public function addResultsetToCache($cacheKey, $result) {
		$cacheOptions = $this->cache->getOptions();
		$oldTtl = $cacheOptions->getTtl();
		$cacheOptions->setTtl(20);
		$this->cache->setItem($cacheKey, $result);
		$cacheOptions->setTtl($oldTtl);
	}
}