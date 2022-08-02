<?php
/**
 * PageNotFoundHelper class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class PageNotFoundHelper extends AbstractHelper {

	/**
	 *
	 * @var \Content\Data\UserService
	 */
	protected $pageDM;

	public function __construct($pageDM) {

		$this->pageDM = $pageDM;

	}

	/**
	 * Взича имената на ресурсите на всички подменюта
	 *
	 * @param array $item
	 * @return array
	 */
	public function get() {

		$pageId = \Content\Controller\PageController::REDEFINED_PAGE_LIST['404'];

		$request = new \Zend\Http\PhpEnvironment\Request();
		$selectedLang = $request->getCookie() && $request->getCookie()->offsetExists('currentLang') ? $request->getCookie()->offsetGet('currentLang') : 'bg';

		$languageViewHelper = $this->getView()->plugin('language');

		$languageViewHelper->setCurrentLang($selectedLang);

		$activeLanguages = $languageViewHelper->getLanguages();
		$langId = null;

		if (is_array($activeLanguages) && array_key_exists($selectedLang, $activeLanguages)) {
			$langId = $activeLanguages[$selectedLang]['language_id'];
		}

		$params = [
			'idList' 		=> [$pageId],
			'loadContent' 	=> true,
			'total_count' 	=> false,
		];

		$pageObj = $this->pageDM->getPageList($totalCount, $langId, $params, \Content\Controller\PageController::REDEFINED_PAGE)->current();

		return $pageObj;
	}
}