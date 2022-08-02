
INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'BASE_DATA_SERVICE_LIMIT', E'Базов лимит за предоставяне на данни', 1, 
	E'00:00:01', 3
)
ON CONFLICT DO NOTHING;


INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_REGISTRATION_LIMIT', E'Регистрация на потребител', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;


INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_SEARCH_LIMIT', E'Търсене в съдържание в публичния портал', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;


INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_PASS_LIMIT', E'Забравена парола', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_LOGIN_LIMIT', E'Автентикация на потребител', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;


INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'CR_REPORT_LIMIT', E'Справки', 2, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'CR_APPLICATION_PREVIEW_LIMIT', E'преглед на подадено заявление', 2, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'CR_DOWNLOAD_DOCUMENT_LIMIT', E'Сваляне на документи', 2,
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'PR_SEARCH_FOR_AN_OBJECT_LIMIT', E'допустим максимален брой заявки за търсене на обект в ИР, на базата на зададени от потребителя критерии за търсене', 3,
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'PR_REPORT_LIMIT', E'допустим максимален брой на заявки за справката', 3,
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'PR_APPLICATION_PREVIEW_LIMIT', E'допустим максимален брой заявки за преглед на заявление по неговия номер', 3,
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'PR_DOWNLOAD_DOCUMENT_LIMIT', E'допустим максимален брой на заявки за сваляне на документ', 3,
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'MAX_COUNT_REQUEST_SERVICE_POWER', E'допустим максимален брой на заявки за изчитане на информация за представители от ТРРЮЛНЦ', 2, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;


INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_USR_PROFILE_MIGRATION_UNSUCCESSFUL_LOGIN_LIMIT', E'Максимален брой неуспешни опити за логване в потребителски профил, подлежащ на обединение', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;

INSERT INTO
public.data_service_limits (
	"service_limit_id", "service_limit_ver_id", "status",
	"is_last", "deactivation_ver_id", "created_by", "created_on", "updated_by", "updated_on",
	"service_code", "service_name", "module_id",
	"requests_interval", "requests_number"
	)
VALUES(
	(select COALESCE(MAX("service_limit_id"), 0) + 1 FROM public.data_service_limits), public.f_get_next_version_id(), 1,
    1::BIT, NULL, 1, sys.f_current_timestamp(), 1, sys.f_current_timestamp(),
	E'EP_USR_PROFILE_MIGRATION_SUCCESSFUL_LOGIN_LIMIT', E'Максимален брой на опити за логване в потребителски профил, подлежащ на обединение в секунда', 1, 
	E'00:00:01', 1
)
ON CONFLICT DO NOTHING;