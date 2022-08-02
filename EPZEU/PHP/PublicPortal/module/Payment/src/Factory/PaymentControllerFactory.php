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
use Application\Service\CacheService;
use Application\Service\RestService;
use User\Service\UserService;

class PaymentControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PaymentController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$paymentDM = $container->get(\Payment\Data\PaymentDataManager::class);

		$translator = $container->get('MvcTranslator');

		$cacheService = $container->get(CacheService::class);

		$restService = $container->get(RestService::class);

		$userService = $container->get(UserService::class);

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$pageDM = $container->get(\Content\Data\PageDataManager::class);

		return new PaymentController($paymentDM, $translator, $cacheService, $restService, $userService, $userDM, $pageDM);
	}
}