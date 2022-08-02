<?php
/**
 * UserSearchForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use User\Controller\UserController;

class UserSearchForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'get',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'value' => 1,
			]
		]);

		$this->add([
			'name' => 'cin',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_USR_CUSTOMER_ID_L',
			],
			'attributes' => [
				'id' => 'cin',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'username',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_USER_NAME_L',
			],
			'attributes' => [
				'id' => 'username',
				'class' => 'form-control',
				'maxlength' => 100
			]
		]);

		$this->add([
			'name' => 'email',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_EMAIL_L'
			],
			'attributes' => [
				'id' => 'email',
				'class' => 'form-control',
				'maxlength' => 200
			]
		]);

		$this->add([
			'name' => 'firstName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_PERSON_FIRSTNAME_L'
			],
			'attributes' => [
				'id' => 'firstName',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'middleName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_PERSON_SURNAME_L'
			],
			'attributes' => [
				'id' => 'middleName',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);
		$this->add([
			'name' => 'familyName',
				'type' => \Zend\Form\Element\Text::class,
				'options' => [
					'label' => 'GL_PERSON_FAMILYNAME_L'
				],
				'attributes' => [
					'id' => 'familyName',
					'class' => 'form-control',
					'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'specialAccessUserType',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'EP_USR_EXTRENAL_USER_KIND_L'
			],
			'attributes' => [
				'id' => 'specialAccessUserType'
			]
		]);

		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_CONDITION_L',
			],
			'attributes' => [
				'id' => 'status',
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
			'name' => 'organization',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_USR_ORGANIZATION_POSITION_L'
			],
			'attributes' => [
				'id' => 'organization',
				'class' => 'form-control',
				'maxlength' => 120
			]
		]);


		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit',
			]
		]);

		$this->add([
			'name' => 'authenticationType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_USR_TYPE_REG_L',
				'value_options' => [
					'' =>  'GL_CHOICE_ALL_L',
					UserController::USER_AUTH_PASSWORD => 'EP_USR_FROM_PORTAL_L',
					UserController::USER_AUTH_ACTIVE_DIRECTORY => 'EP_USR_FROM_AD_L',
				],
			],
			'attributes' => [
				'id' => 'specialAccessUserType',
				'class' => 'form-control'
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
			'name' => 'cin',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\Digits::class,
					'break_chain_on_failure' => true,
					'options' => [
						'message' => "GL_INVALID_VALUE_L"
					]
				]
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
			'name' => 'email',
			'required' => false,
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\EmailAddress::class,
					'break_chain_on_failure' => true,
					'options' => [
						'message' => "GL_INVALID_EMAIL_E"
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'firstName',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'middleName',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'familyName',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'status',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'specialAccessUserType',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
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
				]
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
			'name' => 'authenticationType',
			'required' => false,
		]);

	}
}