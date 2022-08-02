<?php

namespace Payment\Entity;

/**
 * Задължения
 *
 * @package Payment
 * @subpackage Entity
 */
class DutyEntity {

	/**
	 * Идентификатор на тип на заявление.
	 *
	 * @var int
	 */
	protected $applicationType;


	/**
	 * Идентификатор на номер на заявление.
	 *
	 * @var int
	 */
	protected $applicationNumber;


	/**
	 * Регистър.
	 *
	 * @var string
	 */
	protected $register;


	/**
	 * Идентификатор на задължение.
	 *
	 * @var string
	 */
	protected $obligationAmount;


	/**
	 * Идентификатор на платена сума.
	 *
	 * @var string
	 */
	protected $paidAmount;


	/**
	 * Номер на задължение на платена сума.
	 *
	 * @var int
	 */
	protected $obligationNumber;


	/**
	 * Краен срок на задължение.
	 *
	 * @var string
	 */
	protected $deadline;


	/**
	 * Освободено от такса.
	 *
	 * @var string
	 */
	protected $freeOfCharge;


	/**
	 * Статус.
	 *
	 * @var string
	 */
	protected $status;



	/**
	 * Връща идентификатор на тип на заявление.
	 *
	 * @return int
	 */
	public function getApplicationType() {
		return $this->applicationType;
	}

	/**
	 * Задава идентификатор на тип на заявление.
	 *
	 * @param int
	 */
	public function setApplicationType($applicationType) {
		$this->applicationType = $applicationType;
	}

	/**
	 * Връща идентификатор на номер на заявление.
	 *
	 * @return int
	 */
	public function getApplicationNumber() {
		return $this->applicationNumber;
	}

	/**
	 * Задава идентификатор на номер на заявление.
	 *
	 * @param int
	 */
	public function setApplicationNumber($applicationNumber) {
		$this->applicationNumber = $applicationNumber;
	}

	/**
	 * Връща регистър.
	 *
	 * @return string
	 */
	public function getRegister() {
		return $this->register;
	}

	/**
	 * Задава регистър.
	 *
	 * @param string
	 */
	public function setRegister($register) {
		$this->register = $register;
	}

	/**
	 * Връща идентификатор на задължение.
	 *
	 * @return string
	 */
	public function getObligationAmount() {
		return $this->obligationAmount;
	}

	/**
	 * Задава идентификатор на задължение.
	 *
	 * @param string
	 */
	public function setObligationAmount($obligationAmount) {
		$this->obligationAmount = $obligationAmount;
	}

	/**
	 * Връща идентификатор на платена сума.
	 *
	 * @return string
	 */
	public function getPaidAmount() {
		return $this->paidAmount;
	}

	/**
	 * Задава идентификатор на платена сума.
	 *
	 * @param string
	 */
	public function setPaidAmount($paidAmount) {
		$this->paidAmount = $paidAmount;
	}

	/**
	 * Връща номер на задължение.
	 *
	 * @return int
	 */
	public function getObligationNumber() {
		return $this->obligationNumber;
	}

	/**
	 * Задава номер на задължение.
	 *
	 * @param int
	 */
	public function setObligationNumber($obligationNumber) {
		$this->obligationNumber = $obligationNumber;
	}

	/**
	 * Връща краен срок на задължение.
	 *
	 * @return string
	 */
	public function getDeadline() {
		return $this->deadline;
	}

	/**
	 * Задава краен срок на задължение.
	 *
	 * @param string
	 */
	public function setDeadline($deadline) {
		$this->deadline = $deadline;
	}

	/**
	 * Връща освободено от такса задължение.
	 *
	 * @return string
	 */
	public function getFreeOfCharge() {
		return $this->freeOfCharge;
	}

	/**
	 * Задава освободено от такса задължение.
	 *
	 * @param string
	 */
	public function setFreeOfCharge($freeOfCharge) {
		$this->freeOfCharge = $freeOfCharge;
	}

	/**
	 * Връща статус.
	 *
	 * @return string
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус.
	 *
	 * @param string
	 */
	public function setStatus($status) {
		$this->status = $status;
	}
}