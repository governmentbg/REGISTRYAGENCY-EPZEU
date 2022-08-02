<?php
/**
 * MessageDataManagerFactory class file
 *
 * @package Message
 * @subpackage Factory
 */

namespace Message\Factory;

use Interop\Container\ContainerInterface;
use Message\Data\MessageDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;

class MessageDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return MessageDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new MessageDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config);
	}
}