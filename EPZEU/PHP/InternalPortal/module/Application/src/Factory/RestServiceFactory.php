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
use Nomenclature\Data\NomenclatureDataManager;

class RestServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return RestService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$cache = $container->get('WinCache');

		$cacheService = $container->get(CacheService::class);

		$oidcService = $container->get(OidcService::class);

		$nomenclatureDM = $container->get(NomenclatureDataManager::class);

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new RestService($config, $cache, $cacheService, $oidcService, $nomenclatureDM);
	}
}