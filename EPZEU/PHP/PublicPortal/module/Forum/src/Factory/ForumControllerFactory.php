<?php
/**
 * ForumControllerFactory class file
 *
 * @package Forum
 * @subpackage Factory
 */

namespace Forum\Factory;

use Forum\Controller\ForumController;
use Interop\Container\ContainerInterface;
use Forum\Data\ForumDataManager;
use User\Service\UserService;
use Application\Service\RestService;
use User\Data\UserDataManager;

class ForumControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$forumDM = $container->get(ForumDataManager::class);

		$userDM = $container->get(UserDataManager::class);

		$userService = $container->get(UserService::class);

		$restService = $container->get(RestService::class);

		return new ForumController($forumDM, $userService, $restService, $userDM);

	}
}