<?php

namespace Nomenclature\Entity;

/**
 * Етикет
 *
 * @package Nomenclature
 * @subpackage Entity
 */
class LabelEntity {

	/**
	 * Идентификатор на запис за етикет.
	 *
	 * @var int
	 */
	protected $labelId;

	/**
	 * Код на етикет
	 *
	 * @var string
	 */
	protected $code;

	/**
	 * Описание на етикет.
	 *
	 * @var string
	 */
	protected $description;

	/**
	 * Текст на етикет.
	 *
	 * @var string
	 */
	protected $value;

	/**
	 * Текст на етикет на съответния език.
	 *
	 * @var string
	 */
	protected $valueI18n;

	/**
	 * Флаг, указващ дали има превод на съответния език.
	 *
	 * @var bool
	 */
	protected $isTranslated;


	/**
	 * Връща идентификатор на запис за етикет.
	 *
	 * @return int
	 */
	public function getLabelId() {
		return $this->labelId;
	}

	/**
	 * Задава идентификатор на запис за етикет.
	 *
	 * @param int
	 */
	public function setLabelId($labelId) {
		$this->labelId = $labelId;
	}

	/**
	 * Връща код на етикет
	 *
	 * @return string
	 */
	public function getCode() {
		return $this->code;
	}

	/**
	 * Задава код на етикет
	 *
	 * @param string
	 */
	public function setCode($code) {
		$this->code = $code;
	}

	/**
	 * Връща описание на етикет.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава описание на етикет.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}

	/**
	 * Връща текст на етикет.
	 *
	 * @return string
	 */
	public function getValue() {
		return $this->value;
	}

	/**
	 * Задава текст на етикет.
	 *
	 * @param string
	 */
	public function setValue($value) {
		$this->value = $value;
	}

	/**
	 * Връща текст на етикет на съответния език.
	 *
	 * @return string
	 */
	public function getValueI18n() {
		return $this->valueI18n;
	}

	/**
	 * Задава текст на етикет на съответния език.
	 *
	 * @param string
	 */
	public function setValueI18n($valueI18n) {
		$this->valueI18n = $valueI18n;
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
}