<?php

namespace Statistic\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\ParameterContainer;
use Statistic\Entity\StatisticEntity;
use Statistic\Entity\StatisticReportEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип статистически отчети.
 *
 * @package Forum
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
	 * Добавя статистика.
	 *
	 * @param StatisticEntity $statObj статистика.
	 * @return bool Резултат от операцията.
	 */
	public function addStatistic(StatisticEntity $statObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_create(:register_id, :name, :type_genarate, :url);");

			$container = new ParameterContainer();

			$container->offsetSet('register_id', $statObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('name', $statObj->getName());
			$container->offsetSet('type_genarate', $statObj->getTypeGenarate(), $container::TYPE_INTEGER);
			$container->offsetSet('url', $statObj->getUrl());

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
	 * Обновява статистика.
	 *
	 * @param int $statisticId Идентификатор на статистика.
	 * @param StatisticEntity $statObj статистика.
	 * @return bool Резултат от операцията.
	 */
	public function updateStatisticById($statisticId, StatisticEntity $statObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_update(:id_statistic, :register_id, :name, :type_genarate, :url);");

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic', $statisticId, $container::TYPE_INTEGER);
			$container->offsetSet('register_id', $statObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('name', $statObj->getName());
			$container->offsetSet('type_genarate', $statObj->getTypeGenarate(), $container::TYPE_INTEGER);
			$container->offsetSet('url', $statObj->getUrl());

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
	 * Извлича списък със статистики, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със статистики.
	 */
	public function getStatisticList(&$totalCount, $params = []) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_search(
					:id_statistic_list, :id_register, :id_lang, :load_separate_value, :get_untranslated, :start_index, :row_count, :total_count);");


			$langId = !empty($params['langId']) ? $params['langId'] : null;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$statisticIdList = !empty($params['id_statistic_list']) ? '{'.implode(',', array_map('intval', $params['id_statistic_list'])).'}' : null;
			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_list', $statisticIdList);
			$container->offsetSet('id_register', $registerId);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('load_separate_value', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
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
	 * Добавя статистически отчет.
	 *
	 * @param @param int $statisticId Идентификатор на статистика.
	 * @param StatisticEntity $statObj статистика.
	 * @return bool Резултат от операцията.
	 */
	public function addStatisticReport($statisticId, StatisticReportEntity $statObj, $statisticType, $uuid) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_reports_create (:id_statistic, :date_from, :date_to, :status, :uuid);");

			$dateFrom = \Application\Service\AppService::getSqlDate($statObj->getDateFrom());
			$dateTo = \Application\Service\AppService::getSqlDate($statObj->getDateTo());

			$status = 1;

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic', $statisticId, $container::TYPE_INTEGER);
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('date_to', $dateTo, $container::TYPE_STRING);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$container->offsetSet('uuid', $uuid);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			$statisticReportId = $result['p_statistic_report_id'];

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
	 * Редактира статистически отчет.
	 *
	 * @param @param int $statisticId Идентификатор на статистика.
	 * @param StatisticEntity $statObj статистика.
	 * @return bool Резултат от операцията.
	 */
	public function editStatisticReport($statisticReportId, StatisticReportEntity $statReportObj, $statisticType, $uuid = null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_reports_update (
									:id_statistic_report, :date_from, :date_to, :uuid);");

			$dateFrom = \Application\Service\AppService::getSqlDate($statReportObj->getDateFrom());
			$dateTo = \Application\Service\AppService::getSqlDate($statReportObj->getDateTo());


			switch ($statisticType) {
				case 'EP_STATISTICS_GENERATION_MANUAL_TYPE_L':

					break;

				case 'EP_STATISTICS_GENERATION_AUTO_TYPE_L':

					$fileName = $statReportObj->getFileName();
					$info = pathinfo($fileName);
					$fileName = $info['filename'] . str_replace('.', '_', uniqid('_', true));
					$fileName .= '.'.$info['extension'];
					$fileSize = $statReportObj->getFileSize();
					$mimeType = $statReportObj->getContentType();

					break;

				default:
					return false;
			}

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report', $statisticReportId, $container::TYPE_INTEGER);
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('date_to', $dateTo, $container::TYPE_STRING);
			$container->offsetSet('uuid', $uuid, $container::TYPE_STRING);

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
					:id_statistic_report_list, :id_statistic, null, :start_index, :row_count, :total_count);");

			$statisticReportIdList = !empty($params['statisticReportIdList']) ? '{'.implode(',', array_map('intval', $params['statisticReportIdList'])).'}' : null;

			$statisticId = !empty($params['statisticId']) ? $params['statisticId'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report_list', $statisticReportIdList);
			$container->offsetSet('id_statistic', $statisticId);
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
	 * Изтрива шаблон за декларация по уникален идентификатор.
	 *
	 * @param int $templateId Идентификатор на шаблон за декларация.
	 * @return bool Резултат от операцията.
	 */
	public function deleteStaisticReportById($statisticReportId) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT stats.f_statistic_reports_delete (:id_statistic_report);");
			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report', $statisticReportId, $container::TYPE_INTEGER);
			$stmt->setParameterContainer($container);
			$stmt->execute();

			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}

	/**
	 * Променя статус на статистически отчет.
	 *
	 * @param @param int $statisticReportId Идентификатор на статистически отчет.
	 * @param @param int $status Статус на статистически отчет.
	 * @return bool Резултат от операцията.
	 */
	public function changeStatisticStatus($statisticReportId, $status) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT stats.f_statistic_reports_status_update(:id_statistic_report, :status);");
			$container = new ParameterContainer();
			$container->offsetSet('id_statistic_report', $statisticReportId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$stmt->setParameterContainer($container);
			$stmt->execute();
			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
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

			$stream = $cursors['p_content'];

			$connection->commit();

			return $stream;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Променя подредбата на статистики.
	 *
	 * @param array $idStatsArray Списък с идентификатори на статистики.
	 * @param int $registerId Идентификатор на регистър.
	 * @return bool Резултат от операцията.
	 */
	public function reorderStatisticList(array $idStatsArray, int $registerId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  stats.f_statistic_order_update(:id_list, :id_register)");

			$idList = '{'.implode(',', array_map('intval', $idStatsArray)).'}';

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('id_register', $registerId);

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

	/**
	 * Добавя превод на статистика.
	 *
	 * @param StatisticEntity $statisticObj Етикет.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addStatisticI18n($statisticObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_i18n_create(:id_statistic, :id_language, :name_i18n);");

			$nameI18n = trim($statisticObj->getNameI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic', $statisticObj->getStatisticId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name_i18n', $nameI18n, $container::TYPE_STRING);

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

	/**
	 * Обновява данни за превод на статистика.
	 *
	 * @param $statisticObj $labelObj Етикет.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateStatisticI18n($statisticObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM stats.f_statistic_i18n_update(:id_statistic, :id_language, :name_i18n);");

			$nameI18n = trim($statisticObj->getNameI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id_statistic', $statisticObj->getStatisticId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name_i18n', $nameI18n, $container::TYPE_STRING);

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