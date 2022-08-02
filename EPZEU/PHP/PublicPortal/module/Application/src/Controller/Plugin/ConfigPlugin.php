<?php
/**
 * ConfigPlugin class file
 *
 * @package Application
 * @subpackage Controller\Plugin
 */

namespace Application\Controller\Plugin;

use Zend\Mvc\Controller\Plugin\AbstractPlugin;

class ConfigPlugin extends AbstractPlugin{

	/**
	 *
	 * @var array
	 */
	public $config;

	public function __construct($config) {
		$this->config = $config;
	}

	/**
	 * Взима конфигурация
	 *
	 * @return array
	 */
	public function __invoke() {
		return $this->config;
	}
}