<?php
/**
 * UserFieldset class file
 *
 * @package User
 * @subpackage Form
 */

namespace User\Form;

use Zend\Form\Fieldset;
use User\Entity\UserEntity;
use Zend\Hydrator\ClassMethodsHydrator;
use Zend\InputFilter\InputFilterProviderInterface;

class UserFieldset extends Fieldset implements InputFilterProviderInterface {

	public function __construct($name = null, $options = array()) {

		parent::__construct($name, $options);

		$this->setHydrator(new ClassMethodsHydrator(false));
		$this->setObject(new UserEntity());

		$this->add([
			'type' => 'hidden',
			'name' => 'id'
		]);

		$this->add([
			'name' => 'username',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_USER_NAME_L',
				'label_attributes' => ['class' => 'field-title field-title--form']
			],
			'attributes' => [
				'id' => 'username',
				'class' => 'form-control',
				'maxlength' => 100,
				'disabled' => true
			]
		]);

		$this->add([
			'name' => 'status',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label' => 'GL_CONDITION_L',
				'label_attributes' => ['class' => 'field-title field-title--form']
			],
			'attributes' => [
				'id' => 'status',
				'class' => 'form-inline'
			]
		]);

		$this->add([
			'name' => 'permissionList',
			'type' => \Zend\Form\Element\MultiCheckbox::class,
			'options' => [
				'label_attributes' => [
					'class' => 'form-check form-check-label'
				]
			],
			'attributes' => [
				'id' => 'permissionList',
				'class' => 'form-check-input',
				'checkboxListByGroup' => true
			]
		]);

		$this->add([
			'name' => 'email',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_EMAIL_L',
				'label_attributes' => ['class' => 'required-field field-title field-title--form']
			],
			'attributes' => [
				'id' => 'email',
				'class' => 'form-control',
				'autocomplete' => 'off',
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'firstName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_PERSON_FIRSTNAME_L',
				'label_attributes' => ['class' => 'field-title field-title--form']

			],
			'attributes' => [
				'id' => 'firstName',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);

		$this->add([
			'name' => 'middleName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_PERSON_SURNAME_L',
				'label_attributes' => ['class' => 'field-title field-title--form']
			],
			'attributes' => [
				'id' => 'middleName',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);
		$this->add([
			'name' => 'familyName',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'GL_PERSON_FAMILYNAME_L',
				'label_attributes' => ['class' => 'field-title field-title--form']
			],
			'attributes' => [
				'id' => 'familyName',
				'class' => 'form-control',
				'maxlength' => 50
			]
		]);


		$this->add([
			'name' => 'password',
			'type' => \Zend\Form\Element\Password::class,
			'options' => [
				'label' => 'GL_PASSWORD_L',
				'label_attributes' => [
					'class' => 'required-field field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'password',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'confirmPassword',
			'type' => \Zend\Form\Element\Password::class,
			'options' => [
				'label' => 'EP_USR_NEW_PASS_CONF_L',
				'label_attributes' => [
					'class' => 'required-field field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'confirm-password',
				'class' => 'form-control'
			]
		]);


		$this->add([
			'name' => 'oldPassword',
			'type' => \Zend\Form\Element\Password::class,
			'options' => [
				'label' => 'EP_USR_OLD_PASS_L',
				'label_attributes' => [
					'class' => 'required-field field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'old-password',
				'class' => 'form-control',
			]
		]);



		$this->add([
			'name' => 'contactData',
			'type' => \Zend\Form\Element\Textarea::class,
			'options' => [
				'label' => 'EP_USR_CONTACT_DATA_L',
				'label_attributes' => [
					'id' => 'contact-label',
					'class' => 'required-field field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'contactData',
				'class' => 'form-control',
				'maxlength' => 500
			]
		]);

		$this->add([
			'name' => 'crBulletinAcceptance',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_CR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'crBulletinAcceptance',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'prBulletinAcceptance',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_PR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'prBulletinAcceptance',
				'class' => 'form-check-input'
			]
		]);


		$this->add([
			'name' => 'specialAccess',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'EP_USR_00001_L',
				'label_attributes' => [
					'class' => 'form-check-label field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'special-access',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'organization',
			'type' => \Zend\Form\Element\Text::class,
			'options' => [
				'label' => 'EP_USR_ORGANIZATION_POSITION_L',
				'label_attributes' => [
					'class' => 'field-title field-title--form'
				]
			],
			'attributes' => [
				'id' => 'organization',
				'class' => 'form-control',
				'maxlength' => 120
			]
		]);

		$this->add([
			'name' => 'specialAccessUserType',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'label' => 'EP_USR_EXTRENAL_USER_KIND_L',
					'label_attributes' => [
							'class' => 'field-title field-title--form'
					]
			],
			'attributes' => [
				'id' => 'specialAccessUserType',
				'class' => 'form-control'
			]
		]);
		$this->add([
			'name' => 'files',
			'type' => \Zend\Form\Element\Select::class,
			'options' => [
				'disable_inarray_validator' => true
			],
			'attributes' => [
				'id' => 'files',
				'class' => 'form-control',
				'multiple' => 'multiple',
				'style' => 'display: none'
			]
		]);

		$this->add([
			'name' => 'terms',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'EP_USR_00014_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'terms',
				'class' => 'form-check-input'
			]
		]);


		$this->add([
			'name' => 'epzeuMessageAcceptance',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_PORTAL_EPZEU_ABBR_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'epzeuMessageAcceptance',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'prMessageAcceptance',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_PR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'prMessageAcceptance',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
			'name' => 'crMessageAcceptance',
			'type' => \Zend\Form\Element\Checkbox::class,
			'options' => [
				'label' => 'GL_CR_REG_NAME_L',
				'label_attributes' => [
					'class' => 'form-check-label'
				]
			],
			'attributes' => [
				'id' => 'crMessageAcceptance',
				'class' => 'form-check-input'
			]
		]);

		$this->add([
				'name' => 'cin',
				'type' => \Zend\Form\Element\Text::class,
				'options' => [
					'label' => 'EP_USR_CUSTOMER_ID_L',
					'label_attributes' => [
						'class' => 'field-title field-title--form'
					]
				],
				'attributes' => [
						'id' => 'cin',
						'class' => 'form-control',
						'disabled' => true
				]
		]);

		$this->add([
				'name' => 'updatedOn',
				'type' => \Zend\Form\Element\Text::class,
				'options' => [
						'label' => 'GL_CREATE_UPDATE_DATE_L',
						'label_attributes' => [
							'class' => 'field-title field-title--form'
						]
				],
				'attributes' => [
						'id' => 'updatedOn',
						'class' => 'form-control',
						'disabled' => true
				]
		]);

	}

	/**
	 *
	 * @return array
	 */
	public function getInputFilterSpecification() {
		return [
			'terms' => [
				'required' => true,
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


			'firstName' => [
				'required' => false,
				'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
				],
			],

			'middleName' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],

			'familyName' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],

			'crBulletinAcceptance' 	=> ['required' => false],
			'prBulletinAcceptance' 	=> ['required' => false],
			'specialAccess' 		=> ['required' => false],
			'crMessageAcceptance' 	=> ['required' => false],
			'prMessageAcceptance' 	=> ['required' => false],
			'epzeuMessageAcceptance' 	=> ['required' => false],
			'cin' 	=> ['required' => false],
			'updatedOn' 	=> ['required' => false],

			'files' => [
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
			'email' => [
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
					[
						'name' => \Zend\Validator\EmailAddress::class,
						'break_chain_on_failure' => true,
						'options' => [
							'message' => "GL_INVALID_EMAIL_E",
						]
					],
				]
			],
			'password' => [
				'required' => true,
				'filters' => [
					[
						'name' => \Zend\Filter\StringTrim::class
					]
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
					[
						'name' => \Zend\Validator\StringLength::class,
						'break_chain_on_failure' => true,
						'options' => [
								'min' => 8,
								'messages' => [
									'stringLengthTooShort' => "GL_INVALID_PASSWORD_E"
							]
						]
					]
				]
			],
			'oldPassword' => [
				'required' => true,
				'filters' => [
					[
						'name' => \Zend\Filter\StringTrim::class
					]
				],
				'validators' => [
					[
						'name' => \Zend\Validator\NotEmpty::class,
						'break_chain_on_failure' => true,
						'options' => [
							'message' => "GL_INPUT_FIELD_MUST_E"
						]
					],
				]
			],
			'confirmPassword' => [
				'required' => true,
				'filters' => [
					[
						'name' => \Zend\Filter\StringTrim::class
					]
				],
				'validators' => [
					[
						'name' => \Zend\Validator\NotEmpty::class,
						'break_chain_on_failure' => true,
						'options' => [
							'message' => "GL_INPUT_FIELD_MUST_E"
						]
					],
					[
						'name' => \Zend\Validator\Identical::class,
						'options' => [
							'token' => 'password',
							'messages' => [
								'notSame' => "EP_USR_00002_E"
							]
						]
					]
				]
			],

			'contactData' => [
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
							'message' => "GL_INPUT_FIELD_MUST_E"
						]
					],
				],
			],

			'organization' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],

			'subscribe' => [
				'required' => false,
			],
			'username' => [
				'required' => false,
			],
			'status' => [
				'required' => false,
			],
			'permissionList' => [
				'required' => false,
			],
			'specialAccessUserType' => [
				'required' => false,
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				],
			],
		];
	}
}