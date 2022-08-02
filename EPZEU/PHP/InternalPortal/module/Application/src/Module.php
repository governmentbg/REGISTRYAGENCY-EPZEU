<?php
/**
 * Module class file
 *
 * @package Application
 */
namespace Application;

use Zend\Mvc\MvcEvent;
use Application\Service\CacheService;

class Module
{
	const APP_MAX_INT = 2147483647;

	public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function onBootstrap(MvcEvent $event) {

    	$sm = $event->getApplication()->getServiceManager();

    	$router = $sm->get('router');
    	$request = $sm->get('request');

    	if ($matchedRoute = $router->match($request)) {

    		$routeParams = $matchedRoute->getParams();

    		if (isset($routeParams['lang'])) {

    			$cacheService = $sm->get(CacheService::class);

    			$langs = $cacheService->getLanguages();

    			if (!array_key_exists($routeParams['lang'], $langs)) {

    				$url = $router->assemble(['lang' => null]+$routeParams, ['name' => $matchedRoute->getMatchedRouteName()]);
    				$response = $event->getResponse();
					$response->getHeaders()->addHeaderLine('Location', $url);
					$response->setStatusCode(302);
					$response->sendHeaders();
					return $response;
    			}
    		}
    	}

    	$config = $sm->get('ControllerPluginManager')->get('getConfig');

    	$sharedManager = $event->getApplication()->getEventManager()->getSharedManager();
		$sharedManager->attach('Zend\Mvc\Application', 'dispatch.error', function ($e) use ($sm) {
			if ($e->getParam('exception')) {
				errorHandler(
    				'E_ERROR',
    				$e->getParam('exception')->getMessage(),
    				$e->getParam('exception')->getFile(),
    				$e->getParam('exception')->getLine(),
    				$e->getParam('exception')->getTraceAsString()
    			);
			}
		});

		// Обновява списък с лейбъли
		$cacheService = $sm->get(Service\CacheService::class);
		$cacheService->createLabels('bg');

		$translator = $event->getApplication()->getServiceManager()->get('MvcTranslator');
		$translator->setLocale('bg');

		$viewModel = $event->getApplication()->getMvcEvent()->getViewModel();
		$viewModel->version = $config->config['GL_VERSION'];;
		$viewModel->idle = $config->config['EP_USR_SESSION_INACTIVITY_INTERVAL'];;
		$viewModel->cookieDomain = $config->config['GL_COMMON_COOKIE_DOMAIN'];
    }
}