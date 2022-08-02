<?php

namespace Content\Entity;

/**
 * Йерархична страница
 *
 * @package Content
 * @subpackage Entity
 */
class PageEntity {


	/**
	 * Тип на йерархична страница.
	 *
	 * @var int
	 */
	protected $type;


	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;


	/**
	 * Идентификатор на услуга.
	 *
	 * @var int
	 */
	protected $serviceId;


	/**
	 * Идентификатор на заявление.
	 *
	 * @var int
	 */
	protected $applicationId;


	/**
	 * Идентификатор на родител на йерархична страница.
	 *
	 * @var int
	 */
	protected $parentId;


	/**
	 * Идентификатор на йерархична страница.
	 *
	 * @var int
	 */
	protected $pageId;


	/**
	 * Пореден номер на йерархична страница.
	 *
	 * @var int
	 */
	protected $orderNum;


	/**
	 * Флаг, указващ дали йерархичната страница е група.
	 *
	 * @var bool
	 */
	protected $isGroup;


	/**
	 * Заглавие на йерархична страница.
	 *
	 * @var string
	 */
	protected $title;


	/**
	 * Съдържание на йерархична страница.
	 *
	 * @var string
	 */
	protected $content;


	/**
	 * Дата и час на редакция на йерархична страница.
	 *
	 * @var string
	 */
	protected $updatedOn;


	/**
	 * Идентификатор на потребител, редактирал йерархична страница.
	 *
	 * @var int
	 */
	protected $updatedBy;


	/**
	 * Дата и час на създаване на йерархична страница.
	 *
	 * @var string
	 */
	protected $createdOn;


	/**
	 * Идентификатор на потребител, създал йерархична страница.
	 *
	 * @var int
	 */
	protected $createdBy;


	/**
	 * Брой елементи на йерархична страница.
	 *
	 * @var int
	 */
	protected $elementCount;


	/**
	 * Списък с прикачени документи на йерархична страница.
	 *
	 * @var array
	 */
	protected $files;


	/**
	 * Заглавие на йерархична страница на съответния език.
	 *
	 * @var string
	 */
	protected $titleI18n;


	/**
	 * Съдържание на йерархична страница на съответния език.
	 *
	 * @var string
	 */
	protected $contentI18n;


	/**
	 * Флаг, указващ дали йерархичната страница има превод на съответния език.
	 *
	 * @var int
	 */
	protected $isTranslated;


	/**
	 * Наименование на услуга.
	 *
	 * @var string
	 */
	protected $serviceName;


	/**
	 * Наименование на заявление.
	 *
	 * @var string
	 */
	protected $applicationName;


	/**
	 * Наименование на прикачен документ.
	 *
	 * @var string
	 */
	protected $fileName;


	/**
	 * Размер на прикачен документ.
	 *
	 * @var int
	 */
	protected $fileSize;


	/**
	 * Тип на прикачен документ.
	 *
	 * @var string
	 */
	protected $contentType;


	/**
	 * Съдържание на прикачен документ.
	 *
	 * @var string
	 */
	protected $fileContent;

	/**
	 * Код на вид заявление.
	 *
	 * @var string
	 */
	protected $appCode;

	/**
	 * Път до страница.
	 *
	 * @var string
	 */
	protected $url;


	/**
	 * Връща тип на йерархична страница.
	 *
	 * @return int
	 */
	public function getType() {
		return $this->type;
	}

	/**
	 * Задава тип на йерархична страница.
	 *
	 * @param int $type
	 */
	public function setType($type) {
		$this->type = $type;
	}

	/**
	 * Връща идентификатор на регистър.
	 *
	 * @return int
	 */
	public function getRegisterId() {
		return $this->registerId;
	}

	/**
	 * Задава идентификатор на регистър.
	 *
	 * @param int $registerId
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща идентификатор на услуга.
	 *
	 * @return int
	 */
	public function getServiceId() {
		return $this->serviceId;
	}

	/**
	 * Задава идентификатор на услуга.
	 *
	 * @param int $serviceId
	 */
	public function setServiceId($serviceId) {
		$this->serviceId = $serviceId;
	}

	/**
	 * Връща идентификатор на заявление.
	 *
	 * @return int
	 */
	public function getApplicationId() {
		return $this->applicationId;
	}

	/**
	 * Задава идентификатор на заявление.
	 *
	 * @param int $applicationId
	 */
	public function setApplicationId($applicationId) {
		$this->applicationId = $applicationId;
	}

	/**
	 * Връща идентификатор на родител на йерархична страница.
	 *
	 * @return int
	 */
	public function getParentId() {
		return $this->parentId;
	}

	/**
	 * Задава идентификатор на родител на йерархична страница.
	 *
	 * @param int $parentId
	 */
	public function setParentId($parentId) {
		$this->parentId = $parentId;
	}

	/**
	 * Връща идентификатор на йерархична страница.
	 *
	 * @return int
	 */
	public function getPageId() {
		return $this->pageId;
	}

	/**
	 * Задава идентификатор на йерархична страница.
	 *
	 * @param int $pageId
	 */
	public function setPageId($pageId) {
		$this->pageId = $pageId;
	}

	/**
	 * Връща пореден номер на йерархична страница.
	 *
	 * @return int
	 */
	public function getOrderNum() {
		return $this->orderNum;
	}

	/**
	 * Задава пореден номер на йерархична страница.
	 *
	 * @param int $orderNum
	 */
	public function setOrderNum($orderNum) {
		$this->orderNum = $orderNum;
	}

	/**
	 * Връща флаг, указващ дали йерархичната страница е група.
	 *
	 * @return bool
	 */
	public function getIsGroup() {
		return $this->isGroup;
	}

	/**
	 * Задава флаг, указващ дали йерархичната страница е група.
	 *
	 * @param bool $isGroup
	 */
	public function setIsGroup($isGroup) {
		$this->isGroup = $isGroup;
	}

	/**
	 * Връща заглавие на йерархична страница.
	 *
	 * @return string
	 */
	public function getTitle() {
		return $this->title;
	}

	/**
	 * Задава заглавие на йерархична страница.
	 *
	 * @param string $title
	 */
	public function setTitle($title) {
		$this->title = $title;
	}

	/**
	 * Връща съдържание на йерархична страница.
	 *
	 * @return string
	 */
	public function getContent() {
		return $this->content;
	}

	/**
	 * Задава съдържание на йерархична страница.
	 *
	 * @param string $content
	 */
	public function setContent($content) {
		$this->content = $content;
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
	 * @param string $updatedOn
	 */
	public function setUpdatedOn($updatedOn) {
		$this->updatedOn = $updatedOn;
	}

	/**
	 * Връща идентификатор на потребител, редактирал йерархична страница.
	 *
	 * @return int
	 */
	public function getUpdatedBy() {
		return $this->updatedBy;
	}

	/**
	 * Задава идентификатор на потребител, редактирал йерархична страница.
	 *
	 * @param int $updatedBy
	 */
	public function setUpdatedBy($updatedBy) {
		$this->updatedBy = $updatedBy;
	}

	/**
	 * Връща дата и час на създаване на йерархична страница.
	 *
	 * @return string
	 */
	public function getCreatedOn() {
		return $this->createdOn;
	}

	/**
	 * Задава дата и час на създаване на йерархична страница.
	 *
	 * @param string $createdOn
	 */
	public function setCreatedOn($createdOn) {
		$this->createdOn = $createdOn;
	}

	/**
	 * Връща идентификатор на потребител, създал йерархична страница.
	 *
	 * @return int
	 */
	public function getCreatedBy() {
		return $this->createdBy;
	}

	/**
	 * Задава идентификатор на потребител, създал йерархична страница.
	 *
	 * @param int $createdBy
	 */
	public function setCreatedBy($createdBy) {
		$this->createdBy = $createdBy;
	}

	/**
	 * Връща брой елементи на йерархична страница.
	 *
	 * @return int
	 */
	public function getElementCount() {
		return $this->elementCount;
	}

	/**
	 * Задава брой елементи на йерархична страница.
	 *
	 * @param int $elementCount
	 */
	public function setElementCount($elementCount) {
		$this->elementCount = $elementCount;
	}

	/**
	 * Връща списък с прикачени документи на йерархична страница.
	 *
	 * @return array
	 */
	public function getFiles() {
		return $this->files;
	}

	/**
	 * Задава списък с прикачени документи на йерархична страница.
	 *
	 * @param array $files
	 */
	public function setFiles($files) {
		$this->files = $files;
	}

	/**
	 * Връща наименование на прикачен документ.
	 *
	 * @return string
	 */
	public function getFileName() {
		return $this->fileName;
	}

	/**
	 * Задава наименование на прикачен документ.
	 *
	 * @param string $fileName
	 */
	public function setFileName($fileName) {
		$this->fileName = $fileName;
	}

	/**
	 * Връща размер на прикачен документ.
	 *
	 * @return int
	 */
	public function getFileSize() {
		return $this->fileSize;
	}

	/**
	 * Задава размер на прикачен документ.
	 *
	 * @param int $fileSize
	 */
	public function setFileSize($fileSize) {
		$this->fileSize = $fileSize;
	}

	/**
	 * Връща тип на прикачен документ.
	 *
	 * @return string
	 */
	public function getContentType() {
		return $this->contentType;
	}

	/**
	 * Задава тип на прикачен документ.
	 *
	 * @param string $contentType
	 */
	public function setContentType($contentType) {
		$this->contentType = $contentType;
	}

	/**
	 * Връща съдържание на прикачен документ.
	 *
	 * @return string
	 */
	public function getFileContent() {
		return $this->fileContent;
	}

	/**
	 * Задава съдържание на прикачен документ.
	 *
	 * @param string $fileContent
	 */
	public function setFileContent($fileContent) {
		$this->fileContent = $fileContent;
	}

	/**
	 * Връща наименование на услуга.
	 *
	 * @return string
	 */
	public function getServiceName() {
		return $this->serviceName;
	}

	/**
	 * Задава наименование на услуга.
	 *
	 * @param string $serviceName
	 */
	public function setServiceName($serviceName) {
		$this->serviceName = $serviceName;
	}

	/**
	 * Връща наименование на заявление.
	 *
	 * @return string
	 */
	public function getApplicationName() {
		return $this->applicationName;
	}

	/**
	 * Задава наименование на заявление.
	 *
	 * @param string $applicationName
	 */
	public function setApplicationName($applicationName) {
		$this->applicationName = $applicationName;
	}

	/**
	 * Връща заглавие на йерархична страница на съответния език.
	 *
	 * @return string
	 */
	public function getTitleI18n() {
		return $this->titleI18n;
	}

	/**
	 * Задава заглавие на йерархична страница на съответния език.
	 *
	 * @param string $titleI18n
	 */
	public function setTitleI18n($titleI18n) {
		$this->titleI18n = $titleI18n;
	}

	/**
	 * Връща съдържание на йерархична страница на съответния език.
	 *
	 * @return string
	 */
	public function getContentI18n() {
		return $this->contentI18n;
	}

	/**
	 * Задава съдържание на йерархична страница на съответния език.
	 *
	 * @param string $contentI18n
	 */
	public function setContentI18n($contentI18n) {
		$this->contentI18n = $contentI18n;
	}

	/**
	 * Връща флаг, указващ дали йерархичната страница има превод на съответния език.
	 *
	 * @return int
	 */
	public function getIsTranslated() {
		return $this->isTranslated;
	}

	/**
	 * Задава флаг, указващ дали йерархичната страница има превод на съответния език.
	 *
	 * @param int $isTranslated
	 */
	public function setIsTranslated($isTranslated) {
		$this->isTranslated = $isTranslated;
	}

	/**
	 * Връща код на вид заявление.
	 *
	 * @return string
	 */
	public function getAppCode() {
		return $this->appCode;
	}

	/**
	 * Задава код на вид заявление.
	 *
	 * @param string
	 */
	public function setAppCode($appCode) {
		$this->appCode = $appCode;
	}

	/**
	 * Връща път до страница.
	 *
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * Задава път до страница.
	 *
	 * @param string
	 */
	public function setUrl($url) {
		$this->url = $url;
	}
}