<?php

namespace Nomenclature\Entity;

/**
 * Заявление
 *
 * @package Nomenclature
 * @subpackage Entity
 */
class ApplicationTypeEntity {

	/**
	 * Идентификатор на вид заявление.
	 *
	 * @var int
	 */
	protected $id;

	/**
	 * Тип на заявлението.
	 *
	 * @var string
	 */
	protected $appType;

	/**
	 * Наименование на вид заявление.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Наименование на вид заявление на съответния език.
	 *
	 * @var string
	 */
	protected $nameI18n;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;

	/**
	 * Флаг, указващ дали има превод на съответния език.
	 *
	 * @var bool
	 */
	protected $isTranslated;

	/**
	 * Код - абревиатура на заявлението.
	 *
	 * @var string
	 */
	protected $appCode;

	/**
	 * Път до заявлението.
	 *
	 * @var string
	 */
	protected $url;


	/**
	 * Връща идентификатор на вид заявление.
	 *
	 * @return int
	 */
	public function getId() {
		return $this->id;
	}

	/**
	 * Задава идентификатор на вид заявление.
	 *
	 * @param int
	 */
	public function setId($id) {
		$this->id = $id;
	}

	/**
	 * Връща тип на заявлението.
	 *
	 * @return string
	 */
	public function getAppType() {
		return $this->appType;
	}

	/**
	 * Задава тип на заявлението.
	 *
	 * @param string
	 */
	public function setAppType($appType) {
		$this->appType = $appType;
	}

	/**
	 * Връща наименование на вид заявление.
	 *
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Задава наименование на вид заявление.
	 *
	 * @param string
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Връща наименование на вид заявление на съответния език.
	 *
	 * @return string
	 */
	public function getNameI18n() {
		return $this->nameI18n;
	}

	/**
	 * Задава наименование на вид заявление на съответния език.
	 *
	 * @param string
	 */
	public function setNameI18n($nameI18n) {
		$this->nameI18n = $nameI18n;
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
   * Връща код - абревиатура на заявлението.
   *
   * @return string
   */
  public function getAppCode(){
    return $this->appCode;
  }

  /**
   * Задава код - абревиатура на заявлението.
   *
   * @param string
   */
  public function setAppCode($appCode){
    $this->appCode = $appCode;
  }

  /**
   * Връща път до заявлението.
   *
   * @return string
   */
  public function getUrl(){
    return $this->url;
  }

  /**
   * Задава път до заявлението.
   *
   * @param string
   */
  public function setUrl($url){
    $this->url = $url;
  }

}