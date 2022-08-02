<?php

namespace Document\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;

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

			$this->setContextUser();

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
}