<?php
namespace User\Entity;

/**
 * Потребителски сесии
 *
 * @package User
 * @subpackage Entity
 */
class LoginSessionEntity {

	/**
	 * Идентификатор на логин сесиия.
	 *
	 * @var string
	 */
	protected $loginSessionId;

	/**
	 * Идентификатор на потребителска сесия.
	 *
	 * @var string
	 */
	protected $userSessionId;

	/**
	 * Идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;

	/**
	 * TIMESTAMP на ход в системата.
	 *
	 * @var int
	 */
	protected $loginDate;

	/**
	 * TIMESTAMP на изход от системата.
	 *
	 * @var int
	 */
	protected $logoutDate;

	/**
	 * IP от което се е логнал потребителя.
	 *
	 * @var string
	 */
	protected $ipAddress;

	/**
	 * Вид автентикация.
	 *
	 * @var int
	 */
	protected $authenticationType;

	/**
	 * Идентификатор на сертификат.
	 *
	 * @var int
	 */
	protected $certificateId;

	/**
	 * Имейл адрес.
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $username;

	/**
	 * Връща идентификатор на логин сесиия.
	 *
	 * @return string
	 */
	public function getLoginSessionId() {
		return $this->loginSessionId;
	}

	/**
	 * Задава идентификатор на логин сесиия.
	 *
	 * @param string
	 */
	public function setLoginSessionId($loginSessionId) {
		$this->loginSessionId = $loginSessionId;
	}

	/**
	 * Връща идентификатор на потребителска сесия.
	 *
	 * @return string
	 */
	public function getUserSessionId() {
		return $this->userSessionId;
	}

	/**
	 * Задава идентификатор на потребителска сесия.
	 *
	 * @param string
	 */
	public function setUserSessionId($userSessionId) {
		$this->userSessionId = $userSessionId;
	}

	/**
	 * Връща идентификатор на потребителски профил.
	 *
	 * @return int
	 */
	public function getUserId() {
		return $this->userId;
	}

	/**
	 * Задава идентификатор на потребителски профил.
	 *
	 * @param int
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
	}

	/**
	 * Връща tIMESTAMP на ход в системата.
	 *
	 * @return int
	 */
	public function getLoginDate() {
		return $this->loginDate;
	}

	/**
	 * Задава tIMESTAMP на ход в системата.
	 *
	 * @param int
	 */
	public function setLoginDate($loginDate) {
		$this->loginDate = $loginDate;
	}

	/**
	 * Връща tIMESTAMP на изход от системата.
	 *
	 * @return int
	 */
	public function getLogoutDate() {
		return $this->logoutDate;
	}

	/**
	 * Задава tIMESTAMP на изход от системата.
	 *
	 * @param int
	 */
	public function setLogoutDate($logoutDate) {
		$this->logoutDate = $logoutDate;
	}

	/**
	 * Връща iP от което се е логнал потребителя.
	 *
	 * @return string
	 */
	public function getIpAddress() {
		return $this->ipAddress;
	}

	/**
	 * Задава iP от което се е логнал потребителя.
	 *
	 * @param string
	 */
	public function setIpAddress($ipAddress) {
		$this->ipAddress = $ipAddress;
	}

	/**
	 * Връща вид автентикация.
	 *
	 * @return int
	 */
	public function getAuthenticationType() {
		return $this->authenticationType;
	}

	/**
	 * Задава вид автентикация.
	 *
	 * @param int
	 */
	public function setAuthenticationType($authenticationType) {
		$this->authenticationType = $authenticationType;
	}

	/**
	 * Връща идентификатор на сертификат.
	 *
	 * @return int
	 */
	public function getCertificateId() {
		return $this->certificateId;
	}

	/**
	 * Задава идентификатор на сертификат.
	 *
	 * @param int
	 */
	public function setCertificateId($certificateId) {
		$this->certificateId = $certificateId;
	}

	/**
	 * Връща имейл на потребител.
	 *
	 * @return int
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава имейл на потребител.
	 *
	 * @param int
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * Връща потребителско име.
	 *
	 * @return int
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * Задава потребителско име.
	 *
	 * @param int
	 */
	public function setUsername($username) {
		$this->username = $username;
	}


}