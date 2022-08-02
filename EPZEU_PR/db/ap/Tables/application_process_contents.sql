CREATE TABLE ap.application_process_contents (
  application_process_content_id BIGSERIAL,
  application_process_id BIGINT NOT NULL,
  content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  type ap.enum_content_type NOT NULL,
  CONSTRAINT application_process_contents_pkey PRIMARY KEY(application_process_content_id),
  CONSTRAINT fk_application_process_content_package_process FOREIGN KEY (application_process_id)
    REFERENCES ap.application_processes(application_process_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE ap.application_process_contents
IS '����� �� ���������� �� ������ �� ��������';

COMMENT ON COLUMN ap.application_process_contents.application_process_content_id
IS '�������� ������������� �� ���������� �� ������ �� ��������';

COMMENT ON COLUMN ap.application_process_contents.application_process_id
IS '������������� �� ����� �� ��������';

COMMENT ON COLUMN ap.application_process_contents.content
IS '����������';

COMMENT ON COLUMN ap.application_process_contents.created_by
IS '������������� �� �����������,������ ������';

COMMENT ON COLUMN ap.application_process_contents.created_on
IS '���� � ��� �� ����������� �� ������';

COMMENT ON COLUMN ap.application_process_contents.updated_by
IS '������������� �� �����������, ���������� ������';

COMMENT ON COLUMN ap.application_process_contents.updated_on
IS '���� � ��� �� ����������';

COMMENT ON COLUMN ap.application_process_contents.type
IS '��� �� �������';
