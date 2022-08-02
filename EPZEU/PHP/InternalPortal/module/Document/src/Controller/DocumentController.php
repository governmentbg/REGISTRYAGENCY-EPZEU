<?php

namespace Document\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\JsonModel;
use Zend\InputFilter\InputFilter;
use Application\Service\AppService;

/**
 * Контролер реализиращ функционалности за работа с документи.
 *
 * @package Document
 * @subpackage Controller
 */
class DocumentController extends AbstractActionController {


	/**
	 * Услуга за локализация на интерфейс.
	 *
	 * @var MvcTranslator
	 */
	protected $translator;

	/**
	 * Обект за поддържане и съхранение на обекти от тип Документи.
	 *
	 * @var \Document\Data\DocumentDataManager
	 */
	protected $documentDM;


	/**
	 * Конструктор.
	 *
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \Document\Data\DocumentDataManager $documentDM Обект за поддържане и съхранение на обекти от тип Документи.
	 */
	public function __construct($translator, $documentDM) {
		$this->translator = $translator;
		$this->documentDM = $documentDM;
	}


	/**
	 * Функционалност "Изтриване на прикачен файл във форма".
	 *
	 * Изтрива файла от директория за временно съхранение на данни.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function deleteTmpFileAction() {

		$request = $this->getRequest();
		$config = $this->getConfig();

		$fileUuid = $this->params()->fromQuery('fileName');

		$validator = new \Zend\Validator\Uuid();

		if (!$validator->isValid($fileUuid)) {
			return new JsonModel(array(
				"response" => "Invalid UUID",
			));
		}

		if ($request->isXmlHttpRequest() && $fileUuid) {

			if ($this->documentDM->deleteTempFile([$fileUuid]))
				return new JsonModel(array(
					"response" => "success",
				));

		}

		return new JsonModel(array(
			"response" => "error",
		));
	}


	/**
	 * Функционалност "Прикачване на файл във форма".
	 *
	 * Качва файла в директория за временно съхранение на данни.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function uploadFileAction() {

		$routeName = $this->getEvent()->getRouteMatch()->getMatchedRouteName();

		$file = $this->params()->fromFiles('file');

		if (!$fileId = $this->params()->fromQuery('file', false)) {
			return $result = new JsonModel(array(
				"response" => "error",
			));
		}

		$nonPrintingChars = array_map('chr', range(0,31));
		$invalidChars = array('<', '>', '?', '"', ':', '|', '\\', '/', '*', '&', '\'');
		$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

		$file['name'] = str_replace($allInvalidChars, '', $file['name']);

		$ext = pathinfo($file['name'], PATHINFO_EXTENSION);

		$request = $this->getRequest();

		$config = $this->getConfig();

		$mimeTypeList = [];

		if ($request->isPost()) {

			switch ($routeName) {

				case 'upload_file':

					$inputFilter = new InputFilter();

					$fileConfigParams = self::getFileConfigParams($config['EP_CMS_DOCUMENT_ALLOWED_FORMATS']);

					$validExtensions = array_keys($fileConfigParams);

					if (!empty($fileConfigParams[$ext]))
						$mimeTypeList = $fileConfigParams[$ext];

					$inputFilter->add([
						'name' => 'file',
						'required' => true,

						 'validators' => [
							[
							 	'name' => 'Zend\Validator\File\Size',
								'break_chain_on_failure' => true,
							 	'options' => [
							 		'min' => '1b',
							 		'max' => $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB',
							 		'messages' => [
							 			'fileSizeTooBig' => str_replace(['{FILE_SIZE_IN_KB}', '{MAX_FILE_SIZE}'], [ceil($file['size']/1024).' kB', $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB'], $this->translator->translate('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')),
							 			'fileSizeTooSmall' => $this->translator->translate('GL_UPLOAD_FILE_E')
							 		]
							 	]
							 ],
						 	[
							 	'name' => 'Zend\Validator\File\Extension',
						 		'break_chain_on_failure' => true,
							 	'options' => [
							 		'extension' => $validExtensions,
						 			'messages' => [
						 				'fileExtensionFalse' => str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E'))
						 			]
							 	]
							 ],
					 		[
						 		'name' => 'Zend\Validator\File\MimeType',
						 		'options' => [
					 				'mimeType' => $mimeTypeList,
					 				'message' => str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E')),

						 		]
					 		],

						],
					]);

					break;

				case 'upload_video_file':

					$inputFilter = new InputFilter();

					$fileConfigParams = self::getFileConfigParams($config['EP_CMS_VIDEO_ALLOWED_FORMATS']);

					$validExtensions = array_keys($fileConfigParams);

					if (!empty($fileConfigParams[$ext]))
						$mimeTypeList = $fileConfigParams[$ext];


					$inputFilter->add([
						'name' => 'file',
						'required' => false,
						'validators' => [
							[
								'name' => 'Zend\Validator\File\Size',
								'break_chain_on_failure' => true,
								'options' => [
									'min' => '1b',
									'max' => $config['EP_CMS_VIDEO_MAX_FILE_SIZE'].'KB',
									'messages' => [
										'fileSizeTooBig' => str_replace('{EP_CMS_VIDEO_MAX_FILE_SIZE}', $config['EP_CMS_VIDEO_MAX_FILE_SIZE'], $this->translator->translate('EP_CMS_VIDEO_MAX_FILE_SIZE_E')),
										'fileSizeTooSmall' => $this->translator->translate('GL_UPLOAD_FILE_E')
									]
								]
							],

							[
								'name' => 'Zend\Validator\File\Extension',
								'break_chain_on_failure' => true,
								'options' => [
									'extension' => $validExtensions,
									'messages' => [
										//'fileExtensionFalse' => str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E'))
										'fileExtensionFalse' => str_replace('{EP_CMS_VIDEO_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_VIDEO_ALLOWED_FORMATS_E'))
									]
								]
							],
							[
								'name' => 'Zend\Validator\File\MimeType',
								'options' => [
									'mimeType' => $mimeTypeList,
									'message' => str_replace('{EP_CMS_VIDEO_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_VIDEO_ALLOWED_FORMATS_E')),

								]
							],

						]
					]);

					break;

				case 'upload_bulletin_file':

					$inputFilter = new InputFilter();

					$inputFilter->add([
						'name' => 'file',
						'required' => false,
						'validators' => [
							[
								'name' => 'Zend\Validator\File\Size',
								'options' => [
									'min' => '1b',
									'max' => $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB',
									'messages' => [
										'fileSizeTooBig' => str_replace(['{FILE_SIZE_IN_KB}', '{MAX_FILE_SIZE}'], [ceil($file['size']/1024).' kB', $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB'], $this->translator->translate('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')),
										'fileSizeTooSmall' => $this->translator->translate('GL_UPLOAD_FILE_E')
									]
								]
							],
							[
								'name' => 'Zend\Validator\File\Extension',
								'break_chain_on_failure' => true,
								'options' => [
									'extension' => ['pdf'],
									'messages' => [
										'fileExtensionFalse' => $this->translator->translate('EP_CMS_MUST_PDF_FILE_FORMAT_E')
									]
								]
							],
							[
								'name' => 'Zend\Validator\File\MimeType',
								'options' => [
									'mimeType' => 'application/pdf',
									'message' => str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', 'pdf', $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E')),

								]
							],
						]
					]);

					break;

				case 'upload_statistic_file':

					$inputFilter = new InputFilter();

					$fileConfigParams = self::getFileConfigParams($config['EP_STATISTICS_ALLOWED_FORMATS']);

					$validExtensions = array_keys($fileConfigParams);

					if (!empty($fileConfigParams[$ext]))
						$mimeTypeList = $fileConfigParams[$ext];

					$inputFilter->add([
						'name' => 'file',
						'required' => false,
						'validators' => [
							[
								'name' => 'Zend\Validator\File\Size',
								'options' => [
										'min' => '1b',
										'max' => $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB',
										'messages' => [
												'fileSizeTooBig' => str_replace(['{FILE_SIZE_IN_KB}', '{MAX_FILE_SIZE}'], [ceil($file['size']/1024).' kB', $config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB'], $this->translator->translate('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')),
												'fileSizeTooSmall' => $this->translator->translate('GL_UPLOAD_FILE_E')
										]
								]
							],

							[
								'name' => 'Zend\Validator\File\Extension',
								'break_chain_on_failure' => true,
								'options' => [
									'extension' => $validExtensions,
									'messages' => [
										'fileExtensionFalse' => str_replace('{EP_STATISTICS_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_STATISTICS_ALLOWED_FORMATS_E'))
									]
								]
							],

							[
								'name' => 'Zend\Validator\File\MimeType',
								'options' => [
									'mimeType' => $mimeTypeList,
									'message' => str_replace('{EP_STATISTICS_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_STATISTICS_ALLOWED_FORMATS_E'))
								]
							],

						]
					]);

				break;

				case "upload_image":

					$inputFilter = new InputFilter();

					$fileConfigParams = self::getFileConfigParams($config['EP_CMS_IMAGE_ALLOWED_FORMATS']);

					$validExtensions = array_keys($fileConfigParams);

					if (!empty($fileConfigParams[$ext]))
						$mimeTypeList = $fileConfigParams[$ext];

					$inputFilter->add([
						'name' => 'file',
						'required' => false,
						'validators' => [
							[
								'name' => 'Zend\Validator\File\Extension',
								'break_chain_on_failure' => true,
								'options' => [
									'extension' => $validExtensions,
									'messages' => [
										'fileExtensionFalse' => str_replace('{EP_CMS_IMAGE_ALLOWED_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('EP_CMS_IMAGE_ALLOWED_FORMAT_E'))
									]
								]
							],
							[
							'name' => 'Zend\Validator\File\Size',
							'options' => [
									'min' => '1b',
									'max' => $config['EP_CMS_IMAGE_MAX_FILE_SIZE'].'KB',
									'messages' => [
										'fileSizeTooBig' => str_replace(['{FILE_SIZE_IN_KB}', '{EP_CMS_IMAGE_MAX_FILE_SIZE}'], [ceil($file['size']/1024), $config['EP_CMS_IMAGE_MAX_FILE_SIZE']], $this->translator->translate('EP_CMS_IMAGE_MAX_FILE_SIZE_E')),
										'fileSizeTooSmall' => $this->translator->translate('GL_UPLOAD_FILE_E')
									]
								]
							]
						]
					]);
					break;

				case "upload_legislation":

					break;
			}

			$inputFilter->setData($request->getFiles());

			if ($customFileName = $this->params()->fromPost('customFileName')) {
				$customFileName = str_replace($allInvalidChars, '', $customFileName);
				$file['name'] = $customFileName.'.'.$ext;
			}

			if ($inputFilter->isValid()) {

				$info = pathinfo($file['name']);

				$uuid = AppService::genToken();
				$newFileName = $info['filename'].(str_replace('.', '_', uniqid('_', true))).'.'.$info['extension'];

				$inalidAfter = date("Y-m-d H:i:s", time() + 86400);

				if ($routeName == 'upload_image') {
					$name = $file["name"];
					$tmpName = $file["tmp_name"];
					$type = $file["type"];
					$size = $file["size"];
					$errorMsg = $file["error"];
					$explode = explode(".",$name);
					$extension = end($explode);

					$moveFile = move_uploaded_file($tmpName,"./data/tmp/$name");

					$target = "./data/tmp/$name";
					$resize = "./data/tmp/resize_$name";

					$max_width = $config['news_max_img_w'];
					$max_height = $config['news_max_img_h'];

					$this->imgResize($target, $resize, $max_width, $max_height, $extension);
					$info = pathinfo('./data/tmp/resize_'.$name.'.'.$extension);
					$content = file_get_contents("./data/tmp/resize_$name");
					$fileSize = filesize('./data/tmp/resize_'.$name);

					@unlink($target);
					@unlink($resize);
				}

				else {
					$fileSize = $file['size'];
					$content = file_get_contents($file['tmp_name']);
				}

				$params = [
					'uuid' => $uuid,
					'fileName' => $newFileName,
					'fileSize' => $fileSize,
					'contentType' => $file['type'],
					'content' => $content,
					'invalidAfter' => $inalidAfter,
					'cin' => null,
				];

				if ($this->documentDM->uploadDocument($params)) {
					return $result = new JsonModel(array(
						"response" => "success",
						"fileId" => $fileId,
						"fileName" => $newFileName,
						"originName" => $file['name'],
						'uuid' => $uuid,
					));
				}
			}
			else {
				return $result = new JsonModel(array(
					"response" 		=> "error",
					"fileId" 		=> $fileId,
					"errors" 		=> $inputFilter->getMessages()['file'],
					"fileName" 		=> $file['name'],
					"originName" 	=> $file['name']
				));
			}
		}

		return $result = new JsonModel(array(
				"response" 	=> "error",
				"fileId" 	=> $fileId,
				"fileName" 	=> $file['name'],
				"errors" 	=> ''
		));
	}


	/**
	 * Функционалност "Зареждане на файл с изображение".
	 *
	 * @return HTTP отговор.
	 */
	public function loadTmpImageAction() {

		$uuid = $this->params()->fromRoute('imageName');

		if ($imageData = $this->documentDM->getTmpFile([$uuid])->current())
			return $this->downloadFile(stream_get_contents($imageData->getContent()), $imageData->getFileName(), $imageData->getContentType(), $imageData->getFileSize());

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Сваля файл от директория за временно съхранение на данни.
	 *
	 * @return HTTP отговор.
	 */
	public function downloadTmpFile() {

		$fileName = $this->params()->fromRoute('fileName');
		$config = $this->getConfig();

		if (file_exists($config['tmp_folder'].$fileName)) {
			$fileSize = filesize ($config['tmp_folder'].$fileName);
			$contentType = mime_content_type($config['tmp_folder'].$fileName);
			$fileContent = file_get_contents($config['tmp_folder'].$fileName);
			$this->downloadFile($fileContent, $fileName, $contentType, $fileSize);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Сваля файл.
	 *
	 * @param string $fileContent Съдържание на файл.
	 * @param string $fileName Име на файл.
	 * @param string $contentType Тип на съдържание.
	 * @param int $fileSize Размер на файл.
	 * @return HTTP отговор.
	 */
	public function downloadFile($fileContent, $fileName, $contentType, $fileSize) {

		$nonPrintingChars = array_map('chr', range(0,31));
		$invalidChars = array('<', '>', '?', '"', ':', '|', '\\', '/', '*', '&');
		$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

		$fileName = str_replace($allInvalidChars, '', $fileName);

		// IE < version 11
		if (preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		// IE version 11
		if (preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT']))
			$fileName = rawurlencode($fileName);

		header("Cache-Control: no-cache private");
		header("Content-Description: File Transfer");
		header('Content-disposition: attachment; filename="'.$fileName.'"');
		header("Content-Type: '.$contentType.'");
		header("Content-Transfer-Encoding: binary");
		header('Content-Length: '. $fileSize);
		header("Pragma: no-cache");
		header("Expires: 0");

		ob_clean();
		flush();

		echo $fileContent;
	}


	/**
	 * Връща масив с допустими разширения и mime типове за файл.
	 * @param string $jsonFileParams
	 * @return array
	 */
	public static function getFileConfigParams($jsonFileParams) {

		if (!$reult = json_decode($jsonFileParams))
			return [];

		$fileExtesionList = [];
		foreach ($reult as $extension) {
			$fileExtesionList[$extension->extension] = implode(',', $extension->mimeTypes);
		}

		return $fileExtesionList;
	}

	/**
	 *
	 * @param string $target
	 * @param string $newFile
	 * @param int $w
	 * @param int $h
	 * @param string $extn
	 */
	public function imgResize($target, $newFile, $w, $h, $extn) {

		list($origWidth, $origHeight) = getimagesize($target);

		if ($origWidth < $w && $origHeight < $h) {
			$w = $origWidth;
			$h = $origHeight;
		}

		else {
			$ratio = $origWidth / $origHeight;
			$w = $h * $ratio;
		}

		$img = '';
		$extn = strtolower($extn);

		if($extn == "gif")
			$img = imagecreatefromgif($target);
		elseif($extn == "png")
			$img = imagecreatefrompng($target);
		elseif ($extn == "bmp")
			$img = imagecreatefromstring(file_get_contents($target));
		else
			$img = imagecreatefromjpeg($target);

		$newImg = imagecreatetruecolor($w, $h);

		if ($extn == "gif" || $extn == "png") {
			imagealphablending($newImg, false);
			imagesavealpha($newImg,true);
			$transparent = imagecolorallocatealpha($newImg, 255, 255, 255, 127);
			imagefilledrectangle($newImg, 0, 0, $w, $h, $transparent);
		}

		imagecopyresampled($newImg,$img,0,0,0,0,$w,$h,$origWidth,$origHeight);

		if($extn == "gif")
			imagegif($newImg,$newFile);
		elseif($extn == "png")
			imagepng($newImg,$newFile);
		elseif ($extn == "bmp")
			imagejpeg($newImg,$newFile,90);
		else
			imagejpeg($newImg,$newFile,90);

		imagedestroy($newImg);
	}
}