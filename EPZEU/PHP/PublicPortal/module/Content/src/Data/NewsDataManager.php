<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Content\Entity\NewsEntity;
use Content\Entity\NewsDocEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Новина.
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
			$isHotNews = isset($params['isHotNews']) ? $params['isHotNews'] : null;
			$isActive = isset($params['isActive']) ? $params['isActive'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$loadShortDescription = !empty($params['loadShortDescription']) ? $params['loadShortDescription'] : false;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$rowCount = isset($params['rowCount']) ? $params['rowCount'] : null;

			$startIndex = \Application\Service\AppService::createStartIndex($params);

			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_news_list', $idNewsList);
			$container->offsetSet('id_register', $registerId);
			$container->offsetSet('title', $title);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('is_hot', $isHotNews, $container::TYPE_INTEGER);
			$container->offsetSet('is_active', $isActive, $container::TYPE_INTEGER);
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
	 * Извлича съдържание на файл с изображение към новина.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @return string Съдържание на файл.
	 */
	public function getNewsImage($newsId) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_news_image_read(:id_news)");

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
	 * Извлича съдържание на файл прикачен към новина.
	 *
	 * @param int $fileId Идентификатор на файл.
	 * @return string Съдържание на файл.
	 */
	public function getFileContent($fileId, $getResourse = false) {

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

			return $getResourse ? stream_get_contents($fileContent) : $fileContent;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}
}