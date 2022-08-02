<?php
/**
 * PageControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Content\Controller\NewsController;
use Application\Service\CacheService;
use Content\Controller\NestedPageController;
use Nomenclature\Data\NomenclatureDataManager;

class NestedPageControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$pageDM = $container->get(\Content\Data\PageDataManager::class);

		$cacheService = $container->get(CacheService::class);

		$nomenclatureDM = $container->get(NomenclatureDataManager::class);

		return new NestedPageController($pageDM, $nomenclatureDM, $cacheService);
	}
}