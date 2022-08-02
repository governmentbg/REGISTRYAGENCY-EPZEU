<?php
/**
 * AppServiceFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Application\Service\AppService;
use Interop\Container\ContainerInterface;
use Application\Data\ApplicationDataManager;

class AppServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return AppService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$appDM = $container->get(ApplicationDataManager::class);
		$winCache = $container->get('WinCache');

		return new AppService($appDM, $winCache);
	}
}