<?php

namespace Content\Entity;

/**
 * Бюлетин
 *
 * @package Content
 * @subpackage Entity
 */
class BulletinEntity {


	/**
	 * Идентификатор на бюлетин.
	 *
	 * @var int
	 */
	protected $bulletinId;


	/**
	 * Дата от на бюлетин.
	 *
	 * @var string
	 */
	protected $dateFrom;


	/**
	 * Дата до на бюлетин.
	 *
	 * @var string
	 */
	protected $dateTo;


	/**
	 * Статус на бюлетин.
	 *
	 * @var int
	 */
	protected $status;


	/**
	 * Наименование на документ на бюлетин.
	 *
	 * @var string
	 */
	protected $fileName;

	/**
	 * Дата на промяна на бюлетин.
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
	 * Връща идентификатор на бюлетин.
	 *
	 * @return int
	 */
	public function getBulletinId() {
		return $this->bulletinId;
	}

	/**
	 * Задава идентификатор на бюлетин.
	 *
	 * @param int $bulletinId
	 */
	public function setBulletinId($bulletinId) {
		$this->bulletinId = $bulletinId;
	}

	/**
	 * Връща дата от на бюлетин.
	 *
	 * @return string
	 */
	public function getDateFrom() {
		return $this->dateFrom;
	}

	/**
	 * Задава дата от на бюлетин.
	 *
	 * @param string $dateFrom
	 */
	public function setDateFrom($dateFrom) {
		$this->dateFrom = $dateFrom;
	}

	/**
	 * Връща дата до на бюлетин.
	 *
	 * @return string
	 */
	public function getDateTo() {
		return $this->dateTo;
	}

	/**
	 * Задава дата до на бюлетин.
	 *
	 * @param string $dateTo
	 */
	public function setDateTo($dateTo) {
		$this->dateTo = $dateTo;
	}

	/**
	 * Връща статус на бюлетин.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на бюлетин.
	 *
	 * @param int $status
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща наименование на документ на бюлетин.
	 *
	 * @return string
	 */
	public function getFileName() {
		return $this->fileName;
	}

	/**
	 * Задава наименование на документ на бюлетин.
	 *
	 * @param string $fileName
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	/**
	 * Връща дата на промяна на бюлетин.
	 *
	 * @return string
	 */
	public function getUpdatedOn(){
		return $this->updatedOn;
	}

	/**
	 * Задава дата на промяна на бюлетин.
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