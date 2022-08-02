<?php
/**
 * Module class file
 *
 * @package Application
 */

namespace Application;

use Zend\Mvc\MvcEvent;
use Zend\Http\Header\SetCookie;

class Module
{

	const APP_MAX_INT = 2147483647;

	public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }

    public function onBootstrap(MvcEvent $event) {

    	$cookieLangName = 'currentLang';

    	$sm = $event->getApplication()->getServiceManager();

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

		$router = $sm->get('router');
		$request = $sm->get('request');

		$matchedRoute = $router->match($request);

		$config = $sm->get('ControllerPluginManager')->get('getConfig');

		if (empty($config->config['GL_COMMON_COOKIE_DOMAIN'])) {

			if ($matchedRoute->getMatchedRouteName() != 'error') {


				$pageParams = $matchedRoute->getParams();

				$lang = isset($pageParams['lang']) ? $pageParams['lang'] : null;

				$url = $router->assemble(['lang' => $lang], ['name' => 'error']);
				$response = $event->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $url);
				$response->setStatusCode(302);
				$response->sendHeaders();
				exit;
			}

			$pageParams = $matchedRoute->getParams();

			$lang = isset($pageParams['lang']) ? $pageParams['lang'] : 'bg';

			$translator = $event->getApplication()->getServiceManager()->get('MvcTranslator');
			$translator->setLocale($lang);

		}

		else {

			// Зареждане на език при първоначално отваряне на системата
			$cookieObj = $request->getCookie();

			if (!$cookieObj || !$cookieObj->offsetExists('EPZEUSessionID')) {
				$userSessionID = \Application\Service\AppService::genToken();
				setcookie('EPZEUSessionID', $userSessionID, null, '/', $config->config['GL_COMMON_COOKIE_DOMAIN'], true, true );
			}

			$languagePlugin = $sm->get('ControllerPluginManager')->get('language');

			if (!$languagePlugin->isValidLanguage($matchedRoute)) {

				setcookie($cookieLangName, 'bg', time() - 3600, '/', $config->config['GL_COMMON_COOKIE_DOMAIN'], true, false);

				if (!$matchedRoute)
					$url = $router->assemble([], ['name' => 'home']);
				else {
					$pageParams = $matchedRoute->getParams();
					$pageParams['lang'] = null;
					$url = $router->assemble($pageParams, ['name' => $matchedRoute->getMatchedRouteName()]);
				}

				$response = $event->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $url);
				$response->setStatusCode(302);
				return $response->sendHeaders();
			}

			if ($matchedRoute && !$matchedRoute->getParam('lang') && strpos($_SERVER['REQUEST_URI'], 'login') === false) {

				if ($cookieObj && $cookieObj->offsetExists($cookieLangName) && $cookieObj->offsetGet($cookieLangName) != 'bg') {
					$cookieLang = $cookieObj->offsetGet($cookieLangName);
					$pageParams = $matchedRoute->getParams();
					$url = $router->assemble(['lang' => $cookieLang]+$pageParams, ['name' => $matchedRoute->getMatchedRouteName(), 'query' => $request->getQuery()->toArray()]);
					$response = $event->getResponse();
					$response->getHeaders()->addHeaderLine('Location', $url);
					$response->setStatusCode(302);
					$response->sendHeaders();
					exit;
				}
			}

			$event->getApplication()->getEventManager()->attach(MvcEvent::EVENT_DISPATCH,

					function($e)  use ($sm, $cookieLangName, $cookieObj, $config) {

						$translator = $e->getApplication()->getServiceManager()->get('MvcTranslator');

						$routeMatch = $e->getRouteMatch();

						$lang = $routeMatch->getParam('lang', 'bg');

						$translator->setLocale($lang);

						if ((!$cookieObj || !$cookieObj->offsetExists($cookieLangName))/* && $lang != 'bg'*/) {
							$response = $sm->get('response');
							$cookie = new SetCookie($cookieLangName, $lang, $config->config['cookieTtl'], '/', $config->config['GL_COMMON_COOKIE_DOMAIN'], true, false);
							$response->getHeaders()->addHeader($cookie);
						}

						// Обновява списък с лейбъли
						$cacheService = $sm->get(Service\CacheService::class);
						$cacheService->createLabels($lang);

				},
				100
			);

	        // определя версията на системата
	        $version = isset($config->config['GL_VERSION']) ? $config->config['GL_VERSION'] : '';

	        $idle = isset($config->config['EP_USR_SESSION_INACTIVITY_INTERVAL']) ? $config->config['EP_USR_SESSION_INACTIVITY_INTERVAL'] : '';

	        $viewModel = $event->getApplication()->getMvcEvent()->getViewModel();
	        $viewModel->version = $version;
	        $viewModel->idle = $idle;
	        $viewModel->routeName = $matchedRoute ? $matchedRoute->getMatchedRouteName() : 'home';
	        $viewModel->params = $matchedRoute ? $matchedRoute->getParams() : [];
	        $viewModel->registerType = '';
	        $viewModel->cookieDomain = $config->config['GL_COMMON_COOKIE_DOMAIN'];
	        $viewModel->idsrvUrl = $config->config['GL_IDSRV_URL'];


	        // Страница 404
	        if (!$matchedRoute) {
	        	$cookieLangValue = 'bg';

	        	if ($cookieObj->offsetExists($cookieLangName)) {
	        		$cookieLangValue =  $cookieObj->offsetGet($cookieLangName);
	        	}
	        	$translator = $event->getApplication()->getServiceManager()->get('MvcTranslator');
	        	$translator->setLocale($cookieLangValue);
	        }

	 		$event->getApplication()->getEventManager()->attach(MvcEvent::EVENT_DISPATCH,
	            function($e) use($viewModel) {
	                $viewModel->registerType = $e->getRouteMatch()->getParam('registerType', false);
	            }
	         );
		}

	}


}


