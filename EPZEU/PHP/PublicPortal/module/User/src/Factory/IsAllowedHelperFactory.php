<?php
/**
 * IsAllowedHelperFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\View\Helper\IsAllowedHelper;
use User\Service\UserService;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class IsAllowedHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return IsAllowedHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new IsAllowedHelper($container->get(UserService::class));
	}
}