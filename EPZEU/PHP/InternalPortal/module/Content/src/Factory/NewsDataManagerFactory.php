<?php
/**
 * NewsDataManagerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Service\DocumentService;
use Content\Data\NewsDataManager;

class NewsDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return NewsDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$documentService = $container->get(DocumentService::class);

		return new NewsDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config, $documentService);
	}
}