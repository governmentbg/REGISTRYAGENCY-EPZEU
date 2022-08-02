<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Box\Spout\Writer\Style\StyleBuilder;
use Zend\Validator\ValidatorChain;
use Application\Override\Spout\Writer;
use Box\Spout\Common\Helper\GlobalFunctionsHelper;
use User\Entity\AuditEntity;

/**
 * Контролер реализиращ функционалности за работа с одитна информация.
 *
 * @package User
 * @subpackage Controller
 */
class AuditController extends AbstractActionController {

	const AUDIT_TYPE_UI = 1;

	const AUDIT_TYPE_EXCEL = 2;

	const MAX_EXCEL_ROWS = 1000000;

	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


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
	 * Конструктор.
	 *
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 */
	public function __construct($userDM, $userService, $cacheService, $translator) {
		$this->userDM = $userDM;
		$this->userService = $userService;
		$this->cacheService = $cacheService;
		$this->translator = $translator;
	}

	/**
	 * Проверява дали потребител с роля "Служебен достъп до одитна информация" е логнат с КЕП/сертификат или ПИН/ПИК.
	 *
	 * @return mixed bool|ViewModel Контейнер с данни за презентационния слой.
	 */
	public function isIdentifiableUser() {

		$user = $this->userService->getUser();

		$roleList = $user->getPermissionList();

		if (!$user->getIsIdentifiableUser() && !in_array('EP_AUDIT', $roleList)) {
			$result = new ViewModel([]);
			$result->setTemplate('user/audit/not-identifiable-user.phtml');
			return $result;
		}

		return true;
	}

	/**
	 * Функционалност "Преглед на одитна информация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function auditListAction() {

		if ($this->isIdentifiableUser() !== true)
			return $this->isIdentifiableUser();

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getAuditList();
		}

		$auditForm = new \User\Form\AuditForm();

		$moduleList = $this->cacheService->getModuleList();
		$auditForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $moduleList);

		$objectTypeList = array_flip($this->cacheService->getAuditObjectNameTypes());
		$auditForm->get('objectType')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $objectTypeList);

		$actionTypeList = array_flip($this->cacheService->getAuditActionNameTypes());
		$auditForm->get('event')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $actionTypeList);

		$functionalityList = $this->cacheService->getFunctionalityList();
		$auditForm->get('functionality')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $functionalityList);

		$config = $this->getConfig();
		$page = (int)$this->params()->fromQuery('page', 1);

		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$totalCount = 0;

		$auditList = [];

		$actionType = $this->params()->fromQuery('actionType');
		$isSearch 	= $this->params()->fromQuery('search');

		if ($isSearch) {

			$params = [
				'cp' 		=> $page,
				'row_count' => $rowCount,
			];

			if ($actionType == self::AUDIT_TYPE_UI) {
				$auditForm->getInputFilter()->get('dateFrom')->setRequired(true);
				$auditForm->getInputFilter()->get('dateTo')->setRequired(true);

				$dateIntervalValidator = new \Application\Validator\DateDifferenceValidator([
					'token' => 'dateTo',
					'daysPeriod' => 31
				]);

				$dateIntervalValidatorChain = new ValidatorChain();
				$dateIntervalValidatorChain->attach($dateIntervalValidator);

				$auditForm->getInputFilter()->get('dateFrom')->getValidatorChain()->attach($dateIntervalValidatorChain);

				$params['export_excel'] = false;

			}

			$queryParams = array_map('trim', $this->params()->fromQuery());

			$auditForm->setData($queryParams);

			if ($auditForm->isValid()) {

				if ($actionType == self::AUDIT_TYPE_EXCEL) {

					$params['row_count'] = self::MAX_EXCEL_ROWS;

					$params['load_additional_data'] = true;

					$auditList = $this->userDM->getAuditList($totalCount, $queryParams+$params, true);

					if ($auditList->count())
						return $this->exportExcel($auditList);
				}
				else
					$auditList = $this->userDM->getAuditList($totalCount, $queryParams+$params);
			}

		}

		$userEmail = null;

		if ($userId = $this->params()->fromQuery('userId')) {
			$userObj = $this->userDM->getUserList($userCount, ['id' => $userId, 'total_count' => false]);
			$userEmail = $userObj->getEmail();
		}

		$loginSession = $this->params()->fromQuery('loginSession');

		return new ViewModel([
			'actionType'		=> $actionType,
			'auditForm'			=> $auditForm,
			'totalCount'		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount),
			'auditList'			=> $auditList,
			'moduleList'		=> $moduleList,
			'functionalityList'	=> $functionalityList,
			'objectTypeList'	=> $objectTypeList,
			'actionTypeList'	=> $actionTypeList,
			'userEmail'			=> $userEmail,
			'loginSession'		=> $loginSession,
			'searchType'		=> $this->params()->fromQuery('searchType')
		]);
	}

	/**
	 * Взима списък с одит.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getAuditList() {

		$moduleList = $this->cacheService->getModuleList();
		$objectTypeList = array_flip($this->cacheService->getAuditObjectNameTypes());
		$actionTypeList = array_flip($this->cacheService->getAuditActionNameTypes());
		$functionalityList = $this->cacheService->getFunctionalityList();

		$config = $this->getConfig();
		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'row_count' 	=> $rowCount,
			'total_count'	=> false
		];

		$queryParams = array_map('trim', $this->params()->fromQuery());

		$auditList = $this->userDM->getAuditList($totalCount, $queryParams+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'auditList'			=> $auditList,
			'moduleList'		=> $moduleList,
			'functionalityList'	=> $functionalityList,
			'objectTypeList'	=> $objectTypeList,
			'actionTypeList'	=> $actionTypeList,
			'searchType'		=> $queryParams['searchType']
		]);

		$result->setTemplate('user/audit/audit-list-partial.phtml');

		return $result;
	}

	/**
	 * Експорт на справка за одит в Excel
	 *
	 * @param array $auditData
	 */
	public function exportExcel($auditData) {

		ini_set('max_execution_time', 600);

		$moduleList = $this->cacheService->getModuleList();
		$objectTypeList = array_flip($this->cacheService->getAuditObjectNameTypes());
		$actionTypeList = array_flip($this->cacheService->getAuditActionNameTypes());
		$functionalityList = $this->cacheService->getFunctionalityList();


		$moduleList = $this->cacheService->getModuleList();
		$objectTypeList = array_flip($this->cacheService->getAuditObjectNameTypes());
		$actionTypeList = array_flip($this->cacheService->getAuditActionNameTypes());
		$functionalityList = $this->cacheService->getFunctionalityList();

		$module = '';
		if ($this->params()->fromQuery('moduleId') && array_key_exists($this->params()->fromQuery('moduleId'), $moduleList))
			$module = $moduleList[$this->params()->fromQuery('moduleId')];

		$functionality = '';
		if ($this->params()->fromQuery('functionality') && array_key_exists($this->params()->fromQuery('functionality'), $functionalityList))
			$functionality = $functionalityList[$this->params()->fromQuery('functionality')];

		$objectType = '';
		if ($this->params()->fromQuery('objectType') && array_key_exists($this->params()->fromQuery('objectType'), $objectTypeList))
			$objectType = $objectTypeList[$this->params()->fromQuery('objectType')];


		$event = '';
		if ($this->params()->fromQuery('event') && array_key_exists($this->params()->fromQuery('event'), $actionTypeList))
			$event = $actionTypeList[$this->params()->fromQuery('event')];

		$userEmail = '';
		if ($userId = $this->params()->fromQuery('userId')) {
			if ($userObj = $this->userDM->getUserList($userCount, ['id' => $userId, 'total_count' => false]))
				$userEmail = $userObj->getEmail();
		}

		$writer = new Writer();

		$sheetParams = ['cols' => [30, 19]];
		$writer::setSheetParams($sheetParams);

		$writer->setGlobalFunctionsHelper(new GlobalFunctionsHelper());

		$writer->setTempFolder('./data/tmp/');
		$writer->setShouldUseInlineStrings(true);

		$writer->openToBrowser("audit-report-".date('Ymd').".xlsx");

		$firstSheet = $writer->getCurrentSheet();
		$firstSheet->setName($this->translator->translate('GL_CRITERIA_L'));
		$writer->addRow([$this->translator->translate('GL_PERIOD_L').' '.$this->translator->translate('GL_START_DATE_L'), $this->params()->fromQuery('dateFrom').' '.$this->params()->fromQuery('timeFrom')]);
		$writer->addRow([$this->translator->translate('GL_PERIOD_L').' '.$this->translator->translate('GL_END_DATE_L'), $this->params()->fromQuery('dateTo').' '.$this->params()->fromQuery('timeTo')]);
		$writer->addRow([$this->translator->translate('EP_NOM_PORTAL_IS_L'), $module]);
		$writer->addRow([$this->translator->translate('EP_NOM_MODULE_FUNCTIONALITY_L'), $functionality]);
		$writer->addRow([$this->translator->translate('EP_ODIT_TYPE_OBJECT_L'), $objectType]);
		$writer->addRow([$this->translator->translate('EP_ODIT_OBJECT_L'), $this->params()->fromQuery('key')]);
		$writer->addRow([$this->translator->translate('EP_ODIT_EVENT_L'), $event]);
		$writer->addRow([$this->translator->translate('GL_ACTION_USER_L'), $userEmail]);
		$writer->addRow([$this->translator->translate('GL_LOGIN_SESSION_L'), $this->params()->fromQuery('loginSession')]);
		$writer->addRow([$this->translator->translate('GL_IP_ADDRESS_L'), $this->params()->fromQuery('ipAddress')]);

		$sheetParams = ['cols' => [32, 24, 32, 35, 28, 25, 38, 36, 16, 36, 52]];
		$writer::setSheetParams($sheetParams);

		$newSheet = $writer->addNewSheetAndMakeItCurrent();
		$newSheet->setName($this->translator->translate('GL_RESULT_L'));
		$style = (new StyleBuilder())
				->setFontBold()
				->setShouldWrapText()
				->build();

		$writer->addRowWithStyle([
			$this->translator->translate('EP_ODIT_EVENT_DATE_TIME_L'),
			$this->translator->translate('EP_NOM_PORTAL_IS_L'),
			$this->translator->translate('EP_NOM_MODULE_FUNCTIONALITY_L'),
			$this->translator->translate('EP_ODIT_TYPE_OBJECT_L'),
			$this->translator->translate('EP_ODIT_OBJECT_L'),
			$this->translator->translate('EP_ODIT_EVENT_L'),
			$this->translator->translate('EP_ODIT_USER_SESSION_ID_L'),
			$this->translator->translate('GL_ACTION_USER_L'),
			$this->translator->translate('GL_IP_ADDRESS_L'),
			$this->translator->translate('GL_LOGIN_SESSION_L'),
			$this->translator->translate('GL_DETAILS_L'),
		], $style);


		foreach ($auditData as $auditArr) {
			$writer->addRow(
			[
					date("d.m.Y H:i:s", strtotime($auditArr['log_action_date'])),
					$moduleList[$auditArr['module_id']],
					$functionalityList[$auditArr['functionality_id']],
					$objectTypeList[$auditArr['object_type_id']],
					$auditArr['key'],
					$actionTypeList[$auditArr['action_type_id']],
					$auditArr['user_session_id'],
					$this->getUserInfo($auditArr),
					$auditArr['ip_address'],
					$this->getLoginSessionInfo($auditArr),
					trim($auditArr['additional_data'])
				]
			);
		}

		$writer->close();

		exit;

	}

	/**
	 * Функционалност "Преглед на детайлна информация на одитен запис".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewAdditionalDataAction() {

		if ($this->isIdentifiableUser() !== true)
			return $this->isIdentifiableUser();

		$auditId = $this->params()->fromRoute('auditId');

		$additionalData = [];

		$searchType = $this->params()->fromRoute('searchType');

		if ($auditObj = $this->userDM->getAuditList($totalCount, ['idList' => [$auditId], 'cp' => 1, 'row_count' => 1, 'load_additional_data' => true, 'searchType' => $searchType])->current()) {

			if ($auditObj->getAdditionalData()) {
				$additionalData = json_decode($auditObj->getAdditionalData());
			}
		}

		$this->layout('layout/layout-no-header');

		return new ViewModel([
			'auditObj'			=> $auditObj,
			'additionalData'	=> $additionalData,
			'objectTypeList'	=> array_flip($this->cacheService->getAuditObjectNameTypes()),
			'actionTypeList' 	=> array_flip($this->cacheService->getAuditActionNameTypes())
		]);
	}


	/**
	 * Форматира текст от JSON
	 *
	 * @param string $json
	 * @return string
	 */
	public static function parseJsonToNl($json) {

		$json = json_decode($json);

		if (json_last_error() !== JSON_ERROR_NONE)
			return '';

		$string = '';

		foreach ($json as $k => $v) {

			$string .= $k.': ';

			if (is_object($v)) {
				$string .= implode(', ', (array)$v);
			}

			else {
				if (!empty($v))
					$string .= $v;
			}

			$string .= "\n";
		}

		return $string;
	}


	/**
	 * Взима информация за потребител.
	 *
	 * @param array $auditObj
	 * @return string
	 */
	public function getUserInfo(array $auditArr) {

		if ($auditArr['is_system'])
			return $auditArr['email'];

		$userInfo = $auditArr['username'] ? $auditArr['username'] : $auditArr['email'];

		if ($auditArr['cin'])
			$userInfo .= "\n".$this->translator->translate('EP_USR_CUSTOMER_ID_L').': '.$auditArr['cin'];

		if ($auditArr['first_name'] || $auditArr['middle_name'] || $auditArr['family_name'])
			$userInfo .= "\n".$auditArr['first_name'].' '.$auditArr['middle_name'].' '.$auditArr['family_name'];

		return $userInfo;
	}

	/**
	 * Взима информация за потребителска сесия.
	 *
	 * @param array $auditObj
	 * @return string
	 */
	public function getLoginSessionInfo($auditArr) {

		$loginSession = $auditArr['login_session_id'];

		if (isset($auditArr['authentication_type']) && $auditArr['authentication_type'] == \User\Controller\UserController::USER_AUTH_CERTIFICATE) {
			$loginSession .= "\n".$this->translator->translate('EP_ODIT_NUMBER_SERTIFICATE_KEP_PIC_L').': '.$auditArr['serial_number'];
			$loginSession .= "\n".$this->translator->translate('EP_ODIT_PUBLISHER_L').': '.$auditArr['issuer'];
			$loginSession .= "\n".$this->translator->translate('EP_VALIDITY_PERIOD_FROM_L').': '.$auditArr['not_after'];
			$loginSession .= "\n".$this->translator->translate('EP_OTHER_INFORMATION_L').': '.$auditArr['subject'];
		}

		return $loginSession;
	}


}