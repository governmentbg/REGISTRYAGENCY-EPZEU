<?php
/**
 * SearchFormHelper class file
 *
 * @package Content
 * @subpackage View\Helper
 */

namespace Content\View\Helper;

use Zend\View\Helper\AbstractHelper;

class SearchFormHelper extends AbstractHelper {

	protected $form;

	public function __construct($form)
	{
		$this->form = $form;
	}

	public function __invoke()
	{
		return $this->form;
	}
}