<?php
function p($var) {
	echo '<pre>';
	print_r($var);
	echo '</pre>';
}

function c($obj) {
	p(get_class_methods($obj));
}

function f($arr) {
	foreach ($arr as $v)
		p($v);
}

function errorHandler($errno, $errstr, $errfile, $errline, $errcontext = null, $loggerName = 'EPZEU')
{
	$environment = strtolower(getenv('ENVIRONMENT'));

	$localConfig = include './config/autoload/'.$environment.'.local.php';

	$errorArr = [
		1 		=> 'E_ERROR' ,
		4096 	=> 'E_RECOVERABLE_ERROR',
		2 		=> 'E_WARNING',
		4 		=> 'E_PARSE',
		8 		=> 'E_NOTICE',
		2048 	=> 'E_STRICT',
		8192 	=> 'E_DEPRECATED',
		16 		=> 'E_CORE_ERROR',
		32 		=> 'E_CORE_WARNING',
		64 		=> 'E_COMPILE_ERROR',
		128 	=> 'E_COMPILE_WARNING',
		256 	=> 'E_USER_ERROR',
		512 	=> 'E_USER_WARNING',
		1024 	=> 'E_USER_NOTICE',
		16384 	=> 'E_USER_DEPRECATED',
		32767 	=> 'E_ALL'
	];

	$errorCode = array_key_exists($errno, $errorArr) ? $errorArr[$errno] : $errno;


	$remote = new \Zend\Http\PhpEnvironment\RemoteAddress;
	$IpAddressLog = $remote->getIpAddress();

	$dateTimeObj = new \DateTime();
	$dateLog = $dateTimeObj->format('c');

	$request = new \Zend\Http\PhpEnvironment\Request();

	$userSessionIDLog = '';

	if ($request->getCookie() && $request->getCookie()->offsetExists('EPZEUSessionID')) {
		$userSessionIDLog = $request->getCookie()->offsetGet('EPZEUSessionID');
	}

	$ATSub = '';

	if ($request->getCookie() && $request->getCookie()->offsetExists('AT')) {

		$accessToken = $request->getCookie()->offsetGet('AT');
		$parts = explode('.', $accessToken);
		$section = 1;

		if (isset($parts[$section])) {
			$padding = strlen($parts[$section]) % 4;
			if ($padding > 0) {
				$parts[$section] .= str_repeat('=', 4 - $padding);
			}
			$userObjLog =  strtr($parts[$section], '-_', '+/');
			if (property_exists( json_decode(base64_decode($userObjLog)) , 'sub'))
				$ATSub = json_decode(base64_decode($userObjLog))->sub;
		}
	}

	$errstr = str_replace("\n", '', $errstr);

	//if ($errstr == 'Invalid UUID' || $errstr == 'UUID Error')
		//return '';

	$error = $dateLog.'; '.$errorCode.'; '.$loggerName.'; '.$errstr.'; '.$errfile.'; '.$errline.'; '.$IpAddressLog.'; '.$ATSub.'; '.$userSessionIDLog.'; ';

	if (is_string($errcontext)) {
		$errcontext = str_replace('#', '##', $errcontext);

		if ($loggerName == 'DATABASE')
			$error .= "\n".$errcontext;
	}

	$pos = strpos($errstr, 'COMMON_ERROR_MESSAGE');

	if ($pos === false) {

		$logger = new \Zend\Log\Logger();
		$writer = new \Zend\Log\Writer\Stream($localConfig['config']['error_log'] . date('Y-m-d') . '-error.log');

		$formatter = new \Zend\Log\Formatter\Simple('%message%');
		$writer->setFormatter($formatter);

		$logger->addWriter($writer)->crit($error);
	}

	return false;
}

set_error_handler("errorHandler");