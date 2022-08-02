<?php
/**
 * UserDataManagerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use Interop\Container\ContainerInterface;
use User\Data\UserDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Service\DocumentService;
use Application\Service\CacheService;
use Application\Service\RestService;
use Zend\Authentication\AuthenticationService;

class UserDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return UserDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$documentService = $container->get(DocumentService::class);

		$cacheService = $container->get(CacheService::class);

		$restService = $container->get(RestService::class);

		$translator = $container->get('MvcTranslator');

		$authService = $container->get(AuthenticationService::class);

		return new UserDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config, $documentService, $cacheService, $restService, $translator, $authService);
	}
}