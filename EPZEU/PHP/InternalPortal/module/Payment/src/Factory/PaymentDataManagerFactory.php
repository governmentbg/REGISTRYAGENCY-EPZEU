<?php
/**
 * PaymentDataManagerFactory class file
 *
 * @package Payment
 * @subpackage Factory
 */

namespace Payment\Factory;

use Interop\Container\ContainerInterface;
use Payment\Data\PaymentDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class PaymentDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PaymentDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new PaymentDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config);
	}
}