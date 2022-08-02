<?php
/**
 * BulletinControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Content\Controller\BulletinController;

class BulletinControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return PageController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$bulletinDM = $container->get(\Content\Data\BulletinDataManager::class);

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$restService = $container->get(\Application\Service\RestService::class);

		return new BulletinController($bulletinDM, $userDM, $restService);
	}
}