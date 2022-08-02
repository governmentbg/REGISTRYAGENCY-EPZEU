<?php
/**
 * RestServiceFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Application\Service\RestService;

use Interop\Container\ContainerInterface;
use Application\Service\CacheService;
use Application\Service\OidcService;


class RestServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return RestService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$cacheService = $container->get(CacheService::class);

		$oidcService = $container->get(OidcService::class);

		return new RestService($config, $cacheService, $oidcService);

	}
}