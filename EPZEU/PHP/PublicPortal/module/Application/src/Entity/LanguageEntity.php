<?php

namespace Application\Entity;

/**
 * Език
 *
 * @package Application
 * @subpackage Entity
 */
class LanguageEntity {


	/**
	 * Идентификатор на език.
	 *
	 * @var int
	 */
	protected $languageId;


	/**
	 * Код на език.
	 *
	 * @var string
	 */
	protected $code;


	/**
	 * Наименование на език, изписано на съответния език.
	 *
	 * @var string
	 */
	protected $name;


	/**
	 * Флаг, указващ дали езикът е маркиран като активен.
	 *
	 * @var bool
	 */
	protected $isActive;


	/**
	 * Флаг, указващ дали езикът е маркиран като език "по подразбиране".
	 *
	 * @var bool
	 */
	protected $isDefault;


  /**
   * Връща идентификатор на език.
   *
   * @return int
   */
  public function getLanguageId(){
    return $this->languageId;
  }

  /**
   * Задава идентификатор на език.
   *
   * @param int $languageId
   */
  public function setLanguageId($languageId){
    $this->languageId = $languageId;
  }

  /**
   * Връща код на език.
   *
   * @return string
   */
  public function getCode(){
    return $this->code;
  }

  /**
   * Задава код на език.
   *
   * @param string $code
   */
  public function setCode($code){
    $this->code = $code;
  }

  /**
   * Връща наименование на език.
   *
   * @return string
   */
  public function getName(){
    return $this->name;
  }

  /**
   * Задава наименование на език.
   *
   * @param string $name
   */
  public function setName($name){
    $this->name = $name;
  }

  /**
   * Връща флаг, указващ дали езикът е маркиран като активен.
   *
   * @return bool
   */
  public function getIsActive(){
    return $this->isActive;
  }

  /**
   * Задава флаг, указващ дали езикът е маркиран като активен.
   *
   * @param bool $isActive
   */
  public function setIsActive($isActive){
    $this->isActive = $isActive;
  }

  /**
   * Връща флаг, указващ дали езикът е маркиран като език "по подразбиране".
   *
   * @return bool
   */
  public function getIsDefault(){
    return $this->isDefault;
  }

  /**
   * Задава флаг, указващ дали езикът е маркиран като език "по подразбиране".
   *
   * @param bool $isDefault
   */
  public function setIsDefault($isDefault){
    $this->isDefault = $isDefault;
  }
}