<?php
/**
 * PageControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Content\Controller\PageController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;
use User\Service\UserService;
use Application\Service\RateLimitService;
use Application\Service\OidcService;

class PageControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$cacheService = $container->get(CacheService::class);

		$userService =  $container->get(UserService::class);

		$rateLimitService = $container->get(RateLimitService::class);

		$oidcService = $container->get(OidcService::class);

		return new PageController($container->get(\Content\Data\PageDataManager::class), $container->get(\Content\Data\NewsDataManager::class), $cacheService, $userService, $rateLimitService, $oidcService);
	}
}