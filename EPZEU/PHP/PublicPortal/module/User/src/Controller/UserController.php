<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use User\Entity\UserEntity;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\Validator\ValidatorChain;
use Application\Service\AppService;
use User\Entity\CertEntity;
use User\Form\EmailSubscriptionForm;
use Application\Validator\EgnValidator;
use Application\Validator\PersonIdValidator;
use Application\Validator\BulstatValidator;


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

	CONST USER_STATUS_LIST = [
		'WAITING'	=> 0,
		'ACTIVE'	=> 1,
		'INACTIVE'	=> 2
	];

	CONST USER_ACCESS_REQUEST_STATUS_LIST = [
		0 => 'WAITING',
		1 => 'APPROVED',
		2 => 'DISAPPROVED'
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
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


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
	 * Обект за поддържане и съхранение на страници.
	 *
	 * @var \Content\Data\PageDataManager
	 */
	protected $pageDM;

	/**
	 * Услуга за работа с RateLimit.
	 *
	 * @var \Application\Service\RateLimitService
	 */
	protected $rateLimitService;


	/**
	 * Конструктор.
	 *
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 * @param \User\Form\UserForm $userForm Обект за генериране и валидиране на форма за потребител.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \Application\Service\RestService $restService Услуга за работа с REST уеб услуги.
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страници.
	 */
	public function __construct($userDM, $userForm, $userService, $cacheService, $restService, $pageDM, $rateLimitService) {
		$this->userDM = $userDM;
		$this->userForm = $userForm;
		$this->userService = $userService;
		$this->cacheService = $cacheService;
		$this->restService = $restService;
		$this->pageDM = $pageDM;
		$this->rateLimitService = $rateLimitService;
	}

	/**
	 * Функционалност "Подаване на заявка за регистрация на потребител".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function registerAction() {

		$config = $this->getConfig();

		$lang = $this->params()->fromRoute('lang');

		if ($this->userService->getAuthService()->hasIdentity())
			$this->redirect()->toRoute('home', ['lang' => $lang]);

		$request = $this->getRequest();

		$this->userDM->getSpecialAccessUserTypes();

		$fileArr = [];

		$termUrl = $this->url()->fromRoute('redefined_page', ['lang' => $lang, 'url' => 'terms-of-use']);

		$this->userForm->get('userFieldset')->get('terms')->setAttribute('url', $termUrl);

		if ($request->isPost()) {

			$fieldsetData = $this->params()->fromPost('userFieldset');

			$hydrator = new ClassMethodsHydrator();
			$baseObj = $hydrator->hydrate($fieldsetData, new UserEntity());

			$this->userForm->getInputFilter()->get('userFieldset')->remove('oldPassword');

			// Полета, които участват при заявка за специален достъп
			if (!$baseObj->getSpecialAccess()) {
				 $this->userForm->getInputFilter()->get('userFieldset')->remove('organization');
				 $this->userForm->getInputFilter()->get('userFieldset')->remove('specialAccessUserType');
				 $this->userForm->getInputFilter()->get('userFieldset')->remove('files');
				 $this->userForm->getInputFilter()->get('userFieldset')->get('contactData')->setRequired(false);
			}

			else {
				$this->userForm->getInputFilter()->get('userFieldset')->get('contactData')->setRequired(true);
				$this->userForm->get('userFieldset')->get('contactData')->setLabelAttributes(['class' => 'required-field field-title field-title--form', 'id' => 'contact-label']);
			}

			$files = isset($fieldsetData['files']) ? $fieldsetData['files'] : [];

			foreach ($files as $file) {

				$dataInfo = json_decode($file);

				if (!is_object($dataInfo) || !property_exists($dataInfo , 'uuid'))
					throw new \Exception('UUID Error '. $file);

				$validator = new \Zend\Validator\Uuid();

				if (!$validator->isValid($dataInfo->uuid))
					throw new \Exception('Invalid UUID '.$dataInfo->uuid);

				$fileArr[$file] = ['value' => $file, 'label' => $file, 'attributes' => ['data-uuid' => $dataInfo->uuid]];
			}

			$this->userForm->setData($request->getPost());

			$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

			if ($this->userForm->isValid()) {

				if ($isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_REGISTRATION_LIMIT', 'IP:'.$_SERVER['REMOTE_ADDR']))
					return new ViewModel(['isRateLimitReached' => $isRateLimitReached]);

				$userObj = $this->userForm->getData();

				$userObj->setPassword($this->userService::createPass($userObj->getPassword()));

				$token = \Application\Service\AppService::genToken();

				$emailParams = [
					'template' 	=> \Application\Service\RestService::USER_CONFIRMATION,
					'recipient' => $userObj->getEmail(),
					'params' 	 => [
						'{ACTIVATION_LINK}' => $this->url()->fromRoute('user_confirmation',['lang' => $lang ,'token' => $token],['force_canonical' => true,'query' => ['action' => 'activate']]),
						'{DEACTIVATION_LINK}' => 	$this->url()->fromRoute('user_confirmation', ['lang' => $lang ,'token' => $token], ['force_canonical' => true,'query' => ['action' => 'cancelRegistration']]),
						'{CIN}' => '',
						'{DEADLINE}' => \Application\Service\AppService::setDeadlineFromDateInterval($config['EP_USR_PROCESS_CONFIRM_PERIOD']),
					]
				];

				if ($userData = $this->userDM->addUser($userObj, $token, $emailParams))
					$this->flashMessenger()->addSuccessMessage('EP_USR_00001_I');
				else
					$this->flashMessenger()->addErrorMessage('EP_USR_00023_I');

				return $this->redirect()->toRoute('register', ['lang' => $lang]);
			}

		}

		return new ViewModel([
			'isRateLimitReached'	=> false,
			'userForm' 				=> $this->userForm,
			'fileArr' 				=> $fileArr,
			'lang' 					=> $lang,
			'config'				=> $config
		]);
	}


	/**
	 * Функционалност "Потвърждаване/отказване на заявка за регистрация на потребител".
	 *
	 * @return Response HTTP отговор.
	 */
	public function userConfirmationAction() {

		$token = $this->params()->fromRoute('token');
		$action = $this->params()->fromQuery('action');

		$isValidToken = false;

		$lang = $this->params()->fromRoute('lang');

		if (!$userProceess = $this->userDM->getUserProcess($token, $this->cacheService->getUserProcessStatus()['ACTIVATE_USER']))
			return $this->redirect()->toRoute('user_process', ['process' => 'invalid-token', 'lang' => $lang]);

		if ($userProceess->getStatus())
			return $this->redirect()->toRoute('user_process', ['process' => 'user-activated', 'lang' => $lang]);

		$invalidAfter = AppService::getDateFromSQL($userProceess->getInvalidAfter(), true);

		if (AppService::compareDates($invalidAfter, date('d.m.Y H:i:s')) != -1)
			return $this->redirect()->toRoute('user_process', ['process' => 'invalid-token', 'lang' => $lang]);

		if ($userObj = $this->userDM->getUserList($totalCount, ['id' => $userProceess->getUserId()])) {

			switch ($action) {
				case 'activate':
					$userStatusLis = $this->cacheService->getUserStatusList();
					$userObj->setStatus($userStatusLis['ACTIVE']);
					$this->userDM->updateUserById($userObj->getUserId(), $userObj, 'confirmRegistration', $userProceess->getProcessId());
					return $this->redirect()->toRoute('user_process', ['process' => 'confirm-registration', 'lang' => $lang]);
				break;

				case 'cancelRegistration':
					$this->userDM->deleteUserById($userObj->getUserId());
					return $this->redirect()->toRoute('user_process', ['process' => 'cancel-registration', 'lang' => $lang]);
				break;
			}
		}

		return $this->redirect()->toRoute('user_process', ['process' => 'invalid-token', 'lang' => $lang]);
	}


	/**
	 * Функционалност "Забравена парола".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function forgotPasswordAction() {

		$lang = $this->params()->fromRoute('lang');

		if ($this->userService->getAuthService()->hasIdentity())
			$this->redirect()->toRoute('home', ['lang' => $lang]);

		$request = $this->getRequest();

		$fileArr = [];

		if ($request->isPost()) {

			if ($isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_PASS_LIMIT', 'IP:'.$_SERVER['REMOTE_ADDR']))
				return new ViewModel(['isRateLimitReached' => $isRateLimitReached]);

			$validationGroup = ['userFieldset' => ['email']];
			$this->userForm->setValidationGroup($validationGroup);

			$this->userForm->setData($request->getPost());
			if ($this->userForm->isValid()) {

				$postData = $this->userForm->getData();

				if ($userObj = $this->userDM->getUserList($totalCount, ['email' => $postData->getEmail()])) {

					$auth = $this->userDM->getUserAuthenticationById($userObj->getUserId(), UserController::USER_AUTH_PASSWORD);

					if (!$auth->current()) {
						$this->flashMessenger()->addErrorMessage('EP_USR_00008_E');
						return $this->redirect()->toRoute('forgot_password', ['lang' => $lang]);
					}

					if ($userObj->getStatus() != self::USER_STATUS_LIST['ACTIVE']) {
						$this->flashMessenger()->addErrorMessage('GL_USER_PROFILE_NOACTIVE_E');
						return $this->redirect()->toRoute('forgot_password', ['lang' => $lang]);
					}

					$token = \Application\Service\AppService::genToken();

					$config = $this->getConfig();

					$emailParams = [
						'template' => \Application\Service\RestService::RESET_PASSWORD_LINK,
						'recipient' => $postData->getEmail(),
						'params' => [
							'{ACTIVATION_LINK}' => $this->url()->fromRoute('forgot_password_change', ['lang' => $lang, 'token' => $token], ['force_canonical' => true]),
							'{DEADLINE}' => \Application\Service\AppService::setDeadlineFromDateInterval($config['EP_USR_PROCESS_CONFIRM_PERIOD'])
						]
					];

					if ($this->userDM->addUserProcess($token, $userObj->getUserId(), $this->cacheService->getUserProcessStatus()['CHANGE_PASSWORD'], $emailParams))
						$this->flashMessenger()->addSuccessMessage('EP_USR_00008_I');
					else
						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

					return $this->redirect()->toRoute('forgot_password', ['lang' => $lang]);
				}

				$this->userForm->get('userFieldset')->get('email')->setMessages(['' => 'GL_UNREG_EMAIL_E']);
			}
		}

		return new ViewModel([
			'isRateLimitReached'	=> false,
			'userForm'				=> $this->userForm,
			'lang'					=> $lang
		]);
	}


	/**
	 * Функционалност "Смяна на забравена парола".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function forgotPasswordChangeAction() {

		$lang = $this->params()->fromRoute('lang');
		$token = $this->params()->fromRoute('token');

		if ($this->userService->getAuthService()->hasIdentity())
			$this->redirect()->toRoute('home', ['lang' => $lang]);

		if (!$userProceess = $this->userDM->getUserProcess($token, $this->cacheService->getUserProcessStatus()['CHANGE_PASSWORD']))
			return $this->redirect()->toRoute('user_process', ['process' => 'invalid-token', 'lang' => $lang]);

		$invalidAfter = AppService::getDateFromSQL($userProceess->getInvalidAfter(), true);

		if ($userProceess->getStatus() || AppService::compareDates($invalidAfter, date('d.m.Y H:i:s')) != -1)
			return $this->redirect()->toRoute('user_process', ['process' => 'invalid-token', 'lang' => $lang]);

		$request = $this->getRequest();

		if ($request->isPost()) {

			$validationGroup = ['userFieldset' => ['password', 'confirmPassword']];
			$this->userForm->setValidationGroup($validationGroup);

			$this->userForm->setData($request->getPost());

			if ($this->userForm->isValid()) {

				if ($userObj = $this->userDM->getUserList($totalCount, ['id' => $userProceess->getUserId()])) {

					$formData = $this->userForm->getData();

					$userAuthObj = $this->userDM->getUserAuthenticationById($userObj->getUserId(), self::USER_AUTH_PASSWORD)->current();
					$userAuthObj->setPasswordHash($this->userService::createPass($formData->getPassword()));

					if ($this->userDM->updateUserAuthenticationById($userAuthObj, $userProceess->getProcessId())) {
						//$this->userDM->updateTokenStatus($userProceess->getProcessId(), 'USED');
						return $this->redirect()->toRoute('user_process', ['process' => 'pswd', 'lang' => $lang, 'token' => $token]);
					}
					else
						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

					return $this->redirect()->toRoute('forgot_password_change', ['lang' => $lang, 'token' => $token]);
				}
			}
		}

		return new ViewModel([
			'userForm' => $this->userForm,
			'lang' => $lang,
			'token' => $token,
		]);
	}


	/**
	 * Функционалност "Приключване на процес към потребителски профил".
	 *
	 * Визуализира съобщение за успешни/неуспешни действия от потребител.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userProcessAction() {

		$process = $this->params()->fromRoute('process');

		$message = '';

		$success = true;

		switch ($process) {
			case 'pswd':
				$title = "EP_USR_00011_L";
				$message = 'EP_USR_00005_I';
			break;

			case 'invalid-token-pswd':
				$title = 'EP_USR_00011_L';
				$message = 'EP_USR_00006_E';
				$success = false;
			break;

			case 'invalid-token':
				$title = 'EP_USR_CONFIRM_REG_L';
				$message = 'EP_USR_00006_E';
				$success = false;
			break;

			case 'user-activated':
				$title = 'EP_USR_CONFIRM_REG_L';
				$message = 'EP_USR_00014_I';
				$success = false;
				break;

			case 'confirm-registration':
				$title = 'EP_USR_CONFIRM_REG_L';
				$message = 'EP_USR_00009_I';
			break;

			case 'cancel-registration':
				$title = 'EP_USR_CONFIRM_REG_L';
				$message = 'EP_USR_00011_I';
				$success = false;
			break;

		}

		return new ViewModel([
			'message'	=> $message,
			'success'	=> $success,
			'title'		=> $title
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

		$lang = $this->params()->fromRoute('lang');

		if (!$this->userService->getAuthService()->hasIdentity())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$this->userService->getAuthService()->clearIdentity();
		$this->userService->getOidcService()->logoutUser();
	}


	/**
	 * Функционалност "Смяна на парола в потребителски профил".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function changePasswordAction() {

		$userObj = $this->userService->getUser();

		$lang = $this->params()->fromRoute('lang');

		$userSession = $this->userService->getUser();

		if (!$userSession->getIsPublicUser())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$request = $this->getRequest();

		if ($request->isPost()) {

			$userAuthResult = $this->userDM->getUserAuthenticationById($userObj->getUserId(), self::USER_AUTH_PASSWORD);

			if ($userAuthResult->count()) {

				$userAuth = $userAuthResult->current();

				$oldPasswordValidaor = new \User\Validator\OldPasswordValidator([
					'userPasswordHash' => $userAuth->getPasswordHash(),
					'oldPassword' => $this->params()->fromPost('userFieldset')['oldPassword'],
				]);

				$oldPasswordValidatorChain = new ValidatorChain();
				$oldPasswordValidatorChain->addValidator($oldPasswordValidaor);

				$this->userForm->getInputFilter()->get('userFieldset')->get('oldPassword')->getValidatorChain()->attach($oldPasswordValidatorChain);

				$validationGroup = ['userFieldset' => ['password', 'confirmPassword', 'oldPassword']];
				$this->userForm->setValidationGroup($validationGroup);

				$this->userForm->setData($request->getPost());

				if ($this->userForm->isValid()) {

					$userAuth->setPasswordHash($this->userService::createPass($this->params()->fromPost('userFieldset')['password']));
					$userAuth->setUsername(null);

					if ($this->userDM->updateUserAuthenticationById($userAuth))
						$this->flashMessenger()->addSuccessMessage('EP_USR_00005_I');
					else
						$this->flashMessenger()->addSuccessMessage('GL_ERROR_L');

					return $this->redirect()->toRoute('change_password', ['lang' => $lang]);
				}
			}

		}

		return new ViewModel([
			'userForm' => $this->userForm,
			'lang' => $lang
		]);
	}


	/**
	 * Функционалност "Редакция на потребителски профил".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userProfileAction() {

		$lang = $this->params()->fromRoute('lang');

		$userSession = $this->userService->getUser();

		if (!$userSession->getIsPublicUser())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$totalCount = null;
		$userObj = $this->userDM->getUserList($totalCount, ['id' => $userSession->getUserId()]);

		$specialAccessList = $this->userDM->getUserSpecialAccessList($userObj->getUserId());

		$specialAccessArr = [];
		$specialIdArr = [];

		$isAllowedEditProfile = true;

		foreach ($specialAccessList as $specialAccess) {
			$specialAccessArr[$specialAccess->getRequestId()] = $specialAccess;

			if (self::USER_ACCESS_REQUEST_STATUS_LIST[$specialAccess->getAccessStatus()] != 'DISAPPROVED')
				$isAllowedEditProfile = false;
		}

		$documentArray = [];

		if (count($specialAccessArr)) {
			$idList = implode(',', array_keys($specialAccessArr));
			$documentArray = $this->userDM->getSpecialAccessDocumentList($idList);
		}

		$request = $this->getRequest();

		$fileArr = [];

		$specialAccessUserTypes = $this->userDM->getSpecialAccessUserTypes();
		$this->userForm->get('userFieldset')->get('specialAccessUserType')->setValueOptions($specialAccessUserTypes)->setAttribute('disabled', true);

		// Полетата за данни на потребител не се редактират, ако има поне една заявка за специален достъп, която не е в статус "Отхвърлена"
		if (!$isAllowedEditProfile) {
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

			$this->userForm->getInputFilter()->get('userFieldset')->remove('firstName');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('middleName');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('familyName');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('contactData');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('email');
		}

		if ($request->isPost()) {

			$fieldsetData = $this->params()->fromPost('userFieldset');

			$files = isset($fieldsetData['files']) ? $fieldsetData['files'] : [];

			foreach ($files as $file) {
				$dataInfo = json_decode($file);

				if (!is_object($dataInfo) || !property_exists($dataInfo , 'uuid'))
					throw new \Exception('UUID Error');

				$validator = new \Zend\Validator\Uuid();

				if (!$validator->isValid($dataInfo->uuid))
					throw new \Exception('Invalid UUID '.$dataInfo->uuid);

				$fileArr[$file] = ['value' => $file, 'label' => $file, 'attributes' => ['data-uuid' => $dataInfo->uuid]];
			}

			$this->userForm->get('userFieldset')->get('files')->setValueOptions($fileArr);

			// Полета, които не участват във формата
			$this->userForm->getInputFilter()->get('userFieldset')->remove('password');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('confirmPassword');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('oldPassword');
			$this->userForm->getInputFilter()->get('userFieldset')->remove('terms');

			// Полета, които участват при заявка за специален достъп
			$specialAccess = isset($fieldsetData['specialAccess']) && $fieldsetData['specialAccess'] ? true : false;

			if (!$specialAccess) {
				$this->userForm->getInputFilter()->get('userFieldset')->remove('organization');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('specialAccessUserType');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('files');
				$this->userForm->getInputFilter()->get('userFieldset')->remove('contactData');
			}

			$this->userForm->get('userFieldset')->get('email')->setValue($userObj->getEmail());

			$this->userForm->setData($request->getPost());

			if ($this->userForm->isValid()) {

				$postObj = $this->userForm->getData();

				if (!$isAllowedEditProfile) {
					$postObj->setSpecialAccessUserType($userObj->getSpecialAccessUserType());
					$postObj->setFirstName($userObj->getFirstName());
					$postObj->setMiddleName($userObj->getMiddleName());
					$postObj->setFamilyName($userObj->getFamilyName());
					$postObj->setContactData($userObj->getContactData());
					$postObj->setEmail($userObj->getEmail());
				}

				if ($this->userDM->updateUserById($userObj->getUserId(), $postObj)) {
					$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');
					return $this->redirect()->toRoute('user_profile', ['lang' => $lang]);
				}
				else {
					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
					return $this->redirect()->toRoute('user_profile', ['lang' => $lang]);
				}
			}
			else {
				$this->userForm->get('userFieldset')->get('cin')->setValue($userObj->getCin());
			}
		}
		else {
			$this->userForm->bind($userObj);
		}

		return new ViewModel([
			'userObj' => $userObj,
			'userForm' => $this->userForm,
			'lang' => $lang,
			'fileArr' => $fileArr,
			'specialAccessArr' => $specialAccessArr,
			'documentArray' => $documentArray,
			'specialAccessStatusList' => $this->cacheService->getSpecialAccessStatusList(),
			'config'	=> $this->getConfig()
		]);
	}


	/**
	 * Функционалност "Сваляне на файл към заявка за специален достъп".
	 *
	 * @return string Съдържание на файл.
	 */
	public function specialAccessDocumentAction() {

		$documentId = $this->params()->fromRoute('documentId');

		if ($documentId <= \Application\Module::APP_MAX_INT && $documentContent = $this->userDM->getSpecialAccessDocumentById($documentId)) {

			$documenData = $this->userDM->getSpecialAccessDocumentList(null, $documentId);

			$documenData = array_shift($documenData)[0];

			$userObj = $this->userService->getUser();

			if ($requestObj = $this->userDM->getUserSpecialAccessList($userObj->getUserId(), ['request_id_list' => $documenData->getRequestId()])->current()) {

				$response = new \Zend\Http\Response();
				$response->setContent($documentContent);
				$response->setStatusCode(200);

				$headers = new \Zend\Http\Headers();
				$headers->addHeaderLine('Cache-Control', 'no-cache private')
				->addHeaderLine('Content-Description', 'File Transfer')
				->addHeaderLine('Content-Type', $documenData->getContentType())
				->addHeaderLine('Content-Disposition', 'attachment; filename="' . $documenData->getName() . '"')
				->addHeaderLine('Content-Length', $documenData->getFileSize());

				$response->setHeaders($headers);
				return $response;
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
		return;
	}


	/**
	 * Извлича данни за валиден клиентски сертификат
	 *
	 * @return \User\Entity\CertEntity|string Данни за валиден клиентски сертификат или етикет на грешка.
	 */
	public function getValidClientCertificate() {

		// $_SERVER['CERT_FLAGS'] - Bit0 is set to 1 if the client certificate is present. Bit1 is set to 1 if the certification authority of the client certificate is invalid (that is, it is not in the list of recognized certification authorities on the server).If bit 1 of CERT_FLAGS is set to 1, indicating that the certificate is invalid, IIS version 4.0 and later will reject the certificate. Earlier versions of IIS will not reject the certificate.

		if (is_numeric($_SERVER['CERT_FLAGS']) && ($_SERVER['CERT_FLAGS'] & 1) == 1) {

			// binary 01 - валиден клиентски сертификат

			$certificateObj = new \User\Entity\CertEntity();

			$certificateObj->setSerialNumber($_SERVER['CERT_SERIALNUMBER']);
			$certificateObj->setIssuer($_SERVER['CERT_ISSUER']);
			$certificateObj->setSubject($_SERVER['CERT_SUBJECT']);
			$certificateObj->setContent(base64_decode($_SERVER['CERT_CONTENT']));
			$certificateObj->setCertHash(sha1($certificateObj->getContent()));

			$isActiveCert = $this->userDM->getUserAuthenticationById(null, null, null, $certificateObj->getCertHash());

			if ($isActiveCert->count() !== 0) // сертификатът е регистриран в профил на потребител
				return 'EP_USR_00010_E';

			$x509 = new \phpseclib\File\X509();
			$certData = $x509->loadX509($certificateObj->getContent());

			if ($certData === false) // сертификатът не е зареден успешно
				return 'EP_USR_00018_I';

			$certificateObj->setNotBefore(array_shift($certData['tbsCertificate']['validity']['notBefore']));
			$certificateObj->setNotAfter(array_shift($certData['tbsCertificate']['validity']['notAfter']));

			return $certificateObj;
		}

		/*
		Възможни случаи:
		- потребителя не е сложил клиентски сертификат
		- браузъра не е разпознал клиентски сертификат
		- в SSL настройките на сървъра е указано да се игнорират клиентските сертификати за текущия URL
		- невалиден CA за клиентския сертификат (СА не е в списъка с разпознаваеми CA на сървъра)
		 */

		return 'EP_USR_00018_I';
	}

	/**
	 * Функционалност "Управление на средства за автентикация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function userAuthListAction() {

		$lang = $this->params()->fromRoute('lang');

		if ($this->params()->fromQuery('addPic') == 'success') {
			$this->flashMessenger()->addSuccessMessage('EP_USR_SUCC_PIK_NRA_I');
			return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang], ['query' => ['authType' => 'pic']]);
		}

		$config = $this->getConfig();

		// PIK allowed
		$isNraAuthenticationEnabled = $config['EP_NRA_AUTH_ENABLED'] ? true : false;
		$isCertAuthenticationEnabled = $config['EP_CERT_AUTH_ENABLED'] ? true : false;

		if (!$isNraAuthenticationEnabled && $this->params()->fromQuery('authType') == 'pic')
			return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang]);


		$arrContextOptions=["ssl"=>array("verify_peer"=>false, "verify_peer_name"=>false)];

		$wellKnownConfig = file_get_contents($config['GL_IDSRV_URL'].'.well-known/openid-configuration', false, stream_context_create($arrContextOptions));
		$wellKnownConfig = json_decode($wellKnownConfig);

		$returnUrl = $this->url()->fromRoute(
				'user_auth_list',
				['lang' => $lang],
				[
					'force_canonical' => true,
					'query' => ['addPic' => 'success']
				]);

		$returnUrl = urlencode($returnUrl);

		$picRegisterUrl = $wellKnownConfig->register_authentication_endpoint.'?scheme=nra&returnUrl='.$returnUrl;


		$userObj = $this->userService->getUser();

		if (!$userObj->getIsPublicUser())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$authList = $this->userDM->getUserAuthInfoList($userObj->getUserId());

		$picObj = $this->userDM->getUserAuthenticationById($userObj->getUserId(), self::USER_AUTH_PIC)->current();

		$selectedAuthType = $this->params()->fromQuery('authType', 'cert');

		return new ViewModel([
			'authList'						=> $authList,
			'picObj' 						=> $picObj,
			'selectedAuthType'				=> $selectedAuthType,
			'picRegisterUrl'				=> $picRegisterUrl,
			'isNraAuthenticationEnabled'	=> $isNraAuthenticationEnabled,
			'isCertAuthenticationEnabled'	=> $isCertAuthenticationEnabled
		]);
	}

	/**
	 * Функционалност "Добавяне на средства за автентикация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addUserAuthAction() {

		$config = $this->getConfig();

		if (!$config['EP_CERT_AUTH_ENABLED'])
			return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang]);


		$userObj = $this->userService->getUser();

		$lang = $this->params()->fromRoute('lang');

		if (!$userObj->getIsPublicUser())
			return $this->redirect()->toRoute('home', ['lang' => $lang]);

		$request = $this->getRequest();

		$certificateObj = $this->getValidClientCertificate();

		$errorMessage = null;

		// Валиден сертификат
		if ($certificateObj instanceof CertEntity) {

			if ($request->isPost()) {

				if ($this->userDM->addUserCertAuth($userObj->getUserId(), $certificateObj))
					$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');
				else
					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

				return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang]);
			}
		}

		// Грешка с данните от сертификата
		else {
			$errorMessage = $certificateObj;
		}

		return new ViewModel([
			'certificateObj'	=> $certificateObj,
			'errorMessage'		=> $errorMessage
		]);
	}

	/**
	 * Функционалност "Изтриване на средства за автентикация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function deleteUserAuthAction() {

		$userObj = $this->userService->getUser();
		$authId	= $this->params()->fromRoute('authId');

		$lang = $this->params()->fromRoute('lang');

		if ($authId <= \Application\Module::APP_MAX_INT && $authObj = $this->userDM->getUserAuthenticationById($userObj->getUserId(), null, $authId)->current()) {

			$config = $this->getConfig();

			if ($authObj->getAuthenticationType() == SELF::USER_AUTH_CERTIFICATE && !$config['EP_CERT_AUTH_ENABLED'])
				return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang]);

			if ($authObj->getAuthenticationType() == SELF::USER_AUTH_PIC && !$config['EP_NRA_AUTH_ENABLED'])
				return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang]);

			if ($this->userDM->deleteAuthById($authObj))
				$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');
			else
				$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

			return $this->redirect()->toRoute('user_auth_list', ['lang' => $lang], ['query' => $this->params()->fromQuery()]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
		return;
	}


	/**
	 * Функционалност "Списък с моите заявления".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function applicationListAction() {

		$config = $this->getConfig();

		$lang = $this->params()->fromRoute('lang');

		$page = $this->params()->fromQuery('page', 1);

		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$registerList = array_flip($this->cacheService->getRegisterList());

		$selectedTab = !empty($this->params()->fromQuery('section')) ? $this->params()->fromQuery('section') : 'draft';

		$selectedRegisterId = !empty(array_search(strtoupper($selectedTab), $registerList)) ? array_search(strtoupper($selectedTab), $registerList) : 0;

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'cin'			=> $userObj->getCin(),
			'lang'			=> $lang
		];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList') || $request->getPost('changeSectionTab'))
				return $result = $this->getApplicationList();
		}

		// таб регистър
		if (!empty($selectedRegisterId)) {

			$includedAppTypes = [];

			if ($selectedRegisterId == 2)
				$includedAppTypes = $config['allowedApplicationsPRAppTypes'];

			$applicationTypeArr = [];

			$applicationTypeDropDownArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultById' => 1, 'getDropDownResult' => 1], $includedAppTypes);
			$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultById' => 1, 'getDropDownResult' => 1]);

			$applicationTypeList = !empty($applicationTypeArr['resultList']) ? $applicationTypeArr['resultList'] : [];

			$applicationTypeDropDownList = !empty($applicationTypeDropDownArr['resultDropDown']) ? $applicationTypeDropDownArr['resultDropDown'] : [];

			$searchForm = new \User\Form\ApplicationForm();

			$searchForm->get('section')->setValue($selectedTab);

			$searchForm->get('applicationTypeId')->setValueOptions(["0" => 'GL_CHOICE_ALL_L'] + $applicationTypeDropDownList);

			$params['registerId'] = $selectedRegisterId;

			$searchParams = [];
			
			// параметри за търсене по подразбиране
			$searchParams = [
				'dateFrom'	=> (new \DateTime())->sub(new \DateInterval('P1M'))->format('d.m.Y'),
				'dateTo' 	=> (new \DateTime())->format('d.m.Y')
			];

			// параметри за търсене
			if (!empty($this->params()->fromQuery('search', null)))
				$searchParams = $this->params()->fromQuery();

			$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
			$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

			$searchForm->setData($searchParams);

			if ($searchForm->isValid()) {

				$dataParams = $searchForm->getData();

				if (!empty($dataParams['search']))
					$applicationList = $this->restService->userApplicationList($totalCount, $params + $dataParams);
			}

			return new ViewModel([
				'searchForm'			=> $searchForm,
				'applicationList'		=> !empty($applicationList) ?  $applicationList : [],
				'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
				'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
				'applicationTypeList' 	=> $applicationTypeList,
				'registerList'			=> $registerList,
				'selectedTab'			=> $selectedTab,
				'params'				=> $this->params()->fromQuery()
			]);
		}

		// таб чернова
		else {

			$applicationList = $this->restService->userApplicationDraftList($totalCount, $params);

			$applicationTypeList = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['getPlainResultById' => 1]);

			return new ViewModel([
				'applicationList' 		=> $applicationList,
				'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
				'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
				'applicationTypeList' 	=> $applicationTypeList,
				'registerList' 			=> $registerList,
				'selectedTab'			=> $selectedTab,
				'params'				=> $this->params()->fromQuery()
			]);
		}
	}


	/**
	 * Извлича списък с моите заявления при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getApplicationList() {

		$config = $this->getConfig();

		$lang = $this->params()->fromRoute('lang');

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$changeSectionTab = !empty($this->params()->fromPost('changeSectionTab')) ? $this->params()->fromPost('changeSectionTab') : 0;

		$registerList = array_flip($this->cacheService->getRegisterList());

		$selectedTab = (!empty($changeSectionTab)) ? $this->params()->fromPost('section') : (!empty($this->params()->fromQuery('section')) ? $this->params()->fromQuery('section') : 'draft');

		$selectedRegisterId = !empty(array_search(strtoupper($selectedTab), $registerList)) ? array_search(strtoupper($selectedTab), $registerList) : 0;

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount,
			'cin'		=> $userObj->getCin(),
			'lang' 		=> $lang
		];

		// таб регистър
		if (!empty($selectedRegisterId)) {

			$includedAppTypes = [];

			if ($selectedRegisterId == 2)
				$includedAppTypes = $config['allowedApplicationsPRAppTypes'];

			$applicationTypeArr = [];
			$applicationTypeDropDownArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultById' => 1, 'getDropDownResult' => 1], $includedAppTypes);
			$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultById' => 1, 'getDropDownResult' => 1]);

			$applicationTypeList = !empty($applicationTypeArr['resultList']) ? $applicationTypeArr['resultList'] : [];

			$applicationTypeDropDownList = !empty($applicationTypeDropDownArr['resultDropDown']) ? $applicationTypeDropDownArr['resultDropDown'] : [];

			$search = $this->params()->fromQuery('search', null);

			$searchParams = [];
			
			// параметри за търсене по подразбиране
			$searchParams = [
				'dateFrom'	=> (new \DateTime())->sub(new \DateInterval('P1M'))->format('d.m.Y'),
				'dateTo' 	=> (new \DateTime())->format('d.m.Y')
			];

			// параметри за търсене
			if (!empty($search))
				$searchParams = $this->params()->fromQuery();

			$params['registerId'] = $selectedRegisterId;

			// промяна на таб регистър
			if (!empty($changeSectionTab)) {

				$searchForm = new \User\Form\ApplicationForm();

				$searchForm->get('section')->setValue($selectedTab);

				$searchForm->get('applicationTypeId')->setValueOptions(["0" => 'GL_CHOICE_ALL_L'] + $applicationTypeDropDownList);

				$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
				$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

				$searchForm->setData($searchParams);

				if ($searchForm->isValid()) {

					$dataParams = $searchForm->getData();

					if (!empty($dataParams['search']))
						$applicationList = $this->restService->userApplicationList($totalCount, $params + $dataParams);
				}

				$this->layout('layout/ajax');

				$result = new ViewModel([
					'searchForm'			=> $searchForm,
					'applicationList'		=> !empty($applicationList) ?  $applicationList : [],
					'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
					'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
					'applicationTypeList' 	=> $applicationTypeList,
					'registerList'			=> $registerList,
					'selectedTab'			=> $selectedTab,
					'params'				=> $this->params()->fromQuery()
				]);

				$result->setTemplate('user/user/application-list-section.phtml');
			}

			// странициране
			else {

				$applicationList = $this->restService->userApplicationList($totalCount, $params + $searchParams);

				$this->layout('layout/ajax');

				$result = new ViewModel([
					'applicationList' 		=> $applicationList,
					'registerList' 			=> $registerList,
					'applicationTypeList' 	=> $applicationTypeList,
					'selectedTab'			=> $selectedTab
				]);

				$result->setTemplate('user/user/application-list-partial.phtml');
			}
		}

		// таб чернова
		else {

			$applicationList = $this->restService->userApplicationDraftList($totalCount, $params);

			$applicationTypeList = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['getPlainResultById' => 1]);

			$this->layout('layout/ajax');

			// промяна на таб чернова
			if (!empty($changeSectionTab)) {

				$result = new ViewModel([
					'applicationList' 		=> $applicationList,
					'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
					'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
					'applicationTypeList' 	=> $applicationTypeList,
					'registerList' 			=> $registerList,
					'selectedTab'			=> $selectedTab,
					'params'				=> $this->params()->fromQuery()
				]);

				$result->setTemplate('user/user/application-list-section.phtml');
			}

			//странициране
			else {

				$result = new ViewModel(array(
					'applicationList' 		=> $applicationList,
					'registerList' 			=> $registerList,
					'applicationTypeList' 	=> $applicationTypeList,
					'selectedTab'			=> $selectedTab
				));

				$result->setTemplate('user/user/application-list-partial.phtml');
			}
		}

		return $result;
	}

	/**
	 * Функционалност "Aбониране за email оповестяване за настъпили събития в регистрите на АВ".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function emailSubscriptionAction() {

		$request = $this->getRequest();

		$userData = $this->userService->getUser();
		$userObj = $this->userDM->getUserList($totalCountTmp, ['id' => $userData->getUserId()]);

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $this->getEmailSubscriptionList();
		}

		$emailSubscriptionForm = new EmailSubscriptionForm();

		$registerList = array_flip($this->cacheService->getRegisterList());

		$registerArr = [];

		foreach ($registerList as $id => $register)
			$registerArr[$id] = 'GL_'.$register.'_REG_NAME_L'.($register == 'CR' ? '_SHORT_L' : '');

		$emailSubscriptionForm->get('register')->setValueOptions(["" => 'GL_CHOICE_L'] + $registerArr);

		$typeArr = [
			'CR' => [3 => 'GL_COMPANY_ID_L'],
			'PR' => [1 => 'EP_GL_IDENTIFICATOR_L']
		];

		if ($registerId = $this->params()->fromPost('register'))
			$emailSubscriptionForm->get('type')->setValueOptions(["" => 'GL_CHOICE_L'] + $typeArr[$registerList[$registerId]]);
		else
			$emailSubscriptionForm->get('type')->setValueOptions(["" => 'GL_CHOICE_L']);


		$isSetFirstAndLastName = ($userObj->getFirstName() &&  $userObj->getFamilyName()) ? true : false;

		if ($request->isPost()) {

			$emailSubscriptionForm->setData($request->getPost());

			if ($emailSubscriptionForm->isValid()) {

				$value = $emailSubscriptionForm->get('value')->getValue();

				$valueArr = array_filter(explode(',', $value));
				$valueArr = array_map('trim', $valueArr);

				$type = $emailSubscriptionForm->get('type')->getValue();

				$error = false;

				if (!$this->isValidSubscription($registerId, $valueArr)) {

					if ($registerList[$registerId] == 'CR')
						$emailSubscriptionForm->get('value')->setMessages(['EP_MSG_INVALID_BULSTAT_E']);

					else
						$emailSubscriptionForm->get('value')->setMessages(['EP_GL_INVALID_IDENTIFICATOR_L']);

					$error = true;
				}


				if ($registerList[$registerId] == 'PR' && !$isSetFirstAndLastName) {
					$error = true;
					$this->flashMessenger()->addErrorMessage('EP_SUBSCRIPTION_PR_NOT_NAME_E');
				}

				$params = [
					'cp' 					=> $page,
					'row_count' 			=> $rowCount,
					'total_count'			=> true,
					'getSubscriptionCount'	=> true
				];


				if (!$error) {

					$userObj = $this->userService->getUser();
					$postData = $emailSubscriptionForm->getData();
					$postData->setValue($valueArr);
					$postData->setUserCIN($userObj->getCin());

					$restParams = [
						'UserCIN' 	=> (int)$userObj->getCin(),
						'Register' 	=> (int)$postData->getRegister(),
						'Type'		=> (int)$postData->getType(),
						'Values'	=> $postData->getValue()
					];

					if ($result = $this->restService->addSubscription($restParams)) {

						if (is_array($result) && isset($result['status']) && $result['status'] = 'error') {
							$this->flashMessenger()->addErrorMessage($result['message']);
							$lang = $this->params()->fromRoute('lang');
							return $this->redirect()->toRoute('email_subscription', ['lang' => $lang]);
						}

						$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
						$lang = $this->params()->fromRoute('lang');
						return $this->redirect()->toRoute('email_subscription', ['lang' => $lang]);
					}

					else {
						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
						$lang = $this->params()->fromRoute('lang');
						return $this->redirect()->toRoute('email_subscription', ['lang' => $lang]);
					}
				}
			}
		}

		$params = [
			'UserSubscriptionIDs'	=> null,
			'UserCIN' 				=> $userObj->getCin(),
			'Register' 				=> null,
			'Type' 					=> null,
			'Values' 				=> null,
			'Page' 					=> $page,
			'PageSize' 				=> $rowCount,
			'Count'					=> true
		];

		$result = $this->restService->getEmailSubscriptionList($params);

		$totalCount = empty($result['totalCount']) ? 0 : $result['totalCount'];

		return new ViewModel([
			'emailSubscriptionForm' => $emailSubscriptionForm,
			'subscriptionList'		=> empty($result['data']) ? [] : $result['data'],
			'totalCount'			=> empty($totalCount) ? 0 : $totalCount,
			'totalPages' 			=> ceil($totalCount/$rowCount),
			'registerArr'			=> $registerArr,
			'registerCodeList'		=> $registerList,
			'typeArr'				=> $typeArr,
			'isSetFirstAndLastName'	=> $isSetFirstAndLastName
		]);
	}

	/**
	 * Извлича списък с email оповестяване за настъпили събития.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getEmailSubscriptionList() {

		$userObj = $this->userService->getUser();

		$config = $this->getConfig();

		$page = $this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'UserSubscriptionIDs'	=> null,
			'UserCIN' 				=> $userObj->getCin(),
			'Register' 				=> null,
			'Type' 					=> null,
			'Values' 				=> null,
			'Page' 					=> $page,
			'PageSize' 				=> $rowCount,
			'Count'					=> true,
		];

		$subscriptionDataList = $this->restService->getEmailSubscriptionList($params);

		$registerList = array_flip($this->cacheService->getRegisterList());

		$registerArr = [];

		foreach ($registerList as $id => $register)
			$registerArr[$id] = 'GL_'.$register.'_REG_NAME_L'.($register == 'CR' ? '_SHORT_L' : '');

		$typeArr = [
			'CR' => [3 => 'GL_COMPANY_ID_L'],
			'PR' => [1 => 'EP_GL_IDENTIFICATOR_L']
		];

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'subscriptionList'	=> empty($subscriptionDataList['data']) ? [] : $subscriptionDataList['data'],
			'registerArr'		=> $registerArr,
			'typeArr'			=> $typeArr,
			'registerCodeList'	=> $registerList
		]);

		$result->setTemplate('user/user/email-subscription-partial.phtml');

		return $result;
	}

	/**
	 * Изтрива email оповестяване за настъпили събития.
	 *
	 * @return Response HTTP отговор.
	 */
	public function deleteEmailSubscriptionAction() {

		$type = $this->params()->fromRoute('type');

		$lang = $this->params()->fromRoute('lang');

		switch ($type) {

			case 'bulk':
				$idList = $this->params()->fromPost('deleteSubscribe');

				$idList = array_map('strval', $idList);

				if (empty($idList))
					return $this->redirect()->toRoute('email_subscription', ['lang' => $lang]);

				break;

			case 'single':
				$id = $this->params()->fromRoute('id');
				$idList = [strval($id)];
				break;
		}

		$userObj = $this->userService->getUser();

		$params = [
			'UserCIN'				=> (int)$userObj->getCin(),
			'UserSubscriptionIDs' 	=> $idList
		];

		if ($this->restService->deleteSubscription($params))
			$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');

		return $this->redirect()->toRoute('email_subscription', ['lang' => $lang]);
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

	/**
	 * URL адрес за изчистване на данни за логнат потребител след изход от друга система.
	 */
	public function frontChannelLogoutAction() {

		$config = $this->getConfig();

		$idsrvUri = $config['GL_IDSRV_URL'];

		if (!$this->params()->fromQuery('sid') || $this->params()->fromQuery('iss') != $idsrvUri)
			return false;

		$cookieDomainName = $config['GL_COMMON_COOKIE_DOMAIN'];

		setcookie('AT', '', time() - 3600, '/', $cookieDomainName, true, true);
		setcookie('RT', '', time() - 3600, '/', $cookieDomainName, true, true);
		setcookie('UD', '', time() - 3600, '/', $cookieDomainName, true, true);
		setcookie('EPZEU_ISLOGGED', '', time() - 3600, '/', $cookieDomainName, true, true);
		setcookie('usr_active_timestamp', '', time() - 3600, '/', $cookieDomainName, true, true);

		$this->layout('layout/ajax');

		return '';
	}


	/**
	 * Проверява за валидна стойност при абониране за email оповестяване.
	 *
	 * @param int $registerId
	 * @param array $valueList
	 * @return boolean
	 */
	public function isValidSubscription($registerId, $valueList) {

		$registerList = array_flip($this->cacheService->getRegisterList());

		$filterBulstatValidator = new BulstatValidator();
		$filterPersonIdValidator = new PersonIdValidator();
		$filterEgnValidator = new EgnValidator();

		if ($registerList[$registerId] == 'CR') {

			foreach ($valueList as $value) {
				if (!$filterBulstatValidator->isValid($value))
					return false;
			}
		}

		else {

			foreach ($valueList as $value) {
				if (!$filterBulstatValidator->isValid($value) && !$filterPersonIdValidator->isValid($value) && !$filterEgnValidator->isValid($value)) {
					return false;
				}
			}
		}

		return true;

	}
}