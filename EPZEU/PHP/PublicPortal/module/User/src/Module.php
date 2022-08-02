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
use User\Service\UserService;
use Application\Service\RateLimitService;


class Module {

	const SYS_USER = 1;

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
		$eventManager = $event->getApplication()->getEventManager();
		$eventManager->attach(MvcEvent::EVENT_DISPATCH, [$this, 'checkPermission'], 101);
	}

	/**
	 * Проверява за право на достъп
	 *
	 * @param MvcEvent $event
	 */
	public function checkPermission(MvcEvent $event) {

		$sm = $event->getApplication()->getServiceManager();

		$userService = $sm->get(UserService::class);

		$userService->isLoggedUserInOtherSystem($sm->get('request'));


		/*
		// Глобален rate limit
		$rateLimitExcludedRoutes = [
			'search', 'register', 'forgot_password'
		];

		$router = $sm->get('router');
		$request = $sm->get('request');

		$matchedRoute = $router->match($request);

		if (!in_array($matchedRoute->getMatchedRouteName(), $rateLimitExcludedRoutes)) {

			$userObj = $userService->getUser();

			$key = 'BASE_DATA_SERVICE_LIMIT';
			$value = $userObj ? 'CIN:'.$userObj->getCin() : 'IP:'.$_SERVER['REMOTE_ADDR'];


			$rateLimitService = $sm->get(RateLimitService::class);

			if ($rateLimitService->isRateLimitReached($key, $value, true)) {

				return $event->setRouteMatch(new RouteMatch([
					'controller'	=> IndexController::class,
					'action'		=> 'rateLimitReached'
				]));
			}
		}
		*/


		$router = $sm->get('router');
		$request = $sm->get('request');
		$matchedRoute = $router->match($request);

		$currentLang = false;

		if ($matchedRoute && $matchedRoute->getParam('lang'))
			$currentLang = $matchedRoute->getParam('lang');

		$hasAccess = $userService->checkPermission();

		if (!$hasAccess) {
			return $event->setRouteMatch(new RouteMatch([
				'controller'	=> IndexController::class,
				'action'		=> 'accessDenied',
				'lang'			=> $currentLang
			]));
		}
	}

}