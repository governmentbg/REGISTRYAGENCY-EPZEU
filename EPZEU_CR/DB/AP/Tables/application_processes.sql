CREATE TABLE ap.application_processes (
  application_process_id BIGINT DEFAULT nextval('ap.seq_application_processes'::text::regclass) NOT NULL,
  uic VARCHAR(13),
  applicant_id INTEGER NOT NULL,
  main_application_id BIGINT,
  main_application_type_id SMALLINT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  status SMALLINT NOT NULL,
  CONSTRAINT application_processes_applicant_application_key UNIQUE(applicant_id, main_application_type_id),
  CONSTRAINT application_processes_pkey PRIMARY KEY(application_process_id),
  CONSTRAINT fk_application_processes_applications FOREIGN KEY (main_application_id)
    REFERENCES ap.applications(application_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    DEFERRABLE
    INITIALLY DEFERRED,
  CONSTRAINT fk_application_processes_applid FOREIGN KEY (applicant_id)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_application_processes_cb FOREIGN KEY (created_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_application_processes_ub FOREIGN KEY (updated_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE ap.application_processes
IS 'Данни за пакети за вписване';

COMMENT ON COLUMN ap.application_processes.application_process_id
IS 'Уникален идентификатор на пакет за вписване';

COMMENT ON COLUMN ap.application_processes.uic
IS 'ЕИК';

COMMENT ON COLUMN ap.application_processes.applicant_id
IS 'Идентификатор на заявителя';

COMMENT ON COLUMN ap.application_processes.main_application_id
IS 'Идентификатор на основно заявление';

COMMENT ON COLUMN ap.application_processes.main_application_type_id
IS 'Тип на основно заявление';

COMMENT ON COLUMN ap.application_processes.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN ap.application_processes.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN ap.application_processes.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN ap.application_processes.updated_on
IS 'Дата и час на редакцията.';

COMMENT ON COLUMN ap.application_processes.status
IS 'Статус на пакета: 1 - in_process; 2 - signing; 3 - signed;';