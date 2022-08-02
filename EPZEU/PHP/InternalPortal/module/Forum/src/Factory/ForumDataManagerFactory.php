<?php
/**
 * ForumDataManagerFactory class file
 *
 * @package Forum
 * @subpackage Factory
 */

namespace Forum\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Forum\Data\ForumDataManager;

class ForumDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ForumDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new ForumDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true));
	}
}