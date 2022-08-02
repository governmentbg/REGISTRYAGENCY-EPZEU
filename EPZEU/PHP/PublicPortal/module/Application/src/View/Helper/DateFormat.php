<?php
/**
 * DateFormat class file
 *
 * @package Application
 * @subpackage View\Helper
 */

namespace Application\View\Helper;

use Zend\I18n\View\Helper\DateFormat as OriginalDateFormat;
use IntlDateFormatter;

class DateFormat extends OriginalDateFormat
{
	/**
	 * Format a date
	 *
	 * @param  DateTime|int|array $date
	 * @param  int                    $dateType
	 * @param  int                    $timeType
	 * @param  string                 $locale
	 * @param  string|null            $pattern
	 * @return string
	 */

	const DATE  = "dd.MM.yyyy 'г.'";
	const DATETIME  = "dd.MM.yyyy 'г.' HH:mm 'ч.'";
	const DATEHOUR  = "dd.MM.yyyy 'г.' HH 'ч.'";
	const TIME  = "HH:mm 'ч.'";
	const DATETIMESECONDS  = "dd.MM.yyyy 'г.' HH:mm:ss 'ч.'";

	public function __invoke( $date, $dateType = IntlDateFormatter::NONE, $timeType = IntlDateFormatter::NONE, $locale = null, $pattern = null) {

		if ($locale == 'bg')
			$pattern = !isset($pattern) ? self::DATE : $pattern;
		
		if ($locale != 'bg')
			$pattern = str_replace([" 'ч.'", " 'г.'"], "", $pattern);

		if ($locale === null)
			$locale = $this->getLocale();

		$timezone    = $this->getTimezone();
		$formatterId = md5($dateType . "\0" . $timeType . "\0" . $locale ."\0" . $pattern);

		if (! isset($this->formatters[$formatterId])) {
			$this->formatters[$formatterId] = new IntlDateFormatter(
				$locale,
				$dateType,
				$timeType,
				$timezone,
				IntlDateFormatter::GREGORIAN,
				$pattern
			);
		}

		return $this->formatters[$formatterId]->format($date);
	}
}