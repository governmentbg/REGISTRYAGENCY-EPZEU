<?php

namespace Application\Entity;

/**
 * Одитен журнал
 *
 * @package Application
 * @subpackage Entity
 */
class LogEntity {


	/**
	 * Тип на обект, за който е събитието.
	 *
	 * @var int
	 */
	protected $objectType;


	/**
	 * Събитие, за което се записват данните за одит.
	 *
	 * @var int
	 */
	protected $actionType;


	/**
	 * Портал/Система, в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @var int
	 */
	protected $module;


	/**
	 * Функционалност, през която е настъпило събитието.
	 *
	 * @var int
	 */
	protected $functionality;


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
	protected $userSessionID;


	/**
	 * Уникален идентификатор на логин сесия.
	 *
	 * @var string
	 */
	protected $loginSessionID;


	/**
	 * Уникален идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userID;


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
	protected $additionalData = null;


	/**
	 * Връща тип на обект, за който е събитието.
	 *
	 * @return int
	 */
	public function getObjectType() {
		return $this->objectType;
	}

	/**
	 * Задава тип на обект, за който е събитието.
	 *
	 * @param int $objectType
	 */
	public function setObjectType($objectType) {
		$this->objectType = $objectType;
	}

	/**
	 * Връща събитие, за което се записват данните за одит.
	 *
	 * @return int
	 */
	public function getActionType() {
		return $this->actionType;
	}

	/**
	 * Задава събитие, за което се записват данните за одит.
	 *
	 * @param int $actionType
	 */
	public function setActionType($actionType) {
		$this->actionType = $actionType;
	}

	/**
	 * Връща Портал/Система, в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @return int
	 */
	public function getModule() {
		return $this->module;
	}

	/**
	 * Задава Портал/Система, в която е функционалността/модула през който е настъпило събитието.
	 *
	 * @param int $module
	 */
	public function setModule($module) {
		$this->module = $module;
	}

	/**
	 * Връща функционалност, през която е настъпило събитието.
	 *
	 * @return int
	 */
	public function getFunctionality() {
		return $this->functionality;
	}

	/**
	 * Задава функционалност, през която е настъпило събитието.
	 *
	 * @param int $functionality
	 */
	public function setFunctionality($functionality) {
		$this->functionality = $functionality;
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
	 * @param string $key
	 */
	public function setKey($key) {
		$this->key = $key;
	}

	/**
	 * Връща уникален идентификатор на потребителската сесия.
	 *
	 * @return string
	 */
	public function getUserSessionID() {
		return $this->userSessionID;
	}

	/**
	 * Задава уникален идентификатор на потребителската сесия.
	 *
	 * @param string $userSessionID
	 */
	public function setUserSessionID($userSessionID) {
		$this->userSessionID = $userSessionID;
	}

	/**
	 * Връща уникален идентификатор на логин сесия.
	 *
	 * @return string
	 */
	public function getLoginSessionID() {
		return $this->loginSessionID;
	}

	/**
	 * Задава уникален идентификатор на логин сесия.
	 *
	 * @param string $loginSessionID
	 */
	public function setLoginSessionID($loginSessionID) {
		$this->loginSessionID = $loginSessionID;
	}

	/**
	 * Връща уникален идентификатор на потребителски профил.
	 *
	 * @return int
	 */
	public function getUserID() {
		return $this->userID;
	}

	/**
	 * Задава уникален идентификатор на потребителски профил.
	 *
	 * @param int $userID
	 */
	public function setUserID($userID) {
		$this->userID = $userID;
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
	 * @param string $ipAddress
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
	 * @param string $additionalData
	 */
	public function setAdditionalData($additionalData) {
		$this->additionalData = $additionalData;
	}
}