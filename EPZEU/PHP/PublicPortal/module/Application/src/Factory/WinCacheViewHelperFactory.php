<?php
/**
 * LanguageViewHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\View\Helper\WinCacheViewHelper;

class WinCacheViewHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return LanguageViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$winCache = $container->get('WinCache');

		return new WinCacheViewHelper($winCache);
	}
}