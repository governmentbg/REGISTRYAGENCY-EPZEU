<?php

namespace Nomenclature\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\Validator\Date;
use Zend\Validator\ValidatorChain;
use Zend\InputFilter\InputFilter;
use User\Form\IntervalInputFilter;
use Content\Form\LabelaForm;
use Nomenclature\Form\AbcdeForm;
use Nomenclature\Form\ServiceSearchForm;

/**
 * Контролер реализиращ функционалности за работа с номенклатури.
 *
 * @package Nomenclature
 * @subpackage Controller
 */
class NomenclatureController extends AbstractActionController {


	/**
	 *
	 * @var int
	 */
	const SERVICE_TYPE_ORDINARY = 1;


	/**
	 * Масив с кодове на етикети с html съдържание.
	 *
	 * @var array
	 */
	const HTML_LABEL_LIST = [
			0 => 'CR_APP_INFORMED_AGREEMENT_TEXT_L',
			1 => 'PR_INFORMED_AGREEMENT_TEXT_L',
			2 => 'EP_SIGN_SRV_LOCL_NOTAVL_I'
	];


	/**
	 * Обект за поддържане и съхранение на обекти от тип Номенклатура.
	 *
	 * @var \Nomenclature\Data\NomenclatureDataManager
	 */
	protected $nomenclatureDM;


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
	 *  Конструктор.
	 *
	 * @param \Nomenclature\Data\NomenclatureDataManager $nomenclatureDM Обект за поддържане и съхранение на обекти от тип Номенклатура.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($nomenclatureDM, $translator, $cacheService) {
		$this->nomenclatureDM = $nomenclatureDM;
		$this->translator = $translator;
		$this->cacheService = $cacheService;
	}


	/**
	 * Функционалност "Списък с етикети".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function labelListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$type = $this->params()->fromRoute('type');

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getLabelList();

			elseif ($request->getPost('updateLabel')) {
				$result = $this->updateLabel();
				return $result;
			}
		}

		$searchForm = new \Nomenclature\Form\LabelSearchForm();

		$searchForm->setData($this->params()->fromQuery());

		$totalCount = 0;

		$params = [
			'cp' 					=> $page,
			'rowCount'		 		=> $rowCount,
			'loadDescription' 		=> true,
			'loadSeparateValueI18n' => true
		];

		$languageId = $this->language()->getId();

		$labelList = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $this->params()->fromQuery()+$params);

		$publicURL = $config['GL_EPZEU_PUBLIC_UI_URL'];

		return new ViewModel([
			'labelList'		=> $labelList,
			'totalCount'	=> $totalCount,
			'totalPages'	=> ceil($totalCount/$rowCount) ?: 1,
			'searchForm'	=> $searchForm,
			'lang'			=> $this->params()->fromRoute('lang'),
			'publicURL'		=> $publicURL,
			'htmlLabelList' => self::HTML_LABEL_LIST
		]);
	}


	/**
	 * Извлича списък с етикети при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLabelList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'loadDescription' 		=> true,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
			'withoutTranslation' 	=> $this->params()->fromPost('withoutTranslation')
		];

		$languageId = $this->language()->getId();

		$labelList = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $this->params()->fromQuery()+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'labelList' 	=> $labelList,
			'lang' 			=> $this->params()->fromRoute('lang'),
			'htmlLabelList' => self::HTML_LABEL_LIST
		));

		$result->setTemplate('nomenclature/nomenclature/label-list-partial.phtml');

		return $result;
	}


	/**
	 * Извлича списък с eтикети за превод при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLabelTranslateList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
				'cp' => $page,
				'rowCount' => $rowCount,
				'loadDescription' => true,
				'totalCount' => false,
				'loadSeparateValueI18n' => true,
				'withoutTranslation' => $this->params()->fromPost('withoutTranslation')
		];


		$languageId = $this->language()->getId();

		$labelList = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $this->params()->fromQuery()+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
				'labelList' => $labelList,
				'lang' => $this->params()->fromRoute('lang'),
		));

		$result->setTemplate('nomenclature/nomenclature/label-list-translate-partial.phtml');

		return $result;
	}


	/**
	 * Обновява стойност на етикет от език по подразбиране.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateLabel() {

		$languageId = $this->language()->getDefaultId();

		if ($id = $this->params()->fromPost('id')) {

			$params = [
				'cp' 					=> 1,
				'rowCount' 				=> 1,
				'loadDescription' 		=> true,
				'totalCount' 			=> false,
				'loadSeparateValueI18n' => true,
				'id' 					=> $id
			];

			$labelObj = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $params)->current();

			if (!$this->isAllowed('manage_label')) {
				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' => [['edit-description-'.$labelObj->getlabelId() => $this->translator->translate('GL_ERROR_L')]]
				]);
			}

			$value = $this->params()->fromPost('value');

			$labelValue = trim($this->params()->fromPost('value'));
			$labelDescription = trim($this->params()->fromPost('description'));

			$error = [];

			if (!$labelValue)
				$error[] = ['edit-value-'.$labelObj->getlabelId() => $this->translator->translate('GL_INPUT_FIELD_MUST_E')];

			if (!$labelDescription)
				$error[] = ['edit-description-'.$labelObj->getlabelId() => $this->translator->translate('GL_INPUT_FIELD_MUST_E')];

			if (!empty($error)) {
				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' 		=> $error,
					'editBtnClass'	=> 'edit-section-'.$labelObj->getLabelId()
				]);
			}

			$labelObj->setValue($labelValue);
			$labelObj->setDescription($labelDescription);
			$this->nomenclatureDM->updateLabelById($labelObj);

			return new JsonModel([
				'status' => 'success',
			]);
		}

		return new JsonModel([
			'status' => 'error',
		]);
	}


	/**
	 * Обновява превод на етикет.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateLabelI18n() {

		$config = $this->getConfig();

		$languageId = $this->language()->getId();

		if ($id = $this->params()->fromPost('id')) {

			$params = [
					'cp' 					=> 1,
					'rowCount' 				=> $config['GL_ITEMS_PER_PAGE'],
					'loadDescription' 		=> true,
					'totalCount' 			=> false,
					'loadSeparateValueI18n' => true,
					'id' 					=> $id
			];

			if ($labelObj = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $params)->current()) {

				if (!$this->isAllowed('label_list_translate')) {
					return new JsonModel([
						'status' 	=> 'error-td',
						'errors' 	=> [['edit-value-'.$labelObj->getlabelId() => $this->translator->translate('GL_ERROR_L')]]
					]);
				}

				// Обновяване на превод
				if ($labelObj->getIsTranslated()) {
					$labelObj->setValueI18n($this->params()->fromPost('value'));
					$this->nomenclatureDM->updateLabelI18n($labelObj, $languageId);
				}

				// Добавяне на нов превод
				else {
					$labelObj->setValueI18n($this->params()->fromPost('value'));
					$this->nomenclatureDM->addLabelI18n($labelObj, $languageId);
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


	/**
	 * Функционалност "Списък с етикети за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function labelListTranslateAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$type = $this->params()->fromRoute('type');

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getLabelTranslateList();

			elseif ($request->getPost('updateI18nLabel')) {
				$result = $this->updateLabelI18n();
				return $result;
			}
		}

		$searchForm = new \Nomenclature\Form\LabelSearchForm();

		$searchForm->setData($this->params()->fromQuery());

		$params = [
				'cp' => $page,
				'rowCount' => $rowCount,
				'loadDescription' => true,
				'loadSeparateValueI18n' => true
		];

		$languageId = $this->language()->getId();

		$labelList = $this->nomenclatureDM->getLabelList($totalCount, $languageId, $this->params()->fromQuery()+$params);

		$publicURL = $config['GL_EPZEU_PUBLIC_UI_URL'];

		return new ViewModel([
			'labelList' 	=> $labelList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount) ?: 1,
			'searchForm' 	=> $searchForm,
			'lang' 			=> $this->params()->fromRoute('lang'),
			'publicURL'		=> $publicURL,
			'languageCode'	=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	 * Функционалност "Списък с езици".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function languageListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$type = $this->params()->fromRoute('type');

		$request = $this->getRequest();

		$routeMatch = $this->getEvent()->getRouteMatch();
		$routeName = $routeMatch->getMatchedRouteName();

		if ($routeName == 'change_language_status' && $this->isAllowed('manage_language'))
			return $this->updateLanguage();

		if ($request->isXmlHttpRequest())
			return $result = $this->getLanguageList();

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount,
			'isActive' 	=> false
		];

		$languageList = $this->nomenclatureDM->getLanguageList($totalCount, $params);

		return new ViewModel([
			'languageList'	=> $languageList,
			'totalCount'	=> $totalCount,
			'totalPages'	=> ceil($totalCount/$rowCount) ?: 1,
			'params'		=> $this->params()
		]);
	}


	/**
	 * Обновява данни за език.
	 *
	 * @return Response HTTP отговор.
	 */
	public function updateLanguage() {

		$id = $this->params()->fromRoute('languageId');

		$params = [
			'langId' 		=> $id,
			'totalCount'	=> false,
			'rowCount'		=> 1,
			'cp'			=> 1
		];

		$result = $this->nomenclatureDM->getLanguageList($totalCount, $params);

		if ($languageObj = $result->current()) {

			$newStatus = $languageObj->getIsActive() ? 0 : 1;

			if (!$languageObj->getIsDefault()) {
				$languageObj->setIsActive($newStatus);

				if ($this->nomenclatureDM->updateLanguageById($languageObj)) {
					$flashMessage = $newStatus ? 'GL_ACTIVE_OK_I' : 'GL_DEACTIVE_OK_I';
					$this->flashMessenger()->addSuccessMessage($flashMessage);
					return $this->redirect()->toRoute('language_list', ['lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		return $this->redirect()->toRoute('language_list', ['lang' => $this->params()->fromRoute('lang')]);
	}


	/**
	 * Извлича списък с етикети при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLanguageList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $config['GL_ITEMS_PER_PAGE'],
			'totalCount' 	=> false,
		];

		$languageList = $this->nomenclatureDM->getLanguageList($totalCount, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'languageList' => $languageList,
			'lang' => $this->params()->fromRoute('lang'),
			'params'	=> $this->params()
		));

		$result->setTemplate('nomenclature/nomenclature/language-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Списък със заявления за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function applicationTypeListAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getApplicationTypeList();

			elseif ($request->getPost('updateI18nApplicationTypeName'))
				return $result = $this->updateI18nApplicationTypeName();

		}

		$config = $this->getConfig();
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$page = $this->params()->fromQuery('page', 1);

		$params = [
				'cp' => $page,
				'rowCount' => $rowCount,
				'totalCount' => false,
				'loadSeparateValueI18n' => true,
				'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getId();

		$applicationTypeList = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, $params);

		$registerList = $this->cacheService->getRegisterAbbreviationList();

		$searchForm = new ServiceSearchForm();

		$registerListForm = ["" => 'GL_CHOICE_ALL_L'] + array_flip($registerList);

		$searchForm->get('registerSelectId')->setValueOptions($registerListForm);
		$searchForm->setData($this->params()->fromQuery());

		return new ViewModel([
				'applicationTypeList' => $applicationTypeList,
				'totalCount' 	=> $totalCount,
				'totalPages' 	=> ceil($totalCount/$rowCount) ?: 1,
				'totalCount' 	=> $totalCount,
				'lang' 			=> $this->params()->fromRoute('lang'),
				'registerList' 	=> $registerList,
				'config'		=> $config,
				'searchForm'	=> $searchForm,
				'params'		=> $this->params()
		]);
	}


	/**
	 * Функционалност "Списък със заявления".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getApplicationTypeList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
				'cp' => $page,
				'rowCount' => $rowCount,
				'totalCount' => false,
				'loadSeparateValueI18n' => true,
				'registerId' => $this->params()->fromQuery('registerSelectId', null)
		];

		$languageId = $this->language()->getId();

		$applicationTypeList = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'applicationTypeList' => $applicationTypeList,
			'registerList' => $this->cacheService->getRegisterAbbreviationList(),
			'config'		=> $config,
		));

		$result->setTemplate('nomenclature/nomenclature/application-type-list-partial.phtml');

		return $result;
	}


	/**
	 * Обновява превод на заявление.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateI18nApplicationTypeName() {

		$config = $this->getConfig();

		$languageId = $this->language()->getId();

		if ($id = $this->params()->fromPost('id')) {

			$params = [
					'cp' => 1,
					'rowCount' => $config['GL_ITEMS_PER_PAGE'],
					'totalCount' => false,
					'loadSeparateValueI18n' => true,
					'id' => $id
			];

			if ($applicationTypeObj = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, $params)->current()) {

				$name = trim($this->params()->fromPost('value'));

				// Обновяване на превод
				if ($applicationTypeObj->getIsTranslated()) {
					$applicationTypeObj->setNameI18n($name);
					$this->nomenclatureDM->updateApplicationTypelI18n($applicationTypeObj, $languageId);
				}

				// Добавяне на нов превод
				else {
					$applicationTypeObj->setNameI18n($name);
					$this->nomenclatureDM->addApplicationTypelI18n($applicationTypeObj, $languageId);
				}

				return new JsonModel([
					'status' => 'success',
				]);
			}
		}
	}


	/**
	 * Функционалност "Списък с услуги".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function serviceListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$languageId = $this->language()->getDefaultId();

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getServiceList();

			elseif ($request->getPost('manageServiceStatus')) {
				$result = $this->manageServiceStatus();
				return $result;
			}
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'loadShortDescription' => 1
		];

		// Търсене
		$searchForm = new \Nomenclature\Form\ServiceSearchForm();

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());
		$searchForm->get('registerId')->setValueOptions($registerList);

		$serviceStatusList = $this->cacheService->getServiceStatusList();
		$searchForm->get('status')->setValueOptions(array_flip($serviceStatusList));

		$applicationTypeList = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, ['getPlainResult' => 1, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT]);

		$serviceTypeList = $this->cacheService->getServiceTypeList();

		$paymentTypeList = $this->cacheService->getPaymentTypeList();

		$searchParams =$this->params()->fromQuery();

		if (!empty($searchParams['search'])) {

			$searchForm->setData($searchParams);

			if ($searchForm->isValid())
				$searchParams = $searchForm->getData();
			else {

				if (!empty($searchForm->getMessages('registerId')))
					$searchForm->get('registerId')->setValue(0);

				if (!empty($searchForm->getMessages('status')))
					$searchForm->get('status')->setValue(null);

			}
		}
		else
			$searchParams = [];

		$serviceList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, $searchParams+$params);

		$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg();

		return new ViewModel([
			'params' 					=> $this->params(),
			'searchForm' 				=> $searchForm,
			'serviceList' 				=> $serviceList,
			'registerList' 				=> $registerList,
			'applicationTypeList' 		=> $applicationTypeList,
			'serviceTypeList' 			=> $serviceTypeList,
			'paymentTypeList' 			=> $paymentTypeList,
			'serviceStatusList' 		=> $serviceStatusList,
			'serviceStatusProvided' 	=> $serviceStatusList['EP_NOM_STATUS_PROVIDED_L'],
			'serviceStatusCancel' 		=> $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L'],
			'serviceStatusPending' 		=> $serviceStatusList['EP_NOM_STATUS_PENDING_L'],
			'synchronizeMessage' 		=> $synchronizeMessage,
			'totalCount' 				=> $totalCount,
			'totalPages' 				=> ceil($totalCount/$rowCount),
			'serviceDescriptionLength' 	=> $config['EP_SERVICE_DESCRIPTION_LENGTH']
		]);
	}


	/**
	 * Извлича списък с услуги при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getServiceList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$languageId = $this->language()->getDefaultId();

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
			'totalCount' => false,
			'loadShortDescription' => 1
		];

		$searchParams = $this->params()->fromQuery();

		$serviceList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, $searchParams+$params);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$applicationTypeList = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, ['getPlainResult' => 1, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT]);

		$serviceTypeList = $this->cacheService->getServiceTypeList();

		$paymentTypeList = $this->cacheService->getPaymentTypeList();

		$serviceStatusList = $this->cacheService->getServiceStatusList();

		$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg();

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' 				=> $this->params(),
			'serviceList'			=> $serviceList,
			'registerList' 			=> $registerList,
			'applicationTypeList' 	=> $applicationTypeList,
			'serviceTypeList' 		=> $serviceTypeList,
			'paymentTypeList' 		=> $paymentTypeList,
			'synchronizeMessage' 	=> $synchronizeMessage,
			'serviceStatusProvided' => $serviceStatusList['EP_NOM_STATUS_PROVIDED_L'],
			'serviceStatusCancel' 	=> $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L'],
			'serviceStatusPending' 	=> $serviceStatusList['EP_NOM_STATUS_PENDING_L'],
			'serviceDescriptionLength' 	=> $config['EP_SERVICE_DESCRIPTION_LENGTH']
		));

		$result->setTemplate('nomenclature/nomenclature/service-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на услуга".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addServiceAction() {

		$serviceForm = new \Nomenclature\Form\ServiceForm();

		$languageId = $this->language()->getDefaultId();

		$request = $this->getRequest();

		$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());
		$serviceForm->get('registerId')->setValueOptions($registerList);

		$isAdm = ['1' => 'GL_OK_L', '0' => 'GL_NO_L'];
		$serviceForm->get('isAdm')->setValueOptions($isAdm);

		$iisdaServiceArr = $this->nomenclatureDM->getIisdaServiceList($totalCount, $languageId, ['excludeDiscontinued' => 1]);

		// Съобщение, което указва дали услугите от иисда са синхронизирани спрямо дефиниран в системата параметър
		$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg(current($iisdaServiceArr));

		$iisdaServiceList = [];

		foreach ($iisdaServiceArr as $item)
			$iisdaServiceList[$item->getIisdaServiceId()] = $item->getServiceNumber().'  '.$item->getName();

		$serviceForm->get('iisdaServiceId')->setValueOptions(["" => 'GL_CHOICE_L'] + $iisdaServiceList);

		$applicationTypeArrTemp = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, ['getPlainResult' => 1, 'getByRegister' => 1, 'getDropDownResult' => 1, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT]);

		$serviceAppTypeList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, ['cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT, 'getPlainResult' => 1]);

		//Премахва от списъка заявленията, за които има добавена услуга
		$applicationTypeArr = [];
		foreach ($applicationTypeArrTemp as $registerId => $appTypeArr) {
			foreach ($appTypeArr as $key => $value) {
				if (empty($serviceAppTypeList) || (!empty($serviceAppTypeList) && !in_array($key, $serviceAppTypeList))) {
					$applicationTypeArr[$registerId][] = ['id' => $key , 'value' => $value];
					$applicationTypeList[$registerId][$key] = $value;
				}
			}
		}

		$serviceForm->get('appTypeId')->setValueOptions(["" => 'GL_CHOICE_L']);

		$serviceForm->get('serviceTypeIds')->setValueOptions($this->cacheService->getServiceTypeList());

		if (!$request->isPost() && empty($this->params()->fromPost('serviceTypeIds')))
			$serviceForm->get('serviceTypeIds')->setValue([self::SERVICE_TYPE_ORDINARY]);

		$serviceForm->get('paymentTypeIds')->setValueOptions($this->cacheService->getPaymentTypeList());

		if (empty($this->params()->fromPost('statusDate'))) {
			$now = (new \DateTime())->add(new \DateInterval("PT1H"));
			$serviceForm->get('statusDate')->setValue($now->format('d.m.Y'));
			$serviceForm->get('statusTime')->setValue($now->format('H'));
		}

		if ($request->isPost()) {

			// Списък със заявления спрямо избрания регистър
			if ($registerId = $this->params()->fromPost('registerId'))
				$serviceForm->get('appTypeId')->setValueOptions(["" => 'GL_CHOICE_L'] + (!empty($applicationTypeList[$registerId]) ? $applicationTypeList[$registerId] : []));

			// В случай, че услугата е от предоставяните от АВ услуги от Регистъра на услугите в  ИИСДА
			if ($request->getPost('isAdm') !== null && $request->getPost('isAdm')) {

				$serviceForm->getInputFilter()->remove('name');
				$serviceForm->getInputFilter()->remove('description');
				$serviceForm->getInputFilter()->remove('shortDescription');

				$iisdaServiceId = $request->getPost('iisdaServiceId');

				if (!empty($iisdaServiceId)) {

					$inArrayValidator = new \Zend\Validator\InArray([
						'haystack' => array_keys($iisdaServiceList),
						'strict'   => false,
						'messages' => ['notInArray' => $this->translator->translate('EP_NOM_NO_SERVICES_IISDA_E')]
					]);

					$inArrayValidatorChain = new ValidatorChain();
					$inArrayValidatorChain->attach($inArrayValidator);

					$serviceForm->getInputFilter()->get('iisdaServiceId')->getValidatorChain()->attach($inArrayValidatorChain);

					if (!empty($iisdaServiceArr[$iisdaServiceId]) && $iisdaServiceArr[$iisdaServiceId]->getHasEpayment())
						$serviceForm->getInputFilter()->get('paymentTypeIds')->setRequired(true);
				}
			}

			else if ($request->getPost('isAdm') !== null && $request->getPost('isAdm') == 0) {

				$serviceForm->getInputFilter()->remove('iisdaServiceId');
				$serviceForm->getInputFilter()->get('paymentTypeIds')->setRequired(false);
			}

			$request->getPost()['time'] = !empty($request->getPost('statusTime')) ? intval($request->getPost('statusTime')).':00' : null;

			$serviceForm->setData($request->getPost());

			//Проверка дали датата и часът на началото на предоставянена услугата са равни или по-големи от текущите
			if (!empty($request->getPost('statusDate')) && !empty($request->getPost('time'))) {

				$datePeriodValidator = new \Application\Validator\DatePeriodValidator([
					'token' 			=> 'now',
					'timeField' 		=>'time',
					'currentDateHour' 	=> true,
					'compareType' 		=> \Application\Validator\DatePeriodValidator::LESS,
					'messages' 			=> ['invalidDatePeriod' => $this->translator->translate('EP_NOM_START_DATE_ERROR_E')]
				]);

				$datePeriodValidatorChain = new ValidatorChain();
				$datePeriodValidatorChain->attach($datePeriodValidator);

				$serviceForm->getInputFilter()->get('statusDate')->getValidatorChain()->attach($datePeriodValidatorChain);
			}

			if ($serviceForm->isValid()) {

				$postData = $serviceForm->getData();

				$serviceStatusList = $this->cacheService->getServiceStatusList();

				$statusDateTime = $postData->getStatusDate().' '.$postData->getStatusTime().':00:00';

				$postData->setStatus($serviceStatusList['EP_NOM_STATUS_PENDING_L']);
				$postData->setPendingStatus($serviceStatusList['EP_NOM_STATUS_PROVIDED_L']);
				$postData->setPendingStatusDate($statusDateTime);

				$dateStatusPeriodValidator = new \Application\Validator\DatePeriodValidator([
					'token' 			=> 'now',
					'compareType' 		=> \Application\Validator\DatePeriodValidator::GREATER_OR_EQUAL
				]);

				if ($dateStatusPeriodValidator->isValid($statusDateTime)) {
					$postData->setStatus($serviceStatusList['EP_NOM_STATUS_PROVIDED_L']);
					$postData->setPendingStatus(null);
					$postData->setPendingStatusDate(null);
				}

				if ($this->nomenclatureDM->addService($postData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_service', ['lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'serviceForm' 			=> $serviceForm,
			'params' 				=> $this->params(),
			'lang' 					=> $this->params()->fromRoute('lang'),
			'synchronizeMessage' 	=> $synchronizeMessage,
			'iisdaServiceArr' 		=> $iisdaServiceArr,
			'applicationTypeArr' => json_encode($applicationTypeArr)
		]);
	}


	/**
	 * Функционалност "Редактиране на услуга".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editServiceAction() {

		$serviceForm = new \Nomenclature\Form\ServiceForm();

		$params = $this->params();

		$serviceId = $this->params()->fromRoute('serviceId', 0);

		$languageId = $this->language()->getDefaultId();

		if ($baseObj = $this->nomenclatureDM->getServiceById($serviceId, ['loadDescription' => 1, 'loadShortDescription' => 1])) {

			$serviceStatusList = $this->cacheService->getServiceStatusList();

			$statusDateValidator = new \Application\Validator\DatePeriodValidator([
				'token' 			=> 'now',
				'currentDateHour' 	=> true,
				'compareType' 		=> \Application\Validator\DatePeriodValidator::LESS
			]);

			if ($baseObj->getStatus() == $serviceStatusList['EP_NOM_STATUS_PENDING_L'] && $statusDateValidator->isValid(date('d.m.Y H:00:00', strtotime($baseObj->getStatusDate())))) {

				$registerList = ["" => 'GL_CHOICE_L'] + array_flip($this->cacheService->getRegisterAbbreviationList());
				$serviceForm->get('registerId')->setValueOptions($registerList);

				$isAdm = ['1' => 'GL_OK_L', '0' => 'GL_NO_L'];
				$serviceForm->get('isAdm')->setValueOptions($isAdm);

				$serviceForm->get('isAdm')->setAttribute('disabled', true);

				$iisdaServiceArr = $this->nomenclatureDM->getIisdaServiceList($totalCount, $this->language()->getDefaultId(), ['excludeDiscontinued' => 1]);

				// Съобщение, което указва дали услугите от иисда са синхронизирани спрямо дефиниран в системата параметър
				$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg(current($iisdaServiceArr));

				foreach ($iisdaServiceArr as $item)
					$iisdaServiceList[$item->getIisdaServiceId()] = $item->getServiceNumber().'  '.$item->getName();

				$serviceForm->get('iisdaServiceId')->setValueOptions(["" => 'GL_CHOICE_L'] + $iisdaServiceList);

				$applicationTypeArrTemp = $this->nomenclatureDM->getApplicationTypeList($totalCount, $languageId, ['getPlainResult' => 1, 'getByRegister' => 1, 'getDropDownResult' => 1, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT]);

				$serviceAppTypeList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, ['cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT, 'getPlainResult' => 1]);

				if (in_array($baseObj->getAppTypeId(), $serviceAppTypeList))
					unset ($serviceAppTypeList[$baseObj->getAppTypeId()]);

				//Премахва от списъка заявленията, за които има добавена услуга
				foreach ($applicationTypeArrTemp as $registerId => $appTypeArr) {

					foreach ($appTypeArr as $key => $value) {

						if (empty($serviceAppTypeList) || (!empty($serviceAppTypeList) && !in_array($key, $serviceAppTypeList))) {
							$applicationTypeArr[$registerId][] = ['id' => $key , 'value' => $value];
							$applicationTypeList[$registerId][$key] = $value;
						}
					}
				}

				$serviceForm->get('appTypeId')->setValueOptions(["" => 'GL_CHOICE_L']);

				$serviceForm->get('serviceTypeIds')->setValueOptions($this->cacheService->getServiceTypeList());

				$serviceForm->get('paymentTypeIds')->setValueOptions($this->cacheService->getPaymentTypeList());

				$request = $this->getRequest();

				if ($request->isPost()) {

					$serviceForm->getInputFilter()->remove('isAdm');

					$serviceForm->get('isAdm')->setValue($baseObj->getIsAdm());

					// Списък със заявления спрямо избрания регистър
					if ($registerId = $this->params()->fromPost('registerId'))
						$serviceForm->get('appTypeId')->setValueOptions(["" => 'GL_CHOICE_L'] + (!empty($applicationTypeList[$registerId]) ? $applicationTypeList[$registerId] : []));

					// В случай, че услугата е от предоставяните от АВ услуги от Регистъра на услугите в  ИИСДА
					if (!empty($baseObj->getIsAdm())) {

						$serviceForm->getInputFilter()->remove('name');
						$serviceForm->getInputFilter()->remove('description');
						$serviceForm->getInputFilter()->remove('shortDescription');

						$iisdaServiceId = $request->getPost('iisdaServiceId');

						if (!empty($iisdaServiceId)) {

							$inArrayValidator = new \Zend\Validator\InArray([
								'haystack' => array_keys($iisdaServiceList),
								'strict'   => false,
								'messages' => ['notInArray' => $this->translator->translate('EP_NOM_NO_SERVICES_IISDA_E')]
							]);

							$inArrayValidatorChain = new ValidatorChain();
							$inArrayValidatorChain->attach($inArrayValidator);

							$serviceForm->getInputFilter()->get('iisdaServiceId')->getValidatorChain()->attach($inArrayValidatorChain);

							if (!empty($iisdaServiceId) && !empty($iisdaServiceArr[$iisdaServiceId]) && $iisdaServiceArr[$iisdaServiceId]->getHasEpayment())
								$serviceForm->getInputFilter()->get('paymentTypeIds')->setRequired(true);
						}
					}

					else  {

						$serviceForm->getInputFilter()->remove('iisdaServiceId');
						$serviceForm->getInputFilter()->get('paymentTypeIds')->setRequired(false);
					}

					$request->getPost()['time'] = !empty($request->getPost('statusTime')) ? intval($request->getPost('statusTime')).':00' : null;

					$serviceForm->setData($request->getPost());

					//Проверка дали датата и часът на началото на предоставянена услугата са равни или по-големи от текущите
					if (!empty($request->getPost('statusDate')) && !empty($request->getPost('time'))) {

						$datePeriodValidator = new \Application\Validator\DatePeriodValidator([
							'token' 		=> 'now',
							'timeField' 	=> 'time',
							'compareType' 	=> \Application\Validator\DatePeriodValidator::LESS,
							'messages' 		=> ['invalidDatePeriod' => $this->translator->translate('EP_NOM_START_DATE_ERROR_E')]
						]);

						$datePeriodValidatorChain = new ValidatorChain();
						$datePeriodValidatorChain->attach($datePeriodValidator);

						$serviceForm->getInputFilter()->get('statusDate')->getValidatorChain()->attach($datePeriodValidatorChain);
					}

					if ($serviceForm->isValid()) {

						$postData = $serviceForm->getData();

						$postData->setIsAdm($baseObj->getIsAdm());

						$dateStatusPeriodValidator = new \Application\Validator\DatePeriodValidator([
							'token' 			=> 'now',
							'compareType' 		=> \Application\Validator\DatePeriodValidator::GREATER_OR_EQUAL
						]);

						$statusDateTime = $postData->getStatusDate().' '.$postData->getStatusTime().':00:00';

						$postData->setPendingStatus($serviceStatusList['EP_NOM_STATUS_PROVIDED_L']);
						$postData->setStatus($serviceStatusList['EP_NOM_STATUS_PENDING_L']);
						$postData->setPendingStatusDate($statusDateTime);

						if ($this->nomenclatureDM->updateServiceById($serviceId, $postData)) {
							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('edit_service', ['serviceId' => $serviceId, 'lang' => $params->fromRoute('lang')]);
						}
					}
				}

				else {
					$serviceForm->bind($baseObj);
					$serviceForm->get('statusDate')->setValue(date('d.m.Y', strtotime($baseObj->getStatusDate())));
					$serviceForm->get('statusTime')->setValue(date('H', strtotime($baseObj->getStatusDate())));

					// Списък със заявления спрямо избрания регистър
					$serviceForm->get('appTypeId')->setValueOptions(["" => 'GL_CHOICE_L'] + (!empty($applicationTypeList[$baseObj->getRegisterId()]) ? $applicationTypeList[$baseObj->getRegisterId()] : []));
				}

				return new ViewModel([
					'serviceForm' 			=> $serviceForm,
					'serviceId' 			=> $serviceId,
					'params' 				=> $params,
					'synchronizeMessage' 	=> $synchronizeMessage,
					'isAdmService' 			=> (!empty($baseObj->getIsAdm()) ? 1 : 0),
					'hasEpayment' 			=> $baseObj->getHasEpayment(),
					'iisdaServiceArr' 		=> $iisdaServiceArr,
					'applicationTypeArr' => json_encode($applicationTypeArr)
				]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Промяна на статус на услуга.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function manageServiceStatus() {

		$serviceId = $this->params()->fromPost('id');
		$action = $this->params()->fromPost('action');

		if (!$this->isAllowed('manage_service_status'))
			$error[] = [$action.'-td-'.$serviceId => $this->translator->translate("GL_ERROR_L")];

		if (!empty($error)) {

			return new JsonModel([
				'status' => 'error-td',
				'errors' 	=> $error,
				'editBtnClass' => $action.'-btn-'.$serviceId
			]);
		}

		$postData = $this->params()->fromPost();

		// Проверка за празна стойност и валидни дата
		$inputDateFilter = new InputFilter();

		$inputDateFilter->add([
			'name' => 'statusDate',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate("GL_INPUT_FIELD_MUST_E")
						]
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'd.m.Y',
						'messages' => [
							'dateInvalidDate' => $this->translator->translate("GL_INVALID_DATE_TIME_HOUR_E")
						]
					]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		// Проверка за празна стойност и валидни час и минути
		$inputTimeFilter = new InputFilter();

		$inputTimeFilter->add([
			'name' => 'statusTime',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate("GL_INPUT_FIELD_MUST_E")
						]
					]
				],
				[
					'name' => \Zend\Validator\Date::class,
					'break_chain_on_failure' => true,
					'options' => [
						'format' => 'H',
						'messages' => [
							'dateInvalidDate' => $this->translator->translate("GL_INVALID_DATE_TIME_HOUR_E")
						]
					]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$datePeriodValidator = new \Application\Validator\DatePeriodValidator([
			'token' 			=> 'now',
			'currentDateHour' 	=> true,
			'compareType' 		=> \Application\Validator\DatePeriodValidator::LESS
		]);

		$statusDateTime = $postData['statusDate'].' '.$postData['statusTime'].':00:00';

		$inputDateFilter->setData($postData);
		$inputTimeFilter->setData($postData);

		if (!$inputDateFilter->isValid()) {
			$errorMsgArr = $inputDateFilter->get('statusDate')->getMessages();
			$error[] = [$action.'-td-'.$serviceId => array_values($errorMsgArr)[0]];
		}

		elseif (!$inputTimeFilter->isValid()) {
			$errorMsgArr = $inputTimeFilter->get('statusTime')->getMessages();
			$error[] = [$action.'-td-'.$serviceId => array_values($errorMsgArr)[0]];
		}

		elseif (!$datePeriodValidator->isValid($statusDateTime, $this->params()->fromPost()))
			$error[] = [$action.'-td-'.$serviceId => $action == 'provide' ? $this->translator->translate("EP_NOM_REVIVAL_DATE_ERROR_E") : $this->translator->translate("EP_NOM_CANCEL_SERVICE_DATE_ERROR_E")];

		// Филтрирани данни
		$statusDate = $inputDateFilter->getValues()['statusDate'];
		$statusTime = $inputTimeFilter->getValues()['statusTime'];

		if (!empty($error)) {

			return new JsonModel([
				'status' 		=> 'error-td',
				'errors' 		=> $error,
				'editBtnClass' 	=> $action.'-btn-'.$serviceId
			]);
		}

		$statusDateTime = $statusDate.' '.$statusTime.':00:00';

		if ($serviceObj = $this->nomenclatureDM->getServiceById($serviceId, ['loadDescription' => 1, 'loadShortDescription' => 1])) {

			$serviceStatusList = $this->cacheService->getServiceStatusList();

			if($serviceObj->getIsDiscontinued() && $serviceObj->getStatus() == $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L'])
				$error[] = [$action.'-td-'.$serviceId => $this->translator->translate("EP_NOM_NO_SERVICES_IISDA_E")];

			elseif(
				(	$action == 'provide'
					&&
					($serviceObj->getStatus() != $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L'] && $serviceObj->getStatus() != $serviceStatusList['EP_NOM_STATUS_PENDING_L'])
				)
				||
				(
					$action == 'cancel'
					&&
					$serviceObj->getStatus() != $serviceStatusList['EP_NOM_STATUS_PROVIDED_L']
				)
			)
				$error[] = [$action.'-td-'.$serviceId => $this->translator->translate("GL_ERROR_L")];

			if (!empty($error)) {

				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' 		=> $error,
					'editBtnClass' 	=> $action.'-btn-'.$serviceId
				]);
			}

			$oldStatus = $serviceObj->getStatus();

			switch ($oldStatus) {

				// Предоставя се от ЕПЗЕУ
				case $serviceStatusList['EP_NOM_STATUS_PROVIDED_L']:
					$newStatus = $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L'];
					break;

				// Предстоящо предоставяне
				case $serviceStatusList['EP_NOM_STATUS_PENDING_L']:
					$newStatus = $serviceStatusList['EP_NOM_STATUS_PROVIDED_L'];
					break;

				// Прекратено предоставяне от ЕПЗЕУ
				case $serviceStatusList['EP_NOM_STATUS_CANCEL_PROVIDED_L']:
					$newStatus = $serviceStatusList['EP_NOM_STATUS_PROVIDED_L'];
					break;
			}

			$oldServiceStatusDateObj = new \DateTime($serviceObj->getStatusDate());
			$oldServiceStatusDate = $oldServiceStatusDateObj->format('d.m.Y H:i:s');

			$dateStatusPeriodValidator = new \Application\Validator\DatePeriodValidator([
				'token' 			=> 'now',
				'compareType' 		=> \Application\Validator\DatePeriodValidator::GREATER_OR_EQUAL
			]);

			if ($dateStatusPeriodValidator->isValid($statusDateTime)) {
				$serviceObj->setStatus($newStatus);
				$serviceObj->setStatusDate($statusDateTime);
				$serviceObj->setPendingStatus(null);
				$serviceObj->setPendingStatusDate(null);
			}

			else {

				if ($action == 'provide') {
					$serviceObj->setStatus($serviceStatusList['EP_NOM_STATUS_PENDING_L']);
					$serviceObj->setStatusDate($statusDateTime);
				}
				else {
					$serviceObj->setStatus($serviceObj->getStatus());
					$serviceObj->setStatusDate($oldServiceStatusDate);
				}

				$serviceObj->setPendingStatus($newStatus);
				$serviceObj->setPendingStatusDate($statusDateTime);
			}

			if ($this->nomenclatureDM->updateServiceStatusById($serviceId, $serviceObj)) {

				$statusDateObj = new \DateTime($serviceObj->getStatusDate());
				$statusDate = $statusDateObj->format('d.m.Y');
				$statusTime = $statusDateObj->format('H');

				return new JsonModel([
					'status' 		=> 'success',
					'serviceStatus' => $serviceObj->getStatus(),
					'statusDate' => $statusDate,
					'statusTime' => $statusTime
				]);
			}
		}

		return new JsonModel([
			'status' 		=> 'error-td',
			'errors' 		=> [[$action.'-td-'.$serviceId => $this->translator->translate("GL_ERROR_L")]],
			'editBtnClass' 	=> $action.'-btn-'.$serviceId
		]);
	}


	/**
	 * Функционалност "Преглед на услуга".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewServiceAction() {

		$config = $this->getConfig();

		$getTranslated = $this->params()->fromQuery('getTranslated', 0);

		$shortDescriptionTranslation = $this->params()->fromQuery('shortDescription', 0);

		$serviceId = $this->params()->fromRoute('serviceId', 0);

		$params = [
			'languageId' 			=> $this->language()->getId(),
			'loadSeparateValueI18n' => 1,
			'loadDescription' 		=> 1,
			'loadShortDescription' 	=> 1
		];

		$serviceObj = $this->nomenclatureDM->getServiceById($serviceId, $params);

		if (!empty($getTranslated)) {
			$description = $serviceObj->getDescriptionI18n();
			$shortDescription = nl2br($serviceObj->getShortDescriptionI18n());
		}

		else {
			$description = $serviceObj->getDescription();
			$shortDescription = nl2br($serviceObj->getShortDescription());
		}

		$description = !empty($description) ? $description : '';

		$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg();

		$this->layout('layout/ajax');

		return new ViewModel([
			'isAdmService' 					=> $serviceObj->getIsAdm(),
			'title'							=> $serviceObj->getServiceNumber().' '.$serviceObj->getName(),
			'shortDescription'				=> $shortDescription,
			'description' 					=> $description,
			'synchronizeMessage'			=> $synchronizeMessage,
			'shortDescriptionTranslation' 	=> $shortDescriptionTranslation
		]);
	}


	/**
	 * Генерира съобщение, което указва дали услугите от ИИСДА са синхронизирани спрямо дефиниран в системата параметър.
	 *
	 * @param object $iisdaServiceObj Услуга.
	 * @return string Текст на съобщение.
	 */
	public function setIisdaServiceSynchronizeMsg($iisdaServiceObj = null) {

		$config = $this->getConfig();

		$iisdaServiceReadDate = '';

		if (!empty($iisdaServiceObj) && !empty($iisdaServiceObj->getReadDate()))
			$iisdaServiceReadDate = $iisdaServiceObj->getReadDate();

		else {

			//Извлича първата услуга от иисда, която се предоставя и проверката за синхронизация е спрямо нея
			$iisdaServiceArr = $this->nomenclatureDM->getIisdaServiceList($totalCount, $this->language()->getDefaultId(), ['excludeDiscontinued' => 1, 'getCurrent' => 1]);

			if (!empty($iisdaServiceArr))
				$iisdaServiceReadDate = $iisdaServiceArr[key($iisdaServiceArr)]->getReadDate();
		}

		$message = '';

		if (!empty($iisdaServiceReadDate)) {

			$datePeriodValidator = new \Application\Validator\DatePeriodValidator([
				'token' 		=> 'now',
				'compareType' 	=> \Application\Validator\DatePeriodValidator::LESS
			]);

			//date interval
			$interval = \Application\Service\AppService::fromPg($config['EP_INTGR_IISDA_STALE_DATA_PERIOD']);
			$iisdaServiceReadDateObj = new \DateTime($iisdaServiceReadDate);
			$iisdaServiceReadDateObj->add($interval);
			$iisdaServiceSynchronizedDate = $iisdaServiceReadDateObj->format('d.m.Y H:i:00');

			if (!$datePeriodValidator->isValid($iisdaServiceSynchronizedDate)) {
				$intervalText = \Application\Service\AppService::createDateIntervalString($interval, $this->translator, 1);
				$message = str_replace('{EP_INTGR_IISDA_STALE_DATA_PERIOD}', $intervalText, $this->translator->translate('EP_NOM_NO_UPDATED_IISDA_I'));
			}
		}

		return $message;
	}


	/**
	 * Функционалност "Списък с услуги за превод".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function serviceListTranslateAction() {

		if (!$this->params()->fromRoute('lang'))
			return $this->redirect()->toRoute(null, ['lang' => 'en']);

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $result = $this->getServiceTranslateList();
		}

		$config = $this->getConfig();
		$rowCount = $config['GL_ITEMS_PER_PAGE'];
		$page = $this->params()->fromQuery('page', 1);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$searchForm = new ServiceSearchForm();
		$registerFormList = ["" => 'GL_CHOICE_ALL_L'] + $registerList;
		$searchForm->get('registerSelectId')->setValueOptions($registerFormList);
		$searchForm->setData($this->params()->fromQuery());


		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
			'loadDescription' 		=> 1,
			'loadShortDescription' 	=> 1,
			'registerId' => ($registerId = $this->params()->fromQuery('registerSelectId', null)) ? [$registerId] : null
		];

		$languageId = $this->language()->getId();

		$serviceList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, $params);

		$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg();

		$statisPageList = $this->cacheService->getStaticPageList();

		return new ViewModel([
			'serviceList' 			=> $serviceList,
			'registerList' 			=> $registerList,
			'totalCount' 			=> $totalCount,
			'totalPages' 			=> ceil($totalCount/$rowCount) ?: 1,
			'lang' 					=> $this->params()->fromRoute('lang'),
			'synchronizeMessage'	=> $synchronizeMessage,
			'params' 				=> $this->params(),
			'config'				=> $config,
			'statisPageList'		=> $statisPageList,
			'serviceDescriptionLength' 	=> $config['EP_SERVICE_DESCRIPTION_LENGTH'],
			'searchForm'			=> $searchForm
		]);
	}


	/**
	 * Извлича списък с услуги за превод при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getServiceTranslateList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'totalCount' 			=> false,
			'loadSeparateValueI18n' => true,
			'loadDescription' 		=> 1,
			'loadShortDescription' 	=> 1,
			'registerId' => ($registerId = $this->params()->fromQuery('registerSelectId', null)) ? [$registerId] : null
		];

		$languageId = $this->language()->getId();

		$serviceList = $this->nomenclatureDM->getServiceList($totalCount, $languageId, $params);

		$registerList = array_flip($this->cacheService->getRegisterAbbreviationList());

		$statisPageList = $this->cacheService->getStaticPageList();

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'serviceList' 	=> $serviceList,
			'registerList' 	=> $registerList,
			'lang' 			=> $this->params()->fromRoute('lang'),
			'params' 		=> $this->params(),
			'config'		=> $config,
			'statisPageList'=> $statisPageList,
			'serviceDescriptionLength' 	=> $config['EP_SERVICE_DESCRIPTION_LENGTH']
		));

		$result->setTemplate('nomenclature/nomenclature/service-list-translate-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Превод на услуга".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function manageServiceTranslateAction() {

		$serviceForm = new \Nomenclature\Form\ServiceTranslateForm();

		$params = $this->params();

		$serviceId = $this->params()->fromRoute('serviceId', 0);

		$languageId = $this->language()->getId();

		$paramsArr = [
				'languageId'			=> $this->language()->getId(),
				'loadSeparateValueI18n'	=> 1,
				'loadDescription'		=> 1,
				'loadShortDescription'	=> 1
		];

		if ($serviceObj = $this->nomenclatureDM->getServiceById($serviceId, $paramsArr)) {

			if (empty($serviceObj->getIsDiscontinued())) {

				$iisdaServiceArr = $this->nomenclatureDM->getIisdaServiceList($totalCount, $this->language()->getDefaultId(), ['excludeDiscontinued' => 1]);

				// Съобщение, което указва дали услугите от иисда са синхронизирани спрямо дефиниран в системата параметър
				$synchronizeMessage = $this->setIisdaServiceSynchronizeMsg(current($iisdaServiceArr));

				$request = $this->getRequest();

				if ($request->isPost()) {

					$serviceForm->setData($request->getPost());

					if ($serviceForm->isValid()) {

						$postData = $serviceForm->getData();

						$postData->setServiceId($serviceObj->getServiceId());

						// Обновяване на превод
						if (!empty($serviceObj->getIsTranslated())) {

							if ($this->nomenclatureDM->updateServiceI18n($postData, $languageId)) {
								$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
								return $this->redirect()->toRoute('manage_service_translate', ['serviceId' => $serviceId, 'lang' => $params->fromRoute('lang')]);
							}
						}

						// Добавяне на нов превод
						else {

							if ($this->nomenclatureDM->addServiceI18n($postData, $languageId)) {
								$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
								return $this->redirect()->toRoute('manage_service_translate', ['serviceId' => $serviceId, 'lang' => $params->fromRoute('lang')]);
							}
						}

						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
						return $this->redirect()->toRoute('manage_service_translate', ['serviceId' => $serviceId, 'lang' => $params->fromRoute('lang')]);

					}
				}

				else {
					$serviceForm->bind($serviceObj);
				}

				return new ViewModel([
					'serviceForm' 				=> $serviceForm,
					'serviceId' 				=> $serviceId,
					'serviceName'				=> $serviceObj->getServiceNumber().' '.$serviceObj->getName(),
					'serviceShortDescription'	=> $serviceObj->getShortDescription(),
					'serviceDescription'		=> $serviceObj->getDescription(),
					'isAdmService'				=> $serviceObj->getIsAdm(),
					'synchronizeMessage'		=> $synchronizeMessage,
					'params' 					=> $params
				]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Списък с параметри".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function paramListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getParamList();

			elseif ($request->getPost('updateParam')) {
				$result = $this->updateParam();
				return $result;
			}
		}

		// Търсене
		$searchForm = new \Nomenclature\Form\ParamSearchForm();

		$moduleList = $this->cacheService->getModuleList();
		$searchForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $moduleList);

		$functionalityList = $this->cacheService->getFunctionalityList();
		$searchForm->get('functionalityId')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $functionalityList);

		$isSystem = ['1' => 'GL_OK_L', '0' => 'GL_NO_L'];
		$searchForm->get('isSystem')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $isSystem);

		if (empty($searchParams['search']))
			$searchForm->get('isSystem')->setValue(0);

		$paramTypeList = array_flip($this->cacheService->getParamTypeList());

		$searchParams =$this->params()->fromQuery();

		$searchForm->setData($searchParams);

		if (!empty($searchParams['search'])) {

			if ($searchForm->isValid()) {
				$searchParams = $searchForm->getData();
			}

			else {
				$searchParams['isSystem'] = 0;
			}
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount
		];

		$paramList = $this->nomenclatureDM->getParamList($totalCount, $searchParams+$params);

		return new ViewModel([
			'params' 			=> $this->params(),
			'searchForm' 		=> $searchForm,
			'paramList' 		=> $paramList,
			'paramTypeList' 	=> $paramTypeList,
			'totalCount' 		=> $totalCount,
			'totalPages' 		=> ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък с параметри при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getParamList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$searchParams = $this->params()->fromQuery();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'totalCount'	=> false
		];

		$paramList = $this->nomenclatureDM->getParamList($totalCount, $searchParams+$params);

		$paramTypeList = array_flip($this->cacheService->getParamTypeList());

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' 			=> $this->params(),
			'paramList' 		=> $paramList,
			'paramTypeList'		=> $paramTypeList
		));

		$result->setTemplate('nomenclature/nomenclature/param-list-partial.phtml');

		return $result;
	}


	/**
	 * Обновява стойност на параметър.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateParam() {

		$paramId = $this->params()->fromPost('id', 0);

		$paramTypeList = array_flip($this->cacheService->getParamTypeList());

		if (!$this->isAllowed('manage_param'))
			$error[] = ['edit-param-value-'.$paramId => $this->translator->translate("GL_ERROR_L")];

		if (!empty($error)) {

			return new JsonModel([
				'status' 		=> 'error-td',
				'errors' 		=> $error,
				'editBtnClass' 	=> 'edit-section-'.$paramId
			]);
		}

		$params = [
			'cp' 			=> 1,
			'rowCount' 		=> 1,
			'totalCount' 	=> false,
			'paramId' 		=> [$paramId]
		];

		if ($paramObj = $this->nomenclatureDM->getParamList($totalCount, $params)->current()) {

			$appParamId = $paramObj->getAppParamId();

			$paramTypeId = $paramObj->getParamType();

			$paramTypeCode = $paramTypeList[$paramTypeId];

			$postData = $this->params()->fromPost();

			// Системен параметър не се редактира
			if (!empty($paramObj->getIsSystem())) {

				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' 		=> [['edit-param-value-'.$paramId => $this->translator->translate("GL_ERROR_L")]],
					'editBtnClass' 	=> $action.'-btn-'.$paramId
				]);
			}

			$paramObj->setValueDatetime(null);
			$paramObj->setValueHour(null);
			$paramObj->setValueInterval(null);
			$paramObj->setValueString(null);
			$paramObj->setValueInt(null);

			// Проверка за валидни входящи параметри и определяне на стойността на параметър
			switch ($paramTypeCode) {

				case 'GL_DATE_HOUR_MINUTE_L':

					// Проверка за празна стойност и валидни дата, час и минути
					$valueInputFilter = new InputFilter();

					$valueInputFilter->add([
						'name' => 'paramDate',
						'required' => true,
						'validators' => [
							[
								'name' => \Zend\Validator\NotEmpty::class
							],
							[
								'name' => \Zend\Validator\Date::class,
								'options' => ['format' => 'd.m.Y']
							],
						],
						'filters' => [
							['name' => \Zend\Filter\StringTrim::class],
							['name' => \Zend\Filter\StripTags::class]
						]
					]);

					$valueInputFilter->add([
						'name' => 'paramTime',
						'required' => true,
						'validators' => [
							[
								'name' => \Zend\Validator\NotEmpty::class
							],
							[
								'name' => \Zend\Validator\Date::class,
								'options' => ['format' => 'H:i']
							],
						],
						'filters' => [
							['name' => \Zend\Filter\StringTrim::class],
							['name' => \Zend\Filter\StripTags::class]
						]
					]);

					$valueInputFilter->setData($postData);

					if (!$valueInputFilter->isValid()) {
						$errorMsg =  (!empty($valueInputFilter->get('paramTime')->getMessages()['isEmpty']) || !empty($valueInputFilter->get('paramDate')->getMessages()['isEmpty']) ? $this->translator->translate("GL_INPUT_FIELD_MUST_E") : $this->translator->translate("GL_INVALID_DATE_E"));
						$error[] = ['edit-param-value-'.$appParamId => $errorMsg];
					}

					// Филтрирани данни
					$paramDateValue = $valueInputFilter->getValues()['paramDate'];
					$paramTimeValue = $valueInputFilter->getValues()['paramTime'];
					$paramValue = \Application\Service\AppService::getSqlDate($paramDateValue).' '.$paramTimeValue.':00';

					$paramObj->setValueDatetime($paramValue);

					break;

				case 'GL_HOUR_MINUTE_L':

					// Проверка за празна стойност и валидни час и минути
					$valueInputFilter = new InputFilter();

					$valueInputFilter->add([
						'name' => 'paramTime',
						'required' => true,
						'validators' => [
							[
								'name' => \Zend\Validator\NotEmpty::class
							],
							[
								'name' => \Zend\Validator\Date::class,
									'options' => ['format' => 'H:i']
							],
						],
						'filters' => [
							['name' => \Zend\Filter\StringTrim::class],
							['name' => \Zend\Filter\StripTags::class]
						]
					]);

					$valueInputFilter->setData($postData);

					if (!$valueInputFilter->isValid()) {
						$errorMsg =  (!empty($valueInputFilter->get('paramTime')->getMessages()['isEmpty']) ? $this->translator->translate("GL_INPUT_FIELD_MUST_E") : $this->translator->translate("GL_INVALID_TIME_E"));
						$error[] = ['edit-param-value-'.$appParamId => $errorMsg];
					}

					// Филтрирани данни
					$paramValue = $valueInputFilter->getValues()['paramTime'];

					$paramObj->setValueHour($paramValue);

					break;

				case 'GL_TIME_TERM_L':

					// Проверка за валиден интервал от време
					$intervalInputFilter = new IntervalInputFilter;
					$intervalInputFilter = $intervalInputFilter->getInputFilter();
					$intervalInputFilter->setData($postData['paramValueInterval']);

					if (!$intervalInputFilter->isValid())
						$error[] = ['edit-param-value-'.$appParamId => $this->translator->translate('GL_INVALID_TIME_FORMAT_L')];

					$fieldsArr = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];
					$atLeastOneFieldValidator = new \Application\Validator\AtLeastOneField([
						'fields'	=> $fieldsArr,
						'messages'	=> ['invalidInterval' => $this->translator->translate('GL_INVALID_TIME_FORMAT_L')]
					]);

					if (!$atLeastOneFieldValidator->isValid($postData['paramValueInterval']))
						$error[] = ['edit-param-value-'.$appParamId => $this->translator->translate('GL_INVALID_TIME_FORMAT_L')];

					// Филтрирани данни
					$intervalData = $intervalInputFilter->getValues();
					$valueInterval = \Application\Service\AppService::createDateIntervalFromArray($intervalData);

					$paramObj->setValueInterval($valueInterval);

					break;

				case 'GL_STRING_L':

					// Проверка за празна стойност
					$valueInputFilter = new InputFilter();

					$valueInputFilter->add([
						'name' => 'paramValue',
						'required' => false,
						'filters' => [
							['name' => \Zend\Filter\StringTrim::class],
							['name' => \Zend\Filter\StripTags::class]
						]
					]);

					$valueInputFilter->setData($postData);

					if (!$valueInputFilter->isValid())
						$error[] = ['edit-param-value-'.$appParamId => $this->translator->translate("GL_INPUT_FIELD_MUST_E")];

					// Филтрирани данни
					$paramValue = $valueInputFilter->getValues()['paramValue'];

					$paramObj->setValueString($paramValue);

					break;

				case 'GL_INTEGER_L':

					// Проверка за празна стойност и валиднo цяло число
					$valueInputFilter = new InputFilter();

					$valueInputFilter->add([
						'name' => 'paramValue',
						'required' => true,
						'validators' => [
							['name' => \Zend\Validator\Regex::class,
								'options' => ['pattern' => '/^-?\d+$/']
							],
						],
						'filters' => [
							['name' => \Zend\Filter\StringTrim::class],
							['name' => \Zend\Filter\StripTags::class]
						]
					]);

					$valueInputFilter->setData($postData);

					if (!$valueInputFilter->isValid()){

						$errorMsg =  (!empty($valueInputFilter->get('paramValue')->getMessages()['isEmpty']) ? $this->translator->translate("GL_INPUT_FIELD_MUST_E") : $this->translator->translate("GL_INVALID_VALUE_L"));
						$error[] = ['edit-param-value-'.$appParamId => $errorMsg];
					}

					// Филтрирани данни
					$paramValue = $valueInputFilter->getValues()['paramValue'];

					$paramObj->setValueInt($paramValue);

					break;
			}

			if (!empty($error)) {

				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' 		=> $error,
					'editBtnClass' 	=> 'edit-section-'.$appParamId
				]);
			}

			if ($this->nomenclatureDM->updateParamById($paramObj)) {

				return new JsonModel([
					'status' => 'success',
				]);
			}
		}

		return new JsonModel([
			'status' 		=> 'error-td',
			'errors' 		=> [['edit-param-value-'.$paramId => $this->translator->translate("GL_ERROR_L")]],
			'editBtnClass' 	=> 'edit-section-'.$paramId
		]);
	}
}