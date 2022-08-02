<?php
/**
 * UserControllerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\Controller\UserController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use User\Service\UserService;
use Application\Service\CacheService;

class UserControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ListController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$translator = $container->get('MvcTranslator');

		$config =  $container->get('ControllerPluginManager')->get('getConfig')->config;

		$formManager = $container->get('FormElementManager');

		$userForm = $formManager->get('User\Form\UserForm');

		$userService = $container->get(UserService::class);

		$cacheService = $container->get(CacheService::class);

		$ldapSearchForm = $formManager->get('User\Form\LdapSearchForm');

		$configActiveDirectory = $container->get('configuration')['ldap'];

		return new UserController($container->get(\User\Data\UserDataManager::class), $translator, $userForm, $config, $userService, $cacheService, $ldapSearchForm, $configActiveDirectory);
	}
}