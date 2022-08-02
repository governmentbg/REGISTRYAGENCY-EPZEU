<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Content\Entity\BulletinEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Бюлетин.
 *
 * @package Content
 * @subpackage Data
 */
class BulletinDataManager {

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
	 * Масив с конфигурационни параметри.
	 *
	 * @var array
	 */
	protected $config;


	/**
	 * Услуга за работа с документи.
	 *
	 * @var DocumentService
	 */
	protected $documentService;

	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param array $config Масив с конфигурационни параметри.
	 * @param \Document\Service\DocumentService $documentService Услуга за работа с документи.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $config, $documentService) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->config = $config;

		$this->documentService = $documentService;
	}


	/**
	 * Извлича списък с бюлетини, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с бюлетини.
	 */
	public function getBulletinList(&$totalCount, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_bulletin_search(
					:id_bulletin_list, :status, :start_index, :row_count, :total_count);");

			$idBulletinList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;
			$status = isset($params['status']) ? $params['status'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_bulletin_list', $idBulletinList);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_bulletins'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new BulletinEntity());
				return $resultSet->initialize($result);
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Добавя бюлетин.
	 *
	 * @param BulletinEntity $dataObj Бюлетин.
	 * @return bool Резултат от операцията.
	 */
	public function addBulletin(BulletinEntity $dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());
			$uuid = array_shift($filesUuid);

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_bulletin_create (:date_from, :date_to, :file_uuid);");

			$dateFrom = \Application\Service\AppService::getSqlDate($dataObj->getDateFrom());
			$dateTo = \Application\Service\AppService::getSqlDate($dataObj->getDateTo());

			$container = new ParameterContainer();
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('date_to', $dateTo, $container::TYPE_STRING);
			$container->offsetSet('file_uuid', $uuid, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$bulletinId = $result['p_billetin_id'];

			$connection->commit();

			return $bulletinId;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Обновява данни за бюлетин.
	 *
	 * @param BulletinEntity $dataObj Бюлетин.
	 * @return bool Резултат от операцията.
	 */
	public function updateBulletinById($dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_bulletin_update(
							:bulletin_id, :date_from, :date_to, :uuid);");

			$dateFrom = \Application\Service\AppService::getSqlDate($dataObj->getDateFrom());
			$dateTo = \Application\Service\AppService::getSqlDate($dataObj->getDateTo());

			$uuid = null;

			if ($dataObj->getFiles()) {
				$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());
				$uuid = array_shift($filesUuid);
			}

			$container = new ParameterContainer();
			$container->offsetSet('bulletin_id', $dataObj->getBulletinId(), $container::TYPE_INTEGER);
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('date_to', $dateTo, $container::TYPE_STRING);
			$container->offsetSet('uuid', $uuid);

			$stmt->setParameterContainer($container);
			$stmt->execute();

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
	 * Обновява статус на бюлетин.
	 *
	 * @param int $bulletinId Идентификатор на бюлетин.
	 * @param int $status Статус на бюлетин.
	 * @return bool Резултат от операцията.
	 */
	public function changeBulletinStatus($bulletinId, $status, $restService = null, $emailParams = [], $sendEmails=false) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_bulletin_status_update(:id_bulletin, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('id_bulletin', $bulletinId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute();

			$connection->commit();

			if ($status && $sendEmails) {
				if (!empty($emailParams['recipient'])) {
					$restService->sendEmail($emailParams['template'], $emailParams['recipient'], $emailParams['params']);
				}
			}

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
	 * Извлича съдържание на файл с бюлетин.
	 *
	 * @param int $bulletinId Идентификатор на бюлетин.
	 * @return string Съдържание на файл.
	 */
	public function getBulletinFileById($bulletinId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_bulletin_content_read(:id_bulletin);");

			$container = new ParameterContainer();
			$container->offsetSet('id_bulletin', $bulletinId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$fileContent = $cursors['p_content'];

			$connection->commit();

			return $fileContent ;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}
}