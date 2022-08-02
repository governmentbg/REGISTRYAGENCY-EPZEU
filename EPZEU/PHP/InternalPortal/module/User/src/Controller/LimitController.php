<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\InputFilter\InputFilter;
use User\Form\IntervalInputFilter;
use User\Entity\UserEntity;
use User\Entity\UserServiceLimitEntity;

/**
 * Контролер реализиращ функционалности за лимити и лимити на потребители.
 *
 * @package User
 * @subpackage Controller
 */
class LimitController extends AbstractActionController {


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
	 * @param unknown $translator
	 * @param unknown $userDM
	 * @param unknown $cacheService
	 */
	public function __construct($translator, $userDM, $cacheService) {
		$this->translator = $translator;
		$this->userDM = $userDM;
		$this->cacheService = $cacheService;

	}


	/**
	 * Функционалност "Лимити за услуги за предоставяне на данни".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function limitListAction() {

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {

			if ($request->getPost('getItemList'))
				return $this->getLimitList();

			elseif ($request->getPost('updateLimit'))
				return $this->updateLimit();
		}

		$lang = $this->params()->fromRoute('lang');

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count' 	=> true
		];

		$queryParams = $this->params()->fromQuery();

		$moduleList = $this->cacheService->getModuleList();

		$searchForm = new \User\Form\LimitSearchForm();

		$searchForm->get('moduleId')->setValueOptions(['' => 'GL_CHOICE_ALL_L'] + $moduleList);

		$searchForm->setData(array_map('trim',$this->params()->fromQuery()));

		$type = $this->params()->fromRoute('type');

		if ($type == "selectLimitService") {
			$this->layout('layout/layout-no-header');
			$params['status'] = 1;
			$searchForm->get('status')->setValue(1);
			$searchForm->get('status')->setAttribute('disabled', true);
		}

		$limitList = $this->userDM->getServiceLimitList($totalCount, $queryParams+$params);

		return new ViewModel([
			'searchForm' 	=> $searchForm,
			'lang' 			=> $lang,
			'limitList'		=> $limitList,
			'moduleList' 	=> $moduleList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount) ?: 1,
			'params'		=> $this->params(),
			'type' 			=> $type,
		]);
	}


	/**
	 * Взима списък с лимити за услуги за предоставяне на данни.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLimitList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$lang = $this->params()->fromRoute('lang');

		$queryParams = array_map('trim', $this->params()->fromQuery());

		$params = [
			'cp' 			=> $page,
			'row_count' 	=> $rowCount,
			'total_count' 	=> false
		];

		$type = $this->params()->fromRoute('type');

		if ($type == "selectLimitService")
			$params['status'] = 1;

		$limitList = $this->userDM->getServiceLimitList($totalCount, $params+$queryParams);

		$moduleList = $this->cacheService->getModuleList();

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'limitList'		=> $limitList,
			'moduleList'	=> $moduleList,
			'lang'			=> $lang,
			'params'		=> $this->params(),
			'type'			=> $type
		]);

		$result->setTemplate('user/limit/limit-list-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Смяна на статус на лимит".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function changeLimitStatusAction() {

		$lang = $this->params()->fromRoute('lang');

		$limitId = $this->params()->fromRoute('limitId');
		$params = ['id' => $limitId, 'total_count' => false];

		$result = $this->userDM->getServiceLimitList($totalCount, $params);

		if ($limitObj = $result->current()) {

			$request = $this->getRequest();

			if ($request->isXmlHttpRequest()) {

				if ($request->getPost('getItemList'))
					return $this->getLimitUserList(['type' => 'changeLimitStatus']);
			}


			$config = $this->getConfig();

			$params = [
				'serviceLimitId' => $limitId,
				'cp' 			=> (int)$this->params()->fromQuery('page', 1),
				'row_count' 	=>  $config['GL_ITEMS_PER_PAGE'],
				'total_count' 	=> true,
				'status'		=> 1,
			];

			$userLimitList = $this->userDM->getUserServiceLimitList($totalCount, $params);

			// Проверка за активиран лимит на потребител при деактивиране на лимит за предоставяне на услуги
			if ($totalCount && $limitObj->getStatus()) {

				$deactivateUserLimits = $this->params()->fromPost('deactivateUserLimits', false);

				if ($request->isPost() && $deactivateUserLimits) {

					$newStatus = $limitObj->getStatus() ? 0 : 1;
					$limitObj->setStatus($newStatus);

					$this->userDM->updateServiceLimitStatus($limitObj->getServiceLimitId(), $newStatus);
					$this->userDM->updateServiceLimit($limitObj->getServiceLimitId(), $limitObj);

					$flashMessage = $newStatus ? 'GL_ACTIVE_OK_I' : 'GL_DEACTIVE_OK_I';
					$this->flashMessenger()->addSuccessMessage($flashMessage);
					return $this->redirect()->toRoute('limit_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
				}

				return new ViewModel([
					'lang'				=> $lang,
					'limitObj' 			=> $limitObj,
					'params' 			=> $this->params(),
					'limitUserList'		=> $userLimitList,
					'totalCount' 		=> $totalCount,
					'totalPages' 		=> ceil($totalCount/$config['GL_ITEMS_PER_PAGE']) ?: 1,
					'type'				=> 'changeLimitStatus'
				]);
			}


			// Смяна на статус
			$newStatus = $limitObj->getStatus() ? 0 : 1;
			$limitObj->setStatus($newStatus);

			$this->userDM->updateServiceLimit($limitObj->getServiceLimitId(), $limitObj);

			$flashMessage = $newStatus ? 'GL_ACTIVE_OK_I' : 'GL_DEACTIVE_OK_I';
			$this->flashMessenger()->addSuccessMessage($flashMessage);
			return $this->redirect()->toRoute('limit_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}


	/**
	 * Взима списък с лимити на услуги за предоставяне на данни.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function limitUserListAction() {

		$lang = $this->params()->fromRoute('lang');

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList'))
				return $this->getLimitUserList();
		}

		$searchForm = new \User\Form\LimitSearchForm();

		$limitList = $this->userDM->getServiceLimitList($totalCount, ['total_count' => false, 'cp' => 1, 'row_count' => \Application\Module::APP_MAX_INT]);

		$limitArr[0] = 'GL_CHOICE_L';
		foreach ($limitList as $limit)
			$limitArr[$limit->getServiceLimitId()] = $limit->getServiceCode().' '.$limit->getServiceName();

		$userObj = new UserEntity();

		if ($userId = $this->params()->fromQuery('userId'))
			$userObj = $this->userDM->getUserList($totalCount, ['id' => $userId, 'total_count' => false]);

		$searchForm->get('serviceLimitId')->setValueOptions($limitArr);

		$queryParams = $this->params()->fromQuery();

		$searchForm->setData($queryParams);

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$lang = $this->params()->fromRoute('lang');

		$queryParams = array_map('trim', $this->params()->fromQuery());

		$params = [
				'cp' 			=> $page,
				'row_count' 	=> $rowCount,
				'total_count' 	=> true
		];

		$limitUserList = $this->userDM->getUserServiceLimitList($totalCount, $params+$queryParams);

		return new ViewModel([
			'searchForm' 	=> $searchForm,
			'lang' 			=> $lang,
			'limitUserList' => $limitUserList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount) ?: 1,
			'params'		=> $this->params(),
			'userObj'		=> $userObj,
			'type'			=> null
		]);
	}


	/**
	 * Взима списък с лимити за предоставяне на данни за потребители.
	 *
	 * @param array $params Масив с критерии за филтриране.
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getLimitUserList($params = []) {

		$type = isset($params['type']) ? $params['type'] : null;

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$lang = $this->params()->fromRoute('lang');

		$queryParams = array_map('trim', $this->params()->fromQuery());

		$params = [
			'cp' 			=> $page,
			'row_count' 	=> $rowCount,
			'total_count' 	=> false,
			'serviceLimitId' => $this->params()->fromRoute('limitId', null),
		];

		$limitUserList = $this->userDM->getUserServiceLimitList($totalCount, $params+$queryParams);

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'limitUserList'	=> $limitUserList,
			'lang'			=> $lang,
			'params'		=> $this->params(),
			'type'			=> $type
		]);

		$result->setTemplate('user/limit/limit-user-list-partial.phtml');

		return $result;
	}

	/**
	 * Функционалност "Лимит на потребител за услуга за предоставяне на данни".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function manageUserLimitAction() {

		$lang = $this->params()->fromRoute('lang');
		$userId = null;

		$userObj = new UserEntity();
		$limitServiceObj = new UserServiceLimitEntity();

		$userLimitId = $this->params()->fromRoute('userLimitId');

		$limitUserForm = new \User\Form\LimitServiceUserForm();

		$request = $this->getRequest();

		if ($request->isPost()) {

			$limitUserForm->setData($request->getPost());

			$fieldsArr = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];
			$atLeastOneFieldValidator = new \Application\Validator\AtLeastOneField([
				'fields'	=> $fieldsArr,
				'messages'	=> ['invalidInterval' => 'EP_NOM_START_DATE_ERROR_E']
			]);

			$validForm = $limitUserForm->isValid();
			$validInterval = $atLeastOneFieldValidator->isValid($request->getPost());

			if ($validForm && $validInterval) {

				$dataObj = $limitUserForm->getData();

				$requestsInterval = \Application\Service\AppService::createDateIntervalFromArray([
					'days' 			=> $dataObj->getDays(),
					'hours' 		=> $dataObj->getHours(),
					'minutes'		=> $dataObj->getMinutes(),
					'seconds' 		=> $dataObj->getSeconds(),
					'milliseconds'	=> $dataObj->getMilliseconds(),
				]);

				$dataObj->setRequestsInterval($requestsInterval);

				// Обновяване на услуга за предоставяне на данни на потребител
				if ($userLimitId) {

					$userServiceLimitObj = $this->userDM->getUserServiceLimitList($totalCount, ['idList' => $userLimitId, 'totlal_count' => false])->current();

					// Сменен потребител или услуга
					if ($dataObj->getUserId() != $userServiceLimitObj->getUserId() || $dataObj->getServiceLimitId() != $userServiceLimitObj->getServiceLimitId()) {

						$userObj = $this->userDM->getUserList($totalCount, ['id' => $dataObj->getUserId(), 'total_count' => false]);
						$limitObj = $this->userDM->getServiceLimitList($totalCount, ['id' => $dataObj->getServiceLimitId(), 'total_count' => false])->current();

						// Проверка за активен статус
						if (!$limitObj->getStatus()) {
							$this->flashMessenger()->addErrorMessage('EP_NOM_SERVICE_LIMIT_NOACTIVE_E');
							return $this->redirect()->toRoute('add_user_limit', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
						}

						// Проверка за активен статус на потребител
						if (!$userObj->getStatus()) {
							$this->flashMessenger()->addErrorMessage('GL_USER_PROFILE_NOACTIVE_E');
							return $this->redirect()->toRoute('add_user_limit', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
						}
					}

					$dataObj->setStatus($userServiceLimitObj->getStatus());
					$dataObj->setUserLimitId($userLimitId);

					if ($this->userDM->updateUserServiceLimitById($dataObj)) {
						$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
						return $this->redirect()->toRoute('edit_user_limit', ['userLimitId' => $userLimitId, 'lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
					}

					$userObj = $this->userDM->getUserList($totalCount, ['id' => $this->params()->fromPost('userId'), 'total_count' => false]);
					$limitServiceObj = $this->userDM->getServiceLimitList($totalCount, ['id' => $this->params()->fromPost('serviceLimitId'), 'total_count' => false])->current();

				}

				// Добавяне на услуга за предоставяне на данни на потребител
				else {

					$dataObj->setStatus(1);
					$dataObj->setUserLimitId($userLimitId);

					$userObj = $this->userDM->getUserList($totalCount, ['id' => $dataObj->getUserId(), 'total_count' => false]);
					$limitObj = $this->userDM->getServiceLimitList($totalCount, ['id' => $dataObj->getServiceLimitId(), 'total_count' => false])->current();

					// Проверка за активен статус лимит на услуга
					if (!$limitObj->getStatus()) {
						$this->flashMessenger()->addErrorMessage('EP_NOM_SERVICE_LIMIT_NOACTIVE_E');
						return $this->redirect()->toRoute('add_user_limit', ['lang' => $this->params()->fromRoute('lang')]);
					}

					// Проверка за активен статус на потребител
					if (!$userObj->getStatus()) {
						$this->flashMessenger()->addErrorMessage('GL_USER_PROFILE_NOACTIVE_E');
						return $this->redirect()->toRoute('add_user_limit', ['lang' => $this->params()->fromRoute('lang')]);
					}

					if ($this->userDM->addUserServiceLimit($dataObj)) {
						$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
						return $this->redirect()->toRoute('add_user_limit', ['lang' => $this->params()->fromRoute('lang')]);
					}
				}
			}
			else {

				if (!empty($atLeastOneFieldValidator->getMessages()))
					$limitUserForm->get('interval')->setMessages(['GL_INVALID_TIME_FORMAT_L']);

				foreach ($limitUserForm->getMessages() as $key => $messages) {

					if (in_array($key, $fieldsArr)) {
						$limitUserForm->get('interval')->setMessages(['GL_INVALID_TIME_FORMAT_L']);
						break;
					}
				}

				if ($serviceLimitId = $this->params()->fromPost('serviceLimitId')) {
					$result = $this->userDM->getServiceLimitList($totalCount, ['id' => $serviceLimitId, 'total_count' => false]);
					$limitServiceObj = $result->current();
				}

				if ($userId =  $this->params()->fromPost('userId'))
					$userObj = $this->userDM->getUserList($totalCount, ['id' => $userId, 'total_count' => false]);
			}

		}

		else {

			if ($userLimitId) {

				$userServiceLimitObj = $this->userDM->getUserServiceLimitList($totalCount, ['idList' => $userLimitId, 'totlal_count' => false])->current();
				$intervalObj = \Application\Service\AppService::fromPg($userServiceLimitObj->getRequestsInterval());

				$userServiceLimitObj->setDays($intervalObj->d);
				$userServiceLimitObj->setHours($intervalObj->h);
				$userServiceLimitObj->setMinutes($intervalObj->i);
				$userServiceLimitObj->setSeconds($intervalObj->s);
				$userServiceLimitObj->setMilliseconds($intervalObj->f);

				$userObj = $this->userDM->getUserList($totalCount, ['id' => $userServiceLimitObj->getuserId(), 'total_count' => false]);
				$result = $this->userDM->getServiceLimitList($totalCount, ['id' => $userServiceLimitObj->getServiceLimitId(), 'total_count' => false]);
				$limitServiceObj = $result->current();
				$limitUserForm->bind($userServiceLimitObj);
			}
		}

		return new ViewModel([
			'limitUserForm' 	=> $limitUserForm,
			'params' 			=> $this->params(),
			'userId'			=> $userId,
			'userObj'			=> $userObj,
			'limitServiceObj'	=> $limitServiceObj,
			'userLimitId'		=> $userLimitId
		]);
	}


	/**
	 * Обновява данни за лимит на услуга за предоставяне на данни.
	 *
	 * @return JsonModel Контейнер с данни в JSON формат.
	 */
	public function updateLimit() {

		if (!$this->isAllowed('edit_limit'))
			return new JsonModel(['status' 	=> 'error']);

		$postData = $this->params()->fromPost();

		$limitObj = $this->userDM->getServiceLimitList($totalCount, ['id' => $postData['id'], 'total_count' => false])->current();

		// Проверка за валиден интервал от време
		$intervalInputFilter = new IntervalInputFilter;
		$intervalInputFilter = $intervalInputFilter->getInputFilter();
		$intervalInputFilter->setData($postData['requestInterval']);

		if (!$intervalInputFilter->isValid())
			$error[] = ['edit-request-interval-'.$limitObj->getServiceLimitId() => $this->translator->translate('GL_INVALID_TIME_FORMAT_L')];

		$fieldsArr = ['days', 'hours', 'minutes', 'seconds', 'milliseconds'];
		$atLeastOneFieldValidator = new \Application\Validator\AtLeastOneField([
				'fields'	=> $fieldsArr,
				'messages'	=> ['invalidInterval' => 'GL_INVALID_TIME_FORMAT_L']
		]);

		if (!$atLeastOneFieldValidator->isValid($postData['requestInterval']))
			$error[] = ['edit-request-interval-'.$limitObj->getServiceLimitId() => $this->translator->translate('GL_INVALID_TIME_FORMAT_L')];

		// Проверка за валиден брой заявки
		$requestInputFilter = new InputFilter();

		$requestInputFilter->add([
			'name' => 'requestsNumber',
			'required' => true,
			'validators' => [
				['name' => \Zend\Validator\Digits::class],
				['name' => \Zend\Validator\Between::class,
					'options' => ['min' => 1, 'max'	=> \Application\Module::APP_MAX_INT]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$requestInputFilter->setData($postData);

		if (!$requestInputFilter->isValid())
			$error[] = ['edit-request-number-'.$limitObj->getServiceLimitId() => $this->translator->translate('GL_INTEGER_ERR_E')];

		if (!empty($error)) {
			return new JsonModel([
				'status' 	=> 'error-td',
				'errors' 	=> $error,
				'editBtnClass'		=> 'edit-section-'.$limitObj->getServiceLimitId()
			]);
		}


		// Филтрирани данни
		$intervalData = $intervalInputFilter->getValues();
		$requestData = $requestInputFilter->getValues();

		$requestsInterval = \Application\Service\AppService::createDateIntervalFromArray($intervalData);

		$limitObj->setRequestsInterval($requestsInterval);

		$limitObj->setRequestsNumber($requestData['requestsNumber']);

		if ($this->userDM->updateServiceLimit($limitObj->getServiceLimitId(), $limitObj))
			return new JsonModel(['status' 	=> 'success']);

		return new JsonModel(['status' 	=> 'error']);
	}


	/**
	 * Обновява данни за лимит на услуга за предоставяне на данни на потребител.
	 *
	 * @return Response HTTP отговор.
	 */
	public function changeUserLimitStatusAction() {

		$lang = $this->params()->fromRoute('lang');

		$limitUserId = $this->params()->fromRoute('userLimitId');
		$params = ['idList' => $limitUserId, 'total_count' => false];

		$result = $this->userDM->getUserServiceLimitList($totalCount, $params);

		if ($userLimitObj = $result->current()) {

			$queryParams = $this->params()->fromQuery();

			$serviceLimitId = $userLimitObj->getServiceLimitId();

			$limitServiceObj = $this->userDM->getServiceLimitList($totalCount, ['id' => $serviceLimitId])->current();

			if (!$limitServiceObj->getStatus()) {
				$this->flashMessenger()->addErrorMessage('EP_NOM_SERVICE_LIMIT_NOACTIVE_E');
				return $this->redirect()->toRoute('limit_user_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
			}

			// Смяна на статус
			$newStatus = $userLimitObj->getStatus() ? 0 : 1;
			$userLimitObj->setStatus($newStatus);

			// Активиране на лимит за потребителски профил със статус "активен"
			if ($userLimitObj->getStatus()) {

				$userObj = $this->userDM->getUserList($totalCount, ['id' => $userLimitObj->getUserId(), 'total_count' => false]);

				$userStatsuList = $this->cacheService->getUserStatusList();

				if ($userObj->getStatus() != array_search('GL_ACTIVE_L', $userStatsuList)) {
					$this->flashMessenger()->addErrorMessage('GL_USER_PROFILE_NOACTIVE_E');
					return $this->redirect()->toRoute('limit_user_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
				}
			}

			$this->userDM->updateUserServiceLimitById($userLimitObj);

			$flashMessage = $newStatus ? 'GL_ACTIVE_OK_I' : 'GL_DEACTIVE_OK_I';
			$this->flashMessenger()->addSuccessMessage($flashMessage);
			return $this->redirect()->toRoute('limit_user_list', ['lang' => $this->params()->fromRoute('lang')], ['query' => $this->params()->fromQuery()]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}