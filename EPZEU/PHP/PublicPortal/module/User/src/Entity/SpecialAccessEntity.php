<?php

namespace User\Entity;


/**
 * Специален достъп
 *
 * @package User
 * @subpackage Entity
 */
class SpecialAccessEntity extends UserEntity {

	/**
	 * Идентификатор на заявка за специален достъп.
	 *
	 * @var int
	 */
	protected $requestId;

	/**
	 * Статус на достъп.
	 *
	 * @var int
	 */
	protected $accessStatus;

	/**
	 * Дата на обработка на заявка за достъп.
	 *
	 * @var string
	 */
	protected $processingDate;


	/**
	 * Връща идентификатор на заявка за специален достъп.
	 *
	 * @return int
	 */
	public function getRequestId(){
		return $this->requestId;
	}

	/**
	 * Задава идентификатор на заявка за специален достъп.
	 *
	 * @param int
	 */
	public function setRequestId($requestId){
		$this->requestId = $requestId;
	}

	/**
	 * Връща статус на достъп.
	 *
	 * @return int
	 */
	public function getAccessStatus(){
		return $this->accessStatus;
	}

	/**
	 * Задава статус на достъп.
	 *
	 * @param int
	 */
	public function setAccessStatus($accessStatus){
		$this->accessStatus = $accessStatus;
	}

	/**
	 * Връща дата на обработка на заявка за достъп.
	 *
	 * @return string
	 */
	public function getProcessingDate(){
		return $this->processingDate;
	}

	/**
	 * Задава дата на обработка на заявка за достъп.
	 *
	 * @param string
	 */
	public function setProcessingDate($processingDate){
		$this->processingDate = $processingDate;
	}

}