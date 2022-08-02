CREATE TABLE cms.bulletins (
  bulletin_id INTEGER DEFAULT nextval('cms.seq_bulletin'::regclass) NOT NULL,
  date_from TIMESTAMP WITH TIME ZONE NOT NULL,
  date_to TIMESTAMP WITH TIME ZONE NOT NULL,
  status INTEGER DEFAULT 1 NOT NULL,
  file_name VARCHAR(200) NOT NULL,
  file_size INTEGER NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT bulletin_pkey PRIMARY KEY(bulletin_id),
  CONSTRAINT bulletin_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT bulletin_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN cms.bulletins.bulletin_id
IS '������������� �� �������.';

COMMENT ON COLUMN cms.bulletins.date_from
IS '���� ��';

COMMENT ON COLUMN cms.bulletins.date_to
IS '���� ��';

COMMENT ON COLUMN cms.bulletins.status
IS '������: 0-������������, 1-����������';

COMMENT ON COLUMN cms.bulletins.file_name
IS '������������ �� ��������';

COMMENT ON COLUMN cms.bulletins.file_size
IS '������ �� �����';

COMMENT ON COLUMN cms.bulletins.content_type
IS '��� �� ���������';

COMMENT ON COLUMN cms.bulletins.content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.bulletins.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.bulletins.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.bulletins.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';
