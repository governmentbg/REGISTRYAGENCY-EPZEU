<?php
namespace Content;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'video_lesson_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/video-lesson-list-:registerType',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'videoLessonList',
						'registerType' => 'CR'
					],
					'constraints' => [
						'registerType' => '(pr|cr)'
					]
				]
			],
			'video_lesson' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-video-lesson/:lessonId',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'previewVideoLesson'
					],
					'constraints' => [
						'lessonId' => '\d{1,9}+'
					]
				]
			],
			'load_video_lesson' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/load-video-lesson/:lessonId[-:timestamp]/:fileName',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'loadVideoLessonFile',
					],
					'constraints' => [
						'lessonId' => '\d{1,9}+'
					]
				]
			],
			'news_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/news-list',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'newsList'
					],
				]
			],
			'preview_news' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-news/:newsId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'previewNews'
					],
					'constraints' => [
						'newsId' => '\d{1,9}+'
					]
				]
			],
			'load_image' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/load-image/:newsId[-:timestamp][/:imageName]',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'loadNewsImage',
					],
					'constraints' => [
						'newsId' => '\d{1,9}+',
					]
				]
			],
			'load_news_document' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/load-news-document/:fileId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'loadNewsDocument',
					],
					'constraints' => [
						//'fileId' => '\d{1,9}+'
					]
				]
			],
			'redefined_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/:url',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'redefinedPage',
					],
					'constraints' => [
						'url' => '(bank-accounts|contacts|terms-of-use|cookies|links|accessibility-policy|security-policy|privacy-policy)'
					]
				]
			],

			'dynamic_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/page/:pageId',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'dynamicPage',
					],
					'constraints' => [
						'pageId' => '\d{1,9}+'
					]
				]
			],
			'bank_accounts' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/bank-accounts',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'bankAccounts',
					],
				]
			],

			'property_register' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/property-register',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'propertyRegister',
						'registerType'	=> 'PR'
					],
				]
			],
			'commercial_register' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/commercial-register',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'commercialRegister',
						'registerType'	=>	'CR'
					],
				]
			],

			'bulletin_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/bulletin-list',
					'defaults' => [
						'controller' => Controller\BulletinController::class,
						'action' => 'bulletinList'
					]
				]
			],
			'bulletin_file_download' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/bulletin-file-download/:bulletinId[-:timestamp]',
					'defaults' => [
							'controller' => Controller\BulletinController::class,
							'action' => 'bulletinFileDownload'
						],
					'constraints' => [
						'bulletinId' => '\d{1,9}+'
					]
				],
			],

			'site_map' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/site-map',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'siteMap',
					],
				]
			],
			'integration_container' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/integration-container',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'integrationContainer',
					],
				]
			],

			'legislation' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/legislation-:registerType',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'nestedPage',
						'pageTypeId'	=> 	Controller\PageController::PAGE_LEGISLATION_TYPE
					],
					'constraints' => [
						'registerType' => '(pr|cr)'
					]
				]
			],

			'document_template' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/document-template-:registerType',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'nestedPage',
						'pageTypeId'	=> 	Controller\PageController::PAGE_DOCUMENT_TEMPLATES
					],
					'constraints' => [
						'registerType' => '(pr|cr)'
					]
				]
			],
			'nested_page_file_download' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/nested-page-file-download/:fileId[-:timestamp]',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'loadNestedPageDocument',
					],
					'constraints' => [
						'fileId' => '\d{1,9}+'
					]
				]
			],
			'search' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/search',
					'defaults' => [
						'controller'	=>	Controller\PageController::class,
						'action'		=>	'searchList'
					]
				]
			],
			'statistic' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/statistic-:registerType',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'statisticList',
					],
					'constraints' => [
						'registerType' => '(pr|cr)'
					]
				]
			],

			'load_report_document' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/load-report-document/:statisticReportId[-:timestamp]',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'loadReportDocument',
					],
					'constraints' => [
						'statisticReportId' => '\d{1,9}+'
					]
				]
			],

			'test_signature' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/test-signature',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'testSignature',
					],
				]
			],
		],
	],
	'controllers' => [
		'factories' => [
			Controller\VideoLessonController::class => Factory\VideoLessonControllerFactory::class,
			Controller\NewsController::class => Factory\NewsControllerFactory::class,
			Controller\PageController::class => Factory\PageControllerFactory::class,
			Controller\BulletinController::class => Factory\BulletinControllerFactory::class,
			Controller\StatisticController::class => Factory\StatisticControllerFactory::class,
		]
	],
	'view_helpers' => [
		'factories' => [
			'searchFormHelper' => Factory\SearchFormHelperFactory::class
		],
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\VideoLessonDataManager::class => Factory\VideoLessonDataManagerFactory::class,
			Data\NewsDataManager::class => Factory\NewsDataManagerFactory::class,
			Data\PageDataManager::class => Factory\PageDataManagerFactory::class,
			Data\BulletinDataManager::class => Factory\BulletinDataManagerFactory::class,
			Data\StatisticDataManager::class => Factory\StatisticDataManagerFactory::class,
		],
	],
	'access_filter' => [
		['*' => [
				'video_lesson_list',
				'video_lesson',
				'load_video_lesson',
				'news_list',
				'preview_news',
				'load_image',
				'load_news_document',
				'redefined_page',
				'dynamic_page',
				'bank_accounts',
				'property_register',
				'commercial_register',
				'site_map',
				'bulletin_list',
				'bulletin_file_download',
				'integration_container',
				'legislation',
				'document_template',
				'nested_page_file_download',
				'search',
				//'bank_account',
				'statistic',
				'load_report_document',
				'test_signature'
			]
		],
		['special' => [
				'EP_PREVIEW_CMS' => [
					'preview_news',
					'preview_html_page',
					'preview_video_lesson',
					'load_image',
					'load_news_document',
					'load_video_lesson',
					'nested_page_file_download',
					'bulletin_file_download',
					'load_report_document',
					'preview_statistic',
				],

				'EP_ADM_CMS' => [
					'preview_html_page',
					'preview_video_lesson',
					'preview_statistic',
				],
				'EP_ADM_NEWS' => ['preview_news'],
			]
		]
	]
];