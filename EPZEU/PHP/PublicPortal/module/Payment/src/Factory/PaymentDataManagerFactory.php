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
use Application\Service\RestService;
use User\Service\UserService;
use User\Data\UserDataManager;

class PaymentDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PaymentDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$restService = $container->get(RestService::class);

		$userService = $container->get(UserService::class);

		$userDM = $container->get(UserDataManager::class);

		return new PaymentDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $restService, $userService, $userDM);
	}
}