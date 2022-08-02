<?php
/**
 * UserServiceFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace Application\Factory;

use User\Service\UserService;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\View\Helper\FlashMessengerViewHelper;


class FlashMessengerViewHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$flashMessenger = $container->get('ControllerPluginManager')->get('flashMessenger');

		return new FlashMessengerViewHelper($flashMessenger);
	}
}