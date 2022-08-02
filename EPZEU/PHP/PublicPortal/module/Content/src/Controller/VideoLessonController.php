<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

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
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;

	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\VideoLessonDataManager $videoLessonDM Обект за поддържане и съхранение на обекти от тип Видео урок.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 */
	public function __construct($videoLessonDM, $cacheService, $userService) {
		$this->videoLessonDM = $videoLessonDM;
		$this->cacheService = $cacheService;
		$this->userService = $userService;
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

		$registerType = $this->params()->fromRoute('registerType', 0);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getVideoLessonList();
		}

		$registerList = array_flip($this->cacheService->getRegisterList());
		$selectedRegisterId = array_search(strtoupper($registerType), $registerList);

		$languageId = $this->language()->getId();

		if (!$videoLessonList = $this->cacheService->getResultsetFromCache('videoLessonList-'.$page.'-'.$languageId.'-'.$selectedRegisterId)) {

			$params = [
				'cp' 					=> $page,
				'rowCount' 				=> $rowCount,
				'registerId' 			=> $selectedRegisterId,
				'loadDescription' 		=> 1,
				'loadSeparateValueI18n'	=> 0,
				'status' 				=> 1
			];

			$resultset = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

			$videoLessonList = [];

			foreach ($resultset as $result)
				$videoLessonList[] = $result;

			$videoLessonList['totalCount'] = $totalCount;
			$this->cacheService->addResultsetToCache('videoLessonList-'.$page.'-'.$languageId.'-'.$selectedRegisterId, $videoLessonList);
		}

		$totalCount = $videoLessonList['totalCount'];
		unset($videoLessonList['totalCount']);

		return new ViewModel([
			'videoLessonList' 	=> $videoLessonList,
			'registerType' 		=> $registerType,
			'totalCount' 		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount)
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

		$registerType = $this->params()->fromRoute('registerType', 0);

		$registerList = array_flip($this->cacheService->getRegisterList());
		$selectedRegisterId = array_search(strtoupper($registerType), $registerList);

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'registerId' 			=> $selectedRegisterId,
			'loadDescription' 		=> 1,
			'loadSeparateValueI18n'	=> 0,
			'status' 				=> 1
		];

		$languageId = $this->language()->getId();

		$videoLessonList = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'videoLessonList' 	=> $videoLessonList,
			'registerType' 		=> $registerType
		));

		$result->setTemplate('content/video-lesson/video-lesson-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Преглед на видео урок".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewVideoLessonAction() {

		$lessonId = $this->params()->fromRoute('lessonId', 0);

		$params = [
			'totalCount' 			=> false,
			'idList' 				=> [$lessonId],
			'loadDescription' 		=> 1,
			'loadContentInfo' 		=> 1,
			'loadSeparateValueI18n'	=> 0,
			'status' 				=> 1
		];


		if ($this->userService->isAllowed('preview_video_lesson'))
			$params['status'] = null;

		$languageId = $this->language()->getId();

		if ($baseObj = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params)->current()) {

			$registerList = $this->cacheService->getRegisterList();
			$registerType = array_search($baseObj->getRegisterId(), $registerList);

			return new ViewModel([
				'baseObj' 		=> $baseObj,
				'registerType' 	=> $registerType,
				'params' 		=> $this->params()
			]);
		}

		$response = $this->getResponse();
		//$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл с видео урок".
	 *
	 * @return Response HTTP отговор.
	 */
	public function loadVideoLessonFileAction() {

		$lessonId = $this->params()->fromRoute('lessonId', 0);

		$languageId = $this->language()->getId();

		$params = [
				'totalCount' 	=> false,
				'idList' 		=> [$lessonId],
				'loadContentInfo' => 1,
				'loadSeparateValueI18n'	=> 0,
				'status' => 1
		];

		if ($this->userService->isAllowed('preview_video_lesson'))
			$params['status'] = null;

		if ($videoLessonObj = $this->videoLessonDM->getVideoLessonList($totalCount, $languageId, $params)->current()) {

			if ($isCached = \Document\Service\DocumentService::isFileCached($videoLessonObj->getLessonId(), strtotime($videoLessonObj->getUpdatedOn())))
				return $isCached;

			if ($fileContent = $this->videoLessonDM->getVideoLessonFileById($lessonId, $languageId))
				return \Document\Service\DocumentService::getFileFromDatabase($videoLessonObj, $fileContent, $videoLessonObj->getLessonId(), true);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}