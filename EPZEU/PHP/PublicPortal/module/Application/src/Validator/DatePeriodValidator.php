<?php
/**
 * DatePeriodValidator class file
 *
 * @package Application
 * @subpackage Validator
 */

namespace Application\Validator;

use Zend\Validator\AbstractValidator;
use Zend\Validator\Date;

class DatePeriodValidator extends AbstractValidator
{
	const INVALID_DATE_PERIOD  = 'invalidDatePeriod';

	const GREATER  = -1;
	const GREATER_OR_EQUAL  = 0;
	const LESS  = 1;

	protected $messageTemplates = [
			self::INVALID_DATE_PERIOD  => "GL_INVALID_DATE_PERIOD_E"
	];

	public function __construct($options = null) {
		parent::__construct($options);
	}

	/**
	 * Проверява за валидност на период - начална и крайна дата
	 *
	 * {@inheritDoc}
	 * @see \Zend\Validator\ValidatorInterface::isValid()
	 */
	public function isValid($value, $context = null)
	{
		$options = $this->getOptions();

		if (!isset($options['token']))
			return true;

		$options['compareType'] = !isset($options['compareType']) ? self::GREATER : $options['compareType'];


		if (isset($options['diteTimeValidator']) && $options['diteTimeValidator']) {
			$date1 = $context[$options['firstFieldDate']].' '.$context[$options['firstFieldTime']].':00';
			$date2 = $context[$options['secondFieldDate']].' '.$context[$options['secondFieldTime']].':00';
		}

		elseif (isset($options['token']) && $options['token'] == 'now') {

			$date1 = $value;

			if (isset($options['timeField'])) {
				$time = isset($context[$options['timeField']]) && !empty($context[$options['timeField']]) ? $context[$options['timeField']] : '00:00:00';
				$date1 = $date1.' '.$context[$options['timeField']].':00';
			}

			$date2 = date('d.m.Y H:i:s');

			if (isset($options['currentDateHour']) && !empty($options['currentDateHour']))
				$date2 = date('d.m.Y H:00:00');
		}

		else {
			$date1 = !empty($value) ? date('d.m.Y H:i:s', strtotime($value)) : null;
			$date2 = !empty($context[$options['token']]) ? date('d.m.Y H:i:s', strtotime($context[$options['token']])) : null;
		}


		$separator = '.';

		$validator = new \Zend\Validator\Date(['format' => 'd.m.Y H:i:s']);

		if (!empty($date1) && $validator->isValid($date1) && !empty($date2) && $validator->isValid($date2)) {

			@list ($date, $time) = explode(' ', $date1);
			@list ($day, $month, $year) = explode($separator, $date);
			@list ($hour, $min, $sec) = explode(':', $time);

			$item1 = @mktime(@intval($hour), @intval($min), @intval($sec), $month, $day, $year);

			@list ($date, $time) = explode(' ', $date2);
			@list ($day, $month, $year) = explode($separator, $date);
			@list ($hour, $min, $sec) = explode(':', $time);

			$item2 = @mktime(@intval($hour), @intval($min), @intval($sec), $month, $day, $year);

			if (
					($options['compareType'] == self::GREATER && $item1 > $item2)
				||
					($options['compareType'] == self::GREATER_OR_EQUAL && $item1 >= $item2)
				||
					($options['compareType'] == self::LESS && $item1 < $item2)
			) {
				$this->error(self::INVALID_DATE_PERIOD);
				return false;
			}

			return true;
		}

		else {
			return true;
		}
	}
}