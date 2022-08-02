<?php
/**
 * AuditControllerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\Controller\AuditController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use User\Service\UserService;
use Application\Service\CacheService;

class AuditControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ListController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$userService = $container->get(UserService::class);

		$cacheService = $container->get(CacheService::class);

		$translator = $container->get('MvcTranslator');

		return new AuditController($container->get(\User\Data\UserDataManager::class), $userService, $cacheService, $translator);
	}
}