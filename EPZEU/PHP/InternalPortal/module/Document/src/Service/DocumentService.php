<?php
/**
 * DocumentService class file
 *
 * @package Document
 * @subpackage Service
 */

namespace Document\Service;

class DocumentService {

	protected $config;

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
	 * Визуализира изображение от базата данни
	 *
	 * @param string $imageName
	 */
	public static function getImageFromDatabase($imgObj, $fileContent) {

		$response = new \Zend\Http\Response\Stream();
		$response->setStream($fileContent);
		$response->setStatusCode(200);

		$headers = new \Zend\Http\Headers();
		$headers->addHeaderLine('Content-Type', $imgObj->getContentType())
		->addHeaderLine('Content-Disposition', 'filename="' . $imgObj->getFileName() . '"')
		->addHeaderLine('Content-Length', $imgObj->getFileSize());

		$response->setHeaders($headers);

		return $response;
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
	 * Генерира масив с прикачени файлове при невалидно изпращане на форма.
	 * @param array $fileArr
	 */
	public static function getFileArrayFromUploadedFiles(array $fileArr) {

		$fileData = [];

		foreach ($fileArr as $file) {
			$dataInfo = json_decode($file);
			$fileData[$file] = ['value' => $file, 'label' => $file, 'attributes' => ['data-uuid' => $dataInfo->uuid]];
		}

		return $fileData;

	}

	/**
	 * Извлича списък с UUID от прикачени файлове.
	 *
	 * @param array $fileConfigList
	 */
	public static function extractUuidFromFileList(array $fileConfigList) {

		$uuidList = [];

		foreach ($fileConfigList as $fileConfig) {
			$file = json_decode($fileConfig['value']);
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
	public static function getFileFromDatabase($docObj, $stream) {

		$fileName = self::stripFileName($docObj->getfileName());
		$fileName = self::getOriginalFilename($fileName);

		// IE < version 11
		if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		// IE version 11
		if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		$fileSize = $docObj->getFileSize();
		$mimeType = $docObj->getContentType();

		$response = new \Zend\Http\Response\Stream();
		$response->setStream($stream);
		$response->setStatusCode(200);

		$headers = new \Zend\Http\Headers();
		$headers->addHeaderLine('Content-Type', $mimeType)
		->addHeaderLine('Content-Disposition', 'attachment; filename="' . $fileName . '"')
		->addHeaderLine('Content-Length', $fileSize);


		$response->setHeaders($headers);
		return $response;
	}

}