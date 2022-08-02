<?php
/**
 * ParamSearchForm class file
 *
 * @package Nomenclature
 * @subpackage Form
 */

namespace Nomenclature\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilter;

class ParamSearchForm extends Form{

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
			'name' => 'moduleId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_PORTAL_L',
			],
			'attributes' => [
				'id' => 'moduleId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'functionalityId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_MODULE_FUNCTIONALITY_L',
			],
			'attributes' => [
				'id' => 'functionalityId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'code',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_CODE_L',
			],
			'attributes' => [
				'id' => 'code',
				'class' => 'form-control',
				'maxlength' => 100
			]
		]);

		$this->add([
			'name' => 'description',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_DESCRIPTION_L',
			],
			'attributes' => [
				'id' => 'description',
				'class' => 'form-control',
				'maxlength' => 500
			]
		]);

		$this->add([
			'name' => 'isSystem',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_SYS_PARAM_L',
			],
			'attributes' => [
				'id' => 'isSystem',
				'class' => 'form-control'
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
			'name' => 'moduleId',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);

		$inputFilter->add([
			'name' => 'functionalityId',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);

		$inputFilter->add([
			'name' => 'code',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);

		$inputFilter->add([
			'name' => 'description',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);

		$inputFilter->add([
			'name' => 'isSystem',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			],
		]);
	}
}