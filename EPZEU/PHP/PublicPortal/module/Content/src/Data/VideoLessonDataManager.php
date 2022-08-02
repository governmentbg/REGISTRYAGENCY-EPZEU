<?php

namespace Content\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;

use Content\Entity\VideoLessonEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Видео урок.
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
	 * Извлича списък с видео уроци, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
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
	 * Извлича съдържание на файл с видео урок.
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

			$fileContent = $cursors['f_video_lessons_content_read'];

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