<?php
/**
 * NomenclatureDataManagerFactory class file
 *
 * @package Nomenclature
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Application\Service\CacheService;
use Application\Controller\Plugin\LanguagePlugin;
use User\Service\UserService;

class LanguagePluginFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return LanguagePlugin
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$router = $container->get('router');

		$request = $container->get('request');

		$routerMatch = $router->match($request);

		$params = $routerMatch ? $routerMatch->getParams() : [];

		$cacheService = $container->get(CacheService::class);

		$userService = $container->get(UserService::class);

		return new LanguagePlugin($cacheService, $params, $userService);

	}
}