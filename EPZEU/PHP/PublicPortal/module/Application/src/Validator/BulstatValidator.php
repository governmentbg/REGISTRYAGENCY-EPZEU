<?php
/**
 * BulstatValidator class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;

class BulstatValidator extends AbstractValidator
{

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за валидност на Булстат
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($bulstat)
	{

		if ($bulstat == '' || !preg_match('/^\d+$/', $bulstat))
		return false;

		$bulstatArr = str_split($bulstat);

		switch (count($bulstatArr)) {

			case 9:

				$sum = 0;

				for ($i = 0; $i < 8; $i++) {
					$sum = $sum + ((int)substr($bulstat, $i, 1)) * ($i+1);
				}

				$checkSum = $sum%11;

				if ($checkSum == 10) {

					$sum = 0;

					for ($i = 0; $i < 8; $i++) {
						$sum = $sum + ((int)substr($bulstat, $i, 1)) * ($i+3);
					}
					$checkSum = ($sum%11)%10;

				}

				$digit9 = $bulstatArr[8];

				if ($checkSum != $digit9)
					return false;

				return true;

			case 13:

				// Check digit 9
				for ($i = 0; $i < 8; $i++) {
					$sum = $sum + ((int)substr($bulstat, $i, 1)) * ($i+1);
				}

				$checkSum = $sum%11;

				if ($checkSum == 10) {

					$sum = 0;

					for ($i = 0; $i < 8; $i++) {
						$sum = $sum + ((int)substr($bulstat, $i, 1)) * ($i+3);
					}
					$checkSum = ($sum%11)%10;
				}

				$digit9 = $bulstatArr[8];

				if ($digit9 != $checkSum)
					return false;

				// Check digit 13
				$weight = array (2, 7, 3, 5);
				$weight10 = array (4, 9, 5, 7);

				$sum = 0;

				for ($i = 8; $i < 12; $i++) {
					$sum = $sum + ((int)substr($bulstat, $i, 1) ) * $weight[$i-8] ;
				}

				$checkSum = $sum%11;

				if ($checkSum == 10) {

					$sum = 0;

					for ($i = 8; $i < 12; $i++) {
						$sum = $sum + ((int)substr($bulstat, $i, 1) ) * $weight10[$i-8];
					}

					$checkSum = ($sum%11)%10;

				}

				$digit13 = $bulstatArr[12];

				if ($checkSum != $digit13)
					return false;

				return true;

				break;

			default:
				return false;
		}

		return false;
	}
}