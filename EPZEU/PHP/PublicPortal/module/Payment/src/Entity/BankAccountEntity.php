<?php
namespace Payment\Entity;

/**
 * Банкова сметка
 *
 * @package Payment
 * @subpackage Entity
 */
class BankAccountEntity {

	/**
	 * IBAN на АВ.
	 *
	 * @var string
	 */
	protected $iban;

	/**
	 * BIC на банката на АВ.
	 *
	 * @var string
	 */
	protected $bic;

	/**
	 * Регистър.
	 *
	 * @var string
	 */
	protected $register;

	/**
	 * Име на банка.
	 *
	 * @var string
	 */
	protected $bankName;


	/**
	 * Връща IBAN на АВ.
	 *
	 * @return string
	 */
	public function getIban() {
		return $this->iban;
	}

	/**
	 * Задава IBAN на АВ.
	 *
	 * @param string
	 */
	public function setIban($iban) {
		$this->iban = $iban;
	}

	/**
	 * Връща BIC на банката на АВ.
	 *
	 * @return string
	 */
	public function getBic() {
		return $this->bic;
	}

	/**
	 * Задава BIC на банката на АВ.
	 *
	 * @param string
	 */
	public function setBic($bic) {
		$this->bic = $bic;
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
	 * Връща име на банка.
	 *
	 * @return string
	 */
	public function getBankName() {
		return $this->bankName;
	}

	/**
	 * Задава име на банка.
	 *
	 * @param string
	 */
	public function setBankName($bankName) {
		$this->bankName = $bankName;
	}
}