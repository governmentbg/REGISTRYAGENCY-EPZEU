<?php

namespace Content\Entity;

use Document\Entity\DocumentEntity;

/**
 * Прикачен документ към новина
 *
 * @package Content
 * @subpackage Entity
 */
class NewsDocEntity extends DocumentEntity {


	/**
	 * Идентификатор на новина.
	 *
	 * @var int
	 */
	protected $newsId;


	/**
	 * Връща идентификатор на новина.
	 *
	 * @return int
	 */
	public function getNewsId() {
		return $this->newsId;
	}

	/**
	 * Задава идентификатор на новина.
	 *
	 * @param int $newsId
	 */
	public function setNewsId($newsId) {
		$this->newsId = $newsId;
	}
}