CREATE TABLE public.data_service_limits (
  service_limit_id INTEGER NOT NULL,
  service_limit_ver_id INTEGER NOT NULL,
  service_code VARCHAR(100) NOT NULL,
  service_name VARCHAR(500) NOT NULL,
  module_id SMALLINT NOT NULL,
  requests_interval INTERVAL(0) NOT NULL,
  requests_number INTEGER NOT NULL,
  status INTEGER NOT NULL,
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT data_service_limits_pkey PRIMARY KEY(service_limit_id, service_limit_ver_id),
  CONSTRAINT data_service_limits_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT data_service_limits_module_id_fk FOREIGN KEY (module_id)
    REFERENCES public.n_s_modules(module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT data_service_limits_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE public.data_service_limits
  ALTER COLUMN service_limit_ver_id SET STATISTICS 0;

COMMENT ON TABLE public.data_service_limits
IS 'Лимити за услуги за предоставяне на данни';

COMMENT ON COLUMN public.data_service_limits.service_limit_id
IS 'Идентификатор на лимит';

COMMENT ON COLUMN public.data_service_limits.service_limit_ver_id
IS 'Идентификатор на версия на лимит';

COMMENT ON COLUMN public.data_service_limits.service_code
IS 'Код на услуга за предоставяне на данни';

COMMENT ON COLUMN public.data_service_limits.service_name
IS 'Наименование на услуга за предоставяне на данни';

COMMENT ON COLUMN public.data_service_limits.module_id
IS 'Уникален идентификатор на портал/система';

COMMENT ON COLUMN public.data_service_limits.requests_interval
IS 'Период от време';

COMMENT ON COLUMN public.data_service_limits.requests_number
IS 'Максимален брой заявки за периода от време';

COMMENT ON COLUMN public.data_service_limits.status
IS 'Статус на лимит: 0 -  Неактивен, 1 - Активен';

COMMENT ON COLUMN public.data_service_limits.is_last
IS 'Флаг, указващ дали версията е последна';

COMMENT ON COLUMN public.data_service_limits.deactivation_ver_id
IS 'Идентификатор на версия с която е деактивиран записа';

COMMENT ON COLUMN public.data_service_limits.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN public.data_service_limits.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN public.data_service_limits.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN public.data_service_limits.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE UNIQUE INDEX data_service_limits_ver_is_last_idx ON public.data_service_limits
  USING btree (service_limit_id)
  WHERE (is_last = (1)::bit(1));

CREATE UNIQUE INDEX data_service_limits_code_lower_idx ON public.data_service_limits
  USING btree ((lower((service_code)::text)))
  WHERE (is_last = (1)::bit(1));