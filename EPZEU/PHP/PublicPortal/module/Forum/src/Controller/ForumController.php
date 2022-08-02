<?php

namespace Forum\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Forum\Form\ForumForm;
use Application;

/**
 * Контролер реализиращ функционалности за работа с теми и коментари във форум.
 *
 * @package Forum
 * @subpackage Controller
 */
class ForumController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на теми и коментари във форум.
	 *
	 * @var \Forum\Data\ForumDataManager
	 */
	protected $forumDM;


	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


	/**
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Потребител.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Конструктор.
	 *
	 * @param \Forum\Data\ForumDataManager $forumDM Обект за поддържане и съхранение на теми и коментари във форум.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \Application\Service\RestService $restService Услуга за работа с REST уеб услуги.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребител.
	 */
	public function __construct($forumDM, $userService, $restService, $userDM) {
		$this->forumDM 		= $forumDM;
		$this->userService 	= $userService;
		$this->restService 	= $restService;
		$this->userDM 		= $userDM;
	}


	/**
	 * Функционалност "Списък с теми във форум".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function topicListAction() {

		$config = $this->getConfig();

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getTopicList();
		}

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'row_count' 	=> $rowCount,
			'status'		=> 1
		];

		$topicList = $this->forumDM->getTopicList($totalCount, $params);

		$userData = $this->userService->getUser();
		$userObj = $this->userDM->getUserList($totalCountTmp, ['id' => $userData->getUserId()]);

		return new ViewModel([
			'lang'			=> $this->params()->fromRoute('lang'),
			'topicList'		=> $topicList,
			'totalPages' 	=> ceil($totalCount/$rowCount),
			'totalCount' 	=> $totalCount,
			'userObj'		=> $userObj
		]);
	}


	/**
	 * Извлича списък с теми във форум при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getTopicList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 		=> $page,
			'row_count' => $rowCount,
			'total_count'	=> false,
			'status'		=> 1
		];

		$topicList = $this->forumDM->getTopicList($totalCount, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'topicList' => $topicList,
			'lang' => $this->params()->fromRoute('lang'),
		));

		$result->setTemplate('forum/forum/topic-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на нова тема във форум".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addTopicAction() {

		$userData = $this->userService->getUser();
		$userObj = $this->userDM->getUserList($totalCount, ['id' => $userData->getUserId()]);

		if (!$userObj->getFirstName()) {
			$result = new ViewModel(['lang'	=> $this->params()->fromRoute('lang')]);
			$result->setTemplate('forum/forum/fill-first-name-alert.phtml');
			return $result;
		}

		$forumForm = new ForumForm();
		$forumForm->get('username')->setValue($userObj->getFirstname());

		$request = $this->getRequest();

		if ($request->isPost()) {

			$forumForm->setData($request->getPost());

			if ($forumForm->isValid()) {

				$postData = $forumForm->getData();

				if ($this->forumDM->addTopic($forumForm->getData())) {

					$config = $this->getConfig();

					$this->restService->sendEmail(
							$this->restService::FORUM_NEW_COMMENT_NOTIFICATION,
							[$config['EP_CMS_FORUM_ADMIN_EMAIL']],
							[
								'{THEME}'			=> $postData->getTitle(),
								'{COMMENT}'			=> $postData->getComment(),
								'{COMMENT_DATE}'	=> date("d.m.Y H:i:s"),
							]
					);

					$this->flashMessenger()->addSuccessMessage('GL_PUBLIC_OK_I');
					return $this->redirect()->toRoute('topic_list', ['lang' => $this->params()->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'forumForm' => $forumForm,
			'lang'		=> $this->params()->fromRoute('lang')
		]);
	}


	/**
	 * Функционалност "Списък с коментари по тема във форум".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function topicCommentListAction() {

		$topicId = $this->params()->fromRoute('topicId');

		$params = [
				'cp' 			=> 1,
				'row_count' 	=> Application\Module::APP_MAX_INT,
				'total_count'	=> false,
				'idList'		=> $topicId,
				'status'		=> 1
		];


		if ($topicId <= \Application\Module::APP_MAX_INT && $topicObj = $this->forumDM->getTopicList($totalCount, $params)->current()) {

			$request = $this->getRequest();

			$userData = $this->userService->getUser();
			$userObj = $this->userDM->getUserList($totalCount, ['id' => $userData->getUserId()]);

			$forumForm = new ForumForm();

			$forumForm->get('username')->setValue($userObj->getFirstname());
			$forumForm->get('title')->setAttribute('disabled', true);
			$forumForm->get('title')->setValue($topicObj->getTitle());
			$forumForm->get('title')->setLabelAttributes(['class' => 'field-title field-title--form']);
			$forumForm->getInputFilter()->remove('title');

			$request = $this->getRequest();

			if ($request->isPost()) {

				$forumForm->setData($request->getPost());

				if ($forumForm->isValid()) {

					$postData = $forumForm->getData();

					$postData->setThemeId($topicId);

					if ($this->forumDM->addComment($postData)) {

						$config = $this->getConfig();

						$this->restService->sendEmail(
							$this->restService::FORUM_NEW_COMMENT_NOTIFICATION,
							[$config['EP_CMS_FORUM_ADMIN_EMAIL']],
							[
								'{THEME}'			=> $topicObj->getTitle(),
								'{COMMENT}'			=> $postData->getComment(),
								'{COMMENT_DATE}'	=> date("d.m.Y H:i:s"),
							]
						);

						$this->flashMessenger()->addSuccessMessage('GL_PUBLIC_OK_I');
						return $this->redirect()->toRoute('topic_comment_list', ['lang' => $this->params()->fromRoute('lang'), 'topicId' => $topicId]);
					}
				}
			}

			if ($request->isXmlHttpRequest()) {
				if ($request->getPost('getItemList'))
					return $result = $this->getTopicCommentList();
			}

			$config = $this->getConfig();

			$page = $this->params()->fromQuery('page', 1);
			$rowCount = $config['GL_ITEMS_PER_PAGE'];

			$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count'	=> true,
				'themeId'		=> $topicId,
				'status'		=> 1
			];

			$commentList = $this->forumDM->getCommentList($totalCount, $params);

			return new ViewModel([
				'topicObj'		=> $topicObj,
				'lang'			=> $this->params()->fromRoute('lang'),
				'commentList'	=> $commentList,
				'totalPages' 	=> ceil($totalCount/$rowCount),
				'totalCount' 	=> $totalCount,
				'forumForm'  	=> $forumForm,
				'topicId'		=> $topicId,
				'userObj'		=> $userObj
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Извлича списък с коментари по тема във форум при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getTopicCommentList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$topicId = $this->params()->fromRoute('topicId');

		$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count'	=> true,
				'themeId'		=> $topicId,
				'status'		=> 1
			];

		$commentList = $this->forumDM->getCommentList($totalCount, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
				'commentList' => $commentList,
				'lang' => $this->params()->fromRoute('lang'),
		));

		$result->setTemplate('forum/forum/topic-comment-list-partial.phtml');

		return $result;
	}
}