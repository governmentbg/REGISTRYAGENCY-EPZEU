<?php
/**
 * ForumForm class file
 *
 * @package Forum
 * @subpackage Form
 */

namespace Forum\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilterProviderInterface;
use Zend\Hydrator\ClassMethodsHydrator;
use Forum\Entity\ForumEntity;

class ForumForm extends Form implements InputFilterProviderInterface{

	public function __construct($name = null, $options = []) {

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new ForumEntity());

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
			'name' => 'username',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_AUTOR_L',
				'label_attributes' => [
					'class' => 'field-title field-title--form'
				]
			],
			'attributes' => [
				'id'		=> 'username',
				'class' 	=> 'form-control',
				'disabled'	=> true
			]
		]);

		$this->add([
			'name' => 'title',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_TOPIC_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id'		=> 'title',
				'class' 	=> 'form-control',
			]
		]);

		$this->add([
			'name' => 'comment',
			'type' => \Zend\Form\Element\Textarea::class,
			'options' => [
				'label' => 'EP_CMS_COMMENT_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form'],
			],
			'attributes' => [
				'id'		=> 'comment',
				'class' 	=> 'form-control',
				'rows'		=> 10
			]
		]);

		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Submit::class,
			'attributes' => [
				'value' => 'GL_PUBLIC_L',
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
				'name' => 'title',
				'required' => true,
				'validators' => [
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
				'name' => 'comment',
				'required' => true,
				'validators' => [
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
		];


	}

}