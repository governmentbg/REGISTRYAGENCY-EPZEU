<?php
/**
 * StatisticControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;
use User\Service\UserService;
use Content\Controller\StatisticController;

class StatisticControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return VideoLessonController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$cacheService = $container->get(CacheService::class);

		$userService =  $container->get(UserService::class);

		return new StatisticController($container->get(\Content\Data\StatisticDataManager::class), $cacheService, $userService);
	}
}