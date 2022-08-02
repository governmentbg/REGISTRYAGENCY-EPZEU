<?php
namespace Payment;

use Zend\Router\Http\Segment;

return [
	'router' => [
		'routes' => [
			'duty_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'dutyList'
					]
				]
			],
			'pay_duty_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/pay-duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'payDutyList'
					]
				]
			],
			'payment_duty_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/payment-duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'payDutyList'
					]
				]
			],
			'epay_payment_duty_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/epay-payment-duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'epayPaymentDutyList'
					]
				]
			],
			'epay_response' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/epay-response',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'epayResponse'
					]
				]
			],
			'payment_order_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/payment-order-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'paymentOrderList'
					]
				]
			],
			'preview_duty_payment_order_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-duty-payment-order-list/:registerId/:applicationType/:applicationNumber',
					'defaults' => [
							'controller' => Controller\PaymentController::class,
							'action' => 'previewDutyPaymentOrderList'
					],
					'constraints' => [
						'registerId' => '\d{1,10}+',
						'applicationType' => '\d{1,10}+'
					]
				]
			],
			'preview_payment_order_transaction_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-payment-order-transaction-list/:registerId/:paymentOrderId',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'previewPaymentOrderTransactionList'
					],
					'constraints' => [
						'registerId' => '\d{1,10}+',
						'paymentOrderId' => '\d+'
					]
				]
			],

			'personal_account_list' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/personal-account-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'personalAccountList'
					]
				]
			],
			'pay_power_personal_account' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/pay-power-personal-account/:registerId',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'payPowerPersonalAccount'
					],
					'constraints' => [
						'registerId' => '\d{1,10}+'
					]
				]
			],
			'epay_payment_power_personal_account' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/epay-payment-power-personal-account',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'epayPaymentPowerPersonalAccount'
					]
				]
			],
			'pepdaeu_payment_duty_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/pepdaeu-payment-duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'pepdaeuPaymentDutyList'
					]
				]
			],
			'pepdaeu_duty_generate_code' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/pepdaeu-duty-generate-code',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'pepdaeuPaymentDutyList'
					]
				]
			],
			'pepdaeu_response' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/pepdaeu-response',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'pepdaeuResponse'
					]
				]
			],
			'pepdaeu_payment_power_personal_account' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/pepdaeu-payment-power-personal-account',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'pepdaeuPaymentPowerPersonalAccount'
					]
				]
			],

			'pepdaeu_pay_power_generate_code' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/pepdaeu-pay-power-generate-code',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'pepdaeuPaymentPowerPersonalAccount'
					]
				]
			],
			'personal_account_payment_duty_list' => [
				'type' => Segment::class,
				'options' => [
					'route' => '/personal-account-payment-duty-list',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'personalAccountPaymentDutyList'
					]
				]
			],
			'preview_application' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-application',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'previewApplication'
					]
				]
			],

			'preview_application_duty_list_info' => [
				'type' => Segment::class,
				'options' => [
					'route' => '[/:lang]/preview-application-duty-list-info/:registerId/:applicationType/:applicationNumber',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'previewApplicationDutyListInfo'
					],
					'constraints' => [
						'registerId' => '\d{1,10}+',
						'applicationType' => '\d{1,10}+'
					]
				]
			],

			'check_duty_code_pepdaeu' => [
				'type' =>  Segment::class,
				'options' => [
					'route' => '/check-duty-code-pepdaeu',
					'defaults' => [
						'controller' => Controller\PaymentController::class,
						'action' => 'chechDutyCodePepdaeu'
					]
				]
			],
		]
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
		['*' => ['epay_response', 'pepdaeu_response']],
		['@' => [
			'duty_list',
			'pay_duty_list',
			'payment_duty_list',
			'epay_payment_duty_list',
			'payment_order_list',
			'preview_duty_payment_order_list',
			'preview_payment_order_transaction_list',
			'personal_account_list',
			'pay_power_personal_account',
			'epay_payment_power_personal_account',
			'pepdaeu_payment_duty_list',
			'pepdaeu_payment_power_personal_account',
			'personal_account_payment_duty_list',
			'preview_application',
			'preview_application_duty_list_info',
			'check_duty_code_pepdaeu',
			'pepdaeu_duty_generate_code',
			'pepdaeu_pay_power_generate_code'
		]]
	]
];