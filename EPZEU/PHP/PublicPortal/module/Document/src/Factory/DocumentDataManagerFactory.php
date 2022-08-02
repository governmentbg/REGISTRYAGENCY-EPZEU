<?php
/**
 * NewsDataManagerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Document\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Data\DocumentDataManager;
use User\Service\UserService;
use User\Data\UserDataManager;

class DocumentDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$userService = $container->get(UserService::class);

		$userDM = $container->get(UserDataManager::class);

		return new DocumentDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $userService, $userDM);
	}
}