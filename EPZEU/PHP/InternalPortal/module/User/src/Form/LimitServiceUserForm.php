<?php
/**
 * LimitServiceUserForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilterProviderInterface;
use Zend\Hydrator\ClassMethodsHydrator;
use User\Entity\UserServiceLimitEntity;

class LimitServiceUserForm extends Form implements InputFilterProviderInterface{

	public function __construct($name = null, $options = []) {

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new UserServiceLimitEntity());

		parent::__construct($name, $options);

		$this->setAttributes([
			'method' => 'post',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'userId',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'userId',
				'class' => 'form-control',

			]
		]);

		$this->add([
			'name' => 'serviceLimitId',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'serviceLimitId',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'interval',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_DAYS_L'
			],
			'attributes' => [
				'id' => 'interval',
				'class' => 'form-control period-control-2',
			]
		]);



		$this->add([
			'name' => 'days',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_DAYS_L'
			],
			'attributes' => [
				'id' => 'days',
				'class' => 'form-control period-control-2',
				'maxlength' => 2,
			]
		]);


		$this->add([
			'name' => 'hours',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_HOURS_L'
			],
			'attributes' => [
				'id' => 'hours',
				'class' => 'form-control period-control-2',
				'maxlength' => 2,
			]
		]);

		$this->add([
			'name' => 'minutes',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_MINUTES_L'
			],
			'attributes' => [
				'id' => 'minutes',
				'class' => 'form-control period-control-2',
				'maxlength' => 2,
			]
		]);

		$this->add([
			'name' => 'seconds',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_SECONDS_L'
			],
			'attributes' => [
				'id' => 'seconds',
				'class' => 'form-control period-control-2',
				'maxlength' => 2,
			]
		]);

		$this->add([
			'name' => 'milliseconds',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'milliseconds',
				'class' => 'form-control period-control-3',
				'maxlength' => 3,
			]
		]);

		$this->add([
			'name' => 'requestsNumber',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_NOM_MAX_REQUESTS_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'requestsNumber',
				'class' => 'form-control  period-control-3 d-block',
				'maxlength' => 11,
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

	/**
	 *
	 * @return array
	 */
	public function getInputFilterSpecification() {


		return [

			[
				'name' => 'userId',
				'required' => true,
				'validators' => [
						[
							'name' => \Zend\Validator\Digits::class,
							'break_chain_on_failure' => true,
							'options' => ['message' =>  "GL_INPUT_FIELD_MUST_E"]],
						[
							'name' => \Zend\Validator\NotEmpty::class,
							'break_chain_on_failure' => true,
							'options' => ['message' =>  "GL_INPUT_FIELD_MUST_E"]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],
			[
				'name' => 'serviceLimitId',
				'required' => true,
				'validators' => [
						['name' => \Zend\Validator\Digits::class,
						'break_chain_on_failure' => true,
						'options' => ['min' => 0, 'max'	=> 999, 'message' =>  "EP_NOM_MANDATORY_LIMIT_DATA_SERVICE_USER_E"]
						],

						[
							'name' => \Zend\Validator\NotEmpty::class,
							'break_chain_on_failure' => true,
							'options' => ['message' =>  "GL_INTEGER_ERR_E"]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],

			[
				'name' => 'requestsNumber',
				'required' => true,
				'validators' => [
					[
						'name' => \Zend\Validator\NotEmpty::class,
						'break_chain_on_failure' => true,
						'options' => ['message' =>  "GL_INTEGER_ERR_E"]
					],

					[	'name' => \Zend\Validator\Digits::class,
						'break_chain_on_failure' => true,
						'options' => ['message' =>  "GL_INTEGER_ERR_E"]
					],
					[	'name' => \Zend\Validator\Between::class,
						'break_chain_on_failure' => true,
						'options' => ['min' => 1, 'max'	=> \Application\Module::APP_MAX_INT, 'message' =>  "GL_INTEGER_ERR_E"]
					],

				],
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				]
			],

			[
				'name' => 'milliseconds',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 999]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],
				[
				'name' => 'seconds',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 59]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],
			[
				'name' => 'minutes',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 59]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],
			[
				'name' => 'hours',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 23]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			],
			[
				'name' => 'days',
				'required' => false,
				'validators' => [
						['name' => \Zend\Validator\Digits::class],
						['name' => \Zend\Validator\Between::class,
								'options' => ['min' => 0, 'max'	=> 99]
						],
				],
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				]
			]

		];
	}

}