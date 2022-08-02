<?php
/**
 * ApplicationDataManagerFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Application\Data\ApplicationDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class ApplicationDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ApplicationDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new ApplicationDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true));

	}
}