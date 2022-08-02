<?php
/**
 * EmailSubscription class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;
use Zend\Hydrator\ClassMethodsHydrator;
use User\Entity\EmailSubscriptionEntity;

class EmailSubscriptionForm extends Form{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new EmailSubscriptionEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
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
				'class' => 'form-control',
				'autocomplete' => 'off'
			]
		]);

		$this->add([
			'name' => 'type',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_ID_PERS_COMP_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'type',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'value',
			'type' => \Zend\Form\Element\Textarea::class,
			'options' => [
				'label' => 'EP_INPUT_ID_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'value',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit',
				'value' => 'GL_CONFIRM_L'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$inputFilter->add([
			'name' => 'search',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$this->setInputFilter($inputFilter);

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
					'options' => ['message' =>  "EP_NOM_MANDATORY_REGISTER_E"]
				],
			],
		]);

		$inputFilter->add([
			'name' => 'type',
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
			'name' => 'value',
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
	}
}