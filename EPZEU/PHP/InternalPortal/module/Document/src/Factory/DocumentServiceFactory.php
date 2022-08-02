<?php
/**
 * DocumentServiceFactory class file
 *
 * @package Document
 * @subpackage Factory
 */

namespace Document\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Service\DocumentService;

class DocumentServiceFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ListController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		return new DocumentService($config);
	}
}