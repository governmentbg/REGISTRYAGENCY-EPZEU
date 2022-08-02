<?php
namespace Application;

use Zend\Router\Http\Segment;
use Zend\ServiceManager\Factory\InvokableFactory;

return [
    'router' => [
        'routes' => [
            'home' => [
                'type' => Segment::class,
                'options' => [
                    'route'    => '[/:lang]/',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'index',
                    ],
                	'constraints' => [
                		'lang' => '[a-z]*'
                	]
                ],
            ],
            'application' => [
                'type'    => Segment::class,
                'options' => [
                    'route'    => '[/:lang]/application[/:action]',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action'     => 'index',
                    ],
                ],
            ],
        	'access_denied' => [
				'type'    => Segment::class,
        		'options' => [
        			'route'    => '[/:lang]/access-denied',
        			'defaults' => [
        				'controller' => Controller\IndexController::class,
        				'action'     => 'accessDenied',
        			],
        		],
        	],
        	'rate_limit_reached' => [
        		'type'    => Segment::class,
        		'options' => [
        			'route'    => '[/:lang]/rate-limit-reached',
        			'defaults' => [
        				'controller' => Controller\IndexController::class,
        				'action'     => 'rateLimitReached',
        			],
        		],
        	],

        	'error' => [
        		'type'    => Segment::class,
        		'options' => [
        			'route'    => '[/:lang]/error',
        			'defaults' => [
        				'controller' => Controller\IndexController::class,
        				'action'     => 'paramsNotFound',
        			],
        		],
        	],

        ],
    ],
    'controllers' => [
        'factories' => [
            Controller\IndexController::class => Factory\IndexControllerFactory::class,
        	Controller\WebServiceController::class => Factory\WebServiceControllerFactory::class
		]
	],
	'service_manager' => [
		'factories' => [
			Service\AppService::class => Factory\AppServiceFactory::class,
			Data\ApplicationDataManager::class => Factory\ApplicationDataManagerFactory::class,
			Service\RestService::class => Factory\RestServiceFactory::class,
			Service\CacheService::class => Factory\CacheServiceFactory::class,
			Service\OidcService::class => Factory\OidcServiceFactory::class,
			Service\RateLimitService::class => Factory\RateLimitServiceFactory::class
		],
	],
	'controller_plugins' => [
		'factories' => [
			'getConfig' => 'Application\Factory\ConfigPluginFactory',
			'language' => 'Application\Factory\LanguagePluginFactory',
			Controller\Plugin\FlashMessenger::class => Factory\FlashMessengerFactory::class,
		],
		'aliases' => [
			'flashmessenger' => Controller\Plugin\FlashMessenger::class,
			'flashMessenger' => Controller\Plugin\FlashMessenger::class,
			'FlashMessenger' => Controller\Plugin\FlashMessenger::class,
		],
	],
	'view_helpers' => [
		'factories' => [
			'language' => Factory\LanguageViewHelperFactory::class,
			'menu' => Factory\MenuViewHelperFactory::class,
			'getTitleI18n' => Factory\GetPageTitleViewHelperFactory::class,
			'pageNotFound' => Factory\PageNotFoundHelperFactory::class,
			'staticPage' => Factory\StaticPageHelperFactory::class,
			'winCache'	=> Factory\WinCacheViewHelperFactory::class,
			FlashMessengerViewHelper::class => Factory\FlashMessengerViewHelperFactory::class,
		],
		'aliases' => [
			'flashmessenger' => FlashMessengerViewHelper::class,
			'flashMessenger' => FlashMessengerViewHelper::class,
			'FlashMessenger' => FlashMessengerViewHelper::class,
			'Application\View\Helper\FlashMessengerViewHelper' => InvokableFactory::class,
		],
	],
    'view_manager' => [
    	'display_not_found_reason' => false,
        'display_exceptions'       => false,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'error/404',
        'exception_template'       => 'error/index',
        'template_map' => [
            'layout/layout'           => __DIR__ . '/../view/layout/layout.phtml',
            'application/index/index' => __DIR__ . '/../view/application/index/index.phtml',
            'error/404'               => __DIR__ . '/../view/error/404.phtml',
            'error/index'             => __DIR__ . '/../view/error/index.phtml',
        ],
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    	'strategies' => [
    		'ViewJsonStrategy'
    	]
    ],
	'access_filter' => [
		['*' => ['home', 'rate_limit_reached', 'access_denied', 'error']],
	]
];