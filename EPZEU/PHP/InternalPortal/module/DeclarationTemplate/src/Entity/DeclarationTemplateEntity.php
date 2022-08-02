<?php

namespace DeclarationTemplate\Entity;

/**
 * Шаблон за декларация
 *
 * @package DeclarationTemplate
 * @subpackage Entity
 */
class DeclarationTemplateEntity {

	/**
	 * Идентификатор на запис за шаблон на документ.
	 *
	 * @var int
	 */
	protected $docTemplateId;

	/**
	 * Идентификатор на вид документ.
	 *
	 * @var int
	 */
	protected $documentTypeId;

	/**
	 * Съдържание на шаблон.
	 *
	 * @var string
	 */
	protected $content;

	/**
	 * TIMESTAMP на създаване на записа
	 *
	 * @var string
	 */
	protected $updatedOn;

	/**
	 * Идентификатор на потребител направил последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * Име на шаблона.
	 *
	 * @var string
	 */
	protected $name;


	/**
	 * Връща идентификатор на запис за шаблон на документ.
	 *
	 * @return int
	 */
	public function getDocTemplateId() {
		return $this->docTemplateId;
	}

	/**
	 * Задава идентификатор на запис за шаблон на документ.
	 *
	 * @param int
	 */
	public function setDocTemplateId($docTemplateId) {
		$this->docTemplateId = $docTemplateId;
	}

	/**
	 * Връща идентификатор на вид документ.
	 *
	 * @return int
	 */
	public function getDocumentTypeId() {
		return $this->documentTypeId;
	}

	/**
	 * Задава идентификатор на вид документ.
	 *
	 * @param int
	 */
	public function setDocumentTypeId($documentTypeId) {
		$this->documentTypeId = $documentTypeId;
	}

	/**
	 * Връща съдържание на шаблон.
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава съдържание на шаблон.
	 *
	 * @param string
	 */
	public function setContent($content) {
		$this->content = $content;
	}

	/**
	 * Връща TIMESTAMP на създаване на записа
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на създаване на записа
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
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
   * Връща име на шаблона.
   *
   * @return string
   */
  public function getName(){
    return $this->name;
  }

  /**
   * Задава име на шаблона.
   *
   * @param string
   */
  public function setName($name){
    $this->name = $name;
  }

}