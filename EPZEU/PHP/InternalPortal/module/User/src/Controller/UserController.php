<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use User\Entity\UserEntity;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\Ldap\Ldap;
use Zend\Validator\ValidatorChain;
use Zend\View\Model\JsonModel;
use User\Form\LoginSessionForm;

/**
 * Контролер реализиращ функционалности за работа с потребители.
 *
 * @package User
 * @subpackage Controller
 */
class UserController extends AbstractActionController {


	/**
	 * Автентикация с потребителско име и парола.
	 *
	 * @var int
	 */
	CONST USER_AUTH_PASSWORD = 1;


	/**
	 * Автентикация през активна директория.
	 *
	 * @var int
	 */
	CONST USER_AUTH_ACTIVE_DIRECTORY = 2;


	/**
	 * Автентикация с електронен сертификат.
	 *
	 * @var int
	 */
	CONST USER_AUTH_CERTIFICATE = 3;


	/**
	 * Автентикация с ПИК.
	 *
	 * @var int
	 */
	CONST USER_AUTH_PIC = 4;


	CONST AUTH_TYPE_LIST = [
		self::USER_AUTH_PASSWORD 			=> 'GL_EMAIL_L',
		self::USER_AUTH_ACTIVE_DIRECTORY	=> 'EP_USR_USERS_ACTIVE_DIRECTORY_L',
		self::USER_AUTH_CERTIFICATE 		=> 'EP_USR_ESERT_AUTHO_L',
		self::USER_AUTH_PIC 				=> 'GL_ENTRANCE_PIK_L',
	];


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Обект за генериране и валидиране на форма за потребител.
	 *
	 * @var \User\Form\UserForm
	 */
	protected $userForm;


	/**
	 * Услуга за локализация на интерфейс.
	 *
	 * @var MvcTranslator
	 */
	protected $translator;


	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;


	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


	/**
	 * Масив с конфигурационни параметри.
	 *
	 * @var array
	 */
	protected $config;


	/**
	 * Обект за генериране и валидиране на форма за потребител от активна директория.
	 *
	 * @var User\Form\LdapSearchForm
	 */
	protected $ldapSearchForm;


	/**
	 * Масив с конфигурационни параметри за активна директория.
	 *
	 * @var array
	 */
	protected $configActiveDirectory;


	/**
	 * Конструктор.
	 *
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \User\Form\UserForm $userForm Обект за генериране и валидиране на форма за потребител.
	 * @param array $config Масив с конфигурационни параметри.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param User\Form\LdapSearchForm $ldapSearchForm Обект за генериране и валидиране на форма за потребител от активна директория.
	 * @param array $configActiveDirectory Масив с конфигурационни параметри за активна директория.
	 */
	public function __construct($userDM, $translator, $userForm, $config, $userService, $cacheService, $ldapSearchForm, $configActiveDirectory) {
		$this->userDM = $userDM;
		$this->userForm = $userForm;
		$this->translator = $translator;
		$this->config = $config;
		$this->userService = $userService;
		$this->cacheService = $cacheService;
		$this->ldapSearchForm = $ldapSearchForm;
		$this->configActiveDirectory = $configActiveDirectory;
	}


	/**
	 * Функционалност "Регистрация на вътрешен потребител".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function registerAction() {

		$request = $this->getRequest();
		$lang = $this->params()->fromRoute('lang');

		$fileArr = [];

		$userStatusList = $this->cacheService->getUserStatusList();
		$statusToRemove = array_search('EP_USR_00007_E', $userStatusList);

		if($statusToRemove !== false)
			unset($userStatusList[$statusToRemove]);

		$this->userForm->get('userFieldset')->get('status')->setValueOptions($userStatusList);

		if (!isset($this->params()->fromPost('userFieldset')['status']))
			$this->userForm->get('userFieldset')->get('status')->setValue(array_search('GL_ACTIVE_L', $userStatusList));

		// списък с чекбокс, разделен по групи
		$permissionsGroupList['group_name_list'] = array_flip($this->cacheService->getPermissionsGroupList());
		$permissionList = $this->userDM->getPermissions(false, true);

		if (!empty($permissionsGroupList['group_name_list'])) {
			$specAccessPermissionGroupId = array_search('EP_USR_SPEC_RIGHTS_L', $permissionsGroupList['group_name_list']);
			$freePermissionGroupId = array_search('EP_USR_FREE_ACC_RIGHTS_L', $permissionsGroupList['group_name_list']);
		}

		// в случай, че потребителят е от активната директория визуализират се само Администраторски права, премахват се правата за Специализиран достъп, Безплатен достъп
		if (!empty($specAccessPermissionGroupId))
			unset($permissionList[$specAccessPermissionGroupId]);

		if (!empty($freePermissionGroupId))
			unset($permissionList[$freePermissionGroupId]);

		$this->userForm->get('userFieldset')->get('permissionList')->setAttributes($permissionsGroupList);
		$this->userForm->get('userFieldset')->get('permissionList')->setValueOptions($permissionList);

		$this->userForm->get('userFieldset')->get('username')->setAttribute('type', 'hidden');
		$this->userForm->get('userFieldset')->get('username')->removeAttribute('disabled', 'disabled');
		$this->userForm->get('userFieldset')->get('username')->setLabelAttributes(['class' => 'required-field']);

		if ($request->isPost()) {

			$fieldsetData = $this->params()->fromPost('userFieldset');

			$username = $this->params()->fromPost('userFieldset')['username'];

			$hydrator = new ClassMethodsHydrator();
			$baseObj = $hydrator->hydrate($fieldsetData, new UserEntity());

			$usernameActiveDirectoryValidator = new \User\Validator\UsernameActiveDirectoryValidator([
				'configActiveDirectory' => $this->configActiveDirectory+$this->getLdapConfig(),
				'username' 				=> $username
			]);

			$usernameActiveDirectoryValidatorChain = new ValidatorChain();
			$usernameActiveDirectoryValidatorChain->attach($usernameActiveDirectoryValidator);

			$this->userForm->getInputFilter()->get('userFieldset')->get('username')->getValidatorChain()->attach($usernameActiveDirectoryValidatorChain);


			/*
			$files = isset($fieldsetData['files']) ? $fieldsetData['files'] : [];

			foreach ($files as $file)
				$fileArr[$file] = $file;
			*/

			$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles(isset($fieldsetData['files']) ? $fieldsetData['files'] : []);

			$this->userForm->setData($request->getPost());

			$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

			if ($this->userForm->isValid()) {

				$userObj = $this->userForm->getData();

				$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

				if ($userData = $this->userDM->addUser($userObj)) {
					$this->flashMessenger()->addSuccessMessage('EP_USR_00013_I');
					return $this->redirect()->toRoute('edit_user', ['userId' => $userData['user_id'], 'lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'userForm' 	=> $this->userForm,
			'fileArr' 	=> $fileArr,
			'lang' 		=> $lang,
			'config'	=> $this->config


		]);
	}


	/**
	 * Функционалност "Вход в системата".
	 */
	public function loginAction() {

		$lang = $this->params()->fromRoute('lang');

		if (!$this->userDM->isConnected()) {
			$viewModel = new ViewModel();
			$viewModel->setTemplate('error/index');
			return $viewModel;
		}

		if (!$this->userService->getAuthService()->hasIdentity())
			$this->userService->getOidcService()->loginUser($lang);

		return $this->redirect()->toRoute('home', ['lang' => $lang]);
	}


	/**
	 * Функционалност "Изход от системата".
	 */
	public function logoutAction() {

		$this->userService->getAuthService()->clearIdentity();

		$this->userService->getOidcService()->logoutUser();
	}


	/**
	 * Функционалност "Сваляне на файл към заявка за специален достъп".
	 *
	 * @return string Съдържание на файл.
	 */
	public function specialAccessDocumentAction() {

		$documentId = $this->params()->fromRoute('documentId');

		if ($documentContent = $this->userDM->getSpecialAccessDocumentById($documentId)) {

			$documenData = $this->userDM->getSpecialAccessDocumentList(null, $documentId);

			$documenData = array_shift($documenData)[0];

			$specialAccessRequestParams = ['request_id_list' => $documenData->getRequestId(), 'status' => '0,1,2'];

			if (!$this->isAllowed('user_manage_special_access')) {
				$userObj = $this->userService->getUser();
				$specialAccessRequestParams['user_id'] = $userObj->getUserId();
			}

			if ($requestObj = $this->userDM->getUserSpecialAccessList($totalCount, $specialAccessRequestParams)->current()) {

				$nonPrintingChars = array_map('chr', range(0,31));

				$invalidChars = array('<', '>', '?', '"', ':', '|', '\\', '/', '*', '&');

				$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

				$fileName = str_replace($allInvalidChars, '', $documenData->getName());

				// IE < version 11
				if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
					$fileName = rawurlencode($fileName);

					// IE version 11
				if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
					$fileName = rawurlencode($fileName);


				$fileName = \Document\Service\DocumentService::getOriginalFilename($fileName);

				$response = new \Zend\Http\Response();
				$response->setContent($documentContent);
				$response->setStatusCode(200);

				$headers = new \Zend\Http\Headers();
				$headers->addHeaderLine('Cache-Control', 'no-cache private')
				->addHeaderLine('Content-Description', 'File Transfer')
				->addHeaderLine('Content-Type', $documenData->getContentType())
				->addHeaderLine('Content-Disposition', 'attachment; filename="' . $fileName . '"')
				->addHeaderLine('Content-Length', $documenData->getFileSize());

				$response->setHeaders($headers);
				return $response;
			}
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
		return;

	}


	/**
	 * Функционалност "Преглед на заявки за специален достъп".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userManageSpecialAccessAction() {

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getSpecialAccessList();
		}

		$params = [
			'cp' => $page,
			'row_count' => $rowCount
		];

		// Търсене
		$searchForm = new \User\Form\SearchSpecialAccessForm();
		$request = $this->getRequest();
		$specialAccessStatusList = $this->cacheService->getSpecialAccessStatusList();
		$searchForm->get('status')->setValueOptions($specialAccessStatusList);

		if (!$search = $this->params()->fromQuery('search'))
			$searchForm->get('status')->setValue(array_search('EP_USR_SP_ACCESS_WAITING_L', $specialAccessStatusList));

		$searchForm->setData($this->params()->fromQuery());

		$searchParams = [];

		$searchParams = $this->params()->fromQuery();

		if ($searchForm->isValid())
			$searchParams = $searchForm->getData();

		$specialAccessList = $this->userDM->getUserSpecialAccessList($totalCount, $searchParams+$params);

		return new ViewModel([
			'searchForm' 				=> $searchForm,
			'lang' 						=> $this->params()->fromRoute('lang'),
			'specialAccessList' 		=> $specialAccessList,
			'specialAccessStatusList' 	=> $specialAccessStatusList,
			'totalPages' 				=> ceil($totalCount/$rowCount),
			'params' 					=> $this->params(),
			'totalCount' 				=> $totalCount
		]);

	}


	/**
	 * Функционалност "Търсене на потребител в активната директория".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function ldapSearchAction() {

		$lang = $this->params()->fromRoute('lang');

		$request = $this->getRequest();

		$search = $this->params()->fromQuery('search' , 0);

		$totalCount = 0;
		$totalPages = 0;
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];
		$page = $this->params()->fromQuery('page', 1);

		$config = $this->getConfig();
		$configActiveDirectory = $this->configActiveDirectory + $this->getLdapConfig();

		ldap_set_option(null, LDAP_OPT_X_TLS_CACERTFILE, $config['cacert']);

		$ldap = new Ldap($configActiveDirectory);

		$ldap->bind();

		$config['EP_USR_LDAP_ACCOUNT_DOMAIN_NAME_SHORT'];

		$userList = array();
		$userSearchList = array();

		$filter = $config['EP_USR_LDAP_FILTER'];

		$attributes = ['name', 'mail', 'samaccountname', 'mobile'];
		$sort = 'samaccountname';

		if (!empty($search)) {

			$this->ldapSearchForm->setData($request->getQuery());

			if ($this->ldapSearchForm->isValid()) {

				$data = $this->ldapSearchForm->getData();

				$userActiveDirectory = $data->getUsername();
				$userActiveDirectory = \Zend\Ldap\Filter\AbstractFilter::escapeValue($userActiveDirectory);

				$filter = (!empty($userActiveDirectory) && !empty($search) ? '(samaccountname=*'.$userActiveDirectory.'*)' : $filter);
			}
		}

		$userSearchList = $ldap->searchEntries(
				$filter,
				null,
				\Zend\Ldap\Ldap::SEARCH_SCOPE_SUB,
				$attributes,
				$sort
				);

		if (!empty($userSearchList)) {

			//странициране
			$userList = array_slice($userSearchList, 0, $rowCount);

			$totalCount = $ldap->count($filter);
			$totalPages = ceil($totalCount/$rowCount);
		}

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getItemList();
		}

		$this->layout('layout/layout-no-header');

		return new ViewModel([
				'ldapSearchForm' 			=> $this->ldapSearchForm,
				'userActiveDirectoryList' 	=> $userList,
				'ldapDomainNameShort' 		=> $config['EP_USR_LDAP_ACCOUNT_DOMAIN_NAME_SHORT'],
				'params' 					=> $this->params(),
				'lang' 						=> $lang,
				'totalCount' 				=> $totalCount,
				'rowCount' 					=> $rowCount,
				'totalPages' 				=> $totalPages
		]);
	}


	/**
	 * Функционалност "Списък с потребители от активната директория".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getItemList() {

		$search = $this->params()->fromQuery('search', 0);

		$userActiveDirectory = $this->params()->fromQuery('username');

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];

		$config = $this->getConfig();
		$configActiveDirectory = $this->configActiveDirectory + $this->getLdapConfig();

		ldap_set_option(null, LDAP_OPT_X_TLS_CACERTFILE, $config['cacert']);

		$ldap = new Ldap($configActiveDirectory);
		$ldap->bind();

		$filter = (!empty($userActiveDirectory) && !empty($search) ? '(samaccountname=*'.$userActiveDirectory.'*)' : $config['EP_USR_LDAP_FILTER']);

		$attributes = ['name', 'mail', 'samaccountname', 'mobile'];
		$sort = 'samaccountname';

		$userSearchList = $ldap->searchEntries($filter,
				null,
				\Zend\Ldap\Ldap::SEARCH_SCOPE_SUB,
				$attributes,
				$sort
				);

		if (!empty($userSearchList)) {

			//странициране
			$startElement = $page*$rowCount-$rowCount;
			$userList = array_slice($userSearchList, $startElement, $rowCount);
		}

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
				'userActiveDirectoryList' => $userList,
				'ldapDomainNameShort' => $config['EP_USR_LDAP_ACCOUNT_DOMAIN_NAME_SHORT']
		));

		$result->setTemplate('user/user/ldap-search-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Редакция на потребителски профил".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editUserAction() {

		$lang = $this->params()->fromRoute('lang');

		$fileArr = [];

		$params = $this->params();

		$userId = $this->params()->fromRoute('userId', 0);

		$isPreview = $this->params()->fromRoute('preview', false);

		$authList = [];
		$picObj = null;

		if ($baseObj = $this->userDM->getUserById($userId)) {

			$request = $this->getRequest();

			$permissionsGroupList['group_name_list'] = array_flip($this->cacheService->getPermissionsGroupList());
			$permissionList = $this->userDM->getPermissions(false, true);

			$userPermissionList = $this->userDM->getPermissionsListByUserId($userId);

			$userAuthTypePassword = $this->userDM->getUserAuthenticationById($baseObj->getUserId(), \User\Controller\UserController::USER_AUTH_PASSWORD)->count();

			// публичен потребител
			if (!empty($userAuthTypePassword)) {

				$this->userForm->getInputFilter()->get('userFieldset')->get('username')->setRequired(false);

				$specialAccessUserTypes = ["" => 'GL_CHOICE_L'] + $this->userDM->getSpecialAccessUserTypes();
				$this->userForm->get('userFieldset')->get('specialAccessUserType')->setValueOptions($specialAccessUserTypes);

				if (!empty($permissionsGroupList['group_name_list']))
					$adminPermissionGroupId = array_search('GL_CHOICE_ALL_L', $permissionsGroupList['group_name_list']);

				// в случай, че потребителят е публичен визуализират се само правата за Специализиран достъп и Безплатен достъп, премахват се Администраторски права
				if (!empty($adminPermissionGroupId))
					unset($permissionList[$adminPermissionGroupId]);


				if (!$isPreview) {
					$authList = $this->userDM->getUserAuthInfoList($userId);
					$picObj = $this->userDM->getUserAuthenticationById($userId, self::USER_AUTH_PIC)->current();
				}

			}

			// потребител от активната директория
			else {

				// в случай, че потребителят е от активната директория се премахва Вид потребител със специален достъп
				$this->userForm->getInputFilter()->get('userFieldset')->remove('specialAccessUserType');

				if (!empty($permissionsGroupList['group_name_list'])) {
					$specAccessPermissionGroupId = array_search('EP_USR_SPEC_RIGHTS_L', $permissionsGroupList['group_name_list']);
					$freePermissionGroupId = array_search('EP_USR_FREE_ACC_RIGHTS_L', $permissionsGroupList['group_name_list']);
				}

				// в случай, че потребителят е от активната директория визуализират се само Администраторски права, премахват се правата за Специализиран достъп, Безплатен достъп
				if (!empty($specAccessPermissionGroupId))
					unset($permissionList[$specAccessPermissionGroupId]);

				if (!empty($freePermissionGroupId))
					unset($permissionList[$freePermissionGroupId]);
			}

			$userStatusList = $this->cacheService->getUserStatusList();
			$statusToRemove = array_search('EP_USR_00007_E', $userStatusList);

			if($statusToRemove !== false)
				unset($userStatusList[$statusToRemove]);

			$this->userForm->get('userFieldset')->get('status')->setValueOptions($userStatusList);

			// списък с чекбокс, разделен по групи
			$this->userForm->get('userFieldset')->get('permissionList')->setAttributes($permissionsGroupList);
			$this->userForm->get('userFieldset')->get('permissionList')->setValueOptions($permissionList);

			if ($request->isPost()) {

				$fieldsetData = $this->params()->fromPost('userFieldset');

				$this->userForm->getInputFilter()->get('userFieldset')->get('files')->setRequired(false);

				$this->userForm->getInputFilter()->get('userFieldset')->remove('cin');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('username');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('updatedOn');

				$this->userForm->get('userFieldset')->get('cin')->setValue($baseObj->getCin());
				$this->userForm->get('userFieldset')->get('username')->setValue($baseObj->getUsername());
				$this->userForm->get('userFieldset')->get('updatedOn')->setValue($baseObj->getUpdatedOn());

				$this->userForm->setData($request->getPost());

				$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

				if ($this->userForm->isValid()) {

					$userObj = $this->userForm->getData();

					// права за достъп до функционалности
					$oldPermissionList = $userPermissionList;
					$newPermissionList = $userObj->getPermissionList();

					$intersectPermissionList = (!empty($oldPermissionList) && !empty($newPermissionList)) ? array_intersect($oldPermissionList,$newPermissionList) : [];

					if (!empty($intersectPermissionList)) {
						$userObj->permissionArr['delete'] = array_diff($oldPermissionList, $intersectPermissionList);
						$userObj->permissionArr['add'] = array_diff($newPermissionList, $intersectPermissionList);
					}
					else {
						$userObj->permissionArr['delete'] = !empty($oldPermissionList) ? $oldPermissionList : [];
						$userObj->permissionArr['add'] = !empty($newPermissionList) ? $newPermissionList : [];
					}

					$userObj->setUsername($baseObj->getUsername());

					if ($this->userDM->updateUserById($userId, $userObj)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_user', ['userId' => $userId, 'lang' => $params->fromRoute('lang')]);
					}
				}
			}

			else {

				if (!empty($userPermissionList)) {
					$baseObj->setPermissionList($userPermissionList);
					$this->userForm->get('userFieldset')->get('permissionList')->setValue($baseObj->getPermissionList());
				}

				$this->userForm->bind($baseObj);
			}

			// Секция заявки за специален достъп

			$specialAccessStatusList = [];
			$specialAccessArr = [];
			$specialIdArr = [];

			$documentArray = [];

			// публичен потребител
			if (!empty($userAuthTypePassword)) {

				$specialAccessStatusList = $this->cacheService->getSpecialAccessStatusList();

				$specialAccessList = $this->userDM->getUserSpecialAccessList($totalCount, ['user_id' => $baseObj->getUserId(), 'status' => implode(',', array_keys($specialAccessStatusList))]);

				foreach ($specialAccessList as $specialAccess)
					$specialAccessArr[$specialAccess->getRequestId()] = $specialAccess;

				if (count($specialAccessArr)) {
					$idList = implode(',', array_keys($specialAccessArr));
					$documentArray = $this->userDM->getSpecialAccessDocumentList($idList);
				}
			}

			if ($isPreview) {
				$this->layout('layout/layout-no-header');

				$userFieldset = $this->userForm->getFieldsets();

				$userFieldset = array_shift($userFieldset);

				foreach ($userFieldset->getElements() as $element)
					$element->setAttributes(['disabled' => true, 'readonly' => true]);

				foreach ($this->userForm->getElements() as $element)
					$element->setAttributes(['disabled' => true, 'readonly' => true]);
			}

			$showSpecailAccessSection = $this->params()->fromQuery('showSpecialAccess') ? true : false;

			return new ViewModel([
					'userForm' 					=> $this->userForm,
					'userId' 					=> $userId,
					'userAuthTypePassword' 		=> $userAuthTypePassword,
					'params' 					=> $params,
					'lang'						=> $lang,
					'specialAccessArr' 			=> $specialAccessArr,
					'documentArray' 			=> $documentArray,
					'specialAccessStatusList' 	=> $specialAccessStatusList,
					'config'					=> $this->config,
					'isPreview'					=> $isPreview,
					'showSpecailAccessSection'	=> $showSpecailAccessSection,
					'authList' 					=> $authList,
					'picObj' 					=> $picObj
			]);

		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Взима списък със заявки за специален достъп
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getSpecialAccessList() {

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];

		$params = [
				'cp' => $page,
				'row_count' => $rowCount,
				'total_count' => false
		];

		$searchParams = $this->params()->fromQuery();

		$specialAccessList = $this->userDM->getUserSpecialAccessList($totalCount, $searchParams+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
				'params' 					=> $this->params(),
				'specialAccessList' 		=> $specialAccessList,
				'specialAccessStatusList' 	=> $this->cacheService->getSpecialAccessStatusList(),
				'params' 					=> $this->params()
		));

		$result->setTemplate('user/user/user-manage-special-access-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Търсене на потребителски профил".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userSearchAction() {

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];
		$type = $this->params()->fromRoute('type');

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getUserList();
		}

		$params = [
			'cp' => $page,
			'row_count' => $rowCount
		];


		$searchForm = new \User\Form\UserSearchForm();

		if ($type == "selectUser" || $type == "selectUserList") {
			$this->layout('layout/layout-no-header');
			$params['status'] = 1;
			$searchForm->get('status')->setValue(1);
			$searchForm->get('status')->setAttribute('disabled', true);

		}

		// Търсене
		$request = $this->getRequest();
		$userStatusList = $this->cacheService->getUserStatusList();

		$searchForm->get('status')->setValueOptions(["" => 'GL_CHOICE_ALL_L'] + $userStatusList);

		$specialAccessUserTypes = $this->userDM->getSpecialAccessUserTypes();
		$searchForm->get('specialAccessUserType')->setValueOptions($specialAccessUserTypes);

		$searchParams =$this->params()->fromQuery();

		$searchForm->setData($searchParams);

		if (!empty($searchParams['search'])) {

			$userList = [];

			if ($searchForm->isValid()) {

				$searchParams = $searchForm->getData();

				if ($type == "selectUser" || $type == "selectUserList")
					unset($searchParams['status']);

				$userList = $this->userDM->getUserList($totalCount, $searchParams+$params, true);
			}

			else {
				if (!empty($searchForm->getMessages('specialAccessUserType')))
					$searchForm->get('specialAccessUserType')->setValue(0);
			}
		}

		else
			$userList = $this->userDM->getUserList($totalCount, $params, true);

		return new ViewModel([
				'params' 			=> $this->params(),
				'searchForm' 		=> $searchForm,
				'lang' 				=> $this->params()->fromRoute('lang'),
				'type' 				=> $type,
				'userList' 			=> $userList,
				'userStatusList' 	=> $userStatusList,
				'totalPages' 		=> !empty($totalCount) ? ceil($totalCount/$rowCount) : 0,
				'totalCount' 		=> !empty($totalCount) ? $totalCount : 0
		]);
	}


	/**
	 * Взима списък с потребители.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getUserList() {

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];
		$type = $this->params()->fromRoute('type');

		$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count' 	=> false
		];

		$searchParams = $this->params()->fromQuery();

		if ($type == "selectUser" || $type == "selectUserList")
			$params['status'] = 1;

		$userList = $this->userDM->getUserList($totalCount, $searchParams+$params, true);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' 			=> $this->params(),
			'userList' 			=> $userList,
			'type' 				=> $type,
			'userStatusList'	=> $this->cacheService->getUserStatusList()
		));

		$result->setTemplate('user/user/user-search-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Редакция на заявка за специален достъп".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editSpecialAccessRequestAction() {

		$requestId  = $this->params()->fromRoute('requestId');
		$userId = $this->params()->fromRoute('userId');

		$userObj = $this->userDM->getUserById($userId);

		$authType = $this->userDM->getUserAuthenticationById($userObj->getUserId(), \User\Controller\UserController::USER_AUTH_ACTIVE_DIRECTORY);
		$isActiveDirectoryUser = $authType->count() ? true : false;
		$logKey = $isActiveDirectoryUser ? $userObj->getUsername() : $userObj->getEmail();

		$request = $this->getRequest();

		$specialAccessRequest = $this->userDM->getUserSpecialAccessList($totalCount, ['status' => '0,1,2', 'request_id_list' => $requestId])->current();

		if ($request->isXmlHttpRequest() && !$specialAccessRequest->getAccessStatus()) {

			if (!empty($files = $request->getPost('files'))) {
				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($files);
				$this->userDM->addSpecialAccessRequestDocument($fileArr, $requestId, $logKey);
			}

			$documentList = $this->userDM->getSpecialAccessDocumentList($requestId, null);

			$docListHtml = '';

			foreach ($documentList[$requestId] as $document)
				$docListHtml .= '<p><a href="'.$this->url()->fromRoute('special_access_document_download', ['lang' => $this->params()->fromRoute('lang'), 'documentId' => $document->getDocId()]).'">'.\Document\Service\DocumentService::getOriginalFilename($document->getName()).'</a></p>';

				return new JsonModel([
					'result' => $docListHtml
				]);
		}

		$this->layout('layout\layout-no-header');

		return new ViewModel([
			'requestId'				=> $requestId,
			'config'				=> $this->config,
			'specialAccessStatus'	=>	$specialAccessRequest->getAccessStatus()
		]);
	}


	/**
	 * Функционалност "Смяна на парола".
	 *
	 * @return Response HTTP отговор.
	 */
	public function resetPasswordAction() {

		$request = $this->getRequest();
		$lang = $this->params()->fromRoute('lang');
		$userId = $this->params()->fromRoute('userId');

		if ($userObj = $this->userDM->getUserById($userId)) {

			$token = \Application\Service\AppService::genToken();

			$config = $this->getConfig();

			$emailParams = [
				'template' 	=> \Application\Service\RestService::RESET_PASSWORD_OFFICIAL_MODE_LINK,
				'recipient' => $userObj->getEmail(),
				'params' 	 => [
					'{ACTIVATION_LINK}' => \Application\Service\AppService::getFEUrl($config).(!empty($lang) ? $lang.'/' : '').'forgot-password-change/'.$token,
					'{DEADLINE}' => \Application\Service\AppService::setDeadlineFromDateInterval($this->config['EP_USR_PROCESS_CONFIRM_PERIOD'])
				]
			];

			if ($this->userDM->addUserProcess($token, $userObj->getUserId(), $this->cacheService->getUserProcessStatus()['CHANGE_PASSWORD'], $emailParams))
				$this->flashMessenger()->addSuccessMessage('EP_USR_00008_I');
			else
				$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

			return $this->redirect()->toRoute('edit_user', ['lang' => $lang, 'userId' => $userId]);
		}
	}


	/**
	 * Функционалност "Редакция на потребителски профил".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userProfileAction() {

		$lang = $this->params()->fromRoute('lang');

		$userSession = $this->userService->getUser();

		if ($userSession->getIsPublicUser())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$totalCount = null;
		$userObj = $this->userDM->getUserList($totalCount, ['id' => $userSession->getUserId()]);

		$specialAccessList = $this->userDM->getUserSpecialAccessList($totalCount, ['user_id' => $userObj->getUserId()] );

		$specialAccessArr = [];

		foreach ($specialAccessList as $specialAccess)
			$specialAccessArr[$specialAccess->getRequestId()] = $specialAccess;

		$documentArray = [];

		if (count($specialAccessArr)) {
			$idList = implode(',', array_keys($specialAccessArr));
			$documentArray = $this->userDM->getSpecialAccessDocumentList($idList);
		}

		$request = $this->getRequest();

		$fileArr = [];

		$this->userForm->get('userFieldset')->get('contactData')->setLabelAttributes(['class' => 'required-field']);

		// Полетата за данни на потребител не се редактират, ако има поне една заявка за специален достъп
		if (count($specialAccessArr)) {

			$this->userForm->get('userFieldset')->get('firstName')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('firstName')->setValue($userObj->getFirstName());

			$this->userForm->get('userFieldset')->get('middleName')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('middleName')->setValue($userObj->getMiddleName());

			$this->userForm->get('userFieldset')->get('familyName')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('familyName')->setValue($userObj->getFamilyName());

			$this->userForm->get('userFieldset')->get('contactData')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('contactData')->setValue($userObj->getContactData());

			$this->userForm->get('userFieldset')->get('email')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('email')->setValue($userObj->getEmail());

			$this->userForm->get('userFieldset')->get('organization')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('organization')->setValue($userObj->getOrganization());

			$this->userForm->get('userFieldset')->get('username')->setAttribute('disabled', true);
			$this->userForm->get('userFieldset')->get('username')->setValue($userObj->getUsername());

			$this->userForm->getInputFilter()->get('userFieldset')->remove('firstName');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('middleName');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('familyName');
			// $this->userForm->getInputFilter()->get('userFieldset')->remove('contactData');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('email');
		}

		if ($request->isPost()) {

			$this->userForm->setData($request->getPost());

			$fieldsetData = $this->params()->fromPost('userFieldset');

			$files = isset($fieldsetData['files']) ? $fieldsetData['files'] : [];

			foreach ($files as $file)
				$fileArr[$file] = $file;

			$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

			// Полета, които не участват във формата
			$this->userForm->getInputFilter()->get('userFieldset')->remove('password');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('confirmPassword');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('oldPassword');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('terms');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('status');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('username');

			// Има ли заявки за специален достъп
			$specialAccess = isset($fieldsetData['specialAccess']) && $fieldsetData['specialAccess'] ? true : false;

			$this->userForm->get('userFieldset')->get('cin')->setValue($userObj->getCin());
			$this->userForm->get('userFieldset')->get('username')->setValue($userObj->getUsername());

			if (!$specialAccess) {
				$this->userForm->getInputFilter()->get('userFieldset')->remove('organization');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('specialAccessUserType');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('files');
			}
			else {
				$this->userForm->getInputFilter()->get('userFieldset')->get('files')->setRequired(true);

				if (!count($specialAccessArr))
					$this->userForm->getInputFilter()->get('userFieldset')->get('contactData')->setRequired(true);
			}

			if ($this->userForm->isValid()) {

				$postObj = $this->userForm->getData();

				$postObj->setSpecialAccessUserType($userObj->getSpecialAccessUserType());

				if (count($specialAccessArr)) {
					$postObj->setFirstName($userObj->getFirstName());
					$postObj->setMiddleName($userObj->getMiddleName());
					$postObj->setFamilyName($userObj->getFamilyName());
					$postObj->setContactData($userObj->getContactData());
					$postObj->setUsername($userObj->getUsername());
					$postObj->setCin($userObj->getCin());
					$postObj->setEmail($userObj->getEmail());
					$postObj->setOrganization($userObj->getOrganization());
				}

				$postObj->setStatus($userObj->getStatus());

				$postObj->setUsername($userObj->getUsername());

				if ($this->userDM->updateUserById($userObj->getUserId(), $postObj))
					$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');
				else
					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

				return $this->redirect()->toRoute('user_profile', ['lang' => $lang]);
			}

		}
		else {
			$this->userForm->bind($userObj);
		}

		return new ViewModel([
			'userObj' 					=> $userObj,
			'userForm' 					=> $this->userForm,
			'lang' 						=> $lang,
			'fileArr' 					=> $fileArr,
			'specialAccessArr' 			=> $specialAccessArr,
			'documentArray' 			=> $documentArray,
			'specialAccessStatusList' 	=> $this->cacheService->getSpecialAccessStatusList()
		]);
	}

	/**
	 * Функционалност "Потребителска сесия".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function loginSessionListAction() {

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			return $this->getLoginSessionList();
		}

		$loginSessionForm = new LoginSessionForm();
		$loginSessionForm->setData($this->params()->fromQuery());

		$params = [
			'cp' => $page,
			'row_count' => $rowCount
		];

		$searchParams = array_map('trim', $this->params()->fromQuery());

		$loginSessionList = [];
		$totalCount = null;

		if ($this->params()->fromQuery('search')) {
			if ($loginSessionForm->isValid()) {
				$loginSessionList = $this->userDM->getLoginSessionList($totalCount, $searchParams+$params);
			}

		}

		$this->layout('layout/layout-no-header');

		return new ViewModel([
			'loginSessionList'	=> $loginSessionList,
			'totalCount'		=> $totalCount,
			'loginSessionForm' 	=> $loginSessionForm,
			'totalPages' 		=> ceil($totalCount/$rowCount),
			'search'			=> $this->params()->fromQuery('search')
		]);
	}

	/**
	 * Взима списък с потребителски сесии.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLoginSessionList() {

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $this->config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' => $page,
			'row_count' => $rowCount,
			'total_count' => false
		];

		$searchParams = array_map('trim', $this->params()->fromQuery());

		$loginSessionList = $this->userDM->getLoginSessionList($totalCount, $searchParams+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'loginSessionList' => $loginSessionList,
		]);

		$result->setTemplate('user/user/login-session-list-partial.phtml');

		return $result;
	}

	/**
	 * Функционалност "Прелед на логин сесия".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function loginSessionAction() {

		$loginSession = $this->params()->fromRoute('loginSession');

		$params = ['loginSessionList' => [$loginSession]];

		$certObj= null;
		$picObj	= null;

		if ($loginSessionObj = $this->userDM->getLoginSessionList($totalCount, $params)->current()) {


			switch ($loginSessionObj->getAuthenticationType()) {

				case self::USER_AUTH_CERTIFICATE:

					$certObj = $this->userDM->getCertificateList(['idList' => [$loginSessionObj->getCertificateId()]])->current();

					break;

				case self::USER_AUTH_PIC:

					$userObj = $this->userService->getUser();

					$picObj = $this->userDM->getUserAuthenticationById($userObj->getUserId(), self::USER_AUTH_PIC)->current();

					break;

			}

			$this->layout('layout/layout-no-header');

			return new ViewModel([
				'loginSessionObj' 	=> $loginSessionObj,
				'certObj'			=> $certObj,
				'picObj'			=> $picObj,
				'params'			=> $this->getConfig()
			]);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
		return;
	}

	/**
	 * Връща конфигурация за LDAP
	 *
	 * @return array
	 */
	public function getLdapConfig() {

		$config = $this->getConfig();

		$configActiveDirectory = $this->configActiveDirectory;

		$configActiveDirectory['host'] = $config['EP_USR_LDAP_HOST'];
		$configActiveDirectory['username'] = $config['EP_USR_LDAP_USERNAME'];
		$configActiveDirectory['password'] = $config['EP_USR_LDAP_PASSWORD'];
		$configActiveDirectory['baseDn'] = $config['EP_USR_LDAP_BASE_DN'];
		$configActiveDirectory['accountDomainName'] = $config['EP_USR_LDAP_ACCOUNT_DOMAIN_NAME'];
		$configActiveDirectory['accountDomainNameShort'] = $config['EP_USR_LDAP_ACCOUNT_DOMAIN_NAME_SHORT'];
		$configActiveDirectory['useSsl'] = $config['EP_USR_LDAP_USE_SSL'] ? true : false;

		return $configActiveDirectory;
	}

	/**
	 * Функционалност "Одобряване/отхвърляне на заявка за специален достъп".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userSpecialAccessApprovalAction() {

		$lang = $this->params()->fromRoute('lang');

		$fileArr = [];

		$params = $this->params();

		$specialAccessId = $this->params()->fromRoute('id', 0);

		if ($specialAccessRequest = $this->userDM->getUserSpecialAccessList($totalCount, ['status' => '0,1,2', 'request_id_list' => $specialAccessId])->current()) {

			$userId = $specialAccessRequest->getUserId();

			if ($baseObj = $this->userDM->getUserById($userId)) {

				$request = $this->getRequest();

				$userPermissionList = [];
				$userPermissionList = $this->userDM->getPermissionsListByUserId($userId);

				// списък с чекбокс, разделен по групи
				$permissionsGroupList['group_name_list'] = array_flip($this->cacheService->getPermissionsGroupList());
				$permissionList = $this->userDM->getPermissions(false, true);

				$userAuthTypePassword = $this->userDM->getUserAuthenticationById($baseObj->getUserId(), \User\Controller\UserController::USER_AUTH_PASSWORD)->count();

				if (!empty($userAuthTypePassword)) {
					$this->userForm->getInputFilter()->get('userFieldset')->get('username')->setRequired(false);

					if (!empty($permissionsGroupList['group_name_list']))
						$adminPermissionGroupId = array_search('GL_CHOICE_ALL_L', $permissionsGroupList['group_name_list']);

					// в случай, че потребителят е публичен визуализират се само правата за Специализиран достъп и Безплатен достъп, премахват се Администраторски права
					if (!empty($adminPermissionGroupId))
						unset($permissionList[$adminPermissionGroupId]);
				}

				else {

					if (!empty($permissionsGroupList['group_name_list'])) {
						$specAccessPermissionGroupId = array_search('EP_USR_SPEC_RIGHTS_L', $permissionsGroupList['group_name_list']);
						$freePermissionGroupId = array_search('EP_USR_FREE_ACC_RIGHTS_L', $permissionsGroupList['group_name_list']);
					}

					// в случай, че потребителят е от активната директория визуализират се само Администраторски права, премахват се правата за Специализиран достъп, Безплатен достъп
					if (!empty($specAccessPermissionGroupId))
						unset($permissionList[$specAccessPermissionGroupId]);

					if (!empty($freePermissionGroupId))
						unset($permissionList[$freePermissionGroupId]);
				}

				$userStatusList = $this->cacheService->getUserStatusList();
				$statusToRemove = array_search('EP_USR_00007_E', $userStatusList);

				if($statusToRemove !== false)
					unset($userStatusList[$statusToRemove]);

				$this->userForm->get('userFieldset')->get('status')->setValueOptions($userStatusList);

				$this->userForm->get('userFieldset')->get('permissionList')->setAttributes($permissionsGroupList);
				$this->userForm->get('userFieldset')->get('permissionList')->setValueOptions($permissionList);

				$specialAccessUserTypes = ["" => 'GL_CHOICE_L'] + $this->userDM->getSpecialAccessUserTypes();
				$this->userForm->get('userFieldset')->get('specialAccessUserType')->setValueOptions($specialAccessUserTypes);

				$specialAccessStatusList = $this->cacheService->getSpecialAccessStatusList();

				$emailTemplateList = $this->cacheService->getTemplateEmailIdList();

				if ($request->isPost() && !$specialAccessRequest->getAccessStatus()) {

					$fieldsetData = $this->params()->fromPost('userFieldset');

					$this->userForm->getInputFilter()->get('userFieldset')->get('files')->setRequired(false);

					$this->userForm->getInputFilter()->get('userFieldset')->remove('cin');
					$this->userForm->getInputFilter()->get('userFieldset')->remove('username');
					$this->userForm->getInputFilter()->get('userFieldset')->remove('updatedOn');

					$this->userForm->get('userFieldset')->get('cin')->setValue($baseObj->getCin());
					$this->userForm->get('userFieldset')->get('username')->setValue($baseObj->getUsername());
					$this->userForm->get('userFieldset')->get('updatedOn')->setValue($baseObj->getUpdatedOn());

					$files = isset($fieldsetData['files']) ? $fieldsetData['files'] : [];

					foreach ($files as $file)
						$fileArr[$file] = $file;

					$this->userForm->setData($request->getPost());

					$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

					if ($this->userForm->isValid()) {

						$userObj = $this->userForm->getData();

						$action = $this->params()->fromPost('actionType');

						$authType = $this->userDM->getUserAuthenticationById($baseObj->getUserId(), \User\Controller\UserController::USER_AUTH_ACTIVE_DIRECTORY);
						$isActiveDirectoryUser = $authType->count() ? true : false;

						$logKey = $isActiveDirectoryUser ? $baseObj->getUsername() : $baseObj->getEmail();

						switch ($action) {

							case 'approve':

								$emailParams = [
									'template' 	=>	$emailTemplateList['SPECIAL_ACCESS_REQUEST_APPROVED'],
									'recipient'	=>	$baseObj->getEmail()
								];

								if (!$result = $this->userDM->changeSpecialAccessRequestStatus($specialAccessId, array_search('EP_USR_SP_ACCESS_APPROVED_L', $specialAccessStatusList), null, $emailParams, $action, $logKey)) {
									$this->flashMessenger()->addErrorMessage('EP_USR_00023_I');
									return $this->redirect()->toRoute('user_special_access_approval', ['id' => $specialAccessId, 'lang' => $params->fromRoute('lang')]);

								}

								$message = $this->translator->translate('EP_USR_SP_ACCESS_APPROVED_L');

							break;

							case 'disapprove':

								$emailParams = [
									'template' 	=> 	$emailTemplateList['SPECIAL_ACCESS_REQUEST_DISAPPROVED'],
									'recipient'	=>	$baseObj->getEmail(),
									'params' 	 => [
										'{STATUS_REASON}' => !empty($userObj->getStatusReason()) ? $this->translator->translate('EP_USR_RESON_DENIED_ACCESS_L').': '.nl2br($userObj->getStatusReason()).'.<br />' : ''
									]
								];
								if (!$result = $this->userDM->changeSpecialAccessRequestStatus($specialAccessId, array_search('EP_USR_SP_ACCESS_DISAPPROVED_L', $specialAccessStatusList), $userObj->getStatusReason(), $emailParams, $action, $logKey)) {
									$this->flashMessenger()->addErrorMessage('EP_USR_00023_I');
									return $this->redirect()->toRoute('user_special_access_approval', ['id' => $specialAccessId, 'lang' => $params->fromRoute('lang')]);
								}

								$message = $this->translator->translate('EP_USR_SP_ACCESS_DISAPPROVED_L');
							break;
						}

						// права за достъп до функционалности
						$oldPermissionList = $userPermissionList;
						$newPermissionList = $userObj->getPermissionList();

						$intersectPermissionList = (!empty($oldPermissionList) && !empty($newPermissionList)) ? array_intersect($oldPermissionList,$newPermissionList) : [];

						if (!empty($intersectPermissionList)) {
							$userObj->permissionArr['delete'] = array_diff($oldPermissionList, $intersectPermissionList);
							$userObj->permissionArr['add'] = array_diff($newPermissionList, $intersectPermissionList);
						}
						else {
							$userObj->permissionArr['delete'] = !empty($oldPermissionList) ? $oldPermissionList : [];
							$userObj->permissionArr['add'] = !empty($newPermissionList) ? $newPermissionList : [];
						}

						$userObj->setUsername($baseObj->getUsername());

						if ($this->userDM->updateUserById($userId, $userObj)) {
							$this->flashMessenger()->addSuccessMessage($message);
							return $this->redirect()->toRoute('user_special_access_approval', ['id' => $specialAccessId, 'lang' => $params->fromRoute('lang')]);
						}
					}
				}

				else {

					if (!empty($userPermissionList)) {
						$baseObj->setPermissionList($userPermissionList);
						$this->userForm->get('userFieldset')->get('permissionList')->setValue($baseObj->getPermissionList());
					}

					$this->userForm->bind($baseObj);
				}

				$documentArray = $this->userDM->getSpecialAccessDocumentList($specialAccessId);

				if ($specialAccessRequest->getAccessStatus()) {

					$userFieldset = $this->userForm->getFieldsets();

					$userFieldset = array_shift($userFieldset);

					foreach ($userFieldset->getElements() as $element)
						$element->setAttributes(['disabled' => true, 'readonly' => true]);

					foreach ($this->userForm->getElements() as $element)
						$element->setAttributes(['disabled' => true, 'readonly' => true]);
				}

				return new ViewModel([
						'userForm' 					=> $this->userForm,
						'userId' 					=> $userId,
						'userAuthTypePassword' 		=> $userAuthTypePassword,
						'params' 					=> $params,
						'lang'						=> $lang,
						'documentArray' 			=> $documentArray,
						'specialAccessStatusList' 	=> $specialAccessStatusList,
						'config'					=> $this->config,
						'specialAccessRequest'		=> $specialAccessRequest,
						'fileArr' 					=> $fileArr
				]);
			}
		}
		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Добавяне на причини за отказан достъп при отказ за одобрение на заявка за специален достъп.".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addSpecialAccessDisapprovalReasonAction() {

		$this->layout('layout/ajax');

		return new ViewModel([]);
	}


	/**
	 * Функционалност "Редакция на заявка за специален достъп".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addSpecialAccessRequestAction() {

		$userId = $this->params()->fromRoute('userId');

		$userObj = $this->userDM->getUserById($userId);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if (!empty($files = $request->getPost('files'))) {

				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($files);

				if ($this->userDM->addAccessRequests($userObj, $fileArr)) {
					$this->flashMessenger()->addSuccessMessage('EP_USR_00013_I');
				}
			}
		}

		$this->layout('layout\layout-no-header');

		return new ViewModel([
			'config'	=> $this->config,
			'userId'	=> $userId
		]);
	}

	/**
	 * Функционалност "Нективност на потребител.".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function idleLogoutAction() {

		$auth = $this->userService->getAuthService();

		if ($auth->hasIdentity()) {
			$this->userService->getAuthService()->clearIdentity();
			$this->userService->getOidcService()->logoutUser('post_logout_redirect_idle_uri', true);
		}
	}

}