<?php

namespace Forum\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Zend\Db\Adapter\Adapter;
use Zend\Db\Adapter\ParameterContainer;
use Forum\Entity\ForbiddenWordEntity;
use Forum\Entity\ForumEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Форум.
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
	 * Извлича списък със забранени думи, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със забранени думи.
	 */
	public function getForbiddenWordList(&$totalCount, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_forbidden_words_search(
					:id_word_list, :word, :start_index, :row_count, :total_count);");

			$idWordList = !empty($params['wordId']) ? '{'.implode(',', array_map('intval', $params['wordId'])).'}' : null;
			$word = !empty($params['word']) ? $params['word'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_word_list', $idWordList);
			$container->offsetSet('word', $word, $container::TYPE_STRING);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_forbidden_words'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ForbiddenWordEntity());
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
	 * Добавя забранена дума.
	 *
	 * @param ForbiddenWordEntity $dataObj забранена дума.
	 * @return bool Резултат от операцията.
	 */
	public function addForbiddenWord($dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_forbidden_words_create(:word);");

			$container = new ParameterContainer();
			$container->offsetSet('word', $dataObj->getWord(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$forbiddenWordId = $result['p_word_id'];

			$connection->commit();

			return $forbiddenWordId;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Обновява забранена дума.
	 *
	 * @param ForbiddenWordEntity $postData Забранена дума.
	 * @return bool Резултат от операцията.
	 */
	public function updateForbiddenWordById(ForbiddenWordEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Обновява данни за услуга
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_forbidden_words_update(
					:word_id, :word);");

			$container = new ParameterContainer();

			$container->offsetSet('word_id', $dataObj->getWordId(), $container::TYPE_INTEGER);
			$container->offsetSet('word', $dataObj->getWord(), $container::TYPE_STRING);

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
	 * Изтрива забранена дума.
	 *
	 * @param int $forbiddenWordId Идентификатор на забранена дума.
	 * @return bool Резултат от операцията.
	 */
	public function deleteForbiddenWordById($forbiddenWordId) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT cms.f_forbidden_words_delete(:word_id);");

			$container = new ParameterContainer();
			$container->offsetSet('word_id', $forbiddenWordId, $container::TYPE_INTEGER);
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
	 * Взима списък с коментари, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с коментари.
	 */
	public function getCommentList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_themes_comments_search
					(:id_theme_comment, :id_theme, :status, :date_from, :date_to, :title, :comment, :author, true, :start_index, :row_count, :max_nor, :total_count)");

			$themeCommentId = !empty($params['themeCommentId']) ? '{'.$params['themeCommentId'].'}' : null;
			$themeId = !empty($params['themeId']) ? $params['themeId'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$title = !empty($params['title']) ? $params['title'] : null;
			$comment = !empty($params['comment']) ? $params['comment'] : null;
			$author = !empty($params['author']) ? $params['author'] : null;
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
			$container->offsetSet('author', $author);
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

	/**
	 * Обновява статус на коментар.
	 *
	 * @param int $commentId Идентификатор на коментар.
	 * @param int $status Статус на коментар.
	 * @return bool Резултат от операцията.
	 */
	public function changeCommentStatus($commentId, $status) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT cms.f_themes_comments_status_update(:id_theme_comment, :status);");

			$container = new ParameterContainer();
			$container->offsetSet('id_theme_comment', $commentId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$stmt->setParameterContainer($container);

			$stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}

}