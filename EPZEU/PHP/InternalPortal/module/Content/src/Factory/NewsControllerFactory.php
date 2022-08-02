<?php
/**
 * NewsControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Content\Data\NewsDataManager;
use Content\Controller\NewsController;
use Application\Service\CacheService;

class NewsControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$newsDM = $container->get(\Content\Data\NewsDataManager::class);
		$cacheService = $container->get(CacheService::class);

		return new NewsController($newsDM, $cacheService);
	}
}