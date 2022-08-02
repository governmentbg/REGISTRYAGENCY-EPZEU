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
	 * Масив с файлове за изтриване.
	 *
	 * @var array
	 */
	protected $deletedFiles;

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
	 * @param int
	 */
	public function setNewsId($newsId) {
		$this->newsId = $newsId;
	}


	/**
	 * Връща масив с файлове за изтриване.
	 *
	 * @return array
	 */
	public function getDeletedFiles() {
		return $this->deletedFiles;
	}

	/**
	 * Задава масив с файлове за изтриване.
	 *
	 * @param array
	 */
	public function setDeletedFiles($deletedFiles) {
		$this->deletedFiles = $deletedFiles;
	}

}