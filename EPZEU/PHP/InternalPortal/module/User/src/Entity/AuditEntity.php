<?php

namespace User\Entity;

/**
 * Одит на потребителски действия
 *
 * @package User
 * @subpackage Entity
 */
class AuditEntity {

	/**
	 * Уникален идентификатор на събитието.
	 *
	 * @var int
	 */
	protected $logActionId;

	/**
	 * Дата и час на настъпване на събитието.
	 *
	 * @var string
	 */
	protected $logActionDate;

	/**
	 * Тип на обект, за който е събитието.
	 *
	 * @var int
	 */
	protected $objectTypeId;

	/**
	 * Събитие, за което се записват данните за одит.
	 *
	 * @var int
	 */
	protected $actionTypeId;

	/**
	 * Портал/Система в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @var int
	 */
	protected $moduleId;

	/**
	 * Функционалност през която е настъпило събитието.
	 *
	 * @var int
	 */
	protected $functionalityId;

	/**
	 * Стойност на ключов атрибут на обекта.
	 *
	 * @var string
	 */
	protected $key;

	/**
	 * Уникален идентификатор на потребителската сесия.
	 *
	 * @var string
	 */
	protected $userSessionId;

	/**
	 * Уникален идентификатор на логин сесия.
	 *
	 * @var string
	 */
	protected $loginSessionId;

	/**
	 * Уникален идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;

	/**
	 * IP адрес на потребителя, извършващ действието.
	 *
	 * @var string
	 */
	protected $ipAddress;

	/**
	 * Допълнителна информация.
	 *
	 * @var string
	 */
	protected $additionalData;

	/**
	 * Имейл на потребител.
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * Флаг, указващ дали потребителския профил е системен.
	 *
	 * @var string
	 */
	protected $isSystem;

	/**
	 * Име на потребителя.
	 *
	 * @var string
	 */
	protected $firstName;

	/**
	 * Презиме на потребителя.
	 *
	 * @var string
	 */
	protected $middleName;

	/**
	 * Фамилия на потребителя.
	 *
	 * @var string
	 */
	protected $familyName;

	/**
	 * КИН.
	 *
	 * @var string
	 */
	protected $cin;

	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $username;


	/**
	 * Вид автентикация.
	 *
	 * @var int
	 */
	protected $authenticationType;

	/**
	 * Сериен номер на сертификат.
	 *
	 * @var string
	 */
	protected $serialNumber;

	/**
	 * Издател.
	 *
	 * @var string
	 */
	protected $issuer;

	/**
	 *
	 * @var string
	 *
	 * Начална дата на валидност.
	 */
	protected $notAfter;

	/**
	 * Връща уникален идентификатор на събитието.
	 *
	 * @return string
	 */
	public function getLogActionId() {
		return $this->logActionId;
	}

	/**
	 * Задава уникален идентификатор на събитието.
	 *
	 * @param int
	 */
	public function setLogActionId($logActionId) {
		$this->logActionId = $logActionId;
	}

	/**
	 * Връща дата и час на настъпване на събитието.
	 *
	 * @return string
	 */
	public function getLogActionDate() {
		return $this->logActionDate;
	}

	/**
	 * Задава дата и час на настъпване на събитието.
	 *
	 * @param string
	 */
	public function setLogActionDate($logActionDate) {
		$this->logActionDate = $logActionDate;
	}

	/**
	 * Връща тип на обект, за който е събитието.
	 *
	 * @return int
	 */
	public function getObjectTypeId() {
		return $this->objectTypeId;
	}

	/**
	 * Задава тип на обект, за който е събитието.
	 *
	 * @param int
	 */
	public function setObjectTypeId($objectTypeId) {
		$this->objectTypeId = $objectTypeId;
	}

	/**
	 * Връща събитие, за което се записват данните за одит.
	 *
	 * @return int
	 */
	public function getActionTypeId() {
		return $this->actionTypeId;
	}

	/**
	 * Задава събитие, за което се записват данните за одит.
	 *
	 * @param int
	 */
	public function setActionTypeId($actionTypeId) {
		$this->actionTypeId = $actionTypeId;
	}

	/**
	 * Връща портал/Система в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @return int
	 */
	public function getModuleId() {
		return $this->moduleId;
	}

	/**
	 * Задава портал/Система в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @param int
	 */
	public function setModuleId($moduleId) {
		$this->moduleId = $moduleId;
	}

	/**
	 * Връща функционалност през която е настъпило събитието.
	 *
	 * @return int
	 */
	public function getFunctionalityId() {
		return $this->functionalityId;
	}

	/**
	 * Задава функционалност през която е настъпило събитието.
	 *
	 * @param int
	 */
	public function setFunctionalityId($functionalityId) {
		$this->functionalityId = $functionalityId;
	}

	/**
	 * Връща стойност на ключов атрибут на обекта.
	 *
	 * @return string
	 */
	public function getKey() {
		return $this->key;
	}

	/**
	 * Задава стойност на ключов атрибут на обекта.
	 *
	 * @param string
	 */
	public function setKey($key) {
		$this->key = $key;
	}

	/**
	 * Връща уникален идентификатор на потребителската сесия.
	 *
	 * @return string
	 */
	public function getUserSessionId() {
		return $this->userSessionId;
	}

	/**
	 * Задава уникален идентификатор на потребителската сесия.
	 *
	 * @param string
	 */
	public function setUserSessionId($userSessionId) {
		$this->userSessionId = $userSessionId;
	}

	/**
	 * Връща уникален идентификатор на логин сесия.
	 *
	 * @return string
	 */
	public function getLoginSessionId() {
		return $this->loginSessionId;
	}

	/**
	 * Задава уникален идентификатор на логин сесия.
	 *
	 * @param string
	 */
	public function setLoginSessionId($loginSessionId) {
		$this->loginSessionId = $loginSessionId;
	}

	/**
	 * Връща уникален идентификатор на потребителски профил.
	 *
	 * @return int
	 */
	public function getUserId() {
		return $this->userId;
	}

	/**
	 * Задава уникален идентификатор на потребителски профил.
	 *
	 * @param int
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
	}

	/**
	 * Връща IP адрес на потребителя, извършващ действието.
	 *
	 * @return string
	 */
	public function getIpAddress() {
		return $this->ipAddress;
	}

	/**
	 * Задава IP адрес на потребителя, извършващ действието.
	 *
	 * @param string
	 */
	public function setIpAddress($ipAddress) {
		$this->ipAddress = $ipAddress;
	}

	/**
	 * Връща допълнителна информация.
	 *
	 * @return string
	 */
	public function getAdditionalData() {
		return $this->additionalData;
	}

	/**
	 * Задава допълнителна информация.
	 *
	 * @param string
	 */
	public function setAdditionalData($additionalData) {
		$this->additionalData = $additionalData;
	}

	/**
	 * Връща имейл на потребител.
	 *
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава имейл на потребител.
	 *
	 * @param string
	 */
	public function setEmail($email) {
		$this->email = $email;
	}


	/**
	 * Връща флаг, указващ дали потребителския профил е системен.
	 *
	 * @return string
	 */
	public function getIsSystem() {
		return $this->isSystem;
	}

	/**
	 * Задава флаг, указващ дали потребителския профил е системен.
	 *
	 * @param string
	 */
	public function setIsSystem($isSystem) {
		$this->isSystem = $isSystem;
	}

	/**
	 * Връща име на потребителя.
	 *
	 * @return string
	 */
	public function getFirstName() {
		return $this->firstName;
	}

	/**
	 * Задава име на потребителя.
	 *
	 * @param string
	 */
	public function setFirstName($firstName) {
		$this->firstName = $firstName;
	}

	/**
	 * Връща презиме на потребителя.
	 *
	 * @return string
	 */
	public function getMiddleName() {
		return $this->middleName;
	}

	/**
	 * Задава презиме на потребителя.
	 *
	 * @param string
	 */
	public function setMiddleName($middleName) {
		$this->middleName = $middleName;
	}

	/**
	 * Връща фамилия на потребителя.
	 *
	 * @return string
	 */
	public function getFamilyName() {
		return $this->familyName;
	}

	/**
	 * Задава фамилия на потребителя.
	 *
	 * @param string
	 */
	public function setFamilyName($familyName) {
		$this->familyName = $familyName;
	}

  /**
   * Връща КИН.
   *
   * @return string
   */
  public function getCin(){
    return $this->cin;
  }

  /**
   * Задава КИН.
   *
   * @param string
   */
  public function setCin($cin){
    $this->cin = $cin;
  }

  /**
   * Връща потребителско име.
   *
   * @return string
   */
  public function getUsername(){
    return $this->username;
  }

  /**
   * Задава потребителско име.
   *
   * @param string
   */
  public function setUsername($username){
    $this->username = $username;
  }

  /**
   * Връща вид автентикация.
   *
   * authenticationType
   * @return int
   */
  public function getAuthenticationType(){
    return $this->authenticationType;
  }

  /**
   * Задава вид автентикация.
   *
   * authenticationType
   * @param int
   */
  public function setAuthenticationType($authenticationType){
    $this->authenticationType = $authenticationType;
  }

  /**
   * Връща сериен номер на сертификат.
   *
   * @return string
   */
  public function getSerialNumber(){
    return $this->serialNumber;
  }

  /**
   * Задава сериен номер на сертификат.
   *
   * @param string
   */
  public function setSerialNumber($serialNumber){
    $this->serialNumber = $serialNumber;
  }

  /**
   * Връща издател.
   *
   * @return string
   */
  public function getIssuer(){
    return $this->issuer;
  }

  /**
   * Задава издател.
   *
   * @param string $issuer
   */
  public function setIssuer($issuer){
    $this->issuer = $issuer;
  }

  /**
   * Връща начална дата на валидност.
   *
   * @return string
   */
  public function getNotAfter(){
    return $this->notAfter;
  }

  /**
   * Задава начална дата на валидност.
   * @param string $notAfter
   */
  public function setNotAfter($notAfter){
    $this->notAfter = $notAfter;
  }

}