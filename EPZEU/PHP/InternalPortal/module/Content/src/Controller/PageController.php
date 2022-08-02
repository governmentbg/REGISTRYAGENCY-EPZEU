<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа със страници.
 *
 * @package Content
 * @subpackage Controller
 */
class PageController extends AbstractActionController {


	/**
	 *
	 * @var int
	 */
	const REDEFINED_PAGE =  0;


	/**
	 *
	 * @var int
	 */
	const HTML_PAGE = 1;

	/**
	 *
	 * @var array
	 */
	const REDEFINED_PAGE_LIST = [
			'bank-accounts-cr' => 1,
			'contacts' => 2,
			'terms-of-use' => 3,
			'cookies' => 4,
			'links' => 5,
			'accessibility-policy' => 6,
			'security-policy' => 7,
			'privacy-policy' => 8,
			'bank-accounts-pr' => 9,
			'404' => 10
	];

	/**
	 * Обект за поддържане и съхранение на обекти от тип Страница.
	 *
	 * @var \Content\Data\PageDataManager
	 */
	protected $pageDM;


	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страница.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($pageDM, $cacheService) {
		$this->pageDM = $pageDM;
		$this->cacheService = $cacheService;
	}


	/**
	 * Функционалност "Списък с HTML страници".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pageListAction() {

		$config = $this->getConfig();

		$type = $this->params()->fromRoute('type');

		$isRedefined = $type == self::REDEFINED_PAGE ? true : false;

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getPageList();
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
		];

		$moduleList = $this->cacheService->getModuleList();

		$pageList = $this->pageDM->getPageList($totalCount, null, $params + $this->params()->fromQuery(), $type);

		return new ViewModel([
			'params'		=> $this->params(),
			'pageList'		=> $pageList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount),
			'lang'			=> $this->params()->fromRoute('lang'),
			'moduleList'	=> $moduleList,
			'isRedefined' 	=> $isRedefined,
			'config'		=> $config
		]);
	}


	/**
	 * Функционалност "Списък с HTML страници за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pageListTranslateAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$config = $this->getConfig();

		$type = $this->params()->fromRoute('type');

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getPageI18nList();
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'loadSeparateValueI18n' => true,
		];

		$moduleList = $this->cacheService->getModuleList();


		$languageId = $this->language()->getId();

		$pageList = $this->pageDM->getPageList($totalCount, $languageId, $params + $this->params()->fromQuery(), null);

		return new ViewModel([
				'params'		=> $this->params(),
				'pageList'		=> $pageList,
				'totalCount' 	=> $totalCount,
				'totalPages' 	=> ceil($totalCount/$rowCount),
				'lang'			=> $this->params()->fromRoute('lang'),
				'moduleList'	=> $moduleList,
				'config'		=> $config
		]);
	}


	/**
	 * Функционалност "Превод на HTML страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pageTranslateAction() {

		$config = $this->getConfig();

		$pageId = $this->params()->fromRoute('pageId');

		$languageId = $this->language()->getId();

		$params = [
				'idList' => [$pageId],
				'totalCount' => false,
				'loadSeparateValueI18n' => true,
				'loadContent'	=> true
		];

		$pageForm = new \Content\Form\HtmlPageForm();
		$pageForm->get('moduleId')->setAttribute('disabled', true);
		$pageForm->get('title')->setAttribute('disabled', true);
		$pageForm->getInputFilter()->get('moduleId')->setRequired(false);
		$pageForm->getInputFilter()->get('title')->setRequired(false);
		$pageForm->getInputFilter()->get('content')->setRequired(false);

		$moduleList = $this->cacheService->getModuleList();
		$pageForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $moduleList);

		$pageObj = $this->pageDM->getPageList($totalCount, $languageId, $params, null)->current();

		$pageForm->bind($pageObj);

		$request = $this->getRequest();

		if ($request->isPost()) {

			$pageForm->setData($request->getPost());

			if ($pageForm->isValid()) {

					// Обновяване на превод
				if ($pageObj->getIsTranslated()) {
					if ($this->pageDM->updatePageI18n($pageForm->getData(), $languageId)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('html_page_translate', ['pageId' => $pageId,  'lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
					}
				}

				// Добавяне на нов превод
				else {
					if ($this->pageDM->addPageI18n($pageForm->getData(), $languageId)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('html_page_translate', ['pageId' => $pageId,  'lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
					}
				}


			}
		}

		return new ViewModel([
			'params'		=> $this->params(),
			'pageForm'		=> $pageForm,
			'pageObj'		=> $pageObj
		]);
	}


	/**
	 * Извлича списък с HTML страници при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getPageList() {

		$type = $this->params()->fromRoute('type');

		$isRedefined = $type == self::REDEFINED_PAGE ? true : false;

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		$moduleList = $this->cacheService->getModuleList();

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
		];

		$pageList = $this->pageDM->getPageList($totalCount, null, $params + $this->params()->fromQuery(), $type);

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'params'		=> $this->params(),
			'pageList'		=> $pageList,
			'lang'			=> $this->params()->fromRoute('lang'),
			'moduleList'	=> $moduleList,
			'type'			=> $type,
			'isRedefined' 	=> $isRedefined,
			'config'		=> $config
		]);

		$result->setTemplate('content/page/page-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на HTML страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addHtmlPageAction() {

		$pageForm = new \Content\Form\HtmlPageForm();

		$moduleList = $this->cacheService->getModuleList();
		$pageForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_L'] + $moduleList);

		$request = $this->getRequest();

		if ($request->isPost()) {

			$pageForm->setData($request->getPost());

			if ($pageForm->isValid()) {

				if ($this->pageDM->addHtmlPage($pageForm->getData())) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_html_page', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
				}
			}
		}

		return new ViewModel([
			'params'		=> $this->params(),
			'pageForm'		=> $pageForm,
		]);
	}


	/**
	 * Функционалност "Редактиране на HTML страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editHtmlPageAction() {

		$config = $this->getConfig();

		$pageId = $this->params()->fromRoute('pageId');

		$params = [
			'idList' 		=> [$pageId],
			'totalCount' 	=> false,
			'loadContent'	=> true
		];

		$pageForm = new \Content\Form\HtmlPageForm();

		$moduleList = $this->cacheService->getModuleList();
		$pageForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_L'] + $moduleList);

		$pageObj = $this->pageDM->getPageList($totalCount, null, $params, null)->current();

		$isRedefined = $pageObj->getType() == self::REDEFINED_PAGE ? true : false;

		$pageForm->bind($pageObj);

		if ($isRedefined)
			$pageForm->get('moduleId')->setAttribute('disabled', true);

		$request = $this->getRequest();

		if ($request->isPost()) {

			if ($isRedefined)
				$request->getPost()->set('moduleId', $pageObj->getModuleId());

			$pageForm->setData($request->getPost());

			if ($pageForm->isValid()) {

				if ($this->pageDM->updateHTMLPageById($pageId, $pageForm->getData())) {
					$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');

					$pageRoute = $isRedefined ? 'edit_redefined_page' : 'edit_html_page';
					return $this->redirect()->toRoute($pageRoute, ['pageId' => $pageId,  'lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
				}
			}
		}

		return new ViewModel([
				'params'		=> $this->params(),
				'pageForm'		=> $pageForm,
				'pageObj'		=> $pageObj,
				'isRedefined'	=> $isRedefined
		]);
	}


	/**
	 * Функционалност "Промяна на статус на HTML страница".
	 *
	 * @return Response HTTP отговор.
	 */
	public function changePageStatusAction() {

		$pageId = $this->params()->fromRoute('pageId');

		$params = [
			'idList' 		=> [$pageId],
			'totalCount'	=> false,
		];

		$pageObj = $this->pageDM->getPageList($totalCount, null, $params, null)->current();

		if ($pageObj && $pageObj->getType() == self::HTML_PAGE) {

			$newStatus = !$pageObj->getStatus();

			if ($this->pageDM->changePageStatus($pageId, $newStatus)) {

				$flashMessage = $newStatus ? 'GL_PUBLIC_OK_I' : 'GL_PUBLIC_CANCEL_OK_I';
				$this->flashMessenger()->addSuccessMessage($flashMessage);
				return $this->redirect()->toRoute('html_page_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Избор на страница в HTML редактор".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function ckPageLinkAction() {

		$params = [
			'cp' 			=> 1,
			'rowCount' 		=> \Application\Module::APP_MAX_INT,
			'totalCount'	=> false,
			'status'		=> 1
		];

		$pageList = $this->pageDM->getPageList($totalCount, null, $params + $this->params()->fromQuery(), null);

		$this->layout('layout/layout-no-header');

		return new ViewModel([
			'pageList'	=> $pageList,
		]);
	}


	/**
	 * Извлича списък с HTML страници за превод при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getPageI18nList() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		$moduleList = $this->cacheService->getModuleList();

		$params = [
				'cp' => $page,
				'rowCount' => $rowCount,
				'loadSeparateValueI18n' => true,
		];

		$languageId = $this->language()->getId();

		$pageList = $this->pageDM->getPageList($totalCount, $languageId, $params + $this->params()->fromQuery(), null);

		$this->layout('layout/ajax');

		$result = new ViewModel([
				'params'		=> $this->params(),
				'pageList'		=> $pageList,
				'lang'			=> $this->params()->fromRoute('lang'),
				'moduleList'	=> $moduleList,
				'config'		=> $config
		]);

		$result->setTemplate('content/page/page-list-translate-partial.phtml');

		return $result;
	}
}
