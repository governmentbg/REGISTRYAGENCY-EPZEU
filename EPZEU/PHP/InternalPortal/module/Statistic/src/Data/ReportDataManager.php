<?php

namespace Statistic\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Statistic\Entity\ReportUserEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип справки.
 *
 * @package Statistic
 * @subpackage Data
 */
class ReportDataManager {

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
	 * Извлича списък със статистически отчет за потребителите със специален достъп
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със съобщения.
	 */
	public function getReportUserList($params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_permissions_report(
					:permission_group_list, :user_authentication_type, :date_from, :permission_id, :status);");

			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$permissionGroupList = !empty($params['permissionGroupList']) ? '{'.implode(',', array_map('intval', $params['permissionGroupList'])).'}' : null;
			$permissionId = !empty($params['permissionId']) ? $params['permissionId'] : null;
			$userАuthenticationТype = !empty($params['userАuthenticationТype']) ? $params['userАuthenticationТype'] : null;
			$status = !empty($params['status']) ? $params['status'] : null;
			$status = !empty($params['status']) ? $params['status'] : (isset($params['status']) && $params['status'] != '' ? '0' : null);

			$container = new ParameterContainer();
			$container->offsetSet('permission_group_list', $permissionGroupList);
			$container->offsetSet('user_authentication_type', $userАuthenticationТype, $container::TYPE_INTEGER);
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('permission_id', $permissionId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refUsers = $cursors['p_ref_users'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refUsers .'";');
			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				$resultSet = new HydratingResultSet($this->hydrator, new ReportUserEntity());
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
}