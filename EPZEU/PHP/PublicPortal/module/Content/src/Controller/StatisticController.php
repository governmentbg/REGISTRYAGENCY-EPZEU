<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа със статистики.
 *
 * @package Content
 * @subpackage Controller
 */
class StatisticController extends AbstractActionController {

	const STATISTIC_REPORT_STATUS = [
		1 => 'EP_STATISTICS_REPORT_STATE_LOADED_L',
		2 => 'EP_STATISTICS_REPORT_STATE_PUBLIC_L',
		3 => 'EP_STATISTICS_REPORT_STATE_UNPUBLIC_L'
	];

	/**
	 * Обект за поддържане и съхранение на обекти от тип "Статистики".
	 *
	 * @var \Content\Data\StatisticDataManager
	 */
	protected $statsDM;

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
	 * @param \Content\Data\StatisticManager $statsDM Обект за поддържане и съхранение на обекти от тип Статистики.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 */
	public function __construct($statsDM, $cacheService, $userService) {
		$this->statsDM = $statsDM;
		$this->cacheService = $cacheService;
		$this->userService = $userService;
	}

	/**
	 * Функционалност "Списък със статистики".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function statisticListAction() {

		$request = $this->getRequest();

		$languageId = $this->language()->getId();

		if ($request->isXmlHttpRequest()) {
			$statisticId = (int)$this->params()->fromPost('statisticId');
			return $this->getStatisticReportList($statisticId);
		}

		$registerType = $this->params()->fromRoute('registerType');

		$registerId = $this->cacheService->getRegisterList()[strtoupper($registerType)];

		if (!$statisticList = $this->cacheService->getResultsetFromCache('statisticList-'.$languageId.'-'.$registerId)) {

			$params = [
				'cp' 		=> 1,
				'rowCount' 	=> \Application\Module::APP_MAX_INT,
				'registerId' => $registerId,
			];

			$resultset = $this->statsDM->getStatisticList($totalCount, $languageId, $params);

			$statisticList = [];

			foreach ($resultset as $result)
				$statisticList[] = $result;

			$this->cacheService->addResultsetToCache('statisticList-'.$languageId.'-'.$registerId, $statisticList);
		}

		return new ViewModel([
			'registerType'	=> $registerType,
			'statisticList'	=> $statisticList,
			'userService'	=> $this->userService
		]);
	}

	/**
	 * Взима списък със статистики отчети.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getStatisticReportList(int $statisticId) {

		$params = [
			'cp' 			=> 1,
			'rowCount' 		=> \Application\Module::APP_MAX_INT,
			'totalCount' 	=> false,
			'statisticId'	=> $statisticId,
			'status'		=> array_search('EP_STATISTICS_REPORT_STATE_PUBLIC_L', self::STATISTIC_REPORT_STATUS)
		];

		$reportListArray = [];
		$itemsPerColumn = 0;

		if ($statisticReportList = $this->statsDM->getStatisticReportList($totalCount, $params)) {

			$itemsPerColumn = ceil($statisticReportList->count()/2);

			foreach ($statisticReportList as $report)
				$reportListArray[] = $report;

			$this->layout('layout/ajax');
		}

		$result = new ViewModel([
			'statisticReportList'	=> $reportListArray,
			'itemsPerColumn' 	=> $itemsPerColumn,
		]);

		$result->setTemplate('content/statistic/statistic-report-partial.phtml');

		return $result;
	}

	/**
	 * Функционалност "Зареждане на файл със статистически отчет".
	 *
	 * @return string Съдържание на файл.
	 */
	public function loadReportDocumentAction() {

		$statisticReportId = $this->params()->fromRoute('statisticReportId');

		$params = [
			'cp' 					=> 1,
			'rowCount' 				=> 1,
			'totalCount' 			=> false,
			'statisticReportIdList' => [$statisticReportId],
			'status'				=> array_search('EP_STATISTICS_REPORT_STATE_PUBLIC_L', self::STATISTIC_REPORT_STATUS)
		];

		if ($statisticReportObj = $this->statsDM->getStatisticReportList($totalCount, $params)->current()) {

			if ($statisticReportContent = $this->statsDM->getStatisticReportFileById($statisticReportId))
				return \Document\Service\DocumentService::getFileFromDatabase($statisticReportObj, $statisticReportContent, $statisticReportId);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}

}