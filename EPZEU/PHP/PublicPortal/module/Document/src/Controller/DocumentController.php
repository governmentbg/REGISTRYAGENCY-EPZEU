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

		if (!$validator->isValid($fileUuid))
			throw new \Exception('Invalid UUID '.$fileUuid);

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

		$config = $this->getConfig();

		$file = $this->params()->fromFiles('file');

		if (!$fileId = $this->params()->fromQuery('file', false)) {
			return $result = new JsonModel(array(
				"response" => "error",
			));
		}

		$request = $this->getRequest();

		if ($request->isPost() && $file) {

			$inputFilter = new InputFilter();

			$nonPrintingChars = array_map('chr', range(0,31));
			$invalidChars = ['<', '>', '?', '"', ':', '|', '\\', '/', '*', '&', '\''];
			$allInvalidChars = array_merge($nonPrintingChars, $invalidChars);

			$file['name'] = str_replace($allInvalidChars, '', $file['name']);

			$ext = pathinfo($file['name'], PATHINFO_EXTENSION);

			$fileConfigParams = self::getFileConfigParams($config['GL_DOCUMENT_ALLOWED_FORMATS']);

			$validExtensions = array_keys($fileConfigParams);

			$mimeTypeList = [];

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
							'messages' =>
								[
									'fileSizeTooBig' => str_replace(['{FILE_SIZE_IN_KB}', '{MAX_FILE_SIZE}'], [$config['GL_DOCUMENT_MAX_FILE_SIZE'].' kB', $file['size'].' kB'], $this->translator->translate('GL_DOCUMENT_MAX_FILE_SIZE_EXCEEDED_E')),
									'fileSizeTooSmall' =>  $this->translator->translate('GL_UPLOAD_FILE_E')
								]
							],
						],
						[
						'name' => 'Zend\Validator\File\Extension',
							'break_chain_on_failure' => true,
							'options' => [
								'extension' => $validExtensions,
								'messages' => [
									'fileExtensionFalse' => str_replace('{FILE_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E'))
								]
							]
						],
						[
							'name' => 'Zend\Validator\File\MimeType',
							'options' => [
								'mimeType' => $mimeTypeList,
								'message' => str_replace('{FILE_FORMATS}', implode(', ', $validExtensions), $this->translator->translate('GL_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_E')),

							]
						],
					],
				]);


			$inputFilter->setData($request->getFiles());

			if ($inputFilter->isValid()) {

				$info = pathinfo($file['name']);

				$uuid = AppService::genToken();
				$newFileName = $info['filename'].(str_replace('.', '_', uniqid('_', true))).'.'.$info['extension'];
				$fileSize = $file['size'];
				$content = file_get_contents($file['tmp_name']);
				$inalidAfter = date("Y-m-d H:i:s", time() + 86400);

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
						"response" => "error",
						"fileId" => $fileId,
						"errors" => $inputFilter->getMessages()['file'],
						"fileName" => $file['name'],
						"originName" => $file['name']
				));
			}
		}

		return $result = new JsonModel(array(
				"response" => "error",
				"fileId" => $fileId,
				"fileName" => $file['name'],
				"errors" => ''
		));
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
}