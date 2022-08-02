<?php
/**
 * UserControllerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\Controller\UserController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use User\Service\UserService;
use Application\Service\CacheService;
use User\Controller\UnitedUserController;
use Application\Service\RestService;
use Application\Service\RateLimitService;

class UnitedUserControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$userService = $container->get(UserService::class);

		$cacheService = $container->get(CacheService::class);

		$restService = $container->get(RestService::class);

		$rateLimitService = $container->get(RateLimitService::class);

		return new UnitedUserController($userService, $cacheService, $restService, $rateLimitService);
	}

}