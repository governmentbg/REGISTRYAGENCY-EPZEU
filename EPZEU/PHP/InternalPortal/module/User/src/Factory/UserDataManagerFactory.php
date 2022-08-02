<?php
/**
 * UserDataManagerFactory class file
 *
 * @package User
 * @subpackage Factory
 */

namespace User\Factory;

use Interop\Container\ContainerInterface;
use User\Data\UserDataManager;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Hydrator\ClassMethodsHydrator as ClassMethodsHydrator;
use Zend\ServiceManager\Factory\FactoryInterface;
use Document\Service\DocumentService;
use Application\Service\RestService;

class UserDataManagerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return ZendDbSqlRepository
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		$config = $container->get('ControllerPluginManager')->get('getConfig')->config;

		$documentService = $container->get(DocumentService::class);

		$restService = $container->get(RestService::class);

		$translator = $container->get('MvcTranslator');

		//$dbAdapterAudit = $container->get('archive');

		$dbAdapterAudit = new \Zend\Db\Adapter\Adapter(array(
			'driver'         => 'Pdo',
			'driver_options' => [],
			'username'	=> 'epzeu_qa',
			'password'	=> 'epzeu_qa',
			'dsn'		=> 'pgsql:host=vm-av-epzeu-db2.dev.local;dbname=epzeu_qa'
		));

		return new UserDataManager($container->get(AdapterInterface::class), new ClassMethodsHydrator(true), $config, $documentService, $restService, $translator, $dbAdapterAudit);
	}
}