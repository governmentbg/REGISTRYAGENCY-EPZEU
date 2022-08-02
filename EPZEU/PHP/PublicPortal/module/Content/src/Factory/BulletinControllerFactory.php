<?php
/**
 * BulletinControllerFactory class file
 *
 * @package Content
 * @subpackage Factory
 */

namespace Content\Factory;

use Content\Controller\BulletinController;
use Interop\Container\ContainerInterface;
use Zend\ServiceManager\Factory\FactoryInterface;

class BulletinControllerFactory implements FactoryInterface {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return BulletinController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new BulletinController($container->get(\Content\Data\BulletinDataManager::class));
	}
}