<?php
/**
 * UserServiceFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\Service\UserService;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Zend\Authentication\AuthenticationService;
use Zend\Authentication\Storage\NonPersistent;
use Application\Service\OidcService;
use Application\Service\AppService;

class UserServiceFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$router = $container->get('router');
		$request = $container->get('request');

		// Get the router match
		$routerMatch = $router->match($request);

		$oidcService = $container->get(OidcService::class);

		$authService = $container->get(AuthenticationService::class);

		$authService->setStorage(new NonPersistent());

		$config = $container->get('configuration');

		$appService = $container->get(AppService::class);

		$cookieDomainName = $appService->getDomainCookieName();

		return new UserService($container->get(\User\Data\UserDataManager::class), $routerMatch, $oidcService, $authService, $config, $router, $cookieDomainName);
	}
}