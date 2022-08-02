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
use Content\Entity\VideoLessonEntity;

class VideoLessonForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new VideoLessonEntity());

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
				'maxlength' => 200
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
				'maxlength' => 200
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'description',
			'options' => [
				'label' => 'GL_DESCRIPTION_L',
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
				'label' => 'GL_DESCRIPTION_L'
			],
			'attributes' => [
				'id' => 'descriptionI18n',
				'class' => 'form-control ckeditor',
			]
		]);

		$this->add([
			'name' => 'files',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true,
				'label' => 'EP_CMS_VIDEO_L',
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
			'name' => 'status',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_CONDITION_L'
			],
			'attributes' => [
				'id' => 'status',
				'class' => 'form-inline',
				'disabled' => true
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
				['name' => \Zend\Filter\StringTrim::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_CMS_MANDATORY_DESCRIPTION_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' => 'descriptionI18n',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class]
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
							'isEmpty' => "EP_CMS_MANDATORY_VIDEO_E"
						]
					]
				]
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
			'name' => 'updatedOn',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'deletedFiles',
			'required' => false,
		]);
	}
}