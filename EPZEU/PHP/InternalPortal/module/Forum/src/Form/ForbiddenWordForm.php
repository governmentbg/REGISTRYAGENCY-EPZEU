<?php
/**
 * ForbiddenWordForm class file
 *
 * @package Forum
 * @subpackage Form
 */

namespace Forum\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class ForbiddenWordForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->addInputFilter();

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'value' => 1,
			]
		]);

		$this->add([
			'name' => 'word',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_CMS_BAAN_WORD_L',
			],
			'attributes' => [
				'id' => 'name',
				'class' => 'form-control',
				'maxlength' => 200
			]
		]);

		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit',
				'value' => 'GL_SAVE_L'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'search',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'word',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "GL_INPUT_FIELD_MUST_E"
						],
					],
				],
			],
		]);
	}
}