<?php
/**
 * DutyForm class file
 *
 * @package Payment
 * @subpackage Form
 */

namespace Payment\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;

class DutyForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'get',
		]);

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'value' => 1,
			]
		]);

		$this->add([
			'name' => 'registerId',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'registerId'
			]
		]);

		$this->add([
			'name' => 'applicationTypeId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_APPLICATION_L'
			],
			'attributes' => [
				'id' => 'applicationTypeId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'applicationNumber',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_APPLICATION_NO_L'
			],
			'attributes' => [
				'id' => 'applicationNumber',
				'class' => 'form-control'//,
				//'maxlength' => 1000
			]
		]);

		$this->add([
			'name' => 'isUnpaidDuty',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'EP_PAY_UNPAID_BILLS_L'
			],
			'attributes' => [
				'id' => 'isUnpaidDuty',
				'class' => 'form-inline'
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
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit',
				'value' => 'GL_SEARCH_L'
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
			'name' => 'registerId',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'applicationTypeId',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'applicationNumber',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'isUnpaidDuty',
			'required' => false,
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
							'dateInvalidDate' => "GL_INVALID_DATE_E",
						],
					],
				],
			]
		]);

	}
}