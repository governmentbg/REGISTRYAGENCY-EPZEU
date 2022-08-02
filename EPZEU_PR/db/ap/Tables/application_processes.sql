CREATE TABLE ap.application_processes (
  application_process_id BIGSERIAL,
  applicant_id INTEGER NOT NULL,
  main_application_id BIGINT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP(3) WITH TIME ZONE NOT NULL,
  main_application_type_id SMALLINT,
  status ap.enum_process_status NOT NULL,
  signing_guid UUID,
  incoming_numbers VARCHAR(20) [],
  error_message VARCHAR(2000),
  additional_data JSONB,
  CONSTRAINT application_processes_pkey PRIMARY KEY(application_process_id),
  CONSTRAINT application_processes_signing_guid_key UNIQUE(signing_guid),
  CONSTRAINT application_processes_unique_idx UNIQUE(applicant_id, main_application_type_id),
  CONSTRAINT fk_application_processes_applications FOREIGN KEY (main_application_id)
    REFERENCES ap.applications(application_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    DEFERRABLE
    INITIALLY DEFERRED,
  CONSTRAINT fk_application_processes_users_cb FOREIGN KEY (created_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_application_processes_users_ub FOREIGN KEY (updated_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON TABLE ap.application_processes
IS 'Таблицата съхранява данни за процеси по вписване на пакет.';

COMMENT ON COLUMN ap.application_processes.application_process_id
IS 'Уникален идентификатор на пакет за вписване';

COMMENT ON COLUMN ap.application_processes.applicant_id
IS 'Идентификатор на заявителя';

COMMENT ON COLUMN ap.application_processes.main_application_id
IS 'Идентификатор на основно заявление';

COMMENT ON COLUMN ap.application_processes.created_by
IS 'Идентификатор на потребителя,създал записа';

COMMENT ON COLUMN ap.application_processes.created_on
IS 'Дата и час на създаването на записа';

COMMENT ON COLUMN ap.application_processes.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN ap.application_processes.updated_on
IS 'Дата и час на редакцията';

COMMENT ON COLUMN ap.application_processes.main_application_type_id
IS 'Тип на основното заявление';

COMMENT ON COLUMN ap.application_processes.status
IS 'Статус на пакета';

COMMENT ON COLUMN ap.application_processes.signing_guid
IS 'Идентификатор на заявката за подписване в модула за подписване';

COMMENT ON COLUMN ap.application_processes.incoming_numbers
IS 'Входящи номера на заявлението в PR';

COMMENT ON COLUMN ap.application_processes.error_message
IS 'Съобщение за грешка при обработката на процеса';

COMMENT ON COLUMN ap.application_processes.additional_data
IS 'Допълнителни данни за процеса по заявяване';

COMMENT ON CONSTRAINT fk_application_processes_applications ON ap.application_processes
IS 'Връзка към таблицата за заявления към пакетни процеси.';

COMMENT ON CONSTRAINT fk_application_processes_users_cb ON ap.application_processes
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT fk_application_processes_users_ub ON ap.application_processes
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT application_processes_pkey ON ap.application_processes
IS 'Уникален идентификатор на запис за данни за процеса по вписване на пакет.';

COMMENT ON CONSTRAINT application_processes_unique_idx ON ap.application_processes
IS 'Проверка по уникалност по колони applicant_id и main_application_type_id';

ALTER TABLE ap.application_processes
  OWNER TO epzeu_dev;