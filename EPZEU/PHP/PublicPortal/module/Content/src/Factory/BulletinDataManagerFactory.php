<?php
/**
 * BulletinDataManagerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Content\Data\BulletinDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class BulletinDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return BulletinDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new BulletinDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true));
	}
}