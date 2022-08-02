<?php
/**
 * IsAllowedHelper class file
 *
 * @package User
 * @subpackage View
 */

namespace User\View\Helper;

use Zend\View\Helper\AbstractHelper;

class IsAllowedHelper extends AbstractHelper {

	private $userService;

	public function __construct($userService) {
		$this->userService = $userService;
	}

	public function __invoke($route) {
		return $this->userService->isAllowed($route);
	}
}