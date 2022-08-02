<?php
/**
 * DeclarationTemplateForm class file
 *
 * @package DeclarationTemplate
 * @subpackage Form
 */

namespace DeclarationTemplate\Form;

use Zend\Form\Form;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilter;
use DeclarationTemplate\Entity\DeclarationTemplateEntity;

class DeclarationTemplateForm extends Form {


	public function __construct() {

		parent::__construct($name = null, $options = array());

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new DeclarationTemplateEntity());

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
			'name' => 'activeFields',
			'options' => [
				'label' => 'EP_TMP_ACTIVE_FIELDS_L',
			],
			'attributes' => [
				'id' => 'activeFields',
				'class' => 'form-control',
				'disabled' => 'disabled',
				'rows' 	=> 3
			]
		]);

		$this->add([
			'type' => \Zend\Form\Element\Select::class,
			'name' => 'documentTypeId',
			'options' => [
				'label' => 'GL_MANIFEST_L',
				'label_attributes' => ['class' => 'required-field']
			],
			'attributes' => [
				'id' => 'documentTypeId',
				'class' => 'form-control',
			]
		]);

 		$this->add([
     		'type' => \Zend\Form\Element\Textarea::class,
     		'name' => 'content',
     		'options' => [
             	'label' => 'GL_CONTENT_L',
     			'label_attributes' => ['class' => 'required-field']
     		],
     		'attributes' => [
     			'id' => 'content',
				'class' => 'form-control',
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
			'name' => 'documentTypeId',
			'required' => true,
			'validators' => [
               [
					'name' => \Zend\Validator\NotEmpty::class,
                    'break_chain_on_failure' => true,
                    'options' => [
                        'messages' => [
                            'isEmpty' => "EP_TMP_MANDATORY_MANIFEST_E",
                        ],
                    ],
                ],
            ],
		]);

		$inputFilter->add([
			'name' => 'content',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => "EP_TMP_MANDATORY_CONTENT_E",
						],
					],
				],
			],
		]);
	}
}