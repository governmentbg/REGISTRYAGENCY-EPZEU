<?php

namespace Payment\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Payment\Entity\PaymentEntity;
use Payment\Entity\BankAccountEntity;
use Payment\Entity\RegistryAgencyEntity;


/**
 * Клас за поддържане и съхранение на обекти от тип Задължение и плащане.
 *
 * @package Payment
 * @subpackage Data
 */
class PaymentDataManager {


	/**
	 * Адаптер за връзка към база данни.
	 *
	 * @var AdapterInterface
	 */
	protected $dbAdapter;

	/**
	 * Хидратор за преобразуване на обекти в масиви и обратно.
	 *
	 * @var HydratorInterface
	 */
	protected $hydrator;


	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;


	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param \Application\Service\restService $restService Услуга за работа с REST уеб услуги.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $restService, $userService, $userDM) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->restService = $restService;

		$this->userService = $userService;

		$this->userDM = $userDM;
	}


	/**
	 * Добавя контекстен потребител
	 *
	 * @return bool
	 */
	public function setContextUser() {

		if ($user = $this->userService->getUser())
			return $this->userDM->setContextUser($user->getUserId());

		return $this->userDM->setContextUser(\User\Module::SYS_USER);
	}


	/**
	 * Извлича регистрационни данни на АВ в ePay.
	 *
	 * @param int $registryAgencyType Тип на регистрационните данни.
	 * @return RegistryAgencyEntity Регистрационни данни.
	 */
	public function getRegistryAgencyData($registryAgencyType) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_ra_registration_data_search(:type);");

			$container = new ParameterContainer();

			$container->offsetSet('type', $registryAgencyType, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_registration_data'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute()->current();

			$connection->commit();

			if (is_array($result)) {
				$obj = new RegistryAgencyEntity();
				$this->hydrator->hydrate($result, $obj);
				return $obj;
			}

			return null;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return null;
		}
	}


	/**
	 * Добавя данни за изходящите съобщения към ePay, ПЕПДАЕУ
	 *
	 * @param PaymentEntity $paymentObj данни плащане epay, пепдаеу.
	 * @param array $pepdaeuParams
	 * @param RegistryAgencyEntity $registryAgencyObj Регистрационни данни на АВ в ПЕП на ДАЕУ.
	 * @return bool Резултат от операцията.
	 */
	public function addPaymentMessage(PaymentEntity $paymentObj, $pepdaeuParams=[], $registryAgencyObj=null) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_payment_messages_create(
				:register_id, :payment_system_type, :obligation_number, :obligation_date, :user_id, :user_cin, :obliged_person, :merchant_cin, :merchant_name, :merchant_bic, :merchant_iban, :amount, :expiration_time, :application_identifier, :payment_type);");

			$expirationTime = !empty($paymentObj->getExpirationTime()) ? $paymentObj->getExpirationTime() : null;
			$obligationNumber = !empty($paymentObj->getObligationNumber()) ? $paymentObj->getObligationNumber() : null;

			$container = new ParameterContainer();
			$container->offsetSet('register_id', $paymentObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('payment_system_type', $paymentObj->getPaymentSystemType(), $container::TYPE_INTEGER);
			$container->offsetSet('obligation_number', $obligationNumber, $container::TYPE_INTEGER);
			$container->offsetSet('obligation_date', $paymentObj->getObligationDate(), $container::TYPE_STRING);
			$container->offsetSet('user_id', $paymentObj->getUserId(), $container::TYPE_INTEGER);
			$container->offsetSet('user_cin', $paymentObj->getUserCin(), $container::TYPE_INTEGER);
			$container->offsetSet('obliged_person', $paymentObj->getObligedPerson(), $container::TYPE_STRING);
			$container->offsetSet('merchant_cin', $paymentObj->getMerchantCin(), $container::TYPE_STRING);
			$container->offsetSet('merchant_name', $paymentObj->getMerchantName(), $container::TYPE_STRING);
			$container->offsetSet('merchant_bic', $paymentObj->getMerchantBic(), $container::TYPE_STRING);
			$container->offsetSet('merchant_iban', $paymentObj->getMerchantIban(), $container::TYPE_STRING);
			$container->offsetSet('amount', $paymentObj->getAmount(), $container::TYPE_STRING);
			$container->offsetSet('expiration_time', $expirationTime, $container::TYPE_STRING);
			$container->offsetSet('application_identifier', $paymentObj->getApplicationNumber(), $container::TYPE_STRING);
			$container->offsetSet('payment_type', $paymentObj->getPaymentType(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$data = new PaymentEntity();

			$data->setMessageId($result['p_message_id']);
			$data->setReason($result['p_reason']);

			// създаване на заявка за плащане през ПЕП на ДАЕУ
			if (!empty($pepdaeuParams)) {

				$pepdaeuParams['PaymentReason'] = $data->getReason();
				$pepdaeuParams['PaymentReferenceNumber'] = $data->getMessageId();

				if (!$responseObj = $this->restService->addPaymentPepdaeu($pepdaeuParams, $registryAgencyObj))
					throw new \Exception('addPaymentPepdaeu API error: {invoiceNumber: '.$data->getMessageId().'}');

				if (!empty($responseObj))
					$data->setPepdaeuResponse($responseObj);

				if (!empty($responseObj->unacceptedReceiptJson)) {

					$connection->rollback();
					return $data;
				}
			}

			$connection->commit();

			return $data;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return null;
		}
	}


	/**
	 * Обновява данни за съобщения към ePay, ПЕПДАЕУ.
	 *
	 * @param PaymentEntity $paymentObj данни плащане epay, пепдаеу.
	 * @return bool Резултат от операцията.
	 */
	public function updatePaymentMessage(PaymentEntity $paymentObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_payment_messages_update(
					:message_id, :transaction_number, :authorization_code, :status, :status_description, :status_date, :obligation_date);");

			$transactionNumber = !empty($paymentObj->getTransactionNumber()) ? $paymentObj->getTransactionNumber() : null;
			$authorizationCode = !empty($paymentObj->getAuthorizationCode()) ? $paymentObj->getAuthorizationCode() : null;
			$statusDescription = !empty($paymentObj->getStatusDescription()) ? $paymentObj->getStatusDescription() : null;
			$obligationDate = !empty($paymentObj->getObligationDate()) ? $paymentObj->getObligationDate() : null;

			$container = new ParameterContainer();

			$container->offsetSet('message_id', $paymentObj->getMessageId(), $container::TYPE_INTEGER);
			$container->offsetSet('transaction_number', $transactionNumber, $container::TYPE_STRING);
			$container->offsetSet('authorization_code', $authorizationCode, $container::TYPE_STRING);
			$container->offsetSet('status', $paymentObj->getStatus(), $container::TYPE_INTEGER);
			$container->offsetSet('status_description', $statusDescription, $container::TYPE_STRING);
			$container->offsetSet('status_date', $paymentObj->getStatusDate(), $container::TYPE_STRING);
			$container->offsetSet('obligation_date', $obligationDate, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute();

			// платено задължение
			if ($paymentObj->getStatus() == 1) {

				if (!$this->restService->payDuty($paymentObj)) {
					throw new \Exception('PayDuty API error: {invoiceNumber: '.$paymentObj->getMessageId().'}');
				}
			}

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Извлича данни за съобщениe към ePay, ПЕПДАЕУ.
	 *
	 * @param int $messageId уникален идентификатор на запис.
	 * @param int $paymentSystemType система за електронни разплащания.
	 * @param int $obligationNumber идентификатор на задължение, NULL при захранване на ЛС.
	 * @param string $transactionNumber номер на транзакция.
	 * @param int $status статус на плащане в ЕПЗЕУ.
	 * @return object Данни за съобщение към Epay.
	 */
	public function getPaymentMessage($messageId=null, $paymentSystemType=null, $obligationNumber=null, $transactionNumber=null, $status=null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_payment_messages_search(
					:message_id, :payment_system_type, :obligation_number, :transaction_number, :status);");

			$container = new ParameterContainer();
			$container->offsetSet('message_id', $messageId, $container::TYPE_INTEGER);
			$container->offsetSet('payment_system_type', $paymentSystemType, $container::TYPE_INTEGER);
			$container->offsetSet('obligation_number', $obligationNumber, $container::TYPE_INTEGER);
			$container->offsetSet('transaction_number', $transactionNumber, $container::TYPE_STRING);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_messages'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				$resultSet = new HydratingResultSet($this->hydrator, new PaymentEntity());
				return $resultSet->initialize($result);
			}

			return null;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return null;
		}
	}
}