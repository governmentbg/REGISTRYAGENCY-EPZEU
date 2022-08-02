<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа с новини.
 *
 * @package Content
 * @subpackage Controller
 */
class NewsController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на обекти от тип Новина.
	 *
	 * @var \Content\Data\NewsDataManager
	 */
	protected $newsDM;


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
	 * @param \Content\Data\NewsDataManager $newsDM Обект за поддържане и съхранение на обекти от тип Новина.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 */
	public function __construct($newsDM, $cacheService, $userService) {
		$this->newsDM = $newsDM;
		$this->cacheService = $cacheService;
		$this->userService = $userService;
	}


	/**
	 * Функционалност "Списък с новини".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function newsListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getNewsList();
		}

		$languageId = $this->language()->getId();

		if (!$hotNewsList = $this->cacheService->getResultsetFromCache('hotNewsListFirstPage-'.$languageId)) {
			// Горещи новини
			$paramsNews = [
					'loadDescription'		=> false,
					'loadShortDescription' 	=> 1,
					'loadSeparateValueI18n'	=> 0,
					'isActive' 				=> 1,
					'status' 				=> 1,
					'isHotNews'				=> 1,
					'totalCount'			=> false
			];

			$resultset = $this->newsDM->getNewsList($totalCount, $languageId, $paramsNews);

			$hotNewsList = [];

			foreach ($resultset as $result)
				$hotNewsList[] = $result;

			$this->cacheService->addResultsetToCache('hotNewsListFirstPage-'.$languageId, $hotNewsList);
		}


		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'loadShortDescription' 	=> 1,
			'loadSeparateValueI18n'	=> 0,
			'isActive' 				=> 1,
			'status' 				=> 1
		];

		if ($page != 1)
			$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params + ['isHotNews' => 0]);
		else {

			if (!$newsList = $this->cacheService->getResultsetFromCache('newsList-'.$page.'-'.$languageId)) {

				$resultset = $this->newsDM->getNewsList($totalCount, $languageId, $params + ['isHotNews' => 0]);

				$newsList = [];

				foreach ($resultset as $result)
					$newsList[] = $result;

				$newsList['totalCount'] = $totalCount;
				$this->cacheService->addResultsetToCache('newsList-'.$page.'-'.$languageId, $newsList);
				unset($newsList['totalCount']);
			}

			else {
				$totalCount = $newsList['totalCount'];
				unset($newsList['totalCount']);
			}

		}



		$registerList = array_flip($this->cacheService->getRegisterList());

		return new ViewModel([
			'newsList' => $newsList,
			'hotNewsList' => $hotNewsList,
			'registerList' => $registerList,
			'totalCount' => $totalCount,
			'totalPages' => ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък с новини при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getNewsList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'loadShortDescription' 	=> 1,
			'loadSeparateValueI18n'	=> 0,
			'isHotNews'				=> 0,
			'isActive'				=> 1,
			'status' 				=> 1
		];

		$languageId = $this->language()->getId();

		$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params);

		$registerList = array_flip($this->cacheService->getRegisterList());

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'newsList' => $newsList,
			'registerList' => $registerList
		));

		$result->setTemplate('content/news/news-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Преглед на новина".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewNewsAction() {

		$newsId = $this->params()->fromRoute('newsId', 0);

		$registerList = array_flip($this->cacheService->getRegisterList());

		$params = [
			'idList' 				=> [$newsId],
			'loadShortDescription' 	=> 1,
			'loadDescription' 		=> 1,
			'loadSeparateValueI18n'	=> 0,
			'isActive'				=> 1,
			'status' 				=> 1
		];

		if ($this->userService->isAllowed('preview_news')) {
			$params['status'] = null;
			$params['isActive'] = null;
		}


		$languageId = $this->language()->getId();

		if ($baseObj = $this->newsDM->getNewsList($totalCount, $languageId, $params)->current()) {

			$newsFiles = $this->newsDM->getNewsFiles($baseObj->getNewsId());

			$baseObj->setFiles($newsFiles);

			return new ViewModel([
				'baseObj' => $baseObj,
				'registerList' => $registerList
			]);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл с изображение към новина".
	 */
	public function loadNewsImageAction() {

		$languageId = $this->language()->getDefaultId();

		$newsId = $this->params()->fromRoute('newsId');

		$timestamp = $this->params()->fromRoute('timestamp');

		if ($result = \Document\Service\DocumentService::isFileCached($newsId, $timestamp))
			return $result;

		if ($newsId <= \Application\Module::APP_MAX_INT) {

			$params = [
				'idList' 	=> [$newsId],
				'status' 	=> 1,
				'isActive' 	=> 1
			];

			if ($this->userService->isAllowed('preview_news')) {
				$params['status'] = null;
				$params['isActive'] = null;
			}

			if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, ['idList' => [$newsId]])->current()) {

				if ($stream = $this->newsDM->getNewsImage($newsId))
					return  \Document\Service\DocumentService::getImageFromDatabase($newsObj, $stream);
			}
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл прикачен към новина".
	 */
	public function loadNewsDocumentAction() {

		$config = $this->getConfig();

		$fileId = $this->params()->fromRoute('fileId');

		if ($fileObj = $this->newsDM->getNewsFiles(null, [$fileId])->current()) {

			$languageId = $this->language()->getId();

			$params = ['idList' => [$fileObj->getNewsid()], 'status' => 1, 'isActive' => 1];

			if ($this->userService->isAllowed('preview_news')) {
				$params['status'] = null;
				$params['isActive'] = null;
			}

			if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, $params)->current()) {

				$etag = md5($fileObj->getDocId());

				if ($result = \Document\Service\DocumentService::isFileCached($etag, strtotime($fileObj->getUpdatedOn())))
					return $result;

				if ($fileContent = $this->newsDM->getFileContent($fileObj->getDocId()))
					return \Document\Service\DocumentService::getFileFromDatabase($fileObj, $fileContent, $fileId);
			}
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();

	}
}