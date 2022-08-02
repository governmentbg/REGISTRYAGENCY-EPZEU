<?php
namespace Statistic;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'statistic_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/statistic-list',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'statisticList'
					]
				]
			],
			'statistic_list_translate' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/statistic-list-translate',
					'defaults' => [
						'controller'	=> Controller\StatisticController::class,
						'action' 		=> 'statisticList',
						'translate'		=> true
					]
				]
			],
			'add_statistic' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-statistic',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'addStatistic'
					]
				]
			],
			'edit_statistic' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-statistic/:statisticId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'editStatistic'
					],
					'constraints' => [
						'statisticId' => '\d+'
					]
				]
			],

			'statistic_report_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/statistic-report-list/:statisticId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'statisticReportList'
					],
					'constraints' => [
						'statisticId' => '\d+'
					]
				]
			],

			'add_statistic_report' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/add-statistic-report/:statisticId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'addStatisticReport'
					],
					'constraints' => [
						'statisticId' => '\d+'
					]
				]
			],

			'edit_statistic_report' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-statistic-report/:statisticReportId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'editStatisticReport'
					],
					'constraints' => [
						'statisticReportId' => '\d+'
					]
				]
			],

			'delete_statistic_report' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-statistic-report/:statisticReportId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'deleteStatisticReport'
					],
					'constraints' => [
						'statisticReportId' => '\d+'
					]
				]
			],

			'change_statistic_report_status' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/change-statistic-report-status/:statisticReportId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'changeStatisticReportStatus'
					],
					'constraints' => [
						'statisticReportId' => '\d+'
					]
				]
			],

			'statistic_report_file_download' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/statistic-report-file-download/:statisticReportId',
					'defaults' => [
						'controller' => Controller\StatisticController::class,
						'action' => 'statisticReportFileDownload'
					],
					'constraints' => [
						'statisticReportId' => '\d+'
					]
				],
			],

			'report_admin_user_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/report-admin-user-list[/:isExport]',
					'defaults' => [
						'controller' => Controller\ReportController::class,
						'action' => 'reportUserList'
					],
					'constraints' => [
						'isExport' => '\d+'
					]
				]
			],
			'report_public_user_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/report-public-user-list[/:isExport]',
					'defaults' => [
						'controller' => Controller\ReportController::class,
						'action' => 'reportUserList'
					],
					'constraints' => [
						'isExport' => '\d+'
					]
				]
			],
		]
	],
	'controllers' => [
		'factories' => [
			Controller\StatisticController::class => Factory\StatisticControllerFactory::class,
			Controller\ReportController::class => Factory\ReportControllerFactory::class
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\StatisticDataManager::class => Factory\StatisticDataManagerFactory::class,
			Data\ReportDataManager::class => Factory\ReportDataManagerFactory::class,
		]
	],
	'access_filter' => [
		['special' => [
			'EP_ADM_STATISTICS' => [
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

			'EP_ADM_CMS' => [
				'statistic_list_translate',
				'statistic_translate_action'
			],
			'EP_PREVIEW_CMS' => [
				'statistic_list_translate',
			],

			'EP_ADM_USERS' => [
				'report_admin_user_list',
				'report_public_user_list'
			],
		]]
	]
];