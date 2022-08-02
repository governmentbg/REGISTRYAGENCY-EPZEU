<?php

namespace User\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;
use User\Entity\UserEntity;
use User\Entity\AuthEntity;
use Zend\Db\ResultSet\HydratingResultSet;
use User\Entity\SpecialAccessEntity;
use User\Entity\SpecialAccessDocEntity;
use User\Entity\ServiceLimitEntity;
use User\Entity\UserServiceLimitEntity;
use Application\Entity\LogEntity;
use User\Entity\AuditEntity;
use User\Entity\LoginSessionEntity;
use User\Entity\CertEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Потребител.
 *
 * @package User
 * @subpackage Data
 */
class UserDataManager {


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
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;

	/**
	 * Услуга за локализация на интерфейс.
	 *
	 * @var MvcTranslator
	 */
	protected $translator;

	/**
	 * Адаптер за връзка към база данни.
	 *
	 * @var AdapterInterface
	 */
	protected $dbAdapterAudit;

	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param array $config Масив с конфигурационни параметри.
	 * @param \Document\Service\DocumentService $documentService Услуга за работа с документи.
	 * @param AdapterInterface $dbAdapterAuditArchive Адаптер за връзка към база данни.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $config, $documentService, $restService, $translator, $dbAdapterAudit) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->config = $config;

		$this->documentService = $documentService;

		$this->restService = $restService;

		$this->translator = $translator;

		$this->dbAdapterAudit = $dbAdapterAudit;
	}


	/**
	 * Задава контекстен потребител.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @return bool Резултат от операцията.
	 */
	public function setContextUser($userId) {

		try {
			$stmt = $this->dbAdapter->query('SELECT sys.f_currentuser_set(:userId)');
			$stmt->execute(['userId' => $userId]);

			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}

	/**
	 * Извлича списък с видове потребители със специален достъп.
	 *
	 * @return array Масив с видове потребители със специален достъп.
	 */
	public function getSpecialAccessUserTypes() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_n_s_special_access_user_types_search(null, null, null, false)");

			$cursors = $stmt->execute()->current();

			$refCursor 	= $cursors['p_ref_special_access_user_types'];

			$stmt->getResource()->closeCursor();

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			$userTypesArr = [];

			foreach ($result as $k => $v)
				$userTypesArr[$v['user_type_id']] = $v['name'];

			$result->getResource()->closeCursor();

			$connection->commit();

			return $userTypesArr;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Добавя потребител.
	 *
	 * @param UserEntity $dataObj Потребител.
	 * @return array Масив с идентификатор и КИН на потребител.
	 */
	public function addUser(UserEntity $dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_create(
					:email, :first_name, :middle_name, :family_name, :contact_data, :organization, :special_user_access_type,
					:cr_bulletin_acceptance, :pr_bulletin_acceptance, :cr_message_acceptance, :pr_message_acceptance, :epzeu_message_acceptance, :status);");

			$firstName = !empty($dataObj->getFirstName()) ? $dataObj->getFirstName() : null;
			$middleName = !empty($dataObj->getMiddleName()) ? $dataObj->getMiddleName() : null;
			$familyName = !empty($dataObj->getFamilyName()) ? $dataObj->getFamilyName() : null;
			$contactData = !empty($dataObj->getContactData()) ? $dataObj->getContactData() : null;
			$organization = !empty($dataObj->getOrganization()) ? $dataObj->getOrganization() : null;
			$specialAccessUserType = !empty($dataObj->getSpecialAccessUserType()) ? $dataObj->getSpecialAccessUserType() : null;
			$crBulletinAcceptance = !empty($dataObj->getCrBulletinAcceptance()) ? $dataObj->getCrBulletinAcceptance() : null;
			$prBulletinAcceptance = !empty($dataObj->getPrBulletinAcceptance()) ? $dataObj->getPrBulletinAcceptance() : null;
			$crMessageAcceptance = !empty($dataObj->getCrMessageAcceptance()) ? $dataObj->getCrMessageAcceptance() : null;
			$prMessageAcceptance = !empty($dataObj->getPrMessageAcceptance()) ? $dataObj->getPrMessageAcceptance() : null;
			$epzeuMessageAcceptance = !empty($dataObj->getEpzeuMessageAcceptance()) ? $dataObj->getEpzeuMessageAcceptance() : null;

			$container = new ParameterContainer();
			$container->offsetSet('email', $dataObj->getEmail(), $container::TYPE_STRING);
			$container->offsetSet('first_name', $firstName, $container::TYPE_STRING);
			$container->offsetSet('middle_name', $middleName, $container::TYPE_STRING);
			$container->offsetSet('family_name', $familyName, $container::TYPE_STRING);
			$container->offsetSet('contact_data', $contactData, $container::TYPE_STRING);
			$container->offsetSet('organization', $organization, $container::TYPE_STRING);
			$container->offsetSet('special_user_access_type', $specialAccessUserType, $container::TYPE_INTEGER);
			$container->offsetSet('cr_bulletin_acceptance', $crBulletinAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('pr_bulletin_acceptance', $prBulletinAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('cr_message_acceptance', $crMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('pr_message_acceptance', $prMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('epzeu_message_acceptance', $epzeuMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$userId = $result['p_user_id'];
			$cin = $result['p_cin'];
			$verId = $result['p_user_ver_id'];

			// Добавя потребителско име
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_create(:id_user, :auth_type, null, :username, null)");
			$container = new ParameterContainer();

			$authType = 2;

			$container->offsetSet('id_user', $userId);
			$container->offsetSet('auth_type', $authType, $container::TYPE_INTEGER);
			$container->offsetSet('username', $dataObj->getUsername(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();
			$authenticationId = $result['p_authentication_id'];

			if (!empty($dataObj->getFiles())) {

				// Добавя заявка за достъп на потребител със специални права
				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_create(:id_user)");
				$container = new ParameterContainer();
				$container->offsetSet('id_user', $userId);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$requestId = $result['p_request_id'];

				// Одит заявка за специален достъп
				$specialAccessLog = new LogEntity();
				$specialAccessLog->setObjectType('SPECIAL_ACCESS_REQUEST');
				$specialAccessLog->setActionType('SUBMISSION');
				$specialAccessLog->setModule('EPZEU');
				$specialAccessLog->setFunctionality('USERS');
				$specialAccessLog->setKey($dataObj->getUsername());
				$specialAccessLog->setAdditionalData(null);
				$this->restService->logAuditData($specialAccessLog, 'Одит заявка за специален достъп \User\Data\UserDataManager::addUser');

				// Добавя файл към заявка


				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($dataObj->getFiles());

				$this->addSpecialAccessRequestDocument($fileArr, $requestId, $dataObj->getUsername());
			}

			// Добавяне на правa към потребител
			if (!empty($dataObj->getPermissionList())) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_permissions_create(:id_user, :permission_id)");
				$permissionIdList = '{'.implode(',', array_map('intval', $dataObj->getPermissionList())).'}';
				$container = new ParameterContainer();
				$container->offsetSet('id_user', $userId);
				$container->offsetSet('permission_id', $permissionIdList);
				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$permissionList = [];
				$permissionList = $this->getPermissions(false, false);

				$userPermissionList = [];
				if (!empty($permissionList))
					$userPermissionList = array_intersect_key($permissionList, array_flip($dataObj->getPermissionList()));

				// Одит права
				$permissionLog = new LogEntity();
				$permissionLog->setObjectType('PERMISSION');
				$permissionLog->setActionType('EDIT');
				$permissionLog->setModule('EPZEU');
				$permissionLog->setFunctionality('USERS');
				$permissionLog->setAdditionalData([$this->translator->translate('EP_USR_USER_RIGHTS_L') => $userPermissionList]);
				$permissionLog->setKey($dataObj->getUsername());
				$this->restService->logAuditData($permissionLog, 'Одит права \User\Data\UserDataManager::addUser');
			}

			$connection->commit();

			// Одит потребител
			$userLog = new LogEntity();
			$userLog->setObjectType('USER_PROFILE');
			$userLog->setActionType('REGISTRATION');
			$userLog->setModule('EPZEU');
			$userLog->setFunctionality('USERS');
			$userLog->setKey($dataObj->getUsername());
			$this->restService->logAuditData($userLog, 'Одит потребител \User\Data\UserDataManager::addUser');

			return ['user_id' => $userId, 'cin' => $cin];
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Обновява данни за потребител
	 *
	 * @param int $id Идентификатор на потребител.
	 * @param UserEntity $dataObj Потребител.
	 * @return bool Резултат от операцията.
	 */
	public function updateUserById($id, UserEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_update(
					:user_id, :email, :first_name, :middle_name, :family_name, :contact_data, :organization, :special_user_access_type,
					:cr_bulletin_acceptance, :pr_bulletin_acceptance, :cr_message_acceptance, :pr_message_acceptance, :epzeu_message_acceptance, :status);");

			$container = new ParameterContainer();

			$firstName = !empty($dataObj->getFirstName()) ? $dataObj->getFirstName() : null;
			$middleName = !empty($dataObj->getMiddleName()) ? $dataObj->getMiddleName() : null;
			$familyName = !empty($dataObj->getFamilyName()) ? $dataObj->getFamilyName() : null;
			$contactData = !empty($dataObj->getContactData()) ? $dataObj->getContactData() : null;
			$organization = !empty($dataObj->getOrganization()) ? $dataObj->getOrganization() : null;
			$specialAccessUserType = !empty($dataObj->getSpecialAccessUserType()) ? $dataObj->getSpecialAccessUserType() : null;
			$crBulletinAcceptance = !empty($dataObj->getCrBulletinAcceptance()) ? $dataObj->getCrBulletinAcceptance() : null;
			$prBulletinAcceptance = !empty($dataObj->getPrBulletinAcceptance()) ? $dataObj->getPrBulletinAcceptance() : null;
			$crMessageAcceptance = !empty($dataObj->getCrMessageAcceptance()) ? $dataObj->getCrMessageAcceptance() : null;
			$prMessageAcceptance = !empty($dataObj->getPrMessageAcceptance()) ? $dataObj->getPrMessageAcceptance() : null;
			$epzeuMessageAcceptance = !empty($dataObj->getEpzeuMessageAcceptance()) ? $dataObj->getEpzeuMessageAcceptance() : null;

			$container->offsetSet('user_id', $id, $container::TYPE_INTEGER);
			$container->offsetSet('email', $dataObj->getEmail(), $container::TYPE_STRING);
			$container->offsetSet('first_name', $firstName, $container::TYPE_STRING);
			$container->offsetSet('middle_name', $middleName, $container::TYPE_STRING);
			$container->offsetSet('family_name', $familyName, $container::TYPE_STRING);
			$container->offsetSet('contact_data', $contactData, $container::TYPE_STRING);
			$container->offsetSet('organization', $organization, $container::TYPE_STRING);
			$container->offsetSet('special_user_access_type', $specialAccessUserType, $container::TYPE_INTEGER);
			$container->offsetSet('cr_bulletin_acceptance', $crBulletinAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('pr_bulletin_acceptance', $prBulletinAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('cr_message_acceptance', $crMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('pr_message_acceptance', $prMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('epzeu_message_acceptance', $epzeuMessageAcceptance, $container::TYPE_INTEGER);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$verId = $result['p_user_ver_id'];

			$authType = $this->getUserAuthenticationById($id, \User\Controller\UserController::USER_AUTH_ACTIVE_DIRECTORY);
			$isActiveDirectoryUser = $authType->count() ? true : false;

			// Изтриване на правa към потребител
			if (!empty($dataObj->permissionArr['delete'])) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_permissions_delete(:id_user, :permission_id)");

				$permissionIdList = '{'.implode(',', array_map('intval', $dataObj->permissionArr['delete'])).'}';

				$container = new ParameterContainer();

				$container->offsetSet('id_user', $id);
				$container->offsetSet('permission_id', $permissionIdList);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();
			}

			// Добавяне на правa към потребител
			if (!empty($dataObj->permissionArr['add'])) {

				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_permissions_create(:id_user, :permission_id)");

				$permissionIdList = '{'.implode(',', array_map('intval', $dataObj->permissionArr['add'])).'}';

				$container = new ParameterContainer();

				$container->offsetSet('id_user', $id);
				$container->offsetSet('permission_id', $permissionIdList);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();
			}


			$connection->commit();

			// Промяна на права
			if (!empty($dataObj->permissionArr['delete']) || !empty($dataObj->permissionArr['add'])) {

				$userPermissionList = $this->getPermissionsListByUserId($id);

				$nPermissionList = $this->getPermissions(false, false);
				$userPermissionList = array_intersect_key($nPermissionList, array_flip($userPermissionList));

				//'permission_list' => $permissionList
				$userLog = new LogEntity();
				$userLog->setObjectType('PERMISSION');
				$userLog->setActionType('EDIT');
				$userLog->setModule('EPZEU');
				$userLog->setFunctionality('USERS');
				$userLog->setAdditionalData([$this->translator->translate('EP_USR_USER_RIGHTS_L') => $userPermissionList]);
				$userLog->setKey($isActiveDirectoryUser ? $dataObj->getUsername() : $dataObj->getEmail());
				$this->restService->logAuditData($userLog, 'Промяна на права \User\Data\UserDataManager::updateUserById');
			}

			// Одит на потребител

			$userObj = $this->getUserById($id);

			$userLog = new LogEntity();
			$userLog->setObjectType('USER_PROFILE');
			$userLog->setActionType('EDIT');
			$userLog->setModule('EPZEU');
			$userLog->setFunctionality('USERS');

			$userLog->setAdditionalData([
				$this->translator->translate('GL_EMAIL_L') => $userObj->getEmail(),
				$this->translator->translate('GL_PERSON_NAME_L') => $userObj->getFirstName(),
				$this->translator->translate('GL_PERSON_SURNAME_L') => $userObj->getMiddleName(),
				$this->translator->translate('GL_PERSON_FAMILYNAME_L') => $userObj->getFamilyName(),
				$this->translator->translate('EP_USR_CONTACT_DATA_L') => $userObj->getContactData(),
				$this->translator->translate('EP_USR_CUSTOMER_ID_L') => $userObj->getCin(),
				$this->translator->translate('EP_USR_ORGANIZATION_POSITION_L') => $userObj->getOrganization(),
			]);

			$userLog->setKey($isActiveDirectoryUser ? $userObj->getUsername() : $userObj->getEmail());
			$this->restService->logAuditData($userLog, 'Одит на потребител \User\Data\UserDataManager::updateUserById');

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
	 * Взима списък със заявки за специален достъп към потребител.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със заявки за специален достъп.
	 */
	public function getUserSpecialAccessList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_search(
					:request_ids, :users_ids, :date_from, :date_to, :access_status_ids, :email,
					:start_index, :row_count, :max_nor, :total_count);");

			$requestIdList = !empty($params['request_id_list']) ? '{'.$params['request_id_list'].'}' : null;
			$usersIdList = !empty($params['user_id']) ? '{'.$params['user_id'].'}' : null;
			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']) : null;
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$accessStatus = !empty($params['status']) ? '{'.$params['status'].'}' : '{0}';
			$email = !empty($params['email']) ? $params['email'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$maxNor = !empty($params['max_nor']) ? $params['max_nor'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('request_ids', $requestIdList);
			$container->offsetSet('users_ids', $usersIdList);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('access_status_ids', $accessStatus);
			$container->offsetSet('email', $email);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('max_nor', $maxNor);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = $cursors['p_count'];
			$refCursor = $cursors['p_ref_user_access_requests'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new SpecialAccessEntity());
				return $resultSet->initialize($result);
			}

			return [];

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Извлича списък с документи към заявки за специален достъп на потребител.
	 *
	 * @param string $requestIdList Списък с идентификатори на заявки за специален достъп, разделени със запетая.
	 * @param string $documentIdList Списък с идентификатори на документи, разделени със запетая.
	 * @return array Масив с документи към заявки за специален достъп.
	 */
	public function getSpecialAccessDocumentList($requestIdList = null, $documentIdList = null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_request_docs_search(:id_list, :id_request_list);");

			$requestIdList = $requestIdList ? '{'.$requestIdList.'}' : null;
			$documentIdList = $documentIdList ? '{'.$documentIdList.'}' : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $documentIdList);
			$container->offsetSet('id_request_list', $requestIdList);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_access_request_docs'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			$documentArr = [];

			foreach ($result as $doc) {

				$obj = new SpecialAccessDocEntity();
				$this->hydrator->hydrate($doc, $obj);

				$documentArr[$doc['request_id']][] = $obj;
			}

			return $documentArr;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Извлича съдържание на документ към заявка за специален достъп.
	 *
	 * @param int $documentId Идентификатор на документ.
	 * @return string Съдържание на документ.
	 */
	public function getSpecialAccessDocumentById($documentId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_request_docs_content_read(:id_doc);");

			$container = new ParameterContainer();
			$container->offsetSet('id_doc', $documentId, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$stream = stream_get_contents($cursors['p_content']);

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
	 * Извлича списък с потребители, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param bool $userList Флаг, указващ дали да върне конкретен потребител или списък с потребители.
	 * @return array Масив с потребители.
	 */
	public function getUserList(&$totalCount, $params, $userList = false) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_search(
					:id_list, :cin, :email, :username, :first_name, :middle_name, :family_name, :special_user_access_type,
					:status, :date_from, :date_to, :authentication_type, :organization, :bulletin_acceptance, :start_index, :row_count, :max_nor, :total_count);");

			$idList = !empty($params['id']) ? '{'.$params['id'].'}' : null;
			$cin = !empty($params['cin']) ? $params['cin'] : null;
			$email = !empty($params['email']) ? $params['email'] : null;
			$username = !empty($params['username']) ? $params['username'] : null;
			$firstName = !empty($params['firstName']) ? $params['firstName'] : null;
			$middleName = !empty($params['middleName']) ? $params['middleName'] : null;
			$familyName = !empty($params['familyName']) ? $params['familyName'] : null;
			$specialAccessUserType = !empty($params['specialAccessUserType']) ? '{'.implode(',', array_map('intval', $params['specialAccessUserType'])).'}' : null;
			$status = !empty($params['status']) ? '{'.$params['status'].'}' : (isset($params['status']) && $params['status'] != '' ? '{0}' : null);
			$dateFrom = !empty($params['dateFrom']) ? \Application\Service\AppService::getSqlDate($params['dateFrom']) : null;
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']).' 23:59:59' : null;
			$authenticationType = !empty($params['authenticationType']) ? $params['authenticationType'] : null;
			$maxNor = !empty($params['max_nor']) ? $params['max_nor'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;
			$organization = !empty($params['organization']) ? $params['organization'] : null;
			$bulletinAcceptance = !empty($params['bulletinAcceptance']) ? '{'.implode(',', array_map('intval', $params['bulletinAcceptance'])).'}' : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('cin', $cin, $container::TYPE_INTEGER);
			$container->offsetSet('email', $email, $container::TYPE_STRING);
			$container->offsetSet('username', $username, $container::TYPE_STRING);
			$container->offsetSet('first_name', $firstName, $container::TYPE_STRING);
			$container->offsetSet('middle_name', $middleName, $container::TYPE_STRING);
			$container->offsetSet('family_name', $familyName);
			$container->offsetSet('special_user_access_type', $specialAccessUserType);
			$container->offsetSet('status', $status);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('authentication_type', $authenticationType, $container::TYPE_INTEGER);
			$container->offsetSet('organization', $organization);
			$container->offsetSet('bulletin_acceptance', $bulletinAcceptance);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('max_nor', $maxNor);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_users'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $userList ? $stmt->execute() : $stmt->execute()->current();

			$connection->commit();

			if ($userList) {

				if ($result->isQueryResult()) {
					$resultSet = new HydratingResultSet($this->hydrator, new UserEntity());
					return $resultSet->initialize($result);
				}

			}
			elseif (is_array($result))	{

				$obj = new UserEntity();
				$this->hydrator->hydrate($result, $obj);
				return $obj;
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
	 * Извлича потребител по уникален идентификатор.
	 *
	 * @param int $id Идентификатор на потребител.
	 * @return UserEntity Потребител.
	 */
	public function getUserById($id) {

		try {

			$userObj = $this->getUserList($totalCount, ['id' => $id], false);

			if (!empty ($userObj))
				return $userObj;

			return null;
		}

		catch (\Exception $e) {

			AppService::handleDbError($e);

			return null;
		}
	}

	/**
	 * Извлича данни за автентикация на потребител по идентификатор
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @param int $authType Тип автентикация.
	 * @return array Данни за автентикация на потребител.
	 */
	public function getUserAuthenticationById($userId, $authType = null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->query("SELECT * FROM usr.f_user_authentications_search(null, :user_id, :auth_type, null, null);");

			$cursors = $stmt->execute(
				[
					'user_id' => $userId,
					'auth_type' => $authType
				]
			)->current();

			$refCursor = $cursors['p_user_authentications'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new AuthEntity());
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
	 * Обновява данни за автентикация на потребител.
	 *
	 * @param AuthEntity $userAuthObj Данни за автентикация.
	 * @return bool Резултат от операцията.
	 */
	public function updateUserAuthenticationById($userAuthObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_update(:id_authentication, :authentication_type, :password_hash, :password_salt, :username, null, null)");

			$container = new ParameterContainer();
			$container->offsetSet('id_authentication', $userAuthObj->getAuthenticationId());
			$container->offsetSet('authentication_type', $userAuthObj->getAuthenticationType());
			$container->offsetSet('password_hash', $userAuthObj->getPasswordHash());
			$container->offsetSet('password_salt', $userAuthObj->getPasswordSalt());
			$container->offsetSet('username', null);

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
	 * Изтрива данни за потребител.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @return bool Резултат от операцията.
	 */
	public function deleteUserById($userId) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_delete_all(:id_user)");

			$container = new ParameterContainer();
			$container->offsetSet('id_user', $userId);

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
	 * Извлича списък с права за достъп до функционалности
	 *
	 * @param bool $getKey Флаг, указващ ключ на масив
	 * @param bool $getGroup Флаг, указващ групиране на права по групи
	 * @return array
	 */
	public function getPermissions($getKey = false, $getGroup = false) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_n_s_permissions_search(null, null, null, null, false)");

			$cursors = $stmt->execute()->current();

			$refCursor 	= $cursors['p_ref_permissions'];

			$stmt->getResource()->closeCursor();

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			$userTypesArr = [];

			foreach ($result as $k => $v) {
				if (!$getGroup)
					$userTypesArr[$v['permission_id']] = $getKey ? $v['permission_key'] : $v['name'];
				else
					$userTypesArr[$v['group_id']][$v['permission_id']] = $getKey ? $v['permission_key'] : $v['name'];
			}

			$result->getResource()->closeCursor();

			$connection->commit();

			return $userTypesArr;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Извлича списък с права за достъп до функционалности на потребител
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @return array Масив с права за достъп.
	 */
	public function getPermissionsListByUserId($userId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_permissions_search(:user_id)");

			$userIdList = $userId ? '{'.$userId.'}' : null;

			$container = new ParameterContainer();
			$container->offsetSet(':user_id', $userIdList);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor 	= $cursors['p_users_permission_ids'];

			$stmt->getResource()->closeCursor();

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			$userPermissionArr = [];

			foreach ($result as $k => $v)
				$userPermissionArr[] = $v['permission_id'];

			$result->getResource()->closeCursor();

			$connection->commit();

			return $userPermissionArr;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Промяна на статус на заявка за специален достъп
	 *
	 * @param int $requestId
	 * @param int $staus
	 * @param str $statusReason
	 * @param array $emailParams Масив с параметри за генериране на email съобщение.
	 * @param string $action Действие - Approval, Rejection.
	 * @param string $logKey Ключ за одит
	 * @return bool Резултат от операцията.
	 */
	public function changeSpecialAccessRequestStatus($requestId, $staus, $statusReason, $emailParams, $action, $logKey) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_update(:request_id, :status, :status_reason)");

			$container = new ParameterContainer();

			$statusReason = !empty($statusReason) ? $statusReason : null;

			$container->offsetSet(':request_id', $requestId, $container::TYPE_INTEGER);
			$container->offsetSet(':status', $staus, $container::TYPE_INTEGER);
			$container->offsetSet(':status_reason', $statusReason, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$emailList[] = [
				'DisplayName' => $emailParams['recipient'],
				'Address' => $emailParams['recipient'],
				'Type' => 1
			];

			$emailParamList = !empty($emailParams['params']) ? $emailParams['params'] : '';

			if (!$this->restService->sendEmail($emailParams['template'], $emailList, $emailParamList))
				throw new \Exception('E-mail API error: {module: changeSpecialAccessRequestStatus, status:'.$staus.', emailTemplate: '.$emailParams['template'].', email: '.$emailParams['recipient'].'}');

			$stmt->execute();

			$connection->commit();

			$specialAccessLog = new LogEntity();
			$specialAccessLog->setObjectType('SPECIAL_ACCESS_REQUEST');
			$specialAccessLog->setActionType($action == 'approve' ? 'APPROVAL' : 'REJECTION');
			$specialAccessLog->setModule('EPZEU');
			$specialAccessLog->setFunctionality('USERS');
			$specialAccessLog->setKey($logKey);
			$action == 'approve' ? $specialAccessLog->setAdditionalData(null) : $specialAccessLog->setAdditionalData(null);
			$this->restService->logAuditData($specialAccessLog, 'Промяна на статус на заявка за специален достъп \User\Data\UserDataManager::changeSpecialAccessRequestStatus');

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
	 * Добавя документи към заявка за специален достъп на потребител.
	 *
	 * @param array $files Масив с имена на документи.
	 * @param int $requestId Идентификатор на заявка за специален достъп.
	 * @param string $email Email адрес на потребител.
	 * @param bool $startTransaction Флаг, указващ дали заявките към базата данни да се изпълнят в транзакция.
 	 * @return bool Резултат от операцията.
	 */
	public function addSpecialAccessRequestDocument(array $files, $requestId, $userEmail) {

		try {

			$filesUuidList = \Document\Service\DocumentService::extractUuidFromFileList($files);

			$uuidFileArr = '{'.implode(',', $filesUuidList).'}';

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_request_docs_create(:id_request, :uuid_arr)");

			$container = new ParameterContainer();
			$container->offsetSet('id_request', $requestId, $container::TYPE_INTEGER);
			$container->offsetSet('uuid_arr', $uuidFileArr);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$fileNameList = $cursors['p_file_names'];

			$fileNameList = trim($fileNameList, '{');
			$fileNameList = trim($fileNameList, '}');

			$fileArr = explode(',', $fileNameList);

			$originalFileNames = [];

			foreach ($fileArr as $fileName)
				$originalFileNames[] = \Document\Service\DocumentService::getOriginalFilename(trim($fileName, '"'));

			$specialAccessLog = new LogEntity();
			$specialAccessLog->setObjectType('SPECIAL_ACCESS_REQUEST');
			$specialAccessLog->setActionType('ATTACH_DOCUMENT');
			$specialAccessLog->setModule('EPZEU');
			$specialAccessLog->setFunctionality('USERS');
			$specialAccessLog->setKey($userEmail);
			$specialAccessLog->setAdditionalData([$this->translator->translate('EP_USR_UPLOAD_FILE_L') => implode(', ', $originalFileNames)]);
			$this->restService->logAuditData($specialAccessLog, 'Одит добавяне на файл за заявка за специален достъп \User\Data\UserDataManager::addSpecialAccessRequestDocument');

			return true;

		}
		catch(\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}


	/**
	 * Добавя процес към потребителски профил.
	 *
	 * @param string $token Токън за идентификация на процес.
	 * @param int $userId Идентификатор на потребител.
	 * @param int $processType Тип на процес - смяна на парола.
	 * @param array $emailParams Масив с параметри за генериране на email съобщение.
	 * @return bool Резултат от операцията.
	 */
	public function addUserProcess($token, $userId, $processType, $emailParams = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_processes_create(:token, :type, :id_user, :expiration_date)");
			$container = new ParameterContainer();
			$container->offsetSet('token', $token);
			$container->offsetSet('type', $processType);
			$container->offsetSet('id_user', $userId);
			$container->offsetSet('expiration_date', \Application\Service\AppService::setDeadlineFromDateInterval($this->config['EP_USR_PROCESS_CONFIRM_PERIOD'], true));
			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$emailList[] = [
				'DisplayName' => $emailParams['recipient'],
				'Address' => $emailParams['recipient'],
				'Type' => 1
			];

			if (!empty($emailParams)) {
				if (!$this->restService->sendEmail($emailParams['template'], $emailList, $emailParams['params']))
					throw new \Exception('E-mail API error: {emailTemplate: '.$emailParams['template'].', email: '.$emailParams['recipient'].'}');
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
	 * Взима списък с лимити на услуги за предоставяне на данни.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с лимити на услуги.
	 */
	public function getServiceLimitList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_data_service_limits_search (
					:id_list, :service_code, :service_name, :id_module, :status, :start_index, :row_count, :total_count);");


			$idList = !empty($params['id']) ? '{'.$params['id'].'}' : null;
			$serviceCode = !empty($params['serviceCode']) ? $params['serviceCode'] : null;
			$serviceName = !empty($params['serviceName']) ? $params['serviceName'] : null;
			$modulId = !empty($params['moduleId']) ? $params['moduleId'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('service_code', $serviceCode);
			$container->offsetSet('service_name', $serviceName);
			$container->offsetSet('id_module', $modulId);
			$container->offsetSet('status', $status);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_limits'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ServiceLimitEntity());
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
	 * Обновява лимити на услуги за предоставяне на данни.
	 *
	 * @param int $id Идентификатор на лимит на услуга.
	 * @param ServiceLimitEntity $limitObj Лимит на услуга
	 */
	public function updateServiceLimit(int $id, ServiceLimitEntity $limitObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM f_data_service_limits_update (
					:limit_id, :service_code, :service_name, :id_module, :requests_interval, :requests_number, :status);");

			$container = new ParameterContainer();
			$container->offsetSet('limit_id', $id, $container::TYPE_INTEGER);
			$container->offsetSet('service_code', $limitObj->getServiceCode());
			$container->offsetSet('service_name', $limitObj->getServiceName());
			$container->offsetSet('id_module', $limitObj->getModuleId(), $container::TYPE_INTEGER);
			$container->offsetSet('requests_interval', $limitObj->getRequestsInterval(), $container::TYPE_STRING);
			$container->offsetSet('requests_number', $limitObj->getRequestsNumber(), $container::TYPE_INTEGER);
			$container->offsetSet('status', $limitObj->getStatus(), $container::TYPE_INTEGER );

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
	 * Взима списък с лимити на услуги за предоставяне на данни към потребители
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с лимити на услуги за предоставяне.
	 */
	public function getUserServiceLimitList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_data_service_user_limits_search (
					:id_list, :service_limit_id, :user_id, :status, :start_index, :row_count, :total_count);");

			$idList = !empty($params['idList']) ? '{'.$params['idList'].'}' : null;
			$serviceLimitId = !empty($params['serviceLimitId']) ? $params['serviceLimitId'] : null;
			$userId = !empty($params['userId']) ? $params['userId'] : null;
			$status = (isset($params['status']) && $params['status'] != '') ? $params['status'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();

			$container->offsetSet('id_list', $idList);
			$container->offsetSet('service_limit_id', $serviceLimitId);
			$container->offsetSet('user_id', $userId);
			$container->offsetSet('status', $status);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_user_limits'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new UserServiceLimitEntity());
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
	 * Добавя лимит за услуга за предоставяне на данни към потребител
	 *
	 * @param UserServiceLimitEntity $dataObj Лимит за услуга за предоставяне на данни
	 * @return array Данни за процес.
	 */
	public function addUserServiceLimit(UserServiceLimitEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_data_service_user_limits_create(:service_limit_id, :id_user, :requests_interval, :requests_number, :status)");

			$container = new ParameterContainer();

			$status = 1;

			$container->offsetSet('service_limit_id', $dataObj->getServiceLimitId());
			$container->offsetSet('id_user', $dataObj->getUserId());
			$container->offsetSet('requests_interval', $dataObj->getRequestsInterval());
			$container->offsetSet('requests_number', $dataObj->getRequestsNumber());
			$container->offsetSet('status', $status);

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
	 * Обновява статус на услуга за предоставяне на данни.
	 *
	 * @param int $serviceLimitId Идентификатор на услуга за предоставяне на данни.
	 * @param int $status Статус на услуга за предоставяне на данни.
	 * @return bool Резултат от операцията.
	 */
	public function updateServiceLimitStatus($serviceLimitId, $status) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_data_service_user_limits_status_update(:service_limit_id, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('service_limit_id', $serviceLimitId);
			$container->offsetSet('status', $status);

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
	 * Обновява лимит за предоставяне на услуги на потребител.
	 *
	 * @param UserServiceLimitEntity $dataObj Идентификатор на лимит за предоставяне на данни.
	 * @return bool Резултат от операцията.
	 */
	public function updateUserServiceLimitById(UserServiceLimitEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_data_service_user_limits_update(
					:user_limit_id, :service_limit_id, :id_user, :requests_interval, :requests_number, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('user_limit_id', $dataObj->getUserLimitId(), $container::TYPE_INTEGER);
			$container->offsetSet('service_limit_id', $dataObj->getServiceLimitId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_user', $dataObj->getUserId(), $container::TYPE_INTEGER);
			$container->offsetSet('requests_interval', $dataObj->getRequestsInterval());
			$container->offsetSet('requests_number', $dataObj->getRequestsNumber(), $container::TYPE_INTEGER);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);

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
	 * Извлича списък с одит, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с потребители.
	 */
	public function getAuditList(&$totalCount, $params, $returnArray = false) {

		try {

			// TODO
			/*
			if ($params['searchType'] == 1)
				$dbAdapter = $this->dbAdapter;
			else
				$dbAdapter = $this->dbAdapterAudit;
			*/
			$dbAdapter = $this->dbAdapter;


			$connection = $dbAdapter->getDriver()->getConnection();

			$connection->beginTransaction();

			$stmt = $dbAdapter->createStatement("SELECT * FROM audit.f_log_actions_search(
			:log_action_ids, :log_action_date_from, :log_action_date_to, :object_type_id, :action_type_id, :module_id,
			:functionality_id, :key, :user_session_id, :login_session_id, :user_id, :ip_address, :load_additional_data, :export_excel, :is_archive, :start_index, :row_count, :max_nor, :total_count)");

			$idList = !empty($params['idList']) ? '{'.implode(',', array_map('intval', $params['idList'])).'}' : null;

			$dateFrom = null;
			if (!empty($params['dateFrom'])) {
				$dateFrom = \Application\Service\AppService::getSqlDate($params['dateFrom']);

				if (!empty($params['timeFrom']))
					$dateFrom .= ' '.$params['timeFrom'];
				else
					$dateFrom .= ' 00:00';
			}

			$dateTo = null;

			if (!empty($params['dateTo'])) {
				$dateTo = \Application\Service\AppService::getSqlDate($params['dateTo']);

				if (!empty($params['timeTo']))
					$dateTo .= ' '.$params['timeTo'];
				else
					$dateTo .= ' 23:59:59';
			}


			$loadAdditionalData = !empty($params['load_additional_data']) ? $params['load_additional_data'] : false;
			$isArchive = @$params['searchType'] == 1 ? false : true;

			$objectType = !empty($params['objectType']) ? $params['objectType'] : null;
			$actionType = !empty($params['event']) ? $params['event'] : null;
			$moduleId = !empty($params['moduleId']) ? $params['moduleId'] : null;
			$functionalityId = !empty($params['functionality']) ? $params['functionality'] : null;
			$key = !empty($params['key']) ? $params['key'] : null;
			$userSessionId = !empty($params['userSessionId']) ? $params['userSessionId'] : null;
			$loginSessionId = !empty($params['loginSessionId']) ? $params['loginSessionId'] : null;
			$userId = !empty($params['userId']) ? $params['userId'] : null;
			$ipAddress = !empty($params['ipAddress']) ? $params['ipAddress'] : null;
			$exportExcel = !empty($params['export_excel']) ? $params['export_excel'] : false;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$maxNor = null;
			$countRows = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('log_action_ids', $idList);
			$container->offsetSet('log_action_date_from', $dateFrom);
			$container->offsetSet('log_action_date_to', $dateTo);
			$container->offsetSet('object_type_id', $objectType);
			$container->offsetSet('action_type_id', $actionType);
			$container->offsetSet('module_id', $moduleId);
			$container->offsetSet('functionality_id', $functionalityId);
			$container->offsetSet('key', $key);
			$container->offsetSet('user_session_id', $userSessionId);
			$container->offsetSet('login_session_id', $loginSessionId);
			$container->offsetSet('user_id', $userId);
			$container->offsetSet('ip_address', $ipAddress);

			$container->offsetSet('load_additional_data', $loadAdditionalData);

			$container->offsetSet('export_excel', $exportExcel);

			$container->offsetSet('is_archive', $isArchive);

			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('max_nor', $maxNor);
			$container->offsetSet('total_count', $countRows);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['ref_log_actions'];

			$stmt = $dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($returnArray)
				return $result;

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new AuditEntity());
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
	 * Извлича списък с потребителски сесии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с потребителски сесии.
	 */
	public function getLoginSessionList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_login_sessions_search(
			:login_session_ids, :user_session_id, :user_id, :login_date_from, :login_date_to, :ip_address, :auth_type, :start_index, :row_count, :max_nor, :total_count)");


			$loginSessionList = !empty($params['loginSessionList']) ? '{'.implode(',', $params['loginSessionList']).'}' : null;

			$userSessionId = !empty($params['serSessionId']) ? $params['serSessionId']: null;
			$userId = !empty($params['userId']) ? $params['userId']: null;

			$dateFrom = null;
			if (!empty($params['dateFrom'])) {
				$dateFrom = \Application\Service\AppService::getSqlDate($params['dateFrom']);

				if (!empty($params['timeFrom']))
					$dateFrom .= ' '.$params['timeFrom'];
				else
					$dateFrom .= ' 00:00';
			}

			$dateTo = null;
			if (!empty($params['dateTo'])) {
				$dateTo = \Application\Service\AppService::getSqlDate($params['dateTo']);

				if (!empty($params['timeTo']))
					$dateTo .= ' '.$params['timeTo'];
				else
					$dateTo .= ' 23:59:59';
			}

			$ipAddress = !empty($params['ipAddress']) ? $params['ipAddress'] : null;
			$authType = !empty($params['authType']) ? $params['authType'] : null;

			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$maxNor = null;
			$countRows = !empty($params['total_count']) ? $params['total_count'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('login_session_ids', $loginSessionList);
			$container->offsetSet('user_session_id', $userSessionId);
			$container->offsetSet('user_id', $userId);
			$container->offsetSet('login_date_from', $dateFrom);
			$container->offsetSet('login_date_to', $dateTo);
			$container->offsetSet('ip_address', $ipAddress);
			$container->offsetSet('auth_type', $authType);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('max_nor', $maxNor);
			$container->offsetSet('total_count', $countRows);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_login_sessions'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new LoginSessionEntity());
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
	 * Добавя заявка за специален достъп.
	 */
	public function addAccessRequests(UserEntity $userObj, $files) {

		try {

			if (!empty($files)) {

				// Добавя заявка за достъп на потребител със специални права
				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_create(:id_user)");
				$container = new ParameterContainer();
				$container->offsetSet('id_user', $userObj->getUserId());

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$requestId = $result['p_request_id'];

				$authType = $this->getUserAuthenticationById($userObj->getUserId(), \User\Controller\UserController::USER_AUTH_ACTIVE_DIRECTORY);
				$isActiveDirectoryUser = $authType->count() ? true : false;

				$specialAccessLog = new LogEntity();
				$specialAccessLog->setObjectType('SPECIAL_ACCESS_REQUEST');
				$specialAccessLog->setActionType('SUBMISSION');
				$specialAccessLog->setModule('EPZEU');
				$specialAccessLog->setFunctionality('USERS');
				$specialAccessLog->setKey($isActiveDirectoryUser ? $userObj->getUsername() : $userObj->getEmail());
				$specialAccessLog->setAdditionalData(null);
				$this->restService->logAuditData($specialAccessLog, 'Заявка за специален достъп \User\Data\UserDataManager::updateUserById');

				// Добавя файл към заявка
				$this->addSpecialAccessRequestDocument($files, $requestId, $isActiveDirectoryUser ? $userObj->getUsername() : $userObj->getEmail());
			}

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);
			return [];
		}
	}

	/**
	 * Извлича списък със сертификати.
	 *
	 * @param array $idList Списък с идентификатори на сертификати.
	 * @param string $this Хеш на сертификат.
	 * @return array Масив със сертификати.
	 */
	public function getCertificateList($params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_certificates_search(:id_list, :cert_hash, null, false)");

			$idList = isset($params['idList']) ? '{'.implode(',', $params['idList']).'}' : null;
			$hash = isset($params['hash']) ? $params['hash'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('cert_hash', $hash);
			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_certificates'];
			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new CertEntity());
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
	 * Извлича списък с автентикации към потребител и детайлна информация за сертификатите към тях
	 *
	 * @param int $userId
	 * @return array Масив с автентикации.
	 */
	public function getUserAuthInfoList($userId) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_search_info(:id_user)");

			$container = new ParameterContainer();
			$container->offsetSet('id_user', $userId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_user_certificates'];
			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new CertEntity());
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
	 * Проверява дали е осъществена връзка с базата данни.
	 *
	 * @return bool
	 */
	public function isConnected() {
		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->connect();
			return $connection->isConnected();
		}
		catch (\Exception $e) {
			return false;
		}
	}

}