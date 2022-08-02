<?php

namespace Forum\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\InputFilter\InputFilter;
use function Zend\Mvc\Controller\redirect;

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
	 * Конструктор.
	 *
	 * @param \Forum\Data\ForumDataManager $forumDM Обект за поддържане и съхранение на теми и коментари във форум.
	 */
	public function __construct($forumDM) {
		$this->forumDM = $forumDM;
	}


	/**
	 * Функционалност "Списък със забранени думи".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function forbiddenWordListAction() {

		$config = $this->getConfig();

		$page = $this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getForbiddenWordList();

			elseif ($request->getPost('updateForbiddenWord')) {
				$result = $this->updateForbiddenWord();
				return $result;
			}
		}

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount
		];

		// Търсене
		$searchForm = new \Forum\Form\ForbiddenWordForm();

		$searchParams =$this->params()->fromQuery();

		$searchForm->setData($searchParams);

		if (!empty($searchParams['search'])) {

			if ($searchForm->isValid())
				$searchParams = $searchForm->getData();
		}

		$forbiddenWordList = $this->forumDM->getForbiddenWordList($totalCount, $searchParams+$params);

		return new ViewModel([
			'params' 			=> $this->params(),
			'searchForm' 		=> $searchForm,
			'forbiddenWordList' => $forbiddenWordList,
			'totalCount'		=> $totalCount,
			'totalPages'		=> ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък със забранени думи при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getForbiddenWordList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'totalCount' 	=> false
		];

		$searchParams = $this->params()->fromQuery();

		$forbiddenWordList = $this->forumDM->getForbiddenWordList($totalCount, $searchParams+$params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'params' => $this->params(),
			'forbiddenWordList' => $forbiddenWordList
		));

		$result->setTemplate('forum/forum/forbidden-word-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Добавяне на забранена дума".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function addForbiddenWordAction() {

		$forbiddenWordForm = new \Forum\Form\ForbiddenWordForm();

		$request = $this->getRequest();

		$params = $this->params();

		$forbiddenWordForm->getInputFilter()->remove('search');
		$forbiddenWordForm->getInputFilter()->get('word')->setRequired(true);
		$forbiddenWordForm->get('word')->setLabelAttributes(['class' => 'required-field']);

		if ($request->isPost()) {

			$forbiddenWordForm->setHydrator(new \Zend\Hydrator\ClassMethodsHydrator(false));
			$forbiddenWordForm->setObject(new \Forum\Entity\ForbiddenWordEntity());

			$forbiddenWordForm->setData($request->getPost());

			if ($forbiddenWordForm->isValid()) {

				$postData = $forbiddenWordForm->getData();

				if ($this->forumDM->addForbiddenWord($postData)) {
					$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
					return $this->redirect()->toRoute('add_forbidden_word', ['lang' => $params->fromRoute('lang')]);
				}
			}
		}

		return new ViewModel([
			'forbiddenWordForm' => $forbiddenWordForm,
			'params' 			=> $this->params(),
		]);
	}


	/**
	 * Обновява забранена дума.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateForbiddenWord() {

		$forbiddenWordId = $this->params()->fromPost('id', 0);

		if (!$this->isAllowed('edit_forbidden_word'))
			$error[] = ['edit-forbidden-word-'.$forbiddenWordId => "GL_ERROR_L"];

		if (!empty($error)) {

			return new JsonModel([
				'status' 		=> 'error-td',
				'errors' 		=> $error,
				'editBtnClass' 	=> 'edit-section-'.$forbiddenWordId
			]);
		}

		$params = [
			'cp' 			=> 1,
			'rowCount' 		=> 1,
			'totalCount' 	=> false,
			'wordId' 		=> [$forbiddenWordId]
		];

		if ($forbiddenWordObj = $this->forumDM->getForbiddenWordList($totalCount, $params)->current()) {

			$forbiddenWordId = $forbiddenWordObj->getWordId();

			$postData = $this->params()->fromPost();

			$forbiddenWordObj->setWord(null);

			// Проверка за валидни входящи параметри

			$inputFilter = new InputFilter();

			$inputFilter->add([
				'name' => 'forbiddenWord',
				'required' => true,
				'validators' => [
					['name' => \Zend\Validator\NotEmpty::class]
				],
				'filters' => [
					['name' => \Zend\Filter\StringTrim::class],
					['name' => \Zend\Filter\StripTags::class]
				]
			]);

			$inputFilter->setData($postData);

			if (!$inputFilter->isValid())
				$error[] = ['edit-forbidden-word-'.$forbiddenWordId => "GL_INPUT_FIELD_MUST_E"];

			// Филтрирани данни
			$forbiddenWord = $inputFilter->getValues()['forbiddenWord'];

			$forbiddenWordObj->setWord($forbiddenWord);

			if (!empty($error)) {

				return new JsonModel([
					'status' 		=> 'error-td',
					'errors' 		=> $error,
					'editBtnClass'	=> 'edit-section-'.$forbiddenWordId
				]);
			}

			if ($this->forumDM->updateForbiddenWordById($forbiddenWordObj)) {
				return new JsonModel([
					'status' => 'success',
				]);
			}
		}

		return new JsonModel([
			'status' => 'error-td',
			'errors' 	=> !empty($error) ? $error : [['edit-forbidden-word-'.$forbiddenWordId => "GL_ERROR_L"]],
			'editBtnClass' => 'edit-section-'.$forbiddenWordId
		]);
	}


	/**
	 * Функционалност "Изтриване на забранена дума".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function deleteForbiddenWordAction() {

		$forbiddenWordId = $this->params()->fromRoute('forbiddenWordId');

		if ($baseObj = $this->forumDM->getForbiddenWordList($totalCount, ['wordId' => [$forbiddenWordId]])->current()) {

			if ($this->forumDM->deleteForbiddenWordById($baseObj->getWordId()))
				$this->flashMessenger()->addSuccessMessage('GL_DELETE_OK_I');
			else
				$this->flashMessenger()->addErrorMessage('GL_ERROR_L');

			return $this->redirect()->toRoute('forbidden_word_list');
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Функционалност "Списък с коментари във форум".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function commentListAction() {

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $result = $this->getCommentList();
		}

		$searchForm = new \Forum\Form\CommentSearchForm();
		$searchForm->setData($this->params()->fromQuery());
		$searchForm->isValid();

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 			=> $page,
			'row_count' 	=> $rowCount,
			'total_count'	=> true
		];

		$commentList = $this->forumDM->getCommentList($totalCount, $params+$this->params()->fromQuery());

		return new ViewModel([
			'lang' 			=>  $this->params()->fromRoute('lang'),
			'params' 		=> $this->params(),
			'searchForm' 	=> $searchForm,
			'commentList'	=> $commentList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък с коментари във форум при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getCommentList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$topicId = $this->params()->fromRoute('topicId');

		$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count'	=> false,
				'themeId'		=> $topicId
		];

		$commentList = $this->forumDM->getCommentList($totalCount, $params+$this->params()->fromQuery());

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'commentList' 	=> $commentList,
			'lang' 			=> $this->params()->fromRoute('lang'),
			'params' 		=> $this->params()
		));

		$result->setTemplate('forum/forum/comment-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Промяна на статус на коментар".
	 *
	 * @return Response HTTP отговор.
	 */
	public function changeCommentStatusAction() {

		$commentId = $this->params()->fromRoute('commentId');

		$params = [
			'cp' 				=> 1,
			'row_count' 		=> 1,
			'themeCommentId'	=> $commentId,
			'total_count'		=> false,
		];

		$commentObj = $this->forumDM->getCommentList($totalCount, $params)->current();

		if (!$commentObj->getThemeStatus() && !$commentObj->getIsFirst())
			return $this->redirect()->toRoute('comment_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);

		$newStatus = !$commentObj->getStatus();

		$this->forumDM->changeCommentStatus($commentId, $newStatus);

		$flashMessage = $newStatus ? 'GL_ACTIVE_OK_I' : 'GL_DEACTIVE_OK_I';
		$this->flashMessenger()->addSuccessMessage($flashMessage);
		return $this->redirect()->toRoute('comment_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
	}
}
