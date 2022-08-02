<?php
/**
 * Module class file
 *
 * @package DeclarationTemplate
 */
namespace DeclarationTemplate;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [

			'declaration_template_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/declaration-template-list[/][page/:page]',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'declarationTemplateList'
					],
					'constraints' => [
						'page' => '\d+'
					]
				]
			],
			'add_declaration_template' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/add-declaration-template',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'addDeclarationTemplate'
					],
				]
			],

			'edit_declaration_template' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-declaration-template/:templateId',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'editDeclarationTemplate'
					],
					'constraints' => [
						'templateId' => '\d+'
					]
				]
			],

			'preview_declaration_template' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-declaration-template/:templateId',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'previewDeclarationTemplate'
					],
					'constraints' => [
						'templateId' => '\d+'
					]
				]
			],
			'get_active_fields' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/get-active-fields',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'getActiveFields'
					],
				]
			],
			'delete_declaration_template' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/delete-declaration-template/:templateId',
					'defaults' => [
						'controller' => Controller\ModuleController::class,
						'action' => 'deleteDeclarationTemplate'
					],
					'constraints' => [
						'templateId' => '\d+'
					]
				]
			],
		]
	],
	'controllers' => [
		'factories' => [
			Controller\ModuleController::class => Factory\ModuleControllerFactory::class
		]
	],
	'service_manager' => [
		'factories' => [
			Data\DataManager::class => Factory\DataManagerFactory::class,
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'access_filter' => [
		['special' => [
			'EP_PREVIEW_CMS' => ['declaration_template_list', 'preview_declaration_template'],
			'EP_ADM_CMS' => ['declaration_template_list', 'preview_declaration_template', 'add_declaration_template', 'delete_declaration_template', 'edit_declaration_template', 'get_active_fields']
		]]
	]
];