<?php
/**
 * Statistic class file
 *
 * @package Forum
 */

namespace Statistic;

class Module {

	public function getConfig() {
        return include __DIR__ . '/../config/module.config.php';
    }
}


