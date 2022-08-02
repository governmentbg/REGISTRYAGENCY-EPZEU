<?php

namespace Payment\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;
use Payment\Entity\RegistryAgencyEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Плащане.
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
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;
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
	 * Добавя регистрационни данни на АВ в ePay.
	 *
	 * @param RegistryAgencyEntity $dataObj Регистрационни данни.
	 * @return bool
	 */
	public function addRegistryAgencyData(RegistryAgencyEntity $dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_ra_registration_data_create(
						:type, :cin, :email, :secret_word, :validity_period, :url, :url_response, :url_services);");

			$email = !empty($dataObj->getEmail()) ? $dataObj->getEmail() : null;
			$urlResponse = !empty($dataObj->getUrlResponse()) ? $dataObj->getUrlResponse() : null;
			$urlServices = !empty($dataObj->getUrlServices()) ? $dataObj->getUrlServices() : null;

			$container = new ParameterContainer();
			$container->offsetSet('type', $dataObj->getType(), $container::TYPE_INTEGER);
			$container->offsetSet('cin', $dataObj->getCin(), $container::TYPE_STRING);
			$container->offsetSet('email', $email, $container::TYPE_STRING);
			$container->offsetSet('secret_word', $dataObj->getSecretWord(), $container::TYPE_STRING);
			$container->offsetSet('validity_period', $dataObj->getValidityPeriod(), $container::TYPE_STRING);
			$container->offsetSet('url', $dataObj->getUrl(), $container::TYPE_STRING);
			$container->offsetSet('url_response', $urlResponse, $container::TYPE_STRING);
			$container->offsetSet('url_services', $urlServices, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

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
	 * Обновява регистрационни данни на АВ в ePay.
	 *
	 * @param RegistryAgencyEntity $dataObj Регистрационни данни.
	 * @return bool Резултат от операцията.
	 */
	public function updateRegistryAgencyData(RegistryAgencyEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM pmt.f_ra_registration_data_update(
						:type, :cin, :email, :secret_word, :validity_period, :url, :url_response, :url_services);");

			$email = !empty($dataObj->getEmail()) ? $dataObj->getEmail() : null;
			$urlResponse = !empty($dataObj->getUrlResponse()) ? $dataObj->getUrlResponse() : null;
			$urlServices = !empty($dataObj->getUrlServices()) ? $dataObj->getUrlServices() : null;

			$container = new ParameterContainer();
			$container->offsetSet('type', $dataObj->getType(), $container::TYPE_INTEGER);
			$container->offsetSet('cin', $dataObj->getCin(), $container::TYPE_STRING);
			$container->offsetSet('email', $email, $container::TYPE_STRING);
			$container->offsetSet('secret_word', $dataObj->getSecretWord(), $container::TYPE_STRING);
			$container->offsetSet('validity_period', $dataObj->getValidityPeriod(), $container::TYPE_STRING);
			$container->offsetSet('url', $dataObj->getUrl(), $container::TYPE_STRING);
			$container->offsetSet('url_response', $urlResponse, $container::TYPE_STRING);
			$container->offsetSet('url_services', $urlServices, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute();

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
}