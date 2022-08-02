<?php
/**
 * IsAllowedPluginFactory class file
 *
 * @package User
 * @subpackage Controller
 */

namespace User\Factory;

use User\Controller\Plugin\IsAllowedPlugin;
use User\Service\UserService;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class IsAllowedPluginFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ListController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new IsAllowedPlugin($container->get(UserService::class));
	}
}