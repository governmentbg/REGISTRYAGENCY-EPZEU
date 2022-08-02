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
use Application\Service\RestService;
use Application\Service\RateLimitService;

class UserControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$formManager = $container->get('FormElementManager');

		$userForm = $formManager->get('User\Form\UserForm');

		$userService = $container->get(UserService::class);

		$cacheService = $container->get(CacheService::class);

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$restService = $container->get(RestService::class);

		$pageDM = $container->get(\Content\Data\PageDataManager::class);

		$rateLimitService = $container->get(RateLimitService::class);

		return new UserController($userDM, $userForm, $userService, $cacheService, $restService, $pageDM, $rateLimitService);
	}
}