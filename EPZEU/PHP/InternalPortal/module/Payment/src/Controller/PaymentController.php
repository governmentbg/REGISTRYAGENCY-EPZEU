<?php

namespace Payment\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

/**
 * Контролер реализиращ функционалности за работа с плащания.
 *
 * @package Payment
 * @subpackage Controller
 */
class PaymentController extends AbstractActionController {


	/**
	 * Масив за тип на регистрационните данни.
	 *
	 * @var array
	 */
	const REGISTRY_AGENCY_TYPE = [
		'epay' => 1,
		'pep' => 2
	];


	/**
	 * Обект за поддържане и съхранение на обекти от тип Плащане.
	 *
	 * @var \Payment\Data\PaymentDataManager
	 */
	protected $paymentDM;


	/**
	 * Конструктор.
	 *
	 * @param \Payment\Data\PaymentDataManager $paymentDM Обект за поддържане и съхранение на обекти от тип Плащане.
	 */
	public function __construct($paymentDM) {
		$this->paymentDM = $paymentDM;
	}


	/**
	 *  Функционалност "Регистрационни данни на АВ в ePay".
	 *
	 * @return ViewModel Контейнер с данни за презентационния слой.
	 */
	public function editRegistryAgencyDataAction() {

		$params = $this->params();

		$request = $this->getRequest();

		$registryAgencyType = $this->params()->fromRoute('registryAgencyType', '');

		$registryAgencyTypeId = self::REGISTRY_AGENCY_TYPE[$registryAgencyType];

		if (!empty($registryAgencyTypeId)) {

			$baseObj = $this->paymentDM->getRegistryAgencyData($registryAgencyTypeId);

			$registryAgencyForm = new \Payment\Form\RegistryAgencyForm();

			// ePay
			if ($registryAgencyTypeId == self::REGISTRY_AGENCY_TYPE['epay']) {

				$registryAgencyForm->getInputFilter()->get('email')->setRequired(true);
				$registryAgencyForm->getInputFilter()->remove('urlResponse');
				$registryAgencyForm->getInputFilter()->remove('urlServices');

				$pageTitle 		= 'EP_PAY_00001_L';
				$lblCin 		= 'EP_PAY_AV_KIN_L';
				$lblSecretWord 	= 'EP_PAY_SECRET_WORD_L';
			}

			// ПЕП на ДАЕУ
			else {

				$registryAgencyForm->getInputFilter()->remove('email');
				$registryAgencyForm->getInputFilter()->get('urlResponse')->setRequired(true);
				$registryAgencyForm->getInputFilter()->get('urlServices')->setRequired(true);

				$pageTitle 		= 'EP_PAY_00002_L';
				$lblCin 		= 'EP_PAY_ID_AV_L';
				$lblSecretWord 	= 'EP_PAY_SCR_KEY_L';
			}

			if ($request->isPost()) {

				$registryAgencyForm->setData($request->getPost());

				if ($registryAgencyForm->isValid()) {

					$postData = $registryAgencyForm->getData();

					$postData->setType($registryAgencyTypeId);

					// редактира запис
					if (!empty($baseObj)) {

						if ($this->paymentDM->updateRegistryAgencyData($postData)) {
							$this->flashMessenger()->addSuccessMessage('GL_UPDATE_OK_I');
							return $this->redirect()->toRoute('edit_registry_agency_data_'.$registryAgencyType, ['lang' => $params->fromRoute('lang'), 'registryAgencyType' => $registryAgencyType]);
						}
					}

					// добавя запис
					else {

						if ($this->paymentDM->addRegistryAgencyData($postData)) {
							$this->flashMessenger()->addSuccessMessage('GL_INSERT_OK_I');
							return $this->redirect()->toRoute('edit_registry_agency_data_'.$registryAgencyType, ['lang' => $params->fromRoute('lang'), 'registryAgencyType' => $registryAgencyType]);
						}
					}
				}
			}

			elseif (!empty($baseObj))
				$registryAgencyForm->bind($baseObj);

			return new ViewModel([
				'registryAgencyForm' 	=> $registryAgencyForm,
				'params' 				=> $params,
				'pageTitle' 			=> $pageTitle,
				'lblCin' 				=> $lblCin,
				'lblSecretWord' 		=> $lblSecretWord,
				'registryAgencyType' 	=> $registryAgencyType
			]);
		}

		$response = $this->getResponse();
		$response->getHeaders()->addHeaderLine('Location', $this->getRequest()->getBaseUrl() . '/404');
		$response->setStatusCode(404);
		$response->sendHeaders();
	}
}