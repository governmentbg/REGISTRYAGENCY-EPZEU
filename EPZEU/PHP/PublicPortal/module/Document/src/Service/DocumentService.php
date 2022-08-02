<?php
/**
 * DocumentService class file
 *
 * @package Document
 * @subpackage Service
 */

namespace Document\Service;

use Zend\Http\Response;
use Zend\Http\Headers;

class DocumentService {

	/**
	 *
	 * @var array
	 */
	protected $config;

	protected static $secondsToCache = 86400;

	public function __construct($config) {
		$this->config = $config;
	}

	/**
	 * Изтрива случайно генериран суфикс от името на файл и връща неговото оригинално име
	 *
	 * @param string $string
	 * @return string
	 */
	public static function getOriginalFilename($string) {

		preg_match_all('/_\w{14}_\d{8}\./', $string, $matches, PREG_SET_ORDER);

		if (!empty($matches)) {
			$randomString = end($matches)[0];
			$string = str_replace($randomString, '.', $string);
		}

		return $string;
	}

	/**
	 * Изтрива id на елемен от име на файл
	 *
	 * @param string $filename
	 * @return string
	 */
	public static function removeIdFromFilename($filename) {

		$filename = preg_replace('/^([a-z]+_)?\d+_/', '', $filename);

		return $filename;
	}

	/**
	 * Изтрива файлове от временна директория
	 *
	 * @param array $fileNameArray
	 */
	public function deleteTmpFiles($fileNameArray) {

		if (is_array($fileNameArray)) {
			foreach($fileNameArray as $file){
				if(is_file($this->config['tmp_folder'].$file))
					unlink($this->config['tmp_folder'].$file);
			}
		}
	}

	/**
	 * Взима медия файл от кеш
	 *
	 * @param string $fileName
	 */
	public static function getMediaFileFromCache($filePath, $fileName) {

		if (file_exists($filePath.$fileName)) {

			$fileSize = filesize($filePath.$fileName);
			$mimeType = mime_content_type($filePath.$fileName);

			$response = new \Zend\Http\Response\Stream();
			$response->setStream(fopen($filePath.$fileName, 'r'));
			$response->setStatusCode(200);

			$fileName = self::stripFileName($fileName);

			$headers = new \Zend\Http\Headers();
			$headers->addHeaderLine('Content-Type', $mimeType)
			->addHeaderLine('Content-Disposition', 'attachment; filename="' . $fileName . '"')
			->addHeaderLine('Content-Length', $fileSize);

			$response->setHeaders($headers);
			return $response;
		}

		$response = $response = new \Zend\Http\Response;
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Взима файл от кеш
	 *
	 * @param string $filePath
	 * @param string $fileName
	 */
	public static function getFileFromCache($filePath, $fileName, $clearFileId = false, $contentType = null) {

		if (file_exists($filePath.$fileName)) {

			$fileName = self::stripFileName($fileName);

			// IE < version 11
			if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
				$fileName = rawurlencode($fileName);

			// IE version 11
			if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
				$fileName = rawurlencode($fileName);

			$fileSize = filesize($filePath.$fileName);

			$mimeType = $contentType ? $contentType : mime_content_type($filePath.$fileName);

			if ($clearFileId)
				$originalFileName = self::removeIdFromFilename($fileName);

			$originalFileName = self::getOriginalFilename($originalFileName);

			$response = new \Zend\Http\Response\Stream();
	    	$response->setStream(fopen($filePath.$fileName, 'r'));
	    	$response->setStatusCode(200);

			$headers = new \Zend\Http\Headers();
			$headers->addHeaderLine('Content-Type', $mimeType)
	        ->addHeaderLine('Content-Disposition', 'attachment; filename="' . $originalFileName . '"')
	        ->addHeaderLine('Content-Length', $fileSize);

		    $response->setHeaders($headers);
		    return $response;
		}

		$response = $response = new \Zend\Http\Response;
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Изчиства името на файл от специални символи
	 *
	 * @return mixed
	 */
	public static function stripFileName($fileName) {

		$invalidChars = array('<', '>', '?', '"', ':', '|', '\\', '/', '*', '&');

		$nonPrintingChars = array_map('chr', range(0,31));

		$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

		$fileName = str_replace($allInvalidChars, '', $fileName);

		return $fileName;
	}

	/**
	 * Изтрива всички файлове по подаден префикс.
	 * @param string $filePath
	 * @param string $prefix
	 */
	public static function deleteOldFilesByPrefix($filePath, $prefix) {
		$prefix .= '*.*';
		array_map('unlink', glob($filePath.'/'.$prefix));
	}

	public static function extractUuidFromFileList(array $fileConfigList) {

		$uuidList = [];

		foreach ($fileConfigList as $fileConfig) {
			$file = json_decode($fileConfig);
			$uuidList[] = $file->uuid;
		}

		return $uuidList;

	}

	/**
	 * Взима файл от базата данни
	 *
	 * @param object $docObj
	 * @param resource $stream
	 */
	public static function getFileFromDatabase($docObj, $stream, $etag = '', $isVideo = false) {

		$fileName = self::stripFileName($docObj->getfileName());
		$fileName = self::getOriginalFilename($fileName);

		$etag = md5($etag);
		$lastModified = gmdate('D, d M Y H:i:s', strtotime($docObj->getUpdatedOn())) . ' GMT';

		// IE < version 11
		if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		// IE version 11
		if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		$fileSize = $docObj->getFileSize();
		$mimeType = $docObj->getContentType();

		$ts = gmdate("D, d M Y H:i:s", time() + self::$secondsToCache) . " GMT";

		$headers = new \Zend\Http\Headers();
		$headers->addHeaderLine('Content-Type', $mimeType)
		->addHeaderLine('Content-Disposition', 'attachment; filename="' . $fileName . '"')
		->addHeaderLine('Content-Length', $fileSize)
		->addHeaderLine('ETag', $etag)
		->addHeaderLine('Last-Modified', $lastModified)
		->addHeaderLine('Cache-Control', 'public, max-age='.self::$secondsToCache);

		if ($isVideo) {

			$headers->addHeaderLine('Accept-Ranges', 'bytes');

			if (isset($_SERVER['HTTP_RANGE'])) {

				$response = new \Zend\Http\Response();

				$fileLength = $size = $fileSize;

				list( , $range) = explode('=', $_SERVER['HTTP_RANGE']); // bytes=byte-range-set
				$range = trim($range);

				if (strpos($range, ',') !== false) {
					// eventually, we should handle requests with multiple ranges
					// most likely these types of requests will never be sent
					$response->setStatusCode(416);
					echo "<h1>Range Not Satisfiable</h1>";
					exit;
				} else if (preg_match('/(\d+)-(\d+)/', $range, $match)) {
					// bytes n - m
					$range = array(intval($match[1]), intval($match[2]));
				} else if (preg_match('/(\d+)-$/', $range, $match)) {
					// bytes n - last byte of file
					$range = array(intval($match[1]), null);
				} else if (preg_match('/-(\d+)/', $range, $match)) {
					// final n bytes of file
					$range = array($size - intval($match[1]), $size - 1);
				}

				if ($range[1] === null)
					$range[1] = $size - 1;

				$length = $range[1] - $range[0] + 1;

				$file = stream_get_contents($stream);
				$file = substr($file, $range[0], $length);

				$response->setStatusCode(206);
				$headers->addHeaderLine("Content-Range", "bytes {$range[0]}-{$range[1]}/{$size}");

				if ($range[0] < 0 ||$range[1] >= $size || $range[0] >= $size || $range[0] > $range[1]) {
					$response->setStatusCode(416);
					echo "<h1>Range Not Satisfiable</h1>";
					exit;
				}

				$response->setContent($file);

				header_remove('Set-Cookie');

				$response->setHeaders($headers);
				return $response;
			}
		}

		$response = new \Zend\Http\Response\Stream();
		$response->setStream($stream);
		$response->setStatusCode(200);

		header_remove('Set-Cookie');

		$response->setHeaders($headers);
		return $response;
	}

	/**
	 * Визуализира изображение от базата данни
	 *
	 * @param string $imageName
	 */
	public static function getImageFromDatabase($imgObj, $fileContent) {

		$etag = md5($imgObj->getNewsId());
		$lastModified = gmdate('D, d M Y H:i:s', strtotime($imgObj->getUpdatedOn())) . ' GMT';

		$ts = gmdate("D, d M Y H:i:s", time() + self::$secondsToCache) . " GMT";

		$fileName = $imgObj->getFileName();

		// IE < version 11
		if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($imgObj->getFileName());

		// IE version 11
		if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($imgObj->getFileName());

		$response = new \Zend\Http\Response\Stream();
		$response->setStream($fileContent);
		$response->setStatusCode(200);

		$headers = new \Zend\Http\Headers();
		$headers->addHeaderLine('Content-Type', $imgObj->getContentType())
		->addHeaderLine('Content-Disposition', 'filename="' . $fileName . '"')
		->addHeaderLine('Content-Length', $imgObj->getFileSize())
		->addHeaderLine('ETag', $etag)
		->addHeaderLine('Last-Modified', $lastModified)
		->addHeaderLine('Accept-Ranges', 'bytes')
		->addHeaderLine('Cache-Control', 'max-age='.self::$secondsToCache);

		header_remove('Set-Cookie');

		$response->setHeaders($headers);
		return $response;
	}


	/**
	 * Проверява дали файлът е кеширан в браузъра.
	 *
	 * @param string $etag
	 * @param string $updatedOn
	 */
	public static function isFileCached($etag, $updatedOnTimestamp) {

		$headers = getallheaders();
		$etag = md5($etag);

		if (isset($headers['If-None-Match']) && isset($headers['If-Modified-Since'])) {
			if ($headers['If-None-Match'] == $etag && $updatedOnTimestamp <= strtotime($headers['If-Modified-Since'])) {
				$response = new Response();
				$response->setStatusCode(304);
				return $response;
			}
		}

		return false;
	}
}