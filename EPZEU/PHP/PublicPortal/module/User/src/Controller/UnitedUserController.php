<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use User\Form\UnitedUserForm;
use User\Entity\UnitedUserEntity;


/**
 * Контролер реализиращ функционалности за работа с потребители.
 *
 * @package User
 * @subpackage Controller
 */
class UnitedUserController extends AbstractActionController {

	CONST MIGRATION_STATUS = [
		1 => 'GL_PROCESSED_L',
		2 => 'GL_PROCESSED_L',
		3 => 'GL_PROCESSED_L',
		4 => 'GL_COMPLETED_L',
	];


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
	 * Услуга за работа с RateLimit.
	 *
	 * @var \Application\Service\RateLimitService
	 */
	protected $rateLimitService;

	/**
	 * Конструктор.
	 *
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \Application\Service\restService $restService Услуга за работа с REST уеб услуги.
	 */
	public function __construct($userService, $cacheService, $restService, $rateLimitService) {
		$this->userService = $userService;
		$this->cacheService = $cacheService;
		$this->restService = $restService;
		$this->rateLimitService = $rateLimitService;
	}

	/**
	 * Функционалност "Списък с обединени потребителски профили"
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function unitedProfileListAction() {

		$userObj = $this->userService->getUser();

		$migrationProfileList = $this->restService->userMigrationProfileList([
			'UserCIN'	=> $userObj->getCin(),
			'Register'	=> 2
		]);

		$registerList = array_flip($this->cacheService::getRegisterList());

		$config = $this->getConfig();

		$startDate = $config['EP_USR_PROFILE_MIGRATION_STARTDATE'];
		$endDate = $config['EP_USR_PROFILE_MIGRATION_DEADLINE'];

		$isStartDateOccurred 	= time() >= strtotime($startDate);
		$endDate 				= time() >= strtotime($endDate);

		return new ViewModel([
			'migrantatProfileList'	=> $migrationProfileList,
			'registerList'			=> $registerList,
			'isMigrantationAllowed'	=> $this->isMigrationAllowed(),
			'isStartDateOccurred'	=> $isStartDateOccurred,
			'startDate'				=> $startDate,
			'endDate'				=> $endDate
		]);
	}


	/**
	 * Функционалност "Извеждане на регистрационни данни от потребителски профил"
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function uniteUserProfileAction() {

		$lang = $this->params()->fromRoute('lang');

		if (!$this->isMigrationAllowed())
			return $this->redirect()->toRoute('united_profile_list', ['lang' => $lang]);

		$loginForm = new UnitedUserForm();

		$request = $this->getRequest();

		$errorMessage = null;

		$isRateLimitReached = false;

		$loginForm->get('register')->setValueOptions([2 => 'GL_PR_REG_NAME_L']);

		$userObj = $this->userService->getUser();

		if ($request->isPost()) {

			$loginForm->setData($request->getPost());

			if ($loginForm->isValid()) {

				$formData = $loginForm->getData();

				$result = $this->restService->userMigrationGetUser([
					'Username' => $formData->getUsername(),
					'Password' => $formData->getPassword(),
					'Register' => $formData->getRegister(),
				]);

				if (is_array($result) && array_key_exists('error', $result)) {

					if ($result['error'] == 'EP_USRM_00001_E') {
						$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_USR_PROFILE_MIGRATION_UNSUCCESSFUL_LOGIN_LIMIT', 'CIN:'.$userObj->getCin());

						if ($isRateLimitReached)
							return new ViewModel(['isRateLimitReached' => $isRateLimitReached]);
					}

					$errorMessage = $result['error'];
				}

				if (!$errorMessage) {

					$userData = [
						'username'		=> $formData->getUsername(),
						'password'		=> $formData->getPassword(),
						'registerId'	=> $formData->getRegister(),
					];

					$userDataString = serialize($userData);

					$encryptUserDataString = $this->encryptDecrypt('encrypt', $userDataString);

					$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_USR_PROFILE_MIGRATION_SUCCESSFUL_LOGIN_LIMIT', 'CIN:'.$userObj->getCin());

					if ($isRateLimitReached)
						return new ViewModel(['isRateLimitReached' => $isRateLimitReached]);

					return $this->redirect()->toRoute('confirm_merge_profile', ['lang' => $lang, 'userData' => $encryptUserDataString]);
				}
			}
		}

		return new ViewModel([
			'loginForm' 		=> $loginForm,
			'errorMessage'		=> $errorMessage,
			'isRateLimitReached' => $isRateLimitReached
		]);
	}


	/**
	 * Функционалност "Запис в обект Процес по миграция на потребител"
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function confirmMergeProfileAction() {

		$lang = $this->params()->fromRoute('lang');

		if (!$this->isMigrationAllowed())
			return $this->redirect()->toRoute('united_profile_list', ['lang' => $lang]);

		$encryptData = $this->params()->fromRoute('userData');

		$decryptData = $this->encryptDecrypt('decrypt', $encryptData);

		if (!$decryptData)
			return $this->redirect()->toRoute('united_profile_list', ['lang' => $lang]);

		$userData = unserialize($decryptData);

		$userObj = new UnitedUserEntity();

		$userObj->setPassword($userData['password']);
		$userObj->setUsername($userData['username']);

		$errorMessage = '';

		$migarationObject = $this->restService->userMigrationGetUser([
			'Username' => $userData['username'],
			'Password' => $userData['password'],
			'Register' => $userData['registerId'],
		]);

		if (!$migarationObject instanceof UnitedUserEntity && is_array($migarationObject))
			$errorMessage = $migarationObject['error'];

		$request = $this->getRequest();

		if ($request->isPost() && !$errorMessage) {

			$params = [
				'MigrantUsername' 	=> $userData['username'],
				'MigrantPassword' 	=> $userData['password'],
				'Register' 			=> $userData['registerId']
			];

			if ($result = $this->restService->userMigrationAdd($params)) {

				if (is_array($result) && array_key_exists('error', $result))
					$errorMessage = $result['error'];
				else {
					$this->flashMessenger()->addSuccessMessage('EP_USR_00021_I');
					return $this->redirect()->toRoute('united_profile_list', ['lang' => $lang]);
				}
			}
			else {
				$errorMessage = 'GL_ERROR_L';
			}
		}

		$registerList = $this->cacheService::getRegisterList();
		$registerCode = array_search($userData['registerId'],$registerList);
		$registerLabel = 'GL_'.$registerCode.'_REG_NAME_L';

		return new ViewModel([
			'migarationObject' 	=> $migarationObject,
			'encryptData'		=> $encryptData,
			'registerLabel'		=> $registerLabel,
			'errorMessage'		=> $errorMessage
		]);
	}


	/**
	 * Криптиране/декриптиране на стринг.
	 *
	 * @param string $action
	 * @param string $string
	 * @return string
	 */
	function encryptDecrypt($action, $string) {

		$output = '';

		$config = $this->getConfig();

		$encryptMethod = "AES-256-CBC";

		$key = hash('sha256', $config['api_key']);

		$user = $this->userService->getUser();

		$iv = substr(md5($user->getCin()), 0, 16);

		if( $action == 'encrypt' ) {
			$output = openssl_encrypt($string, $encryptMethod, $key, 0, $iv);
			$output = base64_encode($output);
		}
		else if( $action == 'decrypt' ){
			$output = openssl_decrypt(base64_decode($string), $encryptMethod, $key, 0, $iv);
		}

		return $output;
	}

	/**
	 * Проверява за настъпила крайна, до която е позволено да се мигрират профили.
	 * @return bool
	 */
	function isMigrationAllowed() {

		$config = $this->getConfig();

		$deadline = $config['EP_USR_PROFILE_MIGRATION_DEADLINE'];
		$startDate = $config['EP_USR_PROFILE_MIGRATION_STARTDATE'];

		if (strtotime($deadline) >= time() && time() >= strtotime($startDate))
			return true;

		return false;

	}
}