<?php

namespace Payment\Entity;

/**
 * Payment
 *
 * @package Payment
 * @subpackage Entity
 */
class PaymentEntity {

	/**
	 * Идентификатор на запис.
	 *
	 * @var int
	 */
	protected $messageId;


	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;


	/**
	 * Идентификатор на система за електронни разплащания.
	 *
	 * @var int
	 */
	protected $paymentSystemType;


	/**
	 * Идентификатор на задължение, NULL при захранване на ЛС.
	 *
	 * @var int
	 */
	protected $obligationNumber;


	/**
	 * Дата на задължение.
	 *
	 * @var string
	 */
	protected $obligationDate;


	/**
	 * Идентификатор потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;


	/**
	 * Клиентски идентификационен номер.
	 *
	 * @var int
	 */
	protected $userCin;


	/**
	 * Име на задълженото лице.
	 *
	 * @var string
	 */
	protected $obligedPerson;


	/**
	 * Клиентски номер на търговеца - КИН на АВ.
	 *
	 * @var string
	 */
	protected $merchantCin;


	/**
	 * Наименование на търговец получател на нареждането.
	 *
	 * @var string
	 */
	protected $merchantName;


	/**
	 * BIC на получателя - IBAN на АВ.
	 *
	 * @var string
	 */
	protected $merchantBic;


	/**
	 * IBAN на банката получател - BIC на банката на АВ.
	 *
	 * @var string
	 */
	protected $merchantIban;


	/**
	 * Стойност за плащане.
	 *
	 * @var string
	 */
	protected $amount;


	/**
	 * Основание за плащане.
	 *
	 * @var string
	 */
	protected $reason;


	/**
	 * Крайна дата/час за плащане.
	 *
	 * @var string
	 */
	protected $expirationTime;


	/**
	 * Номер на транзакция, върнат от съответната система.
	 *
	 * @var string
	 */
	protected $transactionNumber;


	/**
	 * Авторизационен код.
	 *
	 * @var string
	 */
	protected $authorizationCode;


	/**
	 * Статус на плащане в ЕПЗЕУ.
	 *
	 * @var int
	 */
	protected $status;


	/**
	 * Статус на плащане, върнат от съответната система.
	 *
	 * @var string
	 */
	protected $statusDescription;


	/**
	 * Дата на промяна на статуса, върнат от съответната система.
	 *
	 * @var string
	 */
	protected $statusDate;


	/**
	 * Номер на заявление.
	 *
	 * @var string
	 */
	protected $applicationNumber;


	/**
	 * Плащане на задължение/лична сметка.
	 *
	 * @var int
	 */
	protected $paymentType;


	/**
	 * Име на регистър.
	 *
	 * @var string
	 */
	protected $registerName;


	/**
	 * Oтговор при изпращане на заявка към ПЕП на ДАЕУ.
	 *
	 * @var string
	 */
	protected $pepdaeuResponse;


	/**
	* Задава идентификатор на запис.
	*
	* @param int
	*/
	public function setMessageId($messageId) {
		$this->messageId = $messageId;
	}

	/**
	* Връща идентификатор на запис.
	*
	* @return int
	*/
	public function getMessageId() {
		return $this->messageId;
	}

	/**
	 * Задава идентификатор на регистър.
	 *
	 * @param int
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща идентификатор на регистър.
	 *
	 * @return int
	 */
	public function getRegisterId() {
		return $this->registerId;
	}

	/**
	 * Задава идентификатор на система за електронни разплащания.
	 *
	 * @param int
	 */
	public function setPaymentSystemType($paymentSystemType) {
		$this->paymentSystemType = $paymentSystemType;
	}

	/**
	 * Връща идентификатор на система за електронни разплащания.
	 *
	 * @return int
	 */
	public function getPaymentSystemType() {
		return $this->paymentSystemType;
	}

	/**
	 * Задава идентификатор на задължение, NULL при захранване на ЛС.
	 *
	 * @param int
	 */
	public function setObligationNumber($obligationNumber) {
		$this->obligationNumber = $obligationNumber;
	}

	/**
	 * Връща идентификатор на задължение, NULL при захранване на ЛС.
	 *
	 * @return int
	 */
	public function getObligationNumber() {
		return $this->obligationNumber;
	}

	/**
	 * Задава дата на задължение.
	 *
	 * @param int
	 */
	public function setObligationDate($obligationDate) {
		$this->obligationDate = $obligationDate;
	}

	/**
	 * Връща дата на задължение.
	 *
	 * @return int
	 */
	public function getObligationDate() {
		return $this->obligationDate;
	}

	/**
	 * Задава идентификатор на потребителски профил.
	 *
	 * @param int
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
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
	 * Задава клиентски идентификационен номер.
	 *
	 * @param int
	 */
	public function setUserCin($userCin) {
		$this->userCin = $userCin;
	}

	/**
	 * Връща клиентски идентификационен номер.
	 *
	 * @return int
	 */
	public function getUserCin() {
		return $this->userCin;
	}

	/**
	 * Връща име на задълженото лице.
	 *
	 * @return string
	 */
	public function getObligedPerson() {
		return $this->obligedPerson;
	}

	/**
	 * Задава име на задълженото лице.
	 *
	 * @param string
	 */
	public function setObligedPerson($obligedPerson) {
		$this->obligedPerson = $obligedPerson;
	}

	/**
	 * Връща клиентски номер на търговеца - КИН на АВ.
	 *
	 * @return string
	 */
	public function getMerchantCin() {
		return $this->merchantCin;
	}

	/**
	 * Задава клиентски номер на търговеца - КИН на АВ.
	 *
	 * @param string
	 */
	public function setMerchantCin($merchantCin) {
		$this->merchantCin = $merchantCin;
	}

	/**
	 * Връща наименование на търговец получател на нареждането.
	 *
	 * @return string
	 */
	public function getMerchantName() {
		return $this->merchantName;
	}

	/**
	 * Задава наименование на търговец получател на нареждането.
	 *
	 * @param string
	 */
	public function setMerchantName($merchantName) {
		$this->merchantName = $merchantName;
	}

	/**
	 * Връща BIC на банката получател - BIC на банката на АВ.
	 *
	 * @return string
	 */
	public function getMerchantBic() {
		return $this->merchantBic;
	}

	/**
	 * Задава BIC на банката получател - BIC на банката на АВ.
	 *
	 * @param string
	 */
	public function setMerchantBic($merchantBic) {
		$this->merchantBic = $merchantBic;
	}

	/**
	 * Връща IBAN на получателя - IBAN на АВ.
	 *
	 * @return string
	 */
	public function getMerchantIban() {
		return $this->merchantIban;
	}

	/**
	 * Задава IBAN на получателя - IBAN на АВ.
	 *
	 * @param string
	 */
	public function setMerchantIban($merchantIban) {
		$this->merchantIban = $merchantIban;
	}

	/**
	 * Връща стойност за плащане.
	 *
	 * @return string
	 */
	public function getAmount() {
		return $this->amount;
	}

	/**
	 * Задава стойност за плащане.
	 *
	 * @param string
	 */
	public function setAmount($amount) {
		$this->amount = $amount;
	}

	/**
	 * Връща основание за плащане.
	 *
	 * @return string
	 */
	public function getReason() {
		return $this->reason;
	}

	/**
	 * Задава основание за плащане - Формиран текст от вида.
	 *
	 * @param string
	 */
	public function setReason($reason) {
		$this->reason = $reason;
	}

	/**
	 * Връща крайна дата/час за плащане.
	 *
	 * @return string
	 */
	public function getExpirationTime() {
		return $this->expirationTime;
	}

	/**
	 * Задава крайна дата/час за плащане.
	 *
	 * @param string
	 */
	public function setExpirationTime($expirationTime) {
		$this->expirationTime = $expirationTime;
	}

	/**
	 * Връща номер на транзакция, върнат от съответната система.
	 *
	 * @return string
	 */
	public function getTransactionNumber() {
		return $this->transactionNumber;
	}

	/**
	 * Задава номер на транзакция, върнат от съответната система.
	 *
	 * @param string
	 */
	public function setTransactionNumber($transactionNumber) {
		$this->transactionNumber = $transactionNumber;
	}

	/**
	 * Връща авторизационен код.
	 *
	 * @return string
	 */
	public function getAuthorizationCode() {
		return $this->authorizationCode;
	}

	/**
	 * Задава авторизационен код.
	 *
	 * @param string
	 */
	public function setAuthorizationCode($authorizationCode) {
		$this->authorizationCode = $authorizationCode;
	}

	/**
	 * Връща статус на плащане в ЕПЗЕУ.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на плащане в ЕПЗЕУ.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща статус на плащане, върнат от съответната система.
	 *
	 * @return string
	 */
	public function getStatusDescription() {
		return $this->statusDescription;
	}

	/**
	 * Задава статус на плащане, върнат от съответната система.
	 *
	 * @param string
	 */
	public function setStatusDescription($statusDescription) {
		$this->statusDescription = $statusDescription;
	}

	/**
	 * Връща дата на промяна на статуса, върнат от съответната система.
	 *
	 * @return string
	 */
	public function getStatusDate() {
		return $this->statusDate;
	}

	/**
	 * Задава дата на промяна на статуса, върнат от съответната система.
	 *
	 * @param string
	 */
	public function setStatusDate($statusDate) {
		$this->statusDate = $statusDate;
	}

	/**
	 * Връща номер на заявление.
	 *
	 * @return string
	 */
	public function getApplicationNumber() {
		return $this->applicationNumber;
	}

	/**
	 * Задава номер на заявление.
	 *
	 * @param string
	 */
	public function setApplicationNumber($applicationNumber) {
		$this->applicationNumber = $applicationNumber;
	}

	/**
	 * Връща плащане на задължение/лична сметка.
	 *
	 * @return int
	 */
	public function getPaymentType() {
		return $this->paymentType;
	}

	/**
	 * Задава плащане на задължение/лична сметка.
	 *
	 * @param int
	 */
	public function setPaymentType($paymentType) {
		$this->paymentType = $paymentType;
	}

	/**
	 * Име на регистър.
	 *
	 * @return string
	 */
	public function getRegisterName() {
		return $this->registerName;
	}

	/**
	 * Име на регистър.
	 *
	 * @param string
	 */
	public function setRegisterName($registerName) {
		$this->registerName = $registerName;
	}

	/**
	 * Задава отговор при изпращане на заявка към ПЕП на ДАЕУ.
	 *
	 * @param string
	 */
	public function setPepdaeuResponse($pepdaeuResponse) {
		$this->pepdaeuResponse = $pepdaeuResponse;
	}

	/**
	 * Връща отговор при изпращане на заявка към ПЕП на ДАЕУ.
	 *
	 * @return string
	 */
	public function getPepdaeuResponse() {
		return $this->pepdaeuResponse;
	}
}