<?php
/**
 * LanguageViewHelper class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class LanguageViewHelper extends AbstractHelper {

	protected $cacheService;

	protected $userService;

	protected $params;

	protected $routeName;

	protected $queryParams;

	protected $config;

	protected $cookieDomainName;


	private $allLanguages = null;

	private $activeLanguages = null;

	private $defaultLang;

	public function __construct($cacheService, $userService, $params, $routeName, $queryParams, $config, $cookieDomainName) {

		$this->cacheService = $cacheService;

		$this->userService = $userService;

		$this->params = $params;

		$this->routeName = $routeName;

		$this->queryParams = $queryParams;

		$this->config = $config;

		$this->cookieDomainName = $cookieDomainName;

	}

	/**
	 *	Връща масив с езици
	 *
	 *	@return array
	 */
	public function getLanguages($getActiveLangs = true) {

		if ($this->userService->hasPreviewRole() || $this->routeName == 'integration_container')
			$getActiveLangs = false;

		if ($getActiveLangs) {
			if ($this->activeLanguages)
				return $this->activeLanguages;

			$this->activeLanguages = $this->cacheService->getLanguages($getActiveLangs);
			return $this->activeLanguages;
		}

		else {

			if ($this->allLanguages)
				return $this->allLanguages;

			$this->allLanguages = $this->cacheService->getLanguages($getActiveLangs);
			return $this->allLanguages;
		}

		return $this->cacheService->getLanguages($getActiveLangs);
	}

	/**
	 * Връща текущ избран език
	 *
	 * @param bool $returnDefault
	 * @return string | bool
	 */
	public function getCurrentLang($returnDefault = false) {

		$langCode = isset($this->params['lang']) ? $this->params['lang'] : ($returnDefault ? $this->getDefaultLanguage(): null);

		if (!$returnDefault)
			$langCode == $this->getDefaultLanguage() ? null : $langCode;

		return $langCode;
	}

	/**
	 * Задава текущ език
	 *
	 * @param string $lang
	 */
	public function setCurrentLang($lang) {
		$this->params['lang'] = $lang;
	}

	/**
	 * Генерира меню за смяна на език
	 */
	public function renderLanguagesMenu() {

		if ($this->routeName == 'integration_container')
			return [];

		$urlHelper = $this->getView()->plugin('Url');

		$params = $this->params;

		$getActiveLangs = true;

		if ($this->userService->hasPreviewRole())
			$getActiveLangs = null;

		$menuLangArr = [];

		if ($langArr = $this->getLanguages($getActiveLangs)) {

			$setDivider = true;


			$queryParams = [];

			$nonPrintingChars = array_map('chr', range(0,31));
			$invalidChars = ['<', '>', '?', '"', '\\', '/', '*', '&', '\''];
			$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

			foreach ($this->queryParams as $key => $value) {
				$queryParams[str_replace($allInvalidChars, '', $key)] =  str_replace($allInvalidChars, '', $value);;
			}

			foreach ($langArr as $code => $language) {

				if ($code == $this->getDefaultLanguage())
					unset($params['lang']);

				else
					$params['lang'] = $code;

				if (!$language['is_active'] && $setDivider) {
					$menuLangArr[] = '<div class="dropdown-divider"></div>';
					$setDivider = false;
				}

				$menuLangArr[] = '<a onclick="onChangeLanguage(\''.$code.'\', \''.$urlHelper($this->routeName, $params, ['query' => $queryParams]).'\', \''.$this->cookieDomainName.'\', event)" href="'.$urlHelper($this->routeName, $params, ['query' => $queryParams]).'" class="dropdown-item" nav_key="lang" nav_value="'.$language['code'].'">'.$language['code'].' - '.$language['name'].'</a>';
			}
		}

		return $menuLangArr;
	}

	/**
	 * Взима език по подразбиране
	 *
	 * @return string
	 */
	public function getDefaultLanguage() {

		if ($this->defaultLang)
			return $this->defaultLang;

		$this->defaultLang = $this->cacheService->getDefaultLanguageCode();

		return $this->defaultLang;
	}

	/**
	 * Връща идентификатор на избран език
	 *
	 * @return int
	 */
	public function getId() {

		if (!$languages = $this->getLanguages())
			return null;

		$languageId = isset($this->params['lang']) && array_key_exists($this->params['lang'], $languages) ? $languages[$this->params['lang']]['language_id'] : $languages['bg']['language_id'];
		return $languageId;
	}

	/**
	 * Връща код на език по идентификатор на език
	 *
	 * @return int
	 */
	public function getLangById($id) {

		$languages = $this->getLanguages();

		$languageArr = [];
		$languageArr = array_column($languages, 'language_id', 'code');

		$languageCode = isset($id) && array_search($id, $languageArr) ? array_search($id, $languageArr) : null;

		return $languageCode;
	}
}