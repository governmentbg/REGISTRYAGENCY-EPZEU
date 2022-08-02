<?php
return [
	'navigation' => [

		'default' => [

			[
				'label' => 'GL_HOME_L',
				'route' => 'home',
				'ico' => 'nav-icon nav-icon-home',
			],

			// Потребители
			[
				'label' => 'EP_USR_USERS_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-users',
				'pages' => [
					[
						'label' => 'GL_REGISTRATION_L',
						'route' => 'register',
					],
					[
						'label' => 'EP_USR_LIST_REQSPACC_L',
						'route' => 'user_manage_special_access',
						'sub-pages' => ['user_special_access_approval']

					],
					[
						'label' => 'EP_USR_ACCS_L',
						'route' => 'user_search',
						'sub-pages' => ['edit_user']
					],
					[
						'label' => 'EP_ODIT_VIEW_L',
						'route' => 'audit_list',
					],
					[
						'label' => 'EP_USR_QUERY_INTERNAL_PORTAL_USRS_L',
						'route' => 'report_admin_user_list'
					],
					[
						'label' => 'EP_USR_QUERY_SPEC_ACCESS_USRS_L',
						'route' => 'report_public_user_list'
					],
				],
				'sub-routes' => ['edit_user', 'user_special_access_approval']
			],

			// Съобщения
			[
				'label' => 'EP_MSG_L',
				'route' => 'message_list',
				'ico' => 'nav-icon nav-icon-messages',
				'sub-pages' => ['add_message', 'edit_message'],
				'sub-routes' => ['add_message', 'edit_message']
			],

			// Съдържание
			[
				'label' => 'GL_CONTENT_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-documents',
				'pages' => [
					[
						'label' => 'EP_CMS_NEWS_L',
						'route' => 'news_list',
						'sub-pages' => ['add_news', 'edit_news']
					],
					[
						'label' => 'EP_CMS_PAGES_SERVICES_L',
						'route' => 'service_page_list',
						'sub-pages' => ['edit_service_page', 'add_service_page', 'edit_service_page_group', 'add_service_page_group']
					],
					[
						'label' => 'EP_CMS_PAGES_APPLICATIONS_L',
						'route' => 'application_page_list',
						'sub-pages' => ['edit_application_page', 'add_application_page', 'edit_application_page_group', 'add_application_page_group']
					],
					[
						'label' => 'EP_CMS_PAGES_VIDEO_L',
						'route' => 'video_lesson_list',
						'sub-pages' => ['add_video_lesson', 'edit_video_lesson']
					],
					[
						'label' => 'EP_CMS_PAGES_TEMPLATES_L',
						'route' => 'document_template_page_list',
						'sub-pages' => ['edit_document_template_page', 'add_document_template_page', 'edit_document_template_page_group', 'add_document_template_page_group']
					],

					[
						'label' => 'EP_CMS_PAGES_DOCUMENTS_L',
						'route' => 'legislation_page_list',
						'sub-pages' => ['edit_legislation_page', 'add_legislation_page', 'edit_legislation_page_group', 'add_legislation_page_group']
					],
					[
						'label' => 'EP_CMS_PAGE_TYPE_PREDEFINED_HTML_CONTENT_L',
						'route' => 'redefined_page_list',
						'sub-pages' => ['edit_redefined_page']
					],
					[
						'label' => 'EP_CMS_MANAGING_PAGES_HTML_CONTENT_CREATE_L',
						'route' => 'html_page_list',
						'sub-pages' => ['add_html_page', 'edit_html_page']
					],
					[
						'label' => 'EP_TMP_TEMPLATE_L',
						'route' => 'declaration_template_list',
						'sub-pages' => ['edit_declaration_template', 'add_declaration_template']
					],

					[
						'label' => 'EP_CMS_BULLETINS_L',
						'route' => 'bulletin_list',
						'sub-pages' => ['add_bulletin', 'edit_bulletin']
					],

				],
				'sub-routes' => ['edit_redefined_page',
						'edit_html_page',
						'add_html_page',
						'html_page_list',
						'redefined_page_list',
						'edit_declaration_template',
						'add_declaration_template',
						'add_video_lesson',
						'edit_video_lesson',
						'add_news',
						'edit_news',
						'edit_service_page',
						'add_service_page',
						'edit_application_page',
						'add_application_page',
						'edit_document_template_page',
						'add_document_template_page',
						'edit_legislation_page',
						'add_legislation_page',

						'edit_service_page_group',
						'add_service_page_group',
						'edit_application_page_group',
						'add_application_page_group',
						'edit_document_template_page_group',
						'add_document_template_page_group',
						'edit_legislation_page_group',
						'add_legislation_page_group',

						'add_bulletin',
						'edit_bulletin'

				]
			],

			// Статистики

			[
				'label' => 'EP_STATISTICS_TYPE_ADMIN_L',
				'route' => 'statistic_list',
				'ico' => 'nav-icon nav-icon-statistics',
				'sub-pages' => [
					'statistic_list',
					'add_statistic',
					'edit_statistic',
					'statistic_report_list',
					'add_statistic_report',
					'edit_statistic_report',
					'delete_statistic_report',
					'change_statistic_report_status',
					'statistic_report_file_download'
				],
				'sub-routes' => [
					'statistic_list',
					'add_statistic',
					'edit_statistic',
					'statistic_report_list',
					'add_statistic_report',
					'edit_statistic_report',
					'delete_statistic_report',
					'change_statistic_report_status',
					'statistic_report_file_download'
				]
			],

			// Преводи
			[
				'label' => 'EP_TRANSLATION_TRANSLATIONS_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-language',
				'pages' => [
					[
						'label' => "EP_CMS_NEWS_L",
						'route' => "news_list_translate",
						'sub-pages' => ['news_translate']
					],
					[
						'label' => "GL_SERVICES_L",
						'route' => "service_list_translate",
						'sub-pages' => ['manage_service_translate']
					],
					[
						'label' => 'EP_CMS_PAGES_SERVICES_L',
						'route' => 'service_page_translate_list',
					],
					[
						'label' => "GL_APPLICATIONS_L",
						'route' => "application_type_list"
					],
					[
						'label' => 'EP_CMS_PAGES_APPLICATIONS_L',
						'route' => 'application_page_translate_list',
						'sub-pages' => ['edit_application_page', 'add_application_page', 'edit_application_page_group', 'add_application_page_group']
					],
					[
						'label' => "EP_CMS_PAGES_VIDEO_L",
						'route' => "video_lesson_list_translate",
						'sub-pages' => ['video_lesson_translate']
					],
					[
						'label' => 'EP_CMS_PAGES_TEMPLATES_L',
						'route' => 'document_page_translate_list',
						'sub-pages' => ['edit_document_template_page', 'add_document_template_page', 'edit_document_template_page_group', 'add_document_template_page_group']
					],
					[
						'label' => 'EP_CMS_PAGES_DOCUMENTS_L',
						'route' => 'legislation_page_translate_list',
						'sub-pages' => ['edit_legislation_page', 'add_legislation_page', 'edit_legislation_page_group', 'add_legislation_page_group']
					],
					[
						'label' => 'EP_CMS_TRANSLATE_HTML_PAGES_L',
						'route' => 'html_page_list_translate',
						'sub-pages' => ['html_page_translate']
					],
					[
						'label' => 'EP_STATISTICS_TYPE_ADMIN_L',
						'route' => 'statistic_list_translate',
					],
					[
						'label' => 'EP_NOM_LABELS_L',
						'route' => 'label_list_translate',
					],

				],
				'sub-routes' => ['manage_service_translate', 'video_lesson_translate', 'html_page_translate', 'news_translate']
			],

			// Форум
			[
				'label' => 'EP_CMS_FORUM_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-comments',
				'pages' => [
					[
						'label' => 'EP_CMS_FORUM_L',
						'route' => 'comment_list',
					],
					[
						'label' => 'EP_CMS_BAAN_WORDS_L',
						'route' => 'forbidden_word_list',
						'sub-pages' => ['add_forbidden_word', 'edit_forbidden_word']
					]
				],
				'sub-routes' => ['add_forbidden_word', 'edit_forbidden_word']
			],

			// Номенклатури
			[
				'label' => 'EP_GL_NOMENCLATURES_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-list',
				'pages' => [
					[
						'label' => 'GL_SERVICES_L',
						'route' => 'service_list',
						'sub-pages' => ['edit_service', 'add_service']
					],
					[
						'label' => 'EP_NOM_LABELS_L',
						'route' => 'label_list'
					],
					[
						'label' => 'EP_NOM_LANGUAGES_L',
						'route' => 'language_list'
					]
				],
				'sub-routes' => ['service_list', 'edit_service', 'add_service']
			],

			// Лимити
			[
				'label' => 'EP_NOM_LIMITS_L',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-limits',
				'pages' => [
					[
						'label' => 'EP_NOM_SERVICES_LIMITS_L',
						'route' => 'limit_list',
						'sub-pages' => ['edit_limit']
					],
					[
						'label' => 'EP_NOM_USERS_SERVICES_LIMITS_L',
						'route' => 'limit_user_list',
						'sub-pages' => ['add_user_limit', 'edit_user_limit']
					],
				],
				'sub-routes' => ['add_user_limit', 'edit_limit', 'edit_user_limit']
			],

			// Параметри
			[
				'label' => 'GL_PARAMETRS_L',
				'route' => 'param_list',
				'ico' => 'nav-icon nav-icon-configuration'
			],

			// Плащания
			[
				'label' => 'EP_GL_PAYMENTS',
				'route' => '#',
				'ico' => 'nav-icon nav-icon-payment',
				'pages' => [
					[
						'label' => 'EP_PAY_00001_L',
						'route' => 'edit_registry_agency_data_epay'
					],
					[
						'label' => 'EP_PAY_00002_L',
						'route' => 'edit_registry_agency_data_pep'
					]
				]
			],
		],
	]
];
