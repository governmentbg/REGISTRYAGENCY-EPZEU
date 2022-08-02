﻿UPDATE public.app_parameters SET description = 'Период от време, през който се изпращат неизпратените имейл съобщения.' WHERE CODE = 'EP_EML_POLLING_INTERVAL';
UPDATE public.app_parameters SET description = 'Имейл адрес, от който се пращат съобщенията.' WHERE CODE = 'EP_EML_SEND_FROM';
UPDATE public.app_parameters SET description = 'Адрес на SMTP сървър за изпращане на имейл съобщения.' WHERE CODE = 'EP_EML_SMTP_HOST';
UPDATE public.app_parameters SET description = 'Порт на SMTP сървър за изпращане на имейл съобщения.' WHERE CODE = 'EP_EML_SMTP_PORT';
UPDATE public.app_parameters SET description = 'Период от време за опресняване на номенклатури от Имотен Регистър.' WHERE CODE = 'PR_POLLING_INTERVAL';
UPDATE public.app_parameters SET description = 'Thumbprint на сертификата, чрез който се криптират ключовете при съхранение в базата данни. При неналичие, ключовете се съхраняват в явен вид в базата данни. Сертификатът трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.' WHERE CODE = 'CR_ASPNETCORE_DP_KEY_CERT_THUMBPRINT';
UPDATE public.app_parameters SET description = 'Име на опашка за обработка на заявки.' WHERE CODE = 'CR_PORTAL_QUEUE_NAME';
UPDATE public.app_parameters SET description = 'Идентификатор на Търговски регистър на B-Trust.' WHERE CODE = 'EP_SIGN_BTRUST_REMOTE_RELYINGPARTY_ID';
UPDATE public.app_parameters SET description = 'Ключ за ауторизация пред услугата за отдалечено подписване на Evrotrust.' WHERE CODE = 'EP_SIGN_EVROTRUST_VENDOR_API_KEY';
UPDATE public.app_parameters SET description = 'Номер на продавача (публичната част на ТР) в системата на Evrotrust.' WHERE CODE = 'EP_SIGN_EVROTRUST_VENDOR_NUM';
UPDATE public.app_parameters SET description = 'Адрес за сваляне на инструкции за инсталация и настройка на приложението за подписване BISS.' WHERE CODE = 'EP_ADDRESS_DOWNLOAD_BISS_INSTRUCTION';
UPDATE public.app_parameters SET description = 'Начална дата, определена от АВ от която е позволено на потребител на ЕПЗЕУ да извършва обединение на съществуващи профили от интегрираните регистри с неговия профил.' WHERE CODE = 'EP_USR_PROFILE_MIGRATION_STARTDATE';
UPDATE public.app_parameters SET description = 'Thumbprint на сертификата, чрез който се криптират ключовете при съхранение в базата данни. При неналичие, ключовете се съхраняват в явен вид в базата данни. Сертификатът трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.' WHERE CODE = 'EP_ASPNETCORE_DP_KEY_CERT_THUMBPRINT';
UPDATE public.app_parameters SET description = 'Thumbprint на сертификата, чрез който се подписват издадените token - и от сървъра за идентичност. Сертификатът трябва да бъде инсталиран в локалното хранилище за сертификати на всяка машина, на която работи услугата.' WHERE CODE = 'EP_IDSRV_SIGN_CERT_THUMBPRINT';
UPDATE public.app_parameters SET description = 'Път до конфигурационен файл на сървъра за лимитиране, където се съхранява конфигурацията за лимитиране.' WHERE CODE = 'EP_SERVICE_LIMIT_CFG_FILE';
UPDATE public.app_parameters SET description = 'Допустими типове файлове със статистически отчети, които могат да се прикачват.' WHERE CODE = 'EP_STATISTICS_ALLOWED_FORMATS';
UPDATE public.app_parameters SET description = 'Адрес на публичния портал на Търговския регистър.' WHERE CODE = 'GL_CR_PUBLIC_UI_URL';
UPDATE public.app_parameters SET description = 'Допустими типове файлове с документи, които могат да се прикачват.' WHERE CODE = 'GL_DOCUMENT_ALLOWED_FORMATS';
UPDATE public.app_parameters SET description = 'Адрес на публичния портал на Имотния регистър.' WHERE CODE = 'GL_PR_PUBLIC_UI_URL';