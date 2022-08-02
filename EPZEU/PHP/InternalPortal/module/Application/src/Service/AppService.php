<?php
/**
 * AppService class file
 *
 * @package Application
 * @subpackage Service
 */

namespace Application\Service;


class AppService {

	protected $nomenclatureDM;

	protected $winCache;

	public function __construct($nomenclatureDM, $winCache) {
		$this->nomenclatureDM = $nomenclatureDM;
		$this->winCache = $winCache;
	}


	/**
	 * Конвертира дата във формат за база данни
	 *
	 * @param string $date
	 * @param string $locale
	 */
	public static function getSqlDate($date) {

		$sqlDate = date("Y-m-d", strtotime($date));

		return $sqlDate;
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
	 * Прихваща грешки от базата данни
	 */
	public static function handleDbError($e) {

		preg_match('/[A-Z]{2}\d{3}/s',$e->getMessage(), $matches);

		$errorMessage = null;

		$messageList = [
			'EP004' 	=>	'EP_USR_00001_E',
			'EP005' 	=>	'EP_NOM_ALREADY_ADD_E',
			'EP006'		=>	'EP_NOM_USER_LIMIT_EXIST_E',
			'EP007'		=>	'EP_CMS_INCLUDES_BAAN_WORDS_EXIST_E',
			'EP008'		=>	'EP_USR_00003_E',
			'EP011'		=> 	'EP_CMS_EXIST_BULLETIN_FOR_PERIOD_E',
			'EP012' 	=> 	'EP_PAY_00001_E',
			'EP013'		=>  'EP_STATISTICS_REPORT_EXIST_E',
			'EP014'		=>  'EP_NOM_NO_ADD_EXIST_SERVICE_E'
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
	 *
	 * @param string $message
	 * @param string $type
	 * @param string $component
	 *
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
	 * Извлича url- адрес на публичен портал
	 *
	 * @param array $config
	 * @return string
	 */
	public static function getFEUrl($config) {

		$url = $config['GL_EPZEU_PUBLIC_UI_URL'].$config['public_url_suffix'];

		$url = preg_replace('/([^:])(\/{2,})/', '$1/', $url);

		return $url;
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
	 * Генерира стринг за запис в базата данни за поле от тип Interval
	 *
	 * @return string
	 */
	public static function createDateIntervalString(\DateInterval $dateIntervalObj, $translator, $textFormat=null) {

		$period = '';

		if (empty($textFormat)) {

			if ($dateIntervalObj->d)
				$period .= $dateIntervalObj->d.' '.($dateIntervalObj->d == 1 ? $translator->translate('GL_DAY_L') : $translator->translate('GL_DAYS_L')).' ';

			$period .= sprintf('%02d', $dateIntervalObj->h).':'.sprintf('%02d', $dateIntervalObj->i).':'.sprintf('%02d', $dateIntervalObj->s).'.'.str_replace('0.', '', $dateIntervalObj->f);
		}

		else {

			if ($dateIntervalObj->d)
				$period .= $dateIntervalObj->d.' '.($dateIntervalObj->d == 1 ? mb_strtolower($translator->translate('GL_DAY_L'), 'UTF-8') : mb_strtolower($translator->translate('GL_DAYS_L'), 'UTF-8'));

			if ($dateIntervalObj->h)
				$period .= ' '.$dateIntervalObj->h.' '.($dateIntervalObj->h == 1 ? mb_strtolower($translator->translate('GL_HOUR_L'), 'UTF-8') : mb_strtolower($translator->translate('GL_HOURS_S_L'), 'UTF-8'));

			if ($dateIntervalObj->i)
				$period .= ' '.$dateIntervalObj->i.' '.mb_strtolower($translator->translate('GL_MINUTES_L'), 'UTF-8');

			if ($dateIntervalObj->s)
				$period .= ' '.$dateIntervalObj->s.' '.mb_strtolower($translator->translate('GL_SECONDS_L'), 'UTF-8');
		}

		return mb_strtolower($period);
	}

	/**
	 * Създава обект от тип \DateInterval от масив
	 *
	 * @param array $array
	 */
	public static function createDateIntervalFromArray($array) {

		$dateInterval = '';

		if ($array['days'])
			$dateInterval .= $array['days'].' days ';

		if (empty($array['hours']))
			$array['hours'] = '00';

		if (empty($array['minutes']))
			$array['minutes'] = '00';

		if (empty($array['seconds']))
			$array['seconds'] = '00';

		$dateInterval .= $array['hours'].':'.$array['minutes'].':'.$array['seconds'];

		if (!empty($array['milliseconds'])) {
			$milliseconds = str_replace('0.', '', ($array['milliseconds'] / 1000));
			$dateInterval .= '.'.$milliseconds;
		}


		return $dateInterval;

	}

	/**
	 * Разделя часове от дата.
	 *
	 * @param string $dataTime
	 */
	public static function separateDateTime($dataTime) {
		return explode(' ', $dateTime);
	}

	/**
	 * Обединява дата и час.
	 *
	 * @param string $data
	 * @param string $time
	 */
	public static function unionDateTime($data, $time) {
		return $data.' '.$time;
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

		foreach($array as $key => $item){

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

		if ($cookieDomainName = $this->winCache->getItem('cookieDomainName'))
			return $cookieDomainName;

		$cookieDomainName = $this->nomenclatureDM->getParamList($totlalCount, ['code' => 'GL_COMMON_COOKIE_DOMAIN'])->current();

		$this->winCache->setItem('cookieDomainName', $cookieDomainName->getValueString());

		return $cookieDomainName->getValueString();
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