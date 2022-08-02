<?php
/**
 * StatisticControllerFactory class file
 *
 * @package Forum
 * @subpackage Factory
 */
namespace Statistic\Factory;

use Statistic\Controller\StatisticController;
use Interop\Container\ContainerInterface;
use Application\Service\CacheService;

class StatisticControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$statisDM = $container->get(\Statistic\Data\StatisticDataManager::class);

		$documentDM = $container->get(\Document\Data\DocumentDataManager::class);

		$cacheService = $container->get(CacheService::class);

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$translator = $container->get('MvcTranslator');

		$restService = $container->get(\Application\Service\RestService::class);

		return new StatisticController($statisDM, $cacheService, $userDM, $translator, $restService, $documentDM);

	}
}