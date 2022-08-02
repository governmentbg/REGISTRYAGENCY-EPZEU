CREATE TABLE ap.applications (
  application_id BIGINT DEFAULT nextval('ap.seq_applications'::text::regclass) NOT NULL,
  application_process_id BIGINT NOT NULL,
  application_type_id SMALLINT NOT NULL,
  application_content_id BIGINT NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  "order" SMALLINT NOT NULL,
  additional_data JSONB,
  CONSTRAINT application_pkey PRIMARY KEY(application_id),
  CONSTRAINT fk_application_application_process FOREIGN KEY (application_process_id)
    REFERENCES ap.application_processes(application_process_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_applications_application_process_contents FOREIGN KEY (application_content_id)
    REFERENCES ap.application_process_contents(application_process_content_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_applications_cb FOREIGN KEY (created_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_applications_ub FOREIGN KEY (updated_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN ap.applications.application_id
IS 'Уникален идентификатор на заявление';

COMMENT ON COLUMN ap.applications.application_process_id
IS 'Идентификатор на пакет за вписване';

COMMENT ON COLUMN ap.applications.application_type_id
IS 'Тип на заявление';

COMMENT ON COLUMN ap.applications.application_content_id
IS 'Идентификатор на данни за съдържание на пакети (JSON)';

COMMENT ON COLUMN ap.applications.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN ap.applications.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN ap.applications.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN ap.applications.updated_on
IS 'Дата и час на редакцията.';

COMMENT ON COLUMN ap.applications."order"
IS 'Номер на заявлението';

COMMENT ON COLUMN ap.applications.additional_data
IS 'Допълнителни данни описващи заявленията';