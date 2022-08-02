<?php

namespace Message\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Message\Entity\MessageEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Съобщения.
 *
 * @package Message
 * @subpackage Data
 */
class MessageDataManager {

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
	 * Извлича списък със съобщения, филтрирани по определени критерии
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със съобщения.
	 */
	public function getMessageList(&$totalCount, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_messages_search(
					:id_list, :about, :status, :date_from, :date_to, :start_index, :row_count, :total_count, :load_recipients);");

			$idMessageList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;
			$about = !empty($params['about']) ? $params['about'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']).' 00:00:00' : null;
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$loadRecipients = !empty($params['loadRecipients']) ? $params['loadRecipients'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idMessageList);
			$container->offsetSet('about', $about, $container::TYPE_STRING);
			$container->offsetSet('status', $status, $container::TYPE_INTEGER);
			$container->offsetSet('date_from', $dateFrom, $container::TYPE_STRING);
			$container->offsetSet('date_to', $dateTo, $container::TYPE_STRING);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);
			$container->offsetSet('load_recipients', $loadRecipients, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_messages'];


			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			if (!empty($loadRecipients) && !empty($idMessageList)) {

				$refRecipientsCursor = $cursors['p_ref_message_recipients'];
				$stmtRecipients = $this->dbAdapter->query('FETCH ALL IN "'. $refRecipientsCursor .'";');
				$resultRecipients = $stmtRecipients->execute();
			}

			$connection->commit();

			if ($result->isQueryResult()) {
				$obj = new MessageEntity();

				if (!empty($loadRecipients) && !empty($idMessageList) && $resultRecipients->isQueryResult()) {

					$recipientArr = [];

					foreach ($resultRecipients as $recipients)
						$recipientArr[$recipients['user_id']] = $recipients['email'].' '.$recipients['first_name'].' '.$recipients['middle_name'].' '.$recipients['family_name'];

					$obj->setUserIdList($recipientArr);
				}

				$resultSet = new HydratingResultSet($this->hydrator, $obj);

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
	 * Добавя съобщение.
	 *
	 * @param MessageEntity $dataObj Съобщение.
	 * @return bool Резултат от операцията.
	 */
	public function addMessage($dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_messages_create(:about, :content, :is_to_all_cr, :is_to_all_pr, :is_to_all_epzeu);");

			$isToAllCr = !empty($dataObj->getIsToAllCr()) ? $dataObj->getIsToAllCr() : null;
			$isToAllPr = !empty($dataObj->getIsToAllPr()) ? $dataObj->getIsToAllPr() : null;
			$isToAllEpzeu = !empty($dataObj->getIsToAllEpzeu()) ? $dataObj->getIsToAllEpzeu() : null;

			$container = new ParameterContainer();
			$container->offsetSet('about', $dataObj->getAbout(), $container::TYPE_STRING);
			$container->offsetSet('content', $dataObj->getContent(), $container::TYPE_STRING);
			$container->offsetSet('is_to_all_cr', $isToAllCr, $container::TYPE_INTEGER);
			$container->offsetSet('is_to_all_pr', $isToAllPr, $container::TYPE_INTEGER);
			$container->offsetSet('is_to_all_epzeu', $isToAllEpzeu, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$messageId = $result['p_message_id'];

			if (!empty($dataObj->getUserRecipientType()) && $messageId) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_message_recipients_create(
							:message_id, :user_id);");

				$useIdList = $dataObj->getUserIdList();

				foreach ($useIdList as $userId) {

					$container = new ParameterContainer();
					$container->offsetSet('message_id', $messageId, $container::TYPE_INTEGER);
					$container->offsetSet('user_id', $userId, $container::TYPE_INTEGER);

					$stmt->setParameterContainer($container);
					$result = $stmt->execute()->current();
				}
			}

			$connection->commit();

			return $messageId;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Обновява съобщение.
	 *
	 * @param MessageEntity $postData Съобщение.
	 * @return bool Резултат от операцията.
	 */
	public function updateMessageById(MessageEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Обновява данни за съобщение
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_messages_update(
					:message_id, :about, :content, :is_to_all_cr, :is_to_all_pr, :is_to_all_epzeu);");

			$isToAllCr = !empty($dataObj->getIsToAllCr()) ? $dataObj->getIsToAllCr() : null;
			$isToAllPr = !empty($dataObj->getIsToAllPr()) ? $dataObj->getIsToAllPr() : null;
			$isToAllEpzeu = !empty($dataObj->getIsToAllEpzeu()) ? $dataObj->getIsToAllEpzeu() : null;

			$container = new ParameterContainer();

			$container->offsetSet('message_id', $dataObj->getMessageId(), $container::TYPE_INTEGER);
			$container->offsetSet('about', $dataObj->getAbout(), $container::TYPE_STRING);
			$container->offsetSet('content', $dataObj->getContent(), $container::TYPE_STRING);
			$container->offsetSet('is_to_all_cr', $isToAllCr, $container::TYPE_INTEGER);
			$container->offsetSet('is_to_all_pr', $isToAllPr, $container::TYPE_INTEGER);
			$container->offsetSet('is_to_all_epzeu', $isToAllEpzeu, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute();

			// Добавяне на потребители, до които се изпраща съобщение
			if (!empty($dataObj->userArr['add'])) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_message_recipients_create(:message_id, :user_id)");

				foreach ($dataObj->userArr['add'] as $userId) {

					$container = new ParameterContainer();
					$container->offsetSet('message_id', $dataObj->getMessageId(), $container::TYPE_INTEGER);
					$container->offsetSet('user_id', $userId, $container::TYPE_INTEGER);

					$stmt->setParameterContainer($container);
					$result = $stmt->execute()->current();
				}
			}

			// Изтриване на потребители, до които се изпраща съобщение
			if (!empty($dataObj->userArr['delete'])) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_message_recipients_delete(:message_id, :user_id)");

				foreach ($dataObj->userArr['delete'] as $userId) {

					$container = new ParameterContainer();
					$container->offsetSet('message_id', $dataObj->getMessageId(), $container::TYPE_INTEGER);
					$container->offsetSet('user_id', $userId, $container::TYPE_INTEGER);

					$stmt->setParameterContainer($container);
					$result = $stmt->execute()->current();
				}
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
	 * Изтрива съобщение по уникален идентификатор.
	 *
	 * @param int $messageId Идентификатор на съобщение.
	 * @return bool Резултат от операцията.
	 */
	public function deleteMessageById($messageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT cms.f_messages_delete(:message_id);");

			$container = new ParameterContainer();
			$container->offsetSet('message_id', $messageId, $container::TYPE_INTEGER);
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
	 * Изпраща съобщение.
	 *
	 * @param int $messageId Идентификатор на съобщение.
	 * @return bool Резултат от операцията.
	 */
	public function sendMessageById($messageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM cms.f_messages_send(:message_id);");

			$container = new ParameterContainer();
			$container->offsetSet('message_id', $messageId, $container::TYPE_INTEGER);

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