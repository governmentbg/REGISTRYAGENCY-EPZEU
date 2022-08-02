<?php
/**
 * CacheService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

use Zend\Http\Client;

class CacheService {

	/**
	 *
	 * @var \Nomenclature\Data\NomenclatureDataManager
	 */
	protected $nomenclatureDM;

	protected $cache;

	/**
	 * Услуга за работа с OpenId Connect.
	 *
	 * @var \Application\Service\OidcService
	 * */
	protected $oidcService;

	protected $config;

	public function __construct($nomenclatureDM, $cache, $oidcService, $config) {
		$this->nomenclatureDM = $nomenclatureDM;
		$this->cache = $cache;
		$this->oidcService = $oidcService;
		$this->config = $config;
	}

	/**
	 * Статична номенклатура "Статус на заявка за специални права"
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
	 * Статична номенклатура "Статус на потребител"
	 * @return array;
	 */
	public function getUserStatusList() {

		return [
			0 	=> 'EP_USR_00007_E',
			1	=> 'GL_ACTIVE_L',
			2	=> 'GL_INACTIVE_L'
		];
	}

	public function getTemplateEmailIdList() {
		return [
			'USER_CONFIRMATION' => 2,
			'RESET_PASSWORD_LINK' => 3,
			'SPECIAL_ACCESS_REQUEST_APPROVED' => 4,
			'SPECIAL_ACCESS_REQUEST_DISAPPROVED' => 5,
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
			'GL_CHOICE_ALL_L' => 3
		];
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
	 * Връща списък с всички езици
	 *
	 * @return array
	 */
	public function getLanguages() {

		try {

			$config = array_merge($this->getParamList(), $this->config);

			if ($langArr = $this->cache->getItem('allLanguages')) {

				if ($langArr['nextPolling'] > time())
					return $langArr['data'];

				$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$langArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem('allLanguages', $langArr);
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
					$this->cache->replaceItem('allLanguages', $langArr);
				}

				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());
			}

			$result = json_decode($response->getBody(), true);

			$normalizeArray = [];

			$filter = new \Zend\Filter\Word\CamelCaseToUnderscore();

			$languageArr = [];

			foreach ($result as $language) {

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

			$this->cache->setItem('allLanguages', $cacheArray);

			return $languageArr;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Languages', 'API');
			return [];
		}
	}

	/**
	 * Номенклатура със сатуси на предоставяне на услугите в ЕПЗЕУ
	 *
	 * @return array
	 */
	public static function getServiceStatusList() {

		return [
			'EP_NOM_STATUS_PROVIDED_L' => 0,
			'EP_NOM_STATUS_CANCEL_PROVIDED_L' => 1,
			'EP_NOM_STATUS_PENDING_L' => -1
		];
	}

	/**
	 * Номенклатура със списък на абревиатура на регистър в ЕПЗЕУ
	 *
	 * @return array
	 */
	public static function getRegisterAbbreviationList() {

		return [
			'GL_CR_REG_ABBREVATION_L' => 1,
			'GL_PR_REG_ABBREVATION_L' => 2
		];
	}

	/**
	 * Номенклатура със списък на кодове регистри в ЕПЗЕУ
	 *
	 * @return array
	 */
	public static function getRegisterCodeList() {

		return [
			'CR' => 1,
			'PR' => 2
		];
	}

	/**
	 * Взима списък с модул и ИС
	 *
	 * @return array
	 */
	public function getModuleList() {

		$result = $this->nomenclatureDM->getModuleList();

		$moduleArr = [];

		foreach ($result as $row)
			$moduleArr[$row['module_id']] = $row['name'];

		return $moduleArr;
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
			'PERMISSION' 				=> 5,
			'SPECIAL_ACCESS_REQUEST' 	=> 6,
			'USER_CERTIFICATE'			=> 7  // Средство за автентикация
		];
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
	public function getAuditActionTypes() {

		return [
			'SUBMISSION' 			=> 1, // Подаване
			'PREVIEW' 				=> 2, // Преглед
			'EDIT' 					=> 3, // Редакция
			'REGISTRATION' 			=> 4,
			'APPROVAL' 				=> 5,
			'REJECTION' 			=> 6,
			'ATTACH_DOCUMENT' 		=> 7,
			'CONFIRMATION'			=> 8,
			'LOGIN'					=> 9,
			'ADD'					=> 10, // Добавяне,
			'DELETE'				=> 11, // Изтриване
			'DOWNLOAD'				=> 12,
			'LOAD_DATA_FOR_CHANGE'	=> 13

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
	 * Взима модули използвани при одит
	 */
	public function getAuditModuleList() {

		return [
			'EPZEU' => 1,
			'CR'	=> 2,
			'PR'	=> 3,
		];
	}

	/**
	 * Номенклатура "Функционалности"
	 *
	 * @return array
	 */
	public function getFunctionalityList() {

		$result = $this->nomenclatureDM->getFunctionalityList();

		$functionalityArr = [];

		foreach ($result as $id => $functionality)
			$functionalityArr[$id] = $functionality;

		return $functionalityArr;

	}

	/**
	 * Номенклатура с вид на плащане по електронен път
	 *
	 * @return array
	 */
	public static function getPaymentTypeList() {

		return [
			1 => 'EP_EPAY_L',
			2 => 'EP_PERS_ACC_L',
			3 => 'EP_PEPDAEU_L'
		];
	}

	/**
	 * Номенклатура видове на услуга
	 *
	 * @return array
	 */
	public function getServiceTypeList() {

		$result = $this->nomenclatureDM->getServiceTypeList();

		$serviceTypeList = [];

		foreach ($result as $row)
			$serviceTypeList[$row['service_type_id']] = $row['description'];

		return $serviceTypeList;
	}

	/**
	 * Статична номенклатура "Статус на видео урок"
	 * @return array;
	 */
	public function getVideoStatusList() {

		return [
			'GL_F_STATE_NO_PUBLIC_L' => 0,
			'GL_F_STATE_PUBLIC_L' => 1
		];
	}


	/**
	 * Извлича списък с параметри
	 *
	 * @return array
	 */
	public function getParamList() {

		try {

			if ($paramArr = $this->cache->getItem('paramList')) {

				if ($paramArr['nextPolling'] > time())
					return $paramArr['data'];

				$interval = \Application\Service\AppService::fromPg($paramArr['data']['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$paramArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem('paramList', $paramArr);
			}

			$config 			= $this->config;
			$httpAdapter 		= $config['http_client']['adapter'];
			$httpAdapterConfig 	= $config['http_client'][$httpAdapter];

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$url = $config['rest_service']['parameter'];

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
			AppService::handleException($e, 'E_ERROR', 'Parameters', 'API');
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
	 * Извлича списък със статични страници.
	 *
	 * @return array
	 */
	public function getStaticPageList() {

		try {

			$config = array_merge($this->getParamList(), $this->config);

			if ($paramArr = $this->cache->getItem('staticPageList')) {

				if ($paramArr['nextPolling'] > time())
					return $paramArr['data'];

				$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$paramArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem('staticPageList', $paramArr);
			}

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$paramList = $this->getParamList();

			$host = $paramList['GL_EPZEU_API'];
			$url = \Application\Service\AppService::genUrl($host, [$config['rest_service']['staticPage']]);

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

				$params = $this->getParamList();

				$tryCount = $params['GL_API_TRY_COUNT'];
				$apiRetryInterval  = $params['GL_API_RETRY_INTERVAL'];

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

			$config = array_merge($this->getParamList(), $this->config);

			$langFilePath = getcwd().'/data/language/'.$langCode.'.php';

			if (($paramArr = $this->cache->getItem('labelList')) && file_exists($langFilePath)) {

				if ($paramArr['nextPolling'] > time())
					return true;

				$interval = \Application\Service\AppService::fromPg($config['EP_POLLING_INTERVAL']);
				$nextPolling = \Application\Service\AppService::dateIntervalToSeconds($interval)+time();

				$paramArr['nextPolling'] = $nextPolling;
				$this->cache->replaceItem('labelList', $paramArr);
			}

			$host = $config['GL_EPZEU_API'];
			$uriParams = [$config['rest_service']['label'], $langCode];
			$queryParams = ['prefixes' => 'GL,EP,CR_GL_,PR_GL_'];

			$url = \Application\Service\AppService::genUrl($host, $uriParams, $queryParams);

			$headers['Content-Type'] = 'application/json';

			if (isset($paramArr['eTag']))
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
			if ($responseCode == 304 && !empty($paramArr) && file_exists($langFilePath))
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

			if (!$response->isOk() && $responseCode != 304) {

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
}