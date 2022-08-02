<?php
/**
 * LanguagePlugin class file
 *
 * @package Nomenclature
 * @subpackage Controller\Plugin
 */

namespace Application\Controller\Plugin;

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

	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;

	public function __construct($cacheService, $params, $userService) {
		$this->cacheService = $cacheService;
		$this->params = $params;
		$this->userService = $userService;
	}

	/**
	 * Връща идентификатор на избран език
	 *
	 * @return int
	 */
	public function getId() {

		if ($this->userService->hasPreviewRole())
			$languages = $this->cacheService->getLanguages(false);
		else
			$languages = $this->cacheService->getLanguages();

		$languageId = isset($this->params['lang']) && array_key_exists($this->params['lang'], $languages) ? $languages[$this->params['lang']]['language_id'] : $languages['bg']['language_id'];
		return $languageId;
	}

	/**
	 * Връща идентификатор на език по подразбиране
	 *
	 * @return int
	 */
	public function getDefaultId() {
		return $this->cacheService->getDefaultLanguageId();
	}

	/**
	 *
	 */
	public function isValidLanguage($matchedRoute) {

		if (!$matchedRoute)
			return true;

		if ($matchedRoute->getMatchedRouteName() == 'integration_container')
			return true;

		$pageParams = $matchedRoute->getParams();

		if (empty($pageParams['lang']))
			return true;

		$selectedLang = $pageParams['lang'];

		if ($this->userService->hasPreviewRole())
			$languages = $this->cacheService->getLanguages(false);
		else
			$languages = $this->cacheService->getLanguages();

		if (array_key_exists($selectedLang, $languages))
			return true;

		return false;
	}
}