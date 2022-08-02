<?php
/**
 * LimitControllerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use User\Controller\LimitController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class LimitControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ListController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$translator = $container->get('MvcTranslator');

		$userDM = $container->get(\User\Data\UserDataManager::class);

		$cacheService = $container->get(\Application\Service\CacheService::class);

		return new LimitController($translator, $userDM, $cacheService);
	}
}