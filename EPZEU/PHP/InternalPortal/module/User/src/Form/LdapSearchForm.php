<?php
/**
 * LdapSearchForm class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Form;
use User\Entity\UserEntity;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilterProviderInterface;

class LdapSearchForm extends Form implements InputFilterProviderInterface{

	public function __construct($name = null, $options = []) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new UserEntity());

		$this->setAttributes([
			'method' => 'get',
			'class'  => 'needs-validation'
		]);

		$this->add([
			'name' => 'search',
			'type' => \Zend\Form\Element\Hidden::class,
			'attributes' => [
				'id' => 'search',
				'value' => 1
			]
		]);

		$this->add([
			'name' => 'username',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_USR_USER_ACTIVE_DIRECTORY_L',
			],
			'attributes' => [
				'id' => 'username',
				'class' => 'form-control',
				'maxlength' => 100
			]
		]);
	}

	/**
	 *
	 * @return array
	 */
	public function getInputFilterSpecification() {

		return [
			'search' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],
			'username' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],
		];
	}
}