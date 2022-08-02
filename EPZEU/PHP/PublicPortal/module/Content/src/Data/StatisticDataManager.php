<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;

use Content\Entity\StatisticEntity;
use Content\Entity\StatisticReportEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Статистика.
 *
 * @package Content
 * @subpackage Data
 */
class StatisticDataManager {

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
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param array $config Масив с конфигурационни параметри.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $config) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->config = $config;
	}


	/**
	 * Извлича списък със статистики.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със статистики.
	 */
	public function getStatisticList(&$totalCount, $langId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_search(
					:id_statistic_list, :id_register, :id_lang, false, null, :start_index, :row_count, :total_count);");

			$statisticIdList = !empty($params['id_statistic_list']) ? '{'.implode(',', array_map('intval', $params['id_statistic_list'])).'}' : null;

			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_list', $statisticIdList);
			$container->offsetSet('id_register', $registerId);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_statistic'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new StatisticEntity());
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
	 * Извлича списък със статистически отчети.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със статистически отчети.
	 */
	public function getStatisticReportList(&$totalCount, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_reports_search(
					:id_statistic_report_list, :id_statistic, :status, :start_index, :row_count, :total_count);");

			$statisticReportIdList = !empty($params['statisticReportIdList']) ? '{'.implode(',', array_map('intval', $params['statisticReportIdList'])).'}' : null;
			$statisticId = !empty($params['statisticId']) ? $params['statisticId'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$status = !empty($params['status']) ? $params['status'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report_list', $statisticReportIdList);
			$container->offsetSet('id_statistic', $statisticId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_statistic_reports'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new StatisticReportEntity());
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
	 * Извлича съдържание на файл със статистически отчет.
	 *
	 * @param int $bulletinId Идентификатор на статистически отчет.
	 * @return string Съдържание на файл.
	 */
	public function getStatisticReportFileById($statisticReportId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_reports_content_read(:id_statistic_report);");

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report', $statisticReportId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$fileContent = $cursors['p_content'];

			$connection->commit();

			return $fileContent;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}
}