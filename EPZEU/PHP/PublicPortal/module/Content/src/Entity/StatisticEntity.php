<?php
namespace Content\Entity;

/**
 * Статистика
 *
 * @package Content
 * @subpackage Entity
 */
class StatisticEntity {

	protected $statisticId;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;

	/**
	 * Наименование на статистика.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Начина на генериране на отчет.
	 *
	 * @var int
	 */
	protected $typeGenarate;

	/**
	 * Адрес на услугата.
	 *
	 * @var string
	 */
	protected $url;

	/**
	 * Начална дата на периода на последен статистически отчет.
	 *
	 * @var string
	 */
	protected $dateFrom;

	/**
	 * Крайна дата на периода на последен статистически отчет.
	 *
	 * @var string
	 */
	protected $dateTo;

	/**
	 * Статус на последен отчет.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * Брой елементи на статистически отчети.
	 *
	 * @var int
	 */
	protected $elementCount;


	/**
	 * Дата на промяна на статистически отчет.
	 *
	 * @var string
	 */
	protected $updatedOn;

	/**
	 * Размер на файл.
	 *
	 * @var int
	 */
	protected $fileSize;

	/**
	 * Тип на файл.
	 *
	 * @var string
	 */
	protected $contentType;

	/**
	 * Връща the value of statisticId
	 *
	 * @return mixed
	 */
	public function getStatisticId() {
		return $this->statisticId;
	}

	/**
	 * Задава the value of statisticId
	 *
	 * @param mixed
	 */
	public function setStatisticId($statisticId) {
		$this->statisticId = $statisticId;
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
	 * Връща наименование на статистика.
	 *
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Задава наименование на статистика.
	 *
	 * @param string
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Връща начина на генериране на отчет.
	 *
	 * @return int
	 */
	public function getTypeGenarate() {
		return $this->typeGenarate;
	}

	/**
	 * Задава начина на генериране на отчет.
	 *
	 * @param int
	 */
	public function setTypeGenarate($typeGenarate) {
		$this->typeGenarate = $typeGenarate;
	}

	/**
	 * Връща адрес на услугата.
	 *
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * Задава адрес на услугата.
	 *
	 * @param string
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	/**
	 * Връща начална дата на периода на последен статистически отчет.
	 *
	 * @return string
	 */
	public function getDateFrom() {
		return $this->dateFrom;
	}

	/**
	 * Задава начална дата на периода на последен статистически отчет.
	 *
	 * @param string
	 */
	public function setDateFrom($dateFrom) {
		$this->dateFrom = $dateFrom;
	}

	/**
	 * Връща крайна дата на периода на последен статистически отчет.
	 *
	 * @return string
	 */
	public function getDateTo() {
		return $this->dateTo;
	}

	/**
	 * Задава крайна дата на периода на последен статистически отчет.
	 *
	 * @param string
	 */
	public function setDateTo($dateTo) {
		$this->dateTo = $dateTo;
	}

	/**
	 * Връща статус на последен отчет.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на последен отчет.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща брой елементи на статистически отчети.
	 *
	 * @return int
	 */
	public function getElementCount() {
		return $this->elementCount;
	}

	/**
	 * Задава брой елементи на статистически отчети.
	 *
	 * @param int $elementCount
	 */
	public function setElementCount($elementCount) {
		$this->elementCount = $elementCount;
	}

	/**
	 * Връща дата на промяна.
	 *
	 * @return string
	 */
	public function getUpdatedOn(){
		return $this->updatedOn;
	}

	/**
	 * Задава дата на промяна.
	 *
	 * @param string $updatedOn
	 */
	public function setUpdatedOn($updatedOn){
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща размер на файл.
	 *
	 * @return int
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на файл.
	 *
	 * @param int
	 */
	public function setFileSize($fileSize) {
		$this->fileSize = $fileSize;
	}

	/**
	 * Връща тип на файл.
	 *
	 * @return string
	 */
	public function getContentType() {
		return $this->contentType;
	}

	/**
	 * Задава тип на файл.
	 *
	 * @param string
	 */
	public function setContentType($contentType) {
		$this->contentType = $contentType;
	}


}