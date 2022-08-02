<?php
/**
 * ForumController class file
 *
 * @package Forum
 * @subpackage Factory
 */
namespace Forum\Factory;

use Forum\Controller\ForumController;
use Interop\Container\ContainerInterface;
use Forum\Data\ForumDataManager;

class ForumControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$forumDM = $container->get(\Forum\Data\ForumDataManager::class);

		return new ForumController($forumDM);

	}
}