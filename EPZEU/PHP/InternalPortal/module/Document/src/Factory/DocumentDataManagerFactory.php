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

class DocumentDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('configuration')['config'];

		return new DocumentDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config);
	}
}