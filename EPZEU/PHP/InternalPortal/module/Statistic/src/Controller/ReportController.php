<?php

namespace Statistic\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style;

/**
 * Контролер реализиращ функционалности за работа със административни справки за потребители.
 *
 * @package Statistic
 * @subpackage Controller
 */
class ReportController extends AbstractActionController {

	/**
	 * Автентикация с потребителско име и парола.
	 *
	 * @var int
	 */
	CONST USER_AUTH_PASSWORD = 1;


	/**
	 * Автентикация през активна директория.
	 *
	 * @var int
	 */
	CONST USER_AUTH_ACTIVE_DIRECTORY = 2;


	/**
	 * Обект за поддържане и съхранение на обекти от тип справки.
	 *
	 * @var \Statistic\Data\ReportDataManager
	 */
	protected $reportDM;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Услуга за локализация на интерфейс.
	 *
	 * @var MvcTranslator
	 */
	protected $translator;


	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


	/**
	 * Конструктор.
	 *
	 * @param \Statistic\Data\ReportDataManager $reportDM Обект за поддържане и съхранение на справки.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 *
	 */
	public function __construct($reportDM, $userDM, $translator, $cacheService) {
		$this->reportDM = $reportDM;
		$this->userDM = $userDM;
		$this->translator = $translator;
		$this->cacheService = $cacheService;
	}


	/**
	 * Функционалност "Списък за статистически отчет за потребителите със специален достъп".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function reportUserListAction() {

		$routeMatch = $this->getEvent()->getRouteMatch();
		$routeName = $routeMatch->getMatchedRouteName();

		$typeUserReport = $routeName == 'report_admin_user_list' ? 'admin' : 'public';

		$exportExcel = $this->params()->fromRoute('isExport', null);

		$userStatusList = $this->cacheService->getUserStatusList();

		$unverifiedStatusKey = array_search('EP_USR_00007_E', $userStatusList);

		if ($unverifiedStatusKey !== false)
			unset($userStatusList[$unverifiedStatusKey]);

		$permissionsGroupList = array_flip($this->cacheService->getPermissionsGroupList());

		$specAccessPermissionGroupId = array_search('EP_USR_SPEC_RIGHTS_L', $permissionsGroupList);
		$freePermissionGroupId = array_search('EP_USR_FREE_ACC_RIGHTS_L', $permissionsGroupList);
		$adminPermissionGroupId = array_search('GL_CHOICE_ALL_L', $permissionsGroupList);

		$permissionArr = [];
		$permissionArr = $this->userDM->getPermissions(false, true);

		$specialAccessUserTypes = [];

		// потребители на вътрешен портал
		if ($typeUserReport == 'admin') {

			$params['permissionGroupList'][] = $adminPermissionGroupId;

			$params['userАuthenticationТype'] = self::USER_AUTH_ACTIVE_DIRECTORY;

			if (!empty($specAccessPermissionGroupId) && !empty($permissionArr) && array_key_exists($specAccessPermissionGroupId, $permissionArr))
				unset($permissionArr[$specAccessPermissionGroupId]);

			if (!empty($freePermissionGroupId) && !empty($permissionArr) && array_key_exists($freePermissionGroupId, $permissionArr))
				unset($permissionArr[$freePermissionGroupId]);

			$permissionList = [];
			$permissionList = array_key_exists($adminPermissionGroupId, $permissionArr) ? $permissionArr[$adminPermissionGroupId] : [];
		}

		// потребители на публичен портал
		else if ($typeUserReport == 'public') {

			$params['permissionGroupList'][] = $specAccessPermissionGroupId;
			$params['permissionGroupList'][] = $freePermissionGroupId;

			$params['userАuthenticationТype'] = self::USER_AUTH_PASSWORD;

			if (!empty($adminPermissionGroupId) && !empty($permissionArr) && array_key_exists($adminPermissionGroupId, $permissionArr))
				unset($permissionArr[$adminPermissionGroupId]);

			$permissionList = [];
			$permissionList = (array_key_exists($specAccessPermissionGroupId, $permissionArr) ? $permissionArr[$specAccessPermissionGroupId] : []) + (array_key_exists($freePermissionGroupId, $permissionArr) ? $permissionArr[$freePermissionGroupId] : []);

			$specialAccessUserTypes = $this->userDM->getSpecialAccessUserTypes();
		}

		// Търсене
		$searchForm = new \Statistic\Form\ReportUserForm();

		$searchForm->get('permissionId')->setValueOptions(["" => 'GL_CHOICE_ALL_L'] + $permissionList);
		$searchForm->get('status')->setValueOptions(["" => 'GL_CHOICE_ALL_L'] + $userStatusList);

		$searchParams =$this->params()->fromQuery();

		$searchForm->setData($searchParams);

		$data = [];
		$reportUserList = [];

		if (!empty($searchParams['search'])) {

			if ($searchForm->isValid()) {
				$data = $searchForm->getData();
				$reportUserList = $this->reportDM->getReportUserList($params+$data);
			}
		}

		else
			$reportUserList = $this->reportDM->getReportUserList($params);

		if (!empty($exportExcel))
			return $this->exportExcel(($params+$data), $typeUserReport);

		return new ViewModel([
			'params' 					=> $this->params(),
			'searchForm' 				=> $searchForm,
			'reportUserList' 			=> $reportUserList,
			'permissionList' 			=> !empty($permissionList) ? $permissionList : [],
			'specialAccessUserTypes' 	=> $specialAccessUserTypes,
			'userStatusList'			=> $userStatusList,
			'typeUserReport'			=> $typeUserReport
		]);
	}


	/**
	 * Експорт на справка за статистически отчет за потребителите със специален достъп в Excel
	 *
	 * @param array $params Масив с параметри.
	 * @param int $typeUserReport Тип на потребителите на справката
	 */
	public function exportExcel($params, $typeUserReport) {

		$reportUserList = $this->reportDM->getReportUserList($params);

		$userStatusList = $this->cacheService->getUserStatusList();

		$permissionsGroupList = array_flip($this->cacheService->getPermissionsGroupList());

		$specAccessPermissionGroupId = array_search('EP_USR_SPEC_RIGHTS_L', $permissionsGroupList);
		$freePermissionGroupId = array_search('EP_USR_FREE_ACC_RIGHTS_L', $permissionsGroupList);
		$adminPermissionGroupId = array_search('GL_CHOICE_ALL_L', $permissionsGroupList);

		$permissionArr = [];
		$permissionArr = $this->userDM->getPermissions(false, true);

		$specialAccessUserTypes = [];

		// потребители на вътрешен портал
		if ($typeUserReport == 'admin') {

			if (!empty($specAccessPermissionGroupId) && !empty($permissionArr) && array_key_exists($specAccessPermissionGroupId, $permissionArr))
				unset($permissionArr[$specAccessPermissionGroupId]);

			if (!empty($freePermissionGroupId) && !empty($permissionArr) && array_key_exists($freePermissionGroupId, $permissionArr))
				unset($permissionArr[$freePermissionGroupId]);

			$permissionList = [];
			$permissionList = array_key_exists($adminPermissionGroupId, $permissionArr) ? $permissionArr[$adminPermissionGroupId] : [];

			$titleReport = 'EP_USR_QUERY_INTERNAL_PORTAL_USRS_L';
		}

		// потребители на публичен портал
		else if ($typeUserReport == 'public') {

			if (!empty($adminPermissionGroupId) && !empty($permissionArr) && array_key_exists($adminPermissionGroupId, $permissionArr))
				unset($permissionArr[$adminPermissionGroupId]);

			$permissionList = [];
			$permissionList = (array_key_exists($specAccessPermissionGroupId, $permissionArr) ? $permissionArr[$specAccessPermissionGroupId] : []) + (array_key_exists($freePermissionGroupId, $permissionArr) ? $permissionArr[$freePermissionGroupId] : []);

			$specialAccessUserTypes = $this->userDM->getSpecialAccessUserTypes();

			$titleReport = 'EP_USR_QUERY_SPEC_ACCESS_USRS_L';
		}

		$lastColumnIndex = $typeUserReport == 'public' ? \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($permissionList)+5) : \PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex(count($permissionList)+4);
		$permissionColumnIndex = $typeUserReport == 'public' ? 5 : 4;

		$styleArrayHeaderTable = array(
				'font' => array('bold' => true),
				'fill' => ['fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID, 'color' => ['argb' => 'dddddd']]
		);

		// Create new PHPExcel object
		$objPHPExcel = new Spreadsheet();

		// първа страница с критерии
		$row = 1;
		$column = 1;

		$objPHPExcel->setActiveSheetIndex(0);

		$objWorksheet = $objPHPExcel->getActiveSheet();

		$objWorksheet->mergeCellsByColumnAndRow(1, $row, 2, $row);
		$objWorksheet->getColumnDimensionByColumn(1)->setWidth(35);
		$objWorksheet->getColumnDimensionByColumn(2)->setWidth(50);

		$objWorksheet->setCellValueByColumnAndRow(1, $row++, $this->translator->translate($titleReport));

		$objWorksheet->mergeCellsByColumnAndRow(1, $row, 2, $row);
		$objWorksheet->setCellValueByColumnAndRow(1, $row++, '');

		$objWorksheet->mergeCellsByColumnAndRow(1, $row, 2, $row);
		$objWorksheet->setCellValueByColumnAndRow(1, $row++, $this->translator->translate('GL_CRITERIA_L'));

		$objWorksheet->setCellValueByColumnAndRow(1, $row, $this->translator->translate('EP_STATISTICS_START_DATE').':');
		$objWorksheet->setCellValueByColumnAndRow(2, $row, (!empty($params['dateFrom']) ? $params['dateFrom'] : ''));
		$row++;

		$permissionName = !empty($params['permissionId']) && in_array($params['permissionId'], array_keys($permissionList)) ? $permissionList[$params['permissionId']] : $this->translator->translate('GL_CHOICE_ALL_L');
		$objWorksheet->setCellValueByColumnAndRow(1, $row, $this->translator->translate('EP_STATISTICS_REP_SPEC_ACCESS_USRS_7_L').':');
		$objWorksheet->setCellValueByColumnAndRow(2, $row, $permissionName);
		$row++;

		$statusName = !empty($params['status']) && in_array($params['status'], array_keys($userStatusList)) ? $userStatusList[$params['status']] : $this->translator->translate('GL_CHOICE_ALL_L');
		$objWorksheet->setCellValueByColumnAndRow(1, $row, $this->translator->translate('GL_CONDITION_L').':');
		$objWorksheet->setCellValueByColumnAndRow(2, $row, $this->translator->translate($statusName));
		$row++;

		$objWorksheet->getStyle('A1:A'.$row)->getFont()->setBold(true);
		$objWorksheet->getStyle('B1:B'.$row)->getAlignment()->setWrapText(true);

		$objWorksheet->setSelectedCell('A1');
		$objWorksheet->setTitle($this->translator->translate('GL_CRITERIA_L'));

		// втора страница с резултат
		$objPHPExcel->createSheet(1);

		$objPHPExcel->setActiveSheetIndex(1);

		$objWorksheet = $objPHPExcel->getActiveSheet();

		$objWorksheet->getStyle('A1:'.$lastColumnIndex.'2')->applyFromArray($styleArrayHeaderTable);

		$column = 1;

		$objWorksheet->mergeCellsByColumnAndRow($column, 1, $column, 2);
		$objWorksheet->getColumnDimensionByColumn($column++)->setWidth(40);

		$objWorksheet->mergeCellsByColumnAndRow($column, 1, $column, 2);
		$objWorksheet->getColumnDimensionByColumn($column++)->setWidth(20);

		$objWorksheet->mergeCellsByColumnAndRow($column, 1, $column, 2);
		$objWorksheet->getColumnDimensionByColumn($column++)->setWidth(20);

		if ($typeUserReport == 'public') {
			$objWorksheet->mergeCellsByColumnAndRow($column, 1, $column, 2);
			$objWorksheet->getColumnDimensionByColumn($column++)->setWidth(50);
		}

		$objWorksheet->mergeCellsByColumnAndRow($column, 1, $column+count($permissionList)-1, 1);

		$row = 1;
		$column = 1;

		// заглавен ред на таблицата
		$objWorksheet->setCellValueByColumnAndRow($column++, $row, ($typeUserReport == 'admin' ? $this->translator->translate('GL_USER_NAME_L') : $this->translator->translate('GL_EMAIL_L')))
					->setCellValueByColumnAndRow($column++, $row, $this->translator->translate('GL_CONDITION_L'))
					->setCellValueByColumnAndRow($column++, $row, $this->translator->translate('EP_USR_CUSTOMER_ID_L'));

		if ($typeUserReport == 'public') {
			$objWorksheet->setCellValueByColumnAndRow($column++, $row, $this->translator->translate('EP_USR_EXTRENAL_USER_KIND_L'));
		}

		$objWorksheet->setCellValueByColumnAndRow($column++, $row, $this->translator->translate('EP_USR_USER_RIGHTS_L'));

		$row++;

		foreach($permissionList as $permission) {
			$objWorksheet->getColumnDimensionByColumn($permissionColumnIndex)->setWidth(20);
			$objWorksheet->setCellValueByColumnAndRow($permissionColumnIndex++, 2, $permission);
		}

		$objWorksheet->mergeCellsByColumnAndRow($permissionColumnIndex, 1, $permissionColumnIndex, 2);
		$objWorksheet->setCellValueByColumnAndRow($permissionColumnIndex, 1, $this->translator->translate('GL_CREATE_UPDATE_DATE_L'));
		$objWorksheet->getColumnDimensionByColumn($permissionColumnIndex)->setWidth(20);

		$row++;

		foreach ($reportUserList as $item) {

			$column = 1;

			$objWorksheet->setCellValueByColumnAndRow($column++, $row, ($typeUserReport == 'admin' ? $item->getUsername() : $item->getEmail()))
						->setCellValueByColumnAndRow($column++, $row, $this->translator->translate($userStatusList[$item->getStatus()]))
						->setCellValueByColumnAndRow($column++, $row, $item->getCin());

			if ($typeUserReport == 'public') {
				$objWorksheet->setCellValueByColumnAndRow($column++, $row, (!empty($item->getSpecialAccessUserType()) ? $specialAccessUserTypes[$item->getSpecialAccessUserType()] : ''));
			}

			$userPermissionList = [];
			$userPermissionList = explode(',', str_replace(['{', '}'], ['', ''], $item->getPermissions()));

			foreach($permissionList as $permissionId => $permission) {
				$objWorksheet->setCellValueByColumnAndRow($column++, $row, in_array($permissionId, $userPermissionList) ? $this->translator->translate('GL_OK_L') : $this->translator->translate('GL_NO_L'));
			}

			$objWorksheet->setCellValueByColumnAndRow($column++, $row, (new \DateTime($item->getUpdatedOn()))->format('d.m.Y H:i'));

			$row++;
		}

		$endRowTable = $row - 1;

		$objWorksheet->getStyle('A1:'.$lastColumnIndex.$endRowTable)->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

		$objWorksheet->getStyle('A1:'.$lastColumnIndex.$endRowTable)->getAlignment()->setWrapText(true);

		$objWorksheet->freezePane('B3');

		$objWorksheet->setTitle($this->translator->translate('GL_RESULT_L'));

		$objPHPExcel->setActiveSheetIndex(0);

		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Expires: '.gmdate('D, d M Y H:i:s').' GMT');
		header('Cache-Control: no-store, no-cache, private, must-revalidate, max-age=0');
		header('Cache-Control: post-check=0, pre-check=0', false);
		header('Pragma: no-cache');
		header('Content-Disposition: attachment; filename="report_user_list.xlsx"');

		$objWriter = new Xlsx($objPHPExcel);
		$objWriter->save('php://output');

		// изчистване на данните от паметта

		$objPHPExcel->disconnectWorksheets();

		unset($objPHPExcel);

		exit;
	}
}