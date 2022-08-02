<?php
namespace Application\Factory;

use Application\Controller\IndexController;
use Interop\Container\ContainerInterface;
use Content\Data\PageDataManager;
use Content\Data\NewsDataManager;
use Application\Service\CacheService;

class IndexControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return IndexController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$pageDM = $container->get(PageDataManager::class);

		$newsDM = $container->get(NewsDataManager::class);

		$cacheService = $container->get(CacheService::class);

		return new IndexController($pageDM, $newsDM, $cacheService);

	}
}