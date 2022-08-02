<?php
namespace Statistic\Entity;

/**
 * Справка за потребителите със специален достъп
 *
 * @package Statistic
 * @subpackage Entity
 */
class ReportUserEntity {

	/**
	 * Идентификатор на потребител.
	 *
	 * @var int
	 */
	protected $userId;


	/**
	 * Дата на създаване/последна промяна.
	 *
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Статус на потребител.
	 *
	 * @var string
	 */
	protected $status;


	/**
	 * КИН на потребител.
	 *
	 * @var int
	 */
	protected $cin;


	/**
	 * Електронна поща на потребител.
	 *
	 * @var string
	 */
	protected $email;


	/**
	 * Потребителско име.
	 *
	 * @var int
	 */
	protected $username;


	/**
	 * Вид автентикация.
	 *
	 * @var string
	 */
	protected $specialAccessUserType;


	/**
	 * Права.
	 *
	 * @var int
	 */
	protected $permissions;


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
	 * Връща дата на създаване/последна промяна.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата на създаване/последна промяна.
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща статус на потребител.
	 *
	 * @return string
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на потребител.
	 *
	 * @param string
	 */
	public function setStatus($status) {
		$this->status = $status;
	}


	/**
	 * Връща КИН на потребител.
	 *
	 * @return int
	 */
	public function getCin() {
		return $this->cin;
	}

	/**
	 * Задава КИН на потребител.
	 *
	 * @param int
	 */
	public function setCin($cin) {
		$this->cin = $cin;
	}

	/**
	 * Връща електронна поща на потребител.
	 *
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава електронна поща на потребител.
	 *
	 * @param string
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

	/**
	 * Връща вид автентикация.
	 *
	 * @return string
	 */
	public function getSpecialAccessUserType() {
		return $this->specialAccessUserType;
	}

	/**
	 * Задава вид автентикация.
	 *
	 * @param string
	 */
	public function setSpecialAccessUserType($specialAccessUserType) {
		$this->specialAccessUserType = $specialAccessUserType;
	}

	/**
	 * Връща права.
	 *
	 * @return int
	 */
	public function getPermissions() {
		return $this->permissions;
	}

	/**
	 * Задава права.
	 *
	 * @param int
	 */
	public function setPermissions($permissions) {
		$this->permissions = $permissions;
	}
}