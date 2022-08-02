<?php
namespace User\Entity;

/**
 * Лимит за услуга за предоставяне на данни
 *
 * @package User
 * @subpackage Entity
 */
class ServiceLimitEntity {

	/**
	 * Идентификатор на лимит.
	 *
	 * @var int
	 */
	protected $serviceLimitId;

	/**
	 * Идентификатор на версия на лимит.
	 *
	 * @var int
	 */
	protected $serviceLimitVerId;

	/**
	 * Код на услуга за предоставяне на данни.
	 *
	 * @var string
	 */
	protected $serviceCode;

	/**
	 * Наименование на услуга за предоставяне на данни.
	 *
	 * @var string
	 */
	protected $serviceName;

	/**
	 * Уникален идентификатор на портал/система.
	 *
	 * @var int
	 */
	protected $moduleId;

	/**
	 * Период от време.
	 *
	 * @var int
	 */
	protected $requestsInterval;

	/**
	 * Максимален брой заявки за периода от време.
	 *
	 * @var int
	 */
	protected $requestsNumber;

	/**
	 * Статус на лимит.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * Идентификатор на потребител направил последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Връща идентификатор на лимит.
	 *
	 * @return int
	 */
	public function getServiceLimitId() {
		return $this->serviceLimitId;
	}

	/**
	 * Задава идентификатор на лимит.
	 *
	 * @param int
	 */
	public function setServiceLimitId($serviceLimitId) {
		$this->serviceLimitId = $serviceLimitId;
	}

	/**
	 * Връща идентификатор на версия на лимит.
	 *
	 * @return int
	 */
	public function getServiceLimitVerId() {
		return $this->serviceLimitVerId;
	}

	/**
	 * Задава идентификатор на версия на лимит.
	 *
	 * @param int
	 */
	public function setServiceLimitVerId($serviceLimitVerId) {
		$this->serviceLimitVerId = $serviceLimitVerId;
	}

	/**
	 * Връща код на услуга за предоставяне на данни.
	 *
	 * @return string
	 */
	public function getServiceCode() {
		return $this->serviceCode;
	}

	/**
	 * Задава код на услуга за предоставяне на данни.
	 *
	 * @param string
	 */
	public function setServiceCode($serviceCode) {
		$this->serviceCode = $serviceCode;
	}

	/**
	 * Връща наименование на услуга за предоставяне на данни.
	 *
	 * @return string
	 */
	public function getServiceName() {
		return $this->serviceName;
	}

	/**
	 * Задава наименование на услуга за предоставяне на данни.
	 *
	 * @param string
	 */
	public function setServiceName($serviceName) {
		$this->serviceName = $serviceName;
	}

	/**
	 * Връща уникален идентификатор на портал/система.
	 *
	 * @return int
	 */
	public function getModuleId() {
		return $this->moduleId;
	}

	/**
	 * Задава уникален идентификатор на портал/система.
	 *
	 * @param int
	 */
	public function setModuleId($moduleId) {
		$this->moduleId = $moduleId;
	}

	/**
	 * Връща период от време.
	 *
	 * @return int
	 */
	public function getRequestsInterval() {
		return $this->requestsInterval;
	}

	/**
	 * Задава период от време.
	 *
	 * @param int
	 */
	public function setRequestsInterval($requestsInterval) {
		$this->requestsInterval = $requestsInterval;
	}

	/**
	 * Връща максимален брой заявки за периода от време.
	 *
	 * @return int
	 */
	public function getRequestsNumber() {
		return $this->requestsNumber;
	}

	/**
	 * Задава максимален брой заявки за периода от време.
	 *
	 * @param int
	 */
	public function setRequestsNumber($requestsNumber) {
		$this->requestsNumber = $requestsNumber;
	}

	/**
	 * Връща статус на лимит.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на лимит.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща идентификатор на потребител направил последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител направил последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща TIMESTAMP на последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}
}