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
	 * Конструктор.
	 *
	 * @param \Content\Data\BulletinDataManager $bulletinDM Обект за поддържане и съхранение на обекти от тип Бюлетин.
	 */
	public function __construct($bulletinDM) {
		$this->bulletinDM = $bulletinDM;
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
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount,
			'status' 	=> 1
		];

		$bulletinList = $this->bulletinDM->getBulletinList($totalCount, $params);

		return new ViewModel([
			'bulletinList' 	=> $bulletinList,
			'totalCount' 	=> $totalCount,
			'totalPages' 	=> ceil($totalCount/$rowCount)
		]);
	}


	/**
	 * Извлича списък с бюлетини при странициране.
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function getBulletinList() {

		$config = $this->getConfig();

		$page = (int)$this->params()->fromPost('page', 1);
		$rowCount = $config['GL_ITEMS_PER_PAGE'];

		$params = [
			'cp' 		=> $page,
			'rowCount' 	=> $rowCount,
			'status' 	=> 1
		];

		$bulletinList = $this->bulletinDM->getBulletinList($totalCount, $params);

		$this->layout('layout/ajax');

		$result = new ViewModel(array(
			'bulletinList' 	=> $bulletinList,
		));

		$result->setTemplate('content/bulletin/bulletin-list-partial.phtml');

		return $result;
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

		if ($baseObj = $this->bulletinDM->getBulletinList($totalCount, $params)->current()) {

			if ($bulletinContent = $this->bulletinDM->getBulletinFileById($bulletinId))
				return \Document\Service\DocumentService::getFileFromDatabase($baseObj, $bulletinContent, $bulletinId);
		}

		$response = $this->getResponse();
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}