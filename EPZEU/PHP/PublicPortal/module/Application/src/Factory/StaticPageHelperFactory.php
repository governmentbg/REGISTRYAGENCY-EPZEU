<?php
/**
 * StaticPageHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\Service\CacheService;
use Application\View\Helper\StaticPageHelper;

class StaticPageHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return LanguageViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$cacheService = $container->get(CacheService::class);

		return new StaticPageHelper($cacheService);
	}
}