<?php
/**
 * GetPageTitle class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class GetPageTitleViewHelper extends AbstractHelper {

	/**
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;

	private $titleList = null;

	private $langId = null;

	public function __construct($cacheService) {
		$this->cacheService = $cacheService;
	}

	public function __invoke($key) {

		$langId = $this->getLanguageId();

		$pageList = $this->getPageTitleList($langId);

		if (!array_key_exists($key, $pageList))
			return null;

		return $pageList[$key];
	}

	public function getLanguageId() {

		if ($this->langId)
			return $this->langId;

		$languageViewHelper = $this->getView()->plugin('language');
		$this->langId = $languageViewHelper->getId();

		return $this->langId;
	}

	public function getPageTitleList($langId) {

		if ($this->titleList)
			return $this->titleList;

		$this->titleList = $this->cacheService->getPageTitle($langId);

		return $this->titleList;

	}

}