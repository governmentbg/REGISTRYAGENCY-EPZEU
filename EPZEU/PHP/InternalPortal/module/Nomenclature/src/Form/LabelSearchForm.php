<?php
/**
 * LabelSearchForm class file
 *
 * @package Nomenclature
 * @subpackage Form
 */

namespace Nomenclature\Form;

use Zend\Form\Form;

class LabelSearchForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setAttributes([
			'method' => 'get',
			'class'  => 'needs-validation'
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
				'maxlength' => 200
			]
		]);

		$this->add([
			'name' => 'value',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_TEXT_L',
			],
			'attributes' => [
				'id' => 'value',
				'class' => 'form-control',
				'maxlength' => 1000
			]
		]);

		$this->add([
			'name' => 'withoutTranslation',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'EP_TRANSLATION_LABELS_WITHOUT_TRANSLATION_L',
				'label_attributes' => [
					'class' => 'custom-control-label'
				]
			],
			'attributes' => [
				'id' => 'without-translation',
				'class' => 'custom-control-input'
			]
		]);
	}

}