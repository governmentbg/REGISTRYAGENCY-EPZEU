<?php
namespace Document;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'upload_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/upload',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'uploadFile'
					]
				]
			],

			'delete_tmp_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-tmp-fileAction',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'deleteTmpFile'
					]
				]
			],

			'load_document' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/load-document/:guid',
					'defaults' => [
						'controller' => Controller\FrontController::class,
						'action' => 'loadDocument'
					]
				]
			]
		]
	],
	'access_filter' => [
		['*' => ['load_document', 'upload_file', 'delete_tmp_file']],
		['@' => []],
	],
	'controllers' => [
		'factories' => [
			Controller\DocumentController::class => Factory\DocumentControllerFactory::class
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Service\DocumentService::class => Factory\DocumentServiceFactory::class,
			Data\DocumentDataManager::class => Factory\DocumentDataManagerFactory::class,
		]
	],
];