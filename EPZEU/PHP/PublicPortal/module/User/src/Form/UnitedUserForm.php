<?php
/**
 * UserForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use User\Entity\UnitedUserEntity;

class UnitedUserForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new UnitedUserEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'username',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_USER_NAME_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'username',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'password',
			'type' => \Zend\Form\Element\Password::class,
			'options' => [
				'label' => 'GL_PASSWORD_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'password',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'register',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_REGISTER_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'register',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Submit::class,
			'attributes' => [
				'value' => 'GL_CONFIRM_L',
				'class' => 'btn btn-primary'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$inputFilter->add([
			'name' => 'username',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => ['message' =>  "GL_INPUT_FIELD_MUST_E"]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'password',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => ['message' =>  "GL_INPUT_FIELD_MUST_E"]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'register',
			'required' => true,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => ['message' =>  "GL_INPUT_FIELD_MUST_E"]
				],
			],
		]);

		$this->setInputFilter($inputFilter);
	}
}