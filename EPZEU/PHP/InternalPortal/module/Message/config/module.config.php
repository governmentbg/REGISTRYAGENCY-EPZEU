<?php
namespace Message;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'message_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/message-list',
					'defaults' => [
						'controller' => Controller\MessageController::class,
						'action' => 'messageList'
					]
				]
			],
			'add_message' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-message[/:type]',
					'defaults' => [
						'controller' => Controller\MessageController::class,
						'action' => 'addMessage'
					],
					'constraints' => [
						'type' => '(send)'
					]
				]
			],
			'edit_message' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-message/:messageId[/:type]',
					'defaults' => [
						'controller' => Controller\MessageController::class,
						'action' => 'editMessage'
					],
					'constraints' => [
						'messageId' => '\d+',
						'type' => '(send)'
					]
				]
			],
			'delete_message' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-message/:messageId',
					'defaults' => [
						'controller' => Controller\MessageController::class,
						'action' => 'deleteMessage'
					],
					'constraints' => [
						'messageId' => '\d+'
					]
				]
			],
			'preview_message' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-message/:messageId',
					'defaults' => [
						'controller' => Controller\MessageController::class,
						'action' => 'previewMessage'
					],
					'constraints' => [
						'messageId' => '\d+'
					]
				]
			],

		],
	],
	'controllers' => [
		'factories' => [
			Controller\MessageController::class => Factory\MessageControllerFactory::class,
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\MessageDataManager::class => Factory\MessageDataManagerFactory::class,
		],
	],
	'access_filter' => [
		['special' => [
			'EP_PREVIEW_CMS' => ['message_list', 'preview_message'],
			'EP_ADM_CMS' => ['message_list', 'preview_message', 'add_message', 'edit_message', 'delete_message']
		]]
	]
];