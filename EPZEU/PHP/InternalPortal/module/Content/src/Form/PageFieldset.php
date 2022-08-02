<?php
/**
 * UserFieldset class file
 *
 * @package User
 * @subpackage Form
 */

namespace Content\Form;

use Zend\Form\Fieldset;
use Content\Entity\PageEntity;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilterProviderInterface;

class PageFieldset extends Fieldset implements InputFilterProviderInterface {

	public function __construct($name = null, $options = array()) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new PageEntity());


	}

	/**
	 *
	 * @return array
	 */
	public function getInputFilterSpecification() {

		return [
			'title' => [
				'required' => true,
				'filters' => [
						['name' => \Zend\Filter\StringTrim::class],
						['name' => \Zend\Filter\StripTags::class]
				],
				'validators' => [
					[
						'name' => \Zend\Validator\NotEmpty::class,
						'break_chain_on_failure' => true,
						'options' => [
							'messages' => [
								'isEmpty' => "GL_INPUT_FIELD_MUST_E"
							]
						]
					],
				],
			],

			'content' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],
		];
	}
}