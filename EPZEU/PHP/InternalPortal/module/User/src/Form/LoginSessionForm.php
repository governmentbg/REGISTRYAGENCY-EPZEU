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
use User\Entity\LoginSessionEntity;
use Zend\Hydrator\ClassMethodsHydrator;

class LoginSessionForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new LoginSessionEntity());

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
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Submit::class,
			'attributes' => [
				'value' => 'GL_SAVE_L',
				'class' => 'btn btn-primary'
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
			'name' => 'authType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_USR_AUTHENTICATION_KIND_L',
				'value_options'	=> [
					''	=> 'GL_CHOICE_ALL_L',
					1	=> 'GL_EMAIL_L',
					2	=> 'EP_USR_USERS_ACTIVE_DIRECTORY_L',
					3	=> 'EP_USR_ESERT_AUTHO_L',
				]
			],
			'attributes' => [
				'id'	=> 'authType',
				'class'	=> 'form-control',
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'dateFrom',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
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
			'name' => 'authType',
			'required' => false,
		]);
	}
}