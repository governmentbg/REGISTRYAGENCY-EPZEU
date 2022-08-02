<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Content\Entity\HtmlPageEntity;
use Content\Entity\PageEntity;
use Content\Entity\ApplicationTypeEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Страница.
 *
 * @package Content
 * @subpackage Data
 */
class PageDataManager {


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
	 * Извлича списък с HTML страници, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @param int $type Тип на страница.
	 * @return array Масив с HTML страници.
	 */
	public function getPageList(&$totalCount, $langId, $params = [], $type) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_html_pages_search(
					:id_page_list, :type, :status, :start_index, :row_count, null, :lang_id, :load_content, :load_separate_value, :load_only_untranslated, :total_count);");

			$idPageList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;
			$status = isset($params['status']) ? $params['status'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);

			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;
			$loadContent = !empty($params['loadContent']) ? $params['loadContent'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;

			$container = new ParameterContainer();
			$container->offsetSet('id_page_list', $idPageList);
			$container->offsetSet('type', $type);
			$container->offsetSet('status', $status);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('lang_id', $langId);
			$container->offsetSet('load_content', $loadContent);
			$container->offsetSet('load_separate_value', $loadSeparateValueI18n);
			$container->offsetSet('load_only_untranslated', $getUntranslated);

			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_html_pages'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new HtmlPageEntity());
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
	 * Извлича съдържание на файл към йерархична страница.
	 *
	 * @param int $pageId Идентификатор на йерархична страница.
	 * @return string Съдържание на файл.
	 */
	public function getPageFile($pageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->query("SELECT * FROM cms.f_pages_content_read(:id_page);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			$fileContent = $result['p_content'];

			$connection->commit();

			if ($fileContent)
				return $fileContent;

			return false;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Извлича списък с йерархични страници, филтрирани по определени критерии.
	 *
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с йерархични страници.
	 */
	public function getNestedPageList($params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_pages_search (:ids_page, :id_parent, :type, :register_id, :lang_id, :load_content, :load_separate_value, :load_only_untranslated)");

			$type = !empty($params['type']) ? $params['type'] : null;
			$parentId = isset($params['parentId']) ? $params['parentId'] : null;

			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;
			$pageIdList = !empty($params['pageIdList']) ? $params['pageIdList'] : [];
			$pageIds = count($pageIdList) ? '{'.implode(',', array_map('intval', $pageIdList)).'}' : null;
			$loadContent = !empty($params['loadContent']) ? $params['loadContent'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;

			$langId = !empty($params['langId']) ? $params['langId'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('ids_page', $pageIds);
			$container->offsetSet('id_parent', $parentId, $container::TYPE_INTEGER);
			$container->offsetSet('type', $type, $container::TYPE_INTEGER);
			$container->offsetSet('register_id', $registerId, $container::TYPE_INTEGER);
			$container->offsetSet('lang_id', $langId);
			$container->offsetSet('load_content', $loadContent);
			$container->offsetSet('load_separate_value', $loadSeparateValueI18n);
			$container->offsetSet('load_only_untranslated', $getUntranslated);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_pages'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new PageEntity());
				return $resultSet->initialize($result);
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
	 * Извлича списък с брой резултати при търсене, разделени по тип съдържание.
	 *
	 * @param string $searchCriteria Критерий, по който се търси.
	 * @return array Масив с брой резултати при търсене, разделени по тип съдържание.
	 */
	public function getSearchCount($searchCriteria) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_public_search_count(:search_criteria);");

			$container = new ParameterContainer();

			$container->offsetSet('search_criteria', $searchCriteria, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_result'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				foreach ($result as $item)
					$countArr[$item['search_type']] = $item['count'];

				return $countArr;
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
	 * Извлича списък с резултати при търсене, разделени по тип съдържание, филтрирани по определени критерии.
	 *
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с резултати при търсене, разделени по тип съдържание.
	 */
	public function getSearchList($langId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_public_search(
					:content_type, :search_criteria, :lang_id, :start_index, :row_count);");

			$contentType = !empty($params['contentType']) ? $params['contentType'] : 1;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);

			$container = new ParameterContainer();
			$container->offsetSet('content_type', $contentType, $container::TYPE_INTEGER);
			$container->offsetSet('search_criteria', $params['sKey'], $container::TYPE_STRING);
			$container->offsetSet('lang_id', $langId);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_result'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				switch ($contentType) {

					// Новини
					case 1:
						$classname='\Content\Entity\NewsEntity';
						break;

					// Видео уроци
					case 2:
						$classname='\Content\Entity\VideoLessonEntity';
						break;

					// Страници
					case 3:
						$classname='\Content\Entity\HtmlPageEntity';
						break;

					// Нормативна уредба
					// Образци на документи
					case 4:
					case 5:
						$classname='\Content\Entity\PageEntity';
						break;
				}

				$searchEntity=new $classname();

				$resultSet = new HydratingResultSet($this->hydrator, $searchEntity);
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
	 * Извлича списък с йерархични страници за началните страници на системата.
	 *
	 * @param int $type
	 * @param int $registerId
	 * @param int $limit
	 * @param int $languageId
	 * @return array Масив със страници услуги.
	 */
	public function getNestedPagesFirstPage($type, $registerId, $limit, $languageId) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_pages_top_list (
					:type, :register_id, :limit, :lang_id);");

			$container = new ParameterContainer();
			$container->offsetSet('type', $type);
			$container->offsetSet('register_id', $registerId);
			$container->offsetSet('limit', $limit);
			$container->offsetSet('lang_id', $languageId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_pages'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new PageEntity());
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
	 * Извлича списък със заявления, филтрирани по определени критерии.
	 *
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със заявления.
	 */
	public function getApplicationTypeList($langId, $params, $includedAppTypes = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_s_application_types_search(
					:id, :id_lang, :app_type, :name, :load_separate_value_i18n, :start_index, :row_count, :total_count, :id_register);");

			$id = !empty($params['id']) ? '{'.$params['id'].'}' : null;
			$appType = !empty($params['appType']) ? $params['appType'] : null;
			$name = !empty($params['name']) ? $params['name'] : null;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : null;
			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;


			$container = new ParameterContainer();
			$container->offsetSet('id', $id);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('app_type', $appType);
			$container->offsetSet('name', $name);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);
			$container->offsetSet('id_register', $registerId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_application_types'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				$applicationTypeList = [];

				foreach ($result as $k => $v) {

					if ($includedAppTypes && !in_array($v['app_type'], $includedAppTypes))
						continue;

					if (!empty($params['getPlainResultById']) || !empty($params['getPlainResultByType'])) {

						$key = !empty($params['getPlainResultById']) ? $v['id'] : $v['app_type'];

						if (!empty($params['getDropDownResult'])) {

							$applicationTypeList['resultList'][$key] = $v['app_code'].' '.$v['name'];

							if (!empty($v['url']))
								$applicationTypeList['resultDropDown'][$key] = $v['app_code'].' '.$v['name'];
						}
						else
							$applicationTypeList[$key] = $v['app_code'].' '.$v['name'];
					}

					else {

						$obj = new ApplicationTypeEntity();
						$this->hydrator->hydrate($v, $obj);

						$applicationTypeList[$v['app_type']] = $obj;
					}
				}

				return $applicationTypeList;
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
	 * Извлича списък с услуги, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с услуги.
	 */
	public function getServiceList(&$totalCount, $langId, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_search(
					:id_service_list, :id_register_list, :status, :name, :id_app_type_list, :id_lang, :load_description, :load_short_description, :load_separate_value_i18n, :get_untranslated, :start_index, :row_count, :total_count);");

			$idServiceList = !empty($params['serviceId']) ? '{'.implode(',', array_map('intval', $params['serviceId'])).'}' : null;
			$idRegisterList = !empty($params['registerId']) ? '{'.implode(',', array_map('intval', $params['registerId'])).'}' : null;
			$status = !empty($params['status']) ? '{'.implode(',', array_map('intval', $params['status'])).'}' : (isset($params['status']) && $params['status'] != '' ? '{0}' : null);
			$name = !empty($params['name']) ? $params['name'] : null;
			$idAppTypeList = !empty($params['appTypeId']) ? '{'.implode(',', array_map('intval', $params['appTypeId'])).'}' : null;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadShortDescription = !empty($params['loadShortDescription']) ? $params['loadShortDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : false;

			$container = new ParameterContainer();
			$container->offsetSet('id_service_list', $idServiceList);
			$container->offsetSet('id_register_list', $idRegisterList);
			$container->offsetSet('status', $status);
			$container->offsetSet('name', $name);
			$container->offsetSet('id_app_type_list', $idAppTypeList);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_short_description', $loadShortDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_services'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				if (!empty($params['getPlainResult'])) {

					$serviceAppTypeList = [];
					foreach ($result as $k => $v)
						$serviceAppTypeList[$v['app_type_id']] = $v['payment_type_ids'];

					return $serviceAppTypeList;
				}
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