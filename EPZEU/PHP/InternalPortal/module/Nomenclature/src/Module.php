<?php
/**
 * Module class file
 *
 * @package Nomenclature
 */

namespace Nomenclature;

class Module {

	/**
	 * Взима конфигурационни параметри за модул
	 */
	public function getConfig() {
		return include __DIR__ . '/../config/module.config.php';
	}

}