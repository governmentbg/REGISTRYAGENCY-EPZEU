<?php

namespace Content\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа с бюлетини.
 *
 * @package Content
 * @subpackage Controller
 */
class BulletinController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на обекти от тип Бюлетин.
	 *
	 * @var \Content\Data\BulletinDataManager
	 */
	protected $bulletinDM;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;


	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\BulletinDataManager $bulletinDM Обект за поддържане и съхранение на обекти от тип Бюлетин.
	 */
	public function __construct($bulletinDM, $userDM, $restService) {
		$this->bulletinDM = $bulletinDM;
		$this->userDM = $userDM;
		$this->restService = $restService;
	}


	/**
	 * Функционалност "Списък с бюлетини".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function bulletinListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getBulletinList();
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
		];

		$bulletinList = $this->bulletinDM->getBulletinList($totalCount, $params);

		return new ViewModel([
			'params'		=> $this->params(),
			'bulletinList'	=> $bulletinList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount),
			'lang'			=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	 * Извлича списък с бюлетини при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getBulletinList() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount,
		];

		$bulletinList = $this->bulletinDM->getBulletinList($totalCount, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'params'		=> $this->params(),
			'bulletinList'	=> $bulletinList,
			'lang'			=> $this->params()->fromRoute('lang')
		]);

		$result->setTemplate('content/bulletin/bulletin-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на бюлетин".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addBulletinAction() {

		$bulletinForm = new \Content\Form\BulletinForm();
		$request = $this->getRequest();

		$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));

		$bulletinForm->get('files')->setValueOptions($fileArr);

		if ($request->isPost()) {

			$bulletinForm->setData($request->getPost());

			if ($bulletinForm->isValid()) {

				$bulletinData = $bulletinForm->getData();
				$bulletinData->setFiles($fileArr);

				if ($this->bulletinDM->addBulletin($bulletinData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_bulletin', ['lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		$config = $this->getConfig();

		return  new ViewModel([
			'bulletinForm'	=> $bulletinForm,
			'params'		=> $this->params(),
			'fileArr' 		=> $fileArr
		]);
	}


	/**
	 * Функционалност "Редактиране на бюлетин".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editBulletinAction() {

		$bulletinForm = new \Content\Form\BulletinForm();

		$config = $this->getConfig();

		$params = $this->params();

		$bulletinId = $this->params()->fromRoute('bulletinId', 0);

		$paramList = [
			'totalCount' 	=> false,
			'idList' 		=> [$bulletinId]
		];

		if ($baseObj = $this->bulletinDM->getBulletinList($totalCount, $paramList)->current()) {

			$baseObj->setDateFrom(date('d.m.Y', strtotime($baseObj->getDateFrom())));
			$baseObj->setDateTo(date('d.m.Y', strtotime($baseObj->getDateTo())));

			$request = $this->getRequest();

			$bulletinForm->getInputFilter()->get('files')->setRequired(false);

			if (!empty($this->params()->fromPost('deletedFiles')) && !$this->params()->fromPost('files', null) )
				$bulletinForm->getInputFilter()->get('files')->setRequired(true);

			$deletedFiles = $this->params()->fromPost('deletedFiles', []);
			$deletedFiles = array_combine($deletedFiles, $deletedFiles);

			$bulletinForm->get('deletedFiles')->setValueOptions($deletedFiles);
			$bulletinForm->get('deletedFiles')->setValue([$deletedFiles]);

			$fileArr = \Document\Service\DocumentService::getFileArrayFromUploadedFiles($this->params()->fromPost('files', []));

			$bulletinForm->get('files')->setValueOptions($fileArr);

			if ($request->isPost()) {

				$bulletinForm->setData($request->getPost());

				if ($bulletinForm->isValid()) {

					$postData = $bulletinForm->getData();
					$postData->setFiles($fileArr);
					$postData->setBulletinId($baseObj->getBulletinId());


					if ($this->bulletinDM->updateBulletinById($postData)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_bulletin', ['bulletinId' => $bulletinId, 'lang' => $params->fromRoute('lang')]);
					}

					else {
						$this->flashMessenger()->addErrorMessage('GL_ERROR_L');
						return $this->redirect()->toRoute('edit_bulletin', ['bulletinId' => $bulletinId, 'lang' => $params->fromRoute('lang')]);
					}
				}
			}

			else {
				$bulletinForm->bind($baseObj);
			}

			return new ViewModel([
				'bulletinForm' 			=> $bulletinForm,
				'bulletinId' 			=> $bulletinId,
				'fileArr' 				=> $fileArr,
				'fileName' 				=> $baseObj->getFileName(),
				'fileSize' 				=> $baseObj->getFileSize(),
				'params' 				=> $params,
				'baseObj' 				=> $baseObj,
				'isDeletedOriginalFile' => empty($deletedFiles) ? true : false
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Промяна на статус на бюлетин".
	 *
	 * @return Response HTTP отговор.
	 */
	public function changeBulletinStatusAction() {

		$sendEmails = (int)$this->params()->fromPost('sendEmails');

		$bulletinId = $this->params()->fromRoute('bulletinId', 0);

		$params = [
			'idList' => [$bulletinId],
			'totalCount' => false
		];


		if ($bulletinObj = $this->bulletinDM->getBulletinList($totalCount, $params)->current()) {

			// Смяна на статус
			$newStatus = (int)!$bulletinObj->getStatus();

			// Подготовка за изпращане на имейл
			if ($newStatus) {

				$userEmailList = [];
				$emailParams = [];

				if ($sendEmails && $userList = $this->userDM->getUserList($totalCount, ['bulletinAcceptance' => [1,2], 'status' => 1], true)) {

					foreach ($userList as $user)
						$userEmailList[] = ['DisplayName' => (!empty($user->getFirstName()) && !empty($user->getFamilyName()) ? $user->getFirstName().' '.$user->getFamilyName() : $user->getEmail()), 'Address' => $user->getEmail(), 'Type' => 1];

					$config = $this->getConfig();

					$emailParams = [
							'template' 	=> 8,
							'recipient' => $userEmailList,
							'params' 	 => [
								'{BULLETIN_PERIOD}' => date('d.m.Y', strtotime($bulletinObj->getDateFrom())).' - '.date('d.m.Y', strtotime($bulletinObj->getDateTo())),
								'{BULLETIN_FILE_LINK}' => \Application\Service\AppService::getFEUrl($config).'bulletin-file-download/'.$bulletinObj->getBulletinId().'-'.strtotime($bulletinObj->getUpdatedOn()),
								'{USER_PROFILE_LINK}' => \Application\Service\AppService::getFEUrl($config).'login'
							]
					];
				}

				if ($this->bulletinDM->changeBulletinStatus($bulletinId, $newStatus, $this->restService, $emailParams, $sendEmails))
					$this->flashMessenger()->addSuccessMessage('GL_PUBLIC_OK_I');
				else
					$this->flashMessenger()->addErrorMessage('EP_USR_00023_I');

			}

			else {
				if ($this->bulletinDM->changeBulletinStatus($bulletinId, $newStatus))
					$this->flashMessenger()->addSuccessMessage('GL_PUBLIC_CANCEL_OK_I');
				else
					$this->flashMessenger()->addErrorMessage('EP_USR_00023_I');
			}

			return $this->redirect()->toRoute('bulletin_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Сваляне на файл с бюлетин".
	 */
	public function bulletinFileDownloadAction() {

		$bulletinId = $this->params()->fromRoute('bulletinId');

		$params = [
			'totalCount' 	=> false,
			'idList' 		=> [$bulletinId]
		];

		$baseObj = $this->bulletinDM->getBulletinList($totalCount, $params)->current();

		$fileName = $baseObj->getBulletinId().'_'.$baseObj->getFileName();

		$config = $this->getConfig();

		if ($bulletinContent = $this->bulletinDM->getBulletinFileById($bulletinId))
			return \Document\Service\DocumentService::getFileFromDatabase($baseObj, $bulletinContent);

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}
