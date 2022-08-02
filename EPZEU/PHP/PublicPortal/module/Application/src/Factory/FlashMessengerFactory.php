<?php
/**
 * UserServiceFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Controller\Plugin\FlashMessenger;


class FlashMessengerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new FlashMessenger();
	}
}