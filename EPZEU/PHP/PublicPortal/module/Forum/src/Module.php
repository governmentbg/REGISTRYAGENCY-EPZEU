<?php
/**
 * Module class file
 *
 * @package Forum
 */

namespace Forum;

class Module {

	public function getConfig() {
        return include __DIR__ . '/../config/module.config.php';
    }
}


