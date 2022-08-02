<?php
namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\ParameterContainer;
use Content\Entity\VideoLessonEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Видео уроци.
 *
 * @package Content
 * @subpackage Data
 */
class VideoLessonDataManager {

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
	 * Извлича списък с видео уроци, филтрирани по определени критерии.
	 *
	 * @param reference &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param int $langId Идентификатор на език.
	 * @return array Масив с видео уроци.
	 */
	public function getVideoLessonList(&$totalCount, $langId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_search(
					:id_lesson_list, :status, :id_register, :id_lang, :load_description, :load_content, :load_separate_value_i18n, :get_untranslated, :start_index, :row_count, :total_count);");

			$idLessonList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;
			$status = !empty($params['status']) ? $params['status'] : null;
			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadContentInfo = !empty($params['loadContentInfo']) ? $params['loadContentInfo'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_lesson_list', $idLessonList);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$container->offsetSet('id_register', $registerId, $container::TYPE_INTEGER);
			$container->offsetSet('id_lang', $langId, $container::TYPE_INTEGER);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_content', $loadContentInfo, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_lessons'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new VideoLessonEntity());
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
	 * Добавя видео урок.
	 *
	 * @param VideoLessonEntity $dataObj Видео урок.
	 * @return bool Резултат от операцията.
	 */
	public function addVideoLesson($dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_create(
						:register_id, :title, :description, :uuid);");


			$filesUuidList = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());

			$uuid = array_shift($filesUuidList);

			$container = new ParameterContainer();
			$container->offsetSet('register_id', $dataObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('title', $dataObj->getTitle(), $container::TYPE_STRING);
			$container->offsetSet('description', $dataObj->getDescription(), $container::TYPE_STRING);
			$container->offsetSet('uuid', $uuid, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$videoLessonId = $result['p_lesson_id'];

			$connection->commit();

			return $videoLessonId;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Редактира видео урок.
	 *
	 * @param VideoLessonEntity $dataObj Видео урок.
	 * @return bool Резултат от операцията.
	 */
	public function updateVideoLessonById($dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_update(
							:lesson_id, :register_id, :title, :description, :status, :uuid);");
			$uuid = null;

			if ($dataObj->getFiles()) {
				$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($dataObj->getFiles());
				$uuid = array_shift($filesUuid);
			}

			$container = new ParameterContainer();
			$container->offsetSet('lesson_id', $dataObj->getLessonId(), $container::TYPE_INTEGER);
			$container->offsetSet('register_id', $dataObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('title', $dataObj->getTitle(), $container::TYPE_STRING);
			$container->offsetSet('description', $dataObj->getDescription());
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);
			$container->offsetSet('uuid', $uuid, $container::TYPE_STRING);

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
	 * Извлича съдържание на файл към видео урок.
	 *
	 * @param int $lessonId Идентификатор на видео урок.
	 * @param int $langId Идентификатор на език.
	 * @return string Съдържание на файл.
	 */
	public function getVideoLessonFileById($lessonId, $langId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_content_read(:id_lesson, :id_lang);");

			$container = new ParameterContainer();
			$container->offsetSet('id_lesson', $lessonId, $container::TYPE_INTEGER);
			$container->offsetSet('id_lang', $langId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$stream = $cursors['f_video_lessons_content_read'];

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
	 * Добавя превод на видео урок.
	 *
	 * @param VideoLessonEntity $videoLessonObj Видео урок.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addVideoLessonI18n($videoLessonObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_i18n_create(
						:lesson_id, :id_language, :title, :description);");

			$container = new ParameterContainer();
			$container->offsetSet('lesson_id', $videoLessonObj->getLessonId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $videoLessonObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('description', $videoLessonObj->getDescriptionI18n(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$stmt->execute();

			$uuid = null;

			if ($videoLessonObj->getFiles()) {
				$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($videoLessonObj->getFiles());
				$uuid = array_shift($filesUuid);
			}

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_i18n_content_upload(
				:id_lesson, :id_language, :uuid);");

			$container = new ParameterContainer();
			$container->offsetSet('id_lesson', $videoLessonObj->getLessonId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('uuid', $uuid);

			$stmt->setParameterContainer($container);
			$stmt->execute()->current();

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
	 * Обновява данни на видео урок.
	 *
	 * @param VideoLessonEntity $videoLessonObj Видео урок.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateVideoLessonI18n($videoLessonObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_i18n_update(:lesson_id, :id_language, :title, :description);");

			$container = new ParameterContainer();
			$container->offsetSet('lesson_id', $videoLessonObj->getLessonId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('title', $videoLessonObj->getTitleI18n(), $container::TYPE_STRING);
			$container->offsetSet('description', $videoLessonObj->getDescriptionI18n(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			// изтрива съдържание на видео файл
			if ($videoLessonObj->getDeletedFiles()) {

				$uuid = null;

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_i18n_content_upload(:id_lesson, :id_language, :uuid);");

				$container = new ParameterContainer();
				$container->offsetSet('id_lesson', $videoLessonObj->getLessonId(), $container::TYPE_INTEGER);
				$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
				$container->offsetSet('uuid', $uuid);

				$stmt->setParameterContainer($container);
				$stmt->execute()->current();
			}

			// Добавя нов видео файл
			if ($videoLessonObj->getFiles()) {

				$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($videoLessonObj->getFiles());
				$uuid = array_shift($filesUuid);

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_video_lessons_i18n_content_upload(
					:id_lesson, :id_language, :uuid);");

				$container = new ParameterContainer();
				$container->offsetSet('id_lesson', $videoLessonObj->getLessonId(), $container::TYPE_INTEGER);
				$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
				$container->offsetSet('uuid', $uuid);

				$stmt->setParameterContainer($container);
				$stmt->execute()->current();
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
}