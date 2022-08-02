<?php
/**
 * MessageControllerFactory class file
 *
 * @package Message
 * @subpackage Factory
 */

namespace Message\Factory;

use Message\Controller\MessageController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class MessageControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return MessageController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new MessageController($container->get(\Message\Data\MessageDataManager::class), $container->get(\User\Data\UserDataManager::class));
	}
}