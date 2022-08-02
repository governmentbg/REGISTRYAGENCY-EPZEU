<?php
namespace Application\Factory;

use Application\Controller\IndexController;
use Interop\Container\ContainerInterface;
use Application\Controller\WebServiceController;
use Application\Service\RestService;
use User\Data\UserDataManager;

class WebServiceControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return IndexController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('configuration');

		$restService = $container->get(RestService::class);

		$userDM = $container->get(UserDataManager::class);

		$translator = $container->get('MvcTranslator');

		return new WebServiceController($config, $restService, $userDM, $translator);

	}
}