<?php
/**
 * Global Configuration Override
 *
 * You can use this file for overriding configuration values from modules, etc.
 * You would place values in here that are agnostic to the environment and not
 * sensitive to security.
 *
 * @NOTE: In practice, this file will typically be INCLUDED in your source
 * control, so do not include passwords or other sensitive information in this
 * file.
 */


if (!$environment = getenv('ENVIRONMENT'))
	throw new Exception("Config not loaded", 1);

$environment = strtolower($environment);

return [ 
	'db' => [
		'driver'         => 'Pdo',
		'driver_options' => [
			PDO::ATTR_PERSISTENT => true
		],
	],
	'config' => [
		'cacert' => './data/'.$environment.'.cacert.pem',
		'tmp_folder' => './data/tmp/',
		'video_tutorial_file_cache' => './data/cache/media/video-tutorials/',
		'news_image_cache' => './data/cache/images/news/',
		'news_file_cache' => './data/cache/document/news/',
		'bulletin_file_cache' => './data/cache/document/bulletin/',
		'nested_page_file_cache' => './data/cache/document/nested-page/',
		'statistic_report_file_cache' => './data/cache/document/statistic-report/',
		'firstPageListNumber' => 3,
		'cookieTtl' => time()+3600 * 24 * 365 * 5,
		'rest_service' => [
			'create_email_url'					=> '/EmailNotifications',
			'log_action' 						=> '/LogActions',
			'label'								=> '/nomenclatures/labels/',
			'static_page'						=> '/CMS/staticPages',
			'language'							=> '/nomenclatures/Languages',
			'duty_list' 						=> '/ApplicationServices',
			'application_duty_list' 			=> '/Obligations',
			'pay_duty' 							=> '/EPaymentOrders',
			'user_application_list' 			=> '/Applications',
			'user_application_draft_list' 		=> '/Applications/Drafts',
			'payment_order_list' 				=> '/Reports',
			'payment_order_transaction_list' 	=> '/Transactions',
			'personal_account_balance' 			=> '/PersonalAccounts',
			'bank_account_list' 				=> '/BankAccounts',
			'pay_duty_from_personal_account' 	=> '/Transactions/PaymentFromPersonalAccountToObligation',
			'papdaeu_create_payment'			=> '/api/v1/eService/paymentJson',
			'papdaeu_access_code'				=> '/api/v1/eService/accessCode',
			'test_signature'					=> '/BTrustProcessor/createBissTestSignRequest',
			'subscription_list'					=> '/Notifications/Subscriptions',
			'complete_test_biss_sign_process'	=> '/BTrustProcessor/CompleteTestBissSignProcess',
			'user_migration_profile_list'		=> '/UsersMigrations/MigrationProcesses',
			'user_migration_get_profile'		=> '/UsersMigrations/Account',
			'user_migration_add'				=> '/UsersMigrations/StartMigrationProcess',
		],
		'allowedApplicationsPRAppTypes' => [
			44,45,46,62,81,74,43,77,73,76,75
		],
		'http_client' => [
			'adapter' => 'socket',
			'curl' => [
				'adapter'      => 'Zend\Http\Client\Adapter\Curl',
				'curloptions' => [
					CURLOPT_CAINFO => './data/'.$environment.'.cacert.pem'
				],
			],
			'socket' => [
				'adapter'			=> 'Zend\Http\Client\Adapter\Socket',
				'sslcafile'			=> './data/'.$environment.'.cacert.pem',
				'ssltransport'		=> 'tls',
				'sslverifypeer'		=> true,
				'sslverifypeername'	=> true,
			],
		]
	],
	'caches' => [
		'FilesystemCache' => [
			'adapter' => [
				'name'    => Filesystem::class,
				'options' => [
					// Store cached data in this directory.
					'cache_dir' => './data/cache',
					// Store cached data for 1 day.
					'ttl' => 60*60*1*24
				],
			],
			'plugins' => [
				[
					'name' => 'serializer',
					'options' => [],
				],
				'exception_handler' => [
					'throw_exceptions' => true
				]
			],
		],
		'WinCache' => [
			'adapter' => [
				'name'    => WinCache::class,
				'options' => [
					// Default time to live - unlimited
					'ttl' => 0
				],
			],
			'plugins' => [
				'exception_handler' => [
					'throw_exceptions' => true
				]
			],
		],
	],
	'service_manager' => [
		'factories' => [
			'admin' => Zend\Navigation\Service\DefaultNavigationFactory::class,
		],
		'invokables' => [
			'Zend\Authentication\AuthenticationService' => Zend\Authentication\AuthenticationService::class
		],
		'abstract_factories' => [
			\Zend\Db\Adapter\AdapterAbstractServiceFactory::class,
		],
	],
	'controller_plugins' => [
		'invokables' => [
			'translate' => \Zend\I18n\View\Helper\Translate::class
		]
	],
	'view_helpers' => [
		'invokables' => [
			'form_element_errors'	=> Application\View\Helper\FormElementErrors::class,
			'formelementerrors'		=> Application\View\Helper\FormElementErrors::class,
			'formElementerrors'		=> Application\View\Helper\FormElementErrors::class,
			'FormElementErrors'		=> Application\View\Helper\FormElementErrors::class,

			'dateformat'			=> Application\View\Helper\DateFormat::class,
			'date_format'			=> Application\View\Helper\DateFormat::class,
			'dateFormat'			=> Application\View\Helper\DateFormat::class,
			'DateFormat'			=> Application\View\Helper\DateFormat::class,
		]
	],
	'translator' => [
		'translation_file_patterns' => [
			[
				'type'     => 'phparray',
				'base_dir' => getcwd() .  '/data/language',
				'pattern'  => '%s.php',
			],
		],
	],
	'session_config' => [
		//'remember_me_seconds' => 2419200,
		'use_cookies' => false,
		//'cookie_httponly' => true,
	],
];
