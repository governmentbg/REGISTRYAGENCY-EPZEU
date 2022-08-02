<?php
namespace User\Entity;

/**
 * Документи за специален достъп
 *
 * @package User
 * @subpackage Entity
 */
class SpecialAccessDocEntity {

	/**
	 * Идентификатор на документ за специален достъп.
	 *
	 * @var int
	 */
	protected $docId;

	/**
	 * Идентификатор на заявка за специален достъп.
	 *
	 * @var int
	 */
	protected $requestId;

	/**
	 * Наименование на документ за специален достъп.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Размер на файла за специален достъп.
	 *
	 * @var int
	 */
	protected $fileSize;

	/**
	 * Тип на документ за специален достъп.
	 *
	 * @var string
	 */
	protected $contentType;

	/**
	 * Идентификатор на потребител, направил последна промяна на документ за специален достъп.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * Дата и час на последна промяна на документ за специален достъп.
	 *
	 * @var string
	 */
	protected $updatedOn;

	/**
	 * Връща идентификатор на документ за специален достъп.
	 *
	 * @return int
	 */
	public function getDocId() {
		return $this->docId;
	}

	/**
	 * Задава идентификатор на документ за специален достъп.
	 *
	 * @param int
	 */
	public function setDocId($docId) {
		$this->docId = $docId;
	}

	/**
	 * Връща идентификатор на заявка за специален достъп.
	 *
	 * @return int
	 */
	public function getRequestId() {
		return $this->requestId;
	}

	/**
	 * Задава идентификатор на заявка за специален достъп.
	 *
	 * @param int
	 */
	public function setRequestId($requestId) {
		$this->requestId = $requestId;
	}

	/**
	 * Връща наименование на документ за специален достъп.
	 *
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Задава наименование на документ за специален достъп.
	 *
	 * @param string
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Връща размер на файла за специален достъп.
	 *
	 * @return int
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на файла за специален достъп.
	 *
	 * @param int
	 */
	public function setFileSize($fileSize) {
		$this->fileSize = $fileSize;
	}

	/**
	 * Връща тип на документ за специален достъп.
	 *
	 * @return string
	 */
	public function getContentType() {
		return $this->contentType;
	}

	/**
	 * Задава тип на документ за специален достъп.
	 *
	 * @param string
	 */
	public function setContentType($contentType) {
		$this->contentType = $contentType;
	}

	/**
	 * Връща идентификатор на потребител, направил последна промяна на документ за специален достъп.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител, направил последна промяна на документ за специален достъп.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща дата и час на последна промяна на документ за специален достъп.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на последна промяна на документ за специален достъп.
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}
}