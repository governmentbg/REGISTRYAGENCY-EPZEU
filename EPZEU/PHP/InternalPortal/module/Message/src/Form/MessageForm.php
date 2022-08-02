<?php
/**
 * MessageForm class file
 *
 * @package Message
 * @subpackage Form
 */

namespace Message\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class MessageForm extends Form {

	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->addInputFilter();

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'value' => 1,
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
			'name' => 'about',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_MSG_SUBJECT_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'about',
				'class' => 'form-control',
				'maxlength' => 500
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'content',
			'options' => [
				'label' => 'GL_TEXT_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'content',
				'class' => 'form-control ckeditor'
			]
		]);

		$this->add([
			'name' => 'userIdList',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'userIdList',
				'multiple' => 'multiple',
				'class' => 'd-none'
			]
		]);

		$this->add([
			'name' => 'userRegisterList',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'userRegisterList',
			]
		]);

		$this->add([
			'name' => 'userRecipientType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_MSG_TO_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'userRecipientType'
			]
		]);

		$this->add([
			'name' => 'isToAllCr',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_CR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'isToAllCr',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'isToAllPr',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_PR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'isToAllPr',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'isToAllEpzeu',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_PORTAL_EPZEU_ABBR_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'isToAllEpzeu',
				'class' => 'form-check-input'
			]
		]);


		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_CONDITION_L'
			],
			'attributes' => [
				'id' => 'specialAccessUserType',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'updatedOn',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_CREATE_UPDATE_DATE_L'
			],
			'attributes' => [
				'id' => 'updatedOn',
				'class' => 'form-control',
				'disabled' => true
			]
		]);

		$this->add([
			'name' => 'save',
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
			'name' => 'about',
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
							'isEmpty' => "EP_MSG_MANDATORY_SUBJECT_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'content',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_MSG_MANDATORY_TEXT_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'status',
			'required' => false
		]);

		$inputFilter->add([
			'name' => 'isToAllCr',
			'required' => false
		]);

		$inputFilter->add([
			'name' => 'isToAllPr',
			'required' => false
		]);

		$inputFilter->add([
			'name' => 'isToAllEpzeu',
			'required' => false
		]);

		$inputFilter->add([
			'name' => 'userRecipientType',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_MSG_MANDATORY_USER__E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'userIdList',
			'required' => false,
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
			],
		]);

		$inputFilter->add([
			'name' => 'userRegisterList',
			'required' => false,
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
			],
		]);

		$inputFilter->add([
			'name' => 'updatedOn',
			'required' => false
		]);
	}
}