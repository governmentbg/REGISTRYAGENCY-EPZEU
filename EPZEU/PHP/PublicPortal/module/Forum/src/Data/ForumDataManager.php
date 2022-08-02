<?php

namespace Forum\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;
use Forum\Entity\ForumEntity;


/**
 * Клас за поддържане и съхранение на теми и коментари във форум.
 *
 * @package Forum
 * @subpackage Data
 */
class ForumDataManager {


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
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $userService, $userDM) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->userService = $userService;

		$this->userDM = $userDM;
	}

	/**
	 * Добавя контекстен потребител
	 *
	 * @return bool
	 */
	public function setContextUser() {

		if ($user = $this->userService->getUser())
			return $this->userDM->setContextUser($user->getUserId());

		return $this->userDM->setContextUser(\User\Module::SYS_USER);
	}


	/**
	 * Добавя нова тема във форум.
	 *
	 * @param ForumEntity $dataObj Тема във форум.
	 * @return bool Резултат от операцията.
	 */
	public function addTopic(ForumEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_create(:title)");

			$container = new ParameterContainer();

			$container->offsetSet('title', $dataObj->getTitle(), $container::TYPE_STRING);
			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();

			$topicId = $result['p_theme_id'];

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_comments_create(:id_topic, :comment)");

			$container = new ParameterContainer();
			$container->offsetSet('id_topic', $topicId, $container::TYPE_INTEGER);
			$container->offsetSet('comment', $dataObj->getComment(), $container::TYPE_STRING);
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
	 * Добавя нов коментар по тема във форум.
	 *
	 * @param ForumEntity $dataObj Коментар по тема.
	 * @return bool Резултат от операцията.
	 */
	public function addComment(ForumEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_comments_create(:id_topic, :comment)");

			$container = new ParameterContainer();
			$container->offsetSet('id_topic', $dataObj->getThemeId());
			$container->offsetSet('comment', $dataObj->getComment());
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
	 * Извлича списък с теми във форум, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с теми във форум.
	 */
	public function getTopicList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_search(:id_list, :start_index, :row_count, :total_count)");

			$idList = !empty($params['idList']) ? '{'.$params['idList'].'}' : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();

			$container->offsetSet('id_list', $idList);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_themes'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ForumEntity());
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
	 * Извлича списък с коментари по тема във форум, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с коментари по тема.
	 */
	public function getCommentList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_comments_search
					(:id_theme_comment, :id_theme, :status, :date_from, :date_to, :title, :comment, :name, :load_first, :start_index, :row_count, :max_nor, :total_count)");

			$themeCommentId = !empty($params['themeCommentId']) ? $params['themeCommentId'] : null;
			$themeId = !empty($params['themeId']) ? $params['themeId'] : null;
			$status = !empty($params['status']) ? $params['status'] : null;
			$dateFrom = !empty($params['dateFrom']) ? $params['dateFrom'] : null;
			$dateTo = !empty($params['dateTo']) ? $params['dateTo'] : null;
			$title = !empty($params['title']) ? $params['title'] : null;
			$comment = !empty($params['comment']) ? $params['comment'] : null;

			$loadFirst = !empty($params['loadFirst']) ? $params['loadFirst'] : false;
			$name = !empty($params['name']) ? $params['name'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);

			$maxNor = null;
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();

			$container->offsetSet('id_theme_comment', $themeCommentId);
			$container->offsetSet('id_theme', $themeId);
			$container->offsetSet('status', $status);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('title', $title);
			$container->offsetSet('comment', $comment);
			$container->offsetSet('name', $name);
			$container->offsetSet('load_first', $loadFirst);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('max_nor', $maxNor);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_themes_comments'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ForumEntity());
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