<?php
/**
 * RestService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

use Zend\Http\Client;
use Zend\Json\Json;

class RestService {

	/**
	 *
	 * @var array
	 */
	protected $config;

	protected $cache;

	/**
	 *
	 * @var \Application\Service\CacheService $cacheService
	 */
	protected $cacheService;

	/**
	 * Услуга за работа с OpenId Connect.
	 *
	 * @var \Application\Service\OidcService
	 * */
	protected $oidcService;

	/**
	 *
	 * @var \Nomenclature\Data\NomenclatureDataManager $nomenclatureDM
	 */
	protected $nomenclatureDM;


	const USER_CONFIRMATION = 2;
	const RESET_PASSWORD_LINK = 3;
	const SPECIAL_ACCESS_REQUEST_APPROVED = 4;
	const SPECIAL_ACCESS_REQUEST_DISAPPROVED = 5;
	const RESET_PASSWORD_OFFICIAL_MODE_LINK = 6;

	public function __construct($config, $cache, $cacheService, $oidcService, $nomenclatureDM) {
		$this->config 	= $config;
		$this->cache 	= $cache;
		$this->cacheService = $cacheService;
		$this->oidcService = $oidcService;
		$this->nomenclatureDM = $nomenclatureDM;
	}

	/**
	 * Изпращане на имейл
	 *
	 * @param int $templateId
	 * @param array $recipientList
	 * @param array $params
	 */
	public function sendEmail($templateId, $recipientList, $params='') {

		try {
			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['create_email_url']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$params = array_map('strval', $params);

			$data = [
				'TemplateID' 				=> $templateId,
				'Parameters' 				=> $params,
				'EmailPriority'				=> 2,
				'Recipients' 				=> $recipientList,
				'SeparateMailPerRecipient' 	=> true,
				'Transliterate'				=> false,
				'OperationID'				=> AppService::genToken()
			];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];
			$httpAdapterConfig['timeout'] = 180;

			$client = new Client($url, $httpAdapterConfig);
			$client
			->setUri($url)
			->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('POST')
			->setRawBody(Json::encode($data));

			$response = $client->send();

			/*
			if (!$response->isOk()) {

				$params = $this->cacheService->getParamList();

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
			*/

			if (!$response->isOk())
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			return true;

		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Email', 'API');
			return false;
		}
	}

	/**
	 * Взима видове документи през уеб услуга
	 * @return array
	 */
	public function getDocumentTypes($excludedItems = []) {

		try {

			if ($paramArr = $this->cache->getItem('docType')) {

				$docTypeArr = $paramArr;

				foreach ($excludedItems as $id => $excludedItem)
					unset ($docTypeArr[$id]);

				return $docTypeArr;
			}

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['document_types']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client
			->setHeaders(['Content-Type' => 'application/json'])
			->setMethod('GET');

			$response = $client->send();

			if (!$response->isOk()) {

				$params = $this->cacheService->getParamList();

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

			if (!$response->isOk())
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			$result = $response->getBody();

			$docTypeArr = json_decode($result);

			$docTypeList = [];

			foreach ($docTypeArr as $docType)
				$docTypeList[$docType->documentTypeID] = $docType->name;

			asort($docTypeList);

			$this->cache->setItem('docType', $docTypeList);

			foreach ($excludedItems as $id => $excludedItem)
				unset ($docTypeList[$id]);

			return $docTypeList;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Document types', 'API');
			return [];
		}
	}

	/**
	 * Одит на потребителски действия
	 *
	 * @param \Application\Entity\LogEntity $logObj
	 * @return boolean
	 */
	public function logAuditData(\Application\Entity\LogEntity $logObj, $additionalErrData = '') {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['log_action']];
			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$objectTypeList = 	$this->cacheService->getAuditObjectTypes();
			$actionTypeList = 	$this->cacheService->getAuditActionTypes();
			$moduleList     = 	$this->cacheService->getAuditModuleList();
			$functionality 	= 	$this->cacheService->getAuditFunctionalityList();

			if (!isset($objectTypeList[$logObj->getObjectType()])
					|| !isset($actionTypeList[$logObj->getActionType()])
					|| !isset($moduleList[$logObj->getModule()])
					|| !isset($functionality[$logObj->getFunctionality()])) {
						throw new \Exception('Невалидни параметри: '.$additionalErrData."\n".$logObj->getAdditionalData());
					}

			$request = new \Zend\Http\PhpEnvironment\Request();

			if ($request->getCookie()->offsetExists('EPZEUSessionID'))
				$userSessionID = $request->getCookie()->offsetGet('EPZEUSessionID');
			else {
				$userSessionID = \Application\Service\AppService::genToken();
				setcookie('EPZEUSessionID', $userSessionID, null, '/', '', true);
			}

			$data = [
				'ObjectType'		=> $objectTypeList[$logObj->getObjectType()], 			// audit.n_s_object_types
				'ActionType'		=> $actionTypeList[$logObj->getActionType()],			// audit.n_s_action_types
				'Module'			=> $moduleList[$logObj->getModule()],					// public.n_s_modules
				'Functionality'		=> $functionality[$logObj->getFunctionality()], 		// public.n_s_functionality
				'Key'				=> $logObj->getKey(), 									// за всеки обект е описан в анализа "Списък на обекти и събития....."
				'UserSessionID'		=> $userSessionID,										// потребителска сесия
				'IpAddress'			=> $_SERVER['REMOTE_ADDR'],								//
				'AdditionalData' 	=> $logObj->getAdditionalData(),						//
				'OperationID'		=> AppService::genToken()
			];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client
			->setUri($url)
			->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('POST')
			->setRawBody(Json::encode($data));

			$response = $client->send();

			if (!$response->isOk()) {

				$params = $this->cacheService->getParamList();

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

			if (!$response->isOk())
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			return true;

		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Audit', 'API');
			return false;
		}
	}

	/**
	 * Автоматично генериране на статистически отчети
	 *
	 * @param string $url
	 * @return array
	 */
	public function generateReport($url) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$httpAdapterConfig['sslverifypeer'] = false;
			$httpAdapterConfig['sslverifypeername'] = false;
			$httpAdapterConfig['timeout'] = 180;

			$client = new Client($url, $httpAdapterConfig);
			$client
			->setHeaders(['Content-Type' => 'application/json',
						'Authorization' => 'Bearer '.$apiAuthToken])
			->setMethod('GET');

			$response = $client->send();

			if (!$response->isOk()) {

				$params = $this->cacheService->getParamList();

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

			if (!$response->isOk())
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			if (!$result = $response)
				return [];

			$headers = $result->getHeaders()->toArray();

			if (empty($headers['Content-Type']) || empty($headers['Content-Length']))
				return false;

			preg_match("#(?<=filename=)(.*)(?=;)#", $headers['Content-Disposition'], $matches);

			if (empty($matches[0]))
				return [];

			$fileInfo = [
				'fileName'		=> $matches[0],
				'contentType'	=> $headers['Content-Type'],
				'fileContent'	=> $result->getBody(),
				'fileSize'		=> $headers['Content-Length']
			];

			return $fileInfo;

		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Generate Report', 'API');
			return [];
		}
	}
}