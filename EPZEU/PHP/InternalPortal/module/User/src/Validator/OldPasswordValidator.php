<?php
/**
 * OldPasswordValidator class file
 *
 * @package User
 * @subpackage Validator
 */

namespace User\Validator;

use Zend\Validator\AbstractValidator;

class OldPasswordValidator extends AbstractValidator
{
	const OLD_PASSWORD  = 'invalidPassword';

	protected $messageTemplates = [
		self::OLD_PASSWORD  => "GL_INVALID_PASSWORD_E"
	];

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява дали въведената парола съответства на записания в базата данни хеш
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($value)
	{
		$options = $this->getOptions();

		if (!password_verify($options['oldPassword'], $options['userPasswordHach'])) {
			$this->error(self::OLD_PASSWORD);
			return false;
		} else {
			return true;
		}

	}
}