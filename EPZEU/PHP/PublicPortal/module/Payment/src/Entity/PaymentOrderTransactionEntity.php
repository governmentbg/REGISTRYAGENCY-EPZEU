<?php

namespace Payment\Entity;

/**
 * Усвоени суми по платежно нареждане
 *
 * @package Payment
 * @subpackage Entity
 */
class PaymentOrderTransactionEntity {


	/**
	 * Идентификатор на транзакция.
	 *
	 * @var int
	 */
	protected $id;

	/**
	 * Задължение.
	 *
	 * @var string
	 */
	protected $amount;


	/**
	 * Идентификатор на електронно платенно нареждане.
	 *
	 * @var int
	 */
	protected $fromEPaymentOrderID;


	/**
	 * Идентификатор на хартиено платенно нареждане.
	 *
	 * @var int
	 */
	protected $fromPaymentOrderID;

	/**
	 * Идентификатор на лична сметка, от която се теглят средствата.
	 *
	 * @var int
	 */
	protected $fromPersonalAccountID;


	/**
	 * Предназначение на плащане.
	 *
	 * @var string
	 */
	protected $type;


	/**
	 * Номер на задължение.
	 *
	 * @var int
	 */
	protected $toObligationNumber;


	/**
	 * Идентификатор на задължение.
	 *
	 * @var int
	 */
	protected $toObligationID;


	/**
	 * Идентификатор на захранване на лична сметка.
	 *
	 * @var int
	 */
	protected $toPersonalAccountID;

	/**
	 * Идентификатор на родител.
	 *
	 * @var int
	 */
	protected $parentID;


	/**
	 * Време на плащане.
	 *
	 * @var int
	 */
	protected $createdOn;


	/**
	 * Връща идентификатор на транзакция.
	 *
	 * @return int
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * Задава идентификатор на транзакция.
	 *
	 * @param int
	 */
	public function setId($id) {
		$this->id = $id;
	}

	/**
	 * Връща задължение.
	 *
	 * @return string
	 */
	public function getAmount() {
		return $this->amount;
	}

	/**
	 * Задава задължение.
	 *
	 * @param string
	 */
	public function setAmount($amount) {
		$this->amount = $amount;
	}

	/**
	 * Връща идентификатор на електронно платенно нареждане.
	 *
	 * @return int
	 */
	public function getFromEPaymentOrderID() {
		return $this->fromEPaymentOrderID;
	}

	/**
	 * Задава идентификатор на електронно платенно нареждане.
	 *
	 * @param int
	 */
	public function setFromEPaymentOrderID($fromEPaymentOrderID) {
		$this->fromEPaymentOrderID = $fromEPaymentOrderID;
	}

	/**
	 * Връща идентификатор на хартиено платенно нареждане.
	 *
	 * @return int
	 */
	public function getFromPaymentOrderID() {
		return $this->fromPaymentOrderID;
	}

	/**
	 * Задава идентификатор на хартиено платенно нареждане.
	 *
	 * @param int
	 */
	public function setFromPaymentOrderID($fromPaymentOrderID) {
		$this->fromPaymentOrderID = $fromPaymentOrderID;
	}

	/**
	 * Връща идентификатор на лична сметка, от която се теглят средствата.
	 *
	 * @return int
	 */
	public function getFromPersonalAccountID() {
		return $this->fromPersonalAccountID;
	}

	/**
	 * Задава идентификатор на лична сметка, от която се теглят средствата.
	 *
	 * @param int
	 */
	public function setFromPersonalAccountID($fromPersonalAccountID) {
		$this->fromPersonalAccountID = $fromPersonalAccountID;
	}

	/**
	 * Връща предназначение на плащане.
	 *
	 * @return string
	 */
	public function getType() {
		return $this->type;
	}

	/**
	 * Задава предназначение на плащане.
	 *
	 * @param string
	 */
	public function setType($type) {
		$this->type = $type;
	}

	/**
	 * Връща номер на задължение.
	 *
	 * @return int
	 */
	public function getToObligationNumber() {
		return $this->toObligationNumber;
	}

	/**
	 * Задава номер на задължение.
	 *
	 * @param int
	 */
	public function setToObligationNumber($toObligationNumber) {
		$this->toObligationNumber = $toObligationNumber;
	}

	/**
	 * Връща идентификатор на задължение.
	 *
	 * @return int
	 */
	public function getToObligationID() {
		return $this->toObligationID;
	}

	/**
	 * Задава идентификатор на задължение.
	 *
	 * @param int
	 */
	public function setToObligationID($toObligationID) {
		$this->toObligationID = $toObligationID;
	}

	/**
	 * Връща идентификатор на лична сметка.
	 *
	 * @return int
	 */
	public function getToPersonalAccountID() {
		return $this->toPersonalAccountID;
	}

	/**
	 * Задава идентификатор на лична сметка.
	 *
	 * @param int
	 */
	public function setToPersonalAccountID($toPersonalAccountID) {
		$this->toPersonalAccountID = $toPersonalAccountID;
	}

	/**
	 * Връща идентификатор на родител.
	 *
	 * @return int
	 */
	public function getParentID() {
		return $this->parentID;
	}

	/**
	 * Задава идентификатор на родител.
	 *
	 * @param int
	 */
	public function setParentID($parentID) {
		$this->parentID = $parentID;
	}

	/**
	 * Връща време на плащане.
	 *
	 * @return int
	 */
	public function getCreatedOn() {
		return $this->createdOn;
	}

	/**
	 * Задава време на плащане.
	 *
	 * @param int
	 */
	public function setCreatedOn($createdOn) {
		$this->createdOn = $createdOn;
	}
}