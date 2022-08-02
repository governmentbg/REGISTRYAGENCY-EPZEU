<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Nomenclature\Form\ServiceSearchForm;

/**
 * Контролер реализиращ функционалности за работа с видео уроци.
 *
 * @package Content
 * @subpackage Controller
 */
class VideoLessonController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на обекти от тип Видео урок.
	 *
	 * @var \Content\Data\VideoLessonDataManager
	 */
	protected $videoLessonDM;


	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\VideoLessonDataManager $videoLessonDM Обект за поддържане и съхранение на обекти от тип Видео урок.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($videoLessonDM, $cacheService) {
		$this->videoLessonDM = $videoLessonDM;
		$this->cacheService = $cacheService;
	}


	/**
	 * Функционалност "Списък с видео уроци".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function videoLessonListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getVideoLessonList();
		}

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$searchForm = new ServiceSearchForm();
		$registerFormList = ["" => 'GL_CHOICE_ALL_L'] + $registerList;
		$searchForm->get('registerSelectId')->setValueOptions($registerFormList);
		$searchForm->setData($this->params()->fromQuery());

		$statusList = $this->cacheService->getVideoStatusList();

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'loadDescription' => 1,
			'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getDefaultId();

		$videoLessonList = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		return new ViewModel([
			'params' => $this->params(),
			'videoLessonList'	=> $videoLessonList,
			'registerList'		=> $registerList,
			'statusList' 		=> $statusList,
			'totalCount' 		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount),
			'config'			=> $config,
			'searchForm'		=> $searchForm
		]);
	}


	/**
	 * Извлича списък с видео уроци при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getVideoLessonList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$statusList = $this->cacheService->getVideoStatusList();

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'totalCount' => false,
			'loadDescription' => 1,
			'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getDefaultId();

		$videoLessonList = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' => $this->params(),
			'videoLessonList'	=> $videoLessonList,
			'registerList' 		=> $registerList,
			'statusList'		=> $statusList,
			'config'			=> $config
		));

		$result->setTemplate('content/video-lesson/video-lesson-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на видео урок".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addVideoLessonAction() {

		$videoLessonForm = new \Content\Form\VideoLessonForm();

		$config = $this->getConfig();

		$request = $this->getRequest();

		$params = $this->params();

		$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());
		$videoLessonForm->get('registerId')->setValueOptions($registerList);

		$fileArr = [];

		if ($request->isPost()) {

			if ($this->params()->fromPost('files')) {
				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files', [])]);
				$videoLessonForm->get('files')->setValueOptions($fileArr);
			}

			$videoLessonForm->setData($request->getPost());

			if ($videoLessonForm->isValid()) {

				$postData = $videoLessonForm->getData();
				$postData->setFiles($fileArr);

				if ($this->videoLessonDM->addVideoLesson($postData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_video_lesson', ['lang' => $params->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'videoLessonForm' 	=> $videoLessonForm,
			'params' 			=> $this->params(),
			'fileArr' 			=> $fileArr,
			'videoFileFormat' 	=> $config['EP_CMS_VIDEO_ALLOWED_FORMATS'],
			'videoFileSize' 	=> $config['EP_CMS_VIDEO_MAX_FILE_SIZE'],
		]);
	}


	/**
	 * Функционалност "Редактиране на видео урок".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editVideoLessonAction() {

		$videoLessonForm = new \Content\Form\VideoLessonForm();

		$config = $this->getConfig();

		$params = $this->params();

		$lessonId = $this->params()->fromRoute('lessonId', 0);

		$paramList = [
			'cp' 			=> 1,
			'rowCount' 		=> 1,
			'totalCount' 	=> false,
			'idList' 		=> [$lessonId],
			'loadDescription' => 1,
			'loadContentInfo' => 1
		];

		$languageId = $this->language()->getDefaultId();

		if ($baseObj = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $paramList)->current()) {

			$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());
			$videoLessonForm->get('registerId')->setValueOptions($registerList);

			$videoLessonForm->get('status')->setValueOptions(array_flip($this->cacheService->getVideoStatusList()));

			$request = $this->getRequest();

			$videoLessonForm->getInputFilter()->get('files')->setRequired(false);

			if (!empty($this->params()->fromPost('deletedFiles')) && !$this->params()->fromPost('files', null) )
				$videoLessonForm->getInputFilter()->get('files')->setRequired(true);

			$deletedFiles = $this->params()->fromPost('deletedFiles', []);
			$deletedFiles = array_combine($deletedFiles, $deletedFiles);

			$videoLessonForm->get('deletedFiles')->setValueOptions($deletedFiles);
			$videoLessonForm->get('deletedFiles')->setValue([$deletedFiles]);

			$fileArr = [];

			if ($request->isPost()) {

				if ($this->params()->fromPost('files')) {
					$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files')]);
					$videoLessonForm->get('files')->setValueOptions($fileArr);
				}

				$videoLessonForm->get('status')->setValue($baseObj->getStatus());
				$videoLessonForm->get('updatedOn')->setValue($baseObj->getUpdatedOn());

				$videoLessonForm->setData($request->getPost());

				if ($videoLessonForm->isValid()) {

					$postData = $videoLessonForm->getData();

					$postData->setLessonId($baseObj->getLessonId());
					$postData->setStatus($baseObj->getStatus());

					$postData->setFiles($fileArr);

					if ($this->videoLessonDM->updateVideoLessonById($postData)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_video_lesson', ['lessonId' => $lessonId, 'lang' => $params->fromRoute('lang')]);
					}
				}
			}

			else {

				$videoLessonForm->bind($baseObj);
			}

			return new ViewModel([
				'videoLessonForm' 		=> $videoLessonForm,
				'lessonId' 				=> $lessonId,
				'fileArr' 				=> $fileArr,
				'fileName' 				=> $baseObj->getFileName(),
				'fileSize' 				=> $baseObj->getFileSize(),
				'params' 				=> $params,
				'videoFileFormat' 		=> $config['EP_CMS_VIDEO_ALLOWED_FORMATS'],
				'videoFileSize' 		=> $config['EP_CMS_VIDEO_MAX_FILE_SIZE'],
				'baseObj' 				=> $baseObj,
				'isDeletedOriginalFile' => empty($deletedFiles) ? true : false
			]);

		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл с видео урок".
	 */
	public function videoLessonFileDownloadAction() {

		$lessonId = $this->params()->fromRoute('lessonId');

		$lang = $this->params()->fromRoute('lang');

		$translatedFile = $this->params()->fromRoute('translatedFile', 0);

		$languageId = $this->language()->getDefaultId();

		$params = [
			'cp' 			=> 1,
			'rowCount' 		=> 1,
			'totalCount' 	=> false,
			'idList' 		=> [$lessonId],
			'loadContentInfo' => 1
		];

		// езиков файл
		if (!empty($translatedFile)) {
			$languageId = $this->language()->getId();
			$params['loadSeparateValueI18n'] = 1;
		}

		$baseObj = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params)->current();

		$config = $this->getConfig();

		if ($videoLessonContent = $this->videoLessonDM->getVideoLessonFileById($lessonId, $languageId))
			return \Document\Service\DocumentService::getFileFromDatabase($baseObj, $videoLessonContent);

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Промяна на статус на видео урок".
	 *
	 * @return Response HTTP отговор.
	 */
	public function manageVideoStatusAction() {

		$lang = $this->params()->fromRoute('lang');

		$lessonId = $this->params()->fromRoute('lessonId');

		$params = [
			'idList' => [$lessonId],
			'total_count' => false,
			'loadDescription' => 1,
			'loadContentInfo' => 1
		];

		$languageId = $this->language()->getDefaultId();

		$result = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		if ($videoLessonObj = $result->current()) {

			$statusList = $this->cacheService->getVideoStatusList();

			// Смяна на статус
			$newStatus = ($videoLessonObj->getStatus() == $statusList['GL_F_STATE_PUBLIC_L'] ? $statusList['GL_F_STATE_NO_PUBLIC_L'] : $statusList['GL_F_STATE_PUBLIC_L']);
			$videoLessonObj->setStatus($newStatus);

			$videoLessonObj->setFiles(null);

			if ($this->videoLessonDM->updateVideoLessonById($videoLessonObj)) {

				$flashMessage = $statusList['GL_F_STATE_PUBLIC_L'] == $newStatus ? 'GL_PUBLIC_OK_I' : 'GL_PUBLIC_CANCEL_OK_I';
				$this->flashMessenger()->addSuccessMessage($flashMessage);
				return $this->redirect()->toRoute('video_lesson_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Списък с видео уроци за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function videoLessonListTranslateAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getVideoLessonTranslateList();
		}

		$config = $this->getConfig();
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$page = $this->params()->fromQuery('page', 1);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$searchForm = new ServiceSearchForm();
		$registerFormList = ["" => 'GL_CHOICE_ALL_L'] + $registerList;
		$searchForm->get('registerSelectId')->setValueOptions($registerFormList);
		$searchForm->setData($this->params()->fromQuery());


		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
			'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getId();

		$videoLessonList = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		return new ViewModel([
			'videoLessonList' 	=> $videoLessonList,
			'registerList' 		=> $registerList,
			'totalCount' 		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount) ?: 1,
			'lang' 				=> $this->params()->fromRoute('lang'),
			'params' 			=> $this->params(),
			'config'			=> $config,
			'searchForm'		=> $searchForm
		]);
	}


	/**
	 * Извлича списък с видео уроци за превод при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getVideoLessonTranslateList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
			'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getId();

		$videoLessonList = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'videoLessonList' 	=> $videoLessonList,
			'registerList' 		=> $registerList,
			'lang' 				=> $this->params()->fromRoute('lang'),
			'params' 			=> $this->params(),
			'config'			=> $config
		));

		$result->setTemplate('content/video-lesson/video-lesson-list-translate-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Превод на видео урок".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function videoLessonTranslateAction() {

		$config = $this->getConfig();

		$videoLessonForm = new \Content\Form\VideoLessonForm();

		$params = $this->params();

		$request = $this->getRequest();

		$lessonId = $this->params()->fromRoute('lessonId', 0);

		$lang = $this->params()->fromRoute('lang');

		$languageId = $this->language()->getId();

		$paramArr = [
			'idList' 				=> [$lessonId],
			'loadSeparateValueI18n'	=> 1,
			'loadDescription'		=> 1,
			'loadContentInfo' 		=> 1
		];

		if ($videoLessonObj = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $paramArr)->current()) {

			$videoLessonForm->getInputFilter()->get('registerId')->setRequired(false);

			$videoLessonForm->getInputFilter()->get('title')->setRequired(false);
			$videoLessonForm->get('title')->setLabelAttributes(['class' => '']);
			$videoLessonForm->get('title')->setAttribute('disabled', true);

			$videoLessonForm->getInputFilter()->get('description')->setRequired(false);
			$videoLessonForm->get('description')->setLabelAttributes(['class' => '']);
			$videoLessonForm->get('description')->setAttributes(['class' => 'form-control']);
			$videoLessonForm->get('description')->setAttribute('disabled', true);

			$videoLessonForm->getInputFilter()->get('files')->setRequired(false);
			$videoLessonForm->get('files')->setLabelAttributes(['class' => '']);

			$deletedFiles = $this->params()->fromPost('deletedFiles', []);
			$deletedFiles = array_combine($deletedFiles, $deletedFiles);

			$videoLessonForm->get('deletedFiles')->setValueOptions($deletedFiles);
			$videoLessonForm->get('deletedFiles')->setValue([$deletedFiles]);

			$fileArr = [];

			$videoLessonForm->get('files')->setValueOptions($fileArr);

			if ($request->isPost()) {

				$videoLessonForm->setData($request->getPost());

				$videoLessonForm->get('title')->setValue($videoLessonObj->getTitle());
				$videoLessonForm->get('description')->setValue($videoLessonObj->getDescription());

				if ($videoLessonForm->isValid()) {

					$postData = $videoLessonForm->getData();

					if ($this->params()->fromPost('files')) {
						$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files')]);
						$postData->setFiles($fileArr);
					}

					$postData->setLessonId($videoLessonObj->getLessonId());

					// Обновяване на превод
					if (!empty($videoLessonObj->getIsTranslated())) {

						if ($this->videoLessonDM->updateVideoLessonI18n($postData, $languageId)) {
							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('video_lesson_translate', ['lessonId' => $lessonId, 'lang' => $params->fromRoute('lang')]);
						}
					}

					// Добавяне на нов превод
					else {

						if ($this->videoLessonDM->addVideoLessonI18n($postData, $languageId)) {
							$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
							return $this->redirect()->toRoute('video_lesson_translate', ['lessonId' => $lessonId, 'lang' => $params->fromRoute('lang')]);
						}
					}

					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
					return $this->redirect()->toRoute('video_lesson_translate', ['lessonId' => $lessonId, 'lang' => $params->fromRoute('lang')]);
				}
			}

			else {
				$videoLessonForm->bind($videoLessonObj);
			}

			$videoFileConfig = \Document\Controller\DocumentController::getFileConfigParams($config['EP_CMS_VIDEO_ALLOWED_FORMATS']);
			$videoFileList = array_keys($videoFileConfig);
			$videoFileList = implode(', ', $videoFileList);

			return new ViewModel([
				'videoLessonForm' 		=> $videoLessonForm,
				'lessonId' 				=> $lessonId,
				'params' 				=> $params,
				'fileArr' 				=> $fileArr,
				'fileName' 				=> $videoLessonObj->getFileNameI18n(),
				'fileSize' 				=> $videoLessonObj->getFileSizeI18n(),
				'deletedFiles' 			=> $deletedFiles,
				'videoFileFormat' 		=> $videoFileList,
				'videoFileSize' 		=> $config['EP_CMS_VIDEO_MAX_FILE_SIZE'],
				'baseObj' 				=> $videoLessonObj,
				'isDeletedOriginalFile' => empty($deletedFiles) && !empty($videoLessonObj->getIsTranslated()) && empty($fileArr) && !empty($videoLessonObj->getFileNameI18n()) ? true : false
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}
