CREATE TABLE public.versions (
  version_id INTEGER DEFAULT nextval('seq_versions'::regclass) NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp(),
  created_by INTEGER,
  CONSTRAINT versions_pkey PRIMARY KEY(version_id)
) 
WITH (oids = false);

COMMENT ON COLUMN public.versions.version_id
IS '�������� ������������� �� ������, ���������� �� ����� �� SEQUENCE seq_versions';

COMMENT ON COLUMN public.versions.created_on
IS '�������� ������������� �� ������';

COMMENT ON COLUMN public.versions.created_by
IS '�������� ������������� �� ���������� ������ ��������';
