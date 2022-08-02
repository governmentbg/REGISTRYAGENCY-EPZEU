<?php
/**
 * NewsControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Content\Controller\NewsController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;
use User\Service\UserService;

class NewsControllerFactory implements FactoryInterface {

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

		return new NewsController($container->get(\Content\Data\NewsDataManager::class), $cacheService, $userService);
	}
}