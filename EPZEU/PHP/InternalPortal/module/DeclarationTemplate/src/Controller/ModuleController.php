<?php

namespace DeclarationTemplate\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use DeclarationTemplate\Form\DeclarationTemplateForm;
use Application;

/**
 * Контролер реализиращ функционалности за работа с шаблони за декларации.
 *
 * @package DeclarationTemplate
 * @subpackage Controller
 */
class ModuleController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на обекти от тип Шаблон за декларация.
	 *
	 * @var \DeclarationTemplate\Data\DataManager
	 */
	protected $dataManager;


	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;

	/**
	 * Конструктор.
	 *
	 * @param \DeclarationTemplate\Data\DataManager $dataManager Обект за поддържане и съхранение на обекти от тип Шаблон за декларация.
	 * @param \Application\Service\RestService $restService Услуга за работа с REST уеб услуги.
	 */
	public function __construct($dataManager, $restService) {
		$this->dataManager = $dataManager;
		$this->restService = $restService;
	}


	/**
	 * Функционалност "Списък с шаблони за декларации".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function declarationTemplateListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getItemList();
		}

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount
		];


		$docTypeList = $this->restService->getDocumentTypes();

		$declarationTemplateList = $this->dataManager->getDeclarationTemplateList($totalCount, $params, $docTypeList);

		return new ViewModel([
			'declarationTemplateList'	=> $declarationTemplateList,
			'totalCount' 				=> $totalCount,
			'rowCount' 					=> $rowCount,
			'totalPages' 				=> ceil($totalCount/$rowCount),
			'params' 					=> $this->params(),
			'lang'						=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	 * Извлича списък с шаблони на декларации при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getItemList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'totalCount' 	=> false
		];

		$docTypeList = $this->restService->getDocumentTypes();

		$declarationTemplateList = $this->dataManager->getDeclarationTemplateList($totalCount, $params, $docTypeList);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'declarationTemplateList'	=> $declarationTemplateList,
			'params' 					=> $this->params(),
		));

		$result->setTemplate('declaration-template/module/declaration-template-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на шаблон за декларация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addDeclarationTemplateAction() {

		$declarationTemplateForm = new DeclarationTemplateForm();

		$request = $this->getRequest();

		$excludedDocTypes = $this->getDocumentTypesWithTemplate();

		$declarationNameList = $this->restService->getDocumentTypes($excludedDocTypes);
		$declarationNameList = ["" => 'EP_TMP_SELECT_MANIFEST_I'] + $declarationNameList;

		$declarationTemplateForm->get('documentTypeId')->setValueOptions($declarationNameList);

		$params = $this->params();

		if ($request->isPost()) {
			$declarationTemplateForm->setData($request->getPost());

			if ($declarationTemplateForm->isValid()) {

				$postData = $declarationTemplateForm->getData();

				if ($this->dataManager->addDeclarationTemplate($postData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_declaration_template', ['lang' => $params->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'DTForm' => $declarationTemplateForm,
			'params' => $this->params(),
		]);
	}


	/**
	 * Функционалност "Редактиране на шаблон за декларация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editDeclarationTemplateAction() {

		$declarationTemplateForm = new DeclarationTemplateForm();

		$params = $this->params();

		$templateId = $this->params()->fromRoute('templateId', 0);

		if ($baseObj = $this->dataManager->getDeclarationTemplateById($templateId)) {

			$request = $this->getRequest();

			if ($request->isPost()) {

				$declarationTemplateForm->getInputFilter()->get('documentTypeId')->setRequired(false);
				$declarationTemplateForm->setData($request->getPost());

				if ($declarationTemplateForm->isValid()) {

					$postData = $declarationTemplateForm->getData();

					if ($this->dataManager->updateDeclarationTemplateById($baseObj, $postData->getContent())) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_declaration_template', ['templateId' => $templateId, 'lang' => $params->fromRoute('lang')]);
					}
					else {
						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
						return $this->redirect()->toRoute('edit_declaration_template', ['templateId' => $templateId, 'lang' => $params->fromRoute('lang')]);
					}
				}
			}

			else {
				$declarationTemplateForm->bind($baseObj);
			}

			$docTypeList = $this->restService->getDocumentTypes();

			$templateActiveFields = $this->getActiveFieldsFromTemplate($baseObj->getContent());
			$declarationTemplateForm->get('activeFields')->setValue($templateActiveFields);
			$declarationTemplateForm->get('documentTypeId')->setValueOptions(['' => $docTypeList[$baseObj->getDocumentTypeId()]]);
			$declarationTemplateForm->get('documentTypeId')->setAttribute('disabled', 'disabled');

			return new ViewModel([
				'DTForm' 		=> $declarationTemplateForm,
				'templateId' 	=> $templateId,
				'params'		=> $params
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();

	}


	/**
	 * Функционалност "Изтриване на шаблон за декларация".
	 *
	 * @return Response HTTP отговор.
	 */
	public function deleteDeclarationTemplateAction() {

		$templateId = $this->params()->fromRoute('templateId');

		if ($baseObj = $this->dataManager->getDeclarationTemplateById($templateId)) {
			if ($this->dataManager->deleteDeclarationTemplateById($baseObj->getDocTemplateId()))
				$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');
			else
				$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

			return $this->redirect()->toRoute('declaration_template_list', ['templateId' => $templateId]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Преглед на шаблон за декларация".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewDeclarationTemplateAction() {

		$templateId = $this->params()->fromRoute('templateId', 0);

		$baseObj = $this->dataManager->getDeclarationTemplateById($templateId);

		$templateActiveFields = $this->getActiveFieldsFromTemplate($baseObj->getContent());

		$this->layout('layout/ajax');


		$docTypeList = $this->restService->getDocumentTypes();
		$baseObj->setName($docTypeList[$baseObj->getDocumentTypeId()]);

		return new ViewModel([
			'baseObj' 				=> $baseObj,
			'templateActiveFields' 	=> $templateActiveFields
		]);
	}


	/**
	 * Извлича списък с активните полета, които се използват в даден шаблон за декларация.
	 *
	 * @param string $text Съдържание на шаблон.
	 * @return string Списък с активни полета.
	 */
	public function getActiveFieldsFromTemplate($text) {

		$pattern = '/{([A-Z_А-Я]*)}/';

		preg_match_all($pattern, $text, $matches);

		$templateActiveFieldArr = isset($matches[1]) ? $matches[1] : [];

		if (!empty($templateActiveFieldArr)) {

			$activeFieldList = $this->dataManager->getActiveFields();

			$activeFieldArr = [];

			foreach ($activeFieldList as $activeField)
				$activeFieldArr[$activeField->key] = $activeField->description;

			$result = [];

			foreach ($templateActiveFieldArr as $templateActiveField) {

				if (array_key_exists($templateActiveField, $activeFieldArr))
					$result[] = '{'.$templateActiveField.'}'.' ('.$activeFieldArr[$templateActiveField].')';
			}

			return implode("\n", $result);
		}

		return '';
	}


	/**
	 * Функционалност "Списък с активни полета".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getActiveFieldsAction() {

		$activeFieldList = $this->dataManager->getActiveFields();

		$this->layout('layout/ajax');

		return new ViewModel([
			'activeFieldList' => $activeFieldList
		]);
	}


	/**
	 * Извлича списък с видове документи използвани в шаблони за декларации.
	 *
	 * @return array Масив с видове документи.
	 */
	public function getDocumentTypesWithTemplate() {

		$params = [
				'cp' 			=> 1,
				'rowCount' 		=> \Application\Module::APP_MAX_INT,
				'totalCount' 	=> false
		];

		$docTypeList = $this->restService->getDocumentTypes();

		$declarationTemplateList = $this->dataManager->getDeclarationTemplateList($totalCount, $params, $docTypeList);

		$idArr = [];

		foreach ($declarationTemplateList as $declarationTemplate)
			$idArr[$declarationTemplate->getDocumentTypeId()] = $declarationTemplate->getDocumentTypeId();

		return $idArr;
	}
}