<?php
/**
 * PageDataManagerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Content\Data\PageDataManager;

class PageDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PageDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new PageDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config);
	}
}