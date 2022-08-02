<?php
/**
 * VideoLessonDataManagerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Interop\Container\ContainerInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Content\Data\VideoLessonDataManager;
use Document\Service\DocumentService;

class VideoLessonDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return VideoLessonDataManager
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$documentService = $container->get(DocumentService::class);

		return new VideoLessonDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config, $documentService);
	}
}