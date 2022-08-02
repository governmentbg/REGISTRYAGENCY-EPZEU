CREATE TABLE public.n_s_functionalities (
  functionality_id SMALLINT NOT NULL,
  module_id SMALLINT NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT n_s_functionalities_pkey PRIMARY KEY(functionality_id),
  CONSTRAINT n_s_functionalities_module_id_fk FOREIGN KEY (module_id)
    REFERENCES public.n_s_modules(module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE public.n_s_functionalities
IS '���������������';

COMMENT ON COLUMN public.n_s_functionalities.functionality_id
IS '�������� ������������� �� ��������������';

COMMENT ON COLUMN public.n_s_functionalities.module_id
IS '������������� �� ������/�������';

COMMENT ON COLUMN public.n_s_functionalities.name
IS '���.';

COMMENT ON COLUMN public.n_s_functionalities.description
IS '��������.';

COMMENT ON COLUMN public.n_s_functionalities.created_by
IS '������������� �� �����������, ������ ������.';

COMMENT ON COLUMN public.n_s_functionalities.created_on
IS '���� � ��� �� ����������� �� ������.';

COMMENT ON COLUMN public.n_s_functionalities.updated_by
IS '������������� �� �����������, ���������� ������.';

COMMENT ON COLUMN public.n_s_functionalities.updated_on
IS '���� � ��� �� ����������.';
