<?php
/**
 * RateLimitServiceFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Application\Service\RestService;

use Interop\Container\ContainerInterface;
use Application\Service\RateLimitService;


class RateLimitServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return RestService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {


		$response = $container->get('response');

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$winCache = $container->get('WinCache');

		return new RateLimitService($config, $response, $winCache);

	}
}