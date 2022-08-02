CREATE TABLE public.data_service_user_limits (
  user_limit_id SERIAL,
  user_limit_ver_id INTEGER NOT NULL,
  service_limit_id INTEGER NOT NULL,
  service_limit_ver_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  requests_interval INTERVAL NOT NULL,
  requests_number INTEGER NOT NULL,
  status INTEGER NOT NULL,
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT data_service_user_limits_pkey PRIMARY KEY(user_limit_id, user_limit_ver_id),
  CONSTRAINT data_service_user_limits_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT data_service_user_limits_service_limit_id_fk FOREIGN KEY (service_limit_id, service_limit_ver_id)
    REFERENCES public.data_service_limits(service_limit_id, service_limit_ver_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT data_service_user_limits_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT data_service_user_limits_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE public.data_service_user_limits
IS 'Лимити на потребители за услуги за предоставяне на данни';

COMMENT ON COLUMN public.data_service_user_limits.user_limit_id
IS 'Идентификатор на лимит на потребител';

COMMENT ON COLUMN public.data_service_user_limits.user_limit_ver_id
IS 'Идентификатор на версия на лимит на потребител';

COMMENT ON COLUMN public.data_service_user_limits.service_limit_id
IS 'Идентификатор на лимит на услуга за предоставяне на данни';

COMMENT ON COLUMN public.data_service_user_limits.service_limit_ver_id
IS 'Идентификатор на версия на лимит на услуга за предоставяне на данни';

COMMENT ON COLUMN public.data_service_user_limits.user_id
IS 'Идентификатор на потребителски профил';

COMMENT ON COLUMN public.data_service_user_limits.requests_interval
IS 'Период от време';

COMMENT ON COLUMN public.data_service_user_limits.requests_number
IS 'Максимален брой заявки за периода от време';

COMMENT ON COLUMN public.data_service_user_limits.status
IS 'Статус на лимит: 0 -  Неактивен, 1 - Активен';

COMMENT ON COLUMN public.data_service_user_limits.is_last
IS 'Флаг, указващ дали версията е последна';

COMMENT ON COLUMN public.data_service_user_limits.deactivation_ver_id
IS 'Идентификатор на версия с която е деактивиран записа';

COMMENT ON COLUMN public.data_service_user_limits.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN public.data_service_user_limits.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN public.data_service_user_limits.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN public.data_service_user_limits.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE UNIQUE INDEX data_service_user_idx ON public.data_service_user_limits
  USING btree (service_limit_id, user_id)
  WHERE (is_last = (1)::bit(1));

CREATE INDEX data_service_user_limits_service_limit_id_idx ON public.data_service_user_limits
  USING btree (service_limit_id, service_limit_ver_id);

CREATE INDEX data_service_user_limits_user_id_idx ON public.data_service_user_limits
  USING btree (user_id);

CREATE UNIQUE INDEX data_service_user_limits_ver_is_last_idx ON public.data_service_user_limits
  USING btree (user_limit_id)
  WHERE (is_last = (1)::bit(1));
