<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;


/**
 * Контролер реализиращ базови функционалности за работата на приложението.
 *
 * @package Application
 * @subpackage Controller
 */
class IndexController extends AbstractActionController {


	/**
	 * Обект за поддържане и съхранение на обекти от тип Страница.
	 *
	 * @var \Content\Data\PageDataManager
	 */
	protected $pageDM;


	/**
	 * Обект за поддържане и съхранение на обекти от тип Новина.
	 *
	 * @var \Content\Data\NewsDataManager
	 */
	protected $newsDM;


	/**
	 * Услуга за работа с кеш.
	 *
	 * @var \Application\Service\CacheService
	 */
	protected $cacheService;


	/**
	 * Конструктор.
	 *
	 * @param \Content\Data\PageDataManager $pageDM Обект за поддържане и съхранение на обекти от тип Страница.
	 * @param \Content\Data\NewsDataManager $newsDM Обект за поддържане и съхранение на обекти от тип Новина.
	 * @param \Application\Service\CacheService $cacheService Услуга за работа с кеш.
	 */
	public function __construct($pageDM, $newsDM, $cacheService) {
		$this->pageDM = $pageDM;
		$this->newsDM = $newsDM;
		$this->cacheService = $cacheService;
	}


	/**
	 * Функционалност "Начална страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function indexAction() {

		if (isset($_COOKIE['RP']) && $decoded = base64_decode($_COOKIE['RP'])) {

			setcookie('RP', '', time() - 3600, '/');
			unset($_COOKIE['RP']);

			if ($redirectParams = json_decode($decoded, true)) {
				return $this->redirect()->toRoute($redirectParams['routeName'], $redirectParams['params'], ['query' => $redirectParams['query']]);
			}
		}

		$langId = $this->language()->getId();

		if (!$bankAccountsList = $this->cacheService->getResultsetFromCache('bankAccountsList-'.$langId)) {

			$params = [
				'idList' 		=> [\Content\Controller\PageController::REDEFINED_PAGE_LIST['bank-account-cr'], \Content\Controller\PageController::REDEFINED_PAGE_LIST['bank-account-pr']],
				'loadContent' 	=> true,
				'total_count' 	=> false,
			];

			$resultset = $this->pageDM->getPageList($totalCount, $langId, $params, \Content\Controller\PageController::REDEFINED_PAGE);

			$bankAccountsList = [];

			foreach ($resultset as $result)
				$bankAccountsList[] = $result;

			$this->cacheService->addResultsetToCache('bankAccountsList-'.$langId, $bankAccountsList);
		}

		$bankAccountCr = null;
		$bankAccountPr = null;

		foreach ($bankAccountsList as $pageObj)
			$pageObj->getPageId() == \Content\Controller\PageController::REDEFINED_PAGE_LIST['bank-account-cr'] ? $bankAccountCr = $pageObj : $bankAccountPr = $pageObj;


		// Новини
		if (!$newsList = $this->cacheService->getResultsetFromCache('newsListFirstPage-'.$langId)) {

			$config = $this->getConfig();

			$paramsNews = [
					'loadDescription'		=> false,
					'loadShortDescription' 	=> 1,
					'loadSeparateValueI18n'	=> 0,
					'isActive' 				=> 1,
					'status' 				=> 1,
					'rowCount'				=> $config['EP_CMS_NEWS_COUNT_FOR_HOME'],
					'cp'					=> 1,
					'totalCount'			=> false
			];

			$resultset = $this->newsDM->getNewsList($totalCount, $langId, $paramsNews);

			$newsList = [];

			foreach ($resultset as $result)
				$newsList[] = $result;

			$this->cacheService->addResultsetToCache('newsListFirstPage-'.$langId, $newsList);
		}


		if (!$hotNewsList = $this->cacheService->getResultsetFromCache('hotNewsListFirstPage-'.$langId)) {

			// Горещи новини
			$paramsNews = [
					'loadDescription'		=> false,
					'loadShortDescription' 	=> 1,
					'loadSeparateValueI18n'	=> 0,
					'isActive' 				=> 1,
					'status' 				=> 1,
					'isHotNews'				=> 1,
					'totalCount'			=> false
			];

			$resultset = $this->newsDM->getNewsList($totalCount, $langId, $paramsNews);

			$hotNewsList = [];

			foreach ($resultset as $result)
				$hotNewsList[] = $result;

			$this->cacheService->addResultsetToCache('hotNewsListFirstPage-'.$langId, $hotNewsList);
		}

		$registerList = array_flip($this->cacheService->getRegisterList());

		$viewModel =  new ViewModel([
			'bankAccountCr'		=> $bankAccountCr,
			'bankAccountPr'		=> $bankAccountPr,
			'registerList' 		=> $registerList,
			'newsList'			=> $newsList,
			'hotNewsList'		=> $hotNewsList
		]);

		$viewModel->setTemplate('Application/Index/index.phtml');

		return $viewModel;
    }

    /**
     * Функционалност "Забранен достъп".
     *
     * @return ViewModel Контейнер с данни за презентационния слой.
     */
    public function accessDeniedAction() {

    	$request = $this->getRequest();

    	if ($request->isXmlHttpRequest()) {
    		$this->layout('layout/layout-no-header');
    		echo "<script>window.location.reload()</script>";
    		exit;
    	}

    	return new ViewModel([]);
    }

    /**
     * Функционалност "Изтекла потребителската сесия при неактивност на потребител".
     *
     * @return ViewModel Контейнер с данни за презентационния слой.
     */
    public function timeoutAction() {

    }

    /**
     * Функционалност "Достигнат лимит в системата".
     */
    public function rateLimitReachedAction() {

    }

 	public function paramsNotFoundAction() {

 		$config = $this->getConfig();

 		if (isset($config['GL_COMMON_COOKIE_DOMAIN'])) {
	 		$response = $this->getResponse();
	 		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/');
	 		$response->setStatusCode('302');
	 		$response->sendHeaders();
	 		return;
 		}

 		$response = $this->getResponse();
 		$response->setStatusCode(503);
 		$response->sendHeaders();
 		return new ViewModel([]);
 	}
}