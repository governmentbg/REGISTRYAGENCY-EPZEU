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
use Application\Service\OidcService;
use Nomenclature\Data\NomenclatureDataManager;


class CacheServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return CacheService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$nomenclatureDM = $container->get(NomenclatureDataManager::class);

		$cache = $container->get('WinCache');

		$oidcService = $container->get(OidcService::class);

		$config = $container->get('configuration')['config'];

		return new CacheService($nomenclatureDM, $cache, $oidcService, $config);
	}
}