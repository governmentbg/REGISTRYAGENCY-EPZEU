<?php
/**
 * NomenclatureDataManagerFactory class file
 *
 * @package Nomenclature
 * @subpackage Factory
 */

namespace Nomenclature\Factory;

use Interop\Container\ContainerInterface;
use Application\Service\CacheService;
use Nomenclature\Controller\Plugin\LanguagePlugin;

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

		return new LanguagePlugin($cacheService, $params);

	}
}