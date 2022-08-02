<?php

namespace Content\Entity;

/**
 * Новина
 *
 * @package Content
 * @subpackage Entity
 */
class NewsEntity {

	/**
	 * Идентификатор на новина.
	 *
	 * @var int
	 */
	protected $newsId;


	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;


	/**
	 * Заглавие на новина.
	 *
	 * @var string
	 */
	protected $title;


	/**
	 * Кратко описание на новина.
	 *
	 * @var string
	 */
	protected $shortDescription;


	/**
	 * Форматирано HTML съдържание на новина.
	 *
	 * @var string
	 */
	protected $description;


	/**
	 * Дата, от която е новината.
	 *
	 * @var string
	 */
	protected $newsDate;

	/**
	 * Флаг, указващ дали новината е маркирана като гореща.
	 *
	 * @var bool
	 */
	protected $isHotNews;


	/**
	 * Наименование на файл за изображение на новина.
	 *
	 * @var string
	 */
	protected $fileName;


	/**
	 * Списък с прикачени документи на новина.
	 *
	 * @var array
	 */
	protected $files = [];

	/**
	 * Дата от която е новината.
	 *
	 * @var string
	 */
	protected $newsTime;


	/**
	 * Изображение към заглавието.
	 *
	 * @var string
	 */
	protected $image;


	/**
	 * Дата на публикуване.
	 *
	 * @var string
	 */
	protected $publicationDate;


	/**
	 * Час на публикуване.
	 *
	 * @var string
	 */
	protected $publicationTime;


	/**
	 * Дата на изтичане.
	 *
	 * @var string
	 */
	protected $expirationDate;

	/**
	 * Час на изтичане.
	 *
	 * @var string
	 */
	protected $expirationTime;


	/**
	 * Статус на новина.
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
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Размер на файл за изображение.
	 *
	 * @var int
	 */
	protected $fileSize;


	/**
	 * Тип на файл за изображение.
	 *
	 * @var string
	 */
	protected $contentType;


	/**
	 * Заглавие на новина на съответния език.
	 *
	 * @var string
	 */
	protected $titleI18n;


	/**
	 * Форматирано HTML съдържание на новина на съответния език.
	 *
	 * @var string
	 */
	protected $descriptionI18n;


	/**
	 * Кратко описание на съответния език.
	 *
	 * @var string
	 */
	protected $shortDescriptionI18n;


	/**
	 * Флаг, указващ дали има превод на съответния език.
	 * @var bool
	 */
	protected $isTranslated;


	/**
	 * Масив с файлове за изтриване.
	 *
	 * @var array
	 */
	protected $deletedFiles = [];


	/**
	 * Масив с изображения.
	 *
	 * @var array
	 */
	protected $images = [];


	/**
	 * Масив с изображения за изтриване.
	 *
	 * @var array
	 */
	protected $deletedImages = [];

	/**
	 * Връща идентификатор на новина.
	 *
	 * @return int
	 */
	public function getNewsId() {
		return $this->newsId;
	}

	/**
	 * Задава идентификатор на новина.
	 *
	 * @param int
	 */
	public function setNewsId($newsId) {
		$this->newsId = $newsId;
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
	 * Връща заглавие на новина.
	 *
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * Задава заглавие на новина.
	 *
	 * @param string
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща кратко описание на новина.
	 *
	 * @return string
	 */
	public function getShortDescription() {
		return $this->shortDescription;
	}

	/**
	 * Задава кратко описание на новина.
	 *
	 * @param string
	 */
	public function setShortDescription($shortDescription) {
		$this->shortDescription = $shortDescription;
	}

	/**
	 * Връща форматирано HTML съдържание на новина.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава форматирано HTML съдържание на новина.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Връща дата, от която е новината.
	 *
	 * @return string
	 */
	public function getNewsDate() {
		return $this->newsDate;
	}

	/**
	 * Задава дата, от която е новината.
	 *
	 * @param string
	 */
	public function setNewsDate($newsDate) {
		$this->newsDate = $newsDate;
	}

	/**
	 * Връща флаг, указващ дали новината е маркирана като гореща.
	 *
	 * @return bool
	 */
	public function getIsHotNews() {
		return $this->isHotNews;
	}

	/**
	 * Задава флаг, указващ дали новината е маркирана като гореща.
	 *
	 * @param bool
	 */
	public function setIsHotNews($isHotNews) {
		$this->isHotNews = $isHotNews;
	}

	/**
	 * Връща наименование на файл за изображение на новина.
	 *
	 * @return string
	 */
	public function getFileName() {
		return $this->fileName;
	}

	/**
	 * Задава наименование на файл за изображение на новина.
	 *
	 * @param string
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	/**
	 * Връща списък с прикачени документи на новина.
	 *
	 * @return array
	 */
	public function getFiles() {
		return $this->files;
	}

	/**
	 * Задава списък с прикачени документи на новина.
	 *
	 * @param array
	 */
	public function setFiles($files) {
		$this->files = $files;
	}

	/**
	 * Връща дата от която е новината.
	 *
	 * @return string
	 */
	public function getNewsTime() {
		return $this->newsTime;
	}

	/**
	 * Задава дата от която е новината.
	 *
	 * @param string
	 */
	public function setNewsTime($newsTime) {
		$this->newsTime = $newsTime;
	}

	/**
	 * Връща изображение към заглавието.
	 *
	 * @return string
	 */
	public function getImage() {
		return $this->image;
	}

	/**
	 * Задава изображение към заглавието.
	 *
	 * @param string
	 */
	public function setImage($image) {
		$this->image = $image;
	}

	/**
	 * Връща дата на публикуване.
	 *
	 * @return string
	 */
	public function getPublicationDate() {
		return $this->publicationDate;
	}

	/**
	 * Задава дата на публикуване.
	 *
	 * @param string
	 */
	public function setPublicationDate($publicationDate) {
		$this->publicationDate = $publicationDate;
	}

	/**
	 * Връща час на публикуване.
	 *
	 * @return string
	 */
	public function getPublicationTime() {
		return $this->publicationTime;
	}

	/**
	 * Задава час на публикуване.
	 *
	 * @param string
	 */
	public function setPublicationTime($publicationTime) {
		$this->publicationTime = $publicationTime;
	}

	/**
	 * Връща дата на изтичане.
	 *
	 * @return string
	 */
	public function getExpirationDate() {
		return $this->expirationDate;
	}

	/**
	 * Задава дата на изтичане.
	 *
	 * @param string
	 */
	public function setExpirationDate($expirationDate) {
		$this->expirationDate = $expirationDate;
	}

		/**
	 * Връща час на изтичане.
	 *
	 * @return string
	 */
	public function getExpirationTime() {
		return $this->expirationTime;
	}

	/**
	 * Задава час на изтичане.
	 *
	 * @param string
	 */
	public function setExpirationTime($expirationTime) {
		$this->expirationTime = $expirationTime;
	}

	/**
	 * Връща статус на новина.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на новина.
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
	 * Връща tIMESTAMP на последна промяна на записа.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на последна промяна на записа.
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща размер на файл за изображение.
	 *
	 * @return int
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на файл за изображение.
	 *
	 * @param int
	 */
	public function setFileSize($fileSize) {
		$this->fileSize = $fileSize;
	}

	/**
	 * Връща тип на файл за изображение.
	 *
	 * @return string
	 */
	public function getContentType() {
		return $this->contentType;
	}

	/**
	 * Задава тип на файл за изображение.
	 *
	 * @param string
	 */
	public function setContentType($contentType) {
		$this->contentType = $contentType;
	}

	/**
	 * Връща заглавие на новина на съответния език.
	 *
	 * @return string
	 */
	public function getTitleI18n() {
		return $this->titleI18n;
	}

	/**
	 * Задава заглавие на новина на съответния език.
	 *
	 * @param string
	 */
	public function setTitleI18n($titleI18n) {
		$this->titleI18n = $titleI18n;
	}

	/**
	 * Връща форматирано HTML съдържание на новина на съответния език.
	 *
	 * @return string
	 */
	public function getDescriptionI18n() {
		return $this->descriptionI18n;
	}

	/**
	 * Задава форматирано HTML съдържание на новина на съответния език.
	 *
	 * @param string
	 */
	public function setDescriptionI18n($descriptionI18n) {
		$this->descriptionI18n = $descriptionI18n;
	}

	/**
	 * Връща кратко описание на съответния език.
	 *
	 * @return string
	 */
	public function getShortDescriptionI18n() {
		return $this->shortDescriptionI18n;
	}

	/**
	 * Задава кратко описание на съответния език.
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
	 * Връща масив с изображения.
	 *
	 * @return array
	 */
	public function getImages() {
		return $this->images;
	}

	/**
	 * Задава масив с изображения.
	 *
	 * @param array
	 */
	public function setImages($images) {
		$this->images = $images;
	}

	/**
	 * Връща масив с изображения за изтриване.
	 *
	 * @return array
	 */
	public function getDeletedImages() {
		return $this->deletedImages;
	}

	/**
	 * Задава масив с изображения за изтриване.
	 *
	 * @param array
	 */
	public function setDeletedImages($deletedImages) {
		$this->deletedImages = $deletedImages;
	}
}