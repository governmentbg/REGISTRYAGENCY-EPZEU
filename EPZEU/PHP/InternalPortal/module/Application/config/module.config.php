<?php
/**
 * Module class file
 *
 * @package Application
 */

namespace Application;

use Zend\Router\Http\Segment;

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
                		'page' => '\d+',
                		'lang' => '[a-z]*'
                	]
                ],
            ],
        ],
    ],
    'controllers' => [
        'factories' => [
            Controller\IndexController::class => Factory\IndexControllerFactory::class
		]
	],
	'service_manager' => [
		'factories' => [
			Service\AppService::class => Factory\AppServiceFactory::class,
			Service\CacheService::class => Factory\CacheServiceFactory::class,
			Service\RestService::class => Factory\RestServiceFactory::class,
			Service\OidcService::class => Factory\OidcServiceFactory::class,
		],
	],
	'controller_plugins' => [
		'factories' => [
			'getConfig' => 'Application\Factory\ConfigPluginFactory',
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
			'publicUrl' => Factory\PublicUrlHelperFactory::class,
			'menu' => Factory\MenuViewHelperFactory::class,
			'pageNotFound' => Factory\PageNotFoundHelperFactory::class,
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
		['@' => ['home', 'not_found']],
	]
];