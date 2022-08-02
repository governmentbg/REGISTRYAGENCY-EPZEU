<?php
/**
 * IsAllowedPlugin class file
 *
 * @package User
 * @subpackage Controller\Plugin
 */

namespace User\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class IsAllowedPlugin extends AbstractPlugin{

	private $userService;

	public function __construct($userService) {
		$this->userService = $userService;
	}

	public function __invoke($route) {
		return $this->userService->isAllowed($route);
	}


}