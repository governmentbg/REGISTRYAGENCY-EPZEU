CREATE TABLE usr.user_processes (
  process_id SERIAL,
  process_guid VARCHAR(100) NOT NULL,
  process_type INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  invalid_after TIMESTAMP WITH TIME ZONE,
  status INTEGER DEFAULT 0 NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT user_processes_pkey PRIMARY KEY(process_id),
  CONSTRAINT user_processes_process_guid_key UNIQUE(process_guid),
  CONSTRAINT user_processes_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_processes_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_processes_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE usr.user_processes
  ALTER COLUMN process_type SET STATISTICS 0;

ALTER TABLE usr.user_processes
  ALTER COLUMN status SET STATISTICS 0;

COMMENT ON TABLE usr.user_processes
IS 'Данни за процесите при потребителските профили';

COMMENT ON COLUMN usr.user_processes.process_id
IS 'Уникален идентификатор на запис за процес';

COMMENT ON COLUMN usr.user_processes.process_guid
IS 'Уникален идентификатор на процес, който се изпраща към потребителя';

COMMENT ON COLUMN usr.user_processes.process_type
IS 'Тип на процеса: 1 - Активиране на профил, 2 - Смяна на парола';

COMMENT ON COLUMN usr.user_processes.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.user_processes.invalid_after
IS 'Дата след която процесът е невалиден';

COMMENT ON COLUMN usr.user_processes.status
IS 'Статус на процеса: 0 - Неприключил, 1 - Потвърден, 2 - Отказан';

COMMENT ON COLUMN usr.user_processes.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_processes.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_processes.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_processes.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON CONSTRAINT user_processes_created_by_fk ON usr.user_processes
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT user_processes_updated_by_fk ON usr.user_processes
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT user_processes_user_id_fk ON usr.user_processes
IS 'Връзка към таблицата с потребителите за конкретен профил';

CREATE INDEX user_processes_invalid_idx ON usr.user_processes
  USING btree (process_type, user_id, invalid_after)
  WHERE (status = 0);

COMMENT ON CONSTRAINT user_processes_pkey ON usr.user_processes
IS 'Уникален идентификатор на запис за процес при потребителски профили.';

COMMENT ON CONSTRAINT user_processes_process_guid_key ON usr.user_processes
IS 'Валидация за умикалност по колона process_guid.';


