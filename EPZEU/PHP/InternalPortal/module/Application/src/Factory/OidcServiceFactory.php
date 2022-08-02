<?php
/**
 * OidcServiceFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;

use Interop\Container\ContainerInterface;
use Application\Service\OidcService;
use Application\Service\AppService;

class OidcServiceFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return OidcService
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$cache = $container->get('WinCache');

		$config = $container->get('configuration');

		$appService = $container->get(AppService::class);

		$cookieDomainName = $appService->getDomainCookieName();

		return new OidcService($cache, $config, $cookieDomainName);
	}
}