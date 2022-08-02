<?php

namespace User\Entity;

/**
 * Автентикация на потребителски профил
 *
 * @package User
 * @subpackage Entity
 */
class AuthEntity {


	/**
	 * Идентификатор на автентикация на потребителски профил.
	 *
	 * @var int
	 */
	protected $authenticationId;


	/**
	 * Идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;


	/**
	 * Вид автентикация.
	 *
	 * @var int
	 */
	protected $authenticationType;


	/**
	 * Хеш на парола.
	 *
	 * @var string
	 */
	protected $passwordHash;


	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $username;


	/**
	 * Идентификатор на потребител, който е създал автентикация на потребителски профил.
	 *
	 * @var int
	 */
	protected $createdBy;


	/**
	 * Дата и час на създаване на автентикация на потребителски профил.
	 *
	 * @var string
	 */
	protected $createdOn;


	/**
	 * Идентификатор на потребител, който е направил последна промяна на автентикация на потребителски профил.
	 *
	 * @var int
	 */
	protected $updatedBy;


	/**
	 * Дата и час на последна промяна на автентикация на потребителски профил.
	 *
	 * @var string
	 */
	protected $updatedOn;

	/**
	 * Идентификатор на сертификат.
	 *
	 * @var string
	 */
	protected $certificateId;

	/**
	 * Връща идентификатор на автентикация на потребителски профил.
	 *
	 * @return int
	 */
	public function getAuthenticationId() {
		return $this->authenticationId;
	}

	/**
	 * Задава идентификатор на автентикация на потребителски профил.
	 *
	 * @param int $authenticationId
	 */
	public function setAuthenticationId($authenticationId) {
		$this->authenticationId = $authenticationId;
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
	 * @param int $userId
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
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
	 * @param int $authenticationType
	 */
	public function setAuthenticationType($authenticationType) {
		$this->authenticationType = $authenticationType;
	}

	/**
	 * Връща хеш на парола.
	 *
	 * @return string
	 */
	public function getPasswordHash() {
		return $this->passwordHash;
	}

	/**
	 * Задава хеш на парола.
	 *
	 * @param string $passwordHash
	 */
	public function setPasswordHash($passwordHash) {
		$this->passwordHash = $passwordHash;
	}

	/**
	 * Връща потребителско име.
	 *
	 * @return string
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * Задава потребителско име.
	 *
	 * @param string $username
	 */
	public function setUsername($username) {
		$this->username = $username;
	}

	/**
	 * Връща идентификатор на потребител, който е създал автентикация на потребителски профил.
	 *
	 * @return int
	 */
	public function getCreatedBy() {
		return $this->createdBy;
	}

	/**
	 * Задава идентификатор на потребител, който е създал автентикация на потребителски профил.
	 *
	 * @param int $createdBy
	 */
	public function setCreatedBy($createdBy) {
		$this->createdBy = $createdBy;
	}

	/**
	 * Връща дата и час на създаване на автентикация на потребителски профил.
	 *
	 * @return string
	 */
	public function getCreatedOn() {
		return $this->createdOn;
	}

	/**
	 * Задава дата и час на създаване на автентикация на потребителски профил.
	 *
	 * @param string $createdOn
	 */
	public function setCreatedOn($createdOn) {
		$this->createdOn = $createdOn;
	}

	/**
	 * Връща идентификатор на потребител, който е направил последна промяна на автентикация на потребителски профил.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител, който е направил последна промяна на автентикация на потребителски профил.
	 *
	 * @param int $updatedBy
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща дата и час на последна промяна на автентикация на потребителски профил.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на последна промяна на автентикация на потребителски профил.
	 *
	 * @param string $updatedOn
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

  /**
   * Връща идентификатор на сертификат
   *
   * @return string
   */
  public function getCertificateId(){
    return $this->certificateId;
  }

  /**
   * Задава идентификатор на сертификат
   *
   * @param string
   */
  public function setCertificateId($certificateId){
    $this->certificateId = $certificateId;
  }

}