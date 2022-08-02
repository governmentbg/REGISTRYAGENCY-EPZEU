<?php
/**
 * LanguagePlugin class file
 *
 * @package Nomenclature
 * @subpackage Controller\Plugin
 */

namespace Nomenclature\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class LanguagePlugin extends AbstractPlugin{

	/**
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;

	/**
	 *
	 * @var array $params
	 */
	protected $params;

	public function __construct($cacheService, $params) {
		$this->cacheService = $cacheService;
		$this->params = $params;
	}

	/**
	 * Get configuration
	 * @return array
	 */
	public function getLanguages() {
		return $this->cacheService->getLanguages();
	}

	/**
	 * Връща идентификатор на избран език
	 *
	 * @return int
	 */
	public function getId() {
		$languages = $this->getLanguages(false);
		$languageId = isset($this->params['lang']) && array_key_exists($this->params['lang'], $languages) ? $languages[$this->params['lang']]['language_id'] : $languages['bg']['language_id'];
		return $languageId;
	}

	/**
	 * Връща идентификатор на език по подразбиране
	 *
	 * @return int
	 */
	public function getDefaultId() {
		return $languages = $this->cacheService->getDefaultLanguageId();
	}
}