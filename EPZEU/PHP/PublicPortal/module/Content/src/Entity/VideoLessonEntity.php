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
	 * Идентификатор на език на видео урок.
	 *
	 * @var int
	 */
	protected $languageId;


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
	 * Направен ли е превод на даден език.
	 * @var unknown
	 */
	protected $isTranslated;

	/**
	 * Дата на промяна на видео урок.
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
	 * @param int $lessonId
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
	 * @param int $registerId
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща идентификатор на език на видео урок.
	 *
	 * @return int
	 */
	public function getLanguageId() {
		return $this->languageId;
	}

	/**
	 * Задава идентификатор на език на видео урок.
	 *
	 * @param int $languageId
	 */
	public function setLanguageId($languageId) {
		$this->languageId = $languageId;
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
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща описание на видео урок.
	 *
	 * @return string
	 *
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава описание на видео урок.
	 *
	 * @param string $description
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
	 * @param string $fileName
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

  /**
   * Връща дали има направен превод на даден език.
   *
   * @return string
   */
  public function getIsTranslated(){
    return $this->isTranslated;
  }

  /**
   * Задава дали има направен превод на даден език.
   *
   * @param string
   */
  public function setIsTranslated($isTranslated){
    $this->isTranslated = $isTranslated;
  }

  /**
   * Връща дата на промяна на видео урок.
   *
   * @return string
   */
  public function getUpdatedOn(){
  	return $this->updatedOn;
  }

  /**
   * Задава дата на промяна на видео урок.
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