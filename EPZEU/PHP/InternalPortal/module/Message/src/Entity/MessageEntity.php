<?php

namespace Message\Entity;

/**
 * Съобщение
 *
 * @package Message
 * @subpackage Entity
 */
class MessageEntity {

	/**
	 * Идентификатор на съобщение.
	 *
	 * @var int
	 */
	protected $messageId;

	/**
	 * Относно.
	 *
	 * @var string
	 */
	protected $about;

	/**
	 * Текст на съобщение.
	 *
	 * @var string
	 */
	protected $content;

	/**
	 * Статус на съобщение.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ТРРЮЛНЦ.
	 *
	 * @var bool
	 */
	protected $isToAllCr;

	/**
	 * Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ИР.
	 *
	 * @var bool
	 */
	protected $isToAllPr;

	/**
	 * Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ЕПЗЕУ.
	 *
	 * @var bool
	 */
	protected $isToAllEpzeu;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Тип на потребители, до които е съобщението.
	 *
	 * @var int
	 */
	protected $userRecipientType;

	/**
	 * Списък с потребители, до които е съобщението.
	 *
	 * @var array
	 */
	protected $userIdList;


	/**
	 * Връща идентификатор на съобщение.
	 *
	 * @return int
	 */
	public function getMessageId() {
		return $this->messageId;
	}

	/**
	 * Задава идентификатор на съобщение.
	 *
	 * @param int
	 */
	public function setMessageId($messageId) {
		$this->messageId = $messageId;
	}

	/**
	 * Връща относно.
	 *
	 * @return string
	 */
	public function getAbout() {
		return $this->about;
	}

	/**
	 * Задава относно.
	 *
	 * @param string
	 */
	public function setAbout($about) {
		$this->about = $about;
	}

	/**
	 * Връща текст на съобщение.
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава текст на съобщение.
	 *
	 * @param string
	 */
	public function setContent($content) {
		$this->content = $content;
	}

	/**
	 * Връща статус на съобщение.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на съобщение.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ТРРЮЛНЦ.
	 *
	 * @return bool
	 */
	public function getIsToAllCr() {
		return $this->isToAllCr;
	}

	/**
	 * Задава флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ТРРЮЛНЦ.
	 *
	 * @param bool
	 */
	public function setIsToAllCr($isToAllCr) {
		$this->isToAllCr = $isToAllCr;
	}

	/**
	 * Връща флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ИР.
	 *
	 * @return bool
	 */
	public function getIsToAllPr() {
		return $this->isToAllPr;
	}

	/**
	 * Задава флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ИР.
	 *
	 * @param bool
	 */
	public function setIsToAllPr($isToAllPr) {
		$this->isToAllPr = $isToAllPr;
	}

	/**
	 * Връща флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ЕПЗЕУ.
	 *
	 * @return bool
	 */
	public function getIsToAllEpzeu() {
		return $this->isToAllEpzeu;
	}

	/**
	 * Задава флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ЕПЗЕУ.
	 *
	 * @param bool
	 */
	public function setIsToAllEpzeu($isToAllEpzeu) {
		$this->isToAllEpzeu = $isToAllEpzeu;
	}

	/**
	 * Връща TIMESTAMP на последна промяна на записа
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на последна промяна на записа
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща тип на потребители, до които е съобщението.
	 *
	 * @return int
	 */
	public function getUserRecipientType() {
		return $this->userRecipientType;
	}

	/**
	 * Задава тип на потребители, до които е съобщението.
	 *
	 * @param int
	 */
	public function setUserRecipientType($userRecipientType) {
		$this->userRecipientType = $userRecipientType;
	}

	/**
	 * Връща списък с потребители, до които е съобщението.
	 *
	 * @return array
	 */
	public function getUserIdList() {
		return $this->userIdList;
	}

	/**
	 * Задава списък с потребители, до които е съобщението.
	 *
	 * @param array
	 */
	public function setUserIdList($userIdList) {
		$this->userIdList = $userIdList;
	}
}