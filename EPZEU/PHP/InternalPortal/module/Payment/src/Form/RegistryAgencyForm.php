<?php
/**
 * RegistryAgencyForm class file
 *
 * @package Payment
 * @subpackage Form
 */

namespace Payment\Form;

use Zend\Form\Form;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilter;
use Payment\Entity\RegistryAgencyEntity;

class RegistryAgencyForm extends Form {

	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new RegistryAgencyEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
		]);

		$this->add([
			'name' => 'cin',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'cin',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'secretWord',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'secretWord',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'email',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_PAY_AV_EMAIL_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'email',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'validityPeriod',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'validityPeriod',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#validityPeriod",
				'maxlength' => 50
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Text::class,
			'name' => 'url',
			'options' => [
				'label' => 'EP_PAY_URL_PORTAL_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'url',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Text::class,
			'name' => 'urlServices',
			'options' => [
				'label' => 'EP_PAY_URL_SERVICES_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'urlServices',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Text::class,
			'name' => 'urlResponse',
			'options' => [
				'label' => 'EP_PAY_URL_MESS_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'urlResponse',
				'class' => 'form-control'
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
			'name' => 'cin',
			'required' => true,
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
							'isEmpty' => "GL_INTEGER_ERR_E"
						]
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'secretWord',
			'required' => true,
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
						]
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'email',
			'required' => true,
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
						]
					]
				],
				[
					'name' => \Zend\Validator\EmailAddress::class,
					'break_chain_on_failure' => true,
					'options' => [
						'message' => "GL_INVALID_EMAIL_E",
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'validityPeriod',
			'required' => true,
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
						]
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'H:i:s',
						'messages' => [
							'dateInvalidDate' => "EP_PAY_INVALID_PERIOD_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'url',
			'required' => true,
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

				[
					'name' => \Zend\Validator\Uri::class,
					'break_chain_on_failure' => true,
					'options' => [
						'allowRelative' => false,
						'message' => 'GL_INVALID_VALUE_L'
					]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'urlServices',
			'required' => true,
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

				[
					'name' => \Zend\Validator\Uri::class,
					'break_chain_on_failure' => true,
					'options' => [
						'allowRelative' => false,
						'message' => 'GL_INVALID_VALUE_L'
					]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'urlResponse',
			'required' => true,
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

				[
					'name' => \Zend\Validator\Uri::class,
					'break_chain_on_failure' => true,
					'options' => [
						'allowRelative' => false,
						'message' => 'GL_INVALID_VALUE_L'
					]
				],
			],
		]);
	}
}