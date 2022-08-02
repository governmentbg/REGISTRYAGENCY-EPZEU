<?php

namespace Statistic\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Statistic\Form\StatisticForm;
use Statistic\Form\StatisticReportForm;
use Zend\View\Model\JsonModel;
use Application\Service\AppService;

/**
 * Контролер реализиращ функционалности за работа със статистичести отчети.
 *
 * @package Forum
 * @subpackage Controller
 */
class StatisticController extends AbstractActionController {

	const STATISTIC_TYPE = [
		1 => 'EP_STATISTICS_GENERATION_MANUAL_TYPE_L',
		0 => 'EP_STATISTICS_GENERATION_AUTO_TYPE_L',
	];

	const STATISTIC_REPORT_STATUS = [
		1 => 'EP_STATISTICS_REPORT_STATE_LOADED_L',
		2 => 'EP_STATISTICS_REPORT_STATE_PUBLIC_L',
		3 => 'EP_STATISTICS_REPORT_STATE_UNPUBLIC_L'
	];

	/**
	 * Обект за поддържане и съхранение на обекти от тип Статистически отчети.
	 *
	 * @var \Statistic\Data\StatisticDataManager
	 */
	protected $statsDM;

	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;

	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;

	/**
	 * Услуга за локализация на интерфейс.
	 *
	 * @var MvcTranslator
	 */
	protected $translator;

	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;

	/**
	 * Обект за поддържане и съхранение на обекти от тип Документи.
	 *
	 * @var \Document\Data\DocumentDataManager
	 */
	protected $documentDM;


	/**
	 * Конструктор.
	 *
	 * @param \Statistic\Data\StatisticDataManager $statsDM Обект за поддържане и съхранение на татистически отчети.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \Application\Service\RestService $restService Услуга за работа с REST уеб услуги.
	 * @param \Document\Data\DocumentDataManager $documentDM Обект за поддържане и съхранение на обекти от тип Документи.
	 */
	public function __construct($statsDM, $cacheService, $userDM, $translator, $restService, $documentDM) {
		$this->statsDM = $statsDM;
		$this->cacheService = $cacheService;
		$this->userDM = $userDM;
		$this->translator = $translator;
		$this->restService = $restService;
		$this->documentDM = $documentDM;
	}

	/**
	 * Функционалност "Списък за администриране на статистики".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function statisticListAction() {

		$config = $this->getConfig();

		$page = 1;
		$rowCount = \Application\Module::APP_MAX_INT;

		$request = $this->getRequest();

		$isTranslateAction = $this->params()->fromRoute('translate');

		if ($isTranslateAction && !$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getTabContetn'))
				return $result = $this->getStatisticList($isTranslateAction);

			elseif ($request->getPost('updateI18nLabel')) {
				$result = $this->updateStatisticI18n();
				return $result;
			}

			if ($request->getPost('reorderItem')) {
				return $this->reorderItem($request->getPost('statsIdArr'), $request->getPost('registerId'));
				exit;
			}
		}

		$registerList = $this->cacheService->getRegisterAbbreviationList();

		$registerId = (int)$this->params()->fromQuery('registerId', reset($registerList));

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount,
			'registerId' => $registerId
		];

		if ($isTranslateAction) {
			$params['loadSeparateValueI18n'] = true;
			$params['langId'] = $this->language()->getId();;
		}

		$statisticList = $this->statsDM->getStatisticList($totalCount, $params);

		$registerCode = strtolower(array_search($registerId, $this->cacheService->getRegisterCodeList()));

		$result = new ViewModel([
			'params' 			=> $this->params(),
			'statisticList' 	=> $statisticList,
			'totalCount'		=> $totalCount,
			'totalPages'		=> ceil($totalCount/$rowCount),
			'registerList'		=> $registerList,
			'registerId'		=> $registerId,
			'isTranslateAction'	=> $isTranslateAction,
			'registerCode'		=> $registerCode

		]);

		if ($isTranslateAction)
			$result->setTemplate('statistic/statistic/statistic-list-translate.phtml');


		return $result;
	}

	/**
	 * Взима списък със статистики.
	 *
	 * @param int $isTranslateAction
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getStatisticList($isTranslateAction) {

		$config = $this->getConfig();

		$page = 1;
		$rowCount = \Application\Module::APP_MAX_INT;

		$registerId = (int)$this->params()->fromPost('registerId', 1);

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'totalCount' 	=> true,
			'registerId'	=> $registerId
		];

		if ($isTranslateAction) {
			$params['loadSeparateValueI18n'] = true;
			$params['langId'] = $this->language()->getId();;
		}

		$statisticList = $this->statsDM->getStatisticList($totalCount, $params);

		$registerList = $this->cacheService->getRegisterAbbreviationList();

		$this->layout('layout/ajax');

		$registerCode = strtolower(array_search($registerId, $this->cacheService->getRegisterCodeList()));

		$result = new ViewModel(array(
			'params' 			=> $this->params(),
			'statisticList' 	=> $statisticList,
			'registerList'		=> $registerList,
			'totalCount'		=> $totalCount,
			'registerId'		=> $registerId,
			'registerCode'		=> $registerCode
		));

		if ($isTranslateAction)
			$result->setTemplate('statistic/statistic/statistic-list-translate-partial.phtml');
		else
			$result->setTemplate('statistic/statistic/statistic-list-partial.phtml');

		return $result;
	}

	/**
	 * Функционалност "Добавяне на нов вид статистика".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addStatisticAction() {

		$statisticForm = new StatisticForm();

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());
		$statisticForm->get('registerId')->setValueOptions(["" => 'GL_CHOICE_L'] + $registerList);

		$registerId = $this->params()->fromQuery('registerId');
		$statisticForm->get('registerId')->setValue($this->params()->fromQuery('registerId'));

		$statisticTypeList =  self::STATISTIC_TYPE;
		$statisticForm->get('typeGenarate')->setValueOptions($statisticTypeList);

		$statisticForm->get('typeGenarate')->setValue(array_search('EP_STATISTICS_GENERATION_MANUAL_TYPE_L', self::STATISTIC_TYPE));

		$request = $this->getRequest();

		if ($request->isPost()) {

			$typeGenValue = $this->params()->fromPost('typeGenarate');

			if (self::STATISTIC_TYPE[$typeGenValue] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L')
				$statisticForm->getInputFilter()->get('url')->setRequired(true);

			$statisticForm->setData($request->getPost());

			if ($statisticForm->isValid()) {

				$postObj = $statisticForm->getData();

				if ($this->statsDM->addStatistic($postObj))
					$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');

				return $this->redirect()->toRoute(
						'add_statistic',
						['lang' => $this->params()->fromRoute('lang')],
						['query' => ['registerId' => $postObj->getRegisterId()]]
					);
			}
		}

		return new ViewModel([
			'statisticForm' => $statisticForm,
			'registerId'	=> $registerId
		]);
	}

	/**
	 * Функционалност "Промяна на данни за вид статистика".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editStatisticAction() {

		$statisticId = $this->params()->fromRoute('statisticId');

		$params = ['id_statistic_list' =>[$statisticId]];


		if ($statisticObj = $this->statsDM->getStatisticList($totalCount, $params)->current()) {

			$statisticObj->setStatisticId($statisticId);

			$statisticForm = new StatisticForm();

			$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());
			$statisticForm->get('registerId')->setValueOptions(["" => 'GL_CHOICE_L'] + $registerList);

			$statisticTypeList =  self::STATISTIC_TYPE;
			$statisticForm->get('typeGenarate')->setValueOptions($statisticTypeList);

			$request = $this->getRequest();

			if ($request->isPost()) {

				$typeGenValue = $this->params()->fromPost('typeGenarate');

				if (self::STATISTIC_TYPE[$typeGenValue] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L')
					$statisticForm->getInputFilter()->get('url')->setRequired(true);

				$statisticForm->setData($request->getPost());

				if ($statisticForm->isValid()) {

					if ($this->statsDM->updateStatisticById($statisticId, $statisticForm->getData()))
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');

					return $this->redirect()->toRoute(
							'edit_statistic', ['statisticId' => $statisticId, 'lang' => $this->params()->fromRoute('lang')]);
				}
			}
			else {
				$statisticForm->bind($statisticObj);
			}

			return new ViewModel([
				'statisticForm' => $statisticForm,
				'statisticId'	=> $statisticId,
				'statisticObj'	=> $statisticObj
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Функционалност "Списък за администриране на статистики".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function statisticReportListAction() {

		$statisticId = $this->params()->fromRoute('statisticId');

		$params = ['id_statistic_list' =>[$statisticId]];

		if ($statisticObj = $this->statsDM->getStatisticList($totalCount, $params)->current()) {

			$config = $this->getConfig();

			$request = $this->getRequest();

			if ($request->isXmlHttpRequest()) {
				if ($request->getPost('getItemList'))
					return $result = $this->getStatisticReportList();
			}

			$page = (int)$this->params()->fromPost('page', 1);
			$rowCount = $config['GL_ITEMS_PER_PAGE'];

			$params = [
				'cp' 				=> $page,
				'rowCount' 			=> $rowCount,
				'statisticId'		=> $statisticId
			];

			$statisticReportList = $this->statsDM->getStatisticReportList($totalCount, $params);

			$registerList = $this->cacheService->getRegisterAbbreviationList();

			return new ViewModel([
				'statisticReportList'	=> $statisticReportList,
				'statisticObj'			=> $statisticObj,
				'params'				=> $this->params(),
				'totalCount'			=> $totalCount,
				'totalPages'			=> ceil($totalCount/$rowCount),
				'registerList'			=> $registerList
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Взима списък със статистики отчети.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getStatisticReportList() {

		$statisticId = $this->params()->fromRoute('statisticId');

		$params = ['id_statistic_list' =>[$statisticId]];

		if ($statisticObj = $this->statsDM->getStatisticList($totalCount, $params)->current()) {

			$config = $this->getConfig();

			$page = (int)$this->params()->fromPost('page', 1);
			$rowCount = $config['GL_ITEMS_PER_PAGE'];

			$params = [
				'cp' 			=> $page,
				'rowCount' 		=> $rowCount,
				'totalCount' 	=> false,
				'statisticId' => $statisticId
			];

			$statisticReportList = $this->statsDM->getStatisticReportList($totalCount, $params);

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'statisticReportList'	=> $statisticReportList,
				'statisticObj'			=> $statisticObj,
				'params'				=> $this->params(),
			));

			$result->setTemplate('statistic/statistic/statistic-report-list-partial.phtml');
			return $result;
		}

		return '';
	}

	/**
	 * Функционалност "Добавяне на статистически отчет".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addStatisticReportAction() {

		$statisticId = $this->params()->fromRoute('statisticId');

		$params = [
			'id_statistic_list' => [$statisticId]
		];

		if ($statisticObj = $this->statsDM->getStatisticList($totalCount, $params)->current()) {

			$statisticReportForm = new StatisticReportForm();

			$request = $this->getRequest();

			$fileArr = [];

			if ($request->isPost()) {

				$statisticReportForm->setData($request->getPost());

				if (self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L')
					$statisticReportForm->getInputFilter()->get('files')->setRequired(false);


				if ($this->params()->fromPost('files')) {
					$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files')]);
					$statisticReportForm->get('files')->setValueOptions($fileArr);
				}

				if ($statisticReportForm->isValid()) {

					$uuid = null;

					$statisticData = $statisticReportForm->getData();

					if (self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L') {

						$url = AppService::genUrl($statisticObj->getUrl(), [], [
							'FromDate' => AppService::getSqlDate($statisticData->getDateFrom()).'T00:00:00.000',
							'ToDate' => AppService::getSqlDate($statisticData->getDateTo()).'T23:59:59.000'
						]);

						if (!$generatedStatData = $this->restService->generateReport($url))
							$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

						else {

							$allowedFormats = ['csv', 'xls', 'xlsx'];
							$fileName 		= $generatedStatData['fileName'];
							$fileInfo 		= pathinfo($fileName);

							if (!in_array($fileInfo['extension'], $allowedFormats)) {
								$message = str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', implode(', ', $allowedFormats), $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_I'));
								$this->flashMessenger()->addErrorMessage($message);
							}

							$uuid = AppService::genToken();

							$documentParams = [
								'uuid'			=> $uuid,
								'fileName'		=> $fileInfo['filename'].str_replace('.', '_', uniqid('_', true)).'.'.$fileInfo['extension'],
								'fileSize'		=> $generatedStatData['fileSize'],
								'contentType'	=> $generatedStatData['contentType'],
								'content'		=> $generatedStatData['fileContent'],
								'invalidAfter'	=> date("Y-m-d H:i:s", time() + 86400),
								'cin'			=> null
							];

							$this->documentDM->uploadDocument($documentParams);
						}
					}

					else {
						$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($fileArr);
						$uuid = array_shift($filesUuid);
					}

					if (!$this->flashMessenger()->getMessages() && $this->statsDM->addStatisticReport($statisticId, $statisticData, self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()], $uuid)) {
						$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');
						return $this->redirect()->toRoute('add_statistic_report', ['statisticId' => $statisticId]);
					}
				}
			}

			$config = $this->getConfig();

			$page = (int)$this->params()->fromPost('page', 1);
			$rowCount = $config['GL_ITEMS_PER_PAGE'];

			$params = [
				'cp' 			=> $page,
				'rowCount' 		=> $rowCount,
				'totalCount' 	=> false
			];

			$registerList = $this->cacheService->getRegisterAbbreviationList();

			return new ViewModel([
				'statisticObj'			=> $statisticObj,
				'statisticReportForm'	=> $statisticReportForm,
				'registerList'			=> $registerList,
				'params'				=> $this->params(),
				'fileArr'				=> $fileArr
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Функционалност "Промяна на статистически отчет".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editStatisticReportAction() {

		$statisticReportId = $this->params()->fromRoute('statisticReportId');

		$params = ['statisticReportIdList' => [$statisticReportId]];

		if ($statisticReportObj = $this->statsDM->getStatisticReportList($totalCount, $params)->current()) {

			if (self::STATISTIC_REPORT_STATUS[$statisticReportObj->getStatus()] == 'EP_STATISTICS_REPORT_STATE_PUBLIC_L') {
				return $this->redirect()->toRoute(
						'statistic_report_list',
						['statisticId' => $statisticReportObj->getStatisticId()],
						['query' => $this->params()->fromQuery()]
						);
			}

			$statisticObj = $this->statsDM->getStatisticList(
				$totalCount,
				['id_statistic_list' => [$statisticReportObj->getStatisticId()]]
			)->current();

			$statisticReportObj->setDateFrom(date('d.m.Y', strtotime($statisticReportObj->getDateFrom())));
			$statisticReportObj->setDateTo(date('d.m.Y', strtotime($statisticReportObj->getDateTo())));

			$statisticReportForm = new StatisticReportForm();

			$statisticReportForm->bind($statisticReportObj);

			$request = $this->getRequest();

			$statisticReportForm->getInputFilter()->get('files')->setRequired(false);

			if (!empty($this->params()->fromPost('deletedFiles')) && !$this->params()->fromPost('files', null) )
				$statisticReportForm->getInputFilter()->get('files')->setRequired(true);

			$fileArr = [];

			if ($this->params()->fromPost('files')) {
				$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files')]);
				$statisticReportForm->get('files')->setValueOptions($fileArr);
			}

			$deletedFiles = $this->params()->fromPost('deletedFiles', []);
			$deletedFiles = array_combine($deletedFiles, $deletedFiles);

			$statisticReportForm->get('deletedFiles')->setValueOptions($deletedFiles);
			$statisticReportForm->get('deletedFiles')->setValue([$deletedFiles]);


			if ($request->isPost()) {

				if (self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L')
					$statisticReportForm->getInputFilter()->get('files')->setRequired(false);

				$statisticReportForm->setData($request->getPost());

				if ($statisticReportForm->isValid()) {

					$uuid = null;

					$statisticData = $statisticReportForm->getData();

					// Автоматично добавяне на статистически отчет
					if (self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()] == 'EP_STATISTICS_GENERATION_AUTO_TYPE_L') {

						$url = AppService::genUrl($statisticObj->getUrl(), [], [
							'FromDate' => AppService::getSqlDate($statisticData->getDateFrom()).'T00:00:00.000',
							'ToDate' => AppService::getSqlDate($statisticData->getDateTo()).'T23:59:59.000'
						]);

						if (!$generatedStatData = $this->restService->generateReport($url))
							$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

						else {

							$allowedFormats = ['csv', 'xls', 'xlsx'];
							$fileName 		= $generatedStatData['fileName'];
							$fileInfo 		= pathinfo($fileName);
							$fileExtension 	= $fileInfo['extension'];

							if (!in_array($fileExtension, $allowedFormats)) {
								$message = str_replace('{EP_CMS_DOCUMENT_ALLOWED_FORMATS}', implode(', ', $allowedFormats), $this->translator->translate('EP_CMS_FILE_FORMAT_DOCUMENT_ALLOWED_FORMATS_I'));
								$this->flashMessenger()->addErrorMessage($message);
							}

							$uuid = AppService::genToken();

							$documentParams = [
								'uuid'			=> $uuid,
								'fileName'		=> $fileInfo['filename'].str_replace('.', '_', uniqid('_', true)).'.'.$fileInfo['extension'],
								'fileSize'		=> $generatedStatData['fileSize'],
								'contentType'	=> $generatedStatData['contentType'],
								'content'		=> $generatedStatData['fileContent'],
								'invalidAfter'	=> date("Y-m-d H:i:s", time() + 86400),
								'cin'			=> null
							];

							$this->documentDM->uploadDocument($documentParams);
						}
					}

					// Ръчно добавяне на статистически отчет
					else {

						if ($statisticData->getFiles()) {
							$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles([$this->params()->fromPost('files')]);
							$filesUuid = \Document\Service\DocumentService::extractUuidFromFileList($fileArr);
							$uuid = array_shift($filesUuid);
						}

					}

					if (!$this->flashMessenger()->getMessages() && $this->statsDM->editStatisticReport($statisticReportId, $statisticData, self::STATISTIC_TYPE[$statisticObj->getTypeGenarate()], $uuid)) {
						$this->flashMessenger()->addSuccessMessage('GL_SUCCESS_SAVE_L');
						return $this->redirect()->toRoute('edit_statistic_report', ['statisticReportId' => $statisticReportId]);
					}
				}
			}

			$statisticReportForm->get('files')->setValueOptions($fileArr);

			$config = $this->getConfig();

			$page = (int)$this->params()->fromPost('page', 1);
			$rowCount = $config['GL_ITEMS_PER_PAGE'];

			$params = [
				'cp' 			=> $page,
				'rowCount' 		=> $rowCount,
				'totalCount' 	=> false
			];

			$registerList = $this->cacheService->getRegisterAbbreviationList();

			return new ViewModel([
				'statisticObj'			=> $statisticObj,
				'statisticReportObj'	=> $statisticReportObj,
				'statisticReportForm'	=> $statisticReportForm,
				'registerList'			=> $registerList,
				'params'				=> $this->params(),
				'fileName' 				=> $statisticReportObj->getFileName(),
				'fileSize' 				=> $statisticReportObj->getFileSize(),
				'fileArr'				=> $fileArr,
				'isDeletedOriginalFile' => empty($deletedFiles) ? true : false
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Функционалност "Изтриване на статистически отчет".
	 *
	 * @return Response HTTP отговор.
	 */
	public function deleteStatisticReportAction() {

		$staisticReportId = $this->params()->fromRoute('statisticReportId');

		$params = [
			'statisticReportIdList' => [$staisticReportId]
		];

		if ($baseObj = $this->statsDM->getStatisticReportList($totalCount, $params)->current()) {

			if (self::STATISTIC_REPORT_STATUS[$baseObj->getStatus()] != 'EP_STATISTICS_REPORT_STATE_LOADED_L') {

				$this->flashMessenger()->addErrorMessage('EP_STATISTICS_REPORT_NO_DELETED_L');

				return $this->redirect()->toRoute(
					'statistic_report_list',
					['statisticId' => $baseObj->getStatisticId()],
					['query' => $this->params()->fromQuery()]
				);
			}

 			if ($this->statsDM->deleteStaisticReportById($staisticReportId))
 				$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');
 			else
 				$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

 			return $this->redirect()->toRoute(
	 					'statistic_report_list',
	 					['statisticId' => $baseObj->getStatisticId()],
	 					['query' => $this->params()->fromQuery()]
 					);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Функционалност "Смяна на статус на статистически отчет".
	 *
	 * @return Response HTTP отговор.
	 */
	public function changeStatisticReportStatusAction() {

		$staisticReportId = $this->params()->fromRoute('statisticReportId');

		$params = [
			'statisticReportIdList' => [$staisticReportId]
		];

		$status = '';

		if ($baseObj = $this->statsDM->getStatisticReportList($totalCount, $params)->current()) {

			switch (self::STATISTIC_REPORT_STATUS[$baseObj->getStatus()]) {
				case 'EP_STATISTICS_REPORT_STATE_LOADED_L':
				case 'EP_STATISTICS_REPORT_STATE_UNPUBLIC_L':
					$status = array_search('EP_STATISTICS_REPORT_STATE_PUBLIC_L', self::STATISTIC_REPORT_STATUS);
				break;

				case 'EP_STATISTICS_REPORT_STATE_PUBLIC_L':
					$status = array_search('EP_STATISTICS_REPORT_STATE_UNPUBLIC_L', self::STATISTIC_REPORT_STATUS);
				break;
			}

			if ($this->statsDM->changeStatisticStatus($staisticReportId, $status)) {

				$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');

				$request = $this->getRequest();

				if ($request->isPost()) {

					$sendMail = $this->params()->fromPost('send-email');

					if ($sendMail) { // Изпращане на имейл

						$userList = $this->userDM->getUserList($totalCount, ['bulletinAcceptance' => [1,2], 'status' => 1], true);

						$userEmailList = [];

						foreach ($userList as $user)
							$userEmailList[] = ['DisplayName' => (!empty($user->getFirstName()) && !empty($user->getFamilyName()) ? $user->getFirstName().' '.$user->getFamilyName() : $user->getEmail()), 'Address' => $user->getEmail(), 'Type' => 1];

						$statisticObj = $this->statsDM->getStatisticList($totalCount, ['id_statistic_list' => [$baseObj->getStatisticId()]])->current();

						$registerList = $this->cacheService->getRegisterAbbreviationList();

						$config = $this->getConfig();

						$emailParams = [
							'template' 	=> 9,
							'recipient' => $userEmailList,
							'params' 	 => [
								'{STATISTIC_NAME}' => $statisticObj->getName(),
								'{REGISTER_NAME}' => $this->translator->translate(array_search($statisticObj->getRegisterId(), $registerList)),
								'{DATE_FROM}' => date('d.m.Y', strtotime($baseObj->getDateFrom())),
								'{DATE_TO}' => date('d.m.Y', strtotime($baseObj->getDateTo())),
								'{STATISTIC_REPORT_URL}' => \Application\Service\AppService::getFEUrl($config).'load-report-document/'.$baseObj->getstatisticReportId(),
								'{USER_PROFILE_LINK}' => \Application\Service\AppService::getFEUrl($config).'user-profile'
							]
						];

						if (!$this->restService->sendEmail($emailParams['template'], $emailParams['recipient'], $emailParams['params']))
							throw new \Exception('E-mail API error: {emailTemplate: '.$emailParams['template'].', email: '.implode(', ', $emailParams['recipient']).'}');
					}

				}

			}

			return $this->redirect()->toRoute(
					'statistic_report_list',
					['statisticId' => $baseObj->getStatisticId()],
					['query' => $this->params()->fromQuery()]
			);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Функционалност "Сваляне на файл с статистически отчет".
	 */
	public function statisticReportFileDownloadAction() {

		$staisticReportId = $this->params()->fromRoute('statisticReportId');

		$params = [
			'totalCount' 	=> false,
			'statisticReportIdList' => [$staisticReportId]
		];

		$baseObj = $this->statsDM->getStatisticReportList($totalCount, $params)->current();

		$config = $this->getConfig();

		if ($statisticReportContent = $this->statsDM->getStatisticReportFileById($staisticReportId))
			return \Document\Service\DocumentService::getFileFromDatabase($baseObj, $statisticReportContent);

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

	/**
	 * Променя подредбата на статистики.
	 *
	 * @param array $statsIdList Масив с идентификатори на статистики.
	 * @param int $registerId Идентификатор на регистър.
	 * @return bool Резултат от операцията.
	 */
	public function reorderItem($statsIdList, $registerId) {
		return $this->statsDM->reorderStatisticList($statsIdList, $registerId);
	}

	/**
	 * Обновява превод на етикет.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateStatisticI18n() {

		$config = $this->getConfig();

		$languageId = $this->language()->getId();

		if ($id = $this->params()->fromPost('id')) {

			$params = [
					'cp' 					=> 1,
					'rowCount' 				=> $config['GL_ITEMS_PER_PAGE'],
					'totalCount' 			=> false,
					'loadSeparateValueI18n' => true,
					'id_statistic_list' 	=> [$id],
					'langId'				=> $languageId
			];

			if ($statisticObj = $this->statsDM->getStatisticList($totalCount, $params)->current()) {

				if (!$this->isAllowed('statistic_list_translate')) {
					return new JsonModel([
						'status' 	=> 'error-td',
						'errors' 	=> [['edit-value-'.$labelObj->getlabelId() => $this->translator->translate('GL_ERROR_L')]]
					]);
				}

				// Обновяване на превод
				if ($statisticObj->getIsTranslated()) {
					$statisticObj->setNameI18n($this->params()->fromPost('value'));
					$this->statsDM->updateStatisticI18n($statisticObj, $languageId);
				}

				// Добавяне на нов превод
				else {
					$statisticObj->setNameI18n($this->params()->fromPost('value'));
					$this->statsDM->addStatisticI18n($statisticObj, $languageId);
				}

				return new JsonModel([
						'status' => 'success',
				]);
			}
		}
		return new JsonModel([
				'status' => 'error',
		]);
	}

}
