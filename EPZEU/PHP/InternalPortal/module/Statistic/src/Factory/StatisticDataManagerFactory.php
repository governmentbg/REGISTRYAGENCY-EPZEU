<?php
/**
 * StatisticDataManagerFactory class file
 *
 * @package Statistic
 * @subpackage Factory
 */

namespace Statistic\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Statistic\Data\StatisticDataManager;

class StatisticDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new StatisticDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config);
	}
}