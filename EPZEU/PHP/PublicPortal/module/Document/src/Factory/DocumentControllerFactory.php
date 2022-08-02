<?php
/**
 * DocumentControllerFactory class file
 *
 * @package Document
 * @subpackage Factory
 */

namespace Document\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Controller\DocumentController;
use Document\Data\DocumentDataManager;

class DocumentControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return DocumentController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$translator = $container->get('MvcTranslator');

		$documentDM = $container->get(DocumentDataManager::class);

		return new DocumentController($translator, $documentDM);
	}
}