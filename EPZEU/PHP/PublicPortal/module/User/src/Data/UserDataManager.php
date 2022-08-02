<?php

namespace User\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Application\Service\AppService;
use User\Entity\UserEntity;
use User\Entity\AuthEntity;
use User\Entity\SpecialAccessEntity;
use Zend\Db\ResultSet\HydratingResultSet;
use User\Entity\SpecialAccessDocEntity;
use User\Entity\UserProcessEntity;
use Application\Entity\LogEntity;
use User\Entity\CertEntity;
use User\Entity\UnitedUserEntity;


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
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


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
	 * Услуга за работа с потребители.
	 *
	 * @var \Zend\Authentication\AuthenticationService
	 */
	protected $authService;


	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param array $config Масив с конфигурационни параметри.
	 * @param \Document\Service\DocumentService $documentService Услуга за работа с документи.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \Application\Service\RestService $restService Услуга за работа с REST уеб услуги.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param Zend\Authentication\AuthenticationService $authService Услуга за работа с потребители.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $config, $documentService, $cacheService, $restService, $translator, $authService) {
		$this->dbAdapter = $dbAdapter;
		$this->hydrator = $hydrator;
		$this->config = $config;
		$this->documentService = $documentService;
		$this->cacheService = $cacheService;
		$this->restService = $restService;
		$this->translator = $translator;
		$this->authService = $authService;
	}


	/**
	 * Добавя контекстен потребител
	 *
	 * @return bool
	 */
	public function setCurrentContextUser() {

		if ($user = $this->authService->getIdentity())
			return $this->setContextUser($user->getUserId());

		return $this->setContextUser(\User\Module::SYS_USER);
	}


	/**
	 * Задава контекстен потребител
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
	 * Добавя нов потребител.
	 *
	 * @param UserEntity $dataObj Потребител.
	 * @param string $token Токън за идентификация на процес по регистрация.
	 * @param array $emailParams Масив с параметри за генериране на email съобщение.
	 * @return array Масив с идентификатор и КИН на потребител.
	 */
	public function addUser(UserEntity $dataObj, $token, $emailParams) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_create(
					:email, :first_name, :middle_name, :family_name, :contact_data, :organization, :special_user_access_type,
					:cr_bulletin_acceptance, :pr_bulletin_acceptance, :cr_message_acceptance, :pr_message_acceptance, :epzeu_message_acceptance);");


			$container = new ParameterContainer();
			$container->offsetSet('email', $dataObj->getEmail(), $container::TYPE_STRING);
			$container->offsetSet('first_name', $dataObj->getFirstName(), $container::TYPE_STRING);
			$container->offsetSet('middle_name', $dataObj->getMiddleName(), $container::TYPE_STRING);
			$container->offsetSet('family_name', $dataObj->getFamilyName(), $container::TYPE_STRING);
			$container->offsetSet('contact_data', $dataObj->getContactData(), $container::TYPE_STRING);
			$container->offsetSet('organization', $dataObj->getOrganization(), $container::TYPE_STRING);
			$container->offsetSet('special_user_access_type', $dataObj->getSpecialAccessUserType(), $container::TYPE_INTEGER);
			$container->offsetSet('cr_bulletin_acceptance', $dataObj->getCrBulletinAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('pr_bulletin_acceptance', $dataObj->getPrBulletinAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('cr_message_acceptance', $dataObj->getCrMessageAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('pr_message_acceptance', $dataObj->getPrMessageAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('epzeu_message_acceptance', $dataObj->getEpzeuMessageAcceptance(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$userId = $result['p_user_id'];
			$cin = $result['p_cin'];
			$verId = $result['p_user_ver_id'];

			// Добавя парола
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_create(:id_user, :auth_type, :hash, null, null)");
			$container = new ParameterContainer();
			$container->offsetSet('id_user', $userId);
			$container->offsetSet('auth_type', $this->cacheService->getUserAuthTypeList()['PASSWORD']);
			$container->offsetSet('hash', $dataObj->getPassword(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();
			$authenticationId = $result['p_authentication_id'];


			// Добавя токън
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_processes_create(:token, :type, :id_user, :expiration_date)");
			$container = new ParameterContainer();
			$container->offsetSet('token', $token);
			$container->offsetSet('type', $this->cacheService->getUserProcessStatus()['ACTIVATE_USER']);
			$container->offsetSet('id_user', $userId);
			$container->offsetSet('expiration_date', \Application\Service\AppService::setDeadlineFromDateInterval($this->config['EP_USR_PROCESS_CONFIRM_PERIOD'], true));

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			if ($dataObj->getSpecialAccess()) {

				// Добавя заявка за достъп на потребител със специални права
				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_create(:id_user)");
				$container = new ParameterContainer();
				$container->offsetSet('id_user', $userId);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$requestId = $result['p_request_id'];

				// Добавя файл към заявка
				$this->addSpecialRequestDoc($dataObj->getFiles(), $requestId, $dataObj->getEmail());
			}

			// Изтриване на файлове от временна папка
			$this->documentService->deleteTmpFiles($dataObj->getFiles());

			$emailParams['params']['{CIN}'] = $cin;

			if (!$this->restService->sendEmail($emailParams['template'], [$emailParams['recipient']], $emailParams['params']))
				throw new \Exception('E-mail API error: {emailTemplate: '.$emailParams['template'].', email: '.$emailParams['recipient'].'}');

			// Одит на потребител
			$userLog = new LogEntity();
			$userLog->setObjectType('USER_REGISTRATION_REQUEST');
			$userLog->setActionType('SUBMISSION');
			$userLog->setModule('EPZEU');
			$userLog->setFunctionality('USERS');
			$userLog->setAdditionalData([
					$this->translator->translate('GL_PERSON_NAME_L') => $dataObj->getFirstName(),
					$this->translator->translate('GL_PERSON_SURNAME_L') => $dataObj->getMiddleName(),
					$this->translator->translate('GL_PERSON_FAMILYNAME_L') => $dataObj->getFamilyName(),
					$this->translator->translate('EP_USR_CONTACT_DATA_L') => $dataObj->getContactData(),
			]);
			$userLog->setKey($dataObj->getEmail());

			$this->restService->logAuditData($userLog, 'Одит на потребител \User\Data\UserDataManager::addUser');

			$connection->commit();

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
	 * Обновява данни за потребител.
	 *
	 * @param int $id Идентификатор на потребител.
	 * @param UserEntity $dataObj Потребител.
	 * @param string $action Действие - userUpdate, confirmRegistration.
	 * @return bool Резултат от операцията.
	 */
	public function updateUserById($id, UserEntity $dataObj, $action = 'userUpdate', $processId = false) {

		try {

			$oldObj = $this->getUserList($totlalCount, ['id' => $id]);

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_users_update(
					:user_id, :email, :first_name, :middle_name, :family_name, :contact_data, :organization, :special_user_access_type,
					:cr_bulletin_acceptance, :pr_bulletin_acceptance, :cr_message_acceptance, :pr_message_acceptance, :epzeu_message_acceptance, :status);");

			$container = new ParameterContainer();

			$container->offsetSet('user_id', $id, $container::TYPE_INTEGER);
			$container->offsetSet('email', $dataObj->getEmail(), $container::TYPE_STRING);
			$container->offsetSet('first_name', $dataObj->getFirstName(), $container::TYPE_STRING);
			$container->offsetSet('middle_name', $dataObj->getMiddleName(), $container::TYPE_STRING);
			$container->offsetSet('family_name', $dataObj->getFamilyName(), $container::TYPE_STRING);
			$container->offsetSet('contact_data', $dataObj->getContactData(), $container::TYPE_STRING);
			$container->offsetSet('cr_bulletin_acceptance', $dataObj->getCrBulletinAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('pr_bulletin_acceptance', $dataObj->getPrBulletinAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('cr_message_acceptance', $dataObj->getCrMessageAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('pr_message_acceptance', $dataObj->getPrMessageAcceptance(), $container::TYPE_INTEGER);
			$container->offsetSet('epzeu_message_acceptance', $dataObj->getEpzeuMessageAcceptance(), $container::TYPE_INTEGER);

			if ($dataObj->getStatus())
				$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);
			else
				$container->offsetSet('status', $oldObj->getStatus(), $container::TYPE_INTEGER);

			if ($oldObj->getSpecialAccessUserType() && !$dataObj->getSpecialAccess()) {
				$container->offsetSet('organization', $oldObj->getOrganization(), $container::TYPE_STRING);
				$container->offsetSet('special_user_access_type', $oldObj->getSpecialAccessUserType(), $container::TYPE_INTEGER);
			}
			else {
				$container->offsetSet('organization', $dataObj->getOrganization(), $container::TYPE_STRING);
				$container->offsetSet('special_user_access_type', $dataObj->getSpecialAccessUserType(), $container::TYPE_INTEGER);
			}

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$verId = $result['p_user_ver_id'];

			if ($dataObj->getSpecialAccess()) {

				// Добавя заявка за достъп на потребител със специални права
				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_create(:id_user)");
				$container = new ParameterContainer();
				$container->offsetSet('id_user', $id);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$requestId = $result['p_request_id'];

				// Добавя файл към заявка
				$this->addSpecialRequestDoc($dataObj->getFiles(), $requestId, $dataObj->getEmail());
			}

			if ($action == 'confirmRegistration') {
				$this->updateTokenStatus($processId, 'USED');
			}

			$connection->commit();

			if ($action == 'confirmRegistration') {
				// Одит потвърждаване на регистрация
				$userLog = new LogEntity();
				$userLog->setObjectType('USER_REGISTRATION_REQUEST');
				$userLog->setActionType('CONFIRMATION');
				$userLog->setModule('EPZEU');
				$userLog->setFunctionality('USERS');
				$userLog->setAdditionalData(null);
				$userLog->setKey($dataObj->getEmail());
				$this->restService->logAuditData($userLog, 'Одит потвърждаване на регистрация \User\Data\UserDataManager::updateUserById');
			}
			else {
				// Одит потребител
				// TODO - промяна на средствата за автентикация
				$newObj = $this->getUserList($totlalCount, ['id' => $id]);

				$userLog = new LogEntity();
				$userLog->setObjectType('USER_PROFILE');
				$userLog->setActionType('EDIT');
				$userLog->setModule('EPZEU');
				$userLog->setFunctionality('USERS');
				$userLog->setAdditionalData([
					$this->translator->translate('GL_PERSON_NAME_L') => $newObj->getFirstName(),
					$this->translator->translate('GL_PERSON_SURNAME_L') => $newObj->getMiddleName(),
					$this->translator->translate('GL_PERSON_FAMILYNAME_L') => $newObj->getFamilyName(),
					$this->translator->translate('EP_USR_CONTACT_DATA_L') => $newObj->getContactData(),
					$this->translator->translate('EP_USR_CUSTOMER_ID_L') => $newObj->getCin(),
					$this->translator->translate('EP_USR_ORGANIZATION_POSITION_L') => $newObj->getOrganization(),
				]);
				$userLog->setKey($dataObj->getEmail());
				$this->restService->logAuditData($userLog, 'Одит потребител \User\Data\UserDataManager::updateUserById');
			}

			// Изтриване на файлове от временна папка
			$this->documentService->deleteTmpFiles($dataObj->getFiles());

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
	 * Извлича списък със заявки за специален достъп на потребител.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със заявки за специален достъп.
	 */
	public function getUserSpecialAccessList($userId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Добавя потребител
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_access_requests_search(
					:request_ids, :users_ids, :date_from, :date_to, :access_status_ids, :email,
					:start_index, :row_count, :max_nor, :total_count);");

			$requestIdList = isset($params['request_id_list']) ? '{'.$params['request_id_list'].'}' : null;
			$usersIdList = '{'.$userId.'}';
			$dateFrom = isset($params['date_from']) ? $params['date_from'] : null;
			$dateTo = isset($params['date_to']) ? $params['date_to'] : null;
			$accessStatus = isset($params['access_status']) ? '{'.$params['access_status'].'}' : null;
			$email = isset($params['email']) ? $params['email'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = isset($params['total_count']) ? $params['total_count'] : true;
			$maxNor = isset($params['max_nor']) ? $params['max_nor'] : null;
			$rowCount = isset($params['row_count']) ? $params['row_count'] : null;

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
			$container->offsetSet('total_count', $startIndex);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

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

			$connection->commit();

			if (!$cursors['p_content'])
				return false;

			$stream = stream_get_contents($cursors['p_content']);
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
			$dateTo = !empty($params['dateTo']) ? \Application\Service\AppService::getSqlDate($params['dateTo']) : null;
			$authenticationType = !empty($params['authenticationType']) ? $params['authenticationType'] : null;
			$maxNor = !empty($params['max_nor']) ? $params['max_nor'] : null;
			$rowCount = !empty($params['row_count']) ? $params['row_count'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['total_count']) ? $params['total_count'] : true;
			$organization = !empty($params['organization']) ? $params['organization'] : null;
			$bulletinAcceptance = !empty($params['bulletinAcceptance']) ? $params['bulletinAcceptance'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('cin', $cin);
			$container->offsetSet('email', $email);
			$container->offsetSet('username', $username);
			$container->offsetSet('first_name', $firstName);
			$container->offsetSet('middle_name', $middleName);
			$container->offsetSet('family_name', $familyName);
			$container->offsetSet('special_user_access_type', $specialAccessUserType);
			$container->offsetSet('status', $status);
			$container->offsetSet('date_from', $dateFrom);
			$container->offsetSet('date_to', $dateTo);
			$container->offsetSet('authentication_type', $authenticationType);
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
	 * Извлича данни за автентикация на потребител.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @param int $authType Тип автентикация.
	 * @return array Данни за автентикация на потребител.
	 */
	public function getUserAuthenticationById($userId, $authType, $authId = null, $certHash = null) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->query("SELECT * FROM usr.f_user_authentications_search(:id_auth, :user_id, :auth_type, null, :cert_hash);");

			if ($authId)
				$authId = "{".$authId."}";

			$cursors = $stmt->execute([
					'id_auth'	=> $authId,
					'user_id'	=> $userId,
					'auth_type'	=> $authType,
					'cert_hash'	=> $certHash
			])->current();

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
	public function updateUserAuthenticationById($userAuthObj, $processId = false) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_update(:id_authentication, :authentication_type, :password_hash, null, null, null, null)");

			$container = new ParameterContainer();
			$container->offsetSet('id_authentication', $userAuthObj->getAuthenticationId());
			$container->offsetSet('authentication_type', $userAuthObj->getAuthenticationType(), $container::TYPE_INTEGER);
			$container->offsetSet('password_hash', $userAuthObj->getPasswordHash());

			$stmt->setParameterContainer($container);

			$stmt->execute();


			if ($processId)
				$this->updateTokenStatus($processId, 'USED');

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

			$this->setCurrentContextUser();
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
	 * Извлича данни за процес към потребителски профил - активиране на профил или смяна на парола.
	 *
	 * @param string $token Токън за идентификация на процес.
	 * @param int $processType Тип на процес - активиране на профил, смяна на парола.
	 * @return array Данни за процес.
	 */
	public function getUserProcess($token, $processType) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_processes_search(null, :token, :process_type, null, null, null, null, null, null, null, false)");


			$container = new ParameterContainer();
			$container->offsetSet('token', '{'.$token.'}');
			$container->offsetSet('process_type', $processType);
			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_user_processes'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute()->current();

			$connection->commit();

			if (is_array($result))	{

				$obj = new UserProcessEntity();

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

			$this->setCurrentContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_processes_create(:token, :type, :id_user, :expiration_date)");
			$container = new ParameterContainer();
			$container->offsetSet('token', $token);
			$container->offsetSet('type', $processType);
			$container->offsetSet('id_user', $userId);
			$container->offsetSet('expiration_date', \Application\Service\AppService::setDeadlineFromDateInterval($this->config['EP_USR_PROCESS_CONFIRM_PERIOD'], true));
			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			if (!empty($emailParams)) {
				if (!$this->restService->sendEmail($emailParams['template'], [$emailParams['recipient']], $emailParams['params']))
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
	 * Добавя документи към заявка за специален достъп на потребител.
	 *
	 * @param array $files Масив с имена на документи.
	 * @param int $requestId Идентификатор на заявка за специален достъп.
	 * @param string $email Email адрес на потребител.
	 * @return bool Резултат от операцията.
	 */
	public function addSpecialRequestDoc(array $files, $requestId, $email) {

		try {

			$filesUuidList = \Document\Service\DocumentService::extractUuidFromFileList($files);

			$uuidFileArr = '{'.implode(',', $filesUuidList).'}';

			$this->setCurrentContextUser();

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
			$specialAccessLog->setKey($email);
			$specialAccessLog->setAdditionalData([$this->translator->translate('EP_USR_UPLOAD_FILE_L') => implode(', ', $originalFileNames)]);
			$this->restService->logAuditData($specialAccessLog, 'Одит добавяне на файл за заявка за специален достъп \User\Data\UserDataManager::addSpecialRequestDoc');

			return true;

		}
		catch (\Exception $e) {

			AppService::handleDbError($e);
			return false;
		}
	}


	/**
	 * Обновява статус на процес към потребителски профил.
	 *
	 * @param int $processId Идентификатор на процес.
	 * @param int $status Статус на процес.
	 * @return bool Резултат от операцията.
	 */
	public function updateTokenStatus($processId, $status) {

		try {

			$processStatusList = $this->cacheService->getProcessStatusList();

			if (!isset($processStatusList[$status]))
				return false;

			$this->setCurrentContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_processes_update(:id_process, :status)");

			$container = new ParameterContainer();
			$container->offsetSet('id_process', $processId, $container::TYPE_INTEGER);
			$container->offsetSet('status', $processStatusList[$status], $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}

	/**
	 * Добавя автентикация със сертификат към потребител.
	 *
	 * @param int $userId Идентификатор на потребител
	 * @param CertEntity $certificateObj Сертификат.
	 * @return bool Резултат от операцията.
	 */
	public function addUserCertAuth($userId, CertEntity $certificateObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			// Проверява за запис на сертификат
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_certificates_search(null, :cert_hash, null, false)");
			$container = new ParameterContainer();
			$container->offsetSet('cert_hash', $certificateObj->getCertHash());
			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_certificates'];
			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			// Има запис за
			if ($result->count()) {
				$certificateId = $result->current()['certificate_id'];
			}

			else {
				// Добавя сертификат
				$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_certificates_create(
				:serial_number, :issuer, :subject, :not_after, :not_before, :cert_hash, :content)");

				// Задължително е да влица в шестнадесетичен формат
				$serialNumberHex = preg_replace('/[^0-9a-f]/i', '', $certificateObj->getSerialNumber());

				$certificateObj->setSerialNumber($serialNumberHex);

				$container = new ParameterContainer();
				$container->offsetSet('serial_number', $certificateObj->getSerialNumber());
				$container->offsetSet('issuer', $certificateObj->getIssuer());
				$container->offsetSet('subject', $certificateObj->getSubject());
				$container->offsetSet('not_after', $certificateObj->getNotAfter());
				$container->offsetSet('not_before', $certificateObj->getNotBefore());
				$container->offsetSet('cert_hash', $certificateObj->getCertHash());
				$container->offsetSet('content', $certificateObj->getContent(), $container::TYPE_LOB);

				$stmt->setParameterContainer($container);
				$result = $stmt->execute()->current();

				$certificateId = $result['p_certificate_id'];
			}


			// Добавя автентикация тип сертификат
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_user_authentications_create(:id_user, :auth_type, null, null, :certificate_id)");
			$container = new ParameterContainer();
			$container->offsetSet('id_user', $userId);
			$container->offsetSet('auth_type', $this->cacheService->getUserAuthTypeList()['CERTIFICATE']);
			$container->offsetSet('certificate_id', $certificateId);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute()->current();
			$authenticationId = $result['p_authentication_id'];

			$connection->commit();

			$userLog = new LogEntity();
			$userLog->setObjectType('USER_CERTIFICATE');
			$userLog->setActionType('ADD');
			$userLog->setModule('EPZEU');
			$userLog->setFunctionality('USERS');

			$userLog->setAdditionalData([
					$this->translator->translate('EP_ODIT_PUBLISHER_L') => $certificateObj->getIssuer(),
					$this->translator->translate('EP_VALIDITY_PERIOD_FROM_L') => $certificateObj->getNotBefore(),
					$this->translator->translate('EP_VALIDITY_PERIOD_TO_L') => $certificateObj->getNotAfter(),
					$this->translator->translate('EP_OTHER_INFORMATION_L') => $certificateObj->getSubject(),
			]);

			$userLog->setKey($certificateObj->getSerialNumber());
			$this->restService->logAuditData($userLog, 'Изтриване на автентикация \User\Data\UserDataManager::deleteAuthById');

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
	 * Изтрива автентикация.
	 *
	 * @param AuthEntity Автентикация
	 * @return bool Резултат от операцията.
	 */
	public function deleteAuthById($authObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT usr.f_user_authentications_delete(:id_auth);");

			$container = new ParameterContainer();
			$container->offsetSet('id_auth', $authObj->getAuthenticationId(), $container::TYPE_INTEGER);
			$stmt->setParameterContainer($container);
			$stmt->execute();

			$connection->commit();


			switch ($authObj->getAuthenticationType()) {

				case \User\Controller\UserController::USER_AUTH_CERTIFICATE:

					$certObj = $this->getCertificateByHash([$authObj->getCertificateId()])->current();

					$userLog = new LogEntity();
					$userLog->setObjectType('USER_CERTIFICATE');
					$userLog->setActionType('DELETE');
					$userLog->setModule('EPZEU');
					$userLog->setFunctionality('USERS');

					$userLog->setAdditionalData([
						$this->translator->translate('EP_ODIT_PUBLISHER_L') => $certObj->getIssuer(),
						$this->translator->translate('EP_VALIDITY_PERIOD_FROM_L') => $certObj->getNotBefore(),
						$this->translator->translate('EP_VALIDITY_PERIOD_TO_L') => $certObj->getNotAfter(),
						$this->translator->translate('EP_OTHER_INFORMATION_L') => $certObj->getSubject(),
					]);

					$userLog->setKey($certObj->getSerialNumber());
					$this->restService->logAuditData($userLog, 'Изтриване на автентикация \User\Data\UserDataManager::deleteAuthById');

					break;
				case \User\Controller\UserController::USER_AUTH_PIC:

					if ($userObj = $this->getUserList($totalCount, ['id' => $authObj->getUserId()])) {
						$userLog = new LogEntity();
						$userLog->setObjectType('USER_CERTIFICATE');
						$userLog->setActionType('DELETE');
						$userLog->setModule('EPZEU');
						$userLog->setFunctionality('USERS');
						$userLog->setKey($userObj->getCin());
						$userLog->setAdditionalData([
							'authType' => $this->translator->translate('EP_USR_PIK_NRA_L'),
						]);
						$this->restService->logAuditData($userLog, 'Изтриване на ПИК \User\Data\UserDataManager::deleteAuthById');
					}

					break;
			}

			return true;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);
			false;
		}
	}

	/**
	 * Извлича списък със сертификати.
	 *
	 * @param array $idList Списък с идентификатори на сертификати.
	 * @param string $this Хеш на сертификат.
	 * @return array Масив със сертификати.
	 */
	public function getCertificateByHash($idList = null, $hash = null) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_certificates_search(:id_list, :cert_hash, null, false)");

			$idList = $idList ? '{'.implode(',', $idList).'}' : $idList;

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
	 * Добавя запис за миграция на потребителски профил.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @param bool $migrationData Данни за миграция.
	 * @return array
	 */
	public function addMigration($userId, $migrationData) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$this->setCurrentContextUser();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_account_migrations_create(:user_id, :register_id, :m_username, :m_user_id, :m_client_id, :m_amaunt, :status)");

			$container = new ParameterContainer();

			$status = 1;

			$container->offsetSet('user_id', $userId);
			$container->offsetSet('register_id', $migrationData->getRegisterId());
			$container->offsetSet('m_username', $migrationData->getUsername());
			$container->offsetSet('m_user_id', $migrationData->getAdmId());
			$container->offsetSet('m_client_id', $migrationData->getAdmId());
			$container->offsetSet('m_amaunt', $migrationData->getFreecreditsRa());
			$container->offsetSet('status', $status);

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
	 * Извлича списък с мигрирани профили.
	 *
	 * @param int $userId Идентификатор на потребител.
	 * @return array Масив с мигрирани профили.
	 *
	 */
	public function getMigratedProfileListByUserId($userId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM usr.f_account_migrations_search(:id_user);");

			$userId = '{'.$userId.'}';

			$container = new ParameterContainer();
			$container->offsetSet('id_user', $userId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_accounts'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new UnitedUserEntity());
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