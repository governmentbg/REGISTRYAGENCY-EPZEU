<?php

namespace Forum\Entity;

/**
 * Забранена дума
 *
 * @package Forum
 * @subpackage Entity
 */
class ForbiddenWordEntity {

	/**
	 * Идентификатор на забранена дума.
	 *
	 * @var int
	 */
	public $wordId;

	/**
	 * Забранена дума.
	 *
	 * @var string
	 */
	public $word;

	/**
	 * Връща идентификатор на забранена дума.
	 *
	 * @return int
	 */
	public function getWordId() {
		return $this->wordId;
	}

	/**
	 * Задава идентификатор на забранена дума.
	 *
	 * @param int
	 */
	public function setWordId($wordId) {
		$this->wordId = $wordId;
	}

	/**
	 * Връща забранена дума.
	 *
	 * @return string
	 */
	public function getWord() {
		return $this->word;
	}

	/**
	 * Задава забранена дума.
	 *
	 * @param string
	 */
	public function setWord($word) {
		$this->word = $word;
	}
}