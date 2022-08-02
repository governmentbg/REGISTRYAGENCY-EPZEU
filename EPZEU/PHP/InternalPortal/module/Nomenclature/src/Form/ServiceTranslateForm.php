<?php
/**
 * ServiceTranslateForm class file
 *
 * @package Nomenclature
 * @subpackage Form
 */

namespace Nomenclature\Form;

use Zend\Form\Form;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilter;
use Nomenclature\Entity\ServiceEntity;

class ServiceTranslateForm extends Form {

	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new ServiceEntity());

		$this->addInputFilter();

		$this->setAttributes([
			'method' => 'post',
		]);

		$this->add([
			'type' => 'hidden',
			'name' => 'id',
		]);

		$this->add([
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'nameI18n',
			'options' => [
				'label' => 'GL_SERVICE_L'
			],
			'attributes' => [
				'id' => 'nameI18n',
				'class' => 'form-control',
				'maxlength' => 1000
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
			'type' => \Zend\Form\Element\Textarea::class,
			'name' => 'shortDescriptionI18n',
			'options' => [
				'label' => 'GL_SHORT_DESCRIPTION_L'
			],
			'attributes' => [
				'id' => 'shortDescriptionI18n',
				'class' => 'form-control',
				'maxlength' => 2000
			]
		]);

		$this->add(array(
			'type' => 'submit',
			'name' => 'submit',
			'attributes' => array(
				'value' => 'GL_SAVE_L',
				'class' => 'btn btn-primary'
			)
		));
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);

		$inputFilter->add([
			'name' => 'nameI18n',
			'required' => false,
			'filters'  => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
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
	}
}