<?php

namespace Document\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Content\Entity\NewsEntity;
use Content\Entity\NewsDocEntity;
use Document\Entity\DocumentEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Новина.
 *
 * @package Content
 * @subpackage Data
 */
class DocumentDataManager {


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
	public function uploadDocument($params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM sys.f_document_data_temp_create(
					:uuid, :file_name, :file_size, :content_type, :content, :invalid_after, :cin);");

			$uuid = !empty($params['uuid']) ? $params['uuid'] : null;
			$fileName = !empty($params['fileName']) ? $params['fileName'] : null;
			$fileSize = !empty($params['fileSize']) ? $params['fileSize'] : null;
			$contentType = !empty($params['contentType']) ? $params['contentType'] : null;
			$content = !empty($params['content']) ? $params['content'] : null;
			$invalidAfter = !empty($params['invalidAfter']) ? $params['invalidAfter'] : null;
			$cin = !empty($params['cin']) ? $params['cin'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('uuid', $uuid);
			$container->offsetSet('file_name', $fileName);
			$container->offsetSet('file_size', $fileSize);
			$container->offsetSet('content_type', $contentType);
			$container->offsetSet('content', $content, $container::TYPE_LOB);
			$container->offsetSet('invalid_after', $invalidAfter, $container::TYPE_INTEGER);
			$container->offsetSet('cin', $cin);

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
	 * Изтрива файл от временна папка.
	 *
	 * @param int $newsId Идентификатор на новина.
	 * @return string Съдържание на файл.
	 */
	public function deleteTempFile(array $uuidList) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM sys.f_document_data_temp_delete(:uuid_list)");

			$uuidArray = '{'.implode(',', $uuidList).'}';

			$container = new ParameterContainer();
			$container->offsetSet('uuid_list', $uuidArray);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			return true;

		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}


	/**
	 * Взима файл от временна папка
	 */
	public function getTmpFile(array $uuidList) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM sys.f_document_data_temp_search(:uuid_list)");

			$uuidArray = '{'.implode(',', $uuidList).'}';

			$container = new ParameterContainer();
			$container->offsetSet('uuid_list', $uuidArray);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['ref_documents_temp'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new DocumentEntity());
				return $resultSet->initialize($result);
			}

			return $result;

		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return [];
		}
	}
}