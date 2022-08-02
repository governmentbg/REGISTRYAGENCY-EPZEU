<?php

namespace DeclarationTemplate\Entity;

/**
 * Активно поле
 *
 * @package DeclarationTemplate
 * @subpackage Entity
 */
class ActiveFieldEntity {

	/**
	 * Код на поле.
	 *
	 * @var string
	 */
	public $key;

	/**
	 * Описание на поле.
	 *
	 * @var string
	 */
	public $description;


	/**
	 * Връща код на поле.
	 *
	 * @return string
	 */
	public function getKey() {
		return $this->key;
	}

	/**
	 * Задава код на поле.
	 *
	 * @param string
	 */
	public function setKey($key) {
		$this->key = $key;
	}

	/**
	 * Връща описание на поле.
	 *
	 * @return string
	 */
	public function getDescription() {
		return $this->description;
	}

	/**
	 * Задава описание на поле.
	 *
	 * @param string
	 */
	public function setDescription($description) {
		$this->description = $description;
	}
}