<?php
/**
 * ModuleControllerFactory class file
 *
 * @package DeclarationTemplate
 * @subpackage Factory
 */

namespace DeclarationTemplate\Factory;

use Interop\Container\ContainerInterface;
use DeclarationTemplate\Controller\ModuleController;
use Application\Service\RestService;

class ModuleControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ModuleController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$dataManager = $container->get('DeclarationTemplate\Data\DataManager');

		$restService = $container->get(RestService::class);

		return new ModuleController($dataManager, $restService);
	}
}