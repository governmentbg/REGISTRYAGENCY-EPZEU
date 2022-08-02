<?php

namespace Payment\Entity;

/**
 * Платежни нареждания
 *
 * @package Payment
 * @subpackage Entity
 */
class PaymentOrderEntity {

	/**
	 * Идентификатор на платежно нареждане.
	 *
	 * @var int
	 */
	protected $id;


	/**
	 * Дата на превод.
	 *
	 * @var string
	 */
	protected $paymentDate;


	/**
	 * Основание - електронно платежно нареждане.
	 *
	 * @var string
	 */
	protected $paymentDescription;


	/**
	 * Основание - хартиено платежно нареждане.
	 *
	 * @var string
	 */
	protected $reason;


	/**
	 * Още пояснения.
	 *
	 * @var string
	 */
	protected $additionalClarifications;


	/**
	 * Наредена сума.
	 *
	 * @var string
	 */
	protected $amount;


	/**
	 * Остатък за усвояване.
	 *
	 * @var string
	 */
	protected $balance;


	/**
	 * Възстановена сума.
	 *
	 * @var string
	 */
	protected $amountRefunded;


	/**
	 * Канал на плащане.
	 *
	 * @var string
	 */
	protected $providerKind;

	/**
	 * Референция на банкова адресируема единица.
	 *
	 * @var string
	 */
	protected $baeReference;

	/**
	 * Дата на референция на банкова адресируема единица.
	 *
	 * @var string
	 */
	protected $baeRefDate;

	/**
	 * Номер на референция на банкова адресируема единица.
	 *
	 * @var string
	 */
	protected $baeRefNumber;

	/**
	 * Предназначение на плащане.
	 *
	 * @var string
	 */
	protected $type;


	/**
	 * Номер на фактура.
	 *
	 * @var int
	 */
	protected $invoiceNumber;


	/**
	 * Връща идентификатор на платежно нареждане.
	 *
	 * @return int
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * Задава идентификатор на платежно нареждане.
	 *
	 * @param int
	 */
	public function setId($id) {
		$this->id = $id;
	}

	/**
	 * Връща дата на превод.
	 *
	 * @return string
	 */
	public function getPaymentDate() {
		return $this->paymentDate;
	}

	/**
	 * Задава дата на превод.
	 *
	 * @param string
	 */
	public function setPaymentDate($paymentDate) {
		$this->paymentDate = $paymentDate;
	}


	/**
	 * Връща основание - електронно платежно нареждане.
	 *
	 * @return string
	 */
	public function getPaymentDescription() {
		return $this->paymentDescription;
	}

	/**
	 * Задава основание - електронно платежно нареждане.
	 *
	 * @param string
	 */
	public function setPaymentDescription($paymentDescription) {
		$this->paymentDescription = $paymentDescription;
	}

	/**
	 * Връща основание - хартиено платежно нареждане.
	 *
	 * @return string
	 */
	public function getReason() {
		return $this->reason;
	}

	/**
	 * Задава основание - хартиено платежно нареждане.
	 *
	 * @param string
	 */
	public function setReason($reason) {
		$this->reason = $reason;
	}

	/**
	 * Връща още пояснения.
	 *
	 * @return string
	 */
	public function getAdditionalClarifications() {
		return $this->additionalClarifications;
	}

	/**
	 * Задава още пояснения.
	 *
	 * @param string
	 */
	public function setAdditionalClarifications($additionalClarifications) {
		$this->additionalClarifications = $additionalClarifications;
	}

	/**
	 * Връща наредена сума.
	 *
	 * @return string
	 */
	public function getAmount() {
		return $this->amount;
	}

	/**
	 * Задава наредена сума.
	 *
	 * @param string
	 */
	public function setAmount($amount) {
		$this->amount = $amount;
	}

	/**
	 * Връща остатък за усвояване.
	 *
	 * @return string
	 */
	public function getBalance() {
		return $this->balance;
	}

	/**
	 * Задава остатък за усвояване.
	 *
	 * @param string
	 */
	public function setBalance($balance) {
		$this->balance = $balance;
	}

	/**
	 * Връща възстановена сума.
	 *
	 * @return string
	 */
	public function getAmountRefunded() {
		return $this->amountRefunded;
	}

	/**
	 * Задава възстановена сума.
	 *
	 * @param string
	 */
	public function setAmountRefunded($amountRefunded) {
		$this->amountRefunded = $amountRefunded;
	}

	/**
	 * Връща канал на плащане.
	 *
	 * @return string
	 */
	public function getProviderKind() {
		return $this->providerKind;
	}

	/**
	 * Задава канал на плащане.
	 *
	 * @param string
	 */
	public function setProviderKind($providerKind) {
		$this->providerKind = $providerKind;
	}

	/**
	 * Връща референция на банкова адресируема единица.
	 *
	 * @return string
	 */
	public function getBaeReference() {
		return $this->baeReference;
	}

	/**
	 * Задава референция на банкова адресируема единица.
	 *
	 * @param string
	 */
	public function setBaeReference($baeReference) {
		$this->baeReference = $baeReference;
	}

	/**
	 * Връща дата на референция на банкова адресируема единица.
	 *
	 * @return string
	 */
	public function getBaeRefDate() {
		return $this->baeRefDate;
	}

	/**
	 * Задава дата на референция на банкова адресируема единица.
	 *
	 * @param string
	 */
	public function setBaeRefDate($baeRefDate) {
		$this->baeRefDate = $baeRefDate;
	}

	/**
	 * Връща номер на референция на банкова адресируема единица.
	 *
	 * @return string
	 */
	public function getBaeRefNumber() {
		return $this->baeRefNumber;
	}

	/**
	 * Задава номер на референция на банкова адресируема единица.
	 *
	 * @param string
	 */
	public function setBaeRefNumber($baeRefNumber) {
		$this->baeRefNumber = $baeRefNumber;
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
	 * Връща номер на фактура.
	 *
	 * @return int
	 */
	public function getInvoiceNumber() {
		return $this->invoiceNumber;
	}

	/**
	 * Задава номер на фактура.
	 *
	 * @param int
	 */
	public function setInvoiceNumber($invoiceNumber) {
		$this->invoiceNumber = $invoiceNumber;
	}
}