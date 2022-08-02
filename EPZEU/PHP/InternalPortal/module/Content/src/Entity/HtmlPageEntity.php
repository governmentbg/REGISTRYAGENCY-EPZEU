<?php

namespace Content\Entity;

/**
 * Html страница
 *
 * @package Content
 * @subpackage Entity
 */
class HtmlPageEntity {


	/**
	 * Идентификатор на страница.
	 *
	 * @var int
	 */
	protected $pageId;


	/**
	 * Наименование на Портал/Система.
	 *
	 * @var int
	 */
	protected $moduleId;


	/**
	 * Заглавие на страница.
	 *
	 * @var string
	 */
	protected $title;


	/**
	 * Съдържание на страница.
	 *
	 * @var string
	 */
	protected $content;


	/**
	 * Тип на страница.
	 *
	 * @var int
	 */
	protected $type;


	/**
	 * Статус на страница.
	 *
	 * @var int
	 */
	protected $status;


	/**
	 * URL адрес на страница.
	 *
	 * @var string
	 */
	protected $URL;


	/**
	 * Заглавие на страница на съответния език.
	 *
	 * @var string
	 */
	protected $titleI18n;


	/**
	 * Съдържание на страница на съответния език.
	 *
	 * @var string
	 */
	protected $contentI18n;


	/**
	 * Флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @var int
	 */
	protected $isTranslated;

	/**
	 * Дата и час на редакция на йерархична страница.
	 *
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Връща идентификатор на страница.
	 *
	 * @return int
	 */
	public function getPageId() {
		return $this->pageId;
	}

	/**
	 * Задава идентификатор на страница.
	 *
	 * @param int
	 */
	public function setPageId($pageId) {
		$this->pageId = $pageId;
	}

	/**
	 * Връща наименование на Портал/Система.
	 *
	 * @return int
	 */
	public function getModuleId() {
		return $this->moduleId;
	}

	/**
	 * Задава наименование на Портал/Система.
	 *
	 * @param int
	 */
	public function setModuleId($moduleId) {
		$this->moduleId = $moduleId;
	}

	/**
	 * Връща заглавие на страница.
	 *
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * Задава заглавие на страница.
	 *
	 * @param string
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща съдържание на страница.
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава съдържание на страница.
	 *
	 * @param string
	 */
	public function setContent($content) {
		$this->content = $content;
	}

	/**
	 * Връща тип на страница.
	 *
	 * @return int
	 */
	public function getType() {
		return $this->type;
	}

	/**
	 * Задава тип на страница.
	 *
	 * @param int
	 */
	public function setType($type) {
		$this->type = $type;
	}

	/**
	 * Връща статус на страница.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на страница.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща URL адрес на страница.
	 *
	 * @return string
	 */
	public function getURL() {
		return $this->URL;
	}

	/**
	 * Задава URL адрес на страница.
	 *
	 * @param string
	 */
	public function setURL($URL) {
		$this->URL = $URL;
	}

	/**
	 * Връща заглавие на страница на съответния език.
	 *
	 * @return string
	 */
	public function getTitleI18n() {
		return $this->titleI18n;
	}

	/**
	 * Задава заглавие на страница на съответния език.
	 *
	 * @param string
	 */
	public function setTitleI18n($titleI18n) {
		$this->titleI18n = $titleI18n;
	}

	/**
	 * Връща съдържание на страница на съответния език.
	 *
	 * @return string
	 */
	public function getContentI18n() {
		return $this->contentI18n;
	}

	/**
	 * Задава съдържание на страница на съответния език.
	 *
	 * @param string
	 */
	public function setContentI18n($contentI18n) {
		$this->contentI18n = $contentI18n;
	}

	/**
	 * Връща флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @return int
	 */
	public function getIsTranslated() {
		return $this->isTranslated;
	}

	/**
	 * Задава флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @param int
	 */
	public function setIsTranslated($isTranslated) {
		$this->isTranslated = $isTranslated;
	}

	/**
	 * Връща дата и час на редакция на йерархична страница.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на редакция на йерархична страница.
	 *
	 * @param string
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}
}