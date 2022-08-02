<?php
/**
 * OidcService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

use Application\Oidc\OpenIDConnectClient;

class OidcService {

	protected $cache;

	protected $oidc;

	protected $oidcConfig;

	protected $config;

	protected $cookieDomainName;

	public function __construct($cache, $config, $cookieDomainName) {

		$this->cache = $cache;

		$this->oidcConfig = $config['identity_provider'];

		$this->config = $config;

		$this->oidc = new OpenIDConnectClient($this->oidcConfig['provider_url'], $this->oidcConfig['client_id'], $this->oidcConfig['client_secret'], null, $config['config'], $cookieDomainName);
		$this->oidc->setCertPath($config['config']['cacert']);
		$this->oidc->addAuthParam(array('response_mode' => 'form_post'));
		$this->oidc->setTimeout($this->oidcConfig['timeout']);
		$this->oidc->setVerifyHost($this->oidcConfig['verify_host']);
		$this->oidc->setVerifyPeer($this->oidcConfig['verify_peer']);

		$this->cookieDomainName = $cookieDomainName;

		$this->setTokens();
	}


	/**
	 * Задава token-и за OIDC клиента.
	 */
	private function setTokens() {

		if (empty($_COOKIE['AT']))
			return;

		try {

			$cookieVT = !empty($_COOKIE['VT']) ? $_COOKIE['VT'] : null;

			$accessTokenHash = null;

			if ($cookieVT)
				$accessTokenHash = \Application\Service\AppService::decrypt($cookieVT, $this->config['config']['api_key'], $this->config['config']['api_iv']);

			if ($cookieVT && $accessTokenHash && $accessTokenHash == md5($_COOKIE['AT'])) {

				$this->oidc->setAccessToken($_COOKIE['AT']);

				if (!empty($_COOKIE['RT']))
					$this->oidc->setRefreshToken($_COOKIE['RT']);

				$this->checkAccessTokenExpiration();
			}

			elseif ($this->oidc->verifyJWTsignature($_COOKIE['AT'])) {

				$this->oidc->setAccessToken($_COOKIE['AT']);

				if (!empty($_COOKIE['RT']))
					$this->oidc->setRefreshToken($_COOKIE['RT']);

				$accessTokenHash = \Application\Service\AppService::encrypt(md5($_COOKIE['AT']), $this->config['config']['api_key'], $this->config['config']['api_iv']);
				setcookie('VT', $accessTokenHash, null, '/', $this->cookieDomainName, true, true);

				$this->checkAccessTokenExpiration();
			}

		}
		catch(\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'setTokens', 'IDSRV');
		}
	}


	/**
	 * Изчиства token-и за OIDC клиента.
	 */
	private function clearTokens() {
		$this->oidc->setAccessToken(null);
		$this->oidc->setRefreshToken(null);
	}


	/**
	 * Проверява дали access token-а за OIDC клиента е изтекъл.
	 */
	private function checkAccessTokenExpiration() {

		$tokenPayload = $this->oidc->getAccessTokenPayload();

		if ($tokenPayload->exp > time())
			return;

		// изтекъл access token - обновяване при наличие на refresh token
		$refreshToken = $this->oidc->getRefreshToken();

		if (!empty($refreshToken)) {

			$result = $this->oidc->refreshToken($refreshToken);

			if (!property_exists($result, 'error')) {
				$this->setCookies();
				return;
			}

			errorHandler('E_NOTICE', $result->error, __FILE__, __LINE__, null, 'IDSRV');
		}

		$this->clearTokens();
		$this->clearCookies();
	}


	/**
	 * Извлича access token за автентикация на приложението.
	 *
	 * @return string
	 */
	public function getApiAuthentication() {

		if (!empty($this->oidc->getAccessToken()))
			$this->checkAccessTokenExpiration(); // след изпълнението може и да няма access token

		if (!empty($this->oidc->getAccessToken())) { // автентикация от името на потребител

			$authMethod = 'requestDelegationToken';

			$tokenPayload = $this->oidc->getAccessTokenPayload();

			$cacheId = 'cin.'.$tokenPayload->cin;
		}

		else { // автентикация от името на системата - използва се общ token за всички потребители

			$authMethod = 'requestClientCredentialsToken';

			$cacheId = $this->oidc->getClientID();
		}

		if ($apiAuthToken = $this->cache->getItem($cacheId))
			return $apiAuthToken;

		$this->oidc->addScope($this->oidcConfig['api_scope']);

		$result = $this->oidc->$authMethod();

		if (property_exists($result, 'error')) {

			errorHandler('E_NOTICE', $result->error, __FILE__, __LINE__, null, 'IDSRV');

			$this->clearCookies();
			$this->clearTokens();
			return '';
		}

		$cacheOptions = $this->cache->getOptions();

		$oldTtl = $cacheOptions->getTtl();

		$cacheOptions->setTtl($result->expires_in);

		$this->cache->setItem($cacheId, $result->access_token);

		$cacheOptions->setTtl($oldTtl);

		return $result->access_token;
	}


	/**
	 * Извършва автентикация на потребител.
	 *
	 * @param string $lang
	 * @return bool
	 */
	public function loginUser($lang) {

		try {

			$this->oidc->setRedirectURL($this->oidcConfig['redirect_uri']);

			$this->oidc->addAuthParam(array('ui_locales' => $lang));

			$this->oidc->addRegistrationParam(array('post_logout_redirect_uri' => $this->oidcConfig['post_logout_redirect_uri']));

			$this->oidc->addScope($this->oidcConfig['user_scope']);

			$result = $this->oidc->authenticate();

			if ($result === true) {
				$this->setCookies();
				return true;
			}
		}
		catch(\Exception $e) {
			AppService::handleException($e, 'E_ERROR', 'loginUser', 'IDSRV');
		}

		return false;
	}


	/**
	 * Извършва изход на потребител от системата.
	 */
	public function logoutUser($logoutUrl = false, $autoRedirectAfterLogout = false) {

		$this->clearCookies();

		$refreshToken = $this->oidc->getRefreshToken();

		$logoutKey = 'post_logout_redirect_uri';

		if ($logoutUrl && array_key_exists($logoutUrl, $this->oidcConfig))
			$logoutKey = $logoutUrl;

		if (!empty($refreshToken) && ($json = $this->oidc->refreshToken($refreshToken))) {

			$this->clearCookies();

			if (!property_exists($json, 'id_token')) {
				errorHandler('E_NOTICE', @$json->error, __FILE__, __LINE__, null, 'IDSRV');
			}

			$this->oidc->signOut($json->id_token, $this->oidcConfig[$logoutKey], $autoRedirectAfterLogout);
		}
	}


	/**
	 * Създава бисквитки с token-и.
	 */
	private function setCookies() {
		setcookie('AT', $this->oidc->getAccessToken(), null, '/', $this->cookieDomainName, true, true);
		setcookie('RT', $this->oidc->getRefreshToken(), null, '/', $this->cookieDomainName, true, true);
	}


	/**
	 * Изчиства бисквитки с token-и.
	 */
	private function clearCookies() {
		setcookie('AT', '', time() - 3600, '/', $this->cookieDomainName, true, true);
		setcookie('RT', '', time() - 3600, '/',	$this->cookieDomainName, true, true);
		setcookie('UD', '', time() - 3600, '/', $this->cookieDomainName, true, true);
		setcookie('VT', '', time() - 3600, '/', $this->cookieDomainName, true, true);
		setcookie('usr_active_timestamp', '', time() - 3600, '/', $this->cookieDomainName, true, true);
	}


	/**
	 * Връща access token payload.
	 *
	 * @return object|NULL
	 */
	public function getAccessTokenPayload() {

		if (!empty($this->oidc->getAccessToken()))
			return $this->oidc->getAccessTokenPayload();

		return null;
	}
}