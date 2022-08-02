<?php
namespace Payment;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'edit_registry_agency_data_epay' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-registry-agency-data/:registryAgencyType',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'editRegistryAgencyData',
						'registryAgencyType' => 'epay'
					],
					'constraints' => [
						'registryAgencyType' => '(epay)'
					]
				]
			],
			'edit_registry_agency_data_pep' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/edit-registry-agency-data/:registryAgencyType',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'editRegistryAgencyData',
						'registryAgencyType' => 'pep'
					],
					'constraints' => [
						'registryAgencyType' => '(pep)'
					]
				]
			],
		],
	],
	'controllers' => [
		'factories' => [
			Controller\PaymentController::class => Factory\PaymentControllerFactory::class,
		]
	],
	'view_manager' => [
		'template_path_stack' => [
			__DIR__ . '/../view'
		]
	],
	'service_manager' => [
		'factories' => [
			Data\PaymentDataManager::class => Factory\PaymentDataManagerFactory::class,
		],
	],
	'access_filter' => [
		['special' => [
			'EP_ADM_NOM_PARAMS' => ['edit_registry_agency_data_epay', 'edit_registry_agency_data_pep'],
		]]
	]
];