<?php
/**
 * DataManagerFactory class file
 *
 * @package DeclarationTemplate
 * @subpackage Factory
 */

namespace DeclarationTemplate\Factory;

use Interop\Container\ContainerInterface;
use DeclarationTemplate\Data\DataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class DataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return DataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {


		$cache = $container->get('WinCache');

		return new DataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $cache);
	}
}