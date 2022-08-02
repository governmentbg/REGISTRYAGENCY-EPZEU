<?php
namespace Payment\Entity;

/**
 * Регистрационни данни на АВ в ePay
 *
 * @package Payment
 * @subpackage Entity
 */
class RegistryAgencyEntity {


	/**
	 * КИН на АВ.
	 *
	 * @var string
	 */
	protected $cin;


	/**
	 * E-mail на АВ по регистрация.
	 *
	 * @var string
	 */
	protected $email;


	/**
	 * Буквено цифрова секретна дума генерирана от ePay.
	 *
	 * @var string
	 */
	protected $secretWord;


	/**
	 * Период на валидност на плащане.
	 *
	 * @var string
	 */
	protected $validityPeriod;


	/**
	 * Адрес за достъп.
	 *
	 * @var string
	 */
	protected $url;


	/**
	 * Адрес на услуги.
	 *
	 * @var string
	 */
	protected $urlServices;


	/**
	 * Адрес за уведомяване.
	 *
	 * @var string
	 */
	protected $urlResponse;


	/**
	 * Връща КИН на АВ.
	 *
	 * @return string
	 */
	public function getCin() {
		return $this->cin;
	}

	/**
	 * Задава КИН на АВ.
	 *
	 * @param string
	 */
	public function setCin($cin) {
		$this->cin = $cin;
	}

	/**
	 * Връща e-mail на АВ по регистрация.
	 *
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава e-mail на АВ по регистрация.
	 *
	 * @param string
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * Връща буквено цифрова секретна дума генерирана от ePay.
	 *
	 * @return string
	 */
	public function getSecretWord() {
		return $this->secretWord;
	}

	/**
	 * Задава буквено цифрова секретна дума генерирана от ePay.
	 *
	 * @param string
	 */
	public function setSecretWord($secretWord) {
		$this->secretWord = $secretWord;
	}

	/**
	 * Връща период на валидност на плащане.
	 *
	 * @return string
	 */
	public function getValidityPeriod() {
		return $this->validityPeriod;
	}

	/**
	 * Задава период на валидност на плащане.
	 *
	 * @param string
	 */
	public function setValidityPeriod($validityPeriod) {
		$this->validityPeriod = $validityPeriod;
	}

	/**
	 * Връща адрес за достъп.
	 *
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * Задава адрес за достъп.
	 *
	 * @param string
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	/**
	 * Задава адрес на услуги.
	 *
	 * @param string
	 */
	public function setUrlServices($urlServices) {
		$this->urlServices = $urlServices;
	}

	/**
	 * Връща адрес на услуги.
	 *
	 * @return string
	 */
	public function getUrlServices() {
		return $this->urlServices;
	}

	/**
	 * Връща адрес за уведомяване.
	 *
	 * @return string
	 */
	public function getUrlResponse() {
		return $this->urlResponse;
	}

	/**
	 * Задава адрес за уведомяване.
	 *
	 * @param string
	 */
	public function setUrlResponse($urlResponse) {
		$this->urlResponse = $urlResponse;
	}
}