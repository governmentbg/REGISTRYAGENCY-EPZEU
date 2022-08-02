<?php
namespace User\Entity;

/**
 * Aбониране за email оповестяване.
 *
 * @package User
 * @subpackage Entity
 */
class EmailSubscriptionEntity {

	/**
	 * Уникален идентификатор на заявен абонамент.
	 *
	 * @var int
	 */
	protected $userSubscriptionID;

	/**
	 * Уникален идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userCIN;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $register;

	/**
	 * Тип на партида/обект.
	 *
	 * @var int
	 */
	protected $type;

	/**
	 * Стойност на тип на партида/обект.
	 *
	 * @var string
	 */
	protected $value;



	/**
	 * Връща уникален идентификатор на заявен абонамент.
	 *
	 * @return int
	 */
	public function getUserSubscriptionID() {
		return $this->userSubscriptionID;
	}

	/**
	 * Задава уникален идентификатор на заявен абонамент.
	 *
	 * @param int
	 */
	public function setUserSubscriptionID($userSubscriptionID) {
		$this->userSubscriptionID = $userSubscriptionID;
	}

	/**
	 * Връща уникален идентификатор на потребителски профил.
	 *
	 * @return int
	 */
	public function getUserCIN() {
		return $this->userCIN;
	}

	/**
	 * Задава уникален идентификатор на потребителски профил.
	 *
	 * @param int
	 */
	public function setUserCIN($userCIN) {
		$this->userCIN = $userCIN;
	}

	/**
	 * Връща идентификатор на регистър.
	 *
	 * @return int
	 */
	public function getRegister() {
		return $this->register;
	}

	/**
	 * Задава идентификатор на регистър.
	 *
	 * @param int
	 */
	public function setRegister($register) {
		$this->register = $register;
	}

	/**
	 * Връща тип на партида/обект.
	 *
	 * @return int
	 */
	public function getType() {
		return $this->type;
	}

	/**
	 * Задава тип на партида/обект.
	 *
	 * @param int
	 */
	public function setType($type) {
		$this->type = $type;
	}

	/**
	 * Връща стойност на тип на партида/обект.
	 *
	 * @return string
	 */
	public function getValue() {
		return $this->value;
	}

	/**
	 * Задава стойност на тип на партида/обект.
	 *
	 * @param string
	 */
	public function setValue($value) {
		$this->value = $value;
	}
}