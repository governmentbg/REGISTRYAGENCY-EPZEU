
-- Synchronization for tables:
--   <idsrv_dev.idsrv.ApiClaims> and <idsrv_qa.idsrv.ApiClaims>
--   <idsrv_dev.idsrv.ApiProperties> and <idsrv_qa.idsrv.ApiProperties>
--   <idsrv_dev.idsrv.ApiResources> and <idsrv_qa.idsrv.ApiResources>
--   <idsrv_dev.idsrv.ApiScopeClaims> and <idsrv_qa.idsrv.ApiScopeClaims>
--   <idsrv_dev.idsrv.ApiScopes> and <idsrv_qa.idsrv.ApiScopes>
--   <idsrv_dev.idsrv.ApiSecrets> and <idsrv_qa.idsrv.ApiSecrets>
--   <idsrv_dev.idsrv.ClientClaims> and <idsrv_qa.idsrv.ClientClaims>
--   <idsrv_dev.idsrv.IdentityResources> and <idsrv_qa.idsrv.IdentityResources>
--   <idsrv_dev.idsrv.IdentityProperties> and <idsrv_qa.idsrv.IdentityProperties>
--   <idsrv_dev.idsrv.IdentityClaims> and <idsrv_qa.idsrv.IdentityClaims>
--   <idsrv_dev.idsrv.Clients> and <idsrv_qa.idsrv.Clients>
--   <idsrv_dev.idsrv.ClientSecrets> and <idsrv_qa.idsrv.ClientSecrets>
--   <idsrv_dev.idsrv.ClientScopes> and <idsrv_qa.idsrv.ClientScopes>
--   <idsrv_dev.idsrv.ClientRedirectUris> and <idsrv_qa.idsrv.ClientRedirectUris>
--   <idsrv_dev.idsrv.ClientProperties> and <idsrv_qa.idsrv.ClientProperties>
--   <idsrv_dev.idsrv.ClientCorsOrigins> and <idsrv_qa.idsrv.ClientCorsOrigins>
--   <idsrv_dev.idsrv.ClientGrantTypes> and <idsrv_qa.idsrv.ClientGrantTypes>
--   <idsrv_dev.idsrv.ClientIdPRestrictions> and <idsrv_qa.idsrv.ClientIdPRestrictions>
--   <idsrv_dev.idsrv.ClientPostLogoutRedirectUris> and <idsrv_qa.idsrv.ClientPostLogoutRedirectUris>
-- Type: Source to target

BEGIN;
DROP INDEX idsrv."IX_ApiClaims_ApiResourceId";

DROP INDEX idsrv."IX_ApiProperties_ApiResourceId";

DROP INDEX idsrv."IX_ApiScopeClaims_ApiScopeId";

DROP INDEX idsrv."IX_ApiScopes_ApiResourceId";

DROP INDEX idsrv."IX_ApiSecrets_ApiResourceId";

DROP INDEX idsrv."IX_ClientClaims_ClientId";

DROP INDEX idsrv."IX_IdentityProperties_IdentityResourceId";

DROP INDEX idsrv."IX_IdentityClaims_IdentityResourceId";

DROP INDEX idsrv."IX_ClientSecrets_ClientId";

DROP INDEX idsrv."IX_ClientScopes_ClientId";

DROP INDEX idsrv."IX_ClientRedirectUris_ClientId";

DROP INDEX idsrv."IX_ClientProperties_ClientId";

DROP INDEX idsrv."IX_ClientCorsOrigins_ClientId";

DROP INDEX idsrv."IX_ClientGrantTypes_ClientId";

DROP INDEX idsrv."IX_ClientIdPRestrictions_ClientId";

DROP INDEX idsrv."IX_ClientPostLogoutRedirectUris_ClientId";

-- Insert additional records

INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(13, True, 'epzeu.pr.api', NULL, NULL, '2020-03-23 12:44:52.022464', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(14, True, 'epzeu.cr.api.public', NULL, NULL, '2020-03-23 12:44:52.014735', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(15, True, 'epzeu.cr.api', NULL, NULL, '2020-03-23 12:44:51.982691', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(16, True, 'epzeu.api', NULL, NULL, '2020-03-23 12:44:52.022972', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(17, True, 'epzeu.api.public', NULL, NULL, '2020-03-23 12:44:52.02345', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(18, True, 'reau.api', NULL, NULL, '2020-03-23 12:44:52.023911', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(19, True, 'payments.api', NULL, NULL, '2020-03-23 12:44:52.024476', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(20, True, 'integration.epzeu.api', NULL, NULL, '2020-03-23 12:44:52.024999', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(21, True, 'egov.edelivery.service', NULL, NULL, '2020-03-23 12:44:52.02539', NULL, NULL, False);
INSERT INTO idsrv."ApiResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Created", "Updated", "LastAccessed", "NonEditable")
VALUES(22, True, 'egov.edelivery.notification', NULL, NULL, '2020-03-23 12:44:52.025629', NULL, NULL, False);

INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(73, 'access_type', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(74, 'family_name', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(75, 'given_name', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(76, 'name', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(77, 'role', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(78, 'login_session_id', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(79, 'cin', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(80, 'Subject', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(81, 'Subject', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(82, 'family_name', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(83, 'name', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(84, 'role', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(85, 'login_session_id', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(86, 'cin', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(88, 'family_name', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(89, 'given_name', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(90, 'given_name', 18);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(91, 'cin', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(92, 'login_session_id', 19);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(93, 'role', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(99, 'login_session_id', 22);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(100, 'cin', 22);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(101, 'Subject', 22);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(102, 'login_session_id', 21);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(103, 'cin', 21);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(104, 'Subject', 21);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(105, 'login_session_id', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(106, 'cin', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(107, 'Subject', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(108, 'family_name', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(109, 'given_name', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(110, 'name', 20);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(111, 'name', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(112, 'role', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(113, 'Subject', 17);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(114, 'given_name', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(115, 'cin', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(116, 'Subject', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(117, 'family_name', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(118, 'given_name', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(119, 'name', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(120, 'role', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(121, 'role', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(122, 'name', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(123, 'user_identifiable', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(124, 'login_session_id', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(125, 'cin', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(126, 'Subject', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(127, 'family_name', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(128, 'login_session_id', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(129, 'user_identifiable', 14);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(130, 'family_name', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(131, 'user_identifiable', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(132, 'login_session_id', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(133, 'cin', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(134, 'Subject', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(135, 'family_name', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(136, 'login_session_id', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(137, 'given_name', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(138, 'given_name', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(139, 'role', 16);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(140, 'cin', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(141, 'Subject', 13);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(142, 'role', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(143, 'name', 15);
INSERT INTO idsrv."ApiClaims" ("Id", "Type", "ApiResourceId")
VALUES(144, 'name', 16);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(14, 'egov.edelivery.notification', NULL, NULL, False, False, True, 22);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(15, 'epzeu.api.public', NULL, NULL, False, False, True, 17);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(16, 'integration.epzeu.api', NULL, NULL, False, False, True, 20);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(17, 'egov.edelivery.service', NULL, NULL, False, False, True, 21);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(18, 'epzeu.cr.api.public', NULL, NULL, False, False, True, 14);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(19, 'payments.api', NULL, NULL, False, False, True, 19);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(20, 'epzeu.cr.api', NULL, NULL, False, False, True, 15);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(21, 'epzeu.api', NULL, NULL, False, False, True, 16);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(22, 'reau.api', NULL, NULL, False, False, True, 18);
INSERT INTO idsrv."ApiScopes" ("Id", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "ApiResourceId")
VALUES(23, 'epzeu.pr.api', NULL, NULL, False, False, True, 13);
INSERT INTO idsrv."ApiSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId")
VALUES(6, NULL, 'illXpFKcHPwZNv4WwAefvltIbEeof/ti4OBvy6GQYc8=', NULL, 'SharedSecret', '2020-03-23 12:44:52.022469', 13);
INSERT INTO idsrv."ApiSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId")
VALUES(7, NULL, 'sA9gqC5o/cMQo6CGJxurqF8gh3MHEzzFlNa9f0+UcPo=', NULL, 'SharedSecret', '2020-03-23 12:44:52.014837', 14);
INSERT INTO idsrv."ApiSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId")
VALUES(8, NULL, '5+UwrRfsi6+q4JAFDW+/PtgaQMPkWUEkPX60jMmt31w=', NULL, 'SharedSecret', '2020-03-23 12:44:52.023452', 17);
INSERT INTO idsrv."ApiSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ApiResourceId")
VALUES(10, NULL, 'IQam5Ra4LWk2Spr6/FXm0WZBZ4L8pwcfHRpYit7p31A=', NULL, 'SharedSecret', '2020-03-23 12:44:52.024478', 19);

COMMIT;

BEGIN;

INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(7, True, 'openid', 'Your user identifier', NULL, True, False, True, '2020-03-23 12:44:51.646625', NULL, False);
INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(8, True, 'profile', 'User profile', 'Your user profile information (first name, last name, etc.)', False, True, True, '2020-03-23 14:34:36.015221', NULL, False);
INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(9, True, 'epzeu.identity', 'EPZEU identity', 'EPZEU identity', False, False, True, '2020-03-23 12:44:51.757761', NULL, False);
INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(10, True, 'roles', 'Roles', NULL, False, False, True, '2020-03-23 12:44:51.757932', NULL, False);
INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(11, True, 'email', 'Your email address', NULL, False, True, True, '2020-03-23 12:44:51.758007', NULL, False);
INSERT INTO idsrv."IdentityResources" ("Id", "Enabled", "Name", "DisplayName", "Description", "Required", "Emphasize", "ShowInDiscoveryDocument", "Created", "Updated", "NonEditable")
VALUES(12, True, 'address', 'Your address', NULL, False, True, True, '2020-03-23 12:44:51.758157', NULL, False);

INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(27, 'sub', 7);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(28, 'email', 11);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(29, 'role', 10);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(30, 'family_name', 9);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(31, 'given_name', 9);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(32, 'role', 9);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(51, 'email_verified', 11);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(52, 'address', 12);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(53, 'email', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(54, 'picture', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(55, 'role', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(56, 'updated_at', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(57, 'locale', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(58, 'zoneinfo', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(59, 'birthdate', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(60, 'gender', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(61, 'website', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(62, 'name', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(63, 'user_identifiable', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(64, 'preferred_username', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(65, 'nickname', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(66, 'access_type', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(67, 'organization', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(68, 'middle_name', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(69, 'given_name', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(70, 'family_name', 8);
INSERT INTO idsrv."IdentityClaims" ("Id", "Type", "IdentityResourceId")
VALUES(71, 'profile', 8);

COMMIT;

BEGIN;

INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(18, True, 'egov.edelivery.service.client', 'oidc', True, 'egov.edelivery.service.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.241473', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(20, True, 'egov.edelivery.notification.client', 'oidc', True, 'egov.edelivery.notification.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.24172', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(21, True, 'epzeu.api.client', 'oidc', True, 'epzeu.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 120, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.164866', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(22, True, 'epzeu.cr.api.client', 'oidc', True, 'epzeu.cr.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 120, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.218204', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(23, True, 'idsrv.client', 'oidc', True, 'idsrv.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 120, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.219095', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(24, True, 'epzeu.cr.ui.client', 'oidc', True, 'epzeu.cr.ui.client', NULL, NULL, NULL, False, True, False, False, False, True, 'https://localhost/EPZEU.CR.Web.App/Identity/FrontChannelLogout', True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 1, True, False, False, 'client_', NULL, '2020-03-31 13:05:56.396528', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(25, True, 'identity_admin', 'oidc', True, 'identity_admin', NULL, 'https://idsrv-admin.dev.epzeu.dev.local', NULL, False, True, False, False, False, False, 'https://idsrv-admin.dev.epzeu.dev.local/signout-oidc', True, NULL, True, False, 300, 3600, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, 'client_', NULL, '2020-03-31 14:54:22.998574', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(26, True, 'epzeu.swagger.client', 'oidc', True, 'epzeu.swagger.client', NULL, NULL, NULL, False, True, False, False, False, True, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, 'client_', NULL, '2020-03-23 12:44:52.238025', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(27, True, 'epzeu.pr.api.client', 'oidc', True, 'epzeu.pr.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, NULL, NULL, '2020-03-31 13:33:44.017755', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(28, True, 'payments.api.client', 'oidc', True, 'payments.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.239443', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(29, True, 'reau.api.client', 'oidc', True, 'reau.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.239746', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(30, True, 'reau.ui.client', 'oidc', True, 'reau.ui.client', NULL, NULL, NULL, False, True, False, False, False, True, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, NULL, NULL, '2020-03-31 13:24:17.913115', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(31, True, 'payments.ui.client', 'oidc', True, 'payments.ui.client', NULL, NULL, NULL, False, True, False, False, False, True, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 1, True, False, False, 'client_', NULL, '2020-03-31 13:08:00.166516', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(32, True, 'integration.epzeu.api.client', 'oidc', True, 'integration.epzeu.api.client', NULL, NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 14400, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, '', NULL, '2020-03-23 12:44:52.241083', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(33, True, 'epzeu.pr.ui.client', 'oidc', True, 'epzeu.pr.ui.client', NULL, NULL, NULL, False, True, False, False, False, True, NULL, True, NULL, True, False, 300, 120, 300, NULL, 2592000, 1296000, 1, False, 1, 1, True, False, False, 'client_', NULL, '2020-03-31 13:04:27.63281', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(35, True, 'pr.api.client', 'oidc', True, 'pr.api.client', 'pr.api.client', NULL, NULL, True, True, False, False, False, False, NULL, True, NULL, True, False, 300, 15500000, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, NULL, NULL, '2020-03-31 13:15:18.038841', NULL, NULL, NULL, NULL, 300, False);
INSERT INTO idsrv."Clients" ("Id", "Enabled", "ClientId", "ProtocolType", "RequireClientSecret", "ClientName", "Description", "ClientUri", "LogoUri", "RequireConsent", "AllowRememberConsent", "AlwaysIncludeUserClaimsInIdToken", "RequirePkce", "AllowPlainTextPkce", "AllowAccessTokensViaBrowser", "FrontChannelLogoutUri", "FrontChannelLogoutSessionRequired", "BackChannelLogoutUri", "BackChannelLogoutSessionRequired", "AllowOfflineAccess", "IdentityTokenLifetime", "AccessTokenLifetime", "AuthorizationCodeLifetime", "ConsentLifetime", "AbsoluteRefreshTokenLifetime", "SlidingRefreshTokenLifetime", "RefreshTokenUsage", "UpdateAccessTokenClaimsOnRefresh", "RefreshTokenExpiration", "AccessTokenType", "EnableLocalLogin", "IncludeJwtId", "AlwaysSendClientClaims", "ClientClaimsPrefix", "PairWiseSubjectSalt", "Created", "Updated", "LastAccessed", "UserSsoLifetime", "UserCodeType", "DeviceCodeLifetime", "NonEditable")
VALUES(36, True, 'epzeu.pr.performance.test.client', 'oidc', True, 'epzeu.pr.performance.test.client', NULL, NULL, NULL, False, True, False, False, False, True, NULL, True, NULL, True, False, 300, 12000, 300, NULL, 2592000, 1296000, 1, False, 1, 0, True, False, False, NULL, NULL, '2020-03-31 13:39:30.957269', NULL, NULL, NULL, NULL, 300, False);

INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(12, NULL, 'YxkO//DXeO6N4r7FRPilSeB+b3/5P4v1sjcPOocyJfk=', NULL, 'SharedSecret', '2020-03-23 12:44:52.241473', 18);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(13, NULL, '26i3eSoB3YyRPA2PNEcdcPWDLwgv2WHh7vcxDme3cFQ=', NULL, 'SharedSecret', '2020-03-23 12:44:52.241084', 32);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(16, NULL, '9JP+EHEVoHjzAB134HZdauE5oTRe9+L7W4Btxs1lPQ4=', NULL, 'SharedSecret', '2020-03-23 12:44:52.165123', 21);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(18, NULL, '4yUbrDvmr2leD25efuWXbAE4dbwmTdQAJNyL/y4V2AE=', NULL, 'SharedSecret', '2020-03-23 12:44:52.24172', 20);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(19, NULL, 'QpPr8hwrMg1hxCvXNzXvXUXM+1N5tcyY1mANQ3tCwNY=', NULL, 'SharedSecret', '2020-03-23 12:44:52.219096', 23);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(20, NULL, 'ILLJ+lwcWlUKWRiahi6g0kZ0RDtsIN8xaRBa510i29E=', NULL, 'SharedSecret', '2020-03-23 12:44:52.218205', 22);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(21, NULL, 'zKWOfi29MJXLz/0vqEJS+3nDeRee1zLLKH7sOTyrenE=', NULL, 'SharedSecret', '2020-03-23 14:11:21.519124', 27);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(23, NULL, 'Hqs6l8FoVIy4v4oeNkrw54yQevs/EBhbTAqFOB+rCqY=', NULL, 'SharedSecret', '2020-03-23 14:12:49.187046', 28);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(24, NULL, 'kfqKBXXHGoVCLvgxYGzQsFcQkw5KVnQFQX0tF91RTQc=', NULL, 'SharedSecret', '2020-03-23 14:13:17.317152', 29);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(25, NULL, 'FvVzd1jQVtmRtft42StXnDgBv758LGuIw6RTjPfKDPw=', NULL, 'SharedSecret', '2020-03-30 10:45:45.022589', 25);
INSERT INTO idsrv."ClientSecrets" ("Id", "Description", "Value", "Expiration", "Type", "Created", "ClientId")
VALUES(26, NULL, 'mh5VZvMcZDElK8btqL8IbryYPkbs8j/ReFqsdO7Yaos=', NULL, 'SharedSecret', '2020-03-31 13:14:14.480376', 35);

COMMIT;

BEGIN;

INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(53, 'egov.edelivery.notification', 20);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(56, 'epzeu.cr.api', 21);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(57, 'integration.epzeu.api', 21);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(58, 'epzeu.pr.api', 21);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(59, 'payments.api', 21);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(64, 'integration.epzeu.api', 22);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(68, 'payments.api', 32);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(69, 'epzeu.cr.api', 32);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(70, 'epzeu.api', 32);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(75, 'egov.edelivery.service', 18);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(77, 'payments.api', 22);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(78, 'epzeu.api', 22);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(79, 'epzeu.cr.api', 28);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(87, 'epzeu.api.public', 26);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(88, 'epzeu.cr.api.public', 26);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(89, 'profile', 26);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(90, 'openid', 26);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(91, 'reau.api', 28);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(92, 'egov.edelivery.service', 22);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(93, 'payments.api', 29);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(94, 'epzeu.api', 26);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(96, 'epzeu.api.public', 29);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(97, 'epzeu.api', 29);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(102, 'epzeu.pr.api', 29);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(104, 'epzeu.api', 23);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(128, 'epzeu.pr.api', 33);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(129, 'profile', 33);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(130, 'epzeu.api', 33);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(131, 'openid', 33);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(132, 'epzeu.api.public', 33);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(137, 'epzeu.cr.api.public', 24);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(138, 'profile', 24);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(139, 'openid', 24);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(140, 'epzeu.api.public', 24);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(147, 'openid', 31);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(148, 'payments.api', 31);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(149, 'profile', 31);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(152, 'payments.api', 35);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(159, 'openid', 30);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(160, 'reau.api', 30);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(161, 'profile', 30);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(162, 'reau.api', 27);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(163, 'epzeu.api', 27);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(164, 'payments.api', 27);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(165, 'epzeu.cr.api', 27);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(166, 'integration.epzeu.api', 27);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(192, 'profile', 36);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(193, 'epzeu.api', 36);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(194, 'epzeu.api.public', 36);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(195, 'epzeu.pr.api', 36);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(196, 'openid', 36);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(453, 'roles', 25);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(454, 'openid', 25);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(455, 'email', 25);
INSERT INTO idsrv."ClientScopes" ("Id", "Scope", "ClientId")
VALUES(456, 'profile', 25);

COMMIT;

BEGIN;

INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(18, 'http://localhost/EPZEU.Web.Api.Public/swagger/oauth2-redirect.html', 26);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(19, 'http://localhost/EPZEU.Web.Api.Private/swagger/oauth2-redirect.html', 26);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(42, 'https://portal.dev.epzeu.dev.local/PR/Identity/SignIn.html', 33);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(43, 'https://portal.dev.epzeu.dev.local/PR/Identity/Renew.html', 33);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(48, 'https://portal.dev.epzeu.dev.local/CR/Identity/Renew', 24);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(49, 'https://localhost/EPZEU.CR.Web.App/Identity/SignIn', 24);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(50, 'https://localhost/EPZEU.CR.Web.App/Identity/Renew', 24);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(51, 'https://portal.dev.epzeu.dev.local/CR/Identity/SignIn', 24);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(64, 'https://payments.dev.epzeu.dev.local/swagger/oauth2-redirect.html', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(65, 'https://payments.dev.epzeu.dev.local/Identity/Renew', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(66, 'https://payments.dev.epzeu.dev.local/Identity/SignIn', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(67, 'https://localhost/Payments.Web.App/swagger/oauth2-redirect.html', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(68, 'https://localhost/Payments.Web.App/Identity/Renew', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(69, 'https://localhost/Payments.Web.App/Identity/SignIn', 31);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(78, 'https://localhost/PropertyRegister.REAU.Web.App/Identity/SignIn', 30);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(79, 'https://localhost/PropertyRegister.REAU.Web.App/Identity/Renew', 30);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(80, 'https://reau.dev.epzeu.dev.local/Identity/SignIn', 30);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(81, 'https://reau.dev.epzeu.dev.local/Identity/Renew', 30);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(92, 'https://portal.dev.epzeu.dev.local/pr/identity/SignIn.html', 36);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(93, 'https://portal.dev.epzeu.dev.local/pr/identity/Renew.html', 36);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(261, 'https://localhost/EPZEU.Web.IdentityServer.Admin/signin-oidc', 25);
INSERT INTO idsrv."ClientRedirectUris" ("Id", "RedirectUri", "ClientId")
VALUES(262, 'https://idsrv-admin.dev.epzeu.dev.local/signin-oidc', 25);

INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(14, 'https://localhost', 26);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(20, 'https://portal.dev.epzeu.dev.local', 33);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(23, 'https://localhost', 24);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(24, 'https://portal.dev.epzeu.dev.local', 24);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(27, 'https://localhost', 31);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(28, 'https://payments.dev.epzeu.dev.local', 31);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(32, 'https://localhost', 30);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(33, 'https://reau.dev.epzeu.dev.local', 30);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(37, 'https://portal.dev.epzeu.dev.local', 36);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(107, 'https://localhost', 25);
INSERT INTO idsrv."ClientCorsOrigins" ("Id", "Origin", "ClientId")
VALUES(108, 'https://idsrv-admin.dev.epzeu.dev.local', 25);

INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(24, 'client_credentials', 23);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(25, 'client_credentials', 22);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(26, 'delegation', 29);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(27, 'client_credentials', 29);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(28, 'delegation', 22);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(29, 'client_credentials', 21);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(31, 'delegation', 21);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(32, 'client_credentials', 18);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(34, 'implicit', 26);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(36, 'client_credentials', 28);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(37, 'client_credentials', 32);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(38, 'delegation', 32);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(39, 'weak_delegation', 32);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(44, 'client_credentials', 20);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(50, 'implicit', 33);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(52, 'implicit', 24);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(55, 'implicit', 31);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(58, 'implicit', 30);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(59, 'delegation', 27);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(60, 'client_credentials', 27);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(66, 'implicit', 36);
INSERT INTO idsrv."ClientGrantTypes" ("Id", "GrantType", "ClientId")
VALUES(170, 'hybrid', 25);

INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(36, 'https://portal.dev.epzeu.dev.local/pr/{lang}/SessionTimeout', 33);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(37, 'https://portal.dev.epzeu.dev.local/pr/SessionTimeout', 33);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(38, 'https://portal.dev.epzeu.dev.local/property-register', 33);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(42, 'https://localhost/EPZEU.CR.Web.App/{lang}/SessionTimeout', 24);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(43, 'https://portal.dev.epzeu.dev.local/CR/{lang}/SessionTimeout', 24);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(44, 'https://portal.dev.epzeu.dev.local/CR/SessionTimeout', 24);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(45, 'https://portal.dev.epzeu.dev.local/', 24);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(46, 'https://localhost/EPZEU.CR.Web.App/SessionTimeout', 24);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(52, 'https://localhost/Payments.Web.App/SessionTimeout', 31);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(53, 'https://localhost/Payments.Web.App/', 31);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(54, 'https://payments.dev.epzeu.dev.local/', 31);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(59, 'https://reau.dev.epzeu.dev.local/', 30);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(60, 'https://reau.dev.epzeu.dev.local/SessionTimeout', 30);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(61, 'https://localhost/PropertyRegister.REAU.Web.App/', 30);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(62, 'https://localhost/PropertyRegister.REAU.Web.App/SessionTimeout', 30);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(75, 'https://portal.dev.epzeu.dev.local/pr/{lang}/SessionTimeout', 36);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(76, 'https://portal.dev.epzeu.dev.local/pr/SessionTimeout', 36);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(77, 'https://portal.dev.epzeu.dev.local/property-register', 36);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(263, 'https://idsrv-admin.dev.epzeu.dev.local/signout-callback-oidc', 25);
INSERT INTO idsrv."ClientPostLogoutRedirectUris" ("Id", "PostLogoutRedirectUri", "ClientId")
VALUES(264, 'https://localhost/EPZEU.Web.IdentityServer.Admin/signout-callback-oidc', 25);

COMMIT;

BEGIN;

CREATE INDEX "IX_ApiClaims_ApiResourceId" ON idsrv."ApiClaims"
  USING btree ("ApiResourceId");

CREATE INDEX "IX_ApiProperties_ApiResourceId" ON idsrv."ApiProperties"
  USING btree ("ApiResourceId");

CREATE INDEX "IX_ApiScopeClaims_ApiScopeId" ON idsrv."ApiScopeClaims"
  USING btree ("ApiScopeId");

CREATE INDEX "IX_ApiScopes_ApiResourceId" ON idsrv."ApiScopes"
  USING btree ("ApiResourceId");

CREATE INDEX "IX_ApiSecrets_ApiResourceId" ON idsrv."ApiSecrets"
  USING btree ("ApiResourceId");

CREATE INDEX "IX_ClientClaims_ClientId" ON idsrv."ClientClaims"
  USING btree ("ClientId");

CREATE INDEX "IX_IdentityProperties_IdentityResourceId" ON idsrv."IdentityProperties"
  USING btree ("IdentityResourceId");

CREATE INDEX "IX_IdentityClaims_IdentityResourceId" ON idsrv."IdentityClaims"
  USING btree ("IdentityResourceId");

CREATE INDEX "IX_ClientSecrets_ClientId" ON idsrv."ClientSecrets"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientScopes_ClientId" ON idsrv."ClientScopes"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientRedirectUris_ClientId" ON idsrv."ClientRedirectUris"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientProperties_ClientId" ON idsrv."ClientProperties"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientCorsOrigins_ClientId" ON idsrv."ClientCorsOrigins"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientGrantTypes_ClientId" ON idsrv."ClientGrantTypes"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientIdPRestrictions_ClientId" ON idsrv."ClientIdPRestrictions"
  USING btree ("ClientId");

CREATE INDEX "IX_ClientPostLogoutRedirectUris_ClientId" ON idsrv."ClientPostLogoutRedirectUris"
  USING btree ("ClientId");

COMMIT;
