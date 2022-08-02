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
	 * Конструктор.
	 *
	 * @param \Content\Data\NewsDataManager $newsDM Обект за поддържане и съхранение на обекти от тип Новина.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($newsDM, $cacheService) {
		$this->newsDM = $newsDM;
		$this->cacheService = $cacheService;
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

		$searchForm = new \Content\Form\NewsForm();

		$registerList = ["" => 'GL_CHOICE_ALL_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());

		$searchForm->get('registerId')->setValueOptions($registerList);
		$searchForm->setData($this->params()->fromQuery());

		$searchForm->get('registerId')->setLabelAttributes(['class' => '']);
		$searchForm->get('title')->setLabelAttributes(['class' => '']);

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'loadShortDescription' => true
		];

		$languageId = $this->language()->getDefaultId();

		$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params + $this->params()->fromQuery());

		return new ViewModel([
			'params'		=> $this->params(),
			'newsList'		=> $newsList,
			'registerList'	=> $registerList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount),
			'lang'			=> $this->params()->fromRoute('lang'),
			'searchForm'	=> $searchForm,
			'config'		=> $config
		]);
	}


	/**
	 * Извлича списък с новини при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getNewsList() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
		];

		$languageId = $this->language()->getDefaultId();

		$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params + $this->params()->fromQuery());

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'params'		=> $this->params(),
			'newsList'		=> $newsList,
			'registerList'	=> $registerList,
			'lang'			=> $this->params()->fromRoute('lang'),
			'config'		=> $config
		]);

		$result->setTemplate('content/news/news-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на новина".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addNewsAction() {

		$newsForm = new \Content\Form\NewsForm();
		$request = $this->getRequest();
		$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());

		$newsForm->get('registerId')->setValueOptions($registerList);

		$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));
		$imageArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('images', []));

		$newsForm->get('files')->setValueOptions($fileArr);
		$newsForm->get('images')->setValueOptions($imageArr);

		if ($request->isPost()) {
			$newsForm->setData($request->getPost());

			if ($newsForm->isValid()) {

				$newsData = $newsForm->getData();
				$newsData->setFiles($fileArr);

				if ($this->newsDM->addNews($newsData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_news', ['lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		$config = $this->getConfig();

		return  new ViewModel([
			'type'		=> $this->params()->fromRoute('type'),
			'newsForm'	=> $newsForm,
			'params'	=> $this->params(),
			'lang'		=> $this->params()->fromRoute('lang'),
			'fileArr' 	=> $fileArr,
			'imageArr'	=> $imageArr,
			'config' 	=> $config
		]);
	}


	/**
	 * Функционалност "Редактиране на новина".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editNewsAction() {

		$newsForm = new \Content\Form\NewsForm();

		$newsId = $this->params()->fromRoute('newsId');

		$languageId = $this->language()->getDefaultId();

		if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, ['idList' => [$newsId], 'loadShortDescription' => true, 'loadDescription' => true])->current()) {

			$newsObj->setNewsTime(date('H:i', strtotime($newsObj->getNewsDate())));

			$newsObj->setNewsDate(date('d.m.Y', strtotime($newsObj->getNewsDate())));


			if ($newsObj->getExpirationDate()) {
				$newsObj->setExpirationTime(date('H:i', strtotime($newsObj->getExpirationDate())));
				$newsObj->setExpirationDate(date('d.m.Y', strtotime($newsObj->getExpirationDate())));
			}

			$newsFiles = $this->newsDM->getNewsFiles($newsObj->getNewsId());
			$newsForm->get('deletedFiles')->setValueOptions($this->params()->fromPost('deletedFiles', []));

			$newsForm->bind($newsObj);

			$request = $this->getRequest();
			$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());

			$newsForm->get('registerId')->setValueOptions($registerList);

			$fileArr = [];
			$imageArr = [];
			$deletedFiles = [];
			$deletedImages = [];

			if ($request->isPost()) {

				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));
				$imageArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('images', []));

				$newsForm->get('files')->setValueOptions($fileArr);
				$newsForm->get('images')->setValueOptions($imageArr);

				$deletedFiles = $this->params()->fromPost('deletedFiles', []);
				$deletedFiles = array_combine($deletedFiles, $deletedFiles);
				$newsForm->get('deletedFiles')->setValueOptions($deletedFiles);
				$newsForm->get('deletedFiles')->setValue([$deletedFiles]);

				$deletedImages = $this->params()->fromPost('deletedImages', []);
				$deletedImages = array_combine($deletedImages, $deletedImages);
				$newsForm->get('deletedImages')->setValueOptions($deletedImages);
				$newsForm->get('deletedImages')->setValue([$deletedImages]);

				$newsForm->setData($request->getPost());

				if ($newsForm->isValid()) {
					$newsData = $newsForm->getData();

					$newsData->setFiles($fileArr);

					$newsData->setIsHotNews($this->params()->fromPost('isHotNews', false));

					if ($this->newsDM->updateNewsById($newsId, $newsData)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_news', ['newsId' => $newsId, 'lang' => $this->params()->fromRoute('lang')]);
					}
				}
			}

			$newsObj->setFiles($newsFiles);

			$config = $this->getConfig();

			$isDeleteOriginalImage = false;

			if ($deletedImages && $newsObj->getFileName()) {
				if (in_array($newsObj->getNewsId().'_'.$newsObj->getFileName(), $deletedImages))
					$isDeleteOriginalImage = true;
			}

			return  new ViewModel([
				'type'			=> $this->params()->fromRoute('type'),
				'newsForm'		=> $newsForm,
				'params'		=> $this->params(),
				'lang'			=> $this->params()->fromRoute('lang'),
				'fileArr' 		=> $fileArr,
				'newsObj'		=> $newsObj,
				'deletedFiles' 	=> $deletedFiles,
				'isDeleteOriginalImage'	=> $isDeleteOriginalImage,
				'imageArr'		=> $imageArr,
				'config' 		=> $config
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл с изображение към новина".
	 */
	public function loadNewsImageAction() {

		$config = $this->getConfig();
		$newsId = $this->params()->fromRoute('newsId');

		$languageId = $this->language()->getDefaultId();

		if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, ['idList' => [$newsId]])->current()) {
			if ($stream = $this->newsDM->getNewsImage($newsId))
				return  \Document\Service\DocumentService::getImageFromDatabase($newsObj, $stream);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
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
			if ($fileContent = $this->newsDM->getFileContent($fileObj->getDocId()))
				return \Document\Service\DocumentService::getFileFromDatabase($fileObj, $fileContent);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Промяна на статус на новина".
	 *
	 * @return Response HTTP отговор.
	 */
	public function changeNewsStatusAction() {

		$lang = $this->params()->fromRoute('lang');

		$newsId = $this->params()->fromRoute('newsId');

		$params = [
			'idList' => [$newsId],
			'total_count' => false
		];

		$languageId = $this->language()->getDefaultId();

		if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, $params)->current()) {

			// Смяна на статус
			$newStatus = !$newsObj->getStatus();

			if ($this->newsDM->changeNewsStatus($newsId, $newStatus)) {

				$flashMessage = $newStatus ? 'GL_PUBLIC_OK_I' : 'GL_PUBLIC_CANCEL_OK_I';
				$this->flashMessenger()->addSuccessMessage($flashMessage);
				return $this->redirect()->toRoute('news_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Списък с новини за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function newsListTranslateAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getNewsTranslateList();
		}

		$config = $this->getConfig();
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$page = $this->params()->fromQuery('page', 1);

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
		];

		$languageId = $this->language()->getId();

		$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		return new ViewModel([
			'newsList' 			=> $newsList,
			'registerList' 		=> $registerList,
			'totalCount' 		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount) ?: 1,
			'lang' 				=> $this->params()->fromRoute('lang'),
			'params' 			=> $this->params(),
			'config'			=> $config
		]);
	}


	/**
	 * Извлича списък с новини за превод при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getNewsTranslateList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true
		];

		$languageId = $this->language()->getId();

		$newsList = $this->newsDM->getNewsList($totalCount, $languageId, $params);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'newsList' 			=> $newsList,
			'registerList' 		=> $registerList,
			'lang' 				=> $this->params()->fromRoute('lang'),
			'params' 			=> $this->params(),
			'config'			=> $config
		));

		$result->setTemplate('content/news/news-list-translate-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Превод на новина".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function newsTranslateAction() {

		$config = $this->getConfig();

		$newsForm = new \Content\Form\NewsForm();

		$params = $this->params();

		$request = $this->getRequest();

		$newsId = $this->params()->fromRoute('newsId', 0);

		$lang = $this->params()->fromRoute('lang');

		$paramArr = [
			'idList' 				=> [$newsId],
			'loadSeparateValueI18n'	=> true,
			'loadShortDescription' 	=> true,
			'loadDescription' 		=> true
		];

		$languageId = $this->language()->getId();

		if ($newsObj = $this->newsDM->getNewsList($totalCount, $languageId, $paramArr)->current()) {


			$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());
			$newsForm->get('registerId')->setValueOptions($registerList);

			$newsForm->getInputFilter()->get('registerId')->setRequired(false);
			$newsForm->get('registerId')->setLabelAttributes(['class' => '']);
			$newsForm->get('registerId')->setAttribute('disabled', true);

			$newsForm->getInputFilter()->get('title')->setRequired(false);
			$newsForm->get('title')->setLabelAttributes(['class' => '']);
			$newsForm->get('title')->setAttribute('disabled', true);

			$newsForm->get('shortDescription')->setAttribute('disabled', true);

			$newsForm->getInputFilter()->get('description')->setRequired(false);
			$newsForm->get('description')->setLabelAttributes(['class' => '']);
			$newsForm->get('description')->setAttributes(['class' => 'form-control']);
			$newsForm->get('description')->setAttribute('disabled', true);

			$newsForm->getInputFilter()->get('newsDate')->setRequired(false);
			$newsForm->getInputFilter()->get('newsTime')->setRequired(false);

			if ($request->isPost()) {

				$newsForm->setData($request->getPost());

				$newsForm->get('registerId')->setValue($newsObj->getRegisterId());
				$newsForm->get('title')->setValue($newsObj->getTitle());
				$newsForm->get('shortDescription')->setValue($newsObj->getShortDescription());
				$newsForm->get('description')->setValue($newsObj->getDescription());

				if ($newsForm->isValid()) {

					$postData = $newsForm->getData();

					$postData->setNewsId($newsObj->getNewsId());

					// Обновяване на превод
					if (!empty($newsObj->getIsTranslated())) {

						if ($this->newsDM->updateNewsI18n($postData, $languageId)) {

							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('news_translate', ['newsId' => $newsId, 'lang' => $params->fromRoute('lang')]);
						}
					}

					// Добавяне на нов превод
					else {

						if ($this->newsDM->addNewsI18n($postData, $languageId)) {
							$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
							return $this->redirect()->toRoute('news_translate', ['newsId' => $newsId, 'lang' => $params->fromRoute('lang')]);
						}
					}

					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
					return $this->redirect()->toRoute('news_translate', ['newsId' => $newsId, 'lang' => $params->fromRoute('lang')]);
				}
			}

			else {
				$newsForm->bind($newsObj);
			}

			return new ViewModel([
				'newsForm' 	=> $newsForm,
				'newsId' 	=> $newsId,
				'params' 	=> $params,
				'newsDate'	=> $newsObj->getNewsDate()
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}
