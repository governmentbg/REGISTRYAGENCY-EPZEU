<?php
/**
 * NestedPageForm class file
 *
 * @package Content
 * @subpackage Form
 */

namespace Content\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use Content\Entity\PageEntity;

class NestedPageForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new PageEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
		]);


		$this->add([
			'name' => 'serviceId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_NAME_IN_REG_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'serviceId',
				'class' => 'form-control',
			]
		]);

		$this->add([
			'name' => 'applicationId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_NAME_IN_REG_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'applicationId',
				'class' => 'form-control',
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
				'maxlength' => 200,
			]
		]);

		$this->add([
			'name' => 'content',
			'type' => \Zend\Form\Element\Textarea::class,
			'options' => [
				'label' => 'GL_DESCRIPTION_L'
			],
			'attributes' => [
				'id' => 'status',
				'class' => 'form-inline ckeditor'
			]
		]);

		$this->add([
				'name' => 'titleI18n',
				'type' => \Zend\Form\Element\Text::class,
				'options' => [
						'label' => 'EP_CMS_HEADER_L',
				],
				'attributes' => [
						'id' => 'titleI18n',
						'class' => 'form-control',
						'maxlength' => 200
				]
		]);

		$this->add([
				'type' => \Zend\Form\Element\Textarea::class,
				'name' => 'contentI18n',
				'options' => [
						'label' => 'GL_CONTENT_L',
						'label_attributes' => [
								'class' => 'required-field'
						]
				],
				'attributes' => [
						'id' => 'contentI18n',
						'class' => 'form-control ckeditor',
				]
		]);

		$this->add([
			'name' => 'pageId',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_CONDITION_L'
			],
			'attributes' => [
				'id' => 'pageId',
				'class' => 'form-inline'
			]
		]);

		$this->add([
			'name' => 'files',
			'required' => false,
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
			'name' => 'serviceId',
			'required' => false,
			'validators' => [
			[
				'name' => \Zend\Validator\NotEmpty::class,
				'break_chain_on_failure' => true,
				'options' => [
						'messages' => [
							'isEmpty' => "EP_CMS_MANDATORY_SERVICE_E"
						]
					]
				],
			]
		]);

		$inputFilter->add([
			'name' => 'applicationId',
			'required' => false,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_CMS_MANDATORY_SERVICE_E"
						]
					]
				],
			]
		]);

		$inputFilter->add([
			'name' => 'title',
			'required' => true,
			'filters' => [
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
				],
			],
		]);

		$inputFilter->add([
			'name' => 'files',
			'required' => false,
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
			],
		]);

		$inputFilter->add([
			'name' => 'content',
			'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
				],
		]);

		$inputFilter->add([
			'name' => 'deletedFiles',
			'required' => false,
		]);

		$inputFilter->add([
			'name' 		=> 'contentI18n',
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
			],
			'required'	=> false
		]);

		$inputFilter->add([
			'name' 		=> 'titleI18n',
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'required'	=> false
		]);

	}
}