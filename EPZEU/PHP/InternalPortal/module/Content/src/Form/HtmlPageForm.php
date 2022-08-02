<?php
/**
 * HtmlPageForm class file
 *
 * @package Content
 * @subpackage Form
 */

namespace Content\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use Content\Entity\HtmlPageEntity;

class HtmlPageForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new HtmlPageEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
		]);

		$this->add([
			'name' => 'moduleId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_PORTAL_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'moduleId',
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
			'name' => 'content',
			'options' => [
				'label' => 'GL_CONTENT_L',
				'label_attributes' => [
					'class' => 'required-field'
				]
			],
			'attributes' => [
				'id' => 'content',
				'class' => 'form-control ckeditor',
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'contentI18n',
			'options' => [
				'label' => 'GL_CONTENT_L',
			],
			'attributes' => [
				'id' => 'contentI18n',
				'class' => 'form-control ckeditor',
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Text::class,
			'name' => 'URL',
			'options' => [
				'label' => 'GL_SERVICE_URL_L',

			],
			'attributes' => [
				'id' => 'content',
				'class' => 'form-control ckeditor',
				'readonly' => true
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
			'name' => 'moduleId',
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
							'isEmpty' => "EP_GL_MANDATORY_PORTAL_E"
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
			'name' => 'content',
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
							'isEmpty' => "EP_CMS_MANDATORY_CONTENT_E"
						],
					],
				],
			],
		]);

		$inputFilter->add([
			'name' 		=> 'contentI18n',
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class]
			],
			'required'	=> false
		]);

		$inputFilter->add([
			'name' 		=> 'titleI18n',
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'required'	=> false
		]);
	}
}