<?php

namespace Nomenclature\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\ParameterContainer;
use Zend\Db\ResultSet\HydratingResultSet;
use Application\Service\AppService;
use Nomenclature\Entity\LabelEntity;
use Nomenclature\Entity\LanguageEntity;
use Nomenclature\Entity\ApplicationTypeEntity;
use Nomenclature\Entity\ServiceEntity;
use Nomenclature\Entity\ParamEntity;

/**
 * Клас за поддържане и съхранение на обекти от тип Номенклатури.
 *
 * @package Nomenclature
 * @subpackage Data
 */
class NomenclatureDataManager {

	/**
	 * Адаптер за връзка към база данни.
	 *
	 * @var AdapterInterface
	 */
	protected $dbAdapter;

	/**
	 * Хидратор за преобразуване на обекти в масиви и обратно.
	 *
	 * @var HydratorInterface
	 */
	protected $hydrator;

	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;
	}

	/**
	 * Извлича списък с етикети, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с етикети.
	 */
	public function getLabelList(&$totalCount, $langId, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_labels_search(
					:id_list, :id_lang, :code, :value, :load_description, :load_separate_value_i18n, :get_untranslated,:start_index, :row_count, :total_count);");


			$idList = !empty($params['id']) ? '{'.$params['id'].'}' : null;
			$code = !empty($params['code']) ? $params['code'] : null;
			$value = !empty($params['value']) ? $params['value'] : null;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$maxNor = !empty($params['maxNor']) ? $params['maxNor'] : null;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', $idList);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('code', $code);
			$container->offsetSet('value', $value);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_labels'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new LabelEntity());
				return $resultSet->initialize($result);
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Извлича списък с езици, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с езици.
	 */
	public function getLanguageList(&$totalCount, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_languages_search(
					:id_lang, :code, :name, :is_active, :start_index, :row_count, :total_count);");

			$langId = !empty($params['langId']) ? $params['langId'] : null;
			$code = !empty($params['code']) ? $params['code'] : null;
			$name = !empty($params['name']) ? $params['name'] : null;
			$isActive = !empty($params['isActive']) ? $params['isActive'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : \Application\Module::APP_MAX_INT;
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_lang', $langId, $container::TYPE_INTEGER);
			$container->offsetSet('code', $code);
			$container->offsetSet('name', $name);
			$container->offsetSet('is_active', $isActive);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_languages'];
			$totalCount = $cursors['p_count'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new LanguageEntity());
				return $resultSet->initialize($result);
			}

			return [];
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Обновява данни за етикет.
	 *
	 * @param LabelEntity $labelObj Eтикет.
	 * @return bool Резултат от операцията.
	 */
	public function updateLabelById($labelObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_labels_update(:id_label, :code, :value, :description);");

			$labelValue = trim($labelObj->getValue());

			$container = new ParameterContainer();
			$container->offsetSet('id_label', $labelObj->getLabelId(), $container::TYPE_INTEGER);
			$container->offsetSet('code', $labelObj->getCode(), $container::TYPE_STRING);
			$container->offsetSet('value', $labelValue, $container::TYPE_STRING);
			$container->offsetSet('description', $labelObj->getDescription(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Добавя превод на етикет.
	 *
	 * @param LabelEntity $labelObj Етикет.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addLabelI18n($labelObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_labels_i18n_create(:id_label, :id_language, :value);");

			$labelValue = trim($labelObj->getValueI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id_label', $labelObj->getLabelId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('value', $labelValue, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Обновява данни за превод на етикет
	 *
	 * @param LabelEntity $labelObj Етикет.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateLabelI18n($labelObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_labels_i18n_update(:id_label, :id_language, :value);");

			$labelValue = trim($labelObj->getValueI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id_label', $labelObj->getLabelId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('value', $labelValue, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Обновява данни за език.
	 *
	 * @param LanguageEntity $languageObj Език.
	 * @return bool Резултат от операцията.
	 */
	public function updateLanguageById(LanguageEntity $languageObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_languages_update(:id_language, :code, :name, :is_active);");

			$container = new ParameterContainer();

			$container->offsetSet('id_language', $languageObj->getLanguageId(), $container::TYPE_INTEGER);
			$container->offsetSet('code',$languageObj->getCode(), $container::TYPE_INTEGER);
			$container->offsetSet('name', $languageObj->getName(), $container::TYPE_STRING);
			$container->offsetSet('is_active', $languageObj->getIsActive(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Извлича списък със заявления, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив със заявления.
	 */
	public function getApplicationTypeList(&$totalCount, $langId, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_s_application_types_search(
					:id, :id_lang, :app_type, :name, :load_separate_value_i18n, :start_index, :row_count, :total_count, :id_register);");

			$id = !empty($params['id']) ? '{'.$params['id'].'}' : null;
			$appType = !empty($params['app_type']) ? $params['app_type'] : null;
			$name = !empty($params['name']) ? $params['name'] : null;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;
			$registerId = !empty($params['registerId']) ? $params['registerId'] : null;


			$container = new ParameterContainer();
			$container->offsetSet('id', $id);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('app_type', $appType);
			$container->offsetSet('name', $name);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);
			$container->offsetSet('id_register', $registerId);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_application_types'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				if (!empty($params['getPlainResult'])) {

					$applicationTypeList = [];
					foreach ($result as $k => $v) {

						if (!empty($params['getByRegister'])) {

							if (!empty($params['getDropDownResult'])) {

								if (!empty($v['url']))
									$applicationTypeList[$v['register_id']][$v['id']] = (!empty($v['app_code']) ? $v['app_code'].' ' : '').$v['name'];
							}
							else
								$applicationTypeList[$v['register_id']][$v['id']] = (!empty($v['app_code']) ? $v['app_code'].' ' : '').$v['name'];
						}

						else {

							if (!empty($params['getDropDownResult'])) {

								if (!empty($v['url']))
									$applicationTypeList[$v['id']] = (!empty($v['app_code']) ? $v['app_code'].' ' : '').$v['name'];
							}
							else
								$applicationTypeList[$v['id']] = (!empty($v['app_code']) ? $v['app_code'].' ' : '').$v['name'];
						}
					}

					return $applicationTypeList;
				}

				else {
					$resultSet = new HydratingResultSet($this->hydrator, new ApplicationTypeEntity());
					return $resultSet->initialize($result);
				}
			}

			return [];
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Добавя превод на тип заявление.
	 *
	 * @param ApplicationTypeEntity $appTypeObj Заявление.
	 * @param int $langId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addApplicationTypelI18n($appTypeObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_s_application_types_i18n_create(:id, :id_language, :name);");

			$nameI18n = trim($appTypeObj->getNameI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id', $appTypeObj->getId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name', $nameI18n, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Обновява данни на тип заявление.
	 *
	 * @param ApplicationTypeEntity $appTypeObj Заявление.
	 * @param int $langId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateApplicationTypelI18n($appTypeObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_s_application_types_i18n_update(:id, :id_language, :name);");

			$nameI18n = trim($appTypeObj->getNameI18n());

			$container = new ParameterContainer();
			$container->offsetSet('id', $appTypeObj->getId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name', $nameI18n, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Извлича списък с услуги, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @return array Масив с услуги.
	 */
	public function getServiceList(&$totalCount, $langId, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_search(
					:id_service_list, :id_register_list, :status, :name, :id_app_type_list, :id_lang, :load_description, :load_short_description, :load_separate_value_i18n, :get_untranslated, :start_index, :row_count, :total_count);");

			$idServiceList = !empty($params['serviceId']) ? '{'.implode(',', array_map('intval', $params['serviceId'])).'}' : null;
			$idRegisterList = !empty($params['registerId']) ? '{'.implode(',', array_map('intval', $params['registerId'])).'}' : null;
			$status = !empty($params['status']) ? '{'.implode(',', array_map('intval', $params['status'])).'}' : (isset($params['status']) && $params['status'] != '' ? '{0}' : null);
			$name = !empty($params['name']) ? $params['name'] : null;
			$idAppTypeList = !empty($params['appTypeId']) ? '{'.implode(',', array_map('intval', $params['appTypeId'])).'}' : null;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadShortDescription = !empty($params['loadShortDescription']) ? $params['loadShortDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_service_list', $idServiceList);
			$container->offsetSet('id_register_list', $idRegisterList);
			$container->offsetSet('status', $status);
			$container->offsetSet('name', $name);
			$container->offsetSet('id_app_type_list', $idAppTypeList);
			$container->offsetSet('id_lang', $langId);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_short_description', $loadShortDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_services'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				if (!empty($params['getPlainResult'])) {

					$serviceAppTypeList = [];
					foreach ($result as $k => $v)
						$serviceAppTypeList[$v['app_type_id']] = $v['app_type_id'];

					return $serviceAppTypeList;
				}

				else {
					$resultSet = new HydratingResultSet($this->hydrator, new ServiceEntity());
					return $resultSet->initialize($result);
				}
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}


	/**
	 * Извлича услуга по уникален идентификатор.
	 *
	 * @param int $langId Идентификатор на услуга.
	 * @param array $params Масив с критерии за филтриране.
	 * @return ServiceEntity Услуга
	 */
	public function getServiceById($serviceId, $params = []) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_search(
					:id_service_list, :id_register_list, :status, :name, :id_app_type_list, :id_lang, :load_description, :load_short_description, :load_separate_value_i18n, :get_untranslated, :start_index, :row_count, :total_count);");

			$startIndex = 1;
			$loadDescription = !empty($params['loadDescription']) ? $params['loadDescription'] : false;
			$loadShortDescription = !empty($params['loadShortDescription']) ? $params['loadShortDescription'] : false;
			$loadSeparateValueI18n = !empty($params['loadSeparateValueI18n']) ? $params['loadSeparateValueI18n'] : false;
			$getUntranslated = !empty($params['withoutTranslation']) ? $params['withoutTranslation'] : false;
			$lang = !empty($params['languageId']) ? $params['languageId'] : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_service_list', '{'.$serviceId.'}', $container::TYPE_INTEGER);
			$container->offsetSet('id_register_list', null);
			$container->offsetSet('status', null);
			$container->offsetSet('name', null);
			$container->offsetSet('id_app_type_list', null);
			$container->offsetSet('id_lang', $lang);
			$container->offsetSet('load_description', $loadDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_short_description', $loadShortDescription, $container::TYPE_INTEGER);
			$container->offsetSet('load_separate_value_i18n', $loadSeparateValueI18n);
			$container->offsetSet('get_untranslated', $getUntranslated);
			$container->offsetSet('start_index', 1, $container::TYPE_INTEGER);
			$container->offsetSet('row_count', null);
			$container->offsetSet('total_count', false);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$refCursor 	= $cursors['p_ref_services'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute()->current();

			$connection->commit();

			if (is_array($result))	{

				$obj = new ServiceEntity();
				$this->hydrator->hydrate($result, $obj);
				return $obj;
			}

			return false;

		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Добавя услуга.
	 *
	 * @param ServiceEntity $dataObj Услуга.
	 * @return bool Резултат от операцията.
	 */
	public function addService(ServiceEntity $dataObj) {

		try {
			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Добавя услуга
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_create(
					:register_id, :iisda_service_id, :app_type_id, :service_type_ids, :payment_type_ids, :status_date, :status, :name, :description, :short_description, :is_adm, :pending_status_date, :pending_status);");

			$serviceTypeIds = !empty($dataObj->getServiceTypeIds()) ? '{'.implode(',', array_map('intval', $dataObj->getServiceTypeIds())).'}' : null;
			$paymentTypeIds = !empty($dataObj->getPaymentTypeIds()) ? '{'.implode(',', array_map('intval', $dataObj->getPaymentTypeIds())).'}' : null;
			$statusDate = !empty($dataObj->getStatusDate()) ? \Application\Service\AppService::getSqlDate($dataObj->getStatusDate()) : null;
			$statusTime = !empty($dataObj->getStatusTime()) ? $dataObj->getStatusTime() : null;
			$statusDateTime = !empty($statusDate) && !empty($statusTime) ? $statusDate.' '.$statusTime.':00:00' : null;
			$pendingStatusDate = !empty($dataObj->getPendingStatusDate()) ? $statusDateTime : null;

			if (!empty($dataObj->getIsAdm())) {
				$isAdm = $dataObj->getIsAdm();
				$name = null;
				$description = null;
				$shortDescription = null;
			}

			else {
				$isAdm = false;
				$name = !empty($dataObj->getName()) ? $dataObj->getName() : null;
				$description = !empty($dataObj->getDescription()) ? $dataObj->getDescription() : null;
				$shortDescription = !empty($dataObj->getShortDescription()) ? $dataObj->getShortDescription() : null;
			}

			$container = new ParameterContainer();
			$container->offsetSet('register_id', $dataObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('iisda_service_id', $dataObj->getIisdaServiceId(), $container::TYPE_INTEGER);
			$container->offsetSet('app_type_id', $dataObj->getAppTypeId(), $container::TYPE_INTEGER);
			$container->offsetSet('service_type_ids', $serviceTypeIds);
			$container->offsetSet('payment_type_ids', $paymentTypeIds);
			$container->offsetSet('status_date', $statusDateTime);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);
			$container->offsetSet('name', $name, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('short_description', $shortDescription, $container::TYPE_STRING);
			$container->offsetSet('is_adm', $isAdm);
			$container->offsetSet('pending_status_date', $pendingStatusDate);
			$container->offsetSet('pending_status', $dataObj->getPendingStatus(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute()->current();

			$serviceId = $result['p_service_id'];

			$connection->commit();

			return $serviceId;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Обновява данни за услуга.
	 *
	 * @param int $id Идентификатор на услуга.
	 * @param ServiceEntity $postData Услуга.
	 * @return bool Резултат от операцията.
	 */
	public function updateServiceById($id, ServiceEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Обновява данни за услуга
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_update(
					:service_id, :register_id, :iisda_service_id, :app_type_id, :service_type_ids, :payment_type_ids, :status_date, :status, :name, :description, :short_description, :is_adm, :pending_status_date, :pending_status);");

			$serviceTypeIds = !empty($dataObj->getServiceTypeIds()) ? '{'.implode(',', array_map('intval', $dataObj->getServiceTypeIds())).'}' : null;
			$paymentTypeIds = !empty($dataObj->getPaymentTypeIds()) ? '{'.implode(',', array_map('intval', $dataObj->getPaymentTypeIds())).'}' : null;
			$statusDate = !empty($dataObj->getStatusDate()) ? \Application\Service\AppService::getSqlDate($dataObj->getStatusDate()) : null;
			$statusTime = !empty($dataObj->getStatusTime()) ? $dataObj->getStatusTime() : null;
			$statusDateTime = !empty($statusDate) && !empty($statusTime) ? $statusDate.' '.$statusTime.':00:00' : null;
			$pendingStatusDate = !empty($dataObj->getPendingStatusDate()) ? $statusDateTime : null;

			if (!empty($dataObj->getIsAdm())) {
				$isAdm = $dataObj->getIsAdm();
				$name = null;
				$description = null;
				$shortDescription = null;
			}

			else {
				$isAdm = false;
				$name = !empty($dataObj->getName()) ? $dataObj->getName() : null;
				$description = !empty($dataObj->getDescription()) ? $dataObj->getDescription() : null;
				$shortDescription = !empty($dataObj->getShortDescription()) ? $dataObj->getShortDescription() : null;
			}

			$container = new ParameterContainer();

			$container->offsetSet('service_id', $id, $container::TYPE_INTEGER);
			$container->offsetSet('register_id', $dataObj->getRegisterId(), $container::TYPE_INTEGER);
			$container->offsetSet('iisda_service_id', $dataObj->getIisdaServiceId(), $container::TYPE_INTEGER);
			$container->offsetSet('app_type_id', $dataObj->getAppTypeId(), $container::TYPE_INTEGER);
			$container->offsetSet('service_type_ids', $serviceTypeIds);
			$container->offsetSet('payment_type_ids', $paymentTypeIds);
			$container->offsetSet('status_date', $statusDateTime);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);
			$container->offsetSet('name', $name, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('short_description', $shortDescription, $container::TYPE_STRING);
			$container->offsetSet('is_adm', $isAdm);
			$container->offsetSet('pending_status_date', $pendingStatusDate);
			$container->offsetSet('pending_status', $dataObj->getPendingStatus(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Обновява статус на услуга.
	 *
	 * @param int $id Идентификатор на услуга.
	 * @param ServiceEntity $postData Услуга.
	 * @return bool Резултат от операцията.
	 */
	public function updateServiceStatusById($id, ServiceEntity $dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			// Обновява статус на услуга
			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_status_update(
					:service_id, :status_date, :status, :pending_status_date, :pending_status);");

			$statusDateArr = !empty($dataObj->getStatusDate()) ? explode(' ', $dataObj->getStatusDate()) : null;
			$statusDate = !empty($statusDateArr[0]) ? \Application\Service\AppService::getSqlDate($statusDateArr[0]) : null;
			$statusTime = !empty($statusDateArr[1]) ? $statusDateArr[1] : null;
			$statusDateTime = !empty($statusDate) && !empty($statusTime) ? $statusDate.' '.$statusTime : null;

			$pendingStatusDateArr = !empty($dataObj->getPendingStatusDate()) ? explode(' ', $dataObj->getPendingStatusDate()) : null;
			$pendingStatusDate = !empty($pendingStatusDateArr[0]) ? \Application\Service\AppService::getSqlDate($pendingStatusDateArr[0]) : null;
			$pendingStatusTime = !empty($pendingStatusDateArr[1]) ? $pendingStatusDateArr[1] : null;
			$pendingStatusDateTime = !empty($pendingStatusDate) && !empty($pendingStatusTime) ? $pendingStatusDate.' '.$pendingStatusTime : null;

			$container = new ParameterContainer();

			$container->offsetSet('service_id', $id, $container::TYPE_INTEGER);
			$container->offsetSet('status_date', $statusDateTime);
			$container->offsetSet('status', $dataObj->getStatus(), $container::TYPE_INTEGER);
			$container->offsetSet('pending_status_date', $pendingStatusDateTime);
			$container->offsetSet('pending_status', $dataObj->getPendingStatus(), $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}


	/**
	 * Извлича списък с услуги от ИИСДА.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param int $langId Идентификатор на език.
	 * @param array $params Масив с критерии за филтриране.
	 * @param array Масив с услуги от ИИСДА.
	 */
	public function getIisdaServiceList(&$totalCount, $langId, $params=[]) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_iisda_services_search(
					:language_id, :start_index, :row_count, :total_count);");

			$rowCount = \Application\Module::APP_MAX_INT;
			$startIndex = 1;
			$totalCount = false;

			$container = new ParameterContainer();
			$container->offsetSet('language_id', $langId);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];

			$refCursor = $cursors['p_ref_services'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			$iisdaServiceArr = [];

			if ($result->isQueryResult()) {

				foreach ($result as $service) {

					if (!empty($params['excludeDiscontinued']) && $service['is_discontinued'])
						continue;

					$obj = new ServiceEntity();
					$this->hydrator->hydrate($service, $obj);

					$iisdaServiceArr[$service['iisda_service_id']] = $obj;

					if (!empty($params['getCurrent']))
						break;
				}

				return $iisdaServiceArr;
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}


	/**
	 * Добавя превод на услуга.
	 *
	 * @param ServiceEntity $serviceObj Услуга.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function addServiceI18n($serviceObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_i18n_create(:id_service, :id_language, :name, :description, :short_description);");

			$name = !empty($serviceObj->getNameI18n()) ? trim($serviceObj->getNameI18n()) : '';
			$description = !empty($serviceObj->getDescriptionI18n()) ? trim($serviceObj->getDescriptionI18n()) : '';
			$shortDescription = !empty($serviceObj->getShortDescriptionI18n()) ? trim($serviceObj->getShortDescriptionI18n()) : '';

			$container = new ParameterContainer();
			$container->offsetSet('id_service', $serviceObj->getServiceId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name', $name, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('short_description', $shortDescription, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Обновява данни за превод на услуга.
	 *
	 * @param ServiceEntity $serviceObj Услуга.
	 * @param int $languageId Идентификатор на език.
	 * @return bool Резултат от операцията.
	 */
	public function updateServiceI18n($serviceObj, $languageId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_service_i18n_update(:id_service, :id_language, :name, :description, :short_description);");

			$name = !empty($serviceObj->getNameI18n()) ? trim($serviceObj->getNameI18n()) : '';
			$description = !empty($serviceObj->getDescriptionI18n()) ? trim($serviceObj->getDescriptionI18n()) : '';
			$shortDescription = !empty($serviceObj->getShortDescriptionI18n()) ? trim($serviceObj->getShortDescriptionI18n()) : '';

			$container = new ParameterContainer();
			$container->offsetSet('id_service', $serviceObj->getServiceId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_language',$languageId, $container::TYPE_INTEGER);
			$container->offsetSet('name', $name, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('short_description', $shortDescription, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Взима списък с модули ИС.
	 *
	 * @return array Масив с модули ИС.
	 */
	public function getModuleList() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_n_s_module_search(null);");
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_modules'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			return $result;

		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

	/**
	 * Извлича списък с параметри, филтрирани по определени критерии
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param array Масив с параметри.
	 */
	public function getParamList(&$totalCount, $params) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_app_parameters_search(
					:id_param_list, :id_functionality, :id_module, :code, :description, :is_system, :start_index, :row_count, :total_count);");

			$idParamList = !empty($params['paramId']) ? '{'.implode(',', array_map('intval', $params['paramId'])).'}' : null;
			$idFunctionality = !empty($params['functionalityId']) ? $params['functionalityId'] : null;
			$idModule = !empty($params['moduleId']) ? $params['moduleId'] : null;
			$code = !empty($params['code']) ? $params['code'] : null;
			$description = !empty($params['description']) ? $params['description'] : null;
			$isSystem = isset($params['isSystem']) ? (!empty($params['isSystem']) ? $params['isSystem'] : ($params['isSystem'] == '' ? null : 0)) : 0;
			$rowCount = !empty($params['rowCount']) ? $params['rowCount'] : null;
			$startIndex = \Application\Service\AppService::createStartIndex($params);
			$totalCount = !empty($params['totalCount']) ? $params['totalCount'] : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_param_list', $idParamList);
			$container->offsetSet('id_functionality', $idFunctionality, $container::TYPE_INTEGER);
			$container->offsetSet('id_module', $idModule, $container::TYPE_INTEGER);
			$container->offsetSet('code', $code, $container::TYPE_STRING);
			$container->offsetSet('description', $description, $container::TYPE_STRING);
			$container->offsetSet('is_system', $isSystem, $container::TYPE_INTEGER);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', $rowCount);
			$container->offsetSet('total_count', $totalCount);

			$stmt->setParameterContainer($container);
			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor = $cursors['p_ref_params'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ParamEntity());
				return $resultSet->initialize($result);
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}


	/**
	 * Обновява данни за параметър.
	 *
	 * @param ParamEntity Параметър.
	 * @return bool Резултат от операцията.
	 */
	public function updateParamById($paramObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_app_parameters_update(
				:id_param, :id_functionality, :code, :description, :param_type, :value_datetime, :value_interval, :value_string, :value_int, :value_hour);");

			$valueDatetime = !empty($paramObj->getValueDatetime()) ? $paramObj->getValueDatetime() : null;
			$valueInterval = !empty($paramObj->getValueInterval()) ? $paramObj->getValueInterval() : null;
			$valueString = !empty($paramObj->getValueString()) ? $paramObj->getValueString() : (is_null($paramObj->getValueString()) ? null : "");
			$valueInt = !empty($paramObj->getValueInt()) ? $paramObj->getValueInt() : (is_null($paramObj->getValueInt()) ? null : 0);
			$valueHour = !empty($paramObj->getValueHour()) ? $paramObj->getValueHour() : null;

			$container = new ParameterContainer();
			$container->offsetSet('id_param', $paramObj->getAppParamId(), $container::TYPE_INTEGER);
			$container->offsetSet('id_functionality', $paramObj->getFunctionalityId(), $container::TYPE_INTEGER);
			$container->offsetSet('code', $paramObj->getCode(), $container::TYPE_STRING);
			$container->offsetSet('description', $paramObj->getDescription(), $container::TYPE_STRING);
			$container->offsetSet('param_type', $paramObj->getParamType(), $container::TYPE_INTEGER);
			$container->offsetSet('value_datetime', $valueDatetime, $container::TYPE_STRING);
			$container->offsetSet('value_interval', $valueInterval, $container::TYPE_STRING);
			$container->offsetSet('value_string', $valueString, $container::TYPE_STRING);
			$container->offsetSet('value_int', $valueInt, $container::TYPE_INTEGER);
			$container->offsetSet('value_hour', $valueHour, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);
			$result = $stmt->execute();

			$connection->commit();

			return true;
		}
		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Взима списък с функционалности
	 *
	 * @return array Масив с функционалности.
	 */
	public function getFunctionalityList() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM public.f_n_s_functionalities_search(:id_functionality_list, :id_module);");

			$container = new ParameterContainer();

			$idFunctionalityList = !empty($params['functionalityId']) ? '{'.implode(',', array_map('intval', $params['functionalityId'])).'}' : null;
			$idModule = !empty($params['moduleId']) ? $params['moduleId'] : null;

			$container->offsetSet('id_functionality_list', $idFunctionalityList);
			$container->offsetSet('id_module', $idModule, $container::TYPE_INTEGER);

			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['p_ref_functionalities'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			if ($result->isQueryResult()) {

				$functionalityList = [];

				foreach ($result as $k => $v)
					$functionalityList[$v['functionality_id']] = $v['name'];

				return $functionalityList;
			}

			return [];
		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}


	/**
	 * Взима списък с видове услуги.
	 *
	 * @return array Масив с модули ИС.
	 */
	public function getServiceTypeList() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_s_service_types_search(null);");
			$cursors = $stmt->execute()->current();

			$refCursor = $cursors['ref_service_types'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');

			$result = $stmt->execute();

			$connection->commit();

			return $result;

		}

		catch (\Exception $e) {

			if ($connection instanceof \Zend\Db\Adapter\Driver\ConnectionInterface && $connection->isConnected())
				$connection->rollback();

			AppService::handleDbError($e);

			return [];
		}
	}

}