<?php
namespace Nomenclature\Entity;

/**
 * Параметър
 *
 * @package Nomenclature
 * @subpackage Entity
 */
class ParamEntity {

	/**
	 * Идентиификатор на параметър.
	 *
	 * @var int
	 */
	protected $appParamId;

	/**
	 * Идентификатор на функционалност.
	 *
	 * @var int
	 */
	protected $functionalityId;

	/**
	 * Код на параметър.
	 *
	 * @var string
	 */
	protected $code;

	/**
	 * Описание на параметър.
	 *
	 * @var string
	 */
	protected $description;

	/**
	 * Флаг, указващ дали параметърът е системен или не.
	 *
	 * @var bool
	 */
	protected $isSystem;

	/**
	 * Флаг, указващ дали параметърът е последна версия.
	 *
	 * @var bool
	 */
	protected $isLast;

	/**
	 * Тип на параметър.
	 *
	 * @var int
	 */
	protected $paramType;

	/**
	 * Стойност на тип на параметър дата, час и минути.
	 *
	 * @var string
	 */
	protected $valueDatetime;

	/**
	 * Стойност на тип на параметър интервал от време.
	 *
	 * @var string
	 */
	protected $valueInterval;

	/**
	 * Стойност на тип на параметър стринг.
	 *
	 * @var string
	 */
	protected $valueString;

	/**
	 * Стойност на тип на параметър цяло число.
	 *
	 * @var int
	 */
	protected $valueInt;

	/**
	 * Стойност на тип параметър час и минути.
	 *
	 * @var string
	 */
	protected $valueHour;

	/**
	 * Име на модул.
	 *
	 * @var string
	 */
	protected $moduleName;

	/**
	 * Име на функционалност.
	 *
	 * @var string
	 */
	protected $functionalityName;

	/**
	 * Връща идентиификатор на параметър.
	 *
	 * @return int
	 */
	public function getAppParamId() {
		return $this->appParamId;
	}

	/**
	 * Задава идентиификатор на параметър.
	 *
	 * @param int
	 */
	public function setAppParamId($appParamId) {
		$this->appParamId = $appParamId;
	}

	/**
	 * Връща идентификатор на функционалност.
	 *
	 * @return int
	 */
	public function getFunctionalityId() {
		return $this->functionalityId;
	}

	/**
	 * Задава идентификатор на функционалност.
	 *
	 * @param int
	 */
	public function setFunctionalityId($functionalityId) {
		$this->functionalityId = $functionalityId;
	}

	/**
	 * Връща код на параметър.
	 *
	 * @return string
	 */
	public function getCode() {
		return $this->code;
	}

	/**
	 * Задава код на параметър.
	 *
	 * @param string
	 */
	public function setCode($code) {
		$this->code = $code;
	}

	/**
	 * Връща описание на параметър.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава описание на параметър.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Връща флаг, указващ дали параметърът е системен или не.
	 *
	 * @return bool
	 */
	public function getIsSystem() {
		return $this->isSystem;
	}

	/**
	 * Задава флаг, указващ дали параметърът е системен или не.
	 *
	 * @param bool
	 */
	public function setIsSystem($isSystem) {
		$this->isSystem = $isSystem;
	}

	/**
	 * Връща флаг, указващ дали параметърът е последна версия.
	 *
	 * @return bool
	 */
	public function getIsLast() {
		return $this->isLast;
	}

	/**
	 * Задава флаг, указващ дали параметърът е последна версия.
	 *
	 * @param bool
	 */
	public function setIsLast($isLast) {
		$this->isLast = $isLast;
	}

	/**
	 * Връща тип на параметър.
	 *
	 * @return int
	 */
	public function getParamType() {
		return $this->paramType;
	}

	/**
	 * Задава тип на параметър.
	 *
	 * @param int
	 */
	public function setParamType($paramType) {
		$this->paramType = $paramType;
	}

	/**
	 * Връща стойност на тип на параметър дата, час и минути.
	 *
	 * @return string
	 */
	public function getValueDatetime() {
		return $this->valueDatetime;
	}

	/**
	 * Задава стойност на тип на параметър дата, час и минути.
	 *
	 * @param string
	 */
	public function setValueDatetime($valueDatetime) {
		$this->valueDatetime = $valueDatetime;
	}

	/**
	 * Връща стойност на тип на параметър интервал от време.
	 *
	 * @return string
	 */
	public function getValueInterval() {
		return $this->valueInterval;
	}

	/**
	 * Задава стойност на тип на параметър интервал от време.
	 *
	 * @param string
	 */
	public function setValueInterval($valueInterval) {
		$this->valueInterval = $valueInterval;
	}

	/**
	 * Връща стойност на тип на параметър стринг.
	 *
	 * @return string
	 */
	public function getValueString() {
		return $this->valueString;
	}

	/**
	 * Задава стойност на тип на параметър стринг.
	 *
	 * @param string
	 */
	public function setValueString($valueString) {
		$this->valueString = $valueString;
	}

	/**
	 * Връща стойност на тип на параметър цяло число.
	 *
	 * @return int
	 */
	public function getValueInt() {
		return $this->valueInt;
	}

	/**
	 * Задава стойност на тип на параметър цяло число.
	 *
	 * @param int
	 */
	public function setValueInt($valueInt) {
		$this->valueInt = $valueInt;
	}

	/**
	 * Връща стойност на тип параметър час и минути.
	 *
	 * @return string
	 */
	public function getValueHour() {
		return $this->valueHour;
	}

	/**
	 * Задава стойност на тип параметър час и минути.
	 *
	 * @param string
	 */
	public function setValueHour($valueHour) {
		$this->valueHour = $valueHour;
	}

	/**
	 * Връща име на модул.
	 *
	 * @return string
	 */
	public function getModuleName() {
		return $this->moduleName;
	}

	/**
	 * Задава име на модул.
	 *
	 * @param string
	 */
	public function setModuleName($moduleName) {
		$this->moduleName = $moduleName;
	}

	/**
	 * Връща име на функционалност.
	 *
	 * @return string
	 */
	public function getFunctionalityName() {
		return $this->functionalityName;
	}

	/**
	 * Задава име на функционалност.
	 *
	 * @param string
	 */
	public function setFunctionalityName($functionalityName) {
		$this->functionalityName = $functionalityName;
	}
}