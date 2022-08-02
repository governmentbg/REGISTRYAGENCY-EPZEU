<?php
namespace User;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'login' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/login',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'login'
					]
				]
			],
			'register' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/register',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'register'
					]
				]
			],
			'logout' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/logout',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'logout'
					]
				]
			],
			'user_confirmation' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-confirmation/:token',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userConfirmation'
					]
				],

			],

			'forgot_password' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/forgot-password',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'forgotPassword'
					]
				],
			],
			'forgot_password_change' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/forgot-password-change/:token',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'forgotPasswordChange'
					]
				],
			],
			'change_password' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/change-password',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'changePassword'
					]
				],
			],
			'user_profile' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-profile',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userProfile'
					]
				],
			],
			'special_access_document_download' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/special-access-document-download/:documentId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'specialAccessDocument'
					],
					'constraints' => [
						'documentId' => '\d+'
					]
				],
			],
			'user_process' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-process/:process',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userProcess'
					]
				],
			],
			'user_auth_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-auth-list',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userAuthList'
					]
				],
			],
			'add_user_auth' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-user-auth',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'addUserAuth'
					]
				],
			],
			'delete_user_auth' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-user-auth/:authId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'deleteUserAuth'
					],
					'constraints' => [
						'authId' => '\d+'
					]
				],
			],
			'application_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/application-list',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'applicationList'
					]
				],
			],

			'email_subscription' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/email-subscription',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'emailSubscription'
					]
				],
			],

			'delete_email_subscription' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-email-subscription/:id',
					'defaults' => [
						'controller' 	=> Controller\UserController::class,
						'action'		=> 'deleteEmailSubscription',
						'type'			=> 'single'
					],
					'constraints' => [
					]
				],
			],
			'delete_email_subscription_bulk' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-email-subscription-bulk',
					'defaults' => [
						'controller'	=> Controller\UserController::class,
						'action' 		=> 'deleteEmailSubscription',
						'type'			=> 'bulk'
					],
					'constraints' => [
						'id' => '\d+'
					]
				],
			],
			'united_profile_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/united-profile-list',
					'defaults' => [
						'controller'	=> Controller\UnitedUserController::class,
						'action' 		=> 'unitedProfileList',
					],
				],
			],
			'unite_user_profile' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/unite-user-profile',
					'defaults' => [
						'controller'	=> Controller\UnitedUserController::class,
						'action' 		=> 'uniteUserProfile',
					],
				],
			],
			'confirm_merge_profile' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/confirm-merge-profile/:userData',
					'defaults' => [
						'controller'	=> Controller\UnitedUserController::class,
						'action' 		=> 'confirmMergeProfile',
					],
				],
			],
			'idle_logout' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/idle',
					'defaults' => [
						'controller'	=> Controller\UserController::class,
						'action' 		=> 'idleLogout',
					],
				],
			],
			'front_channel_logout' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/front-channel-logout',
					'defaults' => [
						'controller'	=> Controller\UserController::class,
						'action' 		=> 'frontChannelLogout',
					],
				],
			],

		],
	],
	'view_helpers' => [
		'factories'=> [
			'isAllowed' => Factory\IsAllowedHelperFactory::class,
		],
	],
	'controllers' => [
		'factories' => [
			Controller\UserController::class => Factory\UserControllerFactory::class,
			Controller\UnitedUserController::class => Factory\UnitedUserControllerFactory::class
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'validators' => [
		'factories' => [
			'OldPasswordValidator' => 'User\Validator\OldPasswordValidator'
		],
	],
	'service_manager' => [
		'factories' => [
			Data\UserDataManager::class => Factory\UserDataManagerFactory::class,
			Service\UserService::class => Factory\UserServiceFactory::class,
		],
	],
	'access_filter' => [
		['*' => ['login', 'logout', 'forgot_password', 'forgot_password_change', 'register', 'user_confirmation', 'user_process', 'idle_logout','front_channel_logout']],
		['@' => ['user_profile', 'change_password', 'special_access_document_download', 'user_auth_list', 'add_user_auth', 'delete_user_auth', 'application_list', 'email_subscription', 'delete_email_subscription','delete_email_subscription_bulk','united_profile_list','unite_user_profile','confirm_merge_profile']],
	]
];