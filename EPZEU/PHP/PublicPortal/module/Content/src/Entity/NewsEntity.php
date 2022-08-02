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
	 * Идентификатор на език на новина.
	 *
	 * @var int
	 */
	protected $languageId;


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
	 * Дата на изтичане на новина.
	 *
	 * @var string
	 */
	protected $expirationDate;


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
	 * Размер на файл за изображение.
	 *
	 * @var int
	 */
	protected $fileSize;


	/**
	 * Списък с прикачени документи на новина.
	 *
	 * @var array
	 */
	protected $files = [ ];

	/**
	 * Тип на файл за изображение.
	 *
	 * @var string
	 */
	protected $contentType;

	/**
	 * Дата на промяна на новината.
	 *
	 * @var string
	 */
	protected $updatedOn;


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
	 * @param int $newsId
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
	 * @param int $registerId
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща идентификатор на език на новина.
	 *
	 * @return int
	 */
	public function getLanguageId() {
		return $this->languageId;
	}

	/**
	 * Задава идентификатор на език на новина.
	 *
	 * @param int $languageId
	 */
	public function setLanguageId($languageId) {
		$this->languageId = $languageId;
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
	 * @param string $title
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
	 * @param string $shortDescription
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
	 * @param string $shortDescription
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
	 * @param string $newsDate
	 */
	public function setNewsDate($newsDate) {
		$this->newsDate = $newsDate;
	}

	/**
	 * Връща дата на изтичане на новина.
	 *
	 * @return string
	 */
	public function getExpirationDate() {
		return $this->expirationDate;
	}

	/**
	 * Задава дата на изтичане на новина.
	 *
	 * @param string $expirationDate
	 */
	public function setExpirationDate($expirationDate) {
		$this->expirationDate = $expirationDate;
	}

	/**
	 * Връща флаг, указващ дали новината е маркирана като гореща.
	 *
	 * @return bool
	 */
	public function getisHotNews() {
		return $this->isHotNews;
	}

	/**
	 * Задава флаг, указващ дали новината е маркирана като гореща.
	 *
	 * @param bool $isHotNews
	 */
	public function setisHotNews($isHotNews) {
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
	 * @param string $fileName
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
	 * @param array $files
	 */
	public function setFiles($files) {
		$this->files = $files;
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
   * Връща дата на промяна на новината.
   *
   * @return string
   */
  public function getUpdatedOn(){
    return $this->updatedOn;
  }

  /**
   * Задава дата на промяна на новината.
   *
   * @param string $updatedOn
   */
  public function setUpdatedOn($updatedOn){
    $this->updatedOn = $updatedOn;
  }

}