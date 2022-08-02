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
			'ldap_search' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/ldap-search',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'ldapSearch'
					]
				],
			],
			'user_search' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-search',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userSearch'
					]
				],
			],
			'user_manage_special_access' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-manage-special-access[/page/:page]',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userManageSpecialAccess'
					],
					'constraints' => [
						'page' => '\d+'
					]
				]
			],
			'edit_user' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-user/:userId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'editUser'
					],
					'constraints' => [
						'userId' => '\d+'
					]
				]
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

			'edit_special_access_request' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-special-access-request/:userId/:requestId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'editSpecialAccessRequest'
					],
					'constraints' => [
						'userId' =>  '\d+',
						'requestId' => '\d+',
					]
				]
			],
			'reset_password' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/reset-password/:userId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'resetPassword'
					],
					'constraints' => [
						'userId' =>  '\d+'
					]
				],
			],

			// Лимити
			'limit_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/limit-list',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'limitList'
					],
				],
			],
			'limit_user_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/limit-user-list',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'limitUserList'
					],
				],
			],
			'add_user_limit' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-user-limit',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'manageUserLimit'
					],
				],
			],
			'edit_user_limit' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-user-limit/:userLimitId',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'manageUserLimit'
					],
					'constraints' => [
						'userLimitId' =>  '\d+'
					]
				],
			],
			'select_user' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/select-user',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userSearch',
						'type' => 'selectUser'
					],
				],
			],
			'select_user_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/select-user-list',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userSearch',
						'type' => 'selectUserList'
					],
				],
			],
			'change_limit_status' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/change-limit-status/:limitId',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'changeLimitStatus',
					],
					'constraints' => [
						'limitId' =>  '\d+'
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
			'select_limit_service' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/select-limit-service',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'limitList',
						'type' => 'selectLimitService'
					],
				],
			],

			'change_user_limit_status' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/change-user-limit-status/:userLimitId',
					'defaults' => [
						'controller' => Controller\LimitController::class,
						'action' => 'changeUserLimitStatus',
					],
					'constraints' => [
						'userLimitUserId' =>  '\d+'
					]
				],
			],

			'audit_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/audit-list',
					'defaults' => [
						'controller' => Controller\AuditController::class,
						'action' => 'auditList',
					]
				],
			],
			'preview_user_profile' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-user-profile/:userId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'editUser',
						'preview' => true
					],
					'constraints' => [
						'userId' =>  '\d+'
					]
				],
			],
			'preview_audit_data' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-audit-data/:auditId[/:searchType]',
					'defaults' => [
						'controller' => Controller\AuditController::class,
						'action' => 'previewAdditionalData',
						'preview' => true
					],
					'constraints' => [
						'userId' =>  '\d+'
					]
				],
			],
			'login_session_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/login-session-list',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'loginSessionList',
					],
				],
			],

			'login_session' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/login-session/:loginSession',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'loginSession',
					],
				],
			],

			'user_special_access_approval' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/user-special-access-approval/:id',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'userSpecialAccessApproval',
					],
				],
			],
			'add_special_access_disapproval_reason' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-special-access-disapproval-reason',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'addSpecialAccessDisapprovalReason',
					],
				],
			],
			'add_special_access_request' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-special-access-request/:userId',
					'defaults' => [
						'controller' => Controller\UserController::class,
						'action' => 'addSpecialAccessRequest'
					],
					'constraints' => [
						'userId' =>  '\d+',
					]
				]
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
		],

	],
	'view_helpers' => [
		'factories'=> [
			'isAllowed' => Factory\IsAllowedHelperFactory::class,
		],
	],
	'controller_plugins' => [
		'factories' => [
			'isAllowed' => Factory\IsAllowedPluginFactory::class
		]
	],
	'controllers' => [
		'factories' => [
			Controller\UserController::class => Factory\UserControllerFactory::class,
			Controller\LimitController::class => Factory\LimitControllerFactory::class,
			Controller\AuditController::class => Factory\AuditControllerFactory::class,
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'validators' => [
		'factories' => [
			'OldPasswordValidator' => 'User\Validator\OldPasswordValidator',
			'UsernameEmailValidator' => 'User\Validator\UsernameEmailValidator'
		],
	],
	'service_manager' => [
		'factories' => [
			Data\UserDataManager::class => Factory\UserDataManagerFactory::class,
			Service\UserService::class => Factory\UserServiceFactory::class,
		],
	],
	'access_filter' => [
			['*' => ['login', 'idle_logout']],
			['@' => ['logout', 'user_profile', 'special_access_document_download']],

			['special' => [
				'EP_PREVIEW_CMS' => ['select_user', 'limit_list', 'limit_user_list'],
				'EP_ADM_USERS' => ['register', 'ldap_search', 'user_search', 'edit_user', 'reset_password', 'user_manage_special_access', 'edit_special_access_request', 'user_special_access_approval', 'add_special_access_disapproval_reason', 'add_special_access_request'],
				'EP_ADM_LIMITS' => ['select_limit_service', 'limit_list', 'limit_user_list', 'add_user_limit', 'select_user', 'edit_limit', 'change_limit_status', 'change_user_limit_status', 'edit_user_limit'],
				'EP_AUDIT' => ['select_user', 'audit_list', 'preview_user_profile', 'preview_audit_data', 'login_session_list', 'login_session'],
				'EP_AUDIT_INVESTIGATING_AUTHORITIES' => ['select_user', 'audit_list', 'preview_user_profile', 'preview_audit_data', 'login_session_list', 'login_session'],
				'EP_ADM_CMS' => ['select_user_list']
			]]
	]


];