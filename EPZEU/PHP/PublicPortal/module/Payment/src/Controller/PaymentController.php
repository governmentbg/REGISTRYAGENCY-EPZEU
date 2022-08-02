<?php

namespace Payment\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;
use Zend\InputFilter\InputFilter;
use Application\Validator\EgnValidator;
use Application\Validator\PersonIdValidator;
use Application\Validator\BulstatValidator;

use Zend\Http\Client;
use Zend\Json\Json;

/**
 * Контролер реализиращ функционалности за работа със задължения и плащания.
 *
 * @package User
 * @subpackage Controller
 */
class PaymentController extends AbstractActionController {


	/**
	 * Мапинг за регистър и идентификатор за регистър.
	 *
	 * @var array
	 */
	const REGISTER_SERVICE_LIST = [
		'CommercialRegister'=> 1,
		'PropertyRegistry' 	=> 2
	];

	/**
	 * Мапинг за начин на плащане и код на етикет за начин на плащане.
	 *
	 * @var array
	 */
	const PAYMENT_METHOD = [
	 	'ePay'		=> 'EP_EPAY_L',
	 	'PEPDAEU' 	=> 'EP_PEPDAEU_L',
		'Bank'		=> 'EP_BANK_TRANSFER_L'
	];


	/**
	 * Мапинг за вид транзакция и код на етикет за вид транзакция.
	 *
	 * @var array
	 */
	const TRANSACTION_TYPE = [
		'Payment' 	=> 'EP_PAY_PAYMENT_L',
		'Refund'	=> 'EP_PAY_REFUND_L',
		'Reversal'	=> 'EP_PAY_STORNO_L'

	];

	/**
	 * Mаксималната сума, с която може да бъде заредена лична сметка.
	 *
	 * @var int
	 */
	const MAX_CHARGE_AMOUNT_PERSONAL_ACCOUNT = 99999999;

	/**
	 *
	 * @var \Payment\Data\PaymentDataManager
	 */
	protected $paymentDM;


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
	 * Услуга за работа с REST уеб услуги.
	 *
	 * @var \Application\Service\RestService
	 */
	protected $restService;


	/**
	 * Услуга за работа с потребители.
	 *
	 * @var \User\Service\UserService
	 */
	protected $userService;


	/**
	 * Обект за поддържане и съхранение на потребители.
	 *
	 * @var \User\Data\UserDataManager
	 */
	protected $userDM;


	/**
	 * Обект за поддържане и съхранение на страници.
	 *
	 * @var \Content\Data\PageDataManager
	 */
	protected $pageDM;


	/**
	 * Конструктор.
	 *
	 * @param \Payment\Data\PaymentDataManager $paymentDM Обект за поддържане и съхранение на обекти от тип Плащане.
	 * @param MvcTranslator $translator Услуга за локализация на интерфейс.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 * @param \Application\Service\restService $restService Услуга за работа с REST уеб услуги.
	 * @param \User\Service\UserService $userService Услуга за работа с потребители.
	 * @param \User\Data\UserDataManager $userDM Обект за поддържане и съхранение на обекти от тип Потребители.
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страници.
	 */


	public function __construct($paymentDM, $translator, $cacheService, $restService, $userService, $userDM, $pageDM) {
		$this->paymentDM = $paymentDM;
		$this->translator = $translator;
		$this->cacheService = $cacheService;
		$this->restService = $restService;
		$this->userService 	= $userService;
		$this->userDM = $userDM;
		$this->pageDM = $pageDM;
	}

	/**
	 * Функционалност "Списък с дължими суми по заявления".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function dutyListAction() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);

		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$registerList = array_flip($this->cacheService->getRegisterList());

		$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$includedAppTypes = [];

		if ($selectedRegisterId == 2)
			$includedAppTypes = $config['allowedApplicationsPRAppTypes'];

		$applicationTypeArr = [];

		$applicationTypeDropDownArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultByType' => 1, 'getDropDownResult' => 1], $includedAppTypes);
		$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultByType' => 1, 'getDropDownResult' => 1]);

		$applicationTypeList = !empty($applicationTypeArr['resultList']) ? $applicationTypeArr['resultList'] : [];

		$applicationTypeDropDownList = !empty($applicationTypeDropDownArr['resultDropDown']) ? $applicationTypeDropDownArr['resultDropDown'] : [];

		$searchForm = new \Payment\Form\DutyForm();

		$searchForm->get('registerId')->setValue($selectedRegisterId);

		$searchForm->get('applicationTypeId')->setValueOptions(["0" => 'GL_CHOICE_ALL_L'] + $applicationTypeDropDownList);

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'cin'			=> $userObj->getCin(),
			'register' 		=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST)
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'isUnpaidDuty' 	=> 1,
			'dateFrom'		=> (new \DateTime())->sub(new \DateInterval('P1M'))->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['isUnpaidDuty'] = $this->params()->fromQuery('isUnpaidDuty', null);
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}

		$searchForm->get('isUnpaidDuty')->setValue($searchParams['isUnpaidDuty']);
		$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
		$searchForm->get('dateTo')->setValue($searchParams['dateTo']);
	
		if (empty($searchParams['applicationNumber'])) {

			$searchForm->getInputFilter()->get('dateFrom')->setRequired(true);
			$searchForm->getInputFilter()->get('dateTo')->setRequired(true);
		}

		elseif (empty($searchParams['dateFrom']) || empty($searchParams['dateTo']))
			$searchForm->getInputFilter()->get('applicationNumber')->setRequired(true);

		$searchForm->setData($searchParams);


		if ($searchForm->isValid()) {

			$dataParams = $searchForm->getData();

			if (!empty($dataParams['applicationNumber']))
				$dataParams['applicationNumber'] = explode(',', $dataParams['applicationNumber']);

			if (!empty($dataParams['search']))
				$dutyList = $this->restService->dutyList($totalCount, $params + $dataParams);
		}

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList') || $request->getPost('changeRegisterTab'))
				return $result = $this->getDutyList();
		}

		return new ViewModel([
			'searchForm'			=> $searchForm,
			'dutyList'				=> !empty($dutyList) ?  $dutyList : [],
			'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
			'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
			'applicationTypeList' 	=> $applicationTypeList,
			'registerList'			=> $registerList,
			'selectedRegisterId' 	=> $selectedRegisterId,
			'params'				=> $this->params()->fromQuery(),
			'registerServiceList'	=> self::REGISTER_SERVICE_LIST
		]);
	}

	/**
	 * Извлича списък с дължими суми по заявления при странициране или при промяна на таб регистър.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getDutyList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$successPaymentMessage = (int)$this->params()->fromPost('successPaymentMessage', 0);

		$changeRegisterTab = !empty($this->params()->fromPost('changeRegisterTab')) ? (int)$this->params()->fromPost('changeRegisterTab') : 0;

		$registerList = array_flip($this->cacheService->getRegisterList());

		if (!empty($changeRegisterTab))
			$selectedRegisterId = (int)$this->params()->fromPost('registerId');
		else
			$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$includedAppTypes = [];

		if ($selectedRegisterId == 2)
			$includedAppTypes = $config['allowedApplicationsPRAppTypes'];

		$applicationTypeArr = [];

		$applicationTypeDropDownArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultByType' => 1, 'getDropDownResult' => 1], $includedAppTypes);
		$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $selectedRegisterId, 'getPlainResultByType' => 1, 'getDropDownResult' => 1]);

		$applicationTypeList = !empty($applicationTypeArr['resultList']) ? $applicationTypeArr['resultList'] : [];

		$applicationTypeDropDownList = !empty($applicationTypeDropDownArr['resultDropDown']) ? $applicationTypeDropDownArr['resultDropDown'] : [];

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'register' 		=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST),
			'cin'			=> $userObj->getCin()
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'isUnpaidDuty' 	=> 1,
			'dateFrom'		=> (new \DateTime())->sub(new \DateInterval('P1M'))->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['isUnpaidDuty'] = $this->params()->fromQuery('isUnpaidDuty', null);
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}


		// промяна на таб регистър
		if (!empty($changeRegisterTab)) {

			$searchForm = new \Payment\Form\DutyForm();

			$searchForm->get('registerId')->setValue($selectedRegisterId);

			$searchForm->get('applicationTypeId')->setValueOptions(["0" => 'GL_CHOICE_ALL_L'] + $applicationTypeDropDownList);

			$searchForm->get('isUnpaidDuty')->setValue($searchParams['isUnpaidDuty']);
			$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
			$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

			if (empty($searchParams['applicationNumber'])) {
				$searchForm->getInputFilter()->get('dateFrom')->setRequired(true);
				$searchForm->getInputFilter()->get('dateTo')->setRequired(true);
			}

			elseif (empty($searchParams['dateFrom']) || empty($searchParams['dateTo']))
				$searchForm->getInputFilter()->get('applicationNumber')->setRequired(true);

			$searchForm->setData($searchParams);

			if ($searchForm->isValid()) {

				$dataParams = $searchForm->getData();

				if (!empty($dataParams['applicationNumber']))
					$dataParams['applicationNumber'] = explode(',', $dataParams['applicationNumber']);

				if (!empty($dataParams['search']))
					$dutyList = $this->restService->dutyList($totalCount, $params + $dataParams);
			}

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'searchForm'			=> $searchForm,
				'dutyList'				=> !empty($dutyList) ?  $dutyList : [],
				'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
				'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
				'applicationTypeList' 	=> $applicationTypeList,
				'registerList'			=> $registerList,
				'selectedRegisterId' 	=> $selectedRegisterId,
				'params'				=> $this->params()->fromQuery(),
				'registerServiceList'	=> self::REGISTER_SERVICE_LIST,
				'successPaymentMessage' => $successPaymentMessage
			));

			$result->setTemplate('payment/payment/duty-list-section.phtml');
		}

		// странициране
		else {

			if (!empty($searchParams['applicationNumber']))
				$searchParams['applicationNumber'] = explode(',', $searchParams['applicationNumber']);

			$dutyList = $this->restService->dutyList($totalCount, $params + $searchParams);

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'dutyList' 				=> $dutyList,
				'registerList' 			=> $registerList,
				'applicationTypeList' 	=> $applicationTypeList,
				'registerServiceList'	=> self::REGISTER_SERVICE_LIST
			));

			$result->setTemplate('payment/payment/duty-list-partial.phtml');
		}

		return $result;
	}

	/**
	 * Проверява за валидност на номер на заявление/заявления.
	 *
	 * @param string $applicationNumberList Списък от заявления, разделени със запетая.
	 *
	 * @return bool Резултат от валидацията.
	 */
	public function isValidApplicationNumberList($applicationNumberList) {

		if (empty($applicationNumberList) || !preg_match ('/^[\p{Cyrillic}\w\d\-,]+$/u', $applicationNumberList))
			return false;

		return true;
	}

	/**
	 * Проверява за допустим тип на плащане на услуга.
	 *
	 * @param int $registerId Уникален идентификатор на регистър.
	 * @param int $paymentType Вид плащане по електронен път - 1 - 'epay', 2 - 'лична сметка', 3 - 'пепдаеу'.
	 * @param int $dutyApplicationType Тип на заявление, по което се плаща задължение.
	 * @param array $dutyApplicationTypeList Списък от типове на заявления, по които се плащат задължения.
	 *
	 * @return bool Резултат от валидацията.
	 */
	public function isValidApplicationPaymentType($registerId, $paymentType, $dutyApplicationType=0, $dutyApplicationTypeList=[]) {

		$applicationTypeArr = [];
		$applicationTypeIdList = [];

		// плащане на задължения към едно заявление - плащане през epay, пепдаеу, лична сметка
		if (!empty($dutyApplicationType)) {

			$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $registerId, 'appType' => $dutyApplicationType]);

			// списък с ключ тип на заявлението и стойност уникален идентификатор
			foreach ($applicationTypeArr as $appType => $appItem )
				$applicationTypeIdList[$appType] = $appItem->getId();

			if (empty($applicationTypeIdList))
				return false;

			// списък с ключ уникален идентификатор на заявление и стойност вид плащане по електронен път на услуга
			$servicePaymentTypeList = $this->pageDM->getServiceList($totalCount, $this->language()->getDefaultId(), ['registerId' => [$registerId], 'appTypeId' => $applicationTypeIdList, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT, 'getPlainResult' => 1]);

			// списък с ключ тип на заявление и стойност масив от видове плащане по електронен път
			foreach ($applicationTypeIdList as $appType => $appTypeId){

				if ($dutyApplicationType == $appType)
					$applicationPaymentTypeList = !empty($servicePaymentTypeList[$appTypeId]) ? array_map('intval', explode(',', str_replace(['{', '}'], ['', ''], $servicePaymentTypeList[$appTypeId]))) : [];
			}

			if (empty($applicationPaymentTypeList) || !in_array($paymentType, $applicationPaymentTypeList))
				return false;
		}

		//плащане на задължения към повече от едно заявления - плащане през лична сметка
		else if (!empty($dutyApplicationTypeList)) {

			$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $registerId]);

			// списък с ключ тип на заявлението и стойност уникален идентификатор
			foreach ($dutyApplicationTypeList as $applicationType)
				$applicationTypeIdList[$applicationType] = $applicationTypeArr[$applicationType]->getId();

			if (empty($applicationTypeIdList))
				return false;

			// списък с ключ уникален идентификатор на заявление и стойност вид плащане по електронен път на услуга
			$servicePaymentTypeList = $this->pageDM->getServiceList($totalCount, $this->language()->getDefaultId(), ['registerId' => [$registerId], 'appTypeId' => $applicationTypeIdList, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT, 'getPlainResult' => 1]);

			// списък с ключ тип на заявление и стойност масив от видове плащане по електронен път
			foreach ($applicationTypeIdList as $appType => $appTypeId)
				$applicationPaymentTypeList[$appType] = !empty($servicePaymentTypeList[$appTypeId]) ? array_map('intval', explode(',', str_replace(['{', '}'], ['', ''], $servicePaymentTypeList[$appTypeId]))) : [];

			$intersectionPaymentTypeArr = [];

			if (!empty($applicationPaymentTypeList)) {

				if (count($applicationPaymentTypeList) > 1)
					$intersectionPaymentTypeArr = call_user_func_array('array_intersect', $applicationPaymentTypeList);
				else
					$intersectionPaymentTypeArr = array_values($applicationPaymentTypeList)[0];
			}

			if (empty($intersectionPaymentTypeArr) || !in_array($paymentType, $intersectionPaymentTypeArr))
				return false;
		}

		return true;
	}


	/**
	 * Функционалност "Плащане на задължения по заявления".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function payDutyListAction() {

		$routeMatch = $this->getEvent()->getRouteMatch();
		$routeName = $routeMatch->getMatchedRouteName();

		$isIntegrated =	$routeName == 'pay_duty_list' ? 1 : 0;

		$params = (!empty($isIntegrated)) ? $this->params()->fromQuery() : $this->params()->fromPost();

		$errorPayDuty = false;

		if (empty($params))
			$errorPayDuty = true;

		if (is_array($params['applicationNumber']))
			$params['applicationNumber'] = implode(',', $params['applicationNumber']);

		if (!$this->isValidApplicationNumberList($params['applicationNumber']))
			$errorPayDuty = true;

		$params['registerId'] = (int)$params['registerId'];

		$userObj = $this->userService->getUser();

		$obligPerson = (!empty($userObj->getFirstName()) ? $userObj->getFirstName().' ' : '').(!empty($userObj->getMiddleName()) ? $userObj->getMiddleName().' ' : '').(!empty($userObj->getFamilyName()) ? $userObj->getFamilyName() : '');

		$params['cin'] = $userObj->getCin();
		$params['status'] = 'Requested';
		$params['register'] = array_search($params['registerId'], self::REGISTER_SERVICE_LIST);

		$applicationTypeArr = [];
		$applicationTypeArr = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $params['registerId']]);

		if (!empty($params['applicationNumber']))
			$params['applicationNumber'] = explode(',', $params['applicationNumber']);

		$applicationDutyList = $this->restService->applicationDutyList($params);

		if (empty($applicationDutyList) || empty($applicationTypeArr))
			$errorPayDuty = true;

		$applicationTypeList = [];
		$applicationTypeIdList = [];

		foreach ($applicationDutyList as $appNumber => $appArr) {

			foreach ($appArr as $appObj) {

				$applicationTypeList[$appObj->getApplicationType()] = $applicationTypeArr[$appObj->getApplicationType()]->getAppCode().' '.$applicationTypeArr[$appObj->getApplicationType()]->getName();

				$applicationTypeIdList[$appObj->getApplicationType()] = $applicationTypeArr[$appObj->getApplicationType()]->getId();
			}
		}

		$applicationPaymentTypeList = [];

		if (!empty($applicationTypeIdList)) {

			// списък с ключ уникален идентификатор на заявление и стойност вид плащане по електронен път
			$servicePaymentTypeList = $this->pageDM->getServiceList($totalCount, $this->language()->getDefaultId(), ['appTypeId' => $applicationTypeIdList, 'cp' => 1, 'rowCount' => \Application\Module::APP_MAX_INT, 'getPlainResult' => 1]);

			// списък с ключ тип на заявление и стойност вид плащане по електронен път
			foreach ($applicationTypeIdList as $appType => $appTypeId)
				$applicationPaymentTypeList[$appType] = !empty($servicePaymentTypeList[$appTypeId]) ? array_map('intval', explode(',', str_replace(['{', '}'], ['', ''], $servicePaymentTypeList[$appTypeId]))) : [];
		}

		$registerList = array_flip($this->cacheService->getRegisterList());

		$balanceTemp = [];
		$balanceTemp = $this->restService->personalAccountBalance(['cin' => $userObj->getCin(), 'register' => $params['register']]);

		$balance = null;
		if (!empty($balanceTemp))
			$balance = !empty($balanceTemp[$params['register']]) ? $balanceTemp[$params['register']] : 0;

		if (!empty($isIntegrated))
			$this->layout('layout/layout-no-header');
		else
			$this->layout('layout/ajax');

		return new ViewModel([
			'applicationTypeList'			=> $applicationTypeList,
			'applicationDutyList' 			=> $applicationDutyList,
			'applicationPaymentTypeList' 	=> $applicationPaymentTypeList,
			'registerList' 					=> $registerList,
			'registerId'					=> $this->params()->fromQuery('registerId'),
			'obligPerson'					=> $obligPerson,
			'isIntegrated'					=> $isIntegrated,
			'registerServiceList'			=> self::REGISTER_SERVICE_LIST,
			'balance' 						=> $balance,
			'errorPayDuty' 					=> $errorPayDuty
		]);
	}

	/**
	 * Добавя филтър за валидация на име, вид идентификатор, идентификатор.
	 *
	 *
	 * @return array Масив с грешки.
	 */
	public function addInputFilterObligPerson() {

		$valueInputFilter = new InputFilter();

		// Проверка за празна стойност име на задълженото лице и дължина по-малка от 26 символа
		$valueInputFilter->add([
			'name' => 'obligPerson',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate('GL_INPUT_FIELD_MUST_E')
						]
					]
				],
				[
					'name' => \Zend\Validator\StringLength::class,
					'options' => [
						'max' => 26,
						'messages' => [
							'stringLengthTooLong' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		// Проверка за празна стойност, допустима стойност на избор на вид на идентификатора
		$valueInputFilter->add([
			'name' => 'obligPersonIdentityKind',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate('GL_INPUT_FIELD_MUST_E')
						]
					]
				],
				[
					'name' => \Zend\Validator\Regex::class,
					'break_chain_on_failure' => true,
					'options' => [
						'pattern' => '/^(1|2|3)$/',
						'messages' => [
							'regexNotMatch' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		// Проверка за празна стойност на идентификатор на задължено лице
		$valueInputFilter->add([
			'name' => 'obligPersonIdentity',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate('GL_INPUT_FIELD_MUST_E')
						]
					]
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		return $valueInputFilter;
	}

	/**
	 * Добавя филтър за валидация на име, вид идентификатор, идентификатор.
	 *
	 * @param int $addInputFilterIdentity Критерий дали да се проверява вид идентификатор, идентификатор.
	 *
	 * @return array Масив с грешки.
	 */
	public function isValidObligPersonIdentity($identityKind, $identity) {

		// Проверка за допустима стойност на идентификатор на задължено лице
		switch ($identityKind) {

			// егн
			case '1':
				$filter = new EgnValidator();
				$errorMsg = $this->translator->translate('EP_MSG_INVALID_PN_E');
				break;

				//лнч
			case '2':
				$filter = new PersonIdValidator();
				$errorMsg = $this->translator->translate('EP_MSG_INVALID_PNF_E');
				break;

				//булстат
			case '3':
				$filter = new BulstatValidator();
				$errorMsg = $this->translator->translate('EP_MSG_INVALID_BULSTAT_E');
				break;
		}

		if (!$filter->isValid($identity))
			return $errorMsg;

		return false;
	}


	function hmac($algo,$data,$passwd){
		/* md5 and sha1 only */
		$algo=strtolower($algo);
		$p=array('md5'=>'H32','sha1'=>'H40');
		if(strlen($passwd)>64) $passwd=pack($p[$algo],$algo($passwd));
		if(strlen($passwd)<64) $passwd=str_pad($passwd,64,chr(0));

		$ipad=substr($passwd,0,64) ^ str_repeat(chr(0x36),64);
		$opad=substr($passwd,0,64) ^ str_repeat(chr(0x5C),64);

		return($algo($opad.pack($p[$algo],$algo($ipad.$data))));
	}

	/**
	 * Функционалност "Изпращане на заявка и запис на изходящо съобщение към Epay".
	 *
	 * @param array $params Масив с параметри.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	private function epayRequest($params) {

		$paymentObj = new \Payment\Entity\PaymentEntity();

		$userObj = $this->userService->getUser();

		$registerList = array_flip($this->cacheService->getRegisterList());

		// тип на регистрационните данни - ePay
		$type = 1;
		$registryAgencyObj = null;
		$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

		$bankAccount = null;
		$bankAccount = $this->restService->getBankAccountList(['register' => array_search($params['registerId'], self::REGISTER_SERVICE_LIST)]);

		if (empty($registryAgencyObj) || empty($bankAccount))
			return [];

		$paymentObj->setMerchantCin($registryAgencyObj->getCin());

		$merchantName = $this->translator->translate('GL_BANK_ACCOUNT_'.$registerList[$params['registerId']]);

		$paymentObj->setMerchantName($merchantName);
		$paymentObj->setMerchantIban($bankAccount->getIban());
		$paymentObj->setMerchantBic($bankAccount->getBic());

		list($hour, $minute, $seconds) = explode(':', $registryAgencyObj->getValidityPeriod());

		$hour = (!isset($hour) || empty($hour)) ? '00' : $hour;
		$minute = (!isset($minute) || empty($minute)) ? '00' : $minute;
		$seconds = (!isset($seconds) || empty($seconds)) ? '00' : $seconds;

		$dateTimeObj= new \DateTime();
		$dateTimeObj->add(new \DateInterval('PT'.$hour.'H'.$minute.'M'.$seconds.'S'));
		$expDate	= $dateTimeObj->format('c');
		$expDateEpay	= $dateTimeObj->format('d.m.Y H:i:s');

		$paymentObj->setObligationDate((new \DateTime())->format('c'));

		$paymentObj->setAmount($params['amount']);
		$paymentObj->setExpirationTime($expDate);
		$paymentObj->setObligedPerson($params['obligPerson']);

		$obligPersonIdentityKindValue = '';

		switch ($params['obligPersonIdentityKind']) {
			case '1':
				$obligPersonIdentityKindValue = 'EGN';
				break;
			case '2':
				$obligPersonIdentityKindValue = 'LNC';
				break;
			case '3':
				$obligPersonIdentityKindValue = 'BULSTAT';
				break;
		}

		if (empty($obligPersonIdentityKindValue) || empty($params['obligPersonIdentity']))
			return [];

		$paymentObj->setRegisterId($params['registerId']);
		$paymentObj->setPaymentSystemType($type);
		$paymentObj->setUserId($userObj->getUserId());
		$paymentObj->setUserCin($userObj->getCin());

		$obligationDeadline = !empty($params['obligationDeadline']) ? new \DateTime($params['obligationDeadline']) : '';

		$docNo = 9;
		$encodingDescription = 'utf-8';

		//плащане на задължение
		if (!empty($params['isDutyPayment'])) {

			if ($registerList[$params['registerId']] != 'CR')
				$publicUrl = $this->url()->fromRoute('duty_list', ['lang' => $params['lang']], ['force_canonical' => true, 'query' => ['registerId' => (int)$params['registerId']]]);
			else
				$publicUrl = $this->url()->fromRoute('duty_list', ['lang' => $params['lang']], ['force_canonical' => true]);

			$validator = new \Zend\Validator\Date(['format' => 'd.m.Y H:i:s']);

			if (!empty($obligationDeadline) && $validator->isValid($expDateEpay) && $validator->isValid($obligationDeadline) && \Application\Service\AppService::compareDates($expDateEpay, $obligationDeadline->format('d.m.Y H:i:s'), '.') == -1) {

				$paymentObj->setExpirationTime($obligationDeadline->format('c'));
				$expDateEpay = $obligationDeadline->format('d.m.Y H:i:s');
			}

			$paymentObj->setPaymentType(1);

			$paymentObj->setObligationNumber($params['obligationNumber']);
			$paymentObj->setApplicationNumber($params['applicationNumber']);

			$paymentMsgList = $this->paymentDM->getPaymentMessage(null, $paymentObj->getPaymentSystemType(), $paymentObj->getObligationNumber());

			// не съществува запис с такъв номер на задължение и тип на система за електронни разплащания epay
			if (!$paymentMsgList->count()) {

				if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj))
					return [];
			}

			// съществува запис
			else {

				foreach ($paymentMsgList as $paymentMsg) {
					$statusArr[] = $paymentMsg->getStatus();

					// необработено задължение
					if (!$paymentMsg->getStatus()) {

						$paymentMsgData = new \Payment\Entity\PaymentEntity();
						$paymentMsgData->setMessageId($paymentMsg->getMessageId());
						$paymentMsgData->setReason($paymentMsg->getReason());
					}
				}

				// задължението не е платено
				if (!in_array(1, $statusArr)) {

					// задължението е необработено
					if (in_array(0, $statusArr)) {

						$paymentMsgData->setStatus(0);
						$paymentMsgData->setObligationDate((new \DateTime())->format('c'));
						$paymentMsgData->setStatusDate((new \DateTime())->format('c'));

						if (!$this->paymentDM->updatePaymentMessage($paymentMsgData))
							return [];
					}

					// задължението е с отказано или изтекло плащане
					else {

						if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj))
							return [];
					}
				}

				else
					unset($paymentMsgData);
			}
		}

		// захранване на лична сметка
		else if (!empty($params['isPayPowerPersonalAccount'])) {

			if ($registerList[$params['registerId']] != 'CR')
				$publicUrl = $this->url()->fromRoute('personal_account_list', ['lang' => $params['lang']], ['force_canonical' => true, 'query' => ['registerId' => (int)$params['registerId']]]);
			else
				$publicUrl = $this->url()->fromRoute('personal_account_list', ['lang' => $params['lang']], ['force_canonical' => true]);

			$paymentObj->setPaymentType(2);

			$paymentObj->setObligationNumber(null);
			$paymentObj->setApplicationNumber(null);

			if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj))
				return [];
		}

		if (isset($paymentMsgData) && !empty($paymentMsgData->getMessageId())) {

			$dataParams = <<<DATA
MIN={$paymentObj->getMerchantCin()}
EMAIL={$registryAgencyObj->getEmail()}
INVOICE={$paymentMsgData->getMessageId()}
AMOUNT={$paymentObj->getAmount()}
EXP_TIME={$expDateEpay}
MERCHANT={$paymentObj->getMerchantName()}
IBAN={$paymentObj->getMerchantIban()}
BIC={$paymentObj->getMerchantBic()}
STATEMENT={$paymentMsgData->getReason()}
DESCR={$paymentMsgData->getReason()}
OBLIG_PERSON={$paymentObj->getObligedPerson()}
$obligPersonIdentityKindValue={$params['obligPersonIdentity']}
DOC_NO={$docNo}
ENCODING={$encodingDescription}
DATA;

			$ENCODED  = base64_encode($dataParams);
			$CHECKSUM = $this->hmac('sha1', $ENCODED, $registryAgencyObj->getSecretWord());

			$data['PAGE'] ='paylogin';
			$data['ENCODED'] = $ENCODED;
			$data['CHECKSUM'] = $CHECKSUM;
			$data['URL_OK'] = $publicUrl;
			$data['URL_CANCEL'] = $publicUrl;

			$data['URL'] = $registryAgencyObj->getUrl();

			return $data;
		}

		return [];
	}


	/**
	 * Функционалност "Плащане към ePay - задължения към услуги".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function epayPaymentDutyListAction() {

		$paymentMethod = $this->params()->fromPost('paymentMethod');
		$registerId = (int)$this->params()->fromPost('registerId');
		$applicationNumberList = $this->params()->fromPost('applicationNumber');
		$dutyObligationNumber = $this->params()->fromPost('dutyObligationNumber');

		if ($paymentMethod != 'epay' || empty($registerId) || !$this->isValidApplicationNumberList($applicationNumberList) || empty($dutyObligationNumber)) {

			return new JsonModel([
				'status' => 'error',
				'errors' => [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$applicationNumber = explode(',', $applicationNumberList);

		$postData = $this->params()->fromPost();

		// Добавя филтър за валидация на име, вид идентификатор, идентификатор
		$valueInputFilter = $this->addInputFilterObligPerson();

		$valueInputFilter->setData($postData);

		if (!$valueInputFilter->isValid()){

			foreach ($valueInputFilter->getMessages() as $key => $messageArr) {

				$key = ($key == 'obligPersonIdentityKind') ? 'identityKindSection' : $key;

				foreach ($messageArr as $message)
					$errors[][$key] = $message;
			}

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> $errors
			]);
		}

		// Филтрирани данни
		$obligPerson = $valueInputFilter->getValues()['obligPerson'];
		$obligPersonIdentityKind = $valueInputFilter->getValues()['obligPersonIdentityKind'];
		$obligPersonIdentity = $valueInputFilter->getValues()['obligPersonIdentity'];

		// Проверка за допустима стойност на идентификатор на задължено лице
		$error = $this->isValidObligPersonIdentity($obligPersonIdentityKind, $obligPersonIdentity);

		if (!empty($error)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [['obligPersonIdentity' => $error]]
			]);
		}

		$userObj = $this->userService->getUser();

		$paramList = [
			'register' 			=> array_search($registerId, self::REGISTER_SERVICE_LIST),
			'applicationNumber' => $applicationNumber,
			'cin' 				=> $userObj->getCin(),
			'status' 			=> 'Requested'
		];

		$applicationDutyList = $this->restService->applicationDutyList($paramList);

		if (!empty($applicationDutyList)) {

			$dutyObj = new \Payment\Entity\DutyEntity();

			foreach ($applicationDutyList as $dutyArr) {

				foreach ($dutyArr as $duty) {

					if ($duty->getObligationNumber() == $dutyObligationNumber)
						$dutyObj = clone $duty;
				}
			}

			// проверка за задължение към заявление и за дължима сума положително число, проверка за допустим начин на плащане през epay за заявлението, по което се плаща задължението
			if (
					empty($dutyObj->getApplicationNumber())
					|| empty($dutyObj->getObligationNumber())
					|| empty(number_format(($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),2))
					|| bccomp(number_format(($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),2) , 0 , 2) != 1
					|| empty($dutyObj->getApplicationType())
					|| !$this->isValidApplicationPaymentType($registerId, 1, $dutyObj->getApplicationType())
				) {
				return new JsonModel([
					'status' => 'error',
					'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
				]);
			}

			// заявка към Epay
			else {

				$paramsEpay = [
					'registerId' 				=> $registerId,
					'applicationNumber' 		=> $dutyObj->getApplicationNumber(),
					'obligationNumber' 			=> $dutyObj->getObligationNumber(),
					'obligationDeadline'		=> $dutyObj->getDeadline(),
					'amount' 					=> ($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),
					'obligPerson' 				=> $obligPerson,
					'obligPersonIdentityKind' 	=> $obligPersonIdentityKind,
					'obligPersonIdentity'		=> $obligPersonIdentity,
					'lang'						=> $this->params()->fromRoute('lang'),
					'isDutyPayment' 			=> 1
				];

				// генериране на данни за заявка към Epay и записване на изходящо съобщение към Epay
				if ($data = $this->epayRequest($paramsEpay)) {

					return new JsonModel([
						'status' 		=> 'success',
						'epayData'		=> $data,
						'paymentMethod' => 'epay'
					]);
				}
			}
		}

		return new JsonModel([
			'status' => 'error',
			'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
		]);
	}


	/**
	 * Функционалност "Обработване на отговор от ePay".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function epayResponseAction() {

		if ($this->getRequest()->isPost()) {

			$ENCODED  = $_POST['encoded'];
			$CHECKSUM = $_POST['checksum'];

			$epayTypeId = 1;
			$registryAgencyObj = new \Payment\Entity\RegistryAgencyEntity();
			$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($epayTypeId);

			$hmac   = $this->hmac('sha1', $ENCODED, $registryAgencyObj->getSecretWord());

			// проверява получената CHECKSUM
			if ($hmac == $CHECKSUM) {

				$data = base64_decode($ENCODED);
				$linesArr = explode("\n", $data);
				$infoData = '';

				foreach ($linesArr as $line) {

					if (!empty($line)) {

						$obj = new \Payment\Entity\PaymentEntity();

						if (preg_match("/^INVOICE=(\d+):STATUS=(PAID|DENIED|EXPIRED)(:PAY_TIME=(\d+):STAN=(\d+):BCODE=([0-9a-zA-Z]+))?$/", $line, $regs)) {

							$invoice = $regs[1];
							$statusDescription = $regs[2];
							$date = !empty($regs[4]) ? $regs[4] : ''; // в случай, че е извършено плащане
							$transactionNumber = !empty($regs[5]) ? $regs[5] : 0; // в случай, че е извършено плащане
							$boricaCode = !empty($regs[6]) ? $regs[6] : 0; // в случай, че е извършено плащане

							switch ($statusDescription) {
								case 'PAID':
									$status = 1;
									break;
								case 'DENIED':
									$status = 2;
									break;
								case 'EXPIRED':
									$status = 3;
									break;
							}

							$paymentObj = $this->paymentDM->getPaymentMessage($invoice)->current();

							if (!empty($paymentObj) && !empty($paymentObj->getMessageId())) {

								//необработен
								if (empty($paymentObj->getStatus())) {

									$paymentObj->setStatus($status);
									$paymentObj->setStatusDate((new \DateTime())->format('c'));
									$paymentObj->setStatusDescription($statusDescription);
									$paymentObj->setObligationDate(null);

									$registerName = array_search($paymentObj->getRegisterId(), self::REGISTER_SERVICE_LIST);

									$paymentObj->setRegisterName($registerName);

									// в случай, че е извършено плащане
									if ($statusDescription == 'PAID') {

										// дата на плащане
										if (!empty($date)) {
											$paymentDate = (new \DateTime($date))->format('c');
											$paymentObj->setStatusDate($paymentDate);
										}

										// номер транзакция
										if (!empty($transactionNumber))
											$paymentObj->setTransactionNumber($transactionNumber);

										// авторизационен код на БОРИКА
										if (!empty($boricaCode))
											$paymentObj->setAuthorizationCode($boricaCode);
									}

									if ($this->paymentDM->updatePaymentMessage($paymentObj))
										// всичко е наред и спира да изпраща известия
										$infoData .= "INVOICE=$invoice:STATUS=OK\n";

									else
										// продължава да изпраща известия
										$infoData .= "INVOICE=$invoice:STATUS=ERR\n";
								}

								// обработен статус
								else
									$infoData .= "INVOICE=$invoice:STATUS=OK\n";

							}

							// тази фактура не е разпозната
							else
								$infoData .= "INVOICE=$invoice:STATUS=NO\n";
						}
					}
				}

				echo $infoData, "\n";
			}
			else {

				// описанието на грешката е задължително
				echo "ERR=Not valid CHECKSUM\n";
			}
		}

		die;
	}


	/**
	 * Функционалност "Списък с платежни нареждания".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function paymentOrderListAction() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);

		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$registerList = array_flip($this->cacheService->getRegisterList());

		$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$searchForm = new \Payment\Form\PaymentOrderForm();

		$searchForm->get('registerId')->setValue($selectedRegisterId);

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'register' 		=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST),
			'cin'			=> $userObj->getCin(),
			'notReversedTransaction' => true
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'isFreeAmounts' => 1,
			'dateFrom'		=> (new \DateTime())->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['isFreeAmounts'] = $this->params()->fromQuery('isFreeAmounts', null);
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}

		$searchForm->get('isFreeAmounts')->setValue($searchParams['isFreeAmounts']);
		$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
		$searchForm->get('dateTo')->setValue($searchParams['dateTo']);
		
		$searchForm->setData($searchParams);

		if ($searchForm->isValid()) {

			$dataParams = $searchForm->getData();

			if (!empty($dataParams['search']))
				$paymentOrderList = $this->restService->paymentOrderList($totalCount, $params + $dataParams);
		}

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList') || $request->getPost('changeRegisterTab'))
				return $result = $this->getPaymentOrderList();
		}

		return new ViewModel([
			'searchForm'			=> $searchForm,
			'paymentOrderList'		=> !empty($paymentOrderList) ?  $paymentOrderList : [],
			'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
			'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
			'registerList'			=> $registerList,
			'selectedRegisterId' 	=> $selectedRegisterId,
			'paymentMethodArr'		=> self::PAYMENT_METHOD,
			'params'				=> $this->params()->fromQuery()
		]);
	}


	/**
	 * Извлича списък с платежни нареждания при странициране или при промяна на таб регистър.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getPaymentOrderList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$changeRegisterTab = !empty($this->params()->fromPost('changeRegisterTab')) ? (int)$this->params()->fromPost('changeRegisterTab') : 0;

		$registerList = array_flip($this->cacheService->getRegisterList());

		if (!empty($changeRegisterTab) && !empty($this->params()->fromPost('registerId')))
			$selectedRegisterId = (int)$this->params()->fromPost('registerId');
		else
			$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 			=> $page,
			'rowCount' 		=> $rowCount,
			'registerId'	=> $selectedRegisterId,
			'register' 		=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST),
			'cin'			=> $userObj->getCin(),
			'notReversedTransaction' => true
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'isFreeAmounts' => 1,
			'dateFrom'		=> (new \DateTime())->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['isFreeAmounts'] = $this->params()->fromQuery('isFreeAmounts', null);
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}

		// промяна на таб регистър
		if (!empty($changeRegisterTab)) {

			$searchForm = new \Payment\Form\PaymentOrderForm();

			$searchForm->get('registerId')->setValue($selectedRegisterId);

			$searchForm->get('isFreeAmounts')->setValue($searchParams['isFreeAmounts']);
			$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
			$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

			$searchForm->setData($searchParams);

			if ($searchForm->isValid()) {

				$dataParams = $searchForm->getData();

				if (!empty($dataParams['search']))
					$paymentOrderList = $this->restService->paymentOrderList($totalCount, $params + $dataParams);
			}

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'searchForm'			=> $searchForm,
				'paymentOrderList'		=> !empty($paymentOrderList) ?  $paymentOrderList : [],
				'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
				'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
				'registerList'			=> $registerList,
				'selectedRegisterId' 	=> $selectedRegisterId,
				'paymentMethodArr'		=> self::PAYMENT_METHOD,
				'params'				=> $this->params()->fromQuery()
			));

			$result->setTemplate('payment/payment/payment-order-list-section.phtml');
		}

		// странициране
		else {

			$paymentOrderList = $this->restService->paymentOrderList($totalCount, $params + $searchParams);

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'paymentOrderList' 		=> $paymentOrderList,
				'registerList' 			=> $registerList,
				'selectedRegisterId' 	=> $selectedRegisterId,
				'paymentMethodArr'		=> self::PAYMENT_METHOD
			));

			$result->setTemplate('payment/payment/payment-order-list-partial.phtml');
		}

		return $result;
	}


	/**
	 * Функционалност "Преглед на списък с платежните нареждания, чрез които са направени плащания по задълженията за заявлението".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewDutyPaymentOrderListAction() {

		$params = $this->params()->fromRoute();

		$params['registerId'] = (int)$params['registerId'];
		$params['applicationType'] = (int)$params['applicationType'];

		$applicationName = $params['applicationNumber'];

		$errors = false;

		if (!$this->isValidApplicationNumberList($applicationName))
			$errors = true;

		else {

			$userObj = $this->userService->getUser();

			$params['cin'] = $userObj->getCin();
			$params['register'] = array_search($params['registerId'], self::REGISTER_SERVICE_LIST);
			$params['transactionDirection'] = 'ToObligation';
			$params['hasTransaction'] = 1;
			$params['status'] = 'Paid';

			$params['getResultByObligation'] =  1;

			$applicationDutyList = $this->restService->applicationDutyList($params);

			$obligationNumber = !empty($applicationDutyList) ? array_keys($applicationDutyList) : null;

			$paymentOrderDrawnAmount = [];

			$transactionListArr = [];
			if (!empty($obligationNumber)) {
				$paramsTransactions['obligationNumberList'] = $obligationNumber;
				$transactionListArr = $this->restService->paymentOrderTransactionList($totalCount, $paramsTransactions);
			}

			// плащане през epay или ПЕП на ДАЕУ или хартиено
			if (!empty($transactionListArr)) {

				$paymentTransactionArr = [];
				$refundReversalTransactionArr = [];

				foreach ($transactionListArr as $transactionObj) {
					if ($transactionObj->getType() == 'Payment')
						$paymentTransactionArr[$transactionObj->getId()] = $transactionObj;
					else
						$refundReversalTransactionArr[$transactionObj->getId()] = $transactionObj;
				}

				if (!empty($paymentTransactionArr)) {

					$paymentObjKeyArr = [];
					$ePaymentObjKeyArr = [];

					foreach ($paymentTransactionArr as $paymentTransactionObj) {

						$paymentObjKey = 0;

						if (!empty($paymentTransactionObj->getFromEPaymentOrderID())) {
							$paymentObjKey = $paymentTransactionObj->getFromEPaymentOrderID();
							$ePaymentObjKeyArr[$paymentTransactionObj->getId()] = $paymentObjKey;
						}

						else if (!empty($paymentTransactionObj->getFromPaymentOrderID())) {
							$paymentObjKey = $paymentTransactionObj->getFromPaymentOrderID();
							$paymentObjKeyArr[$paymentTransactionObj->getId()] = $paymentObjKey;
						}

						$paymentOrderDrawnAmount[$paymentObjKey][$paymentTransactionObj->getId()] = $paymentTransactionObj->getAmount();

						if (!empty($refundReversalTransactionArr)) {

							foreach ($refundReversalTransactionArr as $refundReversalTransactionObj) {
								if ($paymentTransactionObj->getId() == $refundReversalTransactionObj->getParentId() && $refundReversalTransactionObj->getType() == 'Reversal') {

									if (!empty($paymentTransactionObj->getFromEPaymentOrderID()))
										unset($ePaymentObjKeyArr[$paymentTransactionObj->getId()]);

									if (!empty($paymentTransactionObj->getFromPaymentOrderID()))
										unset($paymentObjKeyArr[$paymentTransactionObj->getId()]);

									unset($paymentOrderDrawnAmount[$paymentObjKey][$paymentTransactionObj->getId()]);
								}
							}
						}
					}
				}
			}

			if (!empty($paymentObjKeyArr) || !empty($ePaymentObjKeyArr)) {

				$paramsOrderList['cin'] = $userObj->getCin();
				$paramsOrderList['transactionDirection'] = 'ToObligation';
				$paramsOrderList['hasTransaction'] = 1;
				$paramsOrderList['status'] = 'Paid';

				if (!empty($paymentObjKeyArr))
					$paramsOrderList['paymentId'] = array_values($paymentObjKeyArr);

				if (!empty($ePaymentObjKeyArr))
					$paramsOrderList['ePaymentId'] = array_values($ePaymentObjKeyArr);

				$paymentOrderList = $this->restService->paymentOrderList($totalCount, $paramsOrderList);
			}

			// плащане през лична сметка
			if (empty($paymentOrderList)) {

				if (!empty($obligationNumber))
					$transactionList = $this->restService->paymentOrderTransactionList($totalCount, ['obligationNumberList' => $obligationNumber]);

				if (!empty($transactionList)) {

					$paymentTransactionList = [];
					$refundReversalTransactionList = [];

					foreach ($transactionList as $transactionObj) {
						if ($transactionObj->getType() == 'Payment')
							$paymentTransactionList[$transactionObj->getId()] = $transactionObj;
						else
							$refundReversalTransactionList[$transactionObj->getId()] = $transactionObj;
					}

					if (!empty($paymentTransactionList)) {

						foreach ($paymentTransactionList as $paymentTransactionObj) {

							if (!empty($refundReversalTransactionList)) {

								foreach ($refundReversalTransactionList as $refundReversalTransactionObj) {
									if ($paymentTransactionObj->getId() == $refundReversalTransactionObj->getParentId() && $refundReversalTransactionObj->getType() == 'Reversal')
										unset($paymentTransactionList[$paymentTransactionObj->getId()]);
								}
							}
						}
					}
				}
			}

			$applicationTypeList = [];
			$applicationTypeList = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $params['registerId'], 'appType' => $params['applicationType'], 'getPlainResultByType' => 1]);
		}

		$registerList = array_flip($this->cacheService->getRegisterList());

		$this->layout('layout/ajax');

		return new ViewModel([
			'paymentOrderList' 		=> !empty($paymentOrderList) ? $paymentOrderList : [],
			'paymentTransactionList' => !empty($paymentTransactionList) ? $paymentTransactionList : [],
			'paymentOrderDrawnAmount' => !empty($paymentOrderDrawnAmount) ? $paymentOrderDrawnAmount : [],
			'params' 				=> $params,
			'applicationTypeList' 	=> !empty($applicationTypeList) ? $applicationTypeList : [],
			'registerList' 			=> $registerList,
			'paymentMethodArr'		=> self::PAYMENT_METHOD,
			'errors'				=> $errors
		]);
	}


	/**
	 * Функционалност "Преглед на списък с усвоени суми по платежно нареждане по заявление".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewPaymentOrderTransactionListAction() {

		$registerId = (int)$this->params()->fromRoute('registerId', null);

		$paymentOrderId = (int)$this->params()->fromRoute('paymentOrderId', null);

		$registerList = array_flip($this->cacheService->getRegisterList());

		$valueInputFilter = new InputFilter();

		$valueInputFilter->add([
			'name' => 'date',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class
				],
				[
					'name' => \Zend\Validator\Date::class,
					'options' => ['format' => 'Y-m-d']
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$valueInputFilter->setData($this->params()->fromQuery());

		if (!empty($paymentOrderId) && $paymentOrderId <= \Application\Module::APP_MAX_INT && !empty($registerId) && $valueInputFilter->isValid()) {

			$paymentDate = $valueInputFilter->getValues()['date'];

			$userObj = $this->userService->getUser();

			$params = [
				'register' 	=> array_search($registerId, self::REGISTER_SERVICE_LIST),
				'cin'		=> $userObj->getCin(),
				'dateFrom' 	=>	$paymentDate,
				'dateTo' 	=>	$paymentDate

			];

			$paymentOrderList = $this->restService->paymentOrderList($totalCount, $params);

			// масив от идентификатори на плащания
			if (!empty($paymentOrderList) && !array_key_exists('status', $paymentOrderList))
				$paymentOrderIdList = array_map(function($obj){ return $obj->getId();}, $paymentOrderList);

			if (!empty($paymentOrderIdList) && $paymentOrderId <= \Application\Module::APP_MAX_INT && in_array($paymentOrderId, $paymentOrderIdList)) {

				$key = array_search($paymentOrderId, $paymentOrderIdList);

				$paymentObj = $paymentOrderList[$key];

				// електронно платежно нареждане - ePay, PEPDAEU
				if ($paymentObj->getProviderKind() == 'ePay' || $paymentObj->getProviderKind() == 'PEPDAEU')
					$paramsTransactions['ePaymentId'] = $paymentObj->getId();

				// платежно нареждане
				else
					$paramsTransactions['paymentId'] = $paymentObj->getId();

				$transactionList = $this->restService->paymentOrderTransactionList($totalCount, $paramsTransactions);

				$paymentOrderTransactionList = [];
				$refundReversalTransactionList = [];

				$obligationIdList = [];
				$applicationDutyList = [];

				$personalAccountIdList = [];

				if (!empty($transactionList)) {

					foreach ($transactionList as $transaction) {

						if ($transaction->getType() == 'Payment') {
							$paymentOrderTransactionList[$transaction->getId()] = $transaction;

							if (!empty($transaction->getToObligationId()))
								$obligationIdList[$transaction->getId()] = $transaction->getToObligationId();

							if (!empty($transaction->getToPersonalAccountId()))
								$personalAccountIdList[$transaction->getToPersonalAccountId()] = $transaction->getToPersonalAccountId();
						}
						else
							$refundReversalTransactionList[$transaction->getId()] = $transaction;
					}

					if (!empty($paymentOrderTransactionList)) {

						foreach ($paymentOrderTransactionList as $paymentTransactionObj) {

							if (!empty($refundReversalTransactionList)) {

								foreach ($refundReversalTransactionList as $refundReversalTransactionObj) {
									if ($paymentTransactionObj->getId() == $refundReversalTransactionObj->getParentId() && $refundReversalTransactionObj->getType() == 'Reversal') {
										unset($paymentOrderTransactionList[$paymentTransactionObj->getId()]);

										if (!empty($paymentTransactionObj->getToObligationId()))
											unset($obligationIdList[$paymentTransactionObj->getId()]);

										if (!empty($paymentTransactionObj->getToPersonalAccountId()))
											unset($personalAccountIdList[$paymentTransactionObj->getToPersonalAccountId()]);
									}
								}
							}
						}
					}

					$toObligationID = 0;
					$type = '';

					if (!empty($personalAccountIdList))
						$type = $this->translator->translate('EP_EPAYMENT_POWER_PERS_ACC_L');

					if (!empty($obligationIdList)) {

						$toObligationID = 1;

						$type = $this->translator->translate('EP_PAYMENT_OBLIG_L');

						$params = [];

						$params = [
							'register' 				=> array_search($registerId, self::REGISTER_SERVICE_LIST),
							'getResultByObligation' => 1,
							'toObligationId'		=> array_values($obligationIdList)
						];

						$applicationDutyList = [];
						$applicationDutyList = $this->restService->applicationDutyList($params);

						$applicationTypeList = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $registerId, 'getPlainResultByType' => 1]);
					}
				}
			}
		}

		$this->layout('layout/ajax');

		return new ViewModel([
			'registerId' 					=> $registerId,
			'paymentObj'					=> !empty($paymentObj) ? $paymentObj : null,
			'paymentOrderTransactionList' 	=> !empty($paymentOrderTransactionList) ? $paymentOrderTransactionList : [],
			'type' 							=> !empty($type) ? $type : '',
			'toObligationID' 				=> !empty($toObligationID) ? $toObligationID : 0,
			'toPersonalAccountID' 			=> !empty($toPersonalAccountID) ? $toPersonalAccountID : 0,
			'applicationDutyList' 			=> !empty($applicationDutyList) ? $applicationDutyList : [],
			'applicationTypeList' 			=> !empty($applicationTypeList) ? $applicationTypeList : [],
			'registerList' 					=> $registerList,
			'paymentMethodArr'				=> self::PAYMENT_METHOD
		]);
	}

	/**
	 * Функционалност "Списък, извършени захранвания".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function personalAccountListAction() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromQuery('page', 1);

		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$registerList = array_flip($this->cacheService->getRegisterList());

		$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$searchForm = new \Payment\Form\PersonalAccountForm();

		$searchForm->get('registerId')->setValue($selectedRegisterId);

		$paymentMethodSearchForm = self::PAYMENT_METHOD;
		unset($paymentMethodSearchForm['Bank']);

		$searchForm->get('paymentMethod')->setValueOptions(["" => 'GL_CHOICE_ALL_L'] + $paymentMethodSearchForm);

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'register' 				=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST),
			'cin'					=> $userObj->getCin(),
			'transactionDirection' 	=> 'ToPersonalAccount',
			'hasTransaction'		=> 1
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'dateFrom'		=> (new \DateTime())->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}

		$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
		$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

		$searchForm->setData($searchParams);

		if ($searchForm->isValid()) {

			$dataParams = $searchForm->getData();

			if (!empty($dataParams['search']))
				$personalAccountList = $this->restService->paymentOrderList($totalCount, $params + $dataParams);
		}

		$balance = [];
		$balanceTemp = $this->restService->personalAccountBalance(['cin' => $userObj->getCin()]);

		if (!empty($balanceTemp)) {
			foreach (self::REGISTER_SERVICE_LIST as $registerName => $registerId)
				$balance[$registerId] = !empty($balanceTemp[$registerName]) ? $balanceTemp[$registerName] : 0;
		}

		$request = $this->getRequest();

		if ($request->isXmlHttpRequest()) {
			if ($request->getPost('getItemList') || $request->getPost('changeRegisterTab'))
				return $result = $this->getPersonalAccountList();

			elseif ($request->getPost('showDetailInfo') && $request->getPost('paymentId'))
				return $this->getPersonalAccountDetailInfo($request->getPost(), $selectedRegisterId);
		}

		return new ViewModel([
			'searchForm'			=> $searchForm,
			'personalAccountList'	=> !empty($personalAccountList) ?  $personalAccountList : [],
			'balance' 				=> $balance,
			'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
			'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
			'registerList'			=> $registerList,
			'selectedRegisterId' 	=> $selectedRegisterId,
			'params'				=> $this->params()->fromQuery(),
			'paymentMethodArr'		=> self::PAYMENT_METHOD
		]);
	}


	/**
	 * Извлича списък с извършени захранвания при странициране или при промяна на таб регистър.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getPersonalAccountList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$changeRegisterTab = !empty($this->params()->fromPost('changeRegisterTab')) ? (int)$this->params()->fromPost('changeRegisterTab') : 0;

		$registerList = array_flip($this->cacheService->getRegisterList());

		if (!empty($changeRegisterTab) && !empty($this->params()->fromPost('registerId')))
			$selectedRegisterId = (int)$this->params()->fromPost('registerId');
		else
			$selectedRegisterId = !empty($this->params()->fromQuery('registerId')) ? (int)$this->params()->fromQuery('registerId') : array_search('CR', $registerList);

		$userObj = $this->userService->getUser();

		$params = [
			'cp' 					=> $page,
			'rowCount' 				=> $rowCount,
			'registerId'			=> $selectedRegisterId,
			'cin'					=> $userObj->getCin(),
			'register' 				=> array_search($selectedRegisterId, self::REGISTER_SERVICE_LIST),
			'transactionDirection' 	=>'ToPersonalAccount',
			'hasTransaction'		=> 1
		];

		$searchParams = [];
		
		// параметри за търсене по подразбиране
		$searchParams = [
			'dateFrom'		=> (new \DateTime())->format('d.m.Y'),
			'dateTo' 		=> (new \DateTime())->format('d.m.Y')
		];

		// параметри за търсене
		if (!empty($this->params()->fromQuery('search', null))) {
			$searchParams = $this->params()->fromQuery();
			
			$searchParams['dateFrom'] = $this->params()->fromQuery('dateFrom', null);
			$searchParams['dateTo'] = $this->params()->fromQuery('dateTo', null);
		}

		// промяна на таб регистър
		if (!empty($changeRegisterTab)) {

			$searchForm = new \Payment\Form\PersonalAccountForm();

			$searchForm->get('registerId')->setValue($selectedRegisterId);

			$paymentMethodSearchForm = self::PAYMENT_METHOD;
			unset($paymentMethodSearchForm['Bank']);

			$searchForm->get('paymentMethod')->setValueOptions(["" => 'GL_CHOICE_ALL_L'] + $paymentMethodSearchForm);

			$searchForm->get('dateFrom')->setValue($searchParams['dateFrom']);
			$searchForm->get('dateTo')->setValue($searchParams['dateTo']);

			$searchForm->setData($searchParams);

			if ($searchForm->isValid()) {

				$dataParams = $searchForm->getData();

				if (!empty($dataParams['search']))
					$personalAccountList = $this->restService->paymentOrderList($totalCount, $params + $dataParams);
			}

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'searchForm'			=> $searchForm,
				'personalAccountList'	=> !empty($personalAccountList) ?  $personalAccountList : [],
				'totalCount' 			=> (!empty($totalCount) ? $totalCount : 0),
				'totalPages' 			=> (!empty($totalCount) ? ceil($totalCount/$rowCount) : 0),
				'registerList'			=> $registerList,
				'selectedRegisterId' 	=> $selectedRegisterId,
				'paymentMethodArr'		=> self::PAYMENT_METHOD,
				'params'				=> $this->params()->fromQuery()
			));

			$result->setTemplate('payment/payment/personal-account-list-section.phtml');
		}

		// странициране
		else {

			$personalAccountList = $this->restService->paymentOrderList($totalCount, $params + $searchParams);

			$this->layout('layout/ajax');

			$result = new ViewModel(array(
				'personalAccountList' 	=> $personalAccountList,
				'registerList' 			=> $registerList,
				'selectedRegisterId' 	=> $selectedRegisterId,
				'paymentMethodArr'		=> self::PAYMENT_METHOD
			));

			$result->setTemplate('payment/payment/personal-account-list-partial.phtml');
		}

		return $result;
	}


	/**
	 * Извлича списък с транзакции към извършени захранвания.
	 *
	 * @param array $params Масив с параметри.
	 * @param int $register Регистър.
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getPersonalAccountDetailInfo($params, $register=null) {

		$paymentId = (int)$params['paymentId'];

		$paymentOrderTransactionList = [];
		$paymentOrderObj = new \Payment\Entity\PaymentOrderEntity();

		$valueInputFilter = new InputFilter();

		$valueInputFilter->add([
			'name' => 'paymentDate',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class
				],
				[
					'name' => \Zend\Validator\Date::class,
						'options' => ['format' => 'Y-m-d']
				],
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$valueInputFilter->setData($params);

		if ($valueInputFilter->isValid()) {

			$paymentDate = \Application\Service\AppService::getDateFromSQL($valueInputFilter->getValues()['paymentDate'].' 00:00:00', false);

			$userObj = $this->userService->getUser();

			$paramList = [
				'dateFrom' 				=> $paymentDate,
				'dateTo' 				=> $paymentDate,
				'transactionDirection' 	=> 'ToPersonalAccount',
				'hasTransaction'		=> 1,
				'cin'					=> $userObj->getCin()
			];

			if (!empty($register))
				$paramList['register'] = array_search($register, self::REGISTER_SERVICE_LIST);

			$paymentOrderList = $this->restService->paymentOrderList($totalCount, $paramList);

			if (!empty($paymentOrderList) && !array_key_exists('status', $paymentOrderList)) {

				foreach ($paymentOrderList as $obj) {

					if ($obj->getId() == $paymentId)
						$paymentOrderObj = clone $obj;
				}
			}

			$paramsList = [];

			if (!empty($paymentOrderObj->getId())) {

				// електронно платежно нареждане - ePay, PEPDAEU
				if ($paymentOrderObj->getProviderKind() == 'ePay' || $paymentOrderObj->getProviderKind() == 'PEPDAEU')
					$paramsList['ePaymentId'] = $paymentOrderObj->getId();

				// платежно нареждане
				else
					$paramsList['paymentId'] = $paymentOrderObj->getId();

				if (!empty($paramsList))
					$transactionList = $this->restService->paymentOrderTransactionList($totalCount, $paramsList);

				if (!empty($transactionList)) {

					$paymentOrderTransactionList = [];
					$refundReversalTransactionList = [];

					foreach ($transactionList as $transactionObj) {
						if ($transactionObj->getType() == 'Payment')
							$paymentOrderTransactionList[$transactionObj->getId()] = $transactionObj;
						else
							$refundReversalTransactionList[$transactionObj->getId()] = $transactionObj;
					}

					if (!empty($paymentOrderTransactionList)) {

						if (!empty($refundReversalTransactionList)) {

							foreach ($paymentOrderTransactionList as $paymentTransactionObj) {

								foreach ($refundReversalTransactionList as $refundReversalTransactionObj) {
									if ($paymentTransactionObj->getId() == $refundReversalTransactionObj->getParentId() && $refundReversalTransactionObj->getType() == 'Reversal')
										unset($paymentOrderTransactionList[$paymentObj->getId()]);
								}
							}
						}
					}

				}
			}
		}

		$this->layout('layout/ajax');

		$result = new ViewModel([
			'paymentOrderTransactionList' 	=> $paymentOrderTransactionList,
			'transactionTypeArr'			=> self::TRANSACTION_TYPE,
			'reason' 						=> !empty($paymentOrderObj->getPaymentDescription()) ? str_replace(",", ", ", $paymentOrderObj->getPaymentDescription()) : '',
			'paymentDate' 					=> !empty($paymentOrderObj->getPaymentDate()) ? $paymentOrderObj->getPaymentDate() : ''
		]);

		$result->setTemplate('payment/payment/personal-account-detail-info-partial.phtml');

		return $result;
	}


	/**
	 * Функционалност "Захранване на лична сметка".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function payPowerPersonalAccountAction() {

		$params = $this->params()->fromRoute();

		$userObj = $this->userService->getUser();

		$obligPerson = (!empty($userObj->getFirstName()) ? $userObj->getFirstName().' ' : '').(!empty($userObj->getMiddleName()) ? $userObj->getMiddleName().' ' : '').(!empty($userObj->getFamilyName()) ? $userObj->getFamilyName() : '');

		$params['cin'] = $userObj->getCin();
		$params['register'] = array_search($params['registerId'], self::REGISTER_SERVICE_LIST);

		$this->layout('layout/ajax');

		return new ViewModel([
			'obligPerson' 		=> $obligPerson,
			'registerId'		=> $this->params()->fromRoute('registerId'),
		]);
	}


	/**
	 * Функционалност "Плащане към ePay - захранване на лична сметка".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function epayPaymentPowerPersonalAccountAction() {

		$paymentMethod = $this->params()->fromPost('paymentMethod');
		$registerId = (int)$this->params()->fromPost('registerId');

		if (empty($registerId) || $paymentMethod != 'epay') {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$userObj = $this->userService->getUser();

		$postData = $this->params()->fromPost();

		// Добавя филтър за валидация на име, вид идентификатор, идентификатор
		$valueInputFilter = $this->addInputFilterObligPerson();

		// Проверка за празна стойност сума за захранване на личната сметка
		$valueInputFilter->add([
			'name' => 'sumPersonalAccount',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate('GL_INPUT_FIELD_MUST_E')
						]
					]
				],
				[
					'name' => \Zend\Validator\Regex::class,
					'break_chain_on_failure' => true,
					'options' => [
						'pattern' => '/^\d{1,10}(\.\d{0,2})?$/',
						'messages' => [
							'regexNotMatch' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				],
				[
					'name' => \Zend\Validator\LessThan::class,
					'break_chain_on_failure' => true,
					'options' => [
						'max' => self::MAX_CHARGE_AMOUNT_PERSONAL_ACCOUNT,
						'inclusive' => true,
						'messages' => [
							'notLessThanInclusive' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				]
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$valueInputFilter->setData($postData);

		if (!$valueInputFilter->isValid()){

			foreach ($valueInputFilter->getMessages() as $key => $messageArr) {

				$key = ($key == 'obligPersonIdentityKind') ? 'identityKindSection' : $key;

				foreach ($messageArr as $message)
					$errors[][$key] = $message;
			}

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> $errors
			]);
		}

		// Филтрирани данни
		$sumPersonalAccount = $valueInputFilter->getValues()['sumPersonalAccount'];
		$obligPerson = $valueInputFilter->getValues()['obligPerson'];
		$obligPersonIdentityKind = $valueInputFilter->getValues()['obligPersonIdentityKind'];
		$obligPersonIdentity = $valueInputFilter->getValues()['obligPersonIdentity'];

		// Проверка за допустима стойност на идентификатор на задължено лице
		$error = $this->isValidObligPersonIdentity($obligPersonIdentityKind, $obligPersonIdentity);

		if (!empty($error)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [['obligPersonIdentity' => $error]]
			]);
		}

		$paramsEpay = [
			'registerId' 					=> $registerId,
			'amount' 						=> $sumPersonalAccount,
			'obligPerson' 					=> $obligPerson,
			'obligPersonIdentityKind' 		=> $obligPersonIdentityKind,
			'obligPersonIdentity'			=> $obligPersonIdentity,
			'lang'							=> $this->params()->fromRoute('lang'),
			'isPayPowerPersonalAccount' 	=> 1
		];

		// генериране на данни за заявка към Epay и записване на изходящо съобщение към Epay
		if ($data = $this->epayRequest($paramsEpay)) {

			return new JsonModel([
				'status' 	=> 'success',
				'epayData'	=> $data,
				'paymentMethod' => 'epay'
			]);
		}

		return new JsonModel([
			'status' => 'error',
			'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
		]);
	}

	/**
	 * Функционалност "Изпращане на заявка и запис на изходящо съобщение към ПЕПДАЕУ".
	 *
	 * @param array $params Масив с параметри.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	private function pepdaeuRequest($params=[]) {

		$paymentObj = new \Payment\Entity\PaymentEntity();

		$userObj = $this->userService->getUser();

		// тип на регистрационните данни - ПЕПДАЕУ
		$type = 2;
		$registryAgencyObj = null;
		$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

		$bankAccount = null;
		$bankAccount = $this->restService->getBankAccountList(['register' => array_search($params['registerId'], self::REGISTER_SERVICE_LIST)]);

		if (empty($registryAgencyObj) || empty($bankAccount))
			return ['error' => true];

		$paymentObj->setMerchantCin($registryAgencyObj->getCin());

		$registerList = array_flip($this->cacheService->getRegisterList());

		$merchantName = $this->translator->translate('GL_BANK_ACCOUNT_'.$registerList[$params['registerId']]);

		$paymentObj->setMerchantName($merchantName);
		$paymentObj->setMerchantIban($bankAccount->getIban());
		$paymentObj->setMerchantBic($bankAccount->getBic());

		list($hour, $minute, $seconds) = explode(':', $registryAgencyObj->getValidityPeriod());

		$hour = (!isset($hour) || empty($hour)) ? '00' : $hour;
		$minute = (!isset($minute) || empty($minute)) ? '00' : $minute;
		$seconds = (!isset($seconds) || empty($seconds)) ? '00' : $seconds;

		$dateTimeObj= new \DateTime();
		$dateTimeObj->add(new \DateInterval('PT'.$hour.'H'.$minute.'M'.$seconds.'S'));
		$expDate	= $dateTimeObj->format('c');

		$paymentObj->setObligationDate((new \DateTime())->format('c'));

		$paymentObj->setAmount($params['amount']);
		$paymentObj->setExpirationTime($expDate);
		$paymentObj->setObligedPerson($params['obligPerson']);

		$paymentObj->setRegisterId($params['registerId']);
		$paymentObj->setPaymentSystemType($type);
		$paymentObj->setUserId($userObj->getUserId());
		$paymentObj->setUserCin($userObj->getCin());

		$obligationDeadline = !empty($params['obligationDeadline']) ? new \DateTime($params['obligationDeadline']) : '';

		$pepdaeuParams = [
			'ServiceProviderName' 					=> $paymentObj->getMerchantName(),
			'ServiceProviderBank' 					=> $bankAccount->getBankName(),
			'ServiceProviderBIC'					=> $paymentObj->getMerchantBic(),
			'ServiceProviderIBAN' 					=> $paymentObj->getMerchantIban(),
			'Currency' 								=> 'BGN',
			'PaymentAmount' 						=> $paymentObj->getAmount(),
			'ApplicantUinTypeId' 					=> $params['obligPersonIdentityKind'],
			'ApplicantUin' 							=> $params['obligPersonIdentity'],
			'ApplicantName' 						=> $paymentObj->getObligedPerson(),
			'PaymentReferenceType' 					=> 9,
			'PaymentReferenceDate' 					=> (new \DateTime())->format('c'),
			'ExpirationDate' 						=> $paymentObj->getExpirationTime(),
			'AdministrativeServiceNotificationURL'	=> $registryAgencyObj->getUrlResponse()
		];

		//плащане на задължение
		if (!empty($params['isDutyPayment'])) {

			$validator = new \Zend\Validator\Date(['format' => 'd.m.Y H:i:s']);

			if (!empty($obligationDeadline) && $validator->isValid($obligationDeadline) && $validator->isValid($dateTimeObj) && \Application\Service\AppService::compareDates($dateTimeObj->format('d.m.Y H:i:s'), $obligationDeadline->format('d.m.Y H:i:s'), '.') == -1) {
				$paymentObj->setExpirationTime($obligationDeadline->format('c'));

				$pepdaeuParams['ExpirationDate'] = $paymentObj->getExpirationTime();
			}

			$paymentObj->setPaymentType(1);

			$paymentObj->setObligationNumber($params['obligationNumber']);
			$paymentObj->setApplicationNumber($params['applicationNumber']);

			$paymentMsgList = $this->paymentDM->getPaymentMessage(null, $paymentObj->getPaymentSystemType(), $paymentObj->getObligationNumber());

			// не съществува запис с такъв номер на задължение и тип на система за електронни разплащания пепдаеу
			if (!$paymentMsgList->count()) {

				if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj, $pepdaeuParams, $registryAgencyObj))
					return ['error' => true];
			}

			// съществува запис
			else {

				foreach ($paymentMsgList as $paymentMsg) {
					$statusArr[] = $paymentMsg->getStatus();

					// необработено задължение
					if (!$paymentMsg->getStatus()) {

						$paymentMsgData = new \Payment\Entity\PaymentEntity();
						$paymentMsgData->setMessageId($paymentMsg->getMessageId());
						$paymentMsgData->setReason($paymentMsg->getReason());
						$paymentMsgData->setTransactionNumber($paymentMsg->getTransactionNumber());
						$paymentMsgData->setAuthorizationCode($paymentMsg->getAuthorizationCode());
					}
				}

				// задължението не е платено
				if (!in_array(1, $statusArr)) {

					// задължението е необработено
					if (in_array(0, $statusArr)) {

						$paymentMsgData->setStatus(0);
						$paymentMsgData->setObligationDate((new \DateTime())->format('c'));
						$paymentMsgData->setStatusDate((new \DateTime())->format('c'));

						if ($this->paymentDM->updatePaymentMessage($paymentMsgData)){

							// в случай, че има върнат номер на транзакция- обновява се реда в базата и се връща съобщение потребителят да влезне в ПЕП на ДАЕУ
							//if (!empty($paymentMsgData->getTransactionNumber()))
								//return ['error' => ['msg' => $this->translator->translate("EP_PAY_00012_I"), 'msgAlert' => 1]];

							unset($paymentMsgData);

							return ['success' => true];
						}
					}

					// задължението е с отказано или изтекло плащане
					else {

						if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj, $pepdaeuParams, $registryAgencyObj))
							return ['error' => true];
					}
				}

				else
					unset($paymentMsgData);
			}
		}

		// захранване на лична сметка
		else if (!empty($params['isPayPowerPersonalAccount'])) {

			$paymentObj->setPaymentType(2);

			$paymentObj->setObligationNumber(null);
			$paymentObj->setApplicationNumber(null);

			if (!$paymentMsgData = $this->paymentDM->addPaymentMessage($paymentObj, $pepdaeuParams, $registryAgencyObj))
				return ['error' => true];
		}

		if (isset($paymentMsgData) && !empty($paymentMsgData->getMessageId()) && !empty($paymentMsgData->getPepdaeuResponse())) {

			// отговор от системата на ПЕП на ДАЕУ при създаване на заявка за плащане
			$responsePaymentObj = $paymentMsgData->getPepdaeuResponse();

			if (!empty($responsePaymentObj->acceptedReceiptJson))
				$transactionNumber = $responsePaymentObj->acceptedReceiptJson->id;

			else if (!empty($responsePaymentObj->unacceptedReceiptJson)) {

				$obligation = !empty($params['obligationNumber']) ? 'OligationNumber: '.$params['obligationNumber'] : 'PayPowerPersonalAccount';

				$msg = implode(',', $responsePaymentObj->unacceptedReceiptJson->errors)." PayDutyPepdaeu error: {".$obligation."}";
				$e = new \Exception();
				errorHandler($e->getCode(), $msg, $e->getFile(), $e->getLine(), $e->getTraceAsString());

				return ['error' => ['msg' => $this->translator->translate('EP_PAY_00003_E').'<br>'.implode(',', $responsePaymentObj->unacceptedReceiptJson->errors)]];
			}

			if (!empty($transactionNumber)) {

				$authorizationCode = null;

				// запитване за код за достъп до заявка за плащане
				$responseAccessCodeObj = $this->restService->getPaymentAccessCodePepdaeu($transactionNumber, $registryAgencyObj);

				// отговор от системата на ПЕП на ДАЕУ при запитване за код за достъп до заявка за плащане
				if (!empty($responseAccessCodeObj)) {

					if (!empty($responseAccessCodeObj->accessCode))
						$authorizationCode = $responseAccessCodeObj->accessCode;

					else if (empty($responseAccessCodeObj->accessCode)) {

						$msg = "EmptyAccessCode PayDutyPepdaeu error: {MessageId: ".$paymentMsgData->getMessageId().'}';
						$e = new \Exception();
						errorHandler($e->getCode(), $msg, $e->getFile(), $e->getLine(), $e->getTraceAsString());
					}
				}

				$paymentMsgData->setObligationDate((new \DateTime())->format('c'));
				$paymentMsgData->setStatus(0);
				$paymentMsgData->setStatusDate((new \DateTime())->format('c'));
				$paymentMsgData->setTransactionNumber($transactionNumber);
				$paymentMsgData->setAuthorizationCode($authorizationCode);

				if ($this->paymentDM->updatePaymentMessage($paymentMsgData)) {

					if ($params['isGenerateCodePepdaeu'])
						return ['successCode' => 1, 'codePepdaeu' => $authorizationCode, 'numberPepdaeu' => $transactionNumber];

					else
						return ['success' => true];
				}
			}
		}

		return ['error' => true];
	}

	/**
	 * Функционалност "Плащане към ПЕПДАЕУ - задължения към услуги".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pepdaeuPaymentDutyListAction() {

		$routeMatch = $this->getEvent()->getRouteMatch();
		$routeName = $routeMatch->getMatchedRouteName();

		$isGenerateCodePepdaeu = ($routeName == 'pepdaeu_duty_generate_code' ? 1 : 0);

		$paymentMethod = $this->params()->fromPost('paymentMethod');
		$registerId = (int)$this->params()->fromPost('registerId');
		$applicationNumberList = $this->params()->fromPost('applicationNumber');
		$dutyObligationNumber = $this->params()->fromPost('dutyObligationNumber');

		if ($paymentMethod != 'pepdaeu' || empty($registerId) || !$this->isValidApplicationNumberList($applicationNumberList) || empty($dutyObligationNumber)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$applicationNumber = explode(',', $this->params()->fromPost('applicationNumber'));

		$postData = $this->params()->fromPost();

		// Добавя филтър за валидация на име, вид идентификатор, идентификатор
		$valueInputFilter = $this->addInputFilterObligPerson();

		$valueInputFilter->setData($postData);

		if (!$valueInputFilter->isValid()){

			foreach ($valueInputFilter->getMessages() as $key => $messageArr) {

				$key = ($key == 'obligPersonIdentityKind') ? 'identityKindSection' : $key;

				foreach ($messageArr as $message)
					$errors[][$key] = $message;
			}

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> $errors
			]);
		}

		// Филтрирани данни
		$obligPerson = $valueInputFilter->getValues()['obligPerson'];
		$obligPersonIdentityKind = $valueInputFilter->getValues()['obligPersonIdentityKind'];
		$obligPersonIdentity = $valueInputFilter->getValues()['obligPersonIdentity'];

		// Проверка за допустима стойност на идентификатор на задължено лице
		$error = $this->isValidObligPersonIdentity($obligPersonIdentityKind, $obligPersonIdentity);

		if (!empty($error)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [['obligPersonIdentity' => $error]]
			]);
		}

		$userObj = $this->userService->getUser();

		$paramList = [
			'register' 			=> array_search($registerId, self::REGISTER_SERVICE_LIST),
			'applicationNumber' => $applicationNumber,
			'cin' 				=> $userObj->getCin(),
			'status' 			=> 'Requested'
		];

		$applicationDutyList = $this->restService->applicationDutyList($paramList);

		if (!empty($applicationDutyList)) {

			$dutyObj = new \Payment\Entity\DutyEntity();

			foreach ($applicationDutyList as $dutyArr) {

				foreach ($dutyArr as $duty) {

					if ($duty->getObligationNumber() == $dutyObligationNumber)
						$dutyObj = clone $duty;
				}
			}

			// проверка за задължение към заявление и за дължима сума положително число, проверка за допустим начин на плащане през пепдаеу за заявлението, по което се плаща задължението
			if (
					empty($dutyObj->getApplicationNumber())
					|| empty($dutyObj->getObligationNumber())
					|| empty(number_format(($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),2))
					|| bccomp(number_format(($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),2) , 0 , 2) != 1
					|| empty($dutyObj->getApplicationType())
					|| !$this->isValidApplicationPaymentType($registerId, 3, $dutyObj->getApplicationType())
				) {

				return new JsonModel([
					'status' => 'error',
					'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
				]);
			}

			// заявка към ПЕПДАЕУ
			else {

				$paramsPepdaeu = [
					'registerId' 				=> $registerId,
					'applicationNumber'			=> $dutyObj->getApplicationNumber(),
					'obligationNumber' 			=> $dutyObj->getObligationNumber(),
					'obligationDeadline'		=> $dutyObj->getDeadline(),
					'amount' 					=> ($dutyObj->getObligationAmount() - $dutyObj->getPaidAmount()),
					'obligPerson' 				=> $obligPerson,
					'obligPersonIdentityKind' 	=> $obligPersonIdentityKind,
					'obligPersonIdentity' 		=> $obligPersonIdentity,
					'isDutyPayment'				=> 1,
					'isGenerateCodePepdaeu' 	=> $isGenerateCodePepdaeu
				];

				$resultRequest = $this->pepdaeuRequest($paramsPepdaeu);

				// неуспешна заявка към ПЕП на ДАЕУ
				if (array_key_exists('error', $resultRequest)) {

					$errorMessage = !empty($resultRequest['error']['msg']) ? $resultRequest['error']['msg'] : $this->translator->translate('GL_ERROR_L');

					$alertWarning = 0;
					if (!empty($resultRequest['error']['msgAlert']))
						$alertWarning = 1;

					return new JsonModel([
						'status' 		=> 'error',
						'errors' 		=> [[0 => $errorMessage]],
						'alertWarning' 	=> [[0 => $alertWarning]]
					]);
				}

				// заявка към ПЕПДАЕУ и записване на изходящо съобщение към ПЕПДАЕУ
				else {

					// Генериране на код
					if (array_key_exists('successCode', $resultRequest)) {

						return new JsonModel([
							'status' 		=> 'success',
							'codePepdaeu'	=> $resultRequest['codePepdaeu']
						]);
					}

					// плащане на задължение
					else {

						// тип на регистрационните данни - ПЕПДАЕУ
						$type = 2;
						$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

						$urlParsed = parse_url($registryAgencyObj->getUrl());

						if (!empty($urlParsed)) {

							switch ($urlParsed['scheme']) {

								case 'https':
									$scheme = !empty($urlParsed['port']) ? '' : 'ssl://';
									$port = !empty($urlParsed['port']) ? $urlParsed['port'] : 443;
									break;

								case 'http':
								default:
									$scheme = '';
									$port = !empty($urlParsed['port']) ? $urlParsed['port'] : 80;
							}

							$socket = @fsockopen($scheme.$urlParsed['host'], $port, $errno, $errstr, 20);

							// неуспешно препращане към сайта на ПЕП на ДАЕУ
							if (!$socket) {

								return new JsonModel([
									'status' => 'error',
									'errors' => [[0 => $this->translator->translate('EP_PAY_00012_I')]],
									'alertWarning' => [[0 => true]]
								]);
							}

							// успешно препращане към сайта на ПЕП на ДАЕУ
							else {

								fclose($socket);

								return new JsonModel([
									'status' 	=> 'success',
									'urlToRedirect'	=> $registryAgencyObj->getUrl(),
									'paymentMethod' => 'pepdaeu'
								]);
							}
						}
					}
				}
			}
		}

		return new JsonModel([
			'status' => 'error',
			'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
		]);
	}


	/**
	 * Функционалност "Обработване на отговор от PEPDAEU".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pepdaeuResponseAction() {

		if ($this->getRequest()->isPost()) {

			// тип на регистрационните данни - ПЕПДАЕУ
			$type = 2;
			$registryAgencyObj = new \Payment\Entity\RegistryAgencyEntity();
			$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

			$ENCODED  = $_POST['Data'];
			$CHECKSUM = base64_encode(hash_hmac('sha256', $ENCODED, $registryAgencyObj->getSecretWord(), true));

			if (!empty($CHECKSUM) && !empty($_POST['Hmac']) && $CHECKSUM == $_POST['Hmac']) {

				$data = base64_decode($ENCODED);
				$dataObj = json_decode($data);

				if (!empty($dataObj->Id) && !empty($dataObj->Status)) {

					//ПЕПДАЕУ
					$paymentSystemType = 2;

					$paymentObj = $this->paymentDM->getPaymentMessage($messageId=null, $paymentSystemType, null, $dataObj->Id)->current();

					// необработен
					if (!empty($paymentObj) && !empty($paymentObj->getMessageId()) && empty($paymentObj->getStatus())) {

						$status = 0;

						switch ($dataObj->Status) {

							//Платено
							case 'Authorized':
								$status = 1;
								break;

							//Отказано
							case 'Canceled':
							case 'Suspended':
								$status = 2;
								break;

							//Изтекло
							case 'Expired':
								$status = 3;
								break;
						}

						$paymentObj->setStatus($status);
						$paymentObj->setStatusDate($dataObj->ChangeTime);
						$paymentObj->setStatusDescription($dataObj->Status);
						$paymentObj->setObligationDate(null);

						$registerName = array_search($paymentObj->getRegisterId(), self::REGISTER_SERVICE_LIST);

						$paymentObj->setRegisterName($registerName);

						if ($this->paymentDM->updatePaymentMessage($paymentObj)) {

							return new JsonModel([
								'success' => "true"
							]);
						}
					}
				}
			}
		}

		die;
	}


	/**
	 * Функционалност "Плащане към ПЕПДАЕУ - захранване на лична сметка".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function pepdaeuPaymentPowerPersonalAccountAction() {

		exit;
		$routeMatch = $this->getEvent()->getRouteMatch();
		$routeName = $routeMatch->getMatchedRouteName();

		$isGenerateCodePepdaeu = ($routeName == 'pepdaeu_pay_power_generate_code' ? 1 : 0);

		$paymentMethod = $this->params()->fromPost('paymentMethod');
		$registerId = (int)$this->params()->fromPost('registerId');

		if (empty($registerId) || $paymentMethod != 'pepdaeu') {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$userObj = $this->userService->getUser();

		$postData = $this->params()->fromPost();

		// Добавя филтър за валидация на име, вид идентификатор, идентификатор
		$valueInputFilter = $this->addInputFilterObligPerson();

		// Проверка за празна стойност сума за захранване на личната сметка
		$valueInputFilter->add([
			'name' => 'sumPersonalAccount',
			'required' => true,
			'validators' => [
				[
					'name' => \Zend\Validator\NotEmpty::class,
					'break_chain_on_failure' => true,
					'options' => [
						'messages' => [
							'isEmpty' => $this->translator->translate('GL_INPUT_FIELD_MUST_E')
						]
					]
				],
				[
					'name' => \Zend\Validator\Regex::class,
					'break_chain_on_failure' => true,
					'options' => [
						'pattern' => '/^\d{1,10}(\.\d{0,2})?$/',
						'messages' => [
							'regexNotMatch' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				],
				[
					'name' => \Zend\Validator\LessThan::class,
					'break_chain_on_failure' => true,
					'options' => [
						'max' => self::MAX_CHARGE_AMOUNT_PERSONAL_ACCOUNT,
						'inclusive' => true,
						'messages' => [
							'notLessThanInclusive' => $this->translator->translate('GL_INVALID_VALUE_L')
						]
					]
				]
			],
			'filters' => [
				['name' => \Zend\Filter\StringTrim::class],
				['name' => \Zend\Filter\StripTags::class]
			]
		]);

		$valueInputFilter->setData($postData);

		$errors = [];

		if (!$valueInputFilter->isValid()){

			foreach ($valueInputFilter->getMessages() as $key => $messageArr) {

				$key = ($key == 'obligPersonIdentityKind') ? 'identityKindSection' : $key;

				foreach ($messageArr as $message)
					$errors[][$key] = $message;
			}

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> $errors
			]);
		}

		// Филтрирани данни
		$sumPersonalAccount = $valueInputFilter->getValues()['sumPersonalAccount'];
		$obligPerson = $valueInputFilter->getValues()['obligPerson'];
		$obligPersonIdentityKind = $valueInputFilter->getValues()['obligPersonIdentityKind'];
		$obligPersonIdentity = $valueInputFilter->getValues()['obligPersonIdentity'];

		// Проверка за допустима стойност на идентификатор на задължено лице
		$error = $this->isValidObligPersonIdentity($obligPersonIdentityKind, $obligPersonIdentity);

		if (!empty($error)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [['obligPersonIdentity' => $error]]
			]);
		}

		$codePepdaeu = 0;
		if (!empty($this->params()->fromPost('codePepdaeu')) && preg_match ('/^[\p{Cyrillic}\w\d\-,]+$/u', $this->params()->fromPost('codePepdaeu')))
			$codePepdaeu = $this->params()->fromPost('codePepdaeu');

		$numberPepdeau = (int)$this->params()->fromPost('numberPepdeau', 0);

		// ако първо е генериран код за плащане. т.е вече е генерирано задължение за лична сметка, тогава само се редиректва
		if (!empty($codePepdaeu) && !empty($numberPepdeau)) {

			// ПЕПДАЕУ
			$paymentSystemType = 2;

			// необработено задължение
			$status = 0;

			$paymentMsg = $this->paymentDM->getPaymentMessage(null, $paymentSystemType, null, $numberPepdeau, $status);

			if (!empty($paymentMsg)) {

				$authorizationCode = 0;

				foreach ($paymentMsg as $paymentMsgObj)
					$authorizationCode = $paymentMsgObj->getAuthorizationCode();

				if ($authorizationCode == $codePepdaeu && $paymentMsgObj->getAmount() == $sumPersonalAccount && $paymentMsgObj->getUserCin() == $userObj->getCin()) {

					// тип на регистрационните данни - ПЕПДАЕУ
					$type = 2;
					$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

					return new JsonModel([
						'status' 	=> 'success',
						'urlToRedirect'	=> $registryAgencyObj->getUrl(),
						'paymentMethod' => 'pepdaeu'
					]);
				}
			}
		}

		$paramsPepdaeu = [
			'registerId' 				=> $registerId,
			'amount' 					=> $sumPersonalAccount,
			'obligPerson' 				=> $obligPerson,
			'obligPersonIdentityKind' 	=> $obligPersonIdentityKind,
			'obligPersonIdentity' 		=> $obligPersonIdentity,
			'isPayPowerPersonalAccount' => 1,
			'isGenerateCodePepdaeu'		=> $isGenerateCodePepdaeu
		];

		$resultRequest = $this->pepdaeuRequest($paramsPepdaeu);

		// неуспешна заявка към ПЕП на ДАЕУ
		if (array_key_exists('error', $resultRequest)) {

			$errorMessage = !empty($resultRequest['error']['msg']) ? $resultRequest['error']['msg'] :  $this->translator->translate('GL_ERROR_L');

			return new JsonModel([
				'status' => 'error',
				'errors' => [[0 => $errorMessage]]
			]);
		}

		// заявка към ПЕПДАЕУ и записване на изходящо съобщение към ПЕПДАЕУ
		else {

			// Генериране на код
			if (array_key_exists('successCode', $resultRequest)) {

				return new JsonModel([
					'status' 		=> 'success',
					'codePepdaeu'	=> $resultRequest['codePepdaeu'],
					'numberPepdaeu'	=> $resultRequest['numberPepdaeu']
				]);
			}

			// плащане на задължение
			else {

				// тип на регистрационните данни - ПЕПДАЕУ
				$type = 2;
				$registryAgencyObj = $this->paymentDM->getRegistryAgencyData($type);

				return new JsonModel([
					'status' 	=> 'success',
					'urlToRedirect'	=> $registryAgencyObj->getUrl(),
					'paymentMethod' => 'pepdaeu'
				]);
			}
		}

		return new JsonModel([
			'status' => 'error',
			'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
		]);
	}


	/**
	 * Функционалност "Плащане през лична сметка - задължения към услуги".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function personalAccountPaymentDutyListAction() {

		$config = $this->getConfig();

		$paymentMethod = $this->params()->fromPost('paymentMethod');
		$registerId = (int)$this->params()->fromPost('registerId');
		$applicationNumberList = $this->params()->fromPost('applicationNumberList');
		$dutyObligationList = $this->params()->fromPost('dutyObligationList');

		$applicationNumberList = implode(',', $applicationNumberList);

		if ($paymentMethod != 'personalAccount' || empty($registerId) || !$this->isValidApplicationNumberList($applicationNumberList) || empty($dutyObligationList)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$userObj = $this->userService->getUser();

		$paramList = [
			'register' 			=> array_search($registerId, self::REGISTER_SERVICE_LIST),
			'applicationNumber' => explode(',', $applicationNumberList),
			'cin' 				=> $userObj->getCin(),
			'status' 			=> 'Requested'
		];

		$applicationDutyList = $this->restService->applicationDutyList($paramList);

		if (empty($applicationDutyList)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		$obligationNumberArr = [];
		$totalDutySum = 0;
		$dutyApplicationType = [];

		foreach ($applicationDutyList as $dutyArr) {

			foreach ($dutyArr as $duty) {

				if (in_array($duty->getObligationNumber(), $dutyObligationList) && bccomp(($duty->getObligationAmount() - $duty->getPaidAmount()), 0 , 2) == 1) {
					$obligationNumberArr[] = $duty->getObligationNumber();
					$totalDutySum += number_format(($duty->getObligationAmount() - $duty->getPaidAmount()),2);
					$dutyApplicationType[] = $duty->getApplicationType();
				}
			}
		}

		$balanceTemp = [];
		$registerName = array_search($registerId, self::REGISTER_SERVICE_LIST);
		$balanceTemp = $this->restService->personalAccountBalance(['cin' => $userObj->getCin(), 'register' => $registerName]);

		$balance = 0;
		if (!empty($balanceTemp))
			$balance = !empty($balanceTemp[$registerName]) ? $balanceTemp[$registerName] : 0;

		// проверка за задължение към заявление и за дължима сума положително число, проверка за допустим начин на плащане през лична сметка за заявленията, по които се плащат задълженията
		if (empty($obligationNumberArr) || bccomp($totalDutySum, 0 , 2) != 1 || empty($dutyApplicationType) || !$this->isValidApplicationPaymentType($registerId, 2, 0, $dutyApplicationType)) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
			]);
		}

		// недостатъчна наличност по личната сметка
		else if (bccomp ($balance, $totalDutySum, 2) == -1) {

			return new JsonModel([
				'status' => 'error',
				'errors' 	=> [[1 => $this->translator->translate("EP_PAY_00006_I")]],
				'errorNotEnoughBalance' => 1
			]);
		}

		// плащане на задължение през лична сметка
		else {

			$params = [
				'register' => array_search($registerId, self::REGISTER_SERVICE_LIST),
				'cin' => $userObj->getCin(),
				'obligationNumbers' => $obligationNumberArr
			];

			// плащане на задължение през лична сметка
			if ($this->restService->payDutyFromPersonalAccount($params)) {
				return new JsonModel([
					'status' 		=> 'success',
					'paymentMethod' => 'personalAccount',
					'registerId'	=> $registerId
				]);
			}
		}

		return new JsonModel([
			'status' => 'error',
			'errors' 	=> [[0 => $this->translator->translate("GL_ERROR_L")]]
		]);
	}

	/**
	 * Функционалност "Преглед на заявление".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewApplicationAction() {

		$lang = $this->params()->fromRoute('lang');

		$applicationNumber = $this->params()->fromPost('applicationNumber', null);

		$registerId = (int)$this->params()->fromPost('registerId', 0);

		if (!$this->isValidApplicationNumberList($applicationNumber) || empty($registerId)) {

			return new JsonModel([
				'status' => 'error'
			]);
		}

		$userObj = $this->userService->getUser();

		$params = [
			'cin'				=> $userObj->getCin(),
			'registerId'		=> $registerId,
			'applicationNumber' => $applicationNumber,
			'lang'				=> $lang
		];

		$applicationList = $this->restService->userApplicationList($totalCount, $params);

		$url = !empty($applicationList) ? (!empty($applicationList[0]->getApplicationDisplayUrl()) ? $applicationList[0]->getApplicationDisplayUrl() : '') : '';

		if (empty($url)) {

			return new JsonModel([
				'status' => 'error'
			]);
		}

		return new JsonModel([
			'status' => 'success',
			'urlToRedirect' => $url
		]);
	}


	/**
	 * Функционалност "Преглед на детайлно информация на задължения по заявление".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function previewApplicationDutyListInfoAction() {

		$params = $this->params()->fromRoute();

		$params['registerId'] = (int)$params['registerId'];
		$params['applicationNumber'] = $params['applicationNumber'];
		$params['applicationType'] = (int)$params['applicationType'];

		$applicationTypeList = [];
		$applicationDutyList = [];

		$errors = false;

		if (!$this->isValidApplicationNumberList($params['applicationNumber']))
			$errors = true;

		else {

			$userObj = $this->userService->getUser();

			$paramList = [
				'register' 			=> array_search($params['registerId'], self::REGISTER_SERVICE_LIST),
				'applicationNumber' => $params['applicationNumber'],
				'cin' 				=> $userObj->getCin()
			];

			$applicationTypeList = [];
			$applicationTypeList = $this->pageDM->getApplicationTypeList($this->language()->getId(), ['registerId' => $params['registerId'], 'appType' => $params['applicationType'], 'getPlainResultByType' => 1]);

			$applicationDutyList = [];
			$applicationDutyList = $this->restService->applicationDutyList($paramList);

			if (empty($applicationDutyList))
				$errors = true;
		}

		$this->layout('layout/ajax');

		return new ViewModel([
			'errors' 				=> $errors,
			'applicationTypeList'	=> $applicationTypeList,
			'applicationDutyList'	=> $applicationDutyList,
			'params' 				=> $params
		]);
	}

	/**
	 * Проверява генериран код за плащане на задължение през ПЕП на ДАЕУ.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function chechDutyCodePepdaeuAction() {

		$obligationNumber = (int)$this->params()->fromPost('dutyObligationNumber', 0);
		$registerId = (int)$this->params()->fromPost('registerId', 0);

		if (!empty($obligationNumber) && !empty($registerId)) {

			// ПЕПДАЕУ
			$paymentSystemType = 2;

			// необработено задължение
			$status = 0;

			$paymentMsg = $this->paymentDM->getPaymentMessage(null, $paymentSystemType, $obligationNumber, null, $status);

			$authorizationCode = 0;

			foreach ($paymentMsg as $paymentMsgObj)
				$authorizationCode = $paymentMsgObj->getAuthorizationCode();

			if (!empty($authorizationCode)) {

				return new JsonModel([
					'status' 		=> 'successCode',
					'codePepdaeu' 	=> $authorizationCode
				]);
			}
		}

		return new JsonModel([
			'status' => 'emptyCode'
		]);
	}

}