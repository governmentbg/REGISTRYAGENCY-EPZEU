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
	 * Размер на файла.
	 * @var int
	 */
	protected $fileSize;

	/**
	 * Тип на документа.
	 * @var string
	 */
	protected $contentType;

	/**
	 * Съдържание на документ.
	 * @var string
	 */
	protected $content;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Масив с файлове.
	 * @var array
	 */
	protected $files;

	/**
	 * Масив с файлове за изтриване.
	 * @var array
	 */
	protected $deletedFiles;


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
	 * @param int
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
	 * @param string
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
	 * @param string
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
	 * @param int
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
	 * @param string
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}


	/**
	 * Връща размер на файла.
	 *
	 * @return int
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на файла.
	 *
	 * @param int
	 */
	public function setFileSize($fileSize) {
		$this->fileSize = $fileSize;
	}

	/**
	 * Връща тип на документа.
	 *
	 * @return string
	 */
	public function getContentType() {
		return $this->contentType;
	}

	/**
	 * Задава тип на документа.
	 *
	 * @param string
	 */
	public function setContentType($contentType) {
		$this->contentType = $contentType;
	}

	/**
	 * Връща $content
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава $content
	 *
	 * @param string
	 */
	public function setContent($content) {
		$this->content = $content;
	}

	/**
	 * Връща tIMESTAMP на последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава tIMESTAMP на последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща масив с файлове.
	 *
	 * @return array
	 */
	public function getFiles() {
		return $this->files;
	}

	/**
	 * Задава масив с файлове.
	 *
	 * @param array
	 */
	public function setFiles($files) {
		$this->files = $files;
	}

	/**
	 * Връща масив с файлове за изтриване.
	 *
	 * @return array
	 */
	public function getDeletedFiles() {
		return $this->deletedFiles;
	}

	/**
	 * Задава масив с файлове за изтриване.
	 *
	 * @param array
	 */
	public function setDeletedFiles($deletedFiles) {
		$this->deletedFiles = $deletedFiles;
	}
}