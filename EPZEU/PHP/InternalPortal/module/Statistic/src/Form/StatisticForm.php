<?php
/**
 * StatisticForm class file
 *
 * @package Statistic
 * @subpackage Form
 */

namespace Statistic\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use Statistic\Entity\StatisticEntity;

class StatisticForm extends Form {


	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new StatisticEntity());

		$this->addInputFilter();

		$this->add([
			'name' => 'name',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_NAME_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'name',
				'class' => 'form-control',
				'maxlength' => 200
			]
		]);

		$this->add([
			'name' => 'registerId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_REGISTER_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'registerId',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'typeGenarate',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_STATISTICS_GENERATION_TYPE_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'typeGenarate',

			]
		]);

		$this->add([
			'name' => 'url',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_STATISTICS_SERVICE_ADDRESS_L',
				'label_attributes' => [
					'id' => 'url-label'
				]
			],
			'attributes' => [
				'id' => 'url',
				'class' => 'form-control',
			]
		]);


	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

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
							'isEmpty' => "EP_STATISTICS_MANDATORY_NAME_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'url',
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
							'isEmpty' => "EP_STATISTICS_SERVICE_ADDRESS_MANDATORY_E"
						],
					],
				],

				[
				'name' => \Zend\Validator\Uri::class,
					'break_chain_on_failure' => true,
						'options' => [
							'allowRelative' => false,
							'message' => 'EP_STATISTICS_SERVICE_ADDRESS_NOVALID_E'
						]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'typeGenarate',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_MSG_MANDATORY_SUBJECT_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'registerId',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_STATISTICS_MANDATORY_REGISTER_E"
						],
					],
				],
			],
		]);
	}
}