<?php
/**
 * PublicUrlHelperFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;
use Application\View\Helper\PublicUrlHelper;
use Application\Service\CacheService;

class PublicUrlHelperFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return LanguageViewHelper
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('config');

		$cacheService = $container->get(CacheService::class);

		return new PublicUrlHelper($config['config']+$cacheService->getParamList());
	}
}