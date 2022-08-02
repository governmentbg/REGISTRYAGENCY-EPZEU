<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Content\Form\NestedPageForm;
use Content\Entity\PageEntity;


/**
 * Контролер реализиращ функционалности за работа с йерархични страници.
 *
 * @package Content
 * @subpackage Controller
 */
class NestedPageController extends AbstractActionController {


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
	 * Тип страница: Образци на документи.
	 *
	 * @var int
	 */
	const PAGE_DOCUMENT_TEMPLATES = 3;


	/**
	 * Тип страница: Нормативна уредба.
	 *
	 * @var int
	 */
	const PAGE_LEGISLATION_TYPE = 4;


	/**
	 * Мапинг за типове страници и пътища към страници със списъци.
	 *
	 * @var array
	 */
	const PAGE_ROUTE = [
		self::PAGE_SERVICE_TYPE 		=> 'service_page_list',
		self::PAGE_APPLICATION_TYPE 	=> 'application_page_list',
		self::PAGE_DOCUMENT_TEMPLATES 	=> 'document_template_page_list',
		self::PAGE_LEGISLATION_TYPE 	=> 'legislation_page_list'
	];


	/**
	 * Мапинг за типове страници и пътища към страници за преглед.
	 *
	 * @var array
	 */
	const MANAGE_PAGE = [
		self::PAGE_SERVICE_TYPE 		=> 'service_page',
		self::PAGE_APPLICATION_TYPE 	=> 'application_page',
		self::PAGE_DOCUMENT_TEMPLATES 	=> 'document_template_page',
		self::PAGE_LEGISLATION_TYPE 	=> 'legislation_page'
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
	 * Обект за поддържане и съхранение на обекти от тип Номенклатура.
	 *
	 * @var \Nomenclature\Data\NomenclatureDataManager
	 */
	protected $nomenclatureDM;


	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страница.
	 * @param \Nomenclature\Data\NomenclatureDataManager $nomenclatureDM Обект за поддържане и съхранение на обекти от тип Номенклатура.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($pageDM, $nomenclatureDM, $cacheService) {
		$this->pageDM = $pageDM;
		$this->nomenclatureDM = $nomenclatureDM;
		$this->cacheService = $cacheService;
	}

	/**
	 * Взима списък с йерархични страници.
	 *
	 * @param int $type
	 * @param int $isTranlateAction
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getNestedList($type, $isTranlateAction) {

		$registerId = $this->params()->fromPost('registerId');
		$languageId = $this->language()->getId();

		$registerList = $this->cacheService->getRegisterAbbreviationList();

		$pageTypeId = $this->params()->fromRoute('type');

		// Основен обект
		$params = [
			'type' => $pageTypeId,
			'parentId' => 0,
			'registerId' => $registerId
		];

		if ($isTranlateAction) {
			$params['loadSeparateValueI18n'] = true;
			$params['langId'] = $this->language()->getId();
			$params['loadContent'] = true;
		}

		$parentObj = $this->pageDM->getNestedPageList($params)->current();

		// Списъци с групи и страници към основния обект
		$groupArr = []; // Групи ТРРЮЛНЦ
		$pageArr  = []; // Страници ТРРЮЛНЦ

		$paramsChildren = ['type' => $pageTypeId, 'parentId' => $parentObj->getPageId()];

		if ($isTranlateAction) {
			$paramsChildren['loadSeparateValueI18n'] = true;
			$paramsChildren['langId'] = $this->language()->getId();
			$paramsChildren['loadContent'] = true;
		}

		$pageList = $this->pageDM->getNestedPageList($paramsChildren);

		foreach ($pageList as $page) {
			if ($page->getIsGroup())
				$groupArr[] = $page;
			else
				$pageArr[]  = $page;
		}

		$registerCode = strtolower(array_search($registerId, $this->cacheService->getRegisterCodeList()));

		$this->layout('layout/ajax');

		$result = new viewModel([
				'registerId'		=> $registerId,
				'registerCode'		=> $registerCode,
				'type'				=> $pageTypeId,
				'managePage'		=> self::MANAGE_PAGE[$pageTypeId],
				'registerList'		=> $registerList,
				'parentObj'			=> $parentObj,
				'groupArr'			=> $groupArr,
				'pageArr'			=> $pageArr,
				'isTranlateAction'	=> $isTranlateAction,
				'params'			=> $this->params(),
				'config'			=> $this->getConfig(),
				'groupId'			=> null,
				'selectedTab'		=> null,
				'selectedGroup'		=> null,
				'staticPageList'	=> $this->cacheService->getStaticPageList()
		]);

		if ($isTranlateAction)
			$result->setTemplate('content/nested-page/nested-list-translate-partial.phtml');
		else
			$result->setTemplate('content/nested-page/nested-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалнаст "Списък с йерархични страници и групи".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function nestedListAction() {

		$params = $this->params();

		$request = $this->getRequest();

		$type = $this->params()->fromRoute('type');
		$isTranlateAction = $this->params()->fromRoute('translate', false);
		$languageId = $this->language()->getId();

		$selectedTab = $this->params()->fromQuery('registerId');
		$selectedGroup = $this->params()->fromQuery('sGroupId');

		$registerList = $this->cacheService->getRegisterAbbreviationList();
		$registerId = (int)$this->params()->fromQuery('registerId', reset($registerList));

		if ($isTranlateAction && !$this->params()->fromRoute('lang')) {
			return $this->redirect()->toRoute(null, ['lang' => 'en']);
		}

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('reorderItem'))
				return $this->reorderItem($params->fromPost('parentId'), $params->fromPost('pageIdArr'));

			elseif ($request->getPost('getTabContent'))
				return $this->getNestedList($type, $isTranlateAction);

			elseif ($request->getPost('getGroupItems'))
				return $this->getGroupItems($type, $isTranlateAction);

			elseif ('updateI18nPage') {
				return $this->managePageI18n($this->params()->fromPost('pageId'), $this->params()->fromPost('title'), $this->params()->fromPost('content'));
			}
		}

		$pageTypeId = $params->fromRoute('type');

		// Основен обект
		$params = [
			'type' => $pageTypeId,
			'parentId' => 0,
			'registerId' => $registerId
		];

		if ($isTranlateAction) {
			$params['loadSeparateValueI18n'] = true;
			$params['langId'] = $this->language()->getId();
			$params['loadContent'] = true;
		}

		$parentObj = $this->pageDM->getNestedPageList($params)->current();


		// Списъци с групи и страници към основния обект
		$groupArr = []; // Групи ТРРЮЛНЦ
		$pageArr  = []; // Страници ТРРЮЛНЦ

		$paramsChildren = ['type' => $pageTypeId, 'parentId' => $parentObj->getPageId()];

		if ($isTranlateAction) {
			$paramsChildren['loadSeparateValueI18n'] = true;
			$paramsChildren['langId'] = $this->language()->getId();
			$paramsChildren['loadContent'] = true;
		}

		$pageList = $this->pageDM->getNestedPageList($paramsChildren);

		foreach ($pageList as $page) {
			if ($page->getIsGroup())
				$groupArr[] = $page;
			else
				$pageArr[]  = $page;
		}


		$registerCode = strtolower(array_search($registerId, $this->cacheService->getRegisterCodeList()));

		$result = new viewModel([
				'registerId'		=> $registerId,
				'type'				=> $type,
				'managePage'		=> self::MANAGE_PAGE[$type],
				'registerList'		=> $registerList,
				'parentObj'			=> $parentObj,
				'groupArr'			=> $groupArr,
				'pageArr'			=> $pageArr,
				'registerCode'		=> $registerCode,
				'isTranlateAction'	=> $isTranlateAction,
				'params'			=> $this->params(),
				'config'			=> $this->getConfig(),
				'groupId'			=> null,
				'selectedTab'		=> $selectedTab,
				'selectedGroup'		=> $selectedGroup,
				'staticPageList'	=> $this->cacheService->getStaticPageList()
		]);

		if ($isTranlateAction)
			$result->setTemplate('content/nested-page/nested-list-translate.phtml');

		return $result;
	}


	/**
	 * Обновява превода на йерархични страници и групи.
	 *
	 * @param int $pageId Идентификатор на страница.
	 * @param string $titleI18n Превод на заглавие.
	 * @param string $contentI18n Превод на съдържание.
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function managePageI18n($pageId, $titleI18n = '', $contentI18n = '') {

		$languageId = $this->language()->getId();

		$pageObj = $this->pageDM->getNestedPageList([
						'pageIdList' => [$pageId],
						'langId' => $languageId,
						'loadSeparateValueI18n' => true
					])->current();

		$pageObj->setTitleI18n(trim($titleI18n));
		$pageObj->setContentI18n(trim($contentI18n));

		if (!$pageObj->getIsTranslated()) {
			if ($this->pageDM->addNestedPageI18n($pageObj, $languageId)) {

				return $result = new JsonModel(array(
					"response" 	=> "success",
				));
			}
		}

		else {
			if ($this->pageDM->updateNestedPageI18n($pageObj, $languageId)) {

				return $result = new JsonModel(array(
						"response" 	=> "success",
				));
			}
		}

		return $result = new JsonModel(array(
			"response" 	=> "false",
		));
	}


	/**
	 * Променя подредбата на йерархични страници и групи.
	 *
	 * @param int $parentId Идентификатор на родителска страница.
	 * @param array $pageIdList Масив с идентификатори на страници.
	 * @return bool Резултат от операцията.
	 */
	public function reorderItem($parentId, $pageIdList) {

		if ($this->pageDM->reorderNestedPageList($parentId, $pageIdList))
			return $result = new JsonModel(["response" => "success"]);

		return $result = new JsonModel(["response" => "false"]);
	}


	/**
	 * Извлича списък с елементи в група.
	 *
	 * @param int $type Тип на страница.
	 * @param bool $isTranlateAction Флаг, указващ дали списъка се зарежда за превод.
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getGroupItems($type, $isTranlateAction) {

		$groupId = $this->params()->fromPost('groupId');


		$params = ['parentId' => $groupId];

		if ($isTranlateAction) {
			$params['langId'] = $this->language()->getId();
			$params['loadSeparateValueI18n'] = true;
		}

		$pageList = $this->pageDM->getNestedPageList($params);

		$this->layout('layout/ajax');

		$managePage = self::MANAGE_PAGE[$type];

		$result = new ViewModel([
			'managePage'		=> $managePage,
			'pageList' 			=> $pageList,
			'isTranlateAction' 	=> $isTranlateAction,
			'params'			=> $this->params(),
			'groupId'			=> $groupId
		]);

		if ($isTranlateAction)
			$result->setTemplate('content/nested-page/group-item-partial-translate.phtml');
		else
			$result->setTemplate('content/nested-page/group-item-partial.phtml');

		return $result;
	}


	/**
	* Функционалност "Добавяне/редактиране на страница с услуги".
	*
	* @return ViewModel Контейнер с данни за презентационния слой.
	*/
	public function manageServicePageAction() {

		$registerList = $this->cacheService->getRegisterAbbreviationList();
		$params = $this->params();

		$pageTypeId 		= $params->fromRoute('type');
		$registerId 		= $params->fromRoute('registerId');
		$groupId 			= $params->fromRoute('groupId');

		$pageForm = new NestedPageForm();
		$pageForm->getInputFilter()->get('serviceId')->setRequired(true);
		$pageForm->getInputFilter()->get('title')->setRequired(false);

		$serviceList = $this->nomenclatureDM->getServiceList($totalCount, null, ['status' => [0], 'registerId' => [$registerId], 'total_count' => false]);

		$serviceArr = [];

		foreach ($serviceList as $serviceObj)
			$serviceArr[$serviceObj->getServiceId()] = $serviceObj->getName();

		$pageForm->get('serviceId')->setValueOptions(["" => 'EP_CMS_CHOICE_SERVICE_L'] + $serviceArr);

		$getRegisterPageList = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'parentId' => 0, 'registerId' => $registerId])->current();

		// ID на основна предефинирана страница
		$parentId = $groupId ? $groupId : $getRegisterPageList->getPageId();

		$request = $this->getRequest();

		if ($request->isPost()) {

			$pageForm->setData($request->getPost());

			if ($pageForm->isValid()) {

				$dataObj = $pageForm->getData();
				$dataObj->setParentId($parentId);
				$dataObj->setIsGroup(false);
				$dataObj->setRegisterId($registerId);
				$dataObj->setType($pageTypeId);

				if ($this->pageDM->addNestedPage($dataObj)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_service_page', ['registerId' => $registerId, 'groupId' => $groupId, 'lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		$parentObj = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'pageIdList' => [$groupId], 'registerId' => $registerId])->current();

		return new viewModel([
			'parentObj'			=> $parentObj,
			'registerList'		=> $registerList,
			'pageForm'			=> $pageForm,
			'params'			=> $params,
			'pageTypeId'		=> $pageTypeId,
			'registerId'		=> $registerId,
			'groupId'			=> $groupId,
			'lang'				=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	 * Функционалност "Добавяне/редактиране на страница със заявления/искания/удостоверения".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function manageApplicationPageAction() {

		$registerList = $this->cacheService->getRegisterAbbreviationList();
		$params = $this->params();

		$pageTypeId = $params->fromRoute('type');
		$registerId = $params->fromRoute('registerId');
		$groupId 	= $params->fromRoute('groupId');

		$pageForm = new NestedPageForm();
		$pageForm->getInputFilter()->get('applicationId')->setRequired(true);
		$pageForm->getInputFilter()->get('title')->setRequired(false);

		$appList = $this->nomenclatureDM->getApplicationTypeList($totalCount, null, ['total_count' => false, 'registerId' => $registerId]);

		$paramsAddedServices = [
			'type' => $pageTypeId,
			'parentId' => null,
			'registerId' => $registerId,
		];

		$addedApplicationList = $this->pageDM->getNestedPageList($paramsAddedServices);

		$addedApplicationIdArr = [];

		foreach ($addedApplicationList as $addedApplication) {

			if ($addedApplication->getIsGroup())
				continue;

			$addedApplicationIdArr[] = $addedApplication->getApplicationId();
		}

		$appArr = [];

		foreach ($appList as $appObj) {

			if (in_array($appObj->getId(), $addedApplicationIdArr) || empty($appObj->getUrl()))
				continue;

			$appArr[] = [
				'value' => $appObj->getId(),
				'label' => ($appObj->getAppCode() ? $appObj->getAppCode() .' ' : '').$appObj->getName(),
				'attributes' => array(
					'data-appcode' => $appObj->getAppCode(),
				),
			];
		}

		$pageForm->get('applicationId')->setValueOptions(["" => 'EP_CMS_CHOICE_APPLICATION_L'] + $appArr);

		$pageObj = new PageEntity();

		$getRegisterPageList = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'parentId' => 0, 'registerId' => $registerId])->current();

		// ID на основна предефинирана страница
		$parentId = $groupId ? $groupId : $getRegisterPageList->getPageId();
		$request = $this->getRequest();

		if ($request->isPost()) {

			$pageForm->setData($request->getPost());

			if ($pageForm->isValid()) {

				$dataObj = $pageForm->getData();
				$dataObj->setParentId($parentId);
				$dataObj->setIsGroup(false);
				$dataObj->setRegisterId($registerId);
				$dataObj->setType($pageTypeId);

				if (in_array($dataObj->getApplicationId(), $addedApplicationIdArr)) {
					$this->flashMessenger()->addErrorMessage('EP_NOM_ALREADY_ADD_E');
					return $this->redirect()->toRoute('add_application_page', ['registerId' => $registerId, 'groupId' => $groupId, 'lang' => $this->params()->fromRoute('lang')]);
				}

				if ($this->pageDM->addNestedPage($dataObj)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_application_page', ['registerId' => $registerId, 'groupId' => $groupId, 'lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		$parentObj = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'pageIdList' => [$groupId], 'registerId' => $registerId])->current();

		return new viewModel([
				'pageObj'		=> $pageObj,
				'parentObj'		=> $parentObj,
				'registerList'	=> $registerList,
				'pageForm'		=> $pageForm,
				'params'		=> $params,
				'pageTypeId'	=> $pageTypeId,
				'registerId'	=> $registerId,
				'groupId'		=> $groupId,
				'lang'			=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	* Функционалност "Добавяне/редактиране на страница с образци на документи".
	*
	* @return ViewModel Контейнер с данни за презентационния слой.
	*/
	public function manageDocumentTemplatePageAction() {

		$registerList = $this->cacheService->getRegisterAbbreviationList();
		$params = $this->params();

		$pageTypeId = $params->fromRoute('type');
		$registerId = $params->fromRoute('registerId');
		$pageId 	= $params->fromRoute('pageId', null);
		$groupId 	= $params->fromRoute('groupId');

		$pageForm = new NestedPageForm();
		$pageForm->getInputFilter()->get('files')->setRequired(true);

		$deletedFiles = $this->params()->fromPost('deletedFiles', []);
		$deletedFiles = array_combine($deletedFiles, $deletedFiles);

		$pageForm->get('deletedFiles')->setValueOptions($deletedFiles);
		$pageForm->get('deletedFiles')->setValue([$deletedFiles]);

		$isDeletedOriginalFile = false;

		if (in_array($pageId, $deletedFiles))
			$isDeletedOriginalFile = true;

		$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));
		$pageForm->get('files')->setValueOptions($fileArr);

		$pageObj = null;

		if ($pageId) {

			if (!$isDeletedOriginalFile)
				$pageForm->getInputFilter()->get('files')->setRequired(false);

			if (!$pageObj = $this->pageDM->getNestedPageList(['pageIdList' => [$pageId]])->current()) {
				$response = $this->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
				$response->setStatusCode(404);
				$response->sendHeaders();
				exit;
			}

			$pageForm->bind($pageObj);
		}

		$getRegisterPageList = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'parentId' => 0, 'registerId' => $registerId])->current();

		// ID на основна предефинирана страница
		$parentId = $groupId ? $groupId : $getRegisterPageList->getPageId();
		$request = $this->getRequest();

			if ($request->isPost()) {

				$pageForm->setData($request->getPost());

				if ($pageForm->isValid()) {

					$dataObj = $pageForm->getData();

					$dataObj->setFiles($fileArr);

					$dataObj->setParentId($parentId);
					$dataObj->setIsGroup(false);
					$dataObj->setRegisterId($registerId);
					$dataObj->setType($pageTypeId);

					// Update
					if ($pageId) {
						if ($this->pageDM->updateNestedPageById($pageId, $dataObj)) {
							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('edit_document_template_page', ['pageId' => $pageId, 'groupId' => $groupId, 'registerId' => $registerId, 'lang' => $this->params()->fromRoute('lang')]);
						}
					}

					// Insert
					else {
						if ($this->pageDM->addNestedPage($dataObj)) {
							$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
							return $this->redirect()->toRoute('add_document_template_page', ['registerId' => $registerId, 'groupId' => $groupId, 'lang' => $this->params()->fromRoute('lang')]);
						}
					}
				}
			}

			$parentObj = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'pageIdList' => [$groupId], 'registerId' => $registerId])->current();

			return new viewModel([
					'parentObj'		=> $parentObj,
					'lang'			=> $this->params()->fromRoute('lang'),
					'registerList'	=> $registerList,
					'pageForm'		=> $pageForm,
					'params'		=> $params,
					'pageTypeId'	=> $pageTypeId,
					'registerId'	=> $registerId,
					'pageId'		=> $pageId,
					'groupId'		=> $groupId,
					'config'		=> $this->getConfig(),
					'fileArr'		=> $fileArr,
					'pageObj'		=> $pageObj,
					'deletedFiles' 	=> $deletedFiles,
					'isDeletedOriginalFile'	=> $isDeletedOriginalFile
			]);
	}


	/**
	* Функционалност "Добавяне/редактиране на страница с нормативни документи".
	*
	* @return ViewModel Контейнер с данни за презентационния слой.
	*/
	public function manageLegislationPageAction() {

		$registerList = $this->cacheService->getRegisterAbbreviationList();
		$params = $this->params();

		$pageTypeId = $params->fromRoute('type');
		$registerId = $params->fromRoute('registerId');
		$pageId 	= $params->fromRoute('pageId', null);
		$groupId 	= $params->fromRoute('groupId');

		$pageForm = new NestedPageForm();
		$pageForm->getInputFilter()->get('files')->setRequired(true);

		$deletedFiles = $this->params()->fromPost('deletedFiles', []);
		$deletedFiles = array_combine($deletedFiles, $deletedFiles);

		$pageForm->get('deletedFiles')->setValueOptions($deletedFiles);
		$pageForm->get('deletedFiles')->setValue([$deletedFiles]);

		$isDeletedOriginalFile = false;

		if (in_array($pageId, $deletedFiles))
			$isDeletedOriginalFile = true;

		$fileArr = [];

		$pageObj = null;

		if ($pageId) {

			if (!$isDeletedOriginalFile)
				$pageForm->getInputFilter()->get('files')->setRequired(false);

			if (!$pageObj = $this->pageDM->getNestedPageList(['pageIdList' => [$pageId]])->current()) {
				$response = $this->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
				$response->setStatusCode(404);
				$response->sendHeaders();
				exit;
			}
			$pageForm->bind($pageObj);
		}

		$getRegisterPageList = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'parentId' => 0, 'registerId' => $registerId])->current();

		// ID на основна предефинирана страница
		$parentId = $groupId ? $groupId : $getRegisterPageList->getPageId();
		$request = $this->getRequest();

			if ($request->isPost()) {

				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));
				$pageForm->get('files')->setValueOptions($fileArr);

				$pageForm->setData($request->getPost());

				if ($pageForm->isValid()) {

					$dataObj = $pageForm->getData();

					$dataObj->setFiles($fileArr);
					$dataObj->setParentId($parentId);
					$dataObj->setIsGroup(false);
					$dataObj->setRegisterId($registerId);
					$dataObj->setType($pageTypeId);

					// Update
					if ($pageId) {
						if ($this->pageDM->updateNestedPageById($pageId, $dataObj)) {
							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('edit_legislation_page', ['pageId' => $pageId, 'groupId' => $groupId, 'registerId' => $registerId, 'lang' => $this->params()->fromRoute('lang')]);
						}
					}

					// Insert
					else {
						if ($this->pageDM->addNestedPage($dataObj)) {
							$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
							return $this->redirect()->toRoute('add_legislation_page', ['registerId' => $registerId, 'groupId' => $groupId, 'lang' => $this->params()->fromRoute('lang')]);
						}
					}
				}
			}

			$parentObj = $this->pageDM->getNestedPageList(['type' => $pageTypeId, 'pageIdList' => [$groupId], 'registerId' => $registerId])->current();

			return new viewModel([
					'parentObj'		=> $parentObj,
					'lang'			=> $this->params()->fromRoute('lang'),
					'registerList'	=> $registerList,
					'pageForm'		=> $pageForm,
					'params'		=> $params,
					'pageTypeId'	=> $pageTypeId,
					'registerId'	=> $registerId,
					'pageId'		=> $pageId,
					'groupId'		=> $groupId,
					'config'		=> $this->getConfig(),
					'fileArr'		=> $fileArr,
					'pageObj'		=> $pageObj,
					'deletedFiles' 	=> $deletedFiles,
					'isDeletedOriginalFile'	=> $isDeletedOriginalFile
			]);
	}


	/**
	 * Функционалност "Добавяне на група в страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function managePageGroupAction() {

		$groupForm = new NestedPageForm();
		$groupForm->getInputFilter()->get('serviceId')->setRequired(false);

		$groupId = $this->params()->fromRoute('groupId');

		$params = $this->params();
		$registerList = $this->cacheService->getRegisterAbbreviationList();

		$pageTypeId = $params->fromRoute('type');
		$registerId = $params->fromRoute('registerId');

		$request = $this->getRequest();

		$getRegisterPageList = $this->pageDM->getNestedPageList(['type' => $pageTypeId]);

		// ID на основна предефинирана страница
		$parentPageObj = null;
		foreach ($getRegisterPageList as $registerPage) {
			if ($registerPage->getRegisterId() == $registerId)
				$parentPageObj = $registerPage;
		}

		$groupObj = null;

		if ($groupId) {

			if (!$groupObj = $this->pageDM->getNestedPageList(['pageIdList' => [$groupId], 'loadContent' => true])->current()) {
				$response = $this->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
				$response->setStatusCode(404);
				$response->sendHeaders();
				exit;
			}

			$groupForm->bind($groupObj);
		}

		if ($request->isPost()) {

			$groupForm->setData($request->getPost());

			if ($groupForm->isValid()) {
				$dataObj = $groupForm->getData();
				$dataObj->setIsGroup(true);
				$dataObj->setParentId($parentPageObj->getPageId());
				$dataObj->setRegisterId($registerId);
				$dataObj->setType($pageTypeId);


				if ($groupId) {
					if ($this->pageDM->updateNestedPageById($groupId, $dataObj)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_'.self::MANAGE_PAGE[$pageTypeId].'_group', ['groupId' => $groupId, 'registerId' => $registerId, 'lang' => $this->params()->fromRoute('lang')]);
					}
				}

				else {
					if ($this->pageDM->addNestedPage($dataObj)) {
						$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
						return $this->redirect()->toRoute('add_'.self::MANAGE_PAGE[$pageTypeId].'_group', ['registerId' => $registerId, 'lang' => $this->params()->fromRoute('lang')]);
					}
				}
			}
		}

		return new viewModel([
			'prevPageRoute' => self::PAGE_ROUTE[$pageTypeId],
			'parentPageObj'	=> $parentPageObj,
			'managePage'	=> self::MANAGE_PAGE[$pageTypeId],
			'groupForm'		=> $groupForm,
			'registerList'	=> $registerList,
			'pageTypeId'	=> $pageTypeId,
			'registerId'	=> $registerId,
			'params'		=> $params,
			'lang'			=> $this->params()->fromRoute('lang'),
			'groupId'		=> $groupId
		]);
	}


	/**
	 * Функционалност "Изтриване на страница".
	 *
	 * @return Response HTTP отговор.
	 */
	public function deleteNestedPageAction() {

		$registerId = $this->params()->fromRoute('registerId');
		$groupId = $this->params()->fromRoute('groupId');
		$pageId = $this->params()->fromRoute('pageId');

		if ($pageObj = $this->pageDM->getNestedPageList(['pageIdList' => [$pageId]])->current()) {

			if (($pageObj->getIsGroup() && $pageObj->getElementCount()) || !$pageObj->getParentid()) {
				$response = $this->getResponse();
				$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
				$response->setStatusCode(404);
				$response->sendHeaders();
				exit;
			}

			if ($this->pageDM->deleteNestedPageById($pageId)) {
				return $this->redirect()->toRoute(self::PAGE_ROUTE[$pageObj->getType()], ['lang' => $this->params()->fromRoute('lang')], ['query' => ['registerId' => $registerId, 'sGroupId' => $groupId]]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Зареждане на файл в йерархична страница".
	 */
	public function loadNestedPageDocumentAction() {

		$config = $this->getConfig();
		$pageId = $this->params()->fromRoute('fileId');

		if ($nestedPageObj = $this->pageDM->getNestedPageList(['pageIdList' => [$pageId]])->current()) {
			if ($fileContent = $this->pageDM->getPageFile($nestedPageObj->getPageId()))
				return \Document\Service\DocumentService::getFileFromDatabase($nestedPageObj, $fileContent);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}
