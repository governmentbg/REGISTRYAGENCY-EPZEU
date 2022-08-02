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
	const REDEFINED_PAGE = 0;


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
		'bank-account-cr' => 1,
		'contacts' => 2,
		'terms-of-use' => 3,
		'cookies' => 4,
		'links' => 5,
		'accessibility-policy' => 6,
		'security-policy' => 7,
		'privacy-policy' => 8,
		'bank-account-pr' => 9,
		'404' => 10
	];


	/**
	 *
	 * @var array
	 */
	const SEARCH_CONTENT_TYPE = [
		'news' => 1,
		'videoLesson' => 2,
		'page' => 3,
		'legislation' => 4,
		'documentTemplate' => 5
	];


	/**
	 * Тип страница: Услуги.
	 *
	 * @var int
	 */
	const PAGE_SERVICE_TYPE = 1;


	/**
	 * Тип страница: Заявления/Искания/Удостоверения.
	 *
	 * @var int
	 */
	const PAGE_APPLICATION_TYPE = 2;

	/**
	 *
	 * @var int
	 */
	const PAGE_DOCUMENT_TEMPLATES = 3;


	/**
	 *
	 * @var int
	 */
	const PAGE_LEGISLATION_TYPE = 4;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Страница.
	 *
	 * @var \Content\Data\PageDataManager
	 */
	protected $pageDM;


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
	 * Услуга за работа с RateLimit.
	 *
	 * @var \Application\Service\RateLimitService
	 */
	protected $rateLimitService;

	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страница.
	 * @param \Content\Data\NewsDataManager $newsDM Обект за поддържане и съхранение на обекти от тип Новина.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 */
	public function __construct($pageDM, $newsDM, $cacheService, $userService, $rateLimitService) {
		$this->pageDM = $pageDM;
		$this->newsDM = $newsDM;
		$this->cacheService = $cacheService;
		$this->userService = $userService;
		$this->rateLimitService = $rateLimitService;
	}


	/**
	 * Функционалност "Преглед на предефинирана страница с HTML съдържание".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function redefinedPageAction() {

		$url = $this->params()->fromRoute('url');

		$pageId = self::REDEFINED_PAGE_LIST[$url];

		$langId = $this->language()->getId();

		$params = [
			'idList' 		=> [$pageId],
			'loadContent' 	=> true,
			'total_count' 	=> false,
			'status'		=> 1
		];

		if ($this->userService->isAllowed('preview_html_page')) {
			$params['status'] = null;
			$pageObj = $this->pageDM->getPageList($totalCount, $langId, $params, self::REDEFINED_PAGE)->current();
		}

		elseif (!$pageObj = $this->cacheService->getResultsetFromCache('redefinedPage-'.$pageId.'-'.$langId)) {
			$pageObj = $this->pageDM->getPageList($totalCount, $langId, $params, self::REDEFINED_PAGE)->current();
			$this->cacheService->addResultsetToCache('redefinedPage-'.$pageId.'-'.$langId, $pageObj);
		}

		return new ViewModel([
			'pageObj' => $pageObj
		]);
	}


	/**
	 * Функционалност "Преглед на динамична страница с HTML съдържание".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function dynamicPageAction() {

		$pageId = $this->params()->fromRoute('pageId');;

		$langId = $this->language()->getId();

		$params = [
			'idList' 		=> [$pageId],
			'loadContent' 	=> true,
			'total_count' 	=> false,
			'status'		=> 1

		];

		if ($this->userService->isAllowed('preview_html_page'))
			$params['status'] = null;


		if ($pageObj = $this->pageDM->getPageList($totalCount, $langId, $params, self::HTML_PAGE)->current()) {

			return new ViewModel([
				'pageObj' => $pageObj
			]);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Начална страница на имотен регистър".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function propertyRegisterAction() {

		$langId = $this->language()->getId();

		if (!$bankAccountPr = $this->cacheService->getResultsetFromCache('bank-account-pr-'.$langId)) {

			$params = [
				'idList' 		=> [self::REDEFINED_PAGE_LIST['bank-account-pr']],
				'loadContent' 	=> true,
				'total_count' 	=> false,
			];

			$bankAccountPr = $this->pageDM->getPageList($totalCount, $langId, $params, self::REDEFINED_PAGE)->current();

			$this->cacheService->addResultsetToCache('bank-account-pr-'.$langId, $bankAccountPr);
		}

		$selectedRegisterId = array_search('PR', array_flip($this->cacheService->getRegisterList()));

		//Горещи новини
		if (!$hotNewsList = $this->cacheService->getResultsetFromCache('hotNewsListPr-'.$langId)) {
			$paramsNews = [
				'registerId' 			=> $selectedRegisterId,
				'loadShortDescription' 	=> 1,
				'loadSeparateValueI18n'	=> 0,
				'isHotNews'				=> 1,
				'isActive'				=> 1,
				'status' 				=> 1
			];

			$resultset = $this->newsDM->getNewsList($totalCount, $langId, $paramsNews);

			$hotNewsList = [];

			foreach ($resultset as $result)
				$hotNewsList[] = $result;

			$this->cacheService->addResultsetToCache('hotNewsListPr-'.$langId, $hotNewsList);
		}

		$config = $this->getConfig();


		if (!$appTypesList = $this->cacheService->getResultsetFromCache('appTypesList-'.$selectedRegisterId.'-'.$langId)) {

			$resultset = $this->pageDM->getNestedPagesFirstPage(self::PAGE_APPLICATION_TYPE, $selectedRegisterId, $config['firstPageListNumber'], $langId);

			$appTypesList = [];

			foreach ($resultset as $result)
				$appTypesList[] = $result;

			$this->cacheService->addResultsetToCache('appTypesList-'.$selectedRegisterId.'-'.$langId, $appTypesList);
		}


		if (!$serviceList = $this->cacheService->getResultsetFromCache('serviceList-'.$selectedRegisterId.'-'.$langId)) {

			$resultset = $this->pageDM->getNestedPagesFirstPage(self::PAGE_SERVICE_TYPE, $selectedRegisterId, $config['firstPageListNumber'], $langId);

			$serviceList = [];

			foreach ($resultset as $result)
				$serviceList[] = $result;

			$this->cacheService->addResultsetToCache('serviceList-'.$selectedRegisterId.'-'.$langId, $serviceList);
		}

		$reportPageList = [
			'PR_REPORT_STATUS_CHECK',
			'PR_REPORT_APPLICATIONS_TO_BE_CORRECTED',
			//'PR_UPCOMING_DEAL_CHECK',
			'PR_REPORT_SEARCHING_FOR_REGISTRY_OFFICE'
		];

		return new ViewModel([
			'bankAccountPr'		=> $bankAccountPr,
			'hotNewsList'		=> $hotNewsList,
			'appTypesList'		=> $appTypesList,
			'serviceList'		=> $serviceList,
			'reportPageList'	=> $reportPageList
		]);
	}


	/**
	 * Функционалност "Начална страница на търговски регистър".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function commercialRegisterAction() {

		$langId = $this->language()->getId();

		if (!$bankAccountCr = $this->cacheService->getResultsetFromCache('bank-account-cr-'.$langId)) {

			$params = [
				'idList' 		=> [self::REDEFINED_PAGE_LIST['bank-account-cr']],
				'loadContent' 	=> true,
				'total_count' 	=> false,
			];

			$bankAccountCr = $this->pageDM->getPageList($totalCount, $langId, $params, self::REDEFINED_PAGE)->current();

			$this->cacheService->addResultsetToCache('bank-account-cr-'.$langId, $bankAccountCr);
		}


		$selectedRegisterId = array_search('CR', array_flip($this->cacheService->getRegisterList()));

		//Горещи новини
		if (!$hotNewsList = $this->cacheService->getResultsetFromCache('hotNewsListCr-'.$langId)) {
			$paramsNews = [
				'registerId' 			=> $selectedRegisterId,
				'loadShortDescription' 	=> 1,
				'loadSeparateValueI18n'	=> 0,
				'isHotNews'				=> 1,
				'isActive'				=> 1,
				'status' 				=> 1
			];

			$resultset = $this->newsDM->getNewsList($totalCount, $langId, $paramsNews);

			$hotNewsList = [];

			foreach ($resultset as $result)
				$hotNewsList[] = $result;

			$this->cacheService->addResultsetToCache('hotNewsListCr-'.$langId, $hotNewsList);
		}



		$config = $this->getConfig();

		if (!$appTypesList = $this->cacheService->getResultsetFromCache('appTypesList-'.$selectedRegisterId.'-'.$langId)) {

			$resultset = $this->pageDM->getNestedPagesFirstPage(self::PAGE_APPLICATION_TYPE, $selectedRegisterId, $config['firstPageListNumber'], $langId);

			$appTypesList = [];

			foreach ($resultset as $result)
				$appTypesList[] = $result;

			$this->cacheService->addResultsetToCache('appTypesList-'.$selectedRegisterId.'-'.$langId, $appTypesList);
		}


		if (!$serviceList = $this->cacheService->getResultsetFromCache('serviceList-'.$selectedRegisterId.'-'.$langId)) {

			$resultset = $this->pageDM->getNestedPagesFirstPage(self::PAGE_SERVICE_TYPE, $selectedRegisterId, $config['firstPageListNumber'], $langId);

			$serviceList = [];

			foreach ($resultset as $result)
				$serviceList[] = $result;

			$this->cacheService->addResultsetToCache('serviceList-'.$selectedRegisterId.'-'.$langId, $serviceList);
		}

		$reportPageList = [
			[
				'CR_REPORT_REPORT_INDIVIDUAL_LEGAL_ENTRIES',
				'CR_REPORT_CURRENT_STATUS',
				'CR_REPORT_LIST_SAVE_COMPANIES_NAME',
				'CR_REPORT_COMPANY_RIGHTS',
				'CR_REPORT_ENTRIES_DELETIONS_ANNOUNCES',
				'CR_REPORT_RECCORDED_CIRCUMSTANCE_ACT',
				'CR_REPORT_ANNOUNCED_ACTS'
			],
			[
				'CR_REPORT_INSTRUCTIONS_FOR_NO_REG_COMPANIES',
				'CR_REPORT_DOCUMENTS_WITHOUT_BATCH',
				'CR_REPORT_INCOMING_APPLICATION_NUMBER',
				'CR_REPORT_DOCUMENTS_WITHOUT_APPOINTMENT',
				'CR_REPORT_APPOINTMENT_WITHOUT_BATCH'
			],
			[
				'CR_REPORT_STABILIZATION',
				'CR_REPORT_REPORT_INSOLVENCY',
				'CR_REPORT_REPORT_LIQUIDATION',
				'CR_NOTIFICATION_44A'
			],
			[
				'CR_REPORT_RE_REGISTER_COMPANY',
				'CR_REPORT_TRANSFORMATION_OVER_PERIOD'
			]
		];

		return new ViewModel([
			'bankAccountCr'		=> $bankAccountCr,
			'hotNewsList'		=> $hotNewsList,
			'appTypesList'		=> $appTypesList,
			'serviceList'		=> $serviceList,
			'reportPageList'	=> $reportPageList
		]);
	}


	/**
	 * Страница банкови сметки
	 *
	 * @return \Zend\View\Model\ViewModel
	 */
	public function bankAccountsAction() {

		$langId = $this->language()->getId();

		if (!$bankAccountsList = $this->cacheService->getResultsetFromCache('bankAccountsList-'.$langId)) {

			$params = [
					'idList' 		=> [self::REDEFINED_PAGE_LIST['bank-account-cr'], self::REDEFINED_PAGE_LIST['bank-account-pr']],
					'loadContent' 	=> true,
					'total_count' 	=> false,
			];

			$resultset = $this->pageDM->getPageList($totalCount, $langId, $params, self::REDEFINED_PAGE);

			$bankAccountsList = [];

			foreach ($resultset as $result)
				$bankAccountsList[] = $result;

			$this->cacheService->addResultsetToCache('bankAccountsList-'.$langId, $bankAccountsList);

		}

		$bankAccountCr = null;
		$bankAccountPr = null;

		foreach ($bankAccountsList as $pageObj)
			$pageObj->getPageId() == self::REDEFINED_PAGE_LIST['bank-account-cr'] ? $bankAccountCr = $pageObj : $bankAccountPr = $pageObj;

		return new ViewModel([
			'bankAccountCr'	=> $bankAccountCr,
			'bankAccountPr'	=> $bankAccountPr,
		]);
	}


	/**
	 * Функционалност "Контейнер за интеграция на регистри".
	 *
	 * Генерира страница с контейнер за интегриране на ТР и ИР в ЕПЗЕУ.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function integrationContainerAction() {

		return new ViewModel([

		]);
	}


	/**
	 * Функционалност "Карта на сайта".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function siteMapAction() {
	}

	/**
	 * Функционалност "Преглед на йерархична страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function nestedPageAction() {

		$registerType = strtoupper($this->params()->fromRoute('registerType'));

		$registerId = $this->cacheService->getRegisterList()[$registerType];

		$pageTypeId	= $this->params()->fromRoute('pageTypeId');

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			$groupId = $this->params()->fromPost('groupId');
			return $this->getGroupItems($groupId);
		}

		$langId = $this->language()->getId();

		$params = ['type' => $pageTypeId, 'parentId' => 0, 'registerId' => $registerId];

		if (!$registerObj = $this->cacheService->getResultsetFromCache('nestedPageObj-'.$registerId.'-'.$pageTypeId.'-'.$langId)) {
			$registerObj = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'langId' => $langId, 'parentId' => 0, 'registerId' => $registerId, 'loadContent' => true])->current();
			$this->cacheService->addResultsetToCache('nestedPageObj-'.$registerId.'-'.$pageTypeId.'-'.$langId, $registerObj);
		}

		if (!$pageList = $this->cacheService->getResultsetFromCache('nestedPageList-'.$registerId.'-'.$pageTypeId.'-'.$langId)) {
			$resultset = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'langId' => $langId, 'parentId' => $registerObj->getPageId(), 'loadContent' => true, 'registerId' => $registerId]);

			$pageList = [];

			foreach ($resultset as $result)
				$pageList[] = $result;

			$this->cacheService->addResultsetToCache('nestedPageList-'.$registerId.'-'.$pageTypeId.'-'.$langId, $pageList);
		}

		$groupArr = [];
		$itemArr  = [];

		foreach ($pageList as $pageObj) {
			if ($pageObj->getIsGroup())
				$groupArr[] = $pageObj;
			else
				$itemArr[] = $pageObj;
		}

		return new ViewModel([
			'registerType'	=> $registerType,
			'registerObj' 	=> $registerObj,
			'groupArr'		=> $groupArr,
			'itemArr'		=> $itemArr,
			'pageTypeId'	=> $pageTypeId
		]);
	}


	/**
	 * Извлича списък с елементи в група на йерархична страница.
	 *
	 * @param int $groupId Идентификатор на група.
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getGroupItems($groupId) {

		$groupId = (int)$groupId;

		$languageId = $this->language()->getId();

		$pageList = $this->pageDM->getNestedPageList(['parentId' => $groupId, 'langId' => $languageId]);

		$pageTypeId	= $this->params()->fromRoute('pageTypeId');

		$itemsPerColumn = ceil($pageList->count()/2);

		$pageListArray = [];

		foreach ($pageList as $page)
			$pageListArray[] = $page;

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'pageList' 			=> $pageListArray,
			'itemsPerColumn' 	=> $itemsPerColumn,
			'pageTypeId'		=> $pageTypeId
		]);

		$result->setTemplate('content/page/group-items-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Зареждане на файл с документ в йерархична страница".
	 *
	 * @return string Съдържание на файл.
	 */
	public function loadNestedPageDocumentAction() {

		$pageId = $this->params()->fromRoute('fileId');

		if ($nestedPageObj = $this->pageDM->getNestedPageList(['pageIdList' => [$pageId]])->current()) {

			if ($result = \Document\Service\DocumentService::isFileCached($pageId, strtotime($nestedPageObj->getUpdatedOn())))
				return $result;

			$fileTimestamp = $this->params()->fromRoute('timestamp');

			if ($fileTimestamp == strtotime($nestedPageObj->getUpdatedOn()))
				if ($fileContent = $this->pageDM->getPageFile($nestedPageObj->getPageId()))
					return \Document\Service\DocumentService::getFileFromDatabase($nestedPageObj, $fileContent, $pageId);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Търсене".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function searchListAction() {

		$request = $this->getRequest();

		$isRateLimitReached = false;

		if (isset($_SERVER['HTTP_REFERER'])) {

			$urlParams = parse_url($_SERVER['HTTP_REFERER']);

			if (isset($urlParams['query'])) {

				parse_str($urlParams['query'], $queryArr);

				if (!empty($queryArr['sKey'])) {

					if ($this->params()->fromQuery('sKey') != $queryArr['sKey']) {
						if ($userObj = $this->userService->getUser())
							$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_SEARCH_LIMIT', 'CIN:'.$userObj->getCin());
						else
							$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_SEARCH_LIMIT', 'IP:'.$_SERVER['REMOTE_ADDR']);
					}
				}
			}
			else {
				if ($userObj = $this->userService->getUser())
					$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_SEARCH_LIMIT', 'CIN:'.$userObj->getCin());
				else
					$isRateLimitReached = $this->rateLimitService->isRateLimitReached('EP_SEARCH_LIMIT', 'IP:'.$_SERVER['REMOTE_ADDR']);
			}
		}

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList') || $request->getPost('changeSearchSection'))
				return $result = $this->getSearchList($isRateLimitReached);
		}

		if ($isRateLimitReached)
			return new ViewModel(['isRateLimitReached' => $isRateLimitReached]);


		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$searchForm = new \Content\Form\SearchForm();

		$activeContentType = 0;
		$activeContentCount = 0;
		$activeContentTypeList = '';

		$searchCountArr = [];

		if ($request->isGet()) {

			$searchForm->setData($request->getQuery());

			$stringLengthValidator = new \Zend\Validator\StringLength([
				'min' 		=> $config['EP_CMS_MIN_SEARCH_LETTERS_COUNT'],
				'max' 		=> 500,
				'messages' 	=> ['stringLengthTooShort' => 'EP_CMS_MIN_SEARCH_LETTERS_COUNT_E']
			]);

			$stringLengthValidatorChain = new \Zend\Validator\ValidatorChain();
			$stringLengthValidatorChain->attach($stringLengthValidator);

			$searchForm->getInputFilter()->get('sKey')->getValidatorChain()->attach($stringLengthValidatorChain);

			if ($searchForm->isValid()) {

				$searchData = $searchForm->getData();

				$searchCountArr = $this->pageDM->getSearchCount($searchData['sKey']);

				foreach ($searchCountArr as $contentType => $contentCount) {

					if(empty($activeContentType) && !empty($contentCount)) {
						$activeContentType = $contentType;
						$activeContentCount = $contentCount;
					}
				}

				$params = [
					'cp' 			=> $page,
					'rowCount'		=> $rowCount,
					'contentType' 	=> $activeContentType
				];

				switch ($activeContentType) {

					// Новини
					case self::SEARCH_CONTENT_TYPE['news']:
						$newsList = $this->pageDM->getSearchList($this->language()->getId(), $params + $searchData);
						$registerList = array_flip($this->cacheService->getRegisterList());
						$activeContentTypeList = 'newsList';
						break;

					// Видео уроци
					case self::SEARCH_CONTENT_TYPE['videoLesson']:
						$videoLessonList = $this->pageDM->getSearchList($this->language()->getId(), $params + $searchData);
						$activeContentTypeList = 'videoLessonList';
						break;

					// Страници
					case self::SEARCH_CONTENT_TYPE['page']:
						$pageList = $this->pageDM->getSearchList($this->language()->getId(), $params + $searchData);
						$registerList = array_flip($this->cacheService->getRegisterList());
						$activeContentTypeList = 'pageList';

						$staticPageList = $this->cacheService->getStaticPageList();
						break;

					// Нормативна уредба
					// Образци на документи
					case self::SEARCH_CONTENT_TYPE['legislation']:
					case self::SEARCH_CONTENT_TYPE['documentTemplate']:
						$documentList = $this->pageDM->getSearchList($this->language()->getId(), $params + $searchData);
						$activeContentTypeList = 'documentList';
						break;
				}
			}
		}

		return new ViewModel([
			'isRateLimitReached'			=> false,
			'searchForm'					=> $searchForm,
			'activeContentType'				=> $activeContentType,
			'searchCountArr' 				=> $searchCountArr,
			$activeContentTypeList 			=> !empty($activeContentTypeList) ? ${$activeContentTypeList} : '',
			'registerList' 					=> isset($registerList) ? $registerList : [],
			'totalCount' 					=> $activeContentCount,
			'totalPages' 					=> ceil($activeContentCount/$rowCount),
			'params' 						=> $this->params(),
			'rowCount' 						=> $rowCount,
			'minSearchLettersCount'			=> $config['EP_CMS_MIN_SEARCH_LETTERS_COUNT'],
			'staticPageListCRApplication'	=> !empty($staticPageList) ? $staticPageList['CR_APPLICATIONS'] : null,
			'staticPageListPRApplication'	=> !empty($staticPageList) ? $staticPageList['PR_APPLICATIONS'] : null,
			'staticPageListCRService'		=> !empty($staticPageList) ? $staticPageList['CR_SERVICES'] : null,
			'staticPageListPRService'		=> !empty($staticPageList) ? $staticPageList['PR_SERVICES'] : null
		]);
	}

	/**
	 * Извлича списък с резултати от търсене при странициране или при промяна на типа на съдържанието.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getSearchList($isRateLimitReached) {


		if ($isRateLimitReached) {
			$result = new ViewModel(array());
			return $result->setTemplate('content/page/rate-limit-reached-ajax.phtml');
		}

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$contentType = (int)$this->params()->fromQuery('contentType');

		$searchData = $this->params()->fromQuery('sKey');

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'contentType' 	=> $contentType
		];

		switch ($contentType) {

			// Новини
			case self::SEARCH_CONTENT_TYPE['news']:

				$newsList = $this->pageDM->getSearchList($this->language()->getId(), $params + ['sKey' => $searchData]);

				$registerList = array_flip($this->cacheService->getRegisterList());

				$this->layout('layout/ajax');

				$result = new ViewModel(array(
					'newsList' 		=> $newsList,
					'registerList' 	=> $registerList
				));

				$result->setTemplate('content/news/news-list-partial.phtml');

				break;

			// Видео уроци
			case self::SEARCH_CONTENT_TYPE['videoLesson']:

				$videoLessonList = $this->pageDM->getSearchList($this->language()->getId(), $params + ['sKey' => $searchData]);

				$this->layout('layout/ajax');

				$result = new ViewModel(array(
					'videoLessonList' => $videoLessonList
				));

				$result->setTemplate('content/video-lesson/video-lesson-list-partial.phtml');

				break;

			// Страници
			case self::SEARCH_CONTENT_TYPE['page']:

				$registerList = array_flip($this->cacheService->getRegisterList());

				$pageList = $this->pageDM->getSearchList($this->language()->getId(), $params + ['sKey' => $searchData]);

				$this->layout('layout/ajax');

				$staticPageList = $this->cacheService->getStaticPageList();

				$result = new ViewModel(array(
					'pageList' 						=> $pageList,
					'registerList' 					=> $registerList,
					'staticPageListCRApplication'	=> !empty($staticPageList) ? $staticPageList['CR_APPLICATIONS'] : null,
					'staticPageListPRApplication'	=> !empty($staticPageList) ? $staticPageList['PR_APPLICATIONS'] : null,
					'staticPageListCRService'		=> !empty($staticPageList) ? $staticPageList['CR_SERVICES'] : null,
					'staticPageListPRService'		=> !empty($staticPageList) ? $staticPageList['PR_SERVICES'] : null
				));

				$result->setTemplate('content/page/search-page-list-partial.phtml');

				break;

			// Нормативна уредба
			// Образци на документи
			case self::SEARCH_CONTENT_TYPE['legislation']:
			case self::SEARCH_CONTENT_TYPE['documentTemplate']:

				$documentList = $this->pageDM->getSearchList($this->language()->getId(), $params + ['sKey' => $searchData]);

				$this->layout('layout/ajax');

				$result = new ViewModel(array(
					'documentList' => $documentList
				));

				$result->setTemplate('content/page/search-document-list-partial.phtml');

				break;
		}

		return $result;
	}

	/**
	 * Функционалност "Тестово подписване".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function testSignatureAction() {

		$config = $this->getConfig();

		$host = $config['GL_EPZEU_PUBLIC_API'];
		$uriParams = [$config['rest_service']['test_signature']];

		$testSignatureApiUrl 				= \Application\Service\AppService::genUrl($config['GL_EPZEU_PUBLIC_API'], [$config['rest_service']['test_signature']]);
		$completeTestBissSignProcessApiUrl 	= \Application\Service\AppService::genUrl($config['GL_EPZEU_PUBLIC_API'], [$config['rest_service']['complete_test_biss_sign_process']]);


		return new ViewModel([
			//'signUrl'				=> $signUrl,
			'config'							=> $config,
			'testSignatureApiUrl'				=> $testSignatureApiUrl,
			'completeTestBissSignProcessApiUrl'	=> $completeTestBissSignProcessApiUrl
		]);
	}
}
