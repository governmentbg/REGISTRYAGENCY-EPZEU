<?php
/**
 * ServiceForm class file
 *
 * @package Nomenclature
 * @subpackage Form
 */

namespace Nomenclature\Form;

use Zend\Form\Form;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilter;
use Nomenclature\Entity\ServiceEntity;

class ServiceForm extends Form {

	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new ServiceEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
		]);

		$this->add([
			'type' => 'hidden',
			'name' => 'id',
		]);

		$this->add([
			'name' => 'registerId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_REGISTER_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'registerId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'iisdaServiceId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_SERVICE_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'iisdaServiceId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'serviceTypeIds',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_SERVICE_TYPE_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'serviceTypeIds'
			]
		]);

		$this->add([
			'name' => 'paymentTypeIds',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_Е_PAYMENT_CHANNEL_L',
				'label_attributes' => [
					'id' => 'paymentTypeLabel'
				]
			],
			'attributes' => [
				'id' => 'paymentTypeIds'
			]
		]);

		$this->add([
			'name' => 'appTypeId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_APPLICATION_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'appTypeId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'statusDate',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'statusDate',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#statusDate",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'statusTime',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'statusTime',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#statusTime",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'isAdm',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_SERVICES_IS_IISDA_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'isAdm'
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'name',
			'options' => [
				'label' => 'GL_SERVICE_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'name',
				'class' => 'form-control',
				'maxlength' => 1000
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'description',
			'options' => [
				'label' => 'GL_DESCRIPTION_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'description',
				'class' => 'form-control ckeditor'
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'shortDescription',
			'options' => [
				'label' => 'GL_SHORT_DESCRIPTION_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'shortDescription',
				'class' => 'form-control',
				'maxlength' => 2000
			]
		]);

		$this->add(array(
			'type' => 'submit',
			'name' => 'submit',
			'attributes' => array(
				'value' => 'GL_SAVE_L',
				'class' => 'btn btn-primary'
			)
		));
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'registerId',
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
							'isEmpty' => "EP_NOM_MANDATORY_REGISTER_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'iisdaServiceId',
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
							'isEmpty' => "EP_NOM_MANDATORY_SERVICE_E",
						],
					],
				]
			],
		]);

		$inputFilter->add([
			'name' => 'serviceTypeIds',
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
							'isEmpty' => "GL_INPUT_FIELD_MUST_E",
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'paymentTypeIds',
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
							'isEmpty' => "EP_NOM_MANDATORY_TYPE_PAYMENT_E",
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'appTypeId',
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
							'isEmpty' => "EP_NOM_MANDATORY_SERVICE_TYPE_APPLICATION_E",
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'statusDate',
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
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_TIME_HOUR_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'statusTime',
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
						'format' => 'H',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_TIME_HOUR_E"
						],
					],
				]

			]
		]);

		$inputFilter->add([
			'name' => 'isAdm',
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
							'isEmpty' => "GL_INPUT_FIELD_MUST_E",
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'name',
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
							'isEmpty' => "GL_INPUT_FIELD_MUST_E",
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'description',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_CMS_MANDATORY_DESCRIPTION_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'shortDescription',
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
							'isEmpty' => "EP_CMS_MANDATORY_DESCRIPTION_E"
						],
					],
				],
			],
		]);
	}
}