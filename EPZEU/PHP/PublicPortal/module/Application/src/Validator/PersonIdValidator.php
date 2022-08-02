<?php
/**
 * PersonIdValidator class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;

class PersonIdValidator extends AbstractValidator
{

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за валидност на ЛНЧ
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($pin)
	{

		$PIN_WEIGHTS = array(21,19,17,13,11,9,7,3,1);

		if (strlen($pin) != 10  || !preg_match('/^\d+$/', $pin))
			return false;

		$checksum = substr($pin,9,1);

		$pinSum = 0;

		for ($i=0;$i<9;$i++) {
			$pinSum += substr($pin,$i,1) * $PIN_WEIGHTS[$i];
		}

		$valid_checksum = $pinSum % 10;

		if ($valid_checksum == 10)
			$valid_checksum = 0;

		if ($checksum == $valid_checksum)
			return true;

		return false;
	}
}