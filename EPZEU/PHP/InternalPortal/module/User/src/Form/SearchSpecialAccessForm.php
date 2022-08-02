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

class SearchSpecialAccessForm extends Form {

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
			'name' => 'email',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_EMAIL_L',
			],
			'attributes' => [
				'id' => 'email',
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
				]
			]
		]);
	}
}