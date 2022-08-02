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
		'error_log' => 'C:\Projects\EPZEU\Development\02 Logs\01 Applications\InternalPortal\\',
		'rest_service' => [
			'parameter'	=> 'https://api.dev.epzeu.dev.local/Api/AppParameters'
		],
	],
	'db' => [
		'username'	=> 'epzeu_dev',
		'password'	=> 'epzeu_dev',
		'dsn'		=> 'pgsql:host=vm-av-epzeu-db2.dev.local;dbname=epzeu_dev'
	],
	'identity_provider' => [
		'provider_url'					=> 'https://login.dev.epzeu.dev.local/',
		'timeout'						=> 60, // секунди
		'verify_host'					=> true,
		'verify_peer'					=> true,
		'client_id'						=> 'phpdev.client',
		'client_secret'					=> '',
		'api_scope'						=> ['epzeu.api', 'epzeu.cr.api'],
		'user_scope'					=> ['openid', 'profile', 'epzeu.api', 'offline_access'],
		'redirect_uri'					=> 'https://admin.dev.epzeu.dev.local/login',
		'post_logout_redirect_uri'		=> 'https://admin.dev.epzeu.dev.local/',
		'post_logout_redirect_idle_uri'	=> 'https://admin.dev.epzeu.dev.local/idle',
	],
	'ldap' => [
		'accountCanonicalForm'		=> 3,
		'allowEmptyPassword'		=> false,
		'optReferrals'				=> false,
		'tryUsernameSplit'			=> true,
		'reconnectAttempts'			=> 0,
		'networkTimeout'			=> null,
		'saslOpts'					=> null,
	],
];
