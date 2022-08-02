<?php
namespace Content;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'video_lesson_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/video-lesson-list',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'videoLessonList'
					]
				]
			],
			'add_video_lesson' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-video-lesson',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'addVideoLesson'
					],
				]
			],
			'edit_video_lesson' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-video-lesson/:lessonId',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'editVideoLesson'
					],
					'constraints' => [
						'lessonId' => '\d+'
					]
				]
			],
			'manage_video_status' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/manage-video-status/:lessonId',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'manageVideoStatus',
					],
					'constraints' => [
						'lessonId' =>  '\d+'
					]
				],
			],
			'video_lesson_file_download' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/video-lesson-file-download/:lessonId[/:translatedFile]',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'videoLessonFileDownload'
					],
					'constraints' => [
						'lessonId' => '\d+',
						'translatedFile' => '\d+'
					]
				],
			],
			'video_lesson_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/video-lesson-list-translate',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'videoLessonListTranslate'
					]
				]
			],
			'video_lesson_translate' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/video-lesson-translate/:lessonId',
					'defaults' => [
						'controller' => Controller\VideoLessonController::class,
						'action' => 'videoLessonTranslate'
					],
					'constraints' => [
						'lessonId' => '\d+'
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
					]
				]
			],
			'add_news' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-news',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'addNews',
						'type'	=> 'addNews'
					]
				]
			],
			'edit_news' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-news/:newsId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'editNews',
						'type'	=> 'editNews'
					],
					'constraints' => [
						'newsId' => '\d+'
					]
				]
			],

			'load_image' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '/load-image/:newsId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'loadNewsImage',
					],
					'constraints' => [
						'newsId' => '\d+'
					]
				]
			],

			'change_news_status' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/change-news-status/:newsId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'changeNewsStatus',
					],
					'constraints' => [
						'newsId' => '\d+'
					]
				]
			],

			'load_news_document' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '/load-news-document/:fileId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'loadNewsDocument',
					],
					'constraints' => [
						'fileId' => '\d+'
					]
				]
			],

			'news_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
						'route' => '[/:lang]/news-list-translate',
						'defaults' => [
							'controller' => Controller\NewsController::class,
							'action' => 'newsListTranslate'
					]
				]
			],
			'news_translate' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/news-translate/:newsId',
					'defaults' => [
						'controller' => Controller\NewsController::class,
						'action' => 'newsTranslate'
					],
					'constraints' => [
							'newsId' => '\d+'
						]
					]
			],

			'nested_page_file_download' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '/nested-page-file-download/:fileId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'loadNestedPageDocument',
					],
				]
			],


			'html_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/html-page-list',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'pageList',
						'type'	=> \Content\Controller\PageController::HTML_PAGE
					],
				]
			],

			'html_page_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/html-page-list-translate',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'pageListTranslate',
						'type'	=> \Content\Controller\PageController::HTML_PAGE
					],
				]
			],

			'redefined_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/redefined-page-list',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'pageList',
						'type'	=> \Content\Controller\PageController::REDEFINED_PAGE
					],
				]
			],

			'add_html_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-html-page',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'addHtmlPage',
					],
				]
			],

			'edit_html_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-html-page/:pageId',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'editHtmlPage',
					],
					'constraints' => [
						'pageId' => '\d+'
					]
				]
			],

			'edit_redefined_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-redefined-page/:pageId',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'editHtmlPage',
					],
					'constraints' => [
						'pageId' => '\d+'
					]
				]
			],

			'change_page_status' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/change-page-status/:pageId',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'changePageStatus',
					],
					'constraints' => [
						'pageId' => '\d+'
					]
				]
			],

			'ck_page_link' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '/ck-page-link',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'ckPageLink',
					],
				]
			],

			'service_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/service-page-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_SERVICE_TYPE
					],
				]
			],

			'service_page_translate_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/service-page-translate-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_SERVICE_TYPE,
						'translate' => true
					],
				]
			],

			'application_page_translate_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/application-page-translate-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_APPLICATION_TYPE,
						'translate' => true
					],
				]
			],

			'document_page_translate_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/document-page-translate-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES,
						'translate' => true
					],
				]
			],

			'legislation_page_translate_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/legislation-page-translate-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE,
						'translate' => true
					],
				]
			],


			'application_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/application-page-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_APPLICATION_TYPE
					],
				]
			],

			'document_template_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/document-template-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES
					],
				]
			],

			'legislation_page_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/legislation-page-list',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'nestedList',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE
					],
				]
			],



			'add_service_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-service-page-group/:registerId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_SERVICE_TYPE
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+'
					]
				]
			],

			'edit_service_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-service-page-group/:registerId/:groupId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_SERVICE_TYPE
					],
					'constraints' => [
						'registerId' => '\d+',
						'groupId' => '\d+'
					]
				]
			],


			'add_application_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-application-page-group/:registerId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_APPLICATION_TYPE
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+'
					]
				]
			],

			'edit_application_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-application-page-group/:registerId/:groupId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_APPLICATION_TYPE
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+',
						'groupId' => '\d+'
					]
				]
			],


			'add_document_template_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-document-template-page-group/:registerId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+'
					]
				]
			],

			'edit_document_template_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-document-template-page-group/:registerId/:groupId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+',
						'groupId' => '\d+'
					]
				]
			],

			'add_legislation_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-legislation-page-group/:registerId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+'
					]
				]
			],

			'edit_legislation_page_group' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-legislation-page-group/:registerId/:groupId',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'managePageGroup',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE
					],
					'constraints' => [
						'type' => '\d+',
						'registerId' => '\d+',
						'groupId' => '\d+'
					]
				]
			],

			'delete_nested_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-nested-page/:registerId/:pageId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'deleteNestedPage',
					],
					'constraints' => [
						'pageId' => '\d+'
					]
				]
			],

			'add_service_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-service-page/:registerId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageServicePage',
						'type' => \Content\Controller\NestedPageController::PAGE_SERVICE_TYPE
					],
					'constraints' => [
						'registerId'	=> '\d+',
						'groupId' 		=> '\d+',
					]
				]
			],

			'add_application_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-application-page/:registerId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageApplicationPage',
						'type' => \Content\Controller\NestedPageController::PAGE_APPLICATION_TYPE
					],
					'constraints' => [
						'registerId'	=> '\d+',
						'groupId' 		=> '\d+',
					]
				]
			],


			'add_document_template_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-document-template-page/:registerId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageDocumentTemplatePage',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES
					],
					'constraints' => [
						'registerId'	=> '\d+',
						'groupId' 		=> '\d+',
					]
				]
			],

			'edit_document_template_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-document-template-page/:registerId/:pageId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageDocumentTemplatePage',
						'type' => \Content\Controller\NestedPageController::PAGE_DOCUMENT_TEMPLATES
					],
					'constraints' => [
						'registerId' 	=> '\d+',
						'pageId' 		=> '\d+',
						'groupId'		=> '\d+',
					]
				]
			],


			'add_legislation_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-legislation-page/:registerId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageLegislationPage',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE
					],
					'constraints' => [
						'registerId'	=> '\d+',
						'groupId' 		=> '\d+',
					]
				]
			],

			'edit_legislation_page' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-legislation-page/:registerId/:pageId[/:groupId]',
					'defaults' => [
						'controller' => Controller\NestedPageController::class,
						'action' => 'manageLegislationPage',
						'type' => \Content\Controller\NestedPageController::PAGE_LEGISLATION_TYPE
					],
					'constraints' => [
						'registerId' 	=> '\d+',
						'pageId' 		=> '\d+',
						'groupId'		=> '\d+',
					]
				]
			],

			'html_page_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/html-page-translate/:pageId',
					'defaults' => [
						'controller' => Controller\PageController::class,
						'action' => 'pageTranslate',
					],
					'constraints' => [
						'pageId' 		=> '\d+'
					]
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
			'add_bulletin' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-bulletin',
					'defaults' => [
						'controller' => Controller\BulletinController::class,
						'action' => 'addBulletin'
					],
				]
			],
			'edit_bulletin' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-bulletin/:bulletinId',
					'defaults' => [
						'controller' => Controller\BulletinController::class,
						'action' => 'editBulletin'
					],
					'constraints' => [
						'bulletinId' => '\d+'
					]
				]
			],
			'change_bulletin_status' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/change-bulletin-status/:bulletinId',
					'defaults' => [
						'controller' => Controller\BulletinController::class,
						'action' => 'changeBulletinStatus',
					],
					'constraints' => [
						'bulletinId' => '\d+'
					]
				]
			],
			'bulletin_file_download' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/bulletin-file-download/:bulletinId',
					'defaults' => [
						'controller' => Controller\BulletinController::class,
						'action' => 'bulletinFileDownload'
					],
					'constraints' => [
						'bulletinId' => '\d+'
					]
				],
			]

		],
	],
	'controllers' => [
		'factories' => [
			Controller\VideoLessonController::class => Factory\VideoLessonControllerFactory::class,
			Controller\NewsController::class => Factory\NewsControllerFactory::class,
			Controller\PageController::class => Factory\PageControllerFactory::class,
			Controller\NestedPageController::class => Factory\NestedPageControllerFactory::class,
			Controller\BulletinController::class => Factory\BulletinControllerFactory::class
		]
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
			Data\BulletinDataManager::class => Factory\BulletinDataManagerFactory::class
		]
	],
	'access_filter' => [
		['@' => [
				'video_lesson_file_download',
				'load_image',
				'load_news_document',
				'ck_page_link',
				'nested_page_file_download',
				'bulletin_file_download',
			]
		],

		['special' => [
			'EP_ADM_CMS' => [
					'add_video_lesson',
					'edit_video_lesson',
					'manage_video_status',
					'add_html_page',
					'change_page_status',
					'edit_html_page',
					'edit_redefined_page',
					'add_page_group',
					'delete_nested_page',
					'add_service_page',
					'edit_service_page',

					'add_application_page',
					'edit_application_page',
					'add_document_template_page',
					'edit_document_template_page',
					'add_legislation_page',
					'edit_legislation_page',
					'add_service_page_group',
					'edit_service_page_group',
					'add_application_page_group',
					'edit_application_page_group',
					'add_document_template_page_group',
					'edit_document_template_page_group',
					'add_legislation_page_group',
					'edit_legislation_page_group',
					'add_bulletin',
					'edit_bulletin',
					'change_bulletin_status',
					'video_lesson_list',
					'application_page_list',
					'document_template_page_list',
					'legislation_page_list',
					'html_page_list',
					'redefined_page_list',
					'bulletin_list',
					'service_page_list',

					// Преводи
					'html_page_list_translate',
					'html_page_translate',
					'service_page_translate_list',
					'application_page_translate_list',
					'document_page_translate_list',
					'legislation_page_translate_list',
					'video_lesson_list_translate',
					'video_lesson_translate',
					'news_list_translate',
					'news_translate',

					// Преглед на непубликувано съдържание
					'preview_html_page',
					'preview_video_lesson',
					'preview_nested_page',

					'manage_nested_page'

			],

			'EP_ADM_NEWS' => [
					'edit_news',
					'add_news',
					'change_news_status',
					'news_list',
				],

			'EP_PREVIEW_CMS' => [
					'news_list',
					'video_lesson_list',
					'service_page_list',
					'application_page_list',
					'document_template_page_list',
					'legislation_page_list',
					'html_page_list',
					'redefined_page_list',
					'bulletin_list',
					'preview_news',
					'preview_html_page',
					'preview_video_lesson',
					'preview_nested_page',

					// Преводи
					'html_page_list_translate',
					'service_page_translate_list',
					'application_page_translate_list',
					'document_page_translate_list',
					'legislation_page_translate_list',
					'video_lesson_list_translate',
					'news_list_translate',

					// Преглед на непубликувано съдържание
					'preview_html_page',
					'preview_video_lesson',
					'preview_nested_page',
					'preview_news'
			]
		]]
	]
];