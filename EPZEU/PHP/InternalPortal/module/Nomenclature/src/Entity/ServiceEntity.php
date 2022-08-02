<?php
namespace Nomenclature\Entity;

/**
 * Услуга
 *
 * @package Nomenclature
 * @subpackage Entity
 */
class ServiceEntity {

	/**
	 * Идентификатор на услуга.
	 *
	 * @var int
	 */
	protected $serviceId;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;

	/**
	 * Номер на услуга от ИИСДА.
	 *
	 * @var int
	 */
	protected $iisdaServiceId;

	/**
	 * Заявление.
	 *
	 * @var int
	 */
	protected $appTypeId;

	/**
	 * Масив с видове услуги.
	 *
	 * @var array
	 */
	protected $serviceTypeIds;

	/**
	 * Масив с видове плащания по електронен път.
	 *
	 * @var array
	 */
	protected $paymentTypeIds;

	/**
	 * Дата на промяна на статуса.
	 *
	 * @var string
	 */
	protected $statusDate;

	/**
	 * Час на промяна на статуса.
	 *
	 * @var string
	 */
	protected $statusTime;

	/**
	 * Статус.
	 *
	 * @var bool
	 */
	protected $status;

	/**
	 * Предстояща дата, от която статусът на услугата  се променя.
	 *
	 * @var string
	 */
	protected $pendingStatusDate;

	/**
	 * Предстоящ статус.
	 *
	 * @var bool
	 */
	protected $pendingStatus;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Наименование на услугата.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * HTML описание на услугата.
	 *
	 * @var string
	 */
	protected $description;

	/**
	 * Кратко описание на услугата.
	 *
	 * @var string
	 */
	protected $shortDescription;

	/**
	 * Флаг, указващ дали услугата е административна или не.
	 *
	 * @var bool
	 */
	protected $isAdm;

	/**
	 * Наименование на услугата на съответния език.
	 *
	 * @var unknown
	 */
	protected $nameI18n;

	/**
	 * HTML описание на услугата на съответния език.
	 *
	 * @var string
	 */
	protected $descriptionI18n;

	/**
	 * Кратко описание на услугата на съответния език.
	 *
	 * @var string
	 */
	protected $shortDescriptionI18n;

	/**
	 * Флаг, указващ дали има превод на съответния език.
	 *
	 * @var bool
	 */
	protected $isTranslated;

	/**
	 * Номер на услугата.
	 *
	 * @var int
	 */
	protected $serviceNumber;

	/**
	 * Задава дата на прочитане на услугата.
	 *
	 * @var string $readDate
	 */
	protected $readDate;

	/**
	 * Задава идентификатор за предоставянето на услугата.
	 *
	 * @var bool
	 */
	protected $isDiscontinued;

	/**
	 * Задава идентификатор електронно плащане.
	 *
	 * @var int
	 */
	protected $hasEpayment;

	/**
	 * Връща идентификатор на услуга.
	 *
	 * @return int
	 */
	public function getServiceId() {
		return $this->serviceId;
	}

	/**
	 * Задава идентификатор на услуга.
	 *
	 * @param int
	 */
	public function setServiceId($serviceId) {
		$this->serviceId = $serviceId;
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
	 * Задава идентификатор на регистър.
	 *
	 * @param int
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща номер на услуга от ИИСДА.
	 *
	 * @return int
	 */
	public function getIisdaServiceId() {
		return $this->iisdaServiceId;
	}

	/**
	 * Задава номер на услуга от ИИСДА.
	 *
	 * @param int
	 */
	public function setIisdaServiceId($iisdaServiceId) {
		$this->iisdaServiceId = $iisdaServiceId;
	}

	/**
	 * Връща заявление.
	 *
	 * @return int
	 */
	public function getAppTypeId() {
		return $this->appTypeId;
	}

	/**
	 * Задава заявление.
	 *
	 * @param int
	 */
	public function setAppTypeId($appTypeId) {
		$this->appTypeId = $appTypeId;
	}

	/**
	 * Връща масив с видове услуги.
	 *
	 * @return array
	 */
	public function getServiceTypeIds() {
		return $this->serviceTypeIds;
	}

	/**
	 * Задава масив с видове услуги.
	 *
	 * @param array
	 */
	public function setServiceTypeIds($serviceTypeIds) {
		$serviceTypeIds = str_replace(['{', '}'], '', $serviceTypeIds);
		$this->serviceTypeIds = (!empty($serviceTypeIds) && !is_array($serviceTypeIds)) ? explode(',', $serviceTypeIds): $serviceTypeIds;
	}

	/**
	 * Връща масив с видове плащания по електронен път.
	 *
	 * @return array
	 */
	public function getPaymentTypeIds() {
		return $this->paymentTypeIds;
	}

	/**
	 * Задава масив с видове плащания по електронен път.
	 *
	 * @param array
	 */
	public function setPaymentTypeIds($paymentTypeIds) {
		$paymentTypeIds = str_replace(['{', '}'], '', $paymentTypeIds);
		$this->paymentTypeIds = (!empty($paymentTypeIds) && !is_array($paymentTypeIds)) ? explode(',', $paymentTypeIds) : $paymentTypeIds;
	}

	/**
	 * Връща дата на промяна на статуса.
	 *
	 * @return string
	 */
	public function getStatusDate() {
		return $this->statusDate;
	}

	/**
	 * Задава дата на промяна на статуса.
	 *
	 * @param string
	 */
	public function setStatusDate($statusDate) {
		$this->statusDate = $statusDate;
	}

	/**
	 * Връща час на промяна на статуса.
	 *
	 * @return string
	 */
	public function getStatusTime() {
		return $this->statusTime;
	}

	/**
	 * Задава час на промяна на статуса.
	 *
	 * @param string
	 */
	public function setStatusTime($statusTime) {
		$this->statusTime = $statusTime;
	}

	/**
	 * Връща статус.
	 *
	 * @return bool
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус.
	 *
	 * @param bool
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща предстояща дата, от която статусът на услугата  се променя..
	 *
	 * @return string
	 */
	public function getPendingStatusDate() {
		return $this->pendingStatusDate;
	}

	/**
	 * Задава предстояща дата, от която статусът на услугата  се променя..
	 *
	 * @param string
	 */
	public function setPendingStatusDate($pendingStatusDate) {
		$this->pendingStatusDate = $pendingStatusDate;
	}

	/**
	 * Връща предстоящ статус.
	 *
	 * @return bool
	 */
	public function getPendingStatus() {
		return $this->pendingStatus;
	}

	/**
	 * Задава предстоящ статус.
	 *
	 * @param bool
	 */
	public function setPendingStatus($pendingStatus) {
		$this->pendingStatus = $pendingStatus;
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

	/**
	 * Връща наименование на услугата.
	 *
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Задава наименование на услугата.
	 *
	 * @param string
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Връща hTML описание на услугата.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава hTML описание на услугата.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Връща кратко описание на услугата.
	 *
	 * @return string
	 */
	public function getShortDescription() {
		return $this->shortDescription;
	}

	/**
	 * Задава кратко описание на услугата.
	 *
	 * @param string
	 */
	public function setShortDescription($shortDescription) {
		$this->shortDescription = $shortDescription;
	}

	/**
	 * Връща флаг, указващ дали услугата е административна или не.
	 *
	 * @return bool
	 */
	public function getIsAdm() {
		return $this->isAdm;
	}

	/**
	 * Задава флаг, указващ дали услугата е административна или не.
	 *
	 * @param bool
	 */
	public function setIsAdm($isAdm) {
		$this->isAdm = $isAdm;
	}

	/**
	 * Връща наименование на услугата на съответния език.
	 *
	 * @return unknown
	 */
	public function getNameI18n() {
		return $this->nameI18n;
	}

	/**
	 * Задава наименование на услугата на съответния език.
	 *
	 * @param unknown
	 */
	public function setNameI18n($nameI18n) {
		$this->nameI18n = $nameI18n;
	}

	/**
	 * Връща hTML описание на услугата на съответния език.
	 *
	 * @return string
	 */
	public function getDescriptionI18n() {
		return $this->descriptionI18n;
	}

	/**
	 * Задава hTML описание на услугата на съответния език.
	 *
	 * @param string
	 */
	public function setDescriptionI18n($descriptionI18n) {
		$this->descriptionI18n = $descriptionI18n;
	}

	/**
	 * Връща кратко описание на услугата на съответния език.
	 *
	 * @return string
	 */
	public function getShortDescriptionI18n() {
		return $this->shortDescriptionI18n;
	}

	/**
	 * Задава кратко описание на услугата на съответния език.
	 *
	 * @param string
	 */
	public function setShortDescriptionI18n($shortDescriptionI18n) {
		$this->shortDescriptionI18n = $shortDescriptionI18n;
	}

	/**
	 * Връща флаг, указващ дали има превод на съответния език.
	 *
	 * @return bool
	 */
	public function getIsTranslated() {
		return $this->isTranslated;
	}

	/**
	 * Задава флаг, указващ дали има превод на съответния език.
	 *
	 * @param bool
	 */
	public function setIsTranslated($isTranslated) {
		$this->isTranslated = $isTranslated;
	}

	/**
	 * Връща номер на услугата.
	 *
	 * @return int
	 */
	public function getServiceNumber() {
		return $this->serviceNumber;
	}

	/**
	 * Задава номер на услугата.
	 *
	 * @param int
	 */
	public function setServiceNumber($serviceNumber) {
		$this->serviceNumber = $serviceNumber;
	}

	/**
	 * Връща $readDate
	 *
	 * @return string
	 */
	public function getReadDate() {
		return $this->readDate;
	}

	/**
	 * Задава $readDate
	 *
	 * @param string
	 */
	public function setReadDate($readDate) {
		$this->readDate = $readDate;
	}

	/**
	 * Връща задава идентификатор за предоставянето на услугата.
	 *
	 * @return bool
	 */
	public function getIsDiscontinued() {
		return $this->isDiscontinued;
	}

	/**
	 * Задава задава идентификатор за предоставянето на услугата.
	 *
	 * @param bool
	 */
	public function setIsDiscontinued($isDiscontinued) {
		$this->isDiscontinued = $isDiscontinued;
	}

	/**
	 * Връща задава идентификатор електронно плащане.
	 *
	 * @return int
	 */
	public function getHasEpayment() {
		return $this->hasEpayment;
	}

	/**
	 * Задава задава идентификатор електронно плащане.
	 *
	 * @param int
	 */
	public function setHasEpayment($hasEpayment) {
		$this->hasEpayment = $hasEpayment;
	}
}