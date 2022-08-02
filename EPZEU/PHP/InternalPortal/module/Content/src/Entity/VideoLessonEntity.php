<?php
namespace Content\Entity;

/**
 * Видео урок
 *
 * @package Content
 * @subpackage Entity
 */
class VideoLessonEntity {


	/**
	 * Идентификатор на видео урок.
	 *
	 * @var int
	 */
	protected $lessonId;


	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;


	/**
	 * Заглавие на видео урок.
	 *
	 * @var string
	 */
	protected $title;


	/**
	 * Описание на видео урок.
	 *
	 * @var string
	 */
	protected $description;


	/**
	 * Наименование на файл на видео урок.
	 *
	 * @var string
	 */
	protected $fileName;


	/**
	 * Статус на видео урок.
	 *
	 * @var bool
	 */
	protected $status;

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
	 * Дата и час на редакцията.
	 *
	 * @var string
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
	 * Заглавие на видео урок на съответния език.
	 *
	 * @var string
	 */
	protected $titleI18n;

	/**
	 * Описание на видео урок на съответния език.
	 *
	 * @var string
	 */
	protected $descriptionI18n;

	/**
	 * Наименование на файл на видео урок на съответния език.
	 *
	 * @var string
	 */
	protected $fileNameI18n;

	/**
	 * Размер на файл на съответния език.
	 *
	 * @var int
	 */
	protected $fileSizeI18n;

	/**
	 * Тип на файл на съответния език.
	 *
	 * @var string
	 */
	protected $contentTypeI18n;

	/**
	 * Флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @var int
	 */
	protected $isTranslated;

	/**
	 * Връща идентификатор на видео урок.
	 *
	 * @return int
	 */
	public function getLessonId() {
		return $this->lessonId;
	}

	/**
	 * Задава идентификатор на видео урок.
	 *
	 * @param int
	 */
	public function setLessonId($lessonId) {
		$this->lessonId = $lessonId;
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
	 * Връща заглавие на видео урок.
	 *
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * Задава заглавие на видео урок.
	 *
	 * @param string
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща описание на видео урок.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава описание на видео урок.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Връща наименование на файл на видео урок.
	 *
	 * @return string
	 */
	public function getFileName() {
		return $this->fileName;
	}

	/**
	 * Задава наименование на файл на видео урок.
	 *
	 * @param string
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	/**
	 * Връща статус на видео урок.
	 *
	 * @return bool
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на видео урок.
	 *
	 * @param bool
	 */
	public function setStatus($status) {
		$this->status = $status;
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

	/**
	 * Връща дата и час на редакцията.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на редакцията.
	 *
	 * @param string
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

	/**
	 * Връща заглавие на видео урок на съответния език.
	 *
	 * @return string
	 */
	public function getTitleI18n() {
		return $this->titleI18n;
	}

	/**
	 * Задава заглавие на видео урок на съответния език.
	 *
	 * @param string
	 */
	public function setTitleI18n($titleI18n) {
		$this->titleI18n = $titleI18n;
	}

	/**
	 * Връща описание на видео урок на съответния език.
	 *
	 * @return string
	 */
	public function getDescriptionI18n() {
		return $this->descriptionI18n;
	}

	/**
	 * Задава описание на видео урок на съответния език.
	 *
	 * @param string
	 */
	public function setDescriptionI18n($descriptionI18n) {
		$this->descriptionI18n = $descriptionI18n;
	}

	/**
	 * Връща наименование на файл на видео урок на съответния език.
	 *
	 * @return string
	 */
	public function getFileNameI18n() {
		return $this->fileNameI18n;
	}

	/**
	 * Задава наименование на файл на видео урок на съответния език.
	 *
	 * @param string
	 */
	public function setFileNameI18n($fileNameI18n) {
		$this->fileNameI18n = $fileNameI18n;
	}

	/**
	 * Връща размер на файл на съответния език.
	 *
	 * @return int
	 */
	public function getFileSizeI18n() {
		return $this->fileSizeI18n;
	}

	/**
	 * Задава размер на файл на съответния език.
	 *
	 * @param int
	 */
	public function setFileSizeI18n($fileSizeI18n) {
		$this->fileSizeI18n = $fileSizeI18n;
	}

	/**
	 * Връща тип на файл на съответния език.
	 *
	 * @return string
	 */
	public function getContentTypeI18n() {
		return $this->contentTypeI18n;
	}

	/**
	 * Задава тип на файл на съответния език.
	 *
	 * @param string
	 */
	public function setContentTypeI18n($contentTypeI18n) {
		$this->contentTypeI18n = $contentTypeI18n;
	}

	/**
	 * Връща флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @return int
	 */
	public function getIsTranslated() {
		return $this->isTranslated;
	}

	/**
	 * Задава флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @param int
	 */
	public function setIsTranslated($isTranslated) {
		$this->isTranslated = $isTranslated;
	}
}