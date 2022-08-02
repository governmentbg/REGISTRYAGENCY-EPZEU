<?php
/**
 * IsAllowedHelper class file
 *
 * @package User
 * @subpackage View\Helper
 */


namespace User\View\Helper;

use Zend\View\Helper\AbstractHelper;

class IsAllowedHelper extends AbstractHelper {

	/**
	 *
	 * @var User\Service\UserService
	 */
	private $userService;

	public function __construct($userService) {
		$this->userService = $userService;
	}

	public function __invoke($route) {
		return $this->userService->isAllowed($route);
	}
}