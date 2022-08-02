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
use User\Entity\UserEntity;
use Zend\Hydrator\ClassMethodsHydrator;

class UserForm extends Form {

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new UserEntity());

		$this->setAttributes([
			'method' => 'post',
			'class'  => 'needs-validation'
		]);

		$this->add(array(
			'name' => 'userFieldset',
			'type' => \User\Form\UserFieldset::class,
			'options' => array(
				'use_as_base_fieldset' => true,
			)
		));

		$this->add([
			'name' => 'submit',
			'type' =>  \Zend\Form\Element\Submit::class,
			'attributes' => [
				'value' => 'GL_SAVE_L',
				'class' => 'btn btn-primary'
			]
		]);
	}

	private function addInputFilter() {

		$inputFilter = new InputFilter();

		$this->setInputFilter($inputFilter);


	}
}