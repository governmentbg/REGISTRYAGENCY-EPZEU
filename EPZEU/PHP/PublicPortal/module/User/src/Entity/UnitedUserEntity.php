<?php
namespace User\Entity;

/**
 * Миграция.
 *
 * @package User
 * @subpackage Entity
 */
class UnitedUserEntity {

	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $username;

	/**
	 * Електронна поща.
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * Хеш на парола.
	 *
	 * @var string
	 */
	protected $password;

	/**
	 * Пълно име на потребителя.
	 *
	 * @var string
	 */
	protected $fullname;

	/**
	 * Статус на потребителя.
	 *
	 * @var string
	 */
	protected $islocked;

	/**
	 * Наличност по сметка.
	 *
	 * @var string
	 */
	protected $freecreditsRa;

	/**
	 * КНИК на потребител.
	 *
	 * @var string
	 */
	protected $admId;

	/**
	 *
	 * @var Регистър.
	 */
	protected $register;

	/**
	 * Потребителско име от система за мигриране.
	 *
	 * @var string
	 */
	protected $migrantUsername;

	/**
	 * Уникален идентификатор от система за мигриране.
	 *
	 * @var int
	 */
	protected $migrantUserId;

	/**
	 * Клиентски идентификатор/КНИК.
	 *
	 * @var string
	 */
	protected $migrantClientId;

	/**
	 * Наличност по лична сметка от система за мигриране.
	 *
	 * @var string
	 */
	protected $migrantAmount;

	/**
	 * Статус на прехвърляне на профил.
	 * @var int
	 */
	protected $status;

	/**
	 * Дата и час на обновяване.
	 *
	 * @var string
	 */
	protected $updatedOn;

	/**
	 * Дата на обединение.
	 *
	 * @var string
	 */
	protected $migrationData;

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
	 * @param string
	 */
	public function setUsername($username) {
		$this->username = $username;
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
	 * Връща хеш на парола.
	 *
	 * @return string
	 */
	public function getPassword() {
		return $this->password;
	}

	/**
	 * Задава хеш на парола.
	 *
	 * @param string
	 */
	public function setPassword($password) {
		$this->password = $password;
	}

	/**
	 * Връща потребителско име.
	 *
	 * @return string
	 */
	public function getFullname() {
		return $this->fullname;
	}

	/**
	 * Задава потребителско име.
	 *
	 * @param string
	 */
	public function setFullname($fullname) {
		$this->fullname = $fullname;
	}

	/**
	 * Връща статус на потребител.
	 *
	 * @return string
	 */
	public function getIslocked() {
		return $this->islocked;
	}

	/**
	 * Задава статус на потребител.
	 *
	 * @param string
	 */
	public function setIslocked($islocked) {
		$this->islocked = $islocked;
	}

	/**
	 * Връща статус на потребител.
	 *
	 * @return string
	 */
	public function getFreecreditsRa() {
		return $this->freecreditsRa;
	}

	/**
	 * Задава статус на потребител.
	 *
	 * @param string
	 */
	public function setFreecreditsRa($freecreditsRa) {
		$this->freecreditsRa = $freecreditsRa;
	}

	/**
	 * Връща КНИК на потребител.
	 *
	 * @return string
	 */
	public function getAdmId() {
		return $this->admId;
	}

	/**
	 * Задава КНИК на потребител.
	 *
	 * @param string
	 */
	public function setAdmId($admId) {
		$this->admId = $admId;
	}

	/**
	 * Връща регистър.
	 *
	 * @return string
	 */
	public function getregister() {
		return $this->register;
	}

	/**
	 * Задава регистър.
	 *
	 * @param string
	 */
	public function setregister($register) {
		$this->register = $register;
	}

	/**
	 * Връща потребителско име от система за мигриране.
	 *
	 * @return string
	 */
	public function getmigrantUsername() {
		return $this->migrantUsername;
	}

	/**
	 * Задава потребителско име от система за мигриране.
	 *
	 * @param string
	 */
	public function setmigrantUsername($migrantUsername) {
		$this->migrantUsername = $migrantUsername;
	}

	/**
	 * Връща уникален идентификатор от система за мигриране.
	 *
	 * @return int
	 */
	public function getmigrantUserId() {
		return $this->migrantUserId;
	}

	/**
	 * Задава уникален идентификатор от система за мигриране.
	 *
	 * @param int
	 */
	public function setmigrantUserId($migrantUserId) {
		$this->migrantUserId = $migrantUserId;
	}

	/**
	 * Връща клиентски идентификатор/КНИК.
	 *
	 * @return string
	 */
	public function getmigrantClientId() {
		return $this->migrantClientId;
	}

	/**
	 * Задава клиентски идентификатор/КНИК.
	 *
	 * @param string
	 */
	public function setmigrantClientId($migrantClientId) {
		$this->migrantClientId = $migrantClientId;
	}

	/**
	 * Връща наличност по лична сметка от система за мигриране.
	 *
	 * @return string
	 */
	public function getmigrantAmount() {
		return $this->migrantAmount;
	}

	/**
	 * Задава наличност по лична сметка от система за мигриране.
	 *
	 * @param string
	 */
	public function setmigrantAmount($migrantAmount) {
		$this->migrantAmount = $migrantAmount;
	}

	/**
	 * Връща статус на прехвърляне на профил.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на прехвърляне на профил.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща дата и час на редакция на йерархична страница.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на редакция на йерархична страница.
	 *
	 * @param string $updatedOn
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

  /**
   * Задава дата на обединение.
   *
   * @return string
   */
  public function getMigrationData(){
    return $this->migrationData;
  }

  /**
   * Задава дата на обединение.
   *
   * @param string
   */
  public function setMigrationData($migrationData){
    $this->migrationData = $migrationData;
  }

}