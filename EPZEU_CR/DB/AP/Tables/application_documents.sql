CREATE TABLE ap.application_documents (
  application_document_id BIGSERIAL,
  name VARCHAR(255) NOT NULL,
  backoffice_guid UUID NOT NULL,
  application_id BIGINT NOT NULL,
  document_type_id INTEGER NOT NULL,
  is_original BOOLEAN NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  rejected_application_process_id BIGINT,
  number_of_pages INTEGER,
  size BIGINT,
  CONSTRAINT application_documents_backoffice_guid_key UNIQUE(application_id, backoffice_guid),
  CONSTRAINT application_documents_pkey PRIMARY KEY(application_document_id),
  CONSTRAINT fk_application_documents_applications FOREIGN KEY (application_id)
    REFERENCES ap.applications(application_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE ap.application_documents
IS 'Данни за документи на вписване';

COMMENT ON COLUMN ap.application_documents.application_document_id
IS 'Уникален идентификатор на документ';

COMMENT ON COLUMN ap.application_documents.name
IS 'Име на документ';

COMMENT ON COLUMN ap.application_documents.backoffice_guid
IS 'Идентификатор на документа в ТР';

COMMENT ON COLUMN ap.application_documents.application_id
IS 'Идентификатор на заявление';

COMMENT ON COLUMN ap.application_documents.document_type_id
IS 'Тип на приложения документ';

COMMENT ON COLUMN ap.application_documents.is_original
IS 'Флаг указващ документът е оригинал';

COMMENT ON COLUMN ap.application_documents.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN ap.application_documents.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN ap.application_documents.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN ap.application_documents.updated_on
IS 'Дата и час на редакцията.';

COMMENT ON COLUMN ap.application_documents.rejected_application_process_id
IS 'Уникален идентификатор на пакет за отказано вписване';

COMMENT ON COLUMN ap.application_documents.number_of_pages
IS 'Брой страници (когато е .pdf)';

COMMENT ON COLUMN ap.application_documents.size
IS 'Размер на файла (в bytes)';