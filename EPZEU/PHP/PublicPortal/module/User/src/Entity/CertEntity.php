<?php

namespace User\Entity;

/**
 * Сертификат
 *
 * @package User
 * @subpackage Entity
 */
class CertEntity {

	/**
	 * Уникален идентификатор на сертификат.
	 *
	 * @var int
	 */
	protected $certificateId;

	/**
	 * Уникален идентификатор на автентикация.
	 *
	 * @var int
	 */
	protected $authenticationId;

	/**
	 * Сериен номер на сертификат.
	 *
	 * @var string
	 */
	protected $serialNumber;

	/**
	 * Издател.
	 *
	 * @var string
	 */
	protected $issuer;

	/**
	 * Допълнителна информация.
	 *
	 * @var string
	 */
	protected $subject;

	/**
	 * Начална дата на валидност.
	 *
	 * @var string
	 */
	protected $notAfter;

	/**
	 * Крайна дата на валидност.
	 *
	 * @var string
	 */
	protected $notBefore;

	/**
	 * Хеш на сертификата.
	 *
	 * @var string
	 */
	protected $certHash;

	/**
	 * Съдържание.
	 *
	 * @var string
	 */
	protected $content;

	/**
	 * Връща уникален идентификатор на сертификат.
	 *
	 * @return int
	 */
	public function getCertificateId() {
		return $this->certificateId;
	}

	/**
	 * Задава уникален идентификатор на сертификат.
	 *
	 * @param int
	 */
	public function setCertificateId($certificateId) {
		$this->certificateId = $certificateId;
	}

	/**
	 * Връща сериен номер на сертификат.
	 *
	 * @return string
	 */
	public function getSerialNumber() {
		return $this->serialNumber;
	}

	/**
	 * Задава сериен номер на сертификат.
	 *
	 * @param string
	 */
	public function setSerialNumber($serialNumber) {
		$this->serialNumber = $serialNumber;
	}

	/**
	 * Връща издател.
	 *
	 * @return string
	 */
	public function getIssuer() {
		return $this->issuer;
	}

	/**
	 * Задава издател.
	 *
	 * @param string
	 */
	public function setIssuer($issuer) {
		$this->issuer = $issuer;
	}

	/**
	 * Връща допълнителна информация.
	 *
	 * @return string
	 */
	public function getSubject() {
		return $this->subject;
	}

	/**
	 * Задава допълнителна информация.
	 *
	 * @param string
	 */
	public function setSubject($subject) {
		$this->subject = $subject;
	}

	/**
	 * Връща начална дата на валидност.
	 *
	 * @return string
	 */
	public function getNotAfter() {
		return $this->notAfter;
	}

	/**
	 * Задава начална дата на валидност.
	 *
	 * @param string
	 */
	public function setNotAfter($notAfter) {
		$this->notAfter = $notAfter;
	}

	/**
	 * Връща крайна дата на валидност.
	 *
	 * @return string
	 */
	public function getNotBefore() {
		return $this->notBefore;
	}

	/**
	 * Задава крайна дата на валидност.
	 *
	 * @param string
	 */
	public function setNotBefore($notBefore) {
		$this->notBefore = $notBefore;
	}

	/**
	 * Връща хеш на сертификата.
	 *
	 * @return string
	 */
	public function getCertHash() {
		return $this->certHash;
	}

	/**
	 * Задава хеш на сертификата.
	 *
	 * @param string
	 */
	public function setCertHash($certHash) {
		$this->certHash = $certHash;
	}

	/**
	 * Връща съдържание.
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава съдържание.
	 *
	 * @param string
	 */
	public function setContent($content) {
		$this->content = $content;
	}

  /**
   * Връща уникален идентификатор на автентикация.
   *
   * @return int
   */
  public function getAuthenticationId(){
    return $this->authenticationId;
  }

  /**
   * Задава уникален идентификатор на автентикация.
   *
   * @param int
   */
  public function setAuthenticationId($authenticationId){
    $this->authenticationId = $authenticationId;
  }

}