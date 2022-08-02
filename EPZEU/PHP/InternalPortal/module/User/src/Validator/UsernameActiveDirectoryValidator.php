<?php
/**
 * UsernameActiveDirectoryValidator class file
 *
 * @package User
 * @subpackage Validator
 */

namespace User\Validator;

use Zend\Validator\AbstractValidator;
use Zend\Ldap\Ldap;

class UsernameActiveDirectoryValidator extends AbstractValidator
{
	const USERNAME_ACTIVE_DIRECTORY  = 'invalidActiveDirectoryUsername';

	protected $messageTemplates = [
			self::USERNAME_ACTIVE_DIRECTORY  => "GL_INVALID_USERNAME_E"
	];

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява дали въведените потребителско име съвпада с потребителско име от активната директория
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($value)
	{
		$options = $this->getOptions();

		$username = $options['username'];

		if (empty($username))
			$usernameActiveDirectory = '';

		else {

			$ldap = new Ldap($options['configActiveDirectory']);
			$ldap->bind();

			$ldapDomainNameShort = $options['configActiveDirectory']['accountDomainNameShort'];
			$username = str_replace($ldapDomainNameShort.'\\', '', $username);

			$attributes = ['CN', 'mail', 'samaccountname'];
			$filter = '(samaccountname='.$username.')';

			$userActiveDirectory = $ldap->searchEntries(
										$filter,
										null,
										\Zend\Ldap\Ldap::SEARCH_SCOPE_SUB,
										$attributes
									);

			if ($ldap->count($filter) != 1)
				$usernameActiveDirectory = '';

			else
				$usernameActiveDirectory = $userActiveDirectory[0]['samaccountname'][0];
		}

		if (empty($usernameActiveDirectory) || (!empty($usernameActiveDirectory) && $usernameActiveDirectory != $username)) {
			$this->error(self::USERNAME_ACTIVE_DIRECTORY);
			return false;
		}

		else {
			return true;
		}
	}
}