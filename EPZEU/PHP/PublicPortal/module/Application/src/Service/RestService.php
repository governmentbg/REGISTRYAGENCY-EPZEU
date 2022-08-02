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
use User\Entity\EmailSubscriptionEntity;
use User\Entity\UnitedUserEntity;

class RestService {

	/**
	 *
	 * @var array
	 */
	protected $config;

	const USER_CONFIRMATION = 2;
	const RESET_PASSWORD_LINK = 3;
	const FORUM_NEW_COMMENT_NOTIFICATION = 7;

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

	public function __construct($config, $cacheService, $oidcService) {
		$this->config = $config;
		$this->cacheService = $cacheService;
		$this->oidcService = $oidcService;
	}

	/**
	 * Изпращане на имейл
	 *
	 * @param int $templateId
	 * @param string $email
	 * @param array $params
	 */
	public function sendEmail($templateId, array $emailList, $params=[]) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['create_email_url']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$recipients = [];

			foreach ($emailList as $email) {
				$recipients[] = [
					'Address' => $email,
					'DisplayName' => $email,
					'Type' => 1
				];
			}

			$params = array_map('strval', $params);

			$data = [
				'TemplateID' 				=> $templateId,
				'Parameters' 				=> $params,
				'Priority'					=> 2,
				'Recipients' 				=> $recipients,
				'SeparateMailPerRecipient' 	=> false,
				'Transliterate' 			=> false,
				'OperationID'				=> AppService::genGuid(rand().time())
			];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
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

			if (!$response->isOk() || $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\nEmail API error: {templateId: ".$templateId.', email: '.$email.'}');

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Email', 'API');
			return false;
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


			$validator = new \Zend\Validator\Uuid();

			if (!empty($_COOKIE['EPZEUSessionID']) && $validator->isValid($_COOKIE['EPZEUSessionID'])) {
				$userSessionID = $_COOKIE['EPZEUSessionID'];
			}
			else {
				$userSessionID = \Application\Service\AppService::genToken();
				setcookie('EPZEUSessionID', $userSessionID, null, '/', $this->config['GL_COMMON_COOKIE_DOMAIN'], true);
			}

			$data = [
					'ObjectType'		=> $objectTypeList[$logObj->getObjectType()], 			// audit.n_s_object_types
					'ActionType'		=> $actionTypeList[$logObj->getActionType()],			// audit.n_s_action_types
					'Module'			=> $moduleList[$logObj->getModule()],					// public.n_s_modules
					'Functionality'		=> $functionality[$logObj->getFunctionality()], 		// public.n_s_functionality
					'Key'				=> (string)$logObj->getKey(), 							// за всеки обект е описан в анализа "Списък на обекти и събития....."
					'UserSessionID'		=> $userSessionID,										// потребителска сесия
					'IpAddress'			=> $_SERVER['REMOTE_ADDR'],								//
					'AdditionalData' 	=> $logObj->getAdditionalData(),						//
					'OperationID'		=> AppService::genGuid(rand().time())
			];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
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

			if (!$response->isOk() ||  $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."Log API error: {Key: ".$logObj->getKey().', ObjectType: '.$objectTypeList[$logObj->getObjectType()].'}');

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Audit', 'API '.$additionalErrData);
			return false;
		}
	}

	/**
	 * Дължими суми по услуги
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params
	 * @return array
	 */
	public function dutyList(&$totalCount, $params = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['duty_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];

			$paramList['Register'] = $params['register'];
			$paramList['CIN'] = $params['cin'];
			$paramList['DateFrom'] = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$paramList['DateTo'] =!empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$paramList['ApplicationTypes'] = !empty($params['applicationTypeId']) ? $params['applicationTypeId'] : null;
			$paramList['ApplicationNumbers'] = !empty($params['applicationNumber']) ? $params['applicationNumber'] : null;
			$paramList['Status'] = !empty($params['isUnpaidDuty']) ? 'Requested' : null;

			$paramList['Page'] = !empty($params['cp']) ? $params['cp'] : null;
			$paramList['PageSize'] = !empty($params['rowCount']) ? $params['rowCount'] : null;

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$dutyList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			$data = [];

			foreach ($dutyList as $val)
				$data[] =  $hydrator->hydrate((array)$val, new \Payment\Entity\DutyEntity());

			$totalCount = !empty($response->getHeaders()->has('count')) ? (int)$response->getHeaders()->get('count')->getFieldValue() : 0;

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'DutyList', 'API');

			return ['status' => 'error', 'message' => 'GL_ERROR_L'];
		}
	}


	/**
	 * Задължения по услуги
	 *
	 * @param array $params
	 * @return array
	 */
	public function applicationDutyList($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['application_duty_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];

			$paramList['Register'] = !empty($params['register']) ? $params['register'] : null;
			$paramList['ApplicationNumbers'] = !empty($params['applicationNumber']) ? $params['applicationNumber'] : null;
			$paramList['ObligationNumber'] = !empty($params['obligationNumber']) ? $params['obligationNumber'] : null;
			$paramList['ObligationIDs'] = !empty($params['toObligationId']) ? $params['toObligationId'] : null;
			$paramList['Status'] = !empty($params['status']) ? $params['status'] : null;
			$paramList['CIN'] = !empty($params['cin']) ? $params['cin'] : null;

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
					'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
				])
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

			$applicationDutyList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($applicationDutyList as $val) {

				$key = !empty($params['getResultByObligation']) ? $val->obligationNumber : $val->applicationNumber;

				$data[$key][] =  $hydrator->hydrate((array)$val, new \Payment\Entity\DutyEntity());
			}

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'ApplicationDutyList', 'API');
			return [];
		}
	}


	/**
	 * Регистриране на плащане на задължение по електронен път
	 *
	 * @param \Payment\Entity\PaymentEntity $paymentObj
	 * @return boolean
	 */
	public function payDuty(\Payment\Entity\PaymentEntity $paymentObj) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['pay_duty']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$providerKind = (!empty($paymentObj->getPaymentSystemType())) ? ($paymentObj->getPaymentSystemType() == 1 ? "ePay" : "PEPDAEU") : null;

			// плащане на задължение
			if (!empty($paymentObj->getObligationNumber())) {

				$guid = \Application\Service\AppService::genGuid($paymentObj->getMessageId(), 'payDuty');

				$data = [
					'type' => "PaymentOfAnObligation",
					'obligationNumber' => $paymentObj->getObligationNumber(),
					'cin' => $paymentObj->getUserCin(),
					'register' => $paymentObj->getRegisterName(),
					'paymentDescription' => $paymentObj->getReason(),
					'amount' => $paymentObj->getAmount(),
					'paymentDate' => $paymentObj->getStatusDate(),
					'providerKind' => $providerKind,
					'invoiceNumber' => $paymentObj->getMessageId()
				];
			}

			// захранване лична сметка
			else {

				$guid = \Application\Service\AppService::genGuid($paymentObj->getMessageId(), 'payPowerPersonalAccount');

				$data = [
					'type' => "PersonalAccountDeposit",
					'obligationNumber' => null,
					'cin' => $paymentObj->getUserCin(),
					'register' => $paymentObj->getRegisterName(),
					'paymentDescription' => $paymentObj->getReason(),
					'amount' => $paymentObj->getAmount(),
					'paymentDate' => $paymentObj->getStatusDate(),
					'providerKind' => $providerKind,
					'invoiceNumber' => $paymentObj->getMessageId()
				];
			}

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
					'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken, 'Operation-Id' => $guid
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
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\nPayDuty API error: {invoiceNumber: ".$paymentObj->getMessageId().'}');

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'PayDuty', 'API');
			return false;
		}
	}


	/**
	 * Моите заявления - ТР, ИР
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params
	 * @return array
	 */
	public function userApplicationList(&$totalCount, $params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['user_application_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];

			$paramList['ApplicantCIN'] = $params['cin'];

			$paramList['Page'] = !empty($params['cp']) ? $params['cp'] : null;
			$paramList['PageSize'] = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$paramList['Register'] = $params['registerId'];

			$paramList['FromRegistrationDate'] = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$paramList['ToRegistrationDate'] = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$paramList['IncomingNumbers'] = !empty($params['applicationNumber']) ? [$params['applicationNumber']] : null;
			$paramList['ApplicationTypeID'] = !empty($params['applicationTypeId']) ? $params['applicationTypeId'] : null;
			$paramList['lang'] = !empty($params['lang']) ? $params['lang'] : 'bg';

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];
			$httpAdapterConfig['timeout'] = 30;

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'ACCEPT-LANGUAGE' => $paramList['lang'], 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$userApplicationList = $response->getBody() ? json_decode($response->getBody()) : [];

			if (!is_array($userApplicationList))
				$userApplicationList = [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($userApplicationList as $val)
				$data[] =  $hydrator->hydrate((array)$val, new \User\Entity\ApplicationEntity());

			$totalCount = !empty($response->getHeaders()->has('count')) ? (int)$response->getHeaders()->get('count')->getFieldValue() : 0;

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'UserApplicationList', 'API');

			return ['status' => 'error', 'message' => 'GL_ERROR_L'];
		}
	}


	/**
	 * Моите заявления - Чернови
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params
	 * @return array
	 */
	public function userApplicationDraftList(&$totalCount, $params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['user_application_draft_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];

			$paramList['Page'] = $params['cp'];
			$paramList['PageSize'] = $params['rowCount'];
			$paramList['ApplicantCIN'] = $params['cin'];
			$paramList['lang'] = !empty($params['lang']) ? $params['lang'] : 'bg';

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];
			$httpAdapterConfig['timeout'] = 60;

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'ACCEPT-LANGUAGE' => $paramList['lang'], 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$userApplicationDraftList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($userApplicationDraftList as $val)
				$data[] =  $hydrator->hydrate((array)$val, new \User\Entity\ApplicationEntity());

			$totalCount = !empty($response->getHeaders()->has('count')) ? (int)$response->getHeaders()->get('count')->getFieldValue() : 0;

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'UserApplicationDraftList', 'API');

			return ['status' => 'error', 'message' => 'GL_ERROR_L'];
		}
	}


	/**
	 * Списък с платежни нареждания
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params
	 * @return array
	 */
	public function paymentOrderList(&$totalCount, $params = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['payment_order_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];

			$paramList['Register'] = !empty($params['register']) ? $params['register'] : null;
			$paramList['CIN'] = $params['cin'];
			$paramList['PaymentPeriodFrom'] = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$paramList['PaymentPeriodTo'] =!empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$paramList['ApplicationNumber'] = !empty($params['applicationNumber']) ? $params['applicationNumber'] : null;
			$paramList['PaymentOrderIDs'] = !empty($params['paymentId']) ? $params['paymentId'] : null;
			$paramList['EPaymentOrderIDs'] = !empty($params['ePaymentId']) ? $params['ePaymentId'] : null;
			$paramList['HasFreeAmounts'] = !empty($params['isFreeAmounts']) ? 'true' : (isset($params['isFreeAmounts']) && $params['isFreeAmounts'] != '' ? 'false' : null);
			$paramList['TransactionDirection'] = !empty($params['transactionDirection']) ? $params['transactionDirection'] : null;
			$paramList['HasTransaction'] = !empty($params['hasTransaction']) ? 'true' : null;
			$paramList['InvoiceNumber'] = !empty($params['invoice']) ? $params['invoice'] : null;
			$paramList['ProviderKinds'] = !empty($params['paymentMethod']) ? $params['paymentMethod'] : null;
			$paramList['NotReversedTransactions'] = !empty($params['notReversedTransaction']) ? 'true' : null;
			$paramList['Page'] = !empty($params['cp']) ? $params['cp'] : null;
			$paramList['PageSize'] = !empty($params['rowCount']) ? $params['rowCount'] : null;

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];
			$httpAdapterConfig['timeout'] = 60;


			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$paymentOrderList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($paymentOrderList as $val)
				$data[] =  $hydrator->hydrate((array)$val, new \Payment\Entity\PaymentOrderEntity());

			$totalCount = !empty($response->getHeaders()->has('count')) ? (int)$response->getHeaders()->get('count')->getFieldValue() : 0;

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'PaymentOrderList', 'API');

			return ['status' => 'error', 'message' => 'GL_ERROR_L'];
		}
	}


	/**
	 * Списък с усвоени суми по платежно нареждане
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params
	 * @return array
	 */
	public function paymentOrderTransactionList(&$totalCount, $params = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['payment_order_transaction_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			// електронно платежно нареждане
			$paramList['FromEPaymentOrderIDs'] = !empty($params['ePaymentId']) ? $params['ePaymentId'] : null;

			// платежно нареждане
			$paramList['FromPaymentOrderIDs'] = !empty($params['paymentId']) ? $params['paymentId'] : null;

			$paramList['ToObligationNumbers']= !empty($params['obligationNumberList']) ? $params['obligationNumberList'] : null;

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$paymentOrderTransactionList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($paymentOrderTransactionList as $val)
				$data[] =  $hydrator->hydrate((array)$val, new \Payment\Entity\PaymentOrderTransactionEntity());

			$totalCount = !empty($response->getHeaders()->has('count')) ? (int)$response->getHeaders()->get('count')->getFieldValue() : 0;

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'PaymentOrderTransactionList', 'E_ERROR');
			return [];
		}
	}


	/**
	 * Извличане на наличността по лична сметка
	 *
	 * @param array $params
	 * @return array
	 */
	public function personalAccountBalance($params = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication(); // TODO

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['personal_account_balance']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList = [];
			$paramList['Register'] = !empty($params['register']) ? $params['register'] : null;
			$paramList['CINs'] = $params['cin'];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$balanceList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = [];

			foreach ($balanceList as $val) {
				$data[$val->register] =  $val->balance;
			}

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'Balance', 'API');
			return [];
		}
	}


	/**
	 * Извличане на списък с банкови сметки
	 *
	 * @param array $params
	 * @return array
	 */
	public function getBankAccountList($params = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication(); // TODO

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['bank_account_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$paramList['Register'] = !empty($params['register']) ? $params['register'] : null;

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($paramList);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$bankAccountList = $response->getBody() ? json_decode($response->getBody()) : [];

			$data = array();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			foreach ($bankAccountList as $val)
				$data =  $hydrator->hydrate((array)$val, new \Payment\Entity\BankAccountEntity());

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'BankAccountList', 'API');
			return [];
		}
	}


	/**
	 * Регистриране на плащане на задължение през лична сметка
	 *
	 * @param array $params
	 * @return boolean
	 */
	public function payDutyFromPersonalAccount($paramsList = []) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_PAYMENTS_API'];
			$uriParams = [$this->config['rest_service']['pay_duty_from_personal_account']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);
			$guid = \Application\Service\AppService::genGuid(implode(',',$paramsList['obligationNumbers']), 'payDutyPersonalAccount');

			$data = [
				'obligationNumbers' => $paramsList['obligationNumbers'],
				'register' => $paramsList['register'],
				'cin' => $paramsList['cin']
			];

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken, 'Operation-Id' => $guid
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
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\nPayDutyFromPersonalAccount API error: {obligationNumber: ".implode(',',$paramsList['obligationNumbers']).'}');

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'PayDutyFromPersonalAccount', 'API');
			return false;
		}
	}


	/**
	 * Създаване на заявка за плащане през ПЕП на ДАЕУ
	 *
	 * @param array $params
	  * @param Payment\Entity\RegistryAgencyEntity $registryAgencyObj Регистрационни данни на АВ в ПЕП на ДАЕУ.
	 * @return boolean
	 */
	public function addPaymentPepdaeu($params, $registryAgencyObj) {

		try {

			$secretKey = $registryAgencyObj->getSecretWord();
			$clientId = $registryAgencyObj->getCin();

			$jsonString = json_encode($params);

			$ENCODED = base64_encode($jsonString);
			$CHECKSUM = hash_hmac('sha256', $ENCODED, $secretKey, true);

			$data['clientId'] = $clientId;
			$data['data'] = $ENCODED;
			$data['hmac'] = base64_encode($CHECKSUM);

			$adapter = new \Zend\Http\Client\Adapter\Curl();
			$adapter = $adapter->setCurlOption(CURLOPT_SSL_VERIFYHOST,false);
			$adapter = $adapter->setCurlOption(CURLOPT_SSL_VERIFYPEER,false);

			$uriParams = [$this->config['rest_service']['papdaeu_create_payment']];
			$url = \Application\Service\AppService::genUrl($registryAgencyObj->getUrlServices(), $uriParams);

			$client = new Client($url);
			$client->setAdapter($adapter);
			$client
			->setHeaders([
				'Content-Type' => 'application/x-www-form-urlencoded'
			])
			->setMethod('POST')
			->setParameterPost($data);

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
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\naddPaymentPepdaeu API error: {invoiceNumber: ".$params['PaymentReferenceNumber'].'}');

			$responseObj = null;
			$responseObj = json_decode($response->getContent());

			return $responseObj;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'AddPaymentPepdaeu', 'API');
			return false;
		}
	}


	/**
	 * Запитване за код за достъп до заявка за плащане през ПЕП на ДАЕУ
	 *
	 * @param int $transactionNumber Номер на транзакция, върнат от ПЕП на ДАЕУ
	 * @param Payment\Entity\RegistryAgencyEntity $registryAgencyObj Регистрационни данни на АВ в ПЕП на ДАЕУ.
	 * @return boolean
	 */
	public function getPaymentAccessCodePepdaeu($transactionNumber, $registryAgencyObj) {

		try {

			$secretKey = $registryAgencyObj->getSecretWord();
			$clientId = $registryAgencyObj->getCin();

			// запитване за код за достъп до заявка за плащане
			$ENCODED = base64_encode(json_encode(['id' => $transactionNumber]));
			$CHECKSUM = hash_hmac('sha256', $ENCODED, $secretKey, true);

			$data['clientId'] = $clientId;
			$data['data'] = $ENCODED;
			$data['hmac'] = base64_encode($CHECKSUM);

			$adapter = new \Zend\Http\Client\Adapter\Curl();
			$adapter = $adapter->setCurlOption(CURLOPT_SSL_VERIFYHOST,false);
			$adapter = $adapter->setCurlOption(CURLOPT_SSL_VERIFYPEER,false);

			$uriParams = [$this->config['rest_service']['papdaeu_access_code']];
			$urlServiceGetCode = \Application\Service\AppService::genUrl($registryAgencyObj->getUrlServices(), $uriParams);

			$client = new Client($urlServiceGetCode);
			$client->setAdapter($adapter);
			$client
			->setHeaders([
				'Content-Type' => 'application/x-www-form-urlencoded'
			])
			->setMethod('POST')
			->setParameterPost($data);

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
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\ngetPaymentAccessCodePepdaeu API error: {transactionNumber: ".$transactionNumber.'}');

			$responseObj = null;
			$responseObj = json_decode($response->getContent());

			return $responseObj;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'getPaymentAccessCodePepdaeu', 'API');
			return false;
		}
	}


	/**
	 * Взима списък с email абонати.
	 *
	 * @param array $params
	 * @return array
	 */
	public function getEmailSubscriptionList($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['subscription_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($params);
			$client->setHeaders([
					'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			$subscriptionList = $response->getBody() ? json_decode($response->getBody()) : [];

			$totalCount = $response->getHeaders()->get('count')->getFieldValue();

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			$data = [];

			foreach ($subscriptionList as $val)
				$data[] = $hydrator->hydrate((array)$val, new EmailSubscriptionEntity());

			return ['data' => $data, 'totalCount' => $totalCount];
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'getEmailSubscriptionList', 'API');
			return [];
		}
	}

	/**
	 * Добавя абонамент за събитие.
	 *
	 * @param array $params
	 * @return array
	 */
	public function addSubscription($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['subscription_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
					'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('POST')
			->setRawBody(Json::encode($params));

			$response = $client->send();

			if ($response->getStatusCode() == 400) {

				$result = Json::decode($response->getBody());

				if (property_exists($result, 'code') && property_exists($result, 'message'))
					return $message = ['status' => 'error', 'message' => $result->code];
			}

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

			if (!$response->isOk() ||  $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'addSubscription', 'API');
			return false;
		}
	}

	/**
	 * Изтрива абонамент за събитие.
	 *
	 * @param array $params
	 * @return array
	 */
	public function deleteSubscription($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['subscription_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('DELETE')
			->setRawBody(Json::encode($params));

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
			AppService::handleException($e, 'E_ERROR', 'deleteSubscription', 'API');
			return false;
		}
	}


	/**
	 * Взима списък със заявени за миграция профили.
	 *
	 * @param array $params
	 * @return array
	 */
	public function userMigrationProfileList($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['user_migration_profile_list']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($params);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
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

			if (!$response->isOk() ||  $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			$migrationProfileList = $response->getBody() ? json_decode($response->getBody()) : [];

			$hydrator = new \Zend\Hydrator\ClassMethodsHydrator();

			$data = [];

			foreach ($migrationProfileList as $val) {
				$data[] = $hydrator->hydrate((array)$val, new UnitedUserEntity());

				if ($val->status == 1) {
					$result = $this->userMigrationAdd([
						'MigrantUsername' 	=> $val->migrantUsername,
						'Register' 			=> $val->register
					]);
				}
			}

			return $data;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'userMigrationList', 'API');
			return false;
		}
	}


	/**
	 * Взима профил за миграция.
	 *
	 * @param array $params
	 * @return array
	 */
	public function userMigrationGetUser($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['user_migration_get_profile']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setParameterGet($params);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('GET');

			$response = $client->send();

			if ($response->getStatusCode() === 400) {
				$result = json_decode($response->getBody());
				return ['error' => $result->code];
			}

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

			if (!$response->isOk() ||  $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase());

			$result = $response->getBody() ? json_decode($response->getBody()) : [];

			$migrationAccount = new UnitedUserEntity();

			$migrationAccount->setMigrantAmount($result->amount);
			$migrationAccount->setMigrantUsername($result->username);
			$migrationAccount->setFullname($result->fullName);
			$migrationAccount->setEmail($result->еmail);
			$migrationAccount->setAdmId($result->clientID);

			return $migrationAccount;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'userMigrationList', 'API');
			return false;
		}
	}

	/**
	 * Добявя профил за миграция.
	 *
	 * @param array $params
	 * @return bool
	 */
	public function userMigrationAdd($params) {

		try {

			$apiAuthToken = $this->oidcService->getApiAuthentication();

			$host = $this->config['GL_EPZEU_API'];
			$uriParams = [$this->config['rest_service']['user_migration_add']];

			$url = \Application\Service\AppService::genUrl($host, $uriParams);

			$params = array_map('strval', $params);

			$httpAdapter 		= $this->config['http_client']['adapter'];
			$httpAdapterConfig 	= $this->config['http_client'][$httpAdapter];

			$client = new Client($url, $httpAdapterConfig);
			$client->setHeaders([
				'Content-Type' => 'application/json', 'Authorization' => 'Bearer '.$apiAuthToken
			])
			->setMethod('POST')
			->setRawBody(Json::encode($params));

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

			if (!$response->isOk() || $response->getContent() == '')
				throw new \Exception($response->getStatusCode().' '.$response->getReasonPhrase()."\nUser migration API error:");

			return true;
		}
		catch (\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'User migration', 'API');
			return false;
		}
	}

}