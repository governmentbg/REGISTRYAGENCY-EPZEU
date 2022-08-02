<?php
/**
 * StatisticReportForm class file
 *
 * @package Statistic
 * @subpackage Form
 */

namespace Statistic\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use Statistic\Entity\StatisticReportEntity;

class StatisticReportForm extends Form {


	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new StatisticReportEntity());

		$this->addInputFilter();

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
			'name' => 'deletedFiles',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'deletedFiles',
				'class' => 'form-control',
				'multiple' => 'multiple',
				'style' => 'display: none'
			]
		]);

		$this->add([
			'name' => 'files',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true,
				'label' => 'EP_STATISTICS_REPORT_FILE_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'files',
				'class' => 'form-control',
				'style' => 'display: none'
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
			'name' => 'dateFrom',
			'required' => true,
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Application\Validator\DatePeriodValidator::class,
					'options' => [
						'token' => 'dateTo',
					]
				],
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
							'messages' => [
									'isEmpty' => "EP_STATISTICS_PERIOD_MANDATORY_E"
							]
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'dateTo',
			'required' => true,
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [

				[
					'name' => \Application\Validator\DatePeriodValidator::class,
					'options' => [
							'token' => 'dateTo',
					]
				],
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_STATISTICS_PERIOD_MANDATORY_E"
						]
					]
				],

				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				],
			]
		]);

		$inputFilter->add([
			'name' => 'files',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
								'isEmpty' => "EP_CMS_MANDATORY_ATTACHMENT_E"
						]
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'deletedFiles',
			'required' => false
		]);


	}
}