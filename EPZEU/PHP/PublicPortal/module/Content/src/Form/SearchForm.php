<?php
/**
 * SearchForm class file
 *
 * @package Content
 * @subpackage Form
 */

namespace Content\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;

class SearchForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'get',
		]);

		$this->add([
			'name' => 'sKey',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'class' => 'form-control',
				'maxlength' => 500
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'sKey',
			'required' => true,
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_CMS_MIN_SEARCH_LETTERS_COUNT_E"
						]
					]
				]
			]
		]);
	}
}