<?php

namespace User\Entity;

/**
 * Лимит на потребител за услуга за предоставяне на данни.
 *
 * @package User
 * @subpackage Entity
 */
class UserServiceLimitEntity {

	/**
	 * Идентификатор на потребител.
	 *
	 * @var int
	 */
	protected $userId;

	/**
	 * Идентификатор на лимит на потребител.
	 *
	 * @var int
	 */
	protected $userLimitId;

	/**
	 * Електронна поща.
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $userName;

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
	 * Наименование на Портал/Система.
	 *
	 * @var string
	 */
	protected $moduleName;

	/**
	 * Код на услуга за предоставяне на данни.
	 *
	 * @var string
	 */
	protected $serviceCode;

	/**
	 * Наименование на услуга за предоставяне на данни.
	 *
	 * @var string
	 */
	protected $serviceName;

	/**
	 * Идентификатор на лимит на услуга за предоставяне на данни.
	 *
	 * @var int
	 */
	protected $serviceLimitId;

	/**
	 * Период от време.
	 *
	 * @var string
	 */
	protected $requestsInterval;

	/**
	 * Максимален брой заявки за периода от време.
	 *
	 * @var int
	 */
	protected $requestsNumber;

	/**
	 * Организация и длъжност.
	 *
	 * @var string
	 */
	protected $organization;

	/**
	 * Статус на лимит.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * Идентификатор на потребител направил последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Статус на потребител.
	 *
	 * @var int
	 */
	protected $userStatus;

	/**
	 * Дни.
	 *
	 * @var int $days
	 */
	protected $days;

	/**
	 * Часове.
	 *
	 * @var int
	 */
	protected $hours;

	/**
	 * Минути.
	 *
	 * @var int
	 */
	protected $minutes;

	/**
	 * Секунди.
	 *
	 * @var int
	 */
	protected $seconds;

	/**
	 * Милисекунди.
	 *
	 * @var int
	 */
	protected $milliseconds;

	/**
	 * Връща идентификатор на потребител.
	 *
	 * @return int
	 */
	public function getUserId() {
		return $this->userId;
	}

	/**
	 * Задава идентификатор на потребител.
	 *
	 * @param int
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
	}

	/**
	 * Връща идентификатор на лимит на потребител.
	 *
	 * @return int
	 */
	public function getUserLimitId() {
		return $this->userLimitId;
	}

	/**
	 * Задава идентификатор на лимит на потребител.
	 *
	 * @param int
	 */
	public function setUserLimitId($userLimitId) {
		$this->userLimitId = $userLimitId;
	}

	/**
	 * Връща електронна поща.
	 *
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава електронна поща.
	 *
	 * @param string
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * Връща потребителско име.
	 *
	 * @return string
	 */
	public function getUserName() {
		return $this->userName;
	}

	/**
	 * Задава потребителско име.
	 *
	 * @param string
	 */
	public function setUserName($userName) {
		$this->userName = $userName;
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
	 * Връща наименование на Портал/Система.
	 *
	 * @return string
	 */
	public function getModuleName() {
		return $this->moduleName;
	}

	/**
	 * Задава наименование на Портал/Система.
	 *
	 * @param string
	 */
	public function setModuleName($moduleName) {
		$this->moduleName = $moduleName;
	}

	/**
	 * Връща код на услуга за предоставяне на данни.
	 *
	 * @return string
	 */
	public function getServiceCode() {
		return $this->serviceCode;
	}

	/**
	 * Задава код на услуга за предоставяне на данни.
	 *
	 * @param string
	 */
	public function setServiceCode($serviceCode) {
		$this->serviceCode = $serviceCode;
	}

	/**
	 * Връща наименование на услуга за предоставяне на данни.
	 *
	 * @return string
	 */
	public function getServiceName() {
		return $this->serviceName;
	}

	/**
	 * Задава наименование на услуга за предоставяне на данни.
	 *
	 * @param string
	 */
	public function setServiceName($serviceName) {
		$this->serviceName = $serviceName;
	}

	/**
	 * Връща идентификатор на лимит на услуга за предоставяне на данни.
	 *
	 * @return int
	 */
	public function getServiceLimitId() {
		return $this->serviceLimitId;
	}

	/**
	 * Задава идентификатор на лимит на услуга за предоставяне на данни.
	 *
	 * @param int
	 */
	public function setServiceLimitId($serviceLimitId) {
		$this->serviceLimitId = $serviceLimitId;
	}

	/**
	 * Връща период от време.
	 *
	 * @return string
	 */
	public function getRequestsInterval() {
		return $this->requestsInterval;
	}

	/**
	 * Задава период от време.
	 *
	 * @param string
	 */
	public function setRequestsInterval($requestsInterval) {
		$this->requestsInterval = $requestsInterval;
	}

	/**
	 * Връща максимален брой заявки за периода от време.
	 *
	 * @return int
	 */
	public function getRequestsNumber() {
		return $this->requestsNumber;
	}

	/**
	 * Задава максимален брой заявки за периода от време.
	 *
	 * @param int
	 */
	public function setRequestsNumber($requestsNumber) {
		$this->requestsNumber = $requestsNumber;
	}

	/**
	 * Връща организация и длъжност.
	 *
	 * @return string
	 */
	public function getOrganization() {
		return $this->organization;
	}

	/**
	 * Задава организация и длъжност.
	 *
	 * @param string
	 */
	public function setOrganization($organization) {
		$this->organization = $organization;
	}

	/**
	 * Връща статус на лимит.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на лимит.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща идентификатор на потребител направил последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител направил последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща TIMESTAMP на последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща статус на потребител.
	 *
	 * @return int
	 */
	public function getUserStatus() {
		return $this->userStatus;
	}

	/**
	 * Задава статус на потребител.
	 *
	 * @param int
	 */
	public function setUserStatus($userStatus) {
		$this->userStatus = $userStatus;
	}

	/**
	 * Връща $days
	 *
	 * @return int
	 */
	public function getDays() {
		return $this->days;
	}

	/**
	 * Задава $days
	 *
	 * @param int
	 */
	public function setDays($days) {
		$this->days = $days;
	}

	/**
	 * Връща часове.
	 *
	 * @return int
	 */
	public function getHours() {
		return $this->hours;
	}

	/**
	 * Задава часове.
	 *
	 * @param int
	 */
	public function setHours($hours) {
		$this->hours = $hours;
	}

	/**
	 * Връща минути.
	 *
	 * @return int
	 */
	public function getMinutes() {
		return $this->minutes;
	}

	/**
	 * Задава минути.
	 *
	 * @param int
	 */
	public function setMinutes($minutes) {
		$this->minutes = $minutes;
	}

	/**
	 * Връща секунди.
	 *
	 * @return int
	 */
	public function getSeconds() {
		return $this->seconds;
	}

	/**
	 * Задава секунди.
	 *
	 * @param int
	 */
	public function setSeconds($seconds) {
		$this->seconds = $seconds;
	}

	/**
	 * Връща милисекунди.
	 *
	 * @return int
	 */
	public function getMilliseconds() {
		return $this->milliseconds;
	}

	/**
	 * Задава милисекунди.
	 *
	 * @param int
	 */
	public function setMilliseconds($milliseconds) {
		$this->milliseconds = $milliseconds;
	}
}