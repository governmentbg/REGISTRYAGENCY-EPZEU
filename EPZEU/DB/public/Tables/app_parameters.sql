CREATE TABLE public.app_parameters (
  app_param_id INTEGER NOT NULL,
  app_param_ver_id INTEGER NOT NULL,
  functionality_id SMALLINT NOT NULL,
  code VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  is_system BOOLEAN NOT NULL,
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE NOT NULL,
  param_type INTEGER NOT NULL,
  value_datetime TIMESTAMP WITH TIME ZONE,
  value_interval INTERVAL,
  value_string TEXT,
  value_int INTEGER,
  value_hour TIME(0) WITHOUT TIME ZONE,
  CONSTRAINT app_parameters_app_param_id_key PRIMARY KEY(app_param_id, app_param_ver_id),
  CONSTRAINT app_parameters_type_chk CHECK (((param_type = 1) AND (value_datetime IS NOT NULL) AND (value_interval IS NULL) AND (value_string IS NULL) AND (value_int IS NULL) AND (value_hour IS NULL)) OR ((param_type = 2) AND (value_datetime IS NULL) AND (value_interval IS NOT NULL) AND (value_string IS NULL) AND (value_int IS NULL) AND (value_hour IS NULL)) OR ((param_type = 3) AND (value_datetime IS NULL) AND (value_interval IS NULL) AND (value_string IS NOT NULL) AND (value_int IS NULL) AND (value_hour IS NULL)) OR ((param_type = 4) AND (value_datetime IS NULL) AND (value_interval IS NULL) AND (value_string IS NULL) AND (value_int IS NOT NULL) AND (value_hour IS NULL)) OR ((param_type = 5) AND (value_datetime IS NULL) AND (value_interval IS NULL) AND (value_string IS NULL) AND (value_int IS NULL) AND (value_hour IS NOT NULL))),
  CONSTRAINT app_parameters_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT app_parameters_functionality_fk FOREIGN KEY (functionality_id)
    REFERENCES public.n_s_functionalities(functionality_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT app_parameters_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN public.app_parameters.app_param_id
IS 'Идентиификатор на параметър';

COMMENT ON COLUMN public.app_parameters.app_param_ver_id
IS 'Идентификатор на версия на параметър';

COMMENT ON COLUMN public.app_parameters.functionality_id
IS 'Уникален идентификатор на функционалност';

COMMENT ON COLUMN public.app_parameters.code
IS 'Код на параметър';

COMMENT ON COLUMN public.app_parameters.description
IS 'Описание на параметър';

COMMENT ON COLUMN public.app_parameters.is_system
IS 'Флаг, указващ дали параметъра е системен или не';

COMMENT ON COLUMN public.app_parameters.is_last
IS 'Флаг, указващ дали параметъра е последна версия';

COMMENT ON COLUMN public.app_parameters.deactivation_ver_id
IS 'Идентификатор на версия с която е деактивиран записа';

COMMENT ON COLUMN public.app_parameters.created_by
IS 'никален идентификатор на потребител създал записа';

COMMENT ON COLUMN public.app_parameters.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN public.app_parameters.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN public.app_parameters.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN public.app_parameters.param_type
IS 'Тип на параметър: 1-дата, час и минути; 2-период от време; 3-стринг; 4-цяло число; 5-час и минути;';

COMMENT ON COLUMN public.app_parameters.value_datetime
IS 'Стойност са тип на параметър дата, час и минути';

COMMENT ON COLUMN public.app_parameters.value_interval
IS 'Стойност са тип на параметър интервал от време';

COMMENT ON COLUMN public.app_parameters.value_string
IS 'Стойност са тип на параметър стринг';

COMMENT ON COLUMN public.app_parameters.value_int
IS 'Стойност са тип на параметър цяло число';

COMMENT ON COLUMN public.app_parameters.value_hour
IS 'Стойност са тип параметър час и минути';

CREATE UNIQUE INDEX app_parameters_code_is_last_idx ON public.app_parameters
  USING btree (is_last, code COLLATE pg_catalog."default")
  WHERE (is_last = (1)::bit(1));

CREATE TRIGGER trg_app_parameters_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON public.app_parameters
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE public.f_app_parameters_trg();
