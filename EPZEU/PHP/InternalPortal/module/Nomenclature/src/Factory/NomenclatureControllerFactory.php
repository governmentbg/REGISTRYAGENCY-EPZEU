<?php
/**
 * NomenclatureControllerFactory class file
 *
 * @package Nomenclature
 * @subpackage Factory
 */

namespace Nomenclature\Factory;

use Nomenclature\Controller\NomenclatureController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;

class NomenclatureControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NomenclatureController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$translator = $container->get('MvcTranslator');

		$nomenclatureDataManager = $container->get(\Nomenclature\Data\NomenclatureDataManager::class);

		$cacheService = $container->get(CacheService::class);

		return new NomenclatureController($container->get(\Nomenclature\Data\NomenclatureDataManager::class), $translator, $cacheService);
	}
}