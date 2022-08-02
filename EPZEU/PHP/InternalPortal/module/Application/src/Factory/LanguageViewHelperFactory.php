<?php
/**
 * LanguageViewHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Application\View\Helper\LanguageViewHelper;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;

class LanguageViewHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return LanguageViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$router = $container->get('router');
		$request = $container->get('request');
		$routerMatch = $router->match($request);
		$params = $routerMatch ? $routerMatch->getParams() : [];
		$queryParams = (array)$request->getQuery();
		$routeName = $routerMatch ? $routerMatch->getMatchedRouteName() : 'home';
		$cacheService = $container->get(CacheService::class);

		return new LanguageViewHelper($cacheService, $params, $routeName, $queryParams);
	}
}