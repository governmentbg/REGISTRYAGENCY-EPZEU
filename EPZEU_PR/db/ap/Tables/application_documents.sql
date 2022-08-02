CREATE TABLE ap.application_documents (
  application_document_id BIGSERIAL,
  name VARCHAR(255) NOT NULL,
  backoffice_guid UUID NOT NULL,
  application_id BIGINT NOT NULL,
  document_type_id VARCHAR(50) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  file_size INTEGER NOT NULL,
  html_template_content TEXT,
  signing_guid UUID,
  incoming_number VARCHAR(30),
  CONSTRAINT application_documents_backoffice_guid_key UNIQUE(backoffice_guid),
  CONSTRAINT application_documents_pkey PRIMARY KEY(application_document_id),
  CONSTRAINT fk_application_documents_applications FOREIGN KEY (application_id)
    REFERENCES ap.applications(application_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_application_documents_users_cb FOREIGN KEY (created_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_application_documents_users_ub FOREIGN KEY (updated_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE ap.application_documents
IS '����� �� ��������� �� ��������';

COMMENT ON COLUMN ap.application_documents.application_document_id
IS '�������� ������������� �� ��������';

COMMENT ON COLUMN ap.application_documents.name
IS '��� �� ��������';

COMMENT ON COLUMN ap.application_documents.backoffice_guid
IS '������������� �� ��������� � ��';

COMMENT ON COLUMN ap.application_documents.application_id
IS '������������� �� ���������';

COMMENT ON COLUMN ap.application_documents.document_type_id
IS '��� �� ���������� ��������';

COMMENT ON COLUMN ap.application_documents.created_by
IS '������������� �� �����������,������ ������';

COMMENT ON COLUMN ap.application_documents.created_on
IS '���� � ��� �� ����������� �� ������';

COMMENT ON COLUMN ap.application_documents.updated_by
IS '������������� �� �����������, ���������� ������';

COMMENT ON COLUMN ap.application_documents.updated_on
IS '���� � ��� �� ����������';

COMMENT ON COLUMN ap.application_documents.file_size
IS '������ �� ��������';

COMMENT ON COLUMN ap.application_documents.html_template_content
IS 'HTML ���������� �� ���������';

COMMENT ON COLUMN ap.application_documents.signing_guid
IS '������������� �� �������� �� ���������� � ������ �� ����������';

COMMENT ON COLUMN ap.application_documents.incoming_number
IS '������ ����� �� ����������� � ����� � ������ ���������.';

COMMENT ON CONSTRAINT fk_application_documents_applications ON ap.application_documents
IS '������ ��� ��������� � ��������� ��� ������� �������.';

COMMENT ON CONSTRAINT fk_application_documents_users_cb ON ap.application_documents
IS '������ ��� ��������� � ������������� �� ����������� ������ ������.';

COMMENT ON CONSTRAINT fk_application_documents_users_ub ON ap.application_documents
IS '������ ��� ��������� � ������������� �� ����������� �������� ���������� ������.';

COMMENT ON CONSTRAINT application_documents_backoffice_guid_key ON ap.application_documents
IS '�������� �� ���������� �� ������ backoffice_guid';

COMMENT ON CONSTRAINT application_documents_pkey ON ap.application_documents
IS '�������� ������������� �� ����� �� ����� �� �������� �� ��������.';

