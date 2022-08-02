<?php
/**
 * WinCacheViewHelper class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\View\Helper\AbstractHelper;

class WinCacheViewHelper extends AbstractHelper {

	/**
	 *
	 * @var string
	 */
	protected $wincache;

	public function __construct($wincache) {
		$this->wincache = $wincache;
	}


	public function __invoke() {
		return $this->wincache;
	}
}