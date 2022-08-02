INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID,
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    12, 'PR_REAU_API','Базов адрес за достъп до услуги на РЕАУ на ИР.',
	3, 'https://vm-av-epzeu-ap1.dev.local:12443/Api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'GL_EPZEU_API','Базов адрес за достъп до вътрешни услуги на ЕПЗЕУ.', 
	3, 'https://localhost/EPZEU.Web.Api.Private/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'GL_EPZEU_PUBLIC_API','Базов адрес за достъп до публични услуги на ЕПЗЕУ.', 
	3, 'https://localhost/EPZEU.Web.Api.Public/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'GL_IDSRV_URL','Базов адрес на сървър за автентикация.', 
	3, 'https://localhost/epzeu.web.identityserver/'
)
ON CONFLICT DO NOTHING;



INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID,CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0)+ 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_COPY_BUFFER_SIZE','Големина на буфер за копиране на данни. Използва се при прехвърляне на данни, като това е размера на буфера в байтове.', 
	4, 1048576
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    10, 'CR_REGISTER_API','Базов адрес за достъп до услуги на ИС на ТРРЮЛНЦ.', 
	3, 'https://localhost/Integration.EPZEU.Api/api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    12, 'PR_REGISTER_API','Базов адрес за достъп до услуги по регистриране на заявления на ИС на ИР.',
	3, 'https://clients.crossroad.bg/IISCPRWebRegisterApi/api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID,
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    12, 'PR_WEB_API','Базов адрес за достъп до публични услуги на ИС на ИР.',
	3, 'https://clients.crossroad.bg/iiscprwebapi/api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    2, 'EP_INTGR_IISDA_ADM_SERVICES_API','Адрес на услуга за достъп до административните услуги в ИИСДА. Използва се за извличане на информация относно услуги.', 
	3, 'https://vm-iisda-app1.dev.local:19001/AdmServices.IntegrationServices/AdmServicesService.svc'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    2, 'EP_INTGR_IISDA_RA_BATCH_NUMBER','Номера на партида на Агенция по вписванията от административен регистър в ИИСДА. Използва се за извличане на информация относно услуги.', 
	3, '933'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'GL_API_TRY_COUNT','Брой опити за извикване на услуга.', 
	4, 3
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'GL_API_RETRY_INTERVAL','Период от време за изчакване между два опита за извикване на услуга.', 
	2, '00:00:01'
)
ON CONFLICT DO NOTHING;



INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_POLLING_INTERVAL','Период от време за опресняване на данни. Използва се при опресняване на номенклатури, системни параметри.', 
	2, '00:00:13'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID,
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    9, 'PR_POLLING_INTERVAL','Период за опресняване на номенклатури от Имотен Регистър.',
	2, '1 day'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_FORUM_ADMIN_EMAIL','Параметърът определя адрес на администратора на форума в ЕПЗЕУ.', 
	3, 'S.Kairiakova@cnsys.bg'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_REPORTS_AUTO_GENERATE_INTERVAL','Параметърът определя период от време, през който се извършва автоматично генериране на статистики.', 
	2, '2 days'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_DATETIME)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_PROFILE_MIGRATION_DEADLINE','Крайна дата, определена от АВ, до която е позволено на потребител на ЕПЗЕУ да извършва обединение на съществуващи профили от интегрираните регистри с неговия профил.', 
	1, '2019-01-01 00:00:00'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_DOCUMENT_ALLOWED_FORMATS','Допустими типове файлове с документи, които могат да се прикачат.', 
	3, '[{"extension": "docx", "mimeTypes": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]},{"extension": "doc", "mimeTypes": ["application/msword"]},{"extension": "txt", "mimeTypes": ["text/plain"]},{"extension": "pdf", "mimeTypes": ["application/pdf", "application/x-pdf"]},{"extension": "xls", "mimeTypes": ["application/vnd.ms-excel", "application/excel"]},{"extension": "xlsx", "mimeTypes": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]},{"extension": "ppt", "mimeTypes": ["application/mspowerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]},{"extension": "jpg", "mimeTypes": ["image/jpeg", "image/pjpeg"]}]'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_VIDEO_ALLOWED_FORMATS','Допустими типове видео файлове, които могат да се прикачат в модул Съдържание.', 
	3, '[{"extension": "avi", "mimeTypes": ["application/x-troff-msvideo", "video/avi", "video/msvideo", "video/x-msvideo"]},{"extension": "mp3", "mimeTypes": ["audio/mpeg3", "audio/x-mpeg-3", "video/mpeg", "video/x-mpeg"]},{"extension": "mp4", "mimeTypes": ["video/mp4", "application/mp4", "audio/mp4"]},{"extension": "mpg", "mimeTypes": ["video/mpeg"]},{"extension": "mpeg", "mimeTypes": ["video/mpeg"]},{"extension": "wmv", "mimeTypes": ["video/x-ms-wmv"]}]'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_IMAGE_ALLOWED_FORMATS','Допустими типове файлове с изображения, които могат да се прикачат в модул Съдържание.', 
	3, '[{"extension": "jpg", "mimeTypes": ["image/jpeg", "image/pjpeg", "image/jpg"]},{"extension": "jpeg", "mimeTypes": ["image/jpeg"]},{"extension": "png", "mimeTypes": ["image/png"]},{"extension": "gif", "mimeTypes": ["image/gif"]},{"extension": "bmp", "mimeTypes": ["image/bmp", "image/x-windows-bmp"]}]'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_PROCESS_CONFIRM_PERIOD','Период от време за изчакване на потвърждение от потребител при стартиран процес за регистрация на профил или смяна на парола.', 
	2, '2 days'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LOCK_FOR_PERIOD','Период от време за изчакване преди да бъде автоматично отключен потребителския профил след определен брой неуспешни опити за автентикация.', 
	2, '01:00:00'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LOCK_FOR_PERIOD','Период от време за изчакване преди да бъде автоматично отключен потребителския профил след определен брой неуспешни опити за автентикация.', 
	2, '01:00:00'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_MAX_LOGIN_ATTEMPT_COUNT','Максимален брой неуспешни опити за автентикация на потребител.', 
	4, '10'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'EP_INTGR_IISDA_ADM_SERVICES_INTERVAL','Период от време, през който се синхронизират данни за услуги от ИИСДА.', 
	2, '2 days'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'EP_INTGR_IISDA_STALE_DATA_PERIOD','Период от време, след който информацията за услугите от ИИСДА се счита за остаряла.', 
	2, '2 days'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_DOCUMENT_MAX_FILE_SIZE','Допустим размер на прикачен файл с документ в KB.', 
	4, '10240'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_VIDEO_MAX_FILE_SIZE','Допустим размер на файл с видео в KB.', 
	4, '10240'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_IMAGE_MAX_FILE_SIZE','Допустим размер на файл с изображение в KB.', 
	4, '3072'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    1, 'EP_AUDIT_ARCHIVE_DATA_PERIOD','Период от време, след който одитните записи могат да се архивират.', 
	2, '365 days'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    1, 'EP_AUDIT_ARCHIVE_PROCESS_INTERVAL','Период от време, през който ЕПЗЕУ ще прави архивиране на одитни записи за период.', 
	2, '30 days'
)
ON CONFLICT DO NOTHING;



INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_SMTP_HOST','Адрес на SMTP сървър за изпращане на емайл съобщения.', 
	3, 'devmail.dev.local'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_SMTP_PORT','Порт на SMTP сървър за изпращане на емайл съобщения.', 
	4, 25
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_SMTP_USER','Потребител за достъп до SMTP сървър.', 
	3, 'dev\mailsender'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_SMTP_PASSWORD','Парола на потребител за достъп до SMTP сървър.', 
	3, 'R1r2r3r4'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_SEND_FROM','Емайл адрес от който се пращат съобщенията.', 
	3, 'mailsender@dev.local'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_POLLING_INTERVAL','Период от време, на който се изпращат неизпратените емайл съобщения.', 
	2, '3 seconds'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    13, 'EP_EML_MAX_EMAILS_FETCHED','Максимален брой съобщения, които могат да бъдат взети при една итерация.', 
	4, 25
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_VERSION','Версия на системата', 
      3, '0.5.0.0'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_INT)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_SUBSCRIPTION_MAX_OBJ_COUNT','Максимален брой партиди/обекти, за които може да бъде заявен абонамент от регистър.', 
    4, 5
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_INT)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_NEWS_COUNT_FOR_HOME','Брой новини на начална страница.', 
    4, 3
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_INT)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_ITEMS_PER_PAGE','Брой елементи на страница.', 
    4, 10
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_INT)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_MIN_SEARCH_LETTERS_COUNT','Минимален брой символи при търсене в съдържание.', 
    4, 5
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_IDSRV_SIGN_CERT_THUMBPRINT','Thumbprint на сертификата, чрез който се подписват издадените token - и от сървъра за идентичност. Сертификата трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.', 
      3, ''
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_ASPNETCORE_DP_KEY_CERT_THUMBPRINT', 'Thumbprint на сертификата, чрез който се криптират ключовете при съхранение в базата данни. При неналичие, ключовете се съхраняват в явен вид в базата данни. Сертификата трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.', 
      3, ''
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    10, 'CR_ASPNETCORE_DP_KEY_CERT_THUMBPRINT', 'Thumbprint на сертификата, чрез който се криптират ключовете при съхранение в базата данни. При неналичие, ключовете се съхраняват в явен вид в базата данни. Сертификата трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.', 
      3, ''
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_EPZEU_PUBLIC_UI_URL','Адрес на публичния портал.', 
	3, 'https://vm-av-epzeu-ap1.dev.local:10443/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_STATISTICS_ALLOWED_FORMATS','Допустими типове файлове със статистически отчети, които могат да се прикачат.', 
	3, '[{"extension": "pdf", "mimeTypes": ["application/pdf"]},{"extension": "csv", "mimeTypes": ["application/csv", "text/csv"]},{"extension": "xml", "mimeTypes": ["application/xml", "text/xml"]},{"extension": "xls", "mimeTypes": ["application/vnd.ms-excel", "application/excel", "application/x-excel", "application/x-msexcel"]},{"extension": "xlsx", "mimeTypes": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}]'
)
ON CONFLICT DO NOTHING;



INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_SERVICE_LIMIT_DOMAIN','Домейн в рамките на услугата за лимитиране.', 
      3, 'epzeu_dev'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_SERVICE_LIMIT_SERVER','Адрес на сървъра за лимитиране. Пример: localhost:8081.', 
      3, 'vm-av-epzeu-rl1.dev.local:8081'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_INT)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_SERVICE_LIMIT_DISABLED','Параметърът спира използването на услугата за лимитиране при стойност > 0. При стойност 0 се използва услугата за лимитиране.', 
    4, 0
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_SERVICE_LIMIT_CFG_FILE','Път до конфигурационнен файл на сървъра за лимитиаране, където се съхранява конфигурацията за лимитиране.', 
      3, '/root/src/runtime/data2/ratelimit/config/epzeu_dev.yaml'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_SERVICE_LIMIT_ON_SYNC_PROCESS','Процес, който се стартира след промяна на конфигурацията на услугата за лимитиране.', 
      3, 'bash'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_SERVICE_LIMIT_ON_SYNC_PROCESS_ARGS','Аргументи, които се подават на процеса, който се стартира след промяна на конфигурацията на услугата за лимитиране.', 
      3, '/root/src/runtime/reload.sh'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_PR_PUBLIC_UI_URL','Адрес на публичния портал Имотен регистър.', 
    3, '/PR'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_CR_PUBLIC_UI_URL','Адрес на публичния портал Търговски регистър.', 
    3, '/CR'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_CR_API','Базов адрес за достъп до услуги на Търговски регистър.', 
    3, 'https://vm-av-epzeu-ap1.dev.local:10443/cr/api'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_CR_PORTAL_API','Базов адрес за достъп до портала за услуги на Търговски регистър.', 
    3, 'https://portal.dev.epzeu.dev.local/CR/api'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_POLLING_INTERVAL','Период от време за опресняване на данни. Използва се при опресняване на номенклатури, етикети и системни параметри в ЕПЗЕУ.', 
	2, '03:00:00'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    3, 'GL_PAYMENTS_API', 'Базов адрес за достъп до услуги на модул Плащания.', 
	3, 'https://vm-av-epzeu-ap1.dev.local:13443/Payments.Web.Api/api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    7, 'EP_CMS_DOCUMENT_ALLOWED_FORMATS','Допустими типове файлове с документи, които могат да се прикачат в страниците с HTML съдържание и нормативни документи.', 
	3, '[{"extension": "docx", "mimeTypes": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"]},{"extension": "doc", "mimeTypes": ["application/msword"]},{"extension": "txt", "mimeTypes": ["text/plain"]},{"extension": "pdf", "mimeTypes": ["application/pdf", "application/x-pdf"]},{"extension": "xls", "mimeTypes": ["application/vnd.ms-excel", "application/excel"]},{"extension": "xlsx", "mimeTypes": ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]},{"extension": "ppt", "mimeTypes": ["application/mspowerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation"]},{"extension": "jpg", "mimeTypes": ["image/jpeg", "image/pjpeg"]},{"extension": "zip", "mimeTypes": ["application/x-compressed", "application/zip", "application/octet-stream", "application/x-zip-compressed", "multipart/x-zip"]}]'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_BSECURE_DSSL_API','Базов адрес за достъп до услугата BSecure DSSL на B-Trust.', 
	3, 'http://vm-av-epzeu-ap1.dev.local:9090/BSecureDSSL/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_BISS_CERT_THUMBPRINT','Тhumbprint на сървърен сертификат за криптиране на комуникацията между ЕПЗЕУ и BISS - локална услуга за подписване в браузер.', 
	3, '4cc45a3b4660b7b259bfe772230c313e27ff30f0'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    6, 'EP_SERVICE_DESCRIPTION_LENGTH','Максимална дължина на описание на услуга при показване в таблица в административен панел.', 
	4, 300
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    8, 'EP_INTGR_NRA_API','Адрес на НАП за вход с ПИК.', 
	3, 'https://localhost/EPZEU.Web.NRA.IdentitySimulator/Token'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_HOST','Адрес на сървъра за активна директория.', 
	3, 'KIA.cnsys.plc:389'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_USERNAME','Потребител за достъп до LDAP сървър.', 
	3, 'Ldap-reader'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_PASSWORD','Парола на потребител за достъп до LDAP сървър.', 
	3, 'r1r2r3r4'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_BASE_DN','Параметри за търсене в активна директория.', 
	3, 'OU=Software department,OU=CNsys Users,DC=cnsys,DC=plc'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_ACCOUNT_DOMAIN_NAME','Име на домейн за LDAP.', 
	3, 'cnsys.plc'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_ACCOUNT_DOMAIN_NAME_SHORT','Кратко име на домейн за LDAP.', 
	3, 'cnsys'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_USE_SSL', 'Използване на сигурна връзка с активна директория.', 
	4, 0
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_SESSION_INACTIVITY_INTERVAL', 'Период на изтичане на потребителска сесия при неактивност.', 
	2, '00:20:00'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_ADDRESS_DOWNLOAD_SIGNING_APPLICATION', 'Адрес, от който трябва да се свали приложението за подписване.', 
	3, 'https://www.b-trust.org/web/files/richeditor/filemanager/Downloads/BISS/BissSetup.exe'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INTERVAL)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'GL_APPLICATION_DRAFTS_AUTO_SAVE_INTERVAL', 'Интервал на запазване на черновата на заявлението.', 
	2, '00:01:00'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_BTRUST_REMOTE_CLIENT_API','Базов адрес за достъп до услугата за отдалечено подписване на B-Trust.', 
	3, 'https://cqes-rptest.b-trust.bg/signing-api/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_BTRUST_REMOTE_CLIENT_CERT','Сертификат за ауторизация пред услугата за отдалечено подписване на B-Trust.', 
	3, '2d545b381b3b23b60b0118561f0d88706a12dbc6'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID','Идентификатор на Търговски регист на B-Trust.', 
	3, '683453248'
)
ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_EVROTRUST_CLIENT_API','Базов адрес за достъп до услугата за отдалечено подписване на Evrotrust.', 
	3, 'https://et.test.iteco.bg/vendor/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_EVROTRUST_VENDOR_NUM','Номер на продавача (публичната част на ТР) във системата на Evrotrust.', 
	3, 'A8yJcmhFzxEt4EQ6'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_EVROTRUST_VENDOR_API_KEY','Ключ за ауторизацич пред услугата за отдалечено подписване на Evrotrust.', 
	3, 'e600c075-7ce7-46a0-b425-991a5aa7e0e1'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_EVROTRUST_CALLBACK_BASE_URL','Базов адрес, на който Evrotrust да извести за промяна в статуса на документ за подписване.', 
	3, 'https://reverse-proxy.cnsys.bg/EPZEU_PR900293/dev/api/api/EvrotrustCallback/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_ALLOW_TEST_SIGN','Позволява тестово подписване на заявления и прикачени документи към тях (показва - 1/скрива - 0 бутона за тестово подписване) със сървърния сертификат, който се ползва при криптиране на комуникацията с BISS.', 
	4, 1
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_COMMON_COOKIE_DOMAIN','Домейн, в който да се издават общите бисквитки между отделните сайтове в ЕПЗЕУ.', 
	3, 'dev.epzeu.dev.local'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_EPZEU_QUEUES_CONN_STRING_DOTNET','Връзка към Oracle база данни на .NET за опашки.', 
	3, 'User ID=epzeu_queues_dev; Password=epzeu_queues_dev; Data Source=(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = av-cr-scan.dev.local)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = comreg)));'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID,
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    9, 'GL_EPZEU_QUEUES_CONN_STRING_JAVA','Връзка към Oracle база данни на Java за опашки.',
	3, 'jdbc:oracle:thin:epzeu_queues_dev/epzeu_queues_dev@av-cr-scan.dev.local:1521/comreg'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    10, 'CR_PORTAL_QUEUE_NAME','Име на опашка за при обработка на заявки.', 
	3, 'Q_CR_PORTAL'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    12, 'PR_PORTAL_QUEUE_NAME','Име на опашка за при обработка на заявки.', 
	3, 'Q_PR_PORTAL'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_API_QUEUE_NAME','Име на опашка за обработка на процесите в ЕПЗЕУ.', 
	3, 'Q_EPZEU_API'
) ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'GL_PR_API','Базов адрес за достъп до услуги на Имотен регистър.', 
    3, 'https://portal.qa.epzeu.dev.local/PR/api'
)

ON CONFLICT DO NOTHING;


INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID,
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
      PARAM_TYPE, VALUE_STRING)
VALUES(
      (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    9, 'GL_BULSTAT_API','Базов адрес за достъп до услуги на БУЛСТАТ.',
    3, 'http://172.17.3.31:8080/bulstat/services/'
)

ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    10, 'CR_DB_CONNECTION_STRING','Връзка към базата данни на портала на ТРРЮЛНЦ. Трябва да бъде във формат за Npgsql драйвър.', 
	3, 'User Id=epzeu_dev; Password=epzeu_dev; Host=vm-av-epzeu-db2.dev.local; Port=5432; Database=epzeu_cr_dev;'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    12, 'PR_DB_CONNECTION_STRING','Връзка към базата данни на портала на Имотен Регистър.', 
	3, 'jdbc:postgresql://vm-av-epzeu-db2.dev.local:5432/epzeu_pr_dev?user=epzeu_dev&password=epzeu_dev'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID,
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,

    FUNCTIONALITY_ID, CODE, DESCRIPTION,
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(),
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(),
    False, 1::BIT, NULL,

    12, 'PR_PUBLIC_PORTAL_BASE_URL','Базов адрес за достъп до публичен Портал на ИР.',
	3, 'https://portal.dev.epzeu.dev.local/PR/'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_DB_CONNECTION_STRING','Връзка към базата данни на ЕПЗЕУ. Трябва да бъде във формат за Npgsql драйвър.', 
	3, 'User Id=epzeu_dev; Password=epzeu_dev; Host=vm-av-epzeu-db2.dev.local; Port=5432; Database=epzeu_dev;'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_LDAP_FILTER','Филтър за търсене в активна директория.', 
	3, '(&(CN=*)(objectclass=user)(objectcategory=person))'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'CR_PORTAL_HASHKEY','Ключ 64 байта за подписване/хеширане на идентификатори, участващи в URL адреси; кодирано в base64;', 
	3, 'JuMT5s59MBwUc/c8uUmCUkW5NXtRIAhPNlG8EnIDXTBDlRViVjOBfP4uojTaL49mcOISMD0Ve5x6lJrNMwZ8qw=='
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_DATETIME)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_PROFILE_MIGRATION_STARTDATE','Начална дата, определена от АВ от която е позволено на потребител на ЕПЗЕУ да извършва обединение на същестсвуващи профили от интегрираните регистрите с неговия профил.', 
	1, '2019-01-01 00:00:00'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_OSS_DB_CONNECTION_STRING','Връзка към базата данни на OSS.', 
	3, 'User ID=pr_reau_dev;Password=pr_reau_dev; Data Source=(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = av-cr-scan.dev.local)(PORT = 1521))(CONNECT_DATA =(SERVER = DEDICATED)(SERVICE_NAME = comreg)));'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_MGR_PROCESSING_APP_MAX_COUNT','Максимален брой заявления записи, които да се обработят при една итерация по миграция на потребител.', 
	4, '10'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_ADDRESS_DOWNLOAD_BISS_INSTRUCTION', 'Адрес, за сваляне на инструкции за инсталация и настройка на приложението за подписване BISS.', 
	3, 'https://www.b-trust.bg/attachments/BtrustPrivateFile/25/docs/Instruktsiya-za-instalirane-i-nastroyka-na-BISS.pdf'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_SIGNATURE_LEVEL','Конфигурира какво ниво на подпис да използва модула за подписване.Възможни стойности: BASELINE_B, BASELINE_T, BASELINE_LT и BASELINE_LTA', 
	3, 'BASELINE_LT'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    14, 'EP_SIGN_SKIP_VALIDATION_AFTER_SIGN','Флаг, указващ дали модула за подписване да валидира след полагане на подпис в документ. При 0 прави валидация, при > 0 не прави.', 
	4, '0'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_STRING)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    5, 'EP_USR_X509_CONFIG','X509 конфигурация.', 
	3, '{ 	"IssuerConfigs": [{	"Name": "Default",	"CertificateProperties": [{	"Name": "Identifier",	"Field": "Subject",	"Patterns": [{	"Priority": 1,	"Value": "PNO..\\s*-\\s*(?<Identifier>[A-Za-zА-Яа-я0-9]*)"	}, {	"Priority": 2,	"Value": "PAS..\\s*-\\s*(?<Identifier>[A-Za-zА-Яа-я0-9]*)"	}, {	"Priority": 3,	"Value": "TIN..\\s*-\\s*(?<Identifier>[A-Za-zА-Яа-я0-9]*)"	}, {	"Priority": 4,	"Value": "IDC..\\s*-\\s*(?<Identifier>[A-Za-zА-Яа-я0-9]*)"	}, {	"Priority": 5,	"Value": "SERIALNUMBER\\s*=(?<Identifier>[A-Za-zА-Яа-я0-9-]*)"	}	]	}, {	"Name": "OrganizationIdentifier",	"Field": "Subject",	"Patterns": [{	"Priority": 1,	"Value": "2.5.4.97\\s*=\\s*(?<OrganizationIdentifier>[A-Za-zА-Яа-я0-9\\-]*)"	}	]	}, {	"Name": "CommonName",	"Field": "Subject",	"Patterns": [{	"Priority": 1,	"Value": "CN\\s*=\\s*(?<CommonName>[A-Za-zА-Яа-я0-9\\s]*)"	}	]	}, {	"Name": "GivenName",	"Field": "Subject",	"Patterns": [{	"Priority": 1,	"Value": "G\\s*=\\s*(?<GivenName>[A-Za-zА-Яа-я0-9\\s]*)"	}	]	}, {	"Name": "Surname",	"Field": "Subject",	"Patterns": [{	"Priority": 1,	"Value": "SN\\s*=\\s*(?<Surname>[A-Za-zА-Яа-я0-9\\s]*)"	}	]	}	]	} 	] }'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(     APP_PARAM_ID, APP_PARAM_VER_ID, 
      CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
      
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
      PARAM_TYPE, VALUE_STRING)
VALUES(
    (select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,    
    9, 'EP_IDSRV_CONFIG_DB_CONNECTION_STRING', 'Връзка към базата данни на Admin-a на Идентити сървъра. Трябва да бъде във формат за Npgsql драйвър.', 
    3, 'User Id=idsrv_dev;Password=idsrv_dev;Host=vm-av-epzeu-db2.dev.local;Port=5432;Database=idsrv_dev;Application Name=EPZEU.Web.IdentityServer.Admin;SearchPath=idsrv;'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_NRA_AUTH_ENABLED','Флаг, указващ дали входа с ПИК на НАП е позволен.', 
	4, '1'
)
ON CONFLICT DO NOTHING;

INSERT INTO public.app_parameters
(	APP_PARAM_ID, APP_PARAM_VER_ID, 
	CREATED_BY, CREATED_ON, UPDATED_BY, UPDATED_ON,
    IS_SYSTEM, IS_LAST, DEACTIVATION_VER_ID,
	
    FUNCTIONALITY_ID, CODE, DESCRIPTION, 
	PARAM_TYPE, VALUE_INT)
VALUES(
	(select COALESCE(MAX(APP_PARAM_ID), 0) + 1 FROM public.app_parameters), public.f_get_next_version_id(), 
    sys.f_currentuser_get(), sys.f_current_timestamp(), sys.f_currentuser_get(), sys.f_current_timestamp(), 
    False, 1::BIT, NULL,
    
    9, 'EP_CERT_AUTH_ENABLED','Флаг, указващ дали входа с КЕП е позволен.', 
	4, '1'
)
ON CONFLICT DO NOTHING;