<?php
namespace Forum;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'topic_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/forum',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'topicList'
					]
				],
			],

			'new_topic' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/forum/new-topic',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'addTopic'
					]
				],
			],
			'topic_comment_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/forum/topic-comment-list/:topicId',
					'defaults' => [
						'controller' => Controller\ForumController::class,
						'action' => 'topicCommentList'
					],
					'constraints' => [
						'topicId' => '\d+'
					]
				],
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
		['@' => ['topic_list', 'new_topic', 'topic_comment_list']],
	],
];