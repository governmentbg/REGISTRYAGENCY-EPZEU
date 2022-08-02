<?php
/**
 * VideoLessonControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Content\Controller\VideoLessonController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;
use User\Service\UserService;

class VideoLessonControllerFactory implements FactoryInterface {

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

		return new VideoLessonController($container->get(\Content\Data\VideoLessonDataManager::class), $cacheService, $userService);
	}
}