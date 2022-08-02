<?php
/**
 * MenuViewHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Application\View\Helper\MenuViewHelper;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class MenuViewHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return MenuViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$userService = $container->get('User\Service\UserService');

		$router = $container->get('router');
		$request = $container->get('request');

		$routerMatch = $router->match($request);

		$lang = null;

		// Проверка при 404
		if ($routeName = $routerMatch ? $routerMatch->getMatchedRouteName() : '')
			$lang = $container->get('Application')->getMvcEvent()->getRouteMatch()->getParam('lang', null);

		$translator = $container->get('MvcTranslator');

		return new MenuViewHelper($config, $userService, $routeName, $translator, $lang);
	}
}