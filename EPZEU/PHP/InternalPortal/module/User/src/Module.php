<?php
/**
 * Module class file
 *
 * @package User
 */

namespace User;

use Zend\Mvc\MvcEvent;
use Zend\Router\Http\RouteMatch;
use Application\Controller\IndexController;

class Module {

	const SYS_USER = 2;

	/**
	 * Взима конфигурационни параметри за модул
	 */
	public function getConfig() {
		return include __DIR__ . '/../config/module.config.php';
	}

	/**
	 *
	 * @param MvcEvent $event
	 */
	public function onBootstrap(MvcEvent $event) {
		$em = $event->getApplication()->getEventManager();
		$em->attach(MvcEvent::EVENT_DISPATCH, [$this, 'checkPermission'], 101);
	}


	/**
	 * Проверява за право на достъп
	 *
	 * @param MvcEvent $event
	 */
	public function checkPermission(MvcEvent $event) {

		$userService = $event->getApplication()->getServiceManager()->get('User\Service\UserService');
		$userService->setContextUser();

		$routeName = $event->getApplication()->getServiceManager()->get('Application')->getMvcEvent()->getRouteMatch()->getMatchedRouteName();

		if (!$userService->getAuthService()->hasIdentity() && $routeName != 'login' && $routeName != 'logout' && $routeName != 'idle_logout') {
			$response = $event->getResponse();
			$response->setStatusCode(403);
			$response->getHeaders()->addHeaderLine('Location', $event->getRequest()->getBaseUrl() . '/login');
			$response->sendHeaders();
			exit;
		}

    	$hasAccess = $userService->checkPermission();

    	if (!$hasAccess) {
    		$event->setRouteMatch(new RouteMatch([
    			'controller' => IndexController::class,
    			'action' => 'accessDenied'
	    	]));
    	}
	}
}