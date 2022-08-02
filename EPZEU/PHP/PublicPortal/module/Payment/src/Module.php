<?php
/**
 * Module class file
 *
 * @package Payment
 */

namespace Payment;

class Module {

	/**
	 * Взима конфигурационни параметри за модул
	 */
	public function getConfig() {
		return include __DIR__ . '/../config/module.config.php';
	}

}