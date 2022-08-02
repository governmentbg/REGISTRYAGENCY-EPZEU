<?php
/**
 * ApplicationDataManagerFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;


use Application\Service\AppService;

use Interop\Container\ContainerInterface;
use Nomenclature\Data\NomenclatureDataManager;

class AppServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return AppService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$nomenclatureDM = $container->get(NomenclatureDataManager::class);
		$winCache = $container->get('WinCache');

		return new AppService($nomenclatureDM, $winCache);

	}
}