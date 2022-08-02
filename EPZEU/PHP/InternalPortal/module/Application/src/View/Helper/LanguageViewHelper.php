<?php
/**
 * LanguageViewHelper class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;


/**
 * RouteViewHelper class
 *
 */
class LanguageViewHelper extends AbstractHelper {

	protected $cacheService;

	protected $params;

	protected $routeName;

	protected $queryParams;

	protected $languages;

	public function __construct($cacheService, $params, $routeName, $queryParams) {

		$this->cacheService = $cacheService;

		$this->params = $params;

		$this->routeName = $routeName;

		$this->queryParams = $queryParams;

	}

	/**
	 *	Връща масив с езици
	 *
	 *	@return array
	 */
	public function getLanguages() {

		if ($this->languages)
			return $this->languages;

		$this->languages = $this->cacheService->getLanguages();

		return $this->languages;
	}

	/**
	 * Връща текущ избран език
	 *
	 * @return string
	 */
	public function getCurrentLang($returnDefault = false) {
		return isset($this->params['lang']) ? $this->params['lang'] : ($returnDefault ? $this->getDefaultLanguage(): null);
	}

	/**
	 * Връща име на избрания език
	 *
	 * @return string
	 */
	public function getLanguagesName() {
		$currentLang = $this->getCurrentLang();
		$languageList = $this->getLanguages();
		$languageName = array_key_exists($currentLang, $languageList) ? $languageList[$currentLang]['name'] : $languageList['bg']['name'];
		return $languageName;
	}

	/**
	 * Генерира Dropdown с езици
	 *
	 * @return string
	 */
	public function renderDropDown() {

		$urlHelper = $this->getView()->plugin('Url');

		$params = $this->params;

		$currentLanguage = $this->getLanguagesName();

		$trasnlateHelper = $this->getView()->plugin('Translate');

		$html = '<div class="dropdown">';
		$html .= '<button type="button" class="btn btn-light dropdown-toggle mb-3" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
				   '.$trasnlateHelper->getTranslator()->translate('GL_LANGUAGE_L').' - '.$currentLanguage.'
				  </button>
				  <div class="dropdown-menu dropdown-menu-scrollable">';

		$setDivider = false;

		foreach ($this->cacheService->getLanguages() as $code => $language) {

			if ($language['is_default'])
				continue;

			if ($language['is_active'])
				$setDivider = true;

			if (!$language['is_active'] && $setDivider) {
				$html .= '<div class="dropdown-divider"></div>';
				$setDivider = false;
			}

			$params['lang'] = $code;

			$html .= '<a class="dropdown-item" href="'.$urlHelper($this->routeName, $params, ['query' => $this->queryParams]).'" >'.$code.' - '.$language['name'].'</a>';

		}

		$html .= '</div></div>';

		return $html;
	}

	/**
	 * Генерира селект с езици
	 */
	public function renderSelect() {

		$trasnlateHelper = $this->getView()->plugin('Translate');
		$urlHelper = $this->getView()->plugin('Url');

		$params = $this->params;

		$currentLang = isset($this->params['lang']) ? $this->params['lang'] : 'en';

		$html  = '<div class="form-row">';

		$html  .= 	'<div class="col-auto">
						<label class="form-text">'.$trasnlateHelper->getTranslator()->translate('GL_LANGUAGE_L').'</label>
					</div>

			<div class="col-md-8 col-lg-6 col-xl-4 form-group">';

		$html .= '<select class="form-control" id="language-select">';

		$setDivider = false;

			$html .= '<optgroup label="'.$trasnlateHelper->getTranslator()->translate('GL_ACTIVES_L').'">';

			foreach ($this->cacheService->getLanguages() as $code => $language) {

				if ($language['is_default'])
					continue;

				if ($language['is_active'])
					$setDivider = true;

				 if (!$language['is_active'] && $setDivider) {
					$html .= '</optgroup>';
					$html .= '<optgroup label="'.$trasnlateHelper->getTranslator()->translate('GL_INACTIVES').'">';
					$setDivider = false;
				}

				$params['lang'] = $code;
				$html .= '<option value="'.$urlHelper($this->routeName, $params, ['query' => $this->queryParams]).'" '.($currentLang == $code ? 'selected="selected"' : '').'>'.$code.' - '.$language['name'].'</option>';

			}
			$html .= '</optgroup>';

		$html .= '</select>';
		$html .= '</div>';
		$html .= '</div>';
		return $html;
	}
}