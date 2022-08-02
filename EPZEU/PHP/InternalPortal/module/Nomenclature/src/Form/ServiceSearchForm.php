<?php
/**
 * ServiceSearchForm class file
 *
 * @package Nomenclature
 * @subpackage Form
 */

namespace Nomenclature\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class ServiceSearchForm extends Form{

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
			'name' => 'name',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_SERVICE_L',
			],
			'attributes' => [
				'id' => 'name',
				'class' => 'form-control',
				'maxlength' => 1000
			]
		]);

		$this->add([
			'name' => 'registerId',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_REGISTER_L'
			],
			'attributes' => [
				'id' => 'registerId'
			]
		]);

		$this->add([
			'name' => 'registerSelectId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_REGISTER_L'
			],
			'attributes' => [
				'id' => 'registerId',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_CONDITION_L'
			],
			'attributes' => [
				'id' => 'status'
			]
		]);

		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Button::class,
			'attributes' => [
				'class' => 'btn btn-primary',
				'type' => 'submit',
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'search',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$inputFilter->add([
			'name' => 'name',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);

		$inputFilter->add([
			'name' => 'registerId',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
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
			'name' => 'registerSelectId',
			'required' => false,
			'filters'  => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
			]
		]);


	}
}