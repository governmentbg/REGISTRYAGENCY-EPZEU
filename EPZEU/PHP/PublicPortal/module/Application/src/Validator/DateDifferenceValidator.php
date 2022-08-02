<?php
/**
 * DateDifferenceValidator class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;

class DateDifferenceValidator extends AbstractValidator
{
	const GL_PERIOD_NO_LESS_MONTH_E  = 'invalidDatePeriod';
	const GL_INVALID_DATE_VALUE_E  = 'invalidDateValue';


	protected $messageTemplates = [
		self::GL_PERIOD_NO_LESS_MONTH_E  => "GL_PERIOD_NO_LESS_MONTH_E",
		self::GL_INVALID_DATE_VALUE_E  => "GL_INVALID_DATE_E"
	];

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за период между две дати
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($value, $context = null)
	{
		$options = $this->getOptions();

		if (!isset($options['token']) || empty($context[$options['token']]))
			return true;

		if (!isset($options['daysPeriod']))
			return true;

		$validator = new \Zend\Validator\Date(['format' => 'd.m.Y']);

		if ((!empty($context[$options['token']]) && !@$validator->isValid($context[$options['token']])) || (!empty($value) && !@$validator->isValid($value))) {
			$this->error(self::GL_INVALID_DATE_VALUE_E);
			return false;
		}

		$earlier = new \DateTime($value);
		$later = new \DateTime($context[$options['token']]);

		$diff = $later->diff($earlier)->format("%a");

		if ($diff > $options['daysPeriod']) {
			$this->error(self::GL_PERIOD_NO_LESS_MONTH_E);


			return false;
		}

		return true;



	}
}