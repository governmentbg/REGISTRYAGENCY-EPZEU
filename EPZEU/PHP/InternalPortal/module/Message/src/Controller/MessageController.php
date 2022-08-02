<?php

namespace Message\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа със съобщения.
 *
 * @package Message
 * @subpackage Controller
 */
class MessageController extends AbstractActionController {

	/**
	 * Статус на съобщение: Изпратено
	 *
	 * @var int
	 */
	const MESSAGE_STATUS_SENT = 1;

	/**
	 * Статус на съобщение: Неизпратено
	 *
	 * @var int
	 */
	const MESSAGE_STATUS_NOT_SENT = 0;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Съобщение.
	 *
	 * @var \Message\Data\MessageDataManager
	 */
	protected $messageDM;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Конструктор.
	 *
	 * @param \Message\Data\MessageDataManager $messageDM Обект за поддържане и съхранение на обекти от тип Съобщение.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 */
	public function __construct($messageDM, $userDM) {
		$this->messageDM = $messageDM;
		$this->userDM = $userDM;
	}


	/**
	 * Функционалност "Списък със съобщения".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function messageListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getMessageList();
		}

		$params = [
			'cp' => $page,
			'rowCount' => $rowCount
		];

		// Търсене
		$searchForm = new \Message\Form\MessageForm();

		$messageStatus = ['' =>  'GL_CHOICE_ALL_L'] + [self::MESSAGE_STATUS_SENT => 'GL_SENTED_L', self::MESSAGE_STATUS_NOT_SENT => 'GL_NOSENTED_L'];
		$searchForm->get('status')->setValueOptions($messageStatus);

		$searchParams =$this->params()->fromQuery();

		$searchForm->get('about')->setLabelAttributes(['class' => '']);
		$searchForm->getInputFilter()->get('about')->setRequired(false);

		$searchForm->getInputFilter()->get('content')->setRequired(false);
		$searchForm->getInputFilter()->get('userRecipientType')->setRequired(false);

		$searchForm->setData($searchParams);

		if (!empty($searchParams['search'])) {

			if ($searchForm->isValid())
				$searchParams = $searchForm->getData();
		}

		$messageList = $this->messageDM->getMessageList($totalCount, $searchParams+$params);

		return new ViewModel([
			'params' 		=> $this->params(),
			'searchForm' 	=> $searchForm,
			'messageList' 	=> $messageList,
			'messageStatusSent' => self::MESSAGE_STATUS_SENT,
			'messageStatusNotSent' => self::MESSAGE_STATUS_NOT_SENT,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък със съобщения при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getMessageList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'totalCount' 	=> false
		];

		$searchParams = $this->params()->fromQuery();

		$messageList = $this->messageDM->getMessageList($totalCount, $searchParams+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' => $this->params(),
			'messageList' => $messageList,
			'messageStatusSent' => self::MESSAGE_STATUS_SENT,
			'messageStatusNotSent' => self::MESSAGE_STATUS_NOT_SENT
		));

		$result->setTemplate('message/message/message-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на съобщение".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addMessageAction() {

		$messageForm = new \Message\Form\MessageForm();

		$config = $this->getConfig();

		$request = $this->getRequest();

		$userRecipientTypeList = ['0' => 'EP_MSG_USERS_TO_L', '1' => 'EP_USR_USERS_L'];
		$messageForm->get('userRecipientType')->setValueOptions($userRecipientTypeList);

		$params = $this->params();

		$type = $params->fromRoute('type');

		if ($request->isPost()) {

		  	$messageForm->setHydrator(new \Zend\Hydrator\ClassMethodsHydrator(false));
			$messageForm->setObject(new \Message\Entity\MessageEntity());

			// потребители на регистри от портал
			if ($request->getPost()['userRecipientType'] == 0) {

				$request->getPost()['userIdList'] = [];

				$fieldsArr = ['isToAllCr', 'isToAllPr', 'isToAllEpzeu'];
				$atLeastOneFieldValidator = new \Application\Validator\AtLeastOneField([
					'fields'	=> $fieldsArr
				]);

				$isValidRegisterListUsers = $atLeastOneFieldValidator->isValid($request->getPost());

				if (!$isValidRegisterListUsers && !empty($atLeastOneFieldValidator->getMessages()))
					$messageForm->getInputFilter()->get('userRegisterList')->setRequired(true);
			}

			//списък с потребители
			else if ($request->getPost()['userRecipientType'] == 1) {

				$request->getPost()['isToAllCr'] = null;
				$request->getPost()['isToAllPr'] = null;
				$request->getPost()['isToAllEpzeu'] = null;

				$messageForm->getInputFilter()->get('userIdList')->setRequired(true);
				$isValidRegisterListUsers = 1;
			}

			$messageForm->setData($request->getPost());

			if ($messageForm->isValid() && $isValidRegisterListUsers) {

				$postData = $messageForm->getData();

				if ($newMessageId = $this->messageDM->addMessage($postData)) {

					if ($type == 'send') {
						if ($this->messageDM->sendMessageById($newMessageId)) {
							$this->flashMessenger()->addSuccessMessage('GL_SEND_OK_I');
							return $this->redirect()->toRoute('add_message', ['lang' => $params->fromRoute('lang')]);
						}
					}

					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_message', ['lang' => $params->fromRoute('lang')]);
				}
			}

			$userIdArr = $messageForm->get('userIdList')->getValue();
			$userRecipientType = $messageForm->get('userRecipientType')->getValue();

			if (!empty($userIdArr) && $userRecipientType == 1) {

				$userList = $this->userDM->getUserList($totalCount, ['id' => implode(',', array_map('intval', $userIdArr))], true);

				foreach ($userList as $userObj)
					$userIdList[$userObj->getUserId()] = \User\Service\UserService::getUserInfoString($userObj);

				$messageForm->get('userIdList')->setValueOptions($userIdList);
			}
		}

		return new ViewModel([
			'messageForm' => $messageForm,
			'params' => $this->params()
		]);
	}


	/**
	 * Функционалност "Редактиране на съобщение".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editMessageAction() {

		$messageForm = new \Message\Form\MessageForm();

		$config = $this->getConfig();

		$params = $this->params();

		$messageId = $this->params()->fromRoute('messageId', 0);

		$type = $params->fromRoute('type');

		$paramList = [
			'idList' 		=> [$messageId],
			'loadRecipients' => 1
		];

		if ($baseObj = $this->messageDM->getMessageList($totalCount, $paramList)->current()) {

			$oldRecipientUserList = [];
			$oldRecipientUserList = array_keys($baseObj->getUserIdList());

			$messageForm->setHydrator(new \Zend\Hydrator\ClassMethodsHydrator(false));
			$messageForm->setObject(new \Message\Entity\MessageEntity());

			$messageStatus = [self::MESSAGE_STATUS_SENT => 'GL_SENTED_L', self::MESSAGE_STATUS_NOT_SENT => 'GL_NOSENTED_L'];
			$messageForm->get('status')->setAttributes(['class' => 'form-inline']);
			$messageForm->get('status')->setAttribute('disabled', 'disabled');
			$messageForm->get('status')->setValueOptions($messageStatus);

			$userRecipientTypeList = ['0' => 'EP_MSG_USERS_TO_L', '1' => 'EP_USR_USERS_L'];
			$messageForm->get('userRecipientType')->setValueOptions($userRecipientTypeList);

			$request = $this->getRequest();

			if (!empty($request->getPost()['userIdList']) && !empty($request->getPost()['userRecipientType'])) {

				$userIdArr = $request->getPost()['userIdList'];
				$userList = $this->userDM->getUserList($totalCount, ['id' => implode(',', array_map('intval', $userIdArr))], true);

				foreach ($userList as $userObj)
					$userIdList[$userObj->getUserId()] = \User\Service\UserService::getUserInfoString($userObj);

				$messageForm->get('userIdList')->setValueOptions($userIdList);
			}

			if ($request->isPost()) {

				$messageForm->get('status')->setValue($baseObj->getStatus());
				$messageForm->get('updatedOn')->setValue($baseObj->getUpdatedOn());

				// неизпратено съобщение
				if ($baseObj->getStatus() == self::MESSAGE_STATUS_NOT_SENT) {

					// потребители на регистри от портал
					if ($request->getPost()['userRecipientType'] == 0) {

						$request->getPost()['userIdList'] = [];

						$fieldsArr = ['isToAllCr', 'isToAllPr', 'isToAllEpzeu'];
						$atLeastOneFieldValidator = new \Application\Validator\AtLeastOneField([
							'fields'	=> $fieldsArr
						]);

						$isValidRegisterListUsers = $atLeastOneFieldValidator->isValid($request->getPost());

						if (!$isValidRegisterListUsers && !empty($atLeastOneFieldValidator->getMessages()))
							$messageForm->getInputFilter()->get('userRegisterList')->setRequired(true);
					}

					//списък с потребители
					else if ($request->getPost()['userRecipientType'] == 1) {

						$request->getPost()['isToAllCr'] = null;
						$request->getPost()['isToAllPr'] = null;
						$request->getPost()['isToAllEpzeu'] = null;

						$messageForm->getInputFilter()->get('userIdList')->setRequired(true);
						$isValidRegisterListUsers = 1;
					}

					$messageForm->setData($request->getPost());

					if ($messageForm->isValid() && $isValidRegisterListUsers) {

						$postData = $messageForm->getData();

						$postData->setMessageId($messageId);

						// списък с потребители - добавяне , изтриване
						$newRecipientUserList = [];
						$newRecipientUserList = $postData->getUserIdList();

						$intersectRecipientUserList = [];
						$intersectRecipientUserList = (!empty($oldRecipientUserList) && !empty($newRecipientUserList)) ? array_intersect($oldRecipientUserList, $newRecipientUserList) : [];

						if (!empty($intersectRecipientUserList)) {
							$postData->userArr['delete'] = array_diff($oldRecipientUserList, $intersectRecipientUserList);
							$postData->userArr['add'] = array_diff($newRecipientUserList, $intersectRecipientUserList);
						}
						else {
							$postData->userArr['delete'] = !empty($oldRecipientUserList) ? $oldRecipientUserList : [];
							$postData->userArr['add'] = !empty($newRecipientUserList) ? $newRecipientUserList : [];
						}

						if ($this->messageDM->updateMessageById($postData)) {

							if ($type == 'send') {
								if ($this->messageDM->sendMessageById($messageId)) {
									$this->flashMessenger()->addSuccessMessage('GL_SEND_OK_I');
									return $this->redirect()->toRoute('edit_message', ['messageId' => $messageId, 'lang' => $params->fromRoute('lang'), 'type' => 'send']);
								}
							}

							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('edit_message', ['messageId' => $messageId, 'lang' => $params->fromRoute('lang')]);
						}
					}
				}

				// съобщението вече е било изпратено
				else {

					if ($type == 'send') {
						$this->flashMessenger()->addErrorMessage('EP_MSG_IS_SEND_NO_SEND_E');
						return $this->redirect()->toRoute('edit_message', ['messageId' => $messageId, 'lang' => $params->fromRoute('lang'), 'type' => 'send']);
					}

					else {
						$this->flashMessenger()->addErrorMessage('EP_MSG_IS_SEND_NO_EDIT_E');
						return $this->redirect()->toRoute('edit_message', ['messageId' => $messageId, 'lang' => $params->fromRoute('lang')]);
					}
				}
			}

			else {

				//списък с потребители
				if (!empty($baseObj->getUserIdList())) {

					$baseObj->setUserRecipientType(1);
					$messageForm->get('userIdList')->setValueOptions($baseObj->getUserIdList());
				}

				// потребители на регистри от портал
				else
					$baseObj->setUserRecipientType(0);

				$messageForm->bind($baseObj);
			}

			return new ViewModel([
				'messageForm' => $messageForm,
				'messageId' => $messageId,
				'params' => $params
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Изтриване на съобщение".
	 *
	 * @return Response HTTP отговор.
	 */
	public function deleteMessageAction() {

		$messageId = $this->params()->fromRoute('messageId');

		if ($baseObj = $this->messageDM->getMessageList($totalCount, ['idList' => [$messageId]])->current()) {

			// неизпратено съобщение
			if ($baseObj->getStatus() == self::MESSAGE_STATUS_NOT_SENT) {

				if ($this->messageDM->deleteMessageById($baseObj->getMessageId()))
					$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');
				else
					$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

				return $this->redirect()->toRoute('message_list');
			}

			else {
				$this->flashMessenger()->addErrorMessage('EP_MSG_IS_SEND_NO_DELETED_E');
				return $this->redirect()->toRoute('message_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
			}
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Преглед на съобщение".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewMessageAction() {

		$messageId = $this->params()->fromRoute('messageId', 0);

		$params = [
			'idList' => [$messageId],
			'loadRecipients' => 1
		];

		$baseObj = $this->messageDM->getMessageList($totalCount, $params)->current();

		$this->layout('layout/ajax');

		return new ViewModel([
			'baseObj' => $baseObj,
			'messageStatusSent' => self::MESSAGE_STATUS_SENT,
			'messageStatusNotSent' => self::MESSAGE_STATUS_NOT_SENT
		]);
	}
}