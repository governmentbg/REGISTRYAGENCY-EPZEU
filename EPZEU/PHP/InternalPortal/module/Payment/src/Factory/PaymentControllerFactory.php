<?php
/**
 * PaymentControllerFactory class file
 *
 * @package Payment
 * @subpackage Factory
 */

namespace Payment\Factory;

use Payment\Controller\PaymentController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class PaymentControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PaymentController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new PaymentController($container->get(\Payment\Data\PaymentDataManager::class));
	}
}