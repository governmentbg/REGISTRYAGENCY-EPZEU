CREATE TABLE nom.s_application_types (
  id SMALLINT DEFAULT nextval('nom.seq_s_application_types'::regclass) NOT NULL,
  code VARCHAR(20),
  name VARCHAR,
  register_id SMALLINT NOT NULL,
  CONSTRAINT s_application_types_pkey PRIMARY KEY(id)
) 
WITH (oids = false);

ALTER TABLE nom.s_application_types
  ALTER COLUMN id SET STATISTICS 0;

ALTER TABLE nom.s_application_types
  ALTER COLUMN code SET STATISTICS 0;

COMMENT ON TABLE nom.s_application_types
IS '������ ���������';

COMMENT ON COLUMN nom.s_application_types.id
IS '������������� �� ��� ���������';

COMMENT ON COLUMN nom.s_application_types.code
IS '��� �� ���������';

COMMENT ON COLUMN nom.s_application_types.name
IS '������������ �� ��� ���������';

COMMENT ON COLUMN nom.s_application_types.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';
