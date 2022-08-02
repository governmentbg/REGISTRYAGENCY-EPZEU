<?php
/**
 * UserService class file
 *
 * @package User
 * @subpackage Service
 */

namespace User\Service;

use User\Entity\UserEntity;
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

	protected $cookieDomainName;

	/**
	 *
	 */
	public $acl = null;

	/**
	 *
	 * @param PostMapperInterface $postMapper
	 */
	public function __construct($userDM, $route, $oidcService, $authService, $config, $cookieDomainName) {

		$this->userDM = $userDM;

		$this->route = $route;

		$this->oidcService = $oidcService;

		$this->authService = $authService;

		$this->config = $config;

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
	 * Добавя контекстен потребител
	 *
	 * @return bool
	 */
	public function setContextUser() {

		try {

			if ($user = $this->getUser())
				return $this->userDM->setContextUser($user->getUserId());

			return $this->userDM->setContextUser(\User\Module::SYS_USER);
		}
		catch (\Exception $e) {

			AppService::handleException($e, 'E_ERROR', 'COMMON_ERROR_MESSAGE');
			return false;
		}
	}


	/**
	 * Проверява за право на достъп до даден ресурс
	 *
	 * @return bool
	 */
	public function checkPermission() {

		$route = $this->route->getMatchedRouteName();
		return $this->isAllowed($route);
	}

	/**
	 * Филтър за достъп на потребители до даден ресурс
	 *
	 * @param string $routeName
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

}