<?php
namespace Statistic\Entity;

/**
 * Статистически отчет
 *
 * @package Statistic
 * @subpackage Entity
 */
class StatisticReportEntity extends StatisticEntity {

	/**
	 * Идентификатор на статистически отчети.
	 *
	 * @var int
	 */
	protected $statisticReportId;

	/**
	 * Дата на промяна на статус.
	 *
	 * @var int
	 */
	protected $dateChangeStatus;

	/**
	 * Наименование на документ.
	 *
	 * @var string
	 */
	protected $fileName;

	/**
	 * Размер на файла.
	 *
	 * @var string
	 */
	protected $fileSize;

	/**
	 * Тип на документа.
	 *
	 * @var string
	 */
	protected $contentType;

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
	 * Дата на зареждане на статистически отчет.
	 *
	 * @var string
	 */
	protected $createdOn;

	/**
	 * Дата на зареждане(прикачване) на статистически отчет.
	 *
	 * @var string
	 */
	protected $dateUpload;

	protected $fileContent;

	/**
	 * Връща идентификатор на статистически отчети.
	 *
	 * @return int
	 */
	public function getStatisticReportId() {
		return $this->statisticReportId;
	}

	/**
	 * Задава идентификатор на статистически отчети.
	 *
	 * @param int
	 */
	public function setStatisticReportId($statisticReportId) {
		$this->statisticReportId = $statisticReportId;
	}

	/**
	 * Връща дата на промяна на статус.
	 *
	 * @return int
	 */
	public function getDateChangeStatus() {
		return $this->dateChangeStatus;
	}

	/**
	 * Задава дата на промяна на статус.
	 *
	 * @param int
	 */
	public function setDateChangeStatus($dateChangeStatus) {
		$this->dateChangeStatus = $dateChangeStatus;
	}

	/**
	 * Връща наименование на документ.
	 *
	 * @return string
	 */
	public function getFileName() {
		return $this->fileName;
	}

	/**
	 * Задава наименование на документ.
	 *
	 * @param string
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	/**
	 * Връща размер на файла.
	 *
	 * @return string
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на файла.
	 *
	 * @param string
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

  /**
   * Връща дата на зареждане на статистически отчет.
   *
   * @return string
   */
  public function getCreatedOn(){
    return $this->createdOn;
  }

  /**
   * Задава дата на зареждане на статистически отчет.
   *
   * @param string $createdOn
   */
  public function setCreatedOn($createdOn){
    $this->createdOn = $createdOn;
  }


  /**
   * Връща дата на зареждане(прикачване) на статистически отчет.
   *
   * @return string
   */
  public function getDateUpload(){
    return $this->dateUpload;
  }

  /**
   * Задава дата на зареждане(прикачване) на статистически отчет.
   *
   * @param string
   */
  public function setDateUpload($dateUpload){
    $this->dateUpload = $dateUpload;
  }


  /**
   * Връща файлово съдържание на автоматично генериран статистически отчет.
   *
   * @return string
   */
  public function getFileContent(){
    return $this->fileContent;
  }

  /**
   * Задава файлово съдържание на автоматично генериран статистически отчет.
   *
   * @param string $fileContent
   */
  public function setFileContent($fileContent){
    $this->fileContent = $fileContent;
  }

}