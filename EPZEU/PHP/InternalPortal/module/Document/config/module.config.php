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
			'upload_video_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/upload-video-file',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'uploadFile'
					]
				]
			],
			'upload_bulletin_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/upload-bulletin-file',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'uploadFile'
					]
				]
			],
			'upload_statistic_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/upload-statistic-file',
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
					'route' => '/load-document/:guid',
					'defaults' => [
						'controller' => Controller\FrontController::class,
						'action' => 'loadDocument'
					]
				]
			],
			'load_tmp_image' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/load-tmp-image/:imageName',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'loadTmpImage'
					]
				]
			],
			'download_tmp_file' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/download-tmp-ile/:fileName',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'loadTmpImage'
					]
				]
			],
			'upload_image' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/upload-image',
					'defaults' => [
						'controller' => Controller\DocumentController::class,
						'action' => 'uploadFile'
					]
				]
			],
		]
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
	'access_filter' => [
		['*' => []],
		['@' => ['upload_file', 'upload_video_file', 'upload_bulletin_file', 'delete_tmp_file', 'load_document', 'load_tmp_image', 'upload_image', 'download_tmp_file', 'upload_statistic_file']],
	],
];