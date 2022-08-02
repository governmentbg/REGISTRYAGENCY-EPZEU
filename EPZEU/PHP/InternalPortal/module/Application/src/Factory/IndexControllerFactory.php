<?php
/**
 * IndexControllerFactory class file
 *
 * @package Application
 * @subpackage Factory
 */

namespace Application\Factory;


use Application\Controller\IndexController;
use Interop\Container\ContainerInterface;

class IndexControllerFactory {

	/**
	 *
	 * @param ContainerInterface $container
	 * @param string $requestedName
	 * @param null|array $options
	 * @return IndexController
	 */
	public function __invoke(ContainerInterface $container, $requestedName, array $options = null) {

		return new IndexController();

	}
}