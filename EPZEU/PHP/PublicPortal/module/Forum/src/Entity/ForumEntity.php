<?php

namespace Forum\Entity;

/**
 * Тема във форум
 *
 * @package Forum
 * @subpackage Entity
 */
class ForumEntity {


	/**
	 * Идентификатор на тема.
	 *
	 * @var int
	 */
	protected $themeId;


	/**
	 * Идентификатор на коментар по дадена тема.
	 *
	 * @var int
	 */
	protected $themeCommentId;


	/**
	 * Заглавие на тема.
	 *
	 * @var string
	 */
	protected $title;


	/**
	 * Коментар на тема.
	 *
	 * @var string
	 */
	protected $comment;


	/**
	 * Идентификатор на потребител, който е създал тема.
	 *
	 * @var int
	 */
	protected $authorId;


	/**
	 * Име на потребител, който е създал тема.
	 *
	 * @var string
	 */
	protected $firstName;


	/**
	 * Идентификатор на потребител, който е създал тема.
	 *
	 * @var int
	 */
	protected $createdBy;


	/**
	 * Дата и час на създаване на тема.
	 *
	 * @var string
	 */
	protected $createdOn;


	/**
	 * Дата и час на редакция на тема.
	 *
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Дата на последен коментар.
	 *
	 * @var string
	 */
	protected $lastCommentDate;


	/**
	 * Дата на публикуване на тема/коментар.
	 *
	 * @var string
	 */
	protected $publishedDate;


	/**
	 * Брой коментари.
	 *
	 * @var int
	 */
	protected $commentsNum;


	/**
	 * Статус на коментар.
	 *
	 * @var int
	 */
	protected $status;


	/**
	 * Флаг указващ, дали даден коментар е първи по тема.
	 *
	 * @var bool
	 */
	protected $isFirst;


	/**
	 * Статус на тема.
	 *
	 * @var int
	 */
	protected $themeStatus;


	/**
	 * Връща идентификатор на тема.
	 *
	 * @return int
	 */
	public function getThemeId() {
		return $this->themeId;
	}

	/**
	 * Задава идентификатор на тема.
	 *
	 * @param int $themeId
	 */
	public function setThemeId($themeId) {
		$this->themeId = $themeId;
	}

	/**
	 * Връща заглавие на тема.
	 *
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * Задава заглавие на тема.
	 *
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща идентификатор на потребител, който е създал тема/коментар.
	 *
	 * @return int
	 */
	public function getAuthorId() {
		return $this->authorId;
	}

	/**
	 * Задава идентификатор на потребител, който е създал тема/коментар.
	 *
	 * @param int $authorId
	 */
	public function setAuthorId($authorId) {
		$this->authorId = $authorId;
	}

	/**
	 * Връща идентификатор на потребител, който е създал тема.
	 *
	 * @return int
	 */
	public function getCreatedBy() {
		return $this->createdBy;
	}

	/**
	 * Задава идентификатор на потребител, който е създал тема.
	 *
	 * @param int $createdBy
	 */
	public function setCreatedBy($createdBy) {
		$this->createdBy = $createdBy;
	}

	/**
	 * Връща дата и час на създаване на тема.
	 *
	 * @return string
	 */
	public function getCreatedOn() {
		return $this->createdOn;
	}

	/**
	 * Задава дата и час на създаване на тема.
	 *
	 * @param string $createdOn
	 */
	public function setCreatedOn($createdOn) {
		$this->createdOn = $createdOn;
	}

	/**
	 * Връща дата на последен коментар.
	 *
	 * @return string
	 */
	public function getLastCommentDate() {
		return $this->lastCommentDate;
	}

	/**
	 * Задава дата на последен коментар.
	 *
	 * @param string $lastCommentDate
	 */
	public function setLastCommentDate($lastCommentDate) {
		$this->lastCommentDate = $lastCommentDate;
	}

	/**
	 * Връща дата на публикуване на тема/коментар.
	 *
	 * @return string
	 */
	public function getPublishedDate() {
		return $this->publishedDate;
	}

	/**
	 * Задава дата на публикуване на тема/коментар.
	 *
	 * @param string $publishedDate
	 */
	public function setPublishedDate($publishedDate) {
		$this->publishedDate = $publishedDate;
	}

	/**
	 * Връща статус на коментар.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на коментар.
	 *
	 * @param int $status
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща коментар на тема.
	 *
	 * @return string
	 */
	public function getComment() {
		return $this->comment;
	}

	/**
	 * Задава коментар на тема.
	 *
	 * @param string $comment
	 */
	public function setComment($comment) {
		$this->comment = $comment;
	}

	/**
	 * Връща идентификатор на коментар по дадена тема.
	 *
	 * @return int
	 */
	public function getThemeCommentId() {
		return $this->themeCommentId;
	}

	/**
	 * Задава идентификатор на коментар по дадена тема.
	 *
	 * @param int $themeCommentId
	 */
	public function setThemeCommentId($themeCommentId) {
		$this->themeCommentId = $themeCommentId;
	}

	/**
	 * Връща име на потребител, който е създал тема.
	 *
	 * @return string
	 */
	public function getFirstName() {
		return $this->firstName;
	}

	/**
	 * Задава име на потребител, който е създал тема.
	 *
	 * @param string $firstName
	 */
	public function setFirstName($firstName) {
		$this->firstName = $firstName;
	}

	/**
	 * Връща дата и час на редакция на тема.
	 *
	 * @return string
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава дата и час на редакция на тема.
	 *
	 * @param string $updatedOn
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща брой коментари.
	 *
	 * @return int
	 */
	public function getCommentsNum() {
		return $this->commentsNum;
	}

	/**
	 * Задава брой коментари.
	 *
	 * @param int $commentsNum
	 */
	public function setCommentsNum($commentsNum) {
		$this->commentsNum = $commentsNum;
	}

	/**
	 * Връща флаг указващ, дали даден коментар е първи по тема.
	 *
	 * @return bool
	 */
	public function getIsFirst() {
		return $this->isFirst;
	}

	/**
	 * Задава флаг указващ, дали даден коментар е първи по тема.
	 *
	 * @param bool $isFirst
	 */
	public function setIsFirst($isFirst) {
		$this->isFirst = $isFirst;
	}

	/**
	 * Връща статус на тема.
	 *
	 * @return int
	 */
	public function getThemeStatus() {
		return $this->themeStatus;
	}

	/**
	 * Задава статус на тема.
	 *
	 * @param int $themeStatus
	 */
	public function setThemeStatus($themeStatus) {
		$this->themeStatus = $themeStatus;
	}
}