<?php
/**
 * NomenclatureDataManagerFactory class file
 *
 * @package Nomenclature
 * @subpackage Factory
 */

namespace Nomenclature\Factory;

use Interop\Container\ContainerInterface;
use Nomenclature\Data\NomenclatureDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class NomenclatureDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NomenclatureDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new NomenclatureDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true));
	}
}