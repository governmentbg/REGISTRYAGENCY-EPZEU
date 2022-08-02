<?php
/**
 * VideoLessonForm class file
 *
 * @package Content
 * @subpackage Form
 */

namespace Content\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use Content\Entity\NewsEntity;

class NewsForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new NewsEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
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
			'name' => 'title',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_CMS_HEADER_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'title',
				'class' => 'form-control',
				'maxlength' => 1000
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Text::class,
			'name' => 'titleI18n',
			'options' => [
				'label' => 'EP_CMS_HEADER_L'
			],
			'attributes' => [
				'id' => 'titleI18n',
				'class' => 'form-control',
				'maxlength' => 1000
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'shortDescription',
			'options' => [
				'label' => 'GL_DESCRIPTION_L',
				'label_attributes' => [
				]
			],
			'attributes' => [
				'id' => 'shortDescription',
				'class' => 'form-control',
				'maxlength' => 2000
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'shortDescriptionI18n',
			'options' => [
				'label' => 'GL_DESCRIPTION_L'
			],
			'attributes' => [
				'id' => 'shortDescriptionI18n',
				'class' => 'form-control',
				'maxlength' => 2000
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'description',
			'options' => [
				'label' => 'GL_CONTENT_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'description',
				'class' => 'form-control ckeditor',
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'descriptionI18n',
			'options' => [
				'label' => 'GL_CONTENT_L'
			],
			'attributes' => [
				'id' => 'descriptionI18n',
				'class' => 'form-control ckeditor',
			]
		]);


		$this->add([
			'name' => 'newsDate',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'newsDate',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#newsDate",
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
			'name' => 'newsTime',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'newsTime',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#newsTime",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'expirationDate',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'expirationDate',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#expirationDate",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'expirationTime',
			'type' => \Zend\Form\Element\Text::class,
			'attributes' => [
				'id' => 'expirationTime',
				'class' => 'form-control datetimepicker-input',
				'data-target' => "#expirationTime",
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_CONDITION_L',
				'value_options' => [
						'' =>  'GL_CHOICE_ALL_L',
						'0' => 'GL_F_STATE_NO_PUBLIC_L',
						'1' => 'GL_F_STATE_PUBLIC_L',
				],
			],
			'attributes' => [
				'id' => 'status',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'isHotNews',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'EP_CMS_HOT_NEWS_L'
			],
			'attributes' => [
				'id' => 'isHotNews',
				'class' => 'form-inline'
			]
		]);

		$this->add([
			'name' => 'files',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'files',
				'class' => 'form-control',
				'multiple' => 'multiple',
				'style' => 'display: none'
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
			'name' => 'images',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'images',
				'class' => 'form-control',
				'multiple' => 'multiple',
				'style' => 'display: none'
			]
		]);


		$this->add([
			'name' => 'deletedImages',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'deletedImages',
				'class' => 'form-control',
				'multiple' => 'multiple',
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
			'name' => 'title',
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
							'isEmpty' => "EP_CMS_MANDATORY_HEADER_E"
						]
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'titleI18n',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'description',
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
							'isEmpty' => "EP_CMS_MANDATORY_CONTENT_E"
						]
					]
				]
			]
		]);

		$inputFilter->add([
			'name' => 'descriptionI18n',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class]
			]
		]);

		$inputFilter->add([
			'name' => 'shortDescriptionI18n',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'newsTime',
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
						'format' => 'H:i',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'newsDate',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
				'name' => \Application\Validator\DatePeriodValidator::class,
				'options' => [
						'token' => 'expirationDate',
						'diteTimeValidator' => true,
						'firstFieldDate' => 'newsDate',
						'firstFieldTime' => 'newsTime',
						'secondFieldDate' => 'expirationDate',
						'secondFieldTime' => 'expirationTime',
						'compareType'	 =>  \Application\Validator\DatePeriodValidator::GREATER

					]
				],
				[
						'name' => \Zend\Validator\Date::class,
						'break_chain_on_failure' => true,
						'options' => [
								'format' => 'd.m.Y',
								'messages' => [
									'dateInvalidDate' => "EP_CMS_DATE_PUBLIC_NEWS_E"
								],
						],
				],

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
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'expirationTime',
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
						'format' => 'H:i',
						'messages' => [
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'expirationDate',
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
							'dateInvalidDate' => "GL_INVALID_DATE_E"
						],
					],
				]
			]
		]);

		$inputFilter->add([
			'name' => 'expirationDate',
			'required' => false,
			'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
					[
						'name' => \Application\Validator\DatePeriodValidator::class,
						'options' => [
							'token' => 'now',
							'timeField' => 'expirationTime',
							'compareType' => \Application\Validator\DatePeriodValidator::LESS,
							'message'	=> "EP_CMS_DATE_EXP_PUBLIC_NEWS_E"

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
			'name' => 'files',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'isHotNews',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'deletedFiles',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'images',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'deletedImages',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'status',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'dateFrom',
			'required' => false,
		]);

		$inputFilter->add([
			'name' => 'dateTo',
			'required' => false,
		]);
	}
}