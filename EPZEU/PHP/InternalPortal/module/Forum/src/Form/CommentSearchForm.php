<?php
/**
 * CommentSearchForm class file
 *
 * @package Forum
 * @subpackage Form
 */

namespace Forum\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class CommentSearchForm extends Form {

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
			'name' => 'status',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_CONDITION_L',
				'value_options' => [
						'' =>  'GL_CHOICE_ALL_L',
						'0' => 'EP_CMS_INAPPROPRIATE_L',
						'1' => 'GL_M_STATE_PUBLIC_L',
				],
			],
			'attributes' => [
				'id' => 'specialAccessUserType',
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
			'name' => 'title',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_TOPIC_L',
			],
			'attributes' => [
				'id' => 'title',
				'class' => 'form-control',
				'maxlength' => 50,

			]
		]);

		$this->add([
			'name' => 'comment',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_CMS_COMMENT_L',
			],
			'attributes' => [
				'id' => 'comment',
				'class' => 'form-control',
				'maxlength' => 50,

			]
		]);

		$this->add([
			'name' => 'author',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_AUTOR_L',
			],
			'attributes' => [
				'id' => 'comment',
				'class' => 'form-control',
				'maxlength' => 50,

			]
		]);


		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'options' => [
				'label' => 'GL_EMAIL_L',
			],
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);



		$inputFilter->add([
			'name' => 'status',
			'required' => false
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
			'name' => 'dateFrom',
			'required' => false,
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
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				]

			]
		]);

		$inputFilter->add([
			'name' => 'dateTo',
			'required' => false,
			'filters' => [
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
						'dateInvalidDate' => "GL_INVALID_DATE_E"
					],
				],
				]

			]
		]);
	}
}