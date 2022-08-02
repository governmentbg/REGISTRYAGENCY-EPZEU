<?php
/**
 * PageNotFoundHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\View\Helper\PageNotFoundHelper;

class PageNotFoundHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return MenuViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;
		$pageDM = $container->get(\Content\Data\PageDataManager::class);

		return new PageNotFoundHelper($pageDM);
	}
}