<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Content\Entity\NewsEntity;
use Content\Entity\NewsDocEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Новини.
 *
 * @package Content
 * @subpackage Data
 */
class NewsDataManager {

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
	 * @var \Document\Service\DocumentService
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
	 * Извлича списък с новини, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с новини.
	 */
	public function getNewsList(&$totalCount, $langId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_search(
					:id_news_list, :id_register, :title, :date_from, :date_to, :is_hot, :is_active, :status, :id_lang, :load_short_description, :load_description, :load_separate_value_i18n, :get_untranslated, :start_index, :row_count, :total_count);");

			$idNewsList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;
			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;
			$title = !empty($params['title']) ? $params['title'] : null;
			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$isHotNews = !empty($params['isHotNews']) ? $params['isHotNews'] : null;
			$isActive = !empty($params['isActive']) ? $params['isActive'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$loadShortDescription = isset($params['loadShortDescription']) ? $params['loadShortDescription'] : false;
			$loadDescription = isset($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_news_list', $idNewsList);
			$container->offsetSet('id_register', $registerId);
			$container->offsetSet('title', $title);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('is_hot', $isHotNews);
			$container->offsetSet('is_active', $isActive);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$container->offsetSet('id_lang', $langId, $container::TYPE_INTEGER);
			$container->offsetSet('load_short_description', $loadShortDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_news'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new NewsEntity());
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
	 * Добавя новина.
	 *
	 * @param NewsEntity $dataObj Новина.
	 * @return bool Резултат от операцията.
	 */
	public function addNews(NewsEntity $dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_create (
				:id_register, :title, :short_description, :description, :news_date, :expiration_date, :is_hot);");

			$newsDate = \Application\Service\AppService::getSqlDate($dataObj->getNewsDate()).' '.$dataObj->getNewsTime().':00';

			$expirationDate = null;

			if ($dataObj->getExpirationDate())
				$expirationDate = \Application\Service\AppService::getSqlDate($dataObj->getExpirationDate()).' '.($dataObj->getExpirationTime() ? $dataObj->getExpirationTime().':00' : '00:00:00');

			$isHotNews = $dataObj->getIsHotNews() ? true : false;

			$container = new ParameterContainer();
			$container->offsetSet('id_register', $dataObj->getRegisterId());
			$container->offsetSet('title', $dataObj->getTitle());
			$container->offsetSet('short_description', $dataObj->getShortDescription());
			$container->offsetSet('description', $dataObj->getDescription());
			$container->offsetSet('news_date', $newsDate);
			$container->offsetSet('expiration_date', $expirationDate);
			$container->offsetSet('is_hot', $isHotNews);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$newsId = (int)$cursors['p_news_id'];

			if ($dataObj->getFiles()) {
				if (!$this->addNewsDocument($dataObj->getFiles(), $newsId))
					throw new \Exception('Add News: error files upload');
			}

			if ($dataObj->getImages()) {
				if (!$this->addNewsImage($newsId, $dataObj->getImages()[0]))
					throw new \Exception('Add News: error image upload');
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
	 * Обновява данни за новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @param NewsEntity $dataObj Новина.
	 * @return bool Резултат от операцията.
	 */
	public function updateNewsById(int $newsId, NewsEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_update (
				:id_news, :id_register, :title, :short_description, :description, :news_date, :expiration_date, :is_hot);");

			$newsDate = \Application\Service\AppService::getSqlDate($dataObj->getNewsDate()).' '.$dataObj->getNewsTime().':00';

			$expirationDate = null;

			if ($dataObj->getExpirationDate())
				$expirationDate = \Application\Service\AppService::getSqlDate($dataObj->getExpirationDate()).' '.($dataObj->getExpirationTime() ? $dataObj->getExpirationTime().':00' : '00:00:00');

			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId);
			$container->offsetSet('id_register', $dataObj->getRegisterId());
			$container->offsetSet('title', $dataObj->getTitle());
			$container->offsetSet('short_description', $dataObj->getShortDescription());
			$container->offsetSet('description', $dataObj->getDescription());
			$container->offsetSet('news_date', $newsDate, $container::TYPE_STRING);
			$container->offsetSet('expiration_date', $expirationDate, $container::TYPE_STRING);
			$container->offsetSet('is_hot', $dataObj->getIsHotNews());

			$stmt->setParameterContainer($container);
			$stmt->execute();

			if ($dataObj->getFiles())
				$this->addNewsDocument($dataObj->getFiles(), $newsId);

			if ($dataObj->getDeletedFiles())
				$this->deleteNewsFiles($dataObj->getDeletedFiles());

			if ($dataObj->getImages())
				$this->addNewsImage($newsId, $dataObj->getImages()[0]);

			elseif ($dataObj->getDeletedImages())
				$this->deleteNewsImage($newsId);

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
	 * Добавя файлово съдържание към новина.
	 *
	 * @param array $fileArr Масив с файлове.
	 * @param int $newsId Идентификатор на новина.
	 * @param bool $startTransaction Флаг, указващ дали заявките към базата данни да се изпълнят в транзакция.
	 * @return bool Резултат от операцията.
	 */
	public function addNewsDocument(array $files, $newsId) {

		try {

			$filesUuidList = \Document\Service\DocumentService::extractUuidFromFileList($files);
			$filesUuidArr = '{'.implode(',', $filesUuidList).'}';

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_documents_create(:id_news, :uuid_list)");
			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId, $container::TYPE_INTEGER);
			$container->offsetSet('uuid_list', $filesUuidArr);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			return true;

		}
		catch(\Exception $e) {

			if ($startTransaction)
				$this->dbAdapter->getDriver()->getConnection()->rollback();

			AppService::handleDbError($e);
			return false;
		}
	}

	/**
	 * Изтрива изображение към новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @return bool Резултат от операцията.
	 */
	public function deleteNewsImage($newsId) {

		try {

			$newsObj = $this->getNewsList($totalCount, null, ['idList' => [$newsId], 'totalCount' => false])->current();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_news_image_upload(:id_news, :uuid)");

			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId, $container::TYPE_INTEGER);
			$container->offsetSet('uuid', null);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			return true;

		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;

		}
	}

	/**
	 * Извлича списък с файлове прикачени към новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @param array $docIdArr Масив с идентификатори на файлове.
	 * @return array Масив с файлове.
	 */
	public function getNewsFiles($newsId, $docIdArr = null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_documents_search (:id_doc_list, :id_news);");

			$container = new ParameterContainer();


			if ($docIdArr)
				$docIdArr = '{'.implode(',', array_map('intval', $docIdArr)).'}';

			if ($newsId)
				$newsId = '{'.$newsId.'}';

			$container->offsetSet('id_doc_list', $docIdArr);
			$container->offsetSet('id_news', $newsId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_news_documents'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new NewsDocEntity());
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
	 * Изтрива файлове прикачени към новина.
	 *
	 * @param array $docIdArr Масив с идентификатори на файлове.
	 * @return bool Резултат от операцията.
	 */
	public function deleteNewsFiles($docIdArr) {

		try {

			$fileList = $this->getNewsFiles(null, $docIdArr);

			foreach ($docIdArr as $docId) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_documents_delete(:id_doc);");

				$container = new ParameterContainer();
				$container->offsetSet('id_doc', $docId);

				$stmt->setParameterContainer($container);
				$stmt->execute();
			}

			return true;

		}
		catch (\Exception $e) {

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Добавя изображение към новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @param string $imageName Име на изображение.
	 * @return bool Резултат от операцията.
	 */
	public function addNewsImage($newsId, $uuid) {

		if (!$imageConfig = json_decode($uuid))
			return false;

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_news_image_upload(:id_news, :uuid)");

			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId, $container::TYPE_INTEGER);
			$container->offsetSet('uuid', $imageConfig->uuid);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			return true;
		}
		catch (\Exception $e) {
			return false;
		}
	}

	/**
	 * Извлича съдържание на файл с изображение към новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @return string Съдържание на файл.
	 */
	public function getNewsImage($newsId) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_news_image_read(:id_news)");

			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			if ($cursors['p_image'])
				return $cursors['p_image'];

			return false;

		}
		catch (\Exception $e) {

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Обновява статус на бюлетин.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @param int $status Статус на новина.
	 * @return bool Резултат от операцията.
	 */
	public function changeNewsStatus($newsId, $status) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_news_status_update(:id_news, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('id_news', $newsId, $container::TYPE_INTEGER);
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
	 * Извлича съдържание на файл прикачен към новина.
	 *
	 * @param int $fileId Идентификатор на файл.
	 * @return string Съдържание на файл.
	 */
	public function getFileContent($fileId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM  cms.f_news_documents_content_read(:id_file)");

			$container = new ParameterContainer();
			$container->offsetSet('id_file', $fileId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			$fileContent = $result['p_content'];

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

	/**
	 * Добавя превод на новина.
	 *
	 * @param NewsEntity $newsObj Новина.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addNewsI18n($newsObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_i18n_create(
						:news_id, :id_language, :title, :short_description, :description);");

			$container = new ParameterContainer();
			$container->offsetSet('news_id', $newsObj->getNewsId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $newsObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('short_description', $newsObj->getShortDescriptionI18n(), $container::TYPE_STRING);
			$container->offsetSet('description', $newsObj->getDescriptionI18n(), $container::TYPE_STRING);

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
	 * Обновява превод на новина.
	 *
	 * @param NewsEntity $newsObj Новина.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateNewsI18n($newsObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_i18n_update(
				:news_id, :id_language, :title, :short_description, :description);");

			$container = new ParameterContainer();
			$container->offsetSet('news_id', $newsObj->getNewsId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $newsObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('short_description', $newsObj->getShortDescriptionI18n(), $container::TYPE_STRING);
			$container->offsetSet('description', $newsObj->getDescriptionI18n(), $container::TYPE_STRING);

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