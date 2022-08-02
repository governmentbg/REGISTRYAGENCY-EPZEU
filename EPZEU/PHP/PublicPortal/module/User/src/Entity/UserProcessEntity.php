<?php
namespace User\Entity;

/**
 * Процес на потребителски профил
 *
 * @package User
 * @subpackage Entity
 */
class UserProcessEntity {

	/**
	 * Идентификатор на запис за процес.
	 *
	 * @var int
	 */
	protected $processId;

	/**
	 * Идентификатор на процес.
	 *
	 * @var string
	 */
	protected $processGuid;

	/**
	 * Тип на процеса.
	 *
	 * @var int
	 */
	protected $processType;

	/**
	 * Идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;

	/**
	 * Дата след която процесът е невалиден.
	 *
	 * @var string
	 */
	protected $invalidAfter;

	/**
	 * Статус на процеса.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedOn;

	/**
	 * Идентификатор на потребител направил последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * Връща идентификатор на запис за процес.
	 *
	 * @return int
	 */
	public function getProcessId() {
		return $this->processId;
	}

	/**
	 * Задава идентификатор на запис за процес.
	 *
	 * @param int
	 */
	public function setProcessId($processId) {
		$this->processId = $processId;
	}

	/**
	 * Връща идентификатор на процес.
	 *
	 * @return string
	 */
	public function getProcessGuid() {
		return $this->processGuid;
	}

	/**
	 * Задава идентификатор на процес.
	 *
	 * @param string
	 */
	public function setProcessGuid($processGuid) {
		$this->processGuid = $processGuid;
	}

	/**
	 * Връща тип на процеса.
	 *
	 * @return int
	 */
	public function getProcessType() {
		return $this->processType;
	}

	/**
	 * Задава тип на процеса.
	 *
	 * @param int
	 */
	public function setProcessType($processType) {
		$this->processType = $processType;
	}

	/**
	 * Връща идентификатор на потребителски профил.
	 *
	 * @return int
	 */
	public function getUserId() {
		return $this->userId;
	}

	/**
	 * Задава идентификатор на потребителски профил.
	 *
	 * @param int
	 */
	public function setUserId($userId) {
		$this->userId = $userId;
	}

	/**
	 * Връща дата след която процесът е невалиден.
	 *
	 * @return string
	 */
	public function getInvalidAfter() {
		return $this->invalidAfter;
	}

	/**
	 * Задава дата след която процесът е невалиден.
	 *
	 * @param string
	 */
	public function setInvalidAfter($invalidAfter) {
		$this->invalidAfter = $invalidAfter;
	}

	/**
	 * Връща статус на процеса.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на процеса.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща TIMESTAMP на последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава TIMESTAMP на последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща идентификатор на потребител направил последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител направил последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}
}