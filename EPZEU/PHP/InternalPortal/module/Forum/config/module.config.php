<?php
namespace Forum;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'forbidden_word_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/forbidden-word-list',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'forbiddenWordList'
					]
				]
			],
			'add_forbidden_word' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-forbidden-word',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'addForbiddenWord'
					],
				]
			],
			'delete_forbidden_word' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-forbidden-word/:forbiddenWordId',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'deleteForbiddenWord'
					],
					'constraints' => [
						'forbiddenWordId' => '\d+'
					]
				]
			],
			'comment_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/comment-list',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'commentList'
					],
				]
			],

			'change_comment_status' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/change-comment-status/:commentId',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'changeCommentStatus'
					],
					'constraints' => [
						'commentId' => '\d+'
					]
				]
			]

		]
	],
	'controllers' => [
		'factories' => [
			Controller\ForumController::class => Factory\ForumControllerFactory::class
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\ForumDataManager::class => Factory\ForumDataManagerFactory::class,
		]
	],
	'access_filter' => [
		['special' => [
			'EP_ADM_CMS' => ['forbidden_word_list', 'add_forbidden_word', 'edit_forbidden_word', 'delete_forbidden_word', 'comment_list', 'change_comment_status']
		]]
	]
];