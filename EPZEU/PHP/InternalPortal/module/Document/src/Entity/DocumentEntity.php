<?php

namespace Document\Entity;

/**
 * Прикачен документ
 *
 * @package Document
 * @subpackage Entity
 */
class DocumentEntity {


	/**
	 * Идентификатор на прикачен документ.
	 *
	 * @var int
	 */
	protected $docId;


	/**
	 * Наименование на прикачен документ.
	 *
	 * @var string
	 */
	protected $fileName;


	/**
	 * Размер на прикачен документ.
	 *
	 * @var int
	 */
	protected $fileSize;


	/**
	 * Тип на прикачен документ.
	 *
	 * @var string
	 */
	protected $contentType;


	/**
	 * Съдържание на файл.
	 *
	 * @var string
	 */
	protected $content;


	/**
	 * Идентификатор на потребител, редактирал прикачен документ.
	 *
	 * @var int
	 */
	protected $updatedBy;


	/**
	 * Дата и час на редакция на прикачен документ.
	 *
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Връща идентификатор на прикачен документ.
	 *
	 * @return int
	 */
	public function getDocId(){
		return $this->docId;
	}

	/**
	 * Задава идентификатор на прикачен документ.
	 *
	 * @param int
	 */
	public function setDocId($docId){
		$this->docId = $docId;
	}

  	/**
	 * Връща наименование на прикачен документ.
	 *
	 * @return string
	 */
	public function getFileName(){
		return $this->fileName;
	}

	/**
	 * Задава наименование на прикачен документ.
	 *
	 * @param string
	 */
	public function setFileName($fileName){
		$this->fileName = $fileName;
	}

  	/**
	 * Връща размер на прикачен документ.
	 *
	 * @return int
	 */
	public function getFileSize(){
		return $this->fileSize;
	}

	/**
	 * Задава размер на прикачен документ.
	 *
	 * @param int
	 */
	public function setFileSize($fileSize){
		$this->fileSize = $fileSize;
	}

  	/**
	 * Връща тип на прикачен документ.
	 *
	 * @return string
	 */
	public function getContentType(){
		return $this->contentType;
	}

	/**
	 * Задава тип на прикачен документ.
	 *
	 * @param string
	 */
	public function setContentType($contentType){
		$this->contentType = $contentType;
	}

  	/**
	 * Връща идентификатор на потребител, редактирал прикачен документ.
	 *
	 * @return int
	 */
	public function getUpdatedBy(){
		return $this->updatedBy;
	}

  	/**
	 * Задава идентификатор на потребител, редактирал прикачен документ.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy){
		$this->updatedBy = $updatedBy;
	}

  	/**
	 * Връща дата и час на редакция на прикачен документ.
	 *
	 * @return string
	 */
	public function getUpdatedOn(){
		return $this->updatedOn;
	}

  	/**
	 * Задава дата и час на редакция на прикачен документ.
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn){
		$this->updatedOn = $updatedOn;
	}

  /**
   * Връща файлово съдържание на документ.
   *
   * @return string
   */
  public function getContent(){
    return $this->content;
  }

  /**
   * Задава файлово съдържание на документ.
   *
   * @param string $content
   */
  public function setContent($content){
    $this->content = $content;
  }

}