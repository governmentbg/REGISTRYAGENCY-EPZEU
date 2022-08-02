<?php
/**
 * Local Configuration Override
 *
 * This configuration override file is for overriding environment-specific and
 * security-sensitive configuration information. Copy this file without the
 * .dist extension at the end and populate values as needed.
 *
 * @NOTE: This file is ignored from Git by default with the .gitignore included
 * in ZendSkeletonApplication. This is a good practice, as it prevents sensitive
 * credentials from accidentally being committed into version control.
 */

return [
	'config' => [
		'api_key'	=> 'u&&GPss,s)Y!{U>YN=F^87#X`:83?E{(',
		'api_iv'	=> 'HjFt1Obs08oQM4A6',
		'error_log' => 'C:\Projects\EPZEU\QA\02 Logs\01 Applications\PublicPortal\\',
		'rest_service' => [
			'parameter'	=> 'https://api.qa.epzeu.dev.local/Api/AppParameters'
		],
	],
	'db' => [
		'username'	=> 'epzeu_qa',
		'password'	=> 'epzeu_qa',
		'dsn'		=> 'pgsql:host=vm-av-epzeu-db2.dev.local;dbname=epzeu_qa'
	],
	'identity_provider' => [
		'provider_url'					=> 'https://login.qa.epzeu.dev.local/',
		'timeout' 						=> 60,
		'verify_host'					=> true,
		'verify_peer'					=> true,
		'client_id'						=> 'epzeu.ui.client',
		'client_secret'					=> '',
		'api_scope'						=> ['api.payments.obligations.ro', 'api.payments.transactions', 'api.payments.reporting', 'api.payments.paymentorders', 'epzeu.api', 'epzeu.cr.api'],
		'user_scope'					=> ['openid', 'profile', 'epzeu.api', 'offline_access'],
		'redirect_uri'					=> 'https://portal.qa.epzeu.dev.local/login',
		'post_logout_redirect_uri'		=> 'https://portal.qa.epzeu.dev.local/',
		'post_logout_redirect_idle_uri'	=> 'https://portal.qa.epzeu.dev.local/idle',
	],
];
