<?php
namespace Nomenclature;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'label_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/label-list',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'labelList'
					]
				]
			],
			'label_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/label-list-translate',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'labelListTranslate'
					]
				]
			],
			'language_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/language-list',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'languageList'
					]
				]
			],
			'application_type_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/application-type-list',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'applicationTypeList'
					]
				]
			],
			'service_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/service-list',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'serviceList'
					]
				]
			],
			'add_service' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-service',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'addService'
					],
				]
			],
			'edit_service' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-service/:serviceId',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'editService'
					],
					'constraints' => [
						'serviceId' => '\d+'
					]
				]
			],
			'preview_service' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-service/:serviceId',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'previewService'
					],
					'constraints' => [
						'serviceId' => '\d+'
					]
				]
			],
			'service_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/service-list-translate',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'serviceListTranslate'
					]
				]
			],
			'manage_service_translate' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/manage-service-translate/:serviceId',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'manageServiceTranslate'
								],
					'constraints' => [
						'serviceId' => '\d+'
					]
				]
			],
			'param_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/param-list',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'paramList'
					]
				]
			],
			'change_language_status' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/change-language-status/:languageId',
					'defaults' => [
						'controller' => Controller\NomenclatureController::class,
						'action' => 'languageList',
					],
					'constraints' => [
						'languageId' => '\d+'
					]
				]
			]
		],
	],
	'controllers' => [
		'factories' => [
			Controller\NomenclatureController::class => Factory\NomenclatureControllerFactory::class,
		]
	],
	'controller_plugins' => [
		'factories' => [
			'language' => Factory\LanguagePluginFactory::class
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\NomenclatureDataManager::class => Factory\NomenclatureDataManagerFactory::class,
		],
	],
	'access_filter' => [
		['special' => [
				'EP_PREVIEW_CMS' => [
					'label_list',
					'language_list',
					'service_list',
					'preview_service',
					'service_list_translate',
					'application_type_list'
				],
				'EP_ADM_NOM_PARAMS' => [
					'language_list',
					'label_list',
					'label_edit',
					'service_list',
					'preview_service',
					'add_service',
					'edit_service',
					'manage_service_status',
					'manage_label',
					'manage_language',
					'param_list',
					'manage_param',
					'change_language_status'
				],
				'EP_ADM_CMS' => [
					'service_list_translate',
					'manage_service_translate',
					'label_list_translate',
					'application_type_list',
					'manage_application_type_list'
				],
		]]
	]
];