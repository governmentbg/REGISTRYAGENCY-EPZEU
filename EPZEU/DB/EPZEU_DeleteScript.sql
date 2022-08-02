-- app 
-- 
TRUNCATE TABLE app.applications;

-- aspnetcore
--
TRUNCATE TABLE aspnetcore.data_protection_keys;

-- audit
--
TRUNCATE TABLE audit.log_actions;

-- cms
--
-- Бюлетин
TRUNCATE TABLE cms.bulletins;
-- Забранени думи
TRUNCATE TABLE cms.forbidden_words;
-- Html страници
TRUNCATE TABLE cms.html_pages_i18n;
DELETE FROM cms.html_pages WHERE type = 1;
-- Страници
TRUNCATE TABLE cms.pages_i18n;
DELETE FROM cms.pages WHERE parent_id IS NOT NULL;
-- Съобщения
TRUNCATE TABLE  cms.message_recipients, cms.messages;
-- Новини
TRUNCATE TABLE cms.news_documents, cms.news_i18n, cms.news;
-- Форум
TRUNCATE TABLE cms.themes_comments, cms.themes;
-- Видео уроци
TRUNCATE TABLE cms.video_lessons_i18n, cms.video_lessons;


-- eml
--
TRUNCATE TABLE eml.email_messages;

-- idsrv
--
TRUNCATE TABLE idsrv.persisted_grants;


-- nom
--
-- Услуги
TRUNCATE TABLE nom.d_services_i18n;
DELETE FROM nom.d_services;
--
-- Шаблони за декларации
TRUNCATE TABLE nom.d_document_templates;
--
-- Преводи на зявления
TRUNCATE TABLE nom.s_application_types_i18n;

-- pmt
--
-- Плащания
TRUNCATE TABLE pmt.payment_messages;

-- public
--
-- Лимити на потребител 
TRUNCATE TABLE public.data_service_user_limits;
--
-- версии
TRUNCATE TABLE public.versions;

-- sign
--
TRUNCATE TABLE sign.signers, sign.signing_processes;

-- stats
--
-- Статистики
TRUNCATE TABLE stats.statistics_i18n, stats.statistic_reports, stats.statistics;

-- sys
--
TRUNCATE TABLE sys.service_operations;

TRUNCATE TABLE sys.document_data_temp;

-- usr
--
-- Потребители - трябва да се види кои потребител остават (Аблена Рашкова, Албена Христова, Мария Димитрова, Атанас)
-- остават само системните потребители и се прави потребител на Аблена Рашкова
--
TRUNCATE TABLE usr.account_migration_processes;
TRUNCATE TABLE usr.login_sessions;			
TRUNCATE TABLE usr.user_authentications, usr.certificates;
TRUNCATE TABLE usr.user_access_request_docs, usr.user_access_requests;
TRUNCATE TABLE usr.user_failed_login_attempts;
TRUNCATE TABLE usr.user_permissions;
TRUNCATE TABLE usr.user_processes;
TRUNCATE TABLE usr.user_subscriptions;
TRUNCATE TABLE usr.users_audit;
TRUNCATE TABLE usr.users_h;
--
UPDATE nom.d_labels SET created_by = 1, updated_by = 1;
UPDATE nom.d_labels_i18n SET created_by = 1, updated_by = 1;
UPDATE nom.d_languages SET created_by = 1, updated_by = 1;
UPDATE cms.pages SET created_by = 1, updated_by = 1;
UPDATE pmt.ra_registration_data SET created_by = 1, updated_by = 1;
UPDATE public.app_parameters SET created_by = 1, updated_by = 1;
UPDATE public.data_service_limits SET created_by = 1, updated_by = 1;
UPDATE cms.html_pages SET created_by = 1, updated_by = 1;
--
DELETE FROM usr.users WHERE is_system = false;



-- create admin user
-- 
SELECT sys.f_currentuser_set(1);

SELECT usr.f_users_create(
	'a.rashkova@cnsys.bg', -- p_email character varying>, 
	'Албена',              -- <p_first_name character varying>, 
	NULL,                  -- <p_middle_name character varying>, 
	'Рашкова',             -- <p_family_name character varying>, 
	NULL,                  -- <p_contact_data character varying>, 
	NULL,                  -- <p_organization character varying>, 
	NULL,                  -- <p_special_user_access_type integer>, 
	NULL,                  -- <p_cr_bulletin_acceptance boolean>, 
	NULL,                  -- <p_pr_bulletin_acceptance boolean>, 
	NULL,                  -- <p_cr_message_acceptance boolean>, 
	NULL,                  -- <p_pr_message_acceptance boolean>, 
	NULL,                  -- <p_epzeu_message_acceptance boolean>, 
	1                      -- <p_status integer>, 
);

SELECT usr.f_user_authentications_create(
	17604,                               -- <p_user_id integer>, 
	2::smallint,                         -- <p_authentication_type smallint>, 
	NULL,                                -- <p_password_hash character varying>, 
	'registryagency\albena.rashkova',    -- <p_username character varying>, 
	NULL                                 -- <p_certificate_id integer>, 
);

INSERT INTO usr.user_permissions(
	 user_id, permission_id, is_active, created_by, created_on, updated_by, updated_on)
SELECT 17604, permission_id, true, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp()
FROM usr.n_s_permissions 






























