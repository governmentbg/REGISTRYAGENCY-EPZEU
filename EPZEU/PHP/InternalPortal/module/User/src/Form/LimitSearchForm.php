<?php
/**
 * LimitSearchForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use Zend\InputFilter\InputFilterProviderInterface;

class LimitSearchForm extends Form implements InputFilterProviderInterface{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setAttributes([
			'method' => 'get',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'moduleId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_PORTAL_IS_L'
			],
			'attributes' => [
				'id' => 'moduleId',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'userId',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'userId',
			]
		]);

		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'GL_CONDITION_L',
				'value_options' => [
						'' => 'GL_CHOICE_ALL_L',
						1 => 'GL_ACTIVE_L',
						0 => 'GL_INACTIVE_L',
				]
			],
			'attributes' => [
				'id' => 'status',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'serviceName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_NOM_SERVICE_DATA_L'
			],
			'attributes' => [
				'id' => 'serviceName',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'serviceLimitId',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_NOM_SERVICE_DATA_L'
			],
			'attributes' => [
				'id' => 'serviceLimitId',
				'class' => 'form-control'
			]
		]);

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'search',
				'value' => 1
			]
		]);
	}

	/**
	 *
	 * @return array
	 */
	public function getInputFilterSpecification() {
		return [];

	}
}