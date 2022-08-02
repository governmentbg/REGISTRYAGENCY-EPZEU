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

		$params = [
			'idList' 		=> [$pageId],
			'loadContent' 	=> true,
			'total_count' 	=> false,
		];

		$pageObj = $this->pageDM->getPageList($totalCount, null, $params, \Content\Controller\PageController::REDEFINED_PAGE)->current();

		return $pageObj;
	}
}