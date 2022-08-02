<?php
/**
 * PageControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Application\Service\CacheService;
use Content\Controller\PageController;

class PageControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PageController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$pageDM = $container->get(\Content\Data\PageDataManager::class);

		$cacheService = $container->get(CacheService::class);

		return new PageController($pageDM, $cacheService);
	}
}