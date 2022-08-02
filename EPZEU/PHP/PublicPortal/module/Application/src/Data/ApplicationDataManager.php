<?php

namespace Application\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;


/**
 * Клас за извличане на данни за обекти, необходими за работата на приложението.
 *
 * @package Application
 * @subpackage Data
 */
class ApplicationDataManager {

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
	 * Извлича списък с модули.
	 *
	 * @return array Масив с модули.
	 */
	public function getModuleList() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_n_s_module_search(null);");
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_modules'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			return $result;

		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}


	/**
	 * Извлича списък с функционалности.
	 *
	 * @return array Масив с функционалности.
	 */
	public function getFunctionalityList() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_n_s_functionalities_search(:id_functionality_list, :id_module);");

			$container = new ParameterContainer();

			$idFunctionalityList = !empty($params['functionalityId']) ? '{'.implode(',', array_map('intval', $params['functionalityId'])).'}' : null;
			$idModule = !empty($params['moduleId']) ? $params['moduleId'] : null;

			$container->offsetSet('id_functionality_list', $idFunctionalityList);
			$container->offsetSet('id_module', $idModule, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_functionalities'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				$functionalityList = [];

				foreach ($result as $k => $v)
					$functionalityList[$v['functionality_id']] = $v['name'];

				return $functionalityList;
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
	 * Извлича име на cookie на основен домейн.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param string
	 */
	public function getCookieDomainName(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_app_parameters_search(
					:id_param_list, :id_functionality, :id_module, :code, :description, :is_system, :start_index, :row_count, :total_count);");

			$idParamList = !empty($params['paramId']) ? '{'.implode(',', array_map('intval', $params['paramId'])).'}' : null;
			$idFunctionality = !empty($params['functionalityId']) ? $params['functionalityId'] : null;
			$idModule = !empty($params['moduleId']) ? $params['moduleId'] : null;
			$code = !empty($params['code']) ? $params['code'] : null;
			$description = !empty($params['description']) ? $params['description'] : null;
			$isSystem = isset($params['isSystem']) ? (!empty($params['isSystem']) ? $params['isSystem'] : ($params['isSystem'] == '' ? null : 0)) : 0;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;

			$startIndex = \Application\Service\AppService::createStartIndex($params);

			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_param_list', $idParamList);
			$container->offsetSet('id_functionality', $idFunctionality, $container::TYPE_INTEGER);
			$container->offsetSet('id_module', $idModule, $container::TYPE_INTEGER);
			$container->offsetSet('code', $code, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('is_system', $isSystem, $container::TYPE_INTEGER);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_params'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($data = $result->current())
				return $data['value_string'];

			return '';
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

				AppService::handleDbError($e);

				return '';
		}
	}
}