<?php
/**
 * ConfigPluginFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Application\Controller\Plugin\ConfigPlugin;
use Application\Service\CacheService;

class ConfigPluginFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ConfigPlugin
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('configuration')['config'];

		$winCache = $container->get(CacheService::class)->getParamList();

		return new ConfigPlugin(array_merge($winCache, $config));
	}
}