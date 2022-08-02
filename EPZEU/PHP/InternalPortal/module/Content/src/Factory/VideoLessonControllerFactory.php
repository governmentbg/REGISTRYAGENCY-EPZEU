<?php
/**
 * VideoLessonController class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Content\Controller\VideoLessonController;
use Interop\Container\ContainerInterface;
use Application\Service\CacheService;

class VideoLessonControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return VideoLessonController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$videoLessonDM = $container->get(\Content\Data\VideoLessonDataManager::class);
		$cacheService = $container->get(CacheService::class);

		return new VideoLessonController($videoLessonDM, $cacheService);
	}
}