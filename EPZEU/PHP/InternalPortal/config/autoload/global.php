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
		'driver_options' => []
	],
	'config' => [
		'cacert' => './data/'.$environment.'.cacert.pem',
		'tmp_folder' => './data/tmp/',
		'news_file_cache' => './data/cache/document/news/',
		'news_image_cache' => './data/cache/images/news/',
		'video_tutorial_file_cache' => './data/cache/media/video-tutorials/',
		'nested_page_file_cache' => './data/cache/document/nested-page/',
		'bulletin_file_cache' => './data/cache/document/bulletin/',
		'statistic_report_file_cache' => './data/cache/document/statistic-report/',
		'public_url_suffix' => '',
		'news_max_img_w'	=> 768,
		'news_max_img_h'	=> 768,
		'rest_service' => [
			'create_email_url'	=> '/EmailNotifications',
			'document_types'	=> '/nomenclatures/DocTypes',
			'log_action' 		=> '/LogActions',
			'label'				=> '/nomenclatures/labels/',
			'staticPage'		=> '/CMS/staticPages',
			'language'			=> '/nomenclatures/Languages',
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
	'access_filter' => [
		'options' => [
			'mode' => 'restrictive'
		]
	],
	'caches' => [
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
];
