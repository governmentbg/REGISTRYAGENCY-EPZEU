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

COMMENT ON COLUMN ap.application_documents.created_by
IS 'Идентификатор на потребителя,създал записа';

COMMENT ON COLUMN ap.application_documents.created_on
IS 'Дата и час на създаването на записа';

COMMENT ON COLUMN ap.application_documents.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN ap.application_documents.updated_on
IS 'Дата и час на редакцията';

COMMENT ON COLUMN ap.application_documents.file_size
IS 'Размер на документ';

COMMENT ON COLUMN ap.application_documents.html_template_content
IS 'HTML съдържание на документа';

COMMENT ON COLUMN ap.application_documents.signing_guid
IS 'Идентификатор на заявката за подписване в модула за подписване';

COMMENT ON COLUMN ap.application_documents.incoming_number
IS 'Входящ номер на заявленеито с което е вписан документа.';

COMMENT ON CONSTRAINT fk_application_documents_applications ON ap.application_documents
IS 'Връзка към таблицата с заявления към пакетни процеси.';

COMMENT ON CONSTRAINT fk_application_documents_users_cb ON ap.application_documents
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT fk_application_documents_users_ub ON ap.application_documents
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT application_documents_backoffice_guid_key ON ap.application_documents
IS 'Проверка по уникалност за колона backoffice_guid';

COMMENT ON CONSTRAINT application_documents_pkey ON ap.application_documents
IS 'Уникален идентификатор на запис за данни за документ по вписване.';

