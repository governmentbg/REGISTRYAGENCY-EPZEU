<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Content\Entity\HtmlPageEntity;
use Content\Entity\PageEntity;

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
	 * Добавя HTML страница.
	 *
	 * @param HtmlPageEntity $dataObj HTML страница.
	 * @return bool Резултат от операцията.
	 */
	public function addHtmlPage(HtmlPageEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_html_pages_create(:id_module, :title, :content)");

			$container = new ParameterContainer();
			$container->offsetSet('id_module', $dataObj->getModuleId(), $container::TYPE_INTEGER);
			$container->offsetSet('title', $dataObj->getTitle());
			$container->offsetSet('content', $dataObj->getContent());

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

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
	 * Обновява данни за HTML страница.
	 *
	 * @param int $pageId Идентификатор на HTML страница.
	 * @param HtmlPageEntity $dataObj HTML страница.
	 * @return bool Резултат от операцията.
	 */
	public function updateHtmlPageById(int $pageId, HtmlPageEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_html_pages_update (
				:id_page, :id_module, :title, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageId);
			$container->offsetSet('id_module', $dataObj->getModuleId());
			$container->offsetSet('title', $dataObj->getTitle());
			$container->offsetSet('content', $dataObj->getContent());

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
	 * Обновява статус на HTML страница.
	 *
	 * @param int $pageId Идентификатор на HTML страница.
	 * @param int $status Статус на HTML страница.
	 * @return bool Резултат от операцията.
	 */
	public function changePageStatus($pageId, $status) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_html_pages_status_update(:id_page, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute();

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
	 * Добавя страница в йерархична структура
	 *
	 * @param PageEntity $dataObj Йерархична страница.
	 * @return bool Резултат от операцията.
	 */
	public function addNestedPage(PageEntity $dataObj) {

		try {


			$uuid = null;

			if ($dataObj->getFiles()) {
				$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());
				$uuid = array_shift($filesUuid);
			}

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_pages_create(
				:id_register, :title, :content, :page_type, :id_service, :id_application, :id_parent, :is_group, :uuid)");

			$serviceId = $dataObj->getServiceId() ?: null;
			$applicationId =  $dataObj->getApplicationId() ?: null;
			$title = !empty($dataObj->getTitle()) ? $dataObj->getTitle() : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_register', $dataObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('title', $title, $container::TYPE_STRING);
			$container->offsetSet('content', $dataObj->getContent(), $container::TYPE_STRING);
			$container->offsetSet('page_type', $dataObj->getType(), $container::TYPE_INTEGER);
			$container->offsetSet('id_service', $serviceId);
			$container->offsetSet('id_application', $applicationId);
			$container->offsetSet('id_parent', $dataObj->getParentId(), $container::TYPE_INTEGER);
			$container->offsetSet('is_group', $dataObj->getIsGroup(), $container::TYPE_INTEGER);
			$container->offsetSet(':uuid', $uuid);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute();

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
	 * Обновява страница от йерархична структура.
	 *
	 * @param int $pageId Идентификатор на йерархична страница.
	 * @param PageEntity $dataObj Йерархична страница.
	 * @return bool Резултат от операцията.
	 */
	public function updateNestedPageById($pageId, PageEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$uuid = null;

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_pages_update(:id_page, :title, :content, :uuid)");

			if (!empty($dataObj->getFiles())) {
				if ($dataObj->getFiles()) {
					$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());
					$uuid = array_shift($filesUuid);
				}
			}

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $dataObj->getTitle(), $container::TYPE_STRING);
			$container->offsetSet('content', $dataObj->getContent(), $container::TYPE_STRING);
			$container->offsetSet('uuid', $uuid);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute();

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
	 * Извлича списък с йерархични страници, филтрирани по определени критерии
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
	 * Променя подредбата на йерархични страници и групи.
	 *
	 * @param int $parentId Идентификатор на йерархична страница от по-горно ниво.
	 * @param array $idListArray Списък с идентификатори на йерархични страници.
	 * @return bool Резултат от операцията.
	 */
	public function reorderNestedPageList(int $parentId, array $idListArray) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_pages_order_update (:id_list, :id_parent)");

			$idList = '{'.implode(',', array_map('intval', $idListArray)).'}';

			$container = new ParameterContainer();
			$container->offsetSet('id_parent', $parentId, $container::TYPE_INTEGER);
			$container->offsetSet('id_list', $idList);

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
	 * Изтрива страница или група.
	 *
	 * @param int $pageId Идентификатор на йерархична страница.
	 * @return bool Резултат от операцията.
	 */
	public function deleteNestedPageById($pageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_pages_delete (:id_page)");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageId, $container::TYPE_INTEGER);

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
	 * Добавя превод за йерархична страница.
	 *
	 * @param PageEntity $pageObj Йерархична страница.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addNestedPageI18n(PageEntity $pageObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_pages_i18n_create(:id_page, :id_language, :title, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageObj->getPageId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $pageObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('content', $pageObj->getContentI18n(), $container::TYPE_STRING);

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
	 * Обновява превод на йерархична страница.
	 *
	 * @param PageEntity $pageObj Йерархична страница.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateNestedPageI18n(PageEntity $pageObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_pages_i18n_update(:id_page, :id_language, :title, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageObj->getPageId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language', $languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $pageObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('content', $pageObj->getContentI18n(), $container::TYPE_STRING);

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
	 * Добавя превод на HTML страница.
	 *
	 * @param HtmlPageEntity $pageObj HTML страница.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addPageI18n(HtmlPageEntity $pageObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_html_pages_i18n_create(:id_page, :id_language, :title, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageObj->getPageId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $pageObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('content', $pageObj->getContentI18n(), $container::TYPE_STRING);

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
	 * Обновява превод на HTML страница.
	 *
	 * @param HtmlPageEntity $pageObj HTML страница.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updatePageI18n(HtmlPageEntity $pageObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_html_pages_i18n_update(:id_page, :id_language, :title, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('id_page', $pageObj->getPageId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language', $languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $pageObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('content', $pageObj->getContentI18n(), $container::TYPE_STRING);

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