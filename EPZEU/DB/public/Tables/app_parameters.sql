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
IS '�������������� �� ���������';

COMMENT ON COLUMN public.app_parameters.app_param_ver_id
IS '������������� �� ������ �� ���������';

COMMENT ON COLUMN public.app_parameters.functionality_id
IS '�������� ������������� �� ��������������';

COMMENT ON COLUMN public.app_parameters.code
IS '��� �� ���������';

COMMENT ON COLUMN public.app_parameters.description
IS '�������� �� ���������';

COMMENT ON COLUMN public.app_parameters.is_system
IS '����, ������� ���� ���������� � �������� ��� ��';

COMMENT ON COLUMN public.app_parameters.is_last
IS '����, ������� ���� ���������� � �������� ������';

COMMENT ON COLUMN public.app_parameters.deactivation_ver_id
IS '������������� �� ������ � ����� � ����������� ������';

COMMENT ON COLUMN public.app_parameters.created_by
IS '������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN public.app_parameters.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN public.app_parameters.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN public.app_parameters.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN public.app_parameters.param_type
IS '��� �� ���������: 1-����, ��� � ������; 2-������ �� �����; 3-������; 4-���� �����; 5-��� � ������;';

COMMENT ON COLUMN public.app_parameters.value_datetime
IS '�������� �� ��� �� ��������� ����, ��� � ������';

COMMENT ON COLUMN public.app_parameters.value_interval
IS '�������� �� ��� �� ��������� �������� �� �����';

COMMENT ON COLUMN public.app_parameters.value_string
IS '�������� �� ��� �� ��������� ������';

COMMENT ON COLUMN public.app_parameters.value_int
IS '�������� �� ��� �� ��������� ���� �����';

COMMENT ON COLUMN public.app_parameters.value_hour
IS '�������� �� ��� ��������� ��� � ������';

CREATE UNIQUE INDEX app_parameters_code_is_last_idx ON public.app_parameters
  USING btree (is_last, code COLLATE pg_catalog."default")
  WHERE (is_last = (1)::bit(1));

CREATE TRIGGER trg_app_parameters_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON public.app_parameters
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE public.f_app_parameters_trg();
