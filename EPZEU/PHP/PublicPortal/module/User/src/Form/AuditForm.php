<?php
/**
 * UserForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use User\Entity\AuditEntity;
use Zend\Hydrator\ClassMethodsHydrator;

class AuditForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new AuditEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'get',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'value' => '1',
			]
		]);

		$this->add([
			'name' => 'actionType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'Лейбъл вид търсене',
				'label_attributes' => [
					'class' => 'required-field'
				],
				'value_options' => [
					''	=> 'GL_CHOICE_L',
					'1' => 'EP_ODIT_SEARCH_L' ,
					'2' => 'EP_ODIT_EXPORT_L',
				],
			],
			'attributes' => [
				'id' => 'actionType',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'searchType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'Лейбъл вид търсене архив',
				'label_attributes' => [
					'class' => 'required-field'
				],
				'value_options' => [
					''	=> 'GL_CHOICE_L',
					'1' => 'EP_ODIT_SEARCH_AFTER_L' ,
					'2' => 'EP_ODIT_SEARCH_ТО_L',
				],
			],
			'attributes' => [
				'id' => 'searchType',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'dateTo',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'dateTo',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#dateTo",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'dateFrom',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'dateFrom',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#dateFrom",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'timeFrom',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'timeFrom',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#timeFrom",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'dateTo',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'dateTo',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#dateTo",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'timeTo',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'timeTo',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#timeTo",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'moduleId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_PORTAL_IS_L',
			],
			'attributes' => [
				'id' => 'moduleId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'functionality',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_MODULE_FUNCTIONALITY_L',
			],
			'attributes' => [
				'id' => 'functionality',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'objectType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_ODIT_TYPE_OBJECT_L',
			],
			'attributes' => [
				'id' => 'objectType',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'key',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_ODIT_OBJECT_L',
			],
			'attributes' => [
				'id' => 'key',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'event',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_ODIT_EVENT_L',
			],
			'attributes' => [
				'id' => 'event',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'userId',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_USER_L',
			],
			'attributes' => [
				'id' => 'userId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'cin',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_USR_CUSTOMER_ID_L'
			],
			'attributes' => [
				'id' => 'cin',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'ipAddress',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_IP_ADDRESS_L'
			],
			'attributes' => [
				'id' => 'ipAddress',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'identificationType',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_ODIT_TYPE_IDENTIFICATION_USER_L'
			],
			'attributes' => [
				'id' => 'identificationType',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'sertificateNumber',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_ODIT_NUMBER_SERTIFICATE_KEP_PIC_L'
			],
			'attributes' => [
				'id' => 'sertificateNumber',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'loginSession',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_LOGIN_SESSION_L'
			],
			'attributes' => [
				'id' => 'loginSession',
				'class' => 'form-control',
			]
		]);



		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Submit::class,
			'attributes' => [
				'value' => 'GL_SAVE_L',
				'class' => 'btn btn-primary'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'timeTo',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'H:i',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E",
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'username',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'actionType',
			'required' => true,
			'validators' => [
				['name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'message' => "GL_INPUT_FIELD_MUST_E"
					]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'searchType',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'message' => "GL_INPUT_FIELD_MUST_E"
					]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'dateFrom',
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
							'message' => "GL_INPUT_FIELD_MUST_E"
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E",
						],
					],
				],
				[
					'name' => \Application\Validator\DatePeriodValidator::class,
					'options' => [
						'token' => 'dateTo',
					]
				],
			]
		]);

		$inputFilter->add([
			'name' => 'timeFrom',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'H:i',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E",
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'dateTo',
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
						'message' => "GL_INPUT_FIELD_MUST_E"
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E",
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'ipAddress',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
			],
			'validators' => [
				[
					'name' => \Zend\Validator\Ip::class,
					'options' => ['message' =>  "GL_INVALID_VALUE_L"],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'loginSession',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
			],
			'validators' => [
				[
					'name' => \Zend\Validator\Uuid::class,
					'options' => ['message' =>  "GL_INVALID_VALUE_L"],
				],
			]
		]);




		$inputFilter->add([
			'name' => 'key',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'objectType',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'event',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'functionality',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'moduleId',
			'required' => false,
		]);


	}
}