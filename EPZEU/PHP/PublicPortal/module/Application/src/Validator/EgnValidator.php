<?php
/**
 * EgnValidator class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;

class EgnValidator extends AbstractValidator
{

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за валидност на EГН
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($egn)
	{

		$EGN_WEIGHTS = array(2,4,8,5,10,9,7,3,6);

		if (strlen($egn) != 10 || !preg_match('/^\d+$/', $egn))
			return false;

		$year = substr($egn,0,2);
		$mon  = substr($egn,2,2);
		$day  = substr($egn,4,2);

		if ($mon > 40) {
			if (!checkdate($mon-40, $day, $year+2000)) return false;
		}
		elseif ($mon > 20) {
			if (!checkdate($mon-20, $day, $year+1800)) return false;
		}
		else {
			if (!checkdate($mon, $day, $year+1900)) return false;
		}

		$checksum = substr($egn,9,1);
		$egnsum = 0;

		for ($i=0;$i<9;$i++)
		$egnsum += substr($egn,$i,1) * $EGN_WEIGHTS[$i];

		$valid_checksum = $egnsum % 11;

		if ($valid_checksum == 10)
			$valid_checksum = 0;

		if ($checksum == $valid_checksum)
			return true;

		return false;
	}
}