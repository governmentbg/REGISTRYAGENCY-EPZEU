<?php
/**
 * UserService class file
 *
 * @package User
 * @subpackage Service
 */

namespace User\Service;

use User\Entity\UserEntity;
use Application;
use Application\Service\AppService;

class UserService {

	/**
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;

	/**
	 *
	 * @var string
	 */
	protected $route;

	/**
	 * Услуга за работа с OpenId Connect.
	 *
	 * @var \Application\Service\OidcService
	 * */
	protected $oidcService;

	/**
	 *
	 * @var \Zend\Authentication\AuthenticationService
	 */
	protected $authService;

	/**
	 *
	 * @var array
	 */
	protected $config;


	protected $router;

	/**
	 *
	 */
	public $acl = null;


	/**
	 *
	 * @param PostMapperInterface $postMapper
	 */
	public function __construct($userDM, $route, $oidcService, $authService, $config, $router, $cookieDomainName) {

		$this->userDM = $userDM;

		$this->route = $route;

		$this->oidcService = $oidcService;

		$this->authService = $authService;

		$this->config = $config;

		$this->router = $router;

		$this->cookieDomainName = $cookieDomainName;

		$this->setAuthUser();
	}


	/**
	 * Записва обект за логнат потребител в storage на AuthenticationService.
	 */
	private function setAuthUser() {

		$tokenPayload = $this->oidcService->getAccessTokenPayload();

		if (empty($tokenPayload))
			return;

		if (isset($_COOKIE['UD'])) {
			$encryptData = $_COOKIE['UD'];

			$userObj = unserialize(AppService::decrypt($encryptData, $this->config['config']['api_key'], $this->config['config']['api_iv']));

			if ($userObj = unserialize(AppService::decrypt($encryptData, $this->config['config']['api_key'], $this->config['config']['api_iv'])))
				return $this->authService->getStorage()->write($userObj);
		}

		$userData = $this->userDM->getUserList($totalCount, ['cp' => 1, 'row_count' => 1, 'cin' => $tokenPayload->cin], false);

		if ($userData) {

			$userObj = new UserEntity();

			if (empty($tokenPayload->role))
				$userObj->setPermissionList([]);
			else
				$userObj->setPermissionList(is_array($tokenPayload->role) ? $tokenPayload->role : array($tokenPayload->role));

			$userObj->setCin($tokenPayload->cin);
			$userObj->setFirstName(empty($tokenPayload->given_name) ? '' : $tokenPayload->given_name);
			$userObj->setFamilyName(empty($tokenPayload->family_name) ? '' : $tokenPayload->family_name);
			$userObj->setIsIdentifiableUser(empty($tokenPayload->user_identifiable) ? false : true);

			$userObj->setUserId($userData->getUserId());
			$userObj->setEmail($userData->getEmail());
			$userObj->setIsPublicUser($userData->getUsername() ? false : true);

			$cryptData = AppService::encrypt(serialize($userObj), $this->config['config']['api_key'], $this->config['config']['api_iv']);

			if (strlen($cryptData) < 4096)
				setcookie('UD', $cryptData, null, '/', $this->cookieDomainName, true, true);

			$this->authService->getStorage()->write($userObj);
		}
	}


	/**
	 * Проверява за право на достъп
	 */
	public function checkPermission() {
		$route = $this->route->getMatchedRouteName();
		return $this->isAllowed($route);
	}

	/**
	 * Проверява дали потребителят има дадена роля
	 *
	 * @param string $role
	 */
	public function isRoleExists($role) {

		if ($user = $this->getUser()) {
			if (is_array($user->getPermissionList()) && in_array($role, $user->getPermissionList()))
				return true;
		}

		return false;
	}

	/**
	 * Проверява дали потребителят има административни роли
	 *
	 * @return bool
	 */
	public function hasPreviewRole() {

		$previewRoles = [
			'EP_ADM_CMS',
			'EP_ADM_NEWS',
			'EP_PREVIEW_CMS'
		];

		if ($user = $this->getUser()) {

			if (is_array($user->getPermissionList())) {

				if (array_intersect($user->getPermissionList(), $previewRoles))
					return true;

				return false;
			}
		}

		return false;
	}


	/**
	 * Филтър за достъп на потребители до функционалностите на системата
	 *
	 * @return bool
	 */
	public function isAllowed($routeName) {

		$permissionArray = [];

		foreach ($this->config['access_filter'] as $accessFilter) {

			foreach ($accessFilter as $key => $routes) {

				if (array_key_exists($key, $permissionArray)) {

					if ($key == 'special') {

						$permissonKey = key($routes);

						foreach ($routes as $permission => $permissionList) {
							if (isset($permissionArray['special'][$permission]))
								$permissionArray['special'][$permission] = array_merge($permissionArray['special'][$permission], $permissionList);
							else
								$permissionArray['special'][$permission] = $permissionList;
						}
					}
					else {
						$permissionArray[$key] = array_merge($permissionArray[$key], $routes);
					}
				}
				else
					$permissionArray[$key] = $routes;
			}
		}

		foreach ($permissionArray as $key => $permissionGroup) {

			switch ($key) {
				case '*':
					if (in_array($routeName, $permissionGroup))
						return true;
					break;

				case '@':
					if ($this->authService->hasIdentity() && in_array($routeName, $permissionGroup)) {
						return true;
					}
					break;

				case 'special':

					if ($userObj = $this->getUser()) {

						foreach ($userObj->getPermissionList() as $key => $permission) {
							if (isset($permissionGroup[$permission]) && in_array($routeName, $permissionGroup[$permission]))
								return true;
						}
					}

				default:
					return false;
					break;
			}
		}

		return false;

	}


	/**
	 * Връща инстанция на \Application\Service\OidcService
	 *
	 * @return object
	 */
	public function getOidcService() {
		return $this->oidcService;
	}


	/**
	 * Връща инстанция на Zend\Authentication\AuthenticationService
	 *
	 * @return object
	 */
	public function getAuthService() {
		return $this->authService;
	}


	/**
	 * Взима данни за логнат потребител
	 *
	 * @return \User\Entity\UserEntity
	 */
	public function getUser() {
		return $this->authService->getIdentity();
	}

	/**
	 * Генерира хеш на парола.
	 *
	 * @param string $rowPass Парола на потребител.
	 * @return string Хеш на парола.
	 */
	public static function createPass($rowPass) {
		$options = ['cost' => 12];
		return password_hash($rowPass, PASSWORD_BCRYPT, $options);
	}

	/**
	 * Взима информация за потребител
	 *
	 * @param \User\Entity\UserEntity $userObj
	 * @return string
	 */
	public static function getUserInfoString(\User\Entity\UserEntity $userObj) {

		$userInfo = $userObj->getEmail();

		if ($userObj->getFirstName() || $userObj->getMiddleName() || $userObj->getFamilyName())
			$userInfo .= ' '.$userObj->getFirstName().' '.$userObj->getMiddleName().' '.$userObj->getFamilyName();

		if ($userObj->getOrganization())
			$userInfo .= '; '.$userObj->getOrganization();

		return $userInfo;
	}

	/**
	 * Проверява дали потребителят вече е автентикиран в някоя от системите.
	 *
	 * @return boolean
	 */
	public function isUserLogged() {

		$routeName = $this->route->getMatchedRouteName();

		if ($routeName == 'login')
			return false;

		$isLoggedCookie = isset($_COOKIE['EPZEU_ISLOGGED']) ? ($_COOKIE['EPZEU_ISLOGGED'] == 'True' ? true : false) : false;

		$user = $this->getUser();

		if ($isLoggedCookie && !$user) {

			$params = $this->route->getParams();

			$redirectUrlParams = base64_encode(serialize(['routeName' => $routeName, 'params' => $params]));

			setcookie('redirectAfterlogin', $redirectUrlParams, null, '/', '', true, true);
			return $this->oidcService->loginUser(null);
		}
		elseif ($isLoggedCookie && $user)
			setcookie('redirectAfterlogin', '', time() - 3600, '/');

		return false;
	}


	/**
	 * Проверява дали потребителят е влязъл в системата
	 *
	 * @param object $request
	 */
	public function isLoggedUserInOtherSystem($request) {

		$user = $this->getUser();

		if (!$request->isXmlHttpRequest()) {

			$routeName = $this->route->getMatchedRouteName();

			if ($routeName == 'login' || $routeName == 'front_channel_logout')
				return false;

			$params = $this->route->getParams();

			$lang = isset($params['lang']) ? $params['lang'] : null;

			$isLoggedCookie = isset($_COOKIE['EPZEU_ISLOGGED']) ? ($_COOKIE['EPZEU_ISLOGGED'] == 'True' ? true : false) : false;

			$redirectUrlCookie = base64_encode(json_encode(['routeName' => $routeName, 'params' => $params, 'query' => $request->getQuery()->toArray()]));

			// Потребителят е влязъл в системата
			if ($isLoggedCookie) {

				if (!$user) {
					setcookie('RP', $redirectUrlCookie, null, '/');
					return $this->oidcService->loginUser($lang);
				}
			}

			// Потребителят е излязъл от системата
			else {
				if ($user) {
					setcookie('RP', $redirectUrlCookie, null, '/');
					return $this->oidcService->logoutUser();
				}
			}
		}
		else {
			if (!isset($_COOKIE['EPZEU_ISLOGGED']) && $user) {
				echo "<script>window.location.reload()</script>";
				exit;
			}

		}
	}


}