<?php
/**
 * CacheServiceFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Application\Service\CacheService;

class CacheServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return CacheService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new CacheService($container);
	}
}