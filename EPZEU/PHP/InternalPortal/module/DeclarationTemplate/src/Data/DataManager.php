<?php

namespace DeclarationTemplate\Data;

use Zend\Hydrator\HydratorInterface;
use Zend\Db\Adapter\AdapterInterface;
use Zend\Db\Adapter\Driver\ResultInterface;
use Zend\Db\ResultSet\HydratingResultSet;
use DeclarationTemplate\Entity\DeclarationTemplateEntity;
use Zend\Db\Adapter\ParameterContainer;
use DeclarationTemplate\Entity\ActiveFieldEntity;
use Application\Service\AppService;

/**
 * Клас за поддържане и съхранение на обекти от тип Шаблони за декларации.
 *
 * @package DeclarationTemplate
 * @subpackage Data
 */
class DataManager {

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
	 * Услуга за работа с кеш.
	 *
	 * @var $cache
	 */
	protected $cache;

	/**
	 * Конструктор.
	 *
	 * @param AdapterInterface $dbAdapter Адаптер за връзка към база данни.
	 * @param HydratorInterface $hydrator Хидратор за преобразуване на обекти в масиви и обратно.
	 * @param $cache Услуга за работа с кеш.
	 */
	public function __construct(AdapterInterface $dbAdapter, HydratorInterface $hydrator, $cache) {

		$this->dbAdapter = $dbAdapter;

		$this->hydrator = $hydrator;

		$this->cache = $cache;
	}

	/**
	 * Извлича списък с шаблони за декларации, филтрирани по определени критерии.
	 *
	 * @param int &$totalCount Общ брой на намерените резултати.
	 * @param array $params Масив с критерии за филтриране.
	 * @param array $docTypeList Масив с видове документи.
	 * @return array Масив с шаблони за декларации.
	 */
	public function getDeclarationTemplateList(&$totalCount, $params, $docTypeList) {

		try {

			if ($docTemplateArr = $this->cache->getItem('declarationTemplateList')) {

				$startIndex = ($params['cp']-1)*$params['rowCount'];

				$result = array_slice($docTemplateArr, $startIndex, $params['rowCount']);

				$totalCount = count($docTemplateArr);

				return $result;
			}

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_document_templates_search(:id_list, :document_id_list, :start_index, :row_count, :total_count);");

			$startIndex = 1;
			$totalCount = isset($params['totalCount']) ? true : true;

			$container = new ParameterContainer();
			$container->offsetSet('id_list', null);
			$container->offsetSet('document_id_list', null);
			$container->offsetSet('start_index', $startIndex);
			$container->offsetSet('row_count', \Application\Module::APP_MAX_INT);
			$container->offsetSet('total_count', $totalCount);
			$stmt->setParameterContainer($container);

			$cursors = $stmt->execute()->current();
			$totalCount = (int)$cursors['p_count'];
			$refCursor 	= $cursors['p_ref_doc_templates'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			$connection->commit();

			if (!count($result))
				return [];

			foreach ($result as $row)
				$docTemplateArr[$row['document_type_id']] = ['name' => $docTypeList[$row['document_type_id']]] + $row;

			usort($docTemplateArr, function($a, $b) {
				return $a['name'] <=> $b['name'];
			});

			$docTemplateList = [];

			foreach ($docTemplateArr as $arr)
				$docTemplateList[] = $this->hydrator->hydrate($arr, new DeclarationTemplateEntity());

			$this->cache->setItem('declarationTemplateList', $docTemplateList);

			$startIndex = ($params['cp']-1)*$params['rowCount'];

			$result = array_slice($docTemplateList, $startIndex, $params['rowCount']);

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
	 * Извлича данни за шаблон за декларация по уникален идентификатор.
	 *
	 * @param int $templateId Идентификатор на шаблон за декларация.
	 * @return DeclarationTemplateEntity Шаблон за декларация.
	 */
	public function getDeclarationTemplateById($templateId) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->query("SELECT * FROM nom.f_d_document_templates_search(:id_list, null, null, null, false);");
			$cursors = $stmt->execute(['{'.$templateId.'}'])->current();

			$refCursor 	= $cursors['p_ref_doc_templates'];

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute()->current();

			if (is_array($result))	{

				$obj = new DeclarationTemplateEntity();

				$this->hydrator->hydrate($result, $obj);

				$stmt = $this->dbAdapter->query("SELECT * FROM nom.f_d_document_templates_content_read(:id_template);");
				$content = $stmt->execute(['id_template' => $templateId])->current();

				if (isset($content['p_content']))
					$obj->setContent($content['p_content']);

				$connection->commit();

				return $obj;
			}

			$connection->commit();

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
	 * Извлича списък с активни полета.
	 *
	 * @return array Масив с активни полета.
	 */
	public function getActiveFields() {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();

			$connection->beginTransaction();
			$stmt = $this->dbAdapter->query("SELECT * FROM nom.f_s_document_template_fields_search(null, null, null, false);");

			$cursors = $stmt->execute()->current();

			$totalCount = (int)$cursors['p_count'];
			$refCursor 	= $cursors['p_ref_template_fields'];

			$stmt->getResource()->closeCursor();

			$stmt = $this->dbAdapter->query('FETCH ALL IN "'. $refCursor .'";');
			$result = $stmt->execute();

			$connection->commit();

			if ($result instanceof ResultInterface && $result->isQueryResult()) {
				$resultSet = new HydratingResultSet($this->hydrator, new ActiveFieldEntity());
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
	 * Добавя шаблон за декларация.
	 *
	 * @param DeclarationTemplateEntity $dataObj Шаблон за декларация.
	 * @return bool Резултат от операцията.
	 */
	public function addDeclarationTemplate($dataObj) {

		try {

			$connection = $this->dbAdapter->getDriver()->getConnection();
			$connection->beginTransaction();

			$stmt = $this->dbAdapter->createStatement("SELECT * FROM nom.f_d_document_templates_create(:declaration_id, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('declaration_id', $dataObj->getDocumentTypeId(), $container::TYPE_INTEGER);
			$container->offsetSet('content', $dataObj->getContent(), $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$stmt->execute();

			$this->cache->removeItem('declarationTemplateList');

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
	 * Обновява данни за шаблон за декларация.
	 *
	 * @param DeclarationTemplateEntity $dataObj Шаблон за декларация.
	 * @param string $content Съдържание на шаблон за декларация.
	 * @return bool Резултат от операцията.
	 */
	public function updateDeclarationTemplateById($dataObj, $content) {

		try {

			$stmt = $this->dbAdapter->createStatement("SELECT nom.f_d_document_templates_update(:template_id, :document_id, :content);");

			$container = new ParameterContainer();
			$container->offsetSet('template_id', $dataObj->getDocTemplateId(), $container::TYPE_INTEGER);
			$container->offsetSet('document_id', $dataObj->getDocumentTypeId(), $container::TYPE_INTEGER);
			$container->offsetSet('content', $content, $container::TYPE_STRING);

			$stmt->setParameterContainer($container);

			$stmt->execute();

			return true;
		}
		catch (\Exception $e) {

			AppService::handleDbError($e);

			return false;
		}
	}

	/**
	 * Изтрива шаблон за декларация по уникален идентификатор.
	 *
	 * @param int $templateId Идентификатор на шаблон за декларация.
	 * @return bool Резултат от операцията.
	 */
	public function deleteDeclarationTemplateById($templateId) {

		try {
			$stmt = $this->dbAdapter->createStatement("SELECT nom.f_d_document_templates_delete(:template_id);");
			$container = new ParameterContainer();
			$container->offsetSet('template_id', $templateId, $container::TYPE_INTEGER);
			$stmt->setParameterContainer($container);
			$stmt->execute();

			$this->cache->removeItem('declarationTemplateList');

			return true;
		}
		catch (\Exception $e) {
			AppService::handleDbError($e);
			return false;
		}
	}

}