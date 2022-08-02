<?php
/**
 * AppService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;

class AppService {

	protected $appDM;

	protected $winCache;

	public function __construct($appDM, $winCache) {
		$this->appDM = $appDM;
		$this->winCache = $winCache;
	}

	/**
	 * Конвертира дата във формат за база данни
	 *
	 * @param string $date
	 * @param bool $isTime
	 * @param string $locale
	 */
	public static function getSqlDate($date, $isTime=false) {

		@list ($date, $time) = array_pad(explode(' ', $date), 2, '');

		$sqlDate = date("Y-m-d", strtotime($date));

		if ($isTime)
			$time = (!empty($time) ? ' ' . $time : ' 00:00:00');
		else
			$time = '';

		return $sqlDate.$time;
	}

	/**
	 * Генерира Token
	 * @return string
	 */
	public static function genToken() {
		$token = bin2hex(openssl_random_pseudo_bytes(16));
		$token = substr($token, 0, 8 ) .'-'.
		substr($token, 8, 4) .'-'.
		substr($token, 12, 4) .'-'.
		substr($token, 16, 4) .'-'.
		substr($token, 20);
		return $token;
	}

	/**
	 * Генерира guid
	 * @param string $string
	 * @param string $prefix
	 *
	 * @return string
	 */
	public static function genGuid($string, $prefix='') {

		$guid = strtoupper(md5($prefix.$string));
		$guid = substr($guid, 0, 8 ) .'-'.
		substr($guid, 8, 4) .'-'.
		substr($guid, 12, 4) .'-'.
		substr($guid, 16, 4) .'-'.
		substr($guid, 20);
		return $guid;
	}

	/**
	 * Прихваща грешки от базата данни
	 * @param $e
	 */
	public static function handleDbError($e) {

		preg_match('/[A-Z]{2}\d{3}/s',$e->getMessage(), $matches);

		$errorMessage = null;

		$messageList = [
			'EP004' => 'EP_USR_00001_E',
			'EP009' => 'EP_CMS_TOPIC_INCLUDES_BAAN_WORDS_E',
			'EP010' => 'EP_CMS_FORUM_COMMENT_INCLUDES_BAAN_WORDS_E'
		];

		if (isset($matches[0]) && isset($messageList[$matches[0]])) {
			$errorMessage = $messageList[$matches[0]];
			$message = base64_encode(json_encode(['namespace' => 'error', 'message' => $errorMessage]));
			setcookie('flashMessage', $message, 0, '/');
			header('Location: '.$_SERVER['HTTP_REFERER']);
			exit;
		}

		self::handleException($e, 'E_ERROR', null, 'DATABASE');

		throw new \Exception('COMMON_ERROR_MESSAGE - '.$e->getMessage());
	}

	/**
	 * Прихваща Exceptions
	 * @param $e
	 */
	public static function handleException($message, $type='E_ERROR', $component = null, $loggerName = 'EPZEU') {

		if ($message instanceof \Exception) {

			errorHandler(
				$type,
				$component.' '.$message->getMessage(),
				$message->getFile(),
				$message->getLine(),
				$message->getTraceAsString(),
				$loggerName
			);
		}
	}


	/**
	 * Конвертира postgresql тип "interval"
	 *
	 * @param string $data
	 * @throws Exception
	 */
	public static function fromPg($data)
	{
		if (preg_match("/(?:([0-9]+) years? ?)?(?:([0-9]+) mons? ?)?(?:([0-9]+) days? ?)?(?:([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(?:.([0-9]{1,3}))?)?/", $data, $matchs))
		{

			$milliseconds = '';

			if (isset($matchs[7]))
				$milliseconds = str_pad($matchs[7], 6, 0, STR_PAD_RIGHT);

			return  \DateInterval::createFromDateString(
					sprintf("%d years %d months %d days %d hours %d minutes %d seconds %d milliseconds",
							array_key_exists(1, $matchs) ? (is_null($matchs[1]) ? 0 : (int) $matchs[1]) : 0,
							array_key_exists(2, $matchs) ? (is_null($matchs[2]) ? 0 : (int) $matchs[2]) : 0,
							array_key_exists(3, $matchs) ? (is_null($matchs[3]) ? 0 : (int) $matchs[3]) : 0,
							array_key_exists(4, $matchs) ? (is_null($matchs[4]) ? 0 : (int) $matchs[4]) : 0,
							array_key_exists(5, $matchs) ? (is_null($matchs[5]) ? 0 : (int) $matchs[5]) : 0,
							array_key_exists(6, $matchs) ? (is_null($matchs[6]) ? 0 : (int) $matchs[6]) : 0,
							array_key_exists(7, $matchs) ? (is_null($matchs[7]) ? 0 : (string) $milliseconds) : 0
						));
		}

		if ($data === null || $data === '')
		{
			return null;
		}

		throw new \Exception(sprintf("Data '%s' is not a supported pg interval representation.", $data));
	}


	/**
	 * Сравнява дати във формат YYYY-MM-DD HH:MM:SS
	 *
	 * @param string $date1
	 * @param string $date2
	 * @param string $separator
	 * @return int
	 */
	public static function compareDates($date1, $date2, $separator='.') {

		@list ($date, $time) = explode(' ', $date1);
		@list ($day, $month, $year) = explode($separator, $date);
		@list ($hour, $min, $sec) = explode(':', $time);

		$item1 = @mktime(@intval($hour), @intval($min), @intval($sec), $month, $day, $year);

		@list ($date, $time) = explode(' ', $date2);
		@list ($day, $month, $year) = explode($separator, $date);
		@list ($hour, $min, $sec) = explode(':', $time);

		$item2 = @mktime(@intval($hour), @intval($min), @intval($sec), $month, $day, $year);

		if ($item1 < $item2)
			return 1;

		if ($item1 > $item2)
			return -1;

		return 0;
	}

	/**
	 * Задава крайна дата за даден процес.
	 *
	 * @param string $dateIntervalString
	 * @param bool $createSqlDate
	 * @return string
	 */
	public static function setDeadlineFromDateInterval($dateIntervalString, $createSqlDate = false) {

		$interval = \Application\Service\AppService::fromPg($dateIntervalString);
		$seconds = ($interval->d * 24 * 60 * 60) + ($interval->h * 60 * 60) + ($interval->i * 60) + $interval->s;

		if ($createSqlDate)
			return date("Y-m-d H:i:s", strtotime('+'.$seconds.' seconds'));

		return date("d.m.Y H:i:s", strtotime('+'.$seconds.' seconds'));
	}

	/**
	 * Генерира URL адрес
	 *
	 * @param string $hotst
	 * @param array $uriSegments
	 * @param array $queryParams
	 * @param string $urlSuffix
	 * @return string
	 */
	public static function genUrl($host, $uriSegments = [], $queryParams = [], $urlSuffix = '') {

		$url = $host.$urlSuffix;

		$uriSegmentString = '';

		if ($uriSegments)
			$uriSegmentString = implode('/', $uriSegments);

		$url .= $uriSegmentString;

		$queryString = '';

		if ($queryParams)
			$queryString = '?'.http_build_query($queryParams);

		$url .= $queryString;

		$url = preg_replace('/([^:])(\/{2,})/', '$1/', $url);

		return $url;
	}

	/**
	 * Връша секунди от DateInterval.
	 *
	 * @param DateInterval $dateInterval
	 * @param return int
	 */
	public static function dateIntervalToSeconds(\DateInterval $dateInterval) {

		$seconds = ($dateInterval->d * 24 * 60 * 60) + ($dateInterval->h * 60 * 60) + ($dateInterval->i * 60) + $dateInterval->s;

		return $seconds;
	}

	/**
	 * Генерира вложен списък от Json.
	 *
	 * @param string $array
	 */
	public static function jsonToList($array){

		$output = '<ul class="tree-list-graph">';

		foreach($array as $key => $item) {

			$class = '';

			if (is_object($item))
				$output .= '<li>' . '<span class="badge badge-secondary"><b>'.$key.'</b></span>';
			else
				$output .= '<li>' . '<b>'.$key.'</b>';


			if (is_object($item))
				$output .= self::jsonToList($item);
			else
				$output .= ': '.$item;

			$output .= '</li>';

		}

		$output .= '</ul>';

		return $output;
	}

	/**
	 * Криптира стринг.
	 *
	 * @param string $data
	 * @param string $key
	 */
	public static function encrypt($data, $key, $iv) {
		$encryptionKey = base64_decode($key);
		$encrypted = openssl_encrypt($data, 'aes-256-cbc', $encryptionKey, 0, $iv);

		return base64_encode($encrypted);
	}

	/**
	 * Декриптира стринг.
	 *
	 * @param string $data
	 * @param string $key
	 */
	public static function decrypt($data, $key, $iv) {

		$encryptionKey = base64_decode($key);
		$encryptedData = base64_decode($data);

		return openssl_decrypt($encryptedData, 'aes-256-cbc', $encryptionKey, 0, $iv);
	}

	/**
	 * Връща име на cookie на основен домейн.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param string
	 */
	public function getDomainCookieName() {

		try{

			if ($cookieDomainName = $this->winCache->getItem('cookieDomainName'))
				return $cookieDomainName;

			$cookieDomainName = $this->appDM->getCookieDomainName($totlalCount, ['code' => 'GL_COMMON_COOKIE_DOMAIN']);
			$this->winCache->setItem('cookieDomainName', $cookieDomainName);

			return $cookieDomainName;
		}
		catch (\Exception $e) {

			AppService::handleException($e, 'E_ERROR', 'COMMON_ERROR_MESSAGE');

			return false;
		}
	}

	/**
	 * Инициализира календар от - до дата.
	 *
	 * @param string $dateFrom
	 * @param string $dateTo
	 */
	public static function initCalendarInterval($dateFrom='', $dateTo='') {

		$showDateFromMaxDate = 0;
		$errorInvalidPeriod = 0;

		$validator = new \Zend\Validator\Date(['format' => 'd.m.Y']);

		if (!$validator->isValid($dateFrom) || !$validator->isValid($dateTo)){
			if (!$validator->isValid($dateFrom))
				$dateFrom = '';

			if (!$validator->isValid($dateTo))
				$dateTo = '';
		}

		else {

			if (!empty($dateTo) &&
				(
					empty($dateFrom)
					||
					(!empty($dateFrom) && self::compareDates($dateFrom.' 00:00:00', $dateTo.' 00:00:00') >= 0)
				)
			)
				$showDateFromMaxDate = 1;


			if (!empty($dateFrom) && !empty($dateTo) && self::compareDates($dateFrom.' 00:00:00', $dateTo.' 00:00:00') == -1)
				$errorInvalidPeriod = 1;
		}
	?>

		<script>
			$(function () {

				$('#dateFrom').datetimepicker({
					useCurrent: false,
					format: "DD.MM.YYYY",
					locale: moment.locale('bg')
					<?php if (!empty($showDateFromMaxDate)) { ?>
					,
					maxDate: '<?=\Application\Service\AppService::getSqlDate($dateTo)?>'
					<?php } ?>
				});

				$('#dateTo').datetimepicker({
					useCurrent: false,
					format: "DD.MM.YYYY",
					locale: moment.locale('bg')
					<?php if (!empty($dateFrom)) { ?>
					,
					minDate: '<?=\Application\Service\AppService::getSqlDate($dateFrom)?>'
					<?php } ?>
				});

				<?php if (!empty($errorInvalidPeriod)) { ?>
					$("#dateTo").on("show.datetimepicker", function (e) {
						$('#dateTo').datetimepicker('date', moment('<?=\Application\Service\AppService::getSqlDate($dateFrom)?>', 'YYYY-MM-DD') );
					});
				<?php } ?>

				$("#dateFrom").on("change.datetimepicker", function (e) {
					$('#dateTo').datetimepicker('minDate', e.date);
				});
				$("#dateTo").on("change.datetimepicker", function (e) {
					$('#dateFrom').datetimepicker('maxDate', e.date);
				});
			});
		</script>

	<? }

	/**
	 * Конвертира дата във формат от база данни в dd.mm.YY
	 *
	 * @param string $date
	 * @param int $isTime
	 * @param string $separator
	 * @return string
	 */
	public static function getDateFromSQL($date, $isTime=0, $separator='.') {

		@list ($date, $time) = explode(' ', $date);

		if ($isTime == 2) {

			$time = ' '.$time;
		}
		else if ($isTime == 1) {

			$time = ' '.substr($time, 0, (strlen ($time)) - (strlen (strrchr($time,':'))));
		}
		else
			$time = '';

		@ list($y, $m, $d) = explode('-', $date);

		if (!intval($y)) // empty date
			return '';

		return $d.$separator.$m.$separator.$y.$time;
	}


	/**
	 * Определя начална страница при странициране.
	 *
	 * @param array $params
	 * @return string
	 */
	public static function createStartIndex(array $params) {

		$startIndex = null;

		if (isset($params['cp'])) {

			if (!empty($params['row_count']))
				$params['rowCount'] = $params['row_count'];

			$startIndex = (int)(!empty($params['rowCount']) && !empty((int)$params['cp']) ? ((int)$params['cp'] - 1) * $params['rowCount'] + 1 : null);
			$startIndex = $startIndex > 0 ? $startIndex : 1;
		}

		return $startIndex;
	}

}