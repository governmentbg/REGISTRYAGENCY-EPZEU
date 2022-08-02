<?php
namespace Statistic\Entity;

/**
 * Статистика
 *
 * @package Statistic
 * @subpackage Entity
 */
class StatisticEntity {

	protected $statisticId;

	/**
	 * Идентификатор на регистър.
	 *
	 * @var int
	 */
	protected $registerId;

	/**
	 * Наименование на статистика.
	 *
	 * @var string
	 */
	protected $name;

	/**
	 * Наименование на статистика на съответния език.
	 *
	 * @var string
	 */
	protected $nameI18n;

	/**
	 * Начина на генериране на отчет.
	 *
	 * @var int
	 */
	protected $typeGenarate;

	/**
	 * Адрес на услугата.
	 *
	 * @var string
	 */
	protected $url;

	/**
	 * Начална дата на периода на последен статистически отчет.
	 *
	 * @var string
	 */
	protected $dateFrom;

	/**
	 * Крайна дата на периода на последен статистически отчет.
	 *
	 * @var string
	 */
	protected $dateTo;

	/**
	 * Статус на последен отчет.
	 *
	 * @var int
	 */
	protected $status;

	/**
	 * Флаг, указващ дали страницата има превод на съответния език.
	 *
	 * @var bool
	 */
	protected $isTranslated;

	/**
	 * Връща the value of statisticId
	 *
	 * @return mixed
	 */
	public function getStatisticId() {
		return $this->statisticId;
	}

	/**
	 * Задава the value of statisticId
	 *
	 * @param mixed
	 */
	public function setStatisticId($statisticId) {
		$this->statisticId = $statisticId;
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
	 * @param int
	 */
	public function setRegisterId($registerId) {
		$this->registerId = $registerId;
	}

	/**
	 * Връща наименование на статистика.
	 *
	 * @return string
	 */
	public function getName() {
		return $this->name;
	}

	/**
	 * Задава наименование на статистика.
	 *
	 * @param string
	 */
	public function setName($name) {
		$this->name = $name;
	}

	/**
	 * Връща начина на генериране на отчет.
	 *
	 * @return int
	 */
	public function getTypeGenarate() {
		return $this->typeGenarate;
	}

	/**
	 * Задава начина на генериране на отчет.
	 *
	 * @param int
	 */
	public function setTypeGenarate($typeGenarate) {
		$this->typeGenarate = $typeGenarate;
	}

	/**
	 * Връща адрес на услугата.
	 *
	 * @return string
	 */
	public function getUrl() {
		return $this->url;
	}

	/**
	 * Задава адрес на услугата.
	 *
	 * @param string
	 */
	public function setUrl($url) {
		$this->url = $url;
	}

	/**
	 * Връща начална дата на периода на последен статистически отчет.
	 *
	 * @return string
	 */
	public function getDateFrom() {
		return $this->dateFrom;
	}

	/**
	 * Задава начална дата на периода на последен статистически отчет.
	 *
	 * @param string
	 */
	public function setDateFrom($dateFrom) {
		$this->dateFrom = $dateFrom;
	}

	/**
	 * Връща крайна дата на периода на последен статистически отчет.
	 *
	 * @return string
	 */
	public function getDateTo() {
		return $this->dateTo;
	}

	/**
	 * Задава крайна дата на периода на последен статистически отчет.
	 *
	 * @param string
	 */
	public function setDateTo($dateTo) {
		$this->dateTo = $dateTo;
	}

	/**
	 * Задавастатус на последен отчет.
	 *
	 * @return int
	 */
	public function getStatus() {
		return $this->status;
	}

	/**
	 * Задава статус на последен отчет.
	 *
	 * @param int
	 */
	public function setStatus($status) {
		$this->status = $status;
	}

	/**
	* Задава наименование на статистика на съответния език.
	*
	* @return string
	*/
	public function getNameI18n(){
		return $this->nameI18n;
	}

	/**
	* Задава наименование на статистика на съответния език.
	*
	* @param string
	*/
	public function setNameI18n($nameI18n){
		$this->nameI18n = $nameI18n;
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

}