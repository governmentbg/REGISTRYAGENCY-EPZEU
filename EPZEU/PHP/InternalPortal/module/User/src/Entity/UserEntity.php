<?php
namespace User\Entity;

/**
 * Потребител
 *
 * @package User
 * @subpackage Entity
 */
class UserEntity {

	/**
	 * Идентификатор на потребителски профил.
	 *
	 * @var int
	 */
	protected $userId;

	/**
	 * Клиентски идентификационен номер.
	 *
	 * @var int
	 */
	protected $cin;

	/**
	 * Потребителско име.
	 *
	 * @var string
	 */
	protected $username;

	/**
	 * Хеш на парола.
	 *
	 * @var string
	 */
	protected $password;

	/**
	 * Електронна поща.
	 *
	 * @var string
	 */
	protected $email;

	/**
	 * Име на потребителя.
	 *
	 * @var string
	 */
	protected $firstName;

	/**
	 * Презиме на потребителя.
	 *
	 * @var string
	 */
	protected $middleName;

	/**
	 * Фамилия на потребителя.
	 *
	 * @var string
	 */
	protected $familyName;

	/**
	 * Данни за контакт.
	 *
	 * @var string
	 */
	protected $contactData;

	/**
	 * Организация и длъжност.
	 *
	 * @var string
	 */
	protected $organization;

	/**
	 * Вид външен потребител със специален достъп.
	 *
	 * @var int
	 */
	protected $specialAccessUserType;

	/**
	 * Статус на профил.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * TIMESTAMP на последна промяна на записа.
	 *
	 * @var int $updatedOn
	 */
	protected $updatedOn;

	/**
	 * Уникален идентификатор на потребител направил последна промяна на записа.
	 *
	 * @var int
	 */
	protected $updatedBy;

	/**
	 * Уникален идентификатор на потребител създал записа.
	 *
	 * @var int
	 */
	protected $createdBy;

	/**
	 * TIMESTAMP на създаване на записа.
	 *
	 * @var int
	 */
	protected $createdOn;

	/**
	 * Съгласие за ел.
	 * бюлетин за ТРРЮЛНЦ.
	 *
	 * @var bool
	 */
	protected $crBulletinAcceptance;

	/**
	 * Съгласие за ел.
	 * бюлетин за ИР.
	 *
	 * @var bool
	 */
	protected $prBulletinAcceptance;

	/**
	 * Съгласие за съобщениея от ТРРЮЛНЦ.
	 *
	 * @var bool
	 */
	protected $crMessageAcceptance;

	/**
	 * Съгласие за съобщениея от ИР.
	 *
	 * @var bool
	 */
	protected $prMessageAcceptance;

	/**
	 * Съгласие за съобщения от ЕПЗЕУ.
	 *
	 * @var bool
	 */
	protected $epzeuMessageAcceptance;

	/**
	 * Масив с файлове за специален достъп.
	 *
	 * @var array
	 */
	protected $files;

	/**
	 * Масив с роли на потребител.
	 *
	 * @var array
	 */
	protected $roleList;

	/**
	 * Масив с права за достъп.
	 *
	 * @var array
	 */
	protected $permissionList;

	/**
	 * Период на регистрация от.
	 *
	 * @var string
	 */
	protected $dateFrom;

	/**
	 * Период на регистрация до.
	 *
	 * @var string
	 */
	protected $dateTo;

	/**
	 * Флаг, указващ дали потребителят е регистриран в публичната част.
	 *
	 * @var bool
	 */
	protected $isPublicUser = true;

	/**
	 * Флаг, указващ дали потребителят се е идентифицирал с електронна идентификация.
	 *
	 * @var bool
	 */
	protected $isIdentifiableUser = false;

	/**
	 * Причини за отказан достъп при отказ за одобрение на заявка за специален достъп.
	 *
	 * @var string
	 */
	protected $statusReason;

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
	 * Връща клиентски идентификационен номер.
	 *
	 * @return int
	 */
	public function getCin() {
		return $this->cin;
	}

	/**
	 * Задава клиентски идентификационен номер.
	 *
	 * @param int
	 */
	public function setCin($cin) {
		$this->cin = $cin;
	}

	/**
	 * Връща потребителско име.
	 *
	 * @return string
	 */
	public function getUsername() {
		return $this->username;
	}

	/**
	 * Задава потребителско име.
	 *
	 * @param string
	 */
	public function setUsername($username) {
		$this->username = $username;
	}

	/**
	 * Връща хеш на парола.
	 *
	 * @return string
	 */
	public function getPassword() {
		return $this->password;
	}

	/**
	 * Задава хеш на парола.
	 *
	 * @param string
	 */
	public function setPassword($password) {
		$this->password = $password;
	}

	/**
	 * Връща електронна поща.
	 *
	 * @return string
	 */
	public function getEmail() {
		return $this->email;
	}

	/**
	 * Задава електронна поща.
	 *
	 * @param string
	 */
	public function setEmail($email) {
		$this->email = $email;
	}

	/**
	 * Връща име на потребителя.
	 *
	 * @return string
	 */
	public function getFirstName() {
		return $this->firstName;
	}

	/**
	 * Задава име на потребителя.
	 *
	 * @param string
	 */
	public function setFirstName($firstName) {
		$this->firstName = $firstName;
	}

	/**
	 * Връща презиме на потребителя.
	 *
	 * @return string
	 */
	public function getMiddleName() {
		return $this->middleName;
	}

	/**
	 * Задава презиме на потребителя.
	 *
	 * @param string
	 */
	public function setMiddleName($middleName) {
		$this->middleName = $middleName;
	}

	/**
	 * Връща фамилия на потребителя.
	 *
	 * @return string
	 */
	public function getFamilyName() {
		return $this->familyName;
	}

	/**
	 * Задава фамилия на потребителя.
	 *
	 * @param string
	 */
	public function setFamilyName($familyName) {
		$this->familyName = $familyName;
	}

	/**
	 * Връща данни за контакт.
	 *
	 * @return string
	 */
	public function getContactData() {
		return $this->contactData;
	}

	/**
	 * Задава данни за контакт.
	 *
	 * @param string
	 */
	public function setContactData($contactData) {
		$this->contactData = $contactData;
	}

	/**
	 * Връща организация и длъжност.
	 *
	 * @return string
	 */
	public function getOrganization() {
		return $this->organization;
	}

	/**
	 * Задава организация и длъжност.
	 *
	 * @param string
	 */
	public function setOrganization($organization) {
		$this->organization = $organization;
	}

	/**
	 * Връща вид външен потребител със специален достъп.
	 *
	 * @return int
	 */
	public function getSpecialAccessUserType() {
		return $this->specialAccessUserType;
	}

	/**
	 * Задава вид външен потребител със специален достъп.
	 *
	 * @param int
	 */
	public function setSpecialAccessUserType($specialAccessUserType) {
		$this->specialAccessUserType = $specialAccessUserType;
	}

	/**
	 * Връща статус на профил.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на профил.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	 * Връща $updatedOn
	 *
	 * @return int
	 */
	public function getUpdatedOn() {
		return $this->updatedOn;
	}

	/**
	 * Задава $updatedOn
	 *
	 * @param int
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща уникален идентификатор на потребител направил последна промяна на записа.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава уникален идентификатор на потребител направил последна промяна на записа.
	 *
	 * @param int
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща уникален идентификатор на потребител създал записа.
	 *
	 * @return int
	 */
	public function getCreatedBy() {
		return $this->createdBy;
	}

	/**
	 * Задава уникален идентификатор на потребител създал записа.
	 *
	 * @param int
	 */
	public function setCreatedBy($createdBy) {
		$this->createdBy = $createdBy;
	}

	/**
	 * Връща tIMESTAMP на създаване на записа.
	 *
	 * @return int
	 */
	public function getCreatedOn() {
		return $this->createdOn;
	}

	/**
	 * Задава tIMESTAMP на създаване на записа.
	 *
	 * @param int
	 */
	public function setCreatedOn($createdOn) {
		$this->createdOn = $createdOn;
	}

	/**
	 * Връща съгласие за ел. бюлетин за ТРРЮЛНЦ.
	 *
	 * @return bool
	 */
	public function getCrBulletinAcceptance() {
		return $this->crBulletinAcceptance;
	}

	/**
	 * Задава съгласие за ел. бюлетин за ТРРЮЛНЦ.
	 *
	 * @param bool
	 */
	public function setCrBulletinAcceptance($crBulletinAcceptance) {
		$this->crBulletinAcceptance = $crBulletinAcceptance;
	}

	/**
	 * Връща съгласие за ел. бюлетин за ИР.
	 *
	 * @return bool
	 */
	public function getPrBulletinAcceptance() {
		return $this->prBulletinAcceptance;
	}

	/**
	 * Задава съгласие за ел. бюлетин за ИР.
	 *
	 * @param bool
	 */
	public function setPrBulletinAcceptance($prBulletinAcceptance) {
		$this->prBulletinAcceptance = $prBulletinAcceptance;
	}

	/**
	 * Връща съгласие за съобщениея от ТРРЮЛНЦ.
	 *
	 * @return bool
	 */
	public function getCrMessageAcceptance() {
		return $this->crMessageAcceptance;
	}

	/**
	 * Задава съгласие за съобщениея от ТРРЮЛНЦ.
	 *
	 * @param bool
	 */
	public function setCrMessageAcceptance($crMessageAcceptance) {
		$this->crMessageAcceptance = $crMessageAcceptance;
	}

	/**
	 * Връща съгласие за съобщениея от ИР.
	 *
	 * @return bool
	 */
	public function getPrMessageAcceptance() {
		return $this->prMessageAcceptance;
	}

	/**
	 * Задава съгласие за съобщениея от ИР.
	 *
	 * @param bool
	 */
	public function setPrMessageAcceptance($prMessageAcceptance) {
		$this->prMessageAcceptance = $prMessageAcceptance;
	}

	/**
	 * Връща съгласие за съобщения от ЕПЗЕУ.
	 *
	 * @return bool
	 */
	public function getEpzeuMessageAcceptance() {
		return $this->epzeuMessageAcceptance;
	}

	/**
	 * Задава съгласие за съобщения от ЕПЗЕУ.
	 *
	 * @param bool
	 */
	public function setEpzeuMessageAcceptance($epzeuMessageAcceptance) {
		$this->epzeuMessageAcceptance = $epzeuMessageAcceptance;
	}

	/**
	 * Връща масив с файлове за специален достъп.
	 *
	 * @return array
	 */
	public function getFiles() {
		return $this->files;
	}

	/**
	 * Задава масив с файлове за специален достъп.
	 *
	 * @param array
	 */
	public function setFiles($files) {
		$this->files = $files;
	}

	/**
	 * Връща масив с роли на потребител.
	 *
	 * @return array
	 */
	public function getRoleList() {
		return $this->roleList;
	}

	/**
	 * Задава масив с роли на потребител.
	 *
	 * @param array
	 */
	public function setRoleList($roleList) {
		$this->roleList = $roleList;
	}

	/**
	 * Връща масив с права за достъп.
	 *
	 * @return array
	 */
	public function getPermissionList() {
		return $this->permissionList;
	}

	/**
	 * Задава масив с права за достъп.
	 *
	 * @param array
	 */
	public function setPermissionList($permissionList) {
		$this->permissionList = $permissionList;
	}

	/**
	 * Връща период на регистрация от.
	 *
	 * @return string
	 */
	public function getDateFrom() {
		return $this->dateFrom;
	}

	/**
	 * Задава период на регистрация от.
	 *
	 * @param string
	 */
	public function setDateFrom($dateFrom) {
		$this->dateFrom = $dateFrom;
	}

	/**
	 * Връща период на регистрация до.
	 *
	 * @return string
	 */
	public function getDateTo() {
		return $this->dateTo;
	}

	/**
	 * Задава период на регистрация до.
	 *
	 * @param string
	 */
	public function setDateTo($dateTo) {
		$this->dateTo = $dateTo;
	}

	/**
	 * Връща флаг, указващ дали потребителят е регистриран в публичната част.
	 *
	 * @return bool
	 */
	public function getIsPublicUser() {
		return $this->isPublicUser;
	}

	/**
	 * Задава флаг, указващ дали потребителят е регистриран в публичната част.
	 *
	 * @param bool
	 */
	public function setIsPublicUser($isPublicUser) {
		$this->isPublicUser = $isPublicUser;
	}

	/**
	 * Връща флаг, указващ дали потребителят се е идентифицирал с електронна идентификация.
	 *
	 * @return bool
	 */
	public function getIsIdentifiableUser() {
		return $this->isIdentifiableUser;
	}

	/**
	 * Задава флаг, указващ дали потребителят се е идентифицирал с електронна идентификация.
	 *
	 * @param bool
	 */
	public function setIsIdentifiableUser($isIdentifiableUser) {
		$this->isIdentifiableUser = $isIdentifiableUser;
	}

	/**
	 * Връща причини за отказан достъп при отказ за одобрение на заявка за специален достъп..
	 *
	 * @return string
	 */
	public function getStatusReason() {
		return $this->statusReason;
	}

	/**
	 * Задава причини за отказан достъп при отказ за одобрение на заявка за специален достъп..
	 *
	 * @param string
	 */
	public function setStatusReason($statusReason) {
		$this->statusReason = $statusReason;
	}
}