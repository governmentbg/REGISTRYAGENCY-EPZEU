<?php
namespace User\Entity;

/**
 * Процес на потребителски профил
 *
 * @package User
 * @subpackage Entity
 */
class ApplicationEntity {

	/**
	 * Идентификатор на заявление.
	 *
	 * @var int
	 */
	protected $applicationId;

	/**
	 * Идентификатор на клиентски идентификационен номер на потребителя подал заявление.
	 *
	 * @var int
	 */
	protected $applicantCin;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $register;

	/**
	 * Идентификатор на тип на заявление.
	 *
	 * @var int
	 */
	protected $applicationTypeId;

	/**
	 * Входящ номер на заявление.
	 *
	 * @var int
	 */
	protected $incomingNumber;

	/**
	 * Дата на входиране на заявление.
	 *
	 * @var string
	 */
	protected $registrationDate;

	/**
	 * URL адрес за преглед на заявление.
	 *
	 * @var string
	 */
	protected $applicationDisplayUrl;

	/**
	 * HTML резултат от изпълнението на заявлението.
	 *
	 * @var string
	 */
	protected $resultHtml;

	/**
	 * Дата на създаване/последна редакция на чернова.
	 *
	 * @var string
	 */
	protected $draftDate;

	/**
	 * Връща идентификатор на заявление.
	 *
	 * @return int
	 */
	public function getАpplicationId() {
		return $this->applicationId;
	}

	/**
	 * Задава идентификатор на заявление.
	 *
	 * @param int
	 */
	public function setApplicationId($applicationId) {
		$this->applicationId = $applicationId;
	}

	/**
	 * Връща идентификатор на клиентски идентификационен номер на потребителя подал заявление.
	 *
	 * @return int
	 */
	public function getApplicantCin() {
		return $this->applicantCin;
	}

	/**
	 * Задава идентификатор на клиентски идентификационен номер на потребителя подал заявление.
	 *
	 * @param int
	 */
	public function setApplicantCin($applicantCin) {
		$this->applicantCin = $applicantCin;
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
	 * Връща идентификатор на тип на заявление.
	 *
	 * @return int
	 */
	public function getApplicationTypeId() {
		return $this->applicationTypeId;
	}

	/**
	 * Задава идентификатор на тип на заявление.
	 *
	 * @param int
	 */
	public function setApplicationTypeId($applicationTypeId) {
		$this->applicationTypeId = $applicationTypeId;
	}

	/**
	 * Връща входящ номер на заявление.
	 *
	 * @return int
	 */
	public function getIncomingNumber() {
		return $this->incomingNumber;
	}

	/**
	 * Задава входящ номер на заявление.
	 *
	 * @param int
	 */
	public function setIncomingNumber($incomingNumber) {
		$this->incomingNumber = $incomingNumber;
	}

	/**
	 * Връща дата на входиране на заявление.
	 *
	 * @return string
	 */
	public function getRegistrationDate() {
		return $this->registrationDate;
	}

	/**
	 * Задава дата на входиране на заявление.
	 *
	 * @param string
	 */
	public function setRegistrationDate($registrationDate) {
		$this->registrationDate = $registrationDate;
	}

	/**
	 * Връща URL адрес за преглед на заявление.
	 *
	 * @return string
	 */
	public function getApplicationDisplayUrl() {
		return $this->applicationDisplayUrl;
	}

	/**
	 * Задава URL адрес за преглед на заявление.
	 *
	 * @param string
	 */
	public function setApplicationDisplayUrl($applicationDisplayUrl) {
		$this->applicationDisplayUrl = $applicationDisplayUrl;
	}

	/**
	 * Връща HTML резултат от изпълнението на заявлението.
	 *
	 * @return string
	 */
	public function getResultHTML() {
		return $this->resultHtml;
	}

	/**
	 * Задава HTML резултат от изпълнението на заявлението.
	 *
	 * @param string
	 */
	public function setResultHtml($resultHtml) {
		$this->resultHtml = $resultHtml;
	}

	/**
	 * Връща дата на създаване/последна редакция на чернова.
	 *
	 * @return string
	 */
	public function getDraftDate() {
		return $this->draftDate;
	}

	/**
	 * Задава дата на създаване/последна редакция на чернова.
	 *
	 * @param string
	 */
	public function setDraftDate($draftDate) {
		$this->draftDate = $draftDate;
	}
}