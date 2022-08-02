<?php
/**
 * ReportControllerFactory class file
 *
 * @package Statistic
 * @subpackage Factory
 */
namespace Statistic\Factory;

use Statistic\Controller\ReportController;
use Interop\Container\ContainerInterface;

class ReportControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$reportDM = $container->get(\Statistic\Data\ReportDataManager::class);

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$translator = $container->get('MvcTranslator');

		$cacheService = $container->get(\Application\Service\CacheService::class);

		return new ReportController($reportDM, $userDM, $translator, $cacheService);

	}
}