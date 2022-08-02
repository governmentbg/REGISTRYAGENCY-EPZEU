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
	 * Функционалност "Начална страница".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function indexAction() {
    	return new ViewModel([]);
    }


    /**
     * Функционалност "Забранен достъп".
     *
     * @return ViewModel Контейнер с данни за презентационния слой.
     */
    public function accessDeniedAction() {

    	$request = $this->getRequest();

    	$isAjaxRequest = false;

    	if ($request->isXmlHttpRequest()) {
    		$isAjaxRequest = true;
    		$this->layout('layout/layout-no-header');
    	}

    	return new ViewModel([
    		'isAjaxRequest' => $isAjaxRequest
    	]);
    }
}
