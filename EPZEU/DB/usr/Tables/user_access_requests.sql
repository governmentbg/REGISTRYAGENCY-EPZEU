CREATE TABLE usr.user_access_requests (
  request_id INTEGER DEFAULT nextval('usr.seq_user_access_requests'::regclass) NOT NULL,
  user_id INTEGER NOT NULL,
  access_status SMALLINT NOT NULL,
  processing_date TIMESTAMP WITH TIME ZONE,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  status_reason TEXT,
  CONSTRAINT user_access_requests_pkey PRIMARY KEY(request_id),
  CONSTRAINT user_access_requests_access_status_chk CHECK (access_status = ANY (ARRAY[0, 1, 2])),
  CONSTRAINT user_access_requests_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_access_requests_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_access_requests_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE usr.user_access_requests
IS 'Заявки за специален достъп';

COMMENT ON COLUMN usr.user_access_requests.request_id
IS 'Уникален идентификатор на заявка за специален достъп';

COMMENT ON COLUMN usr.user_access_requests.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.user_access_requests.access_status
IS 'Статус на достъп: 0 - Чака одобрение, 1 - Одобрен, 2 - Неодобрен';

COMMENT ON COLUMN usr.user_access_requests.processing_date
IS 'Дата на обработка на заявка за достъп';

COMMENT ON COLUMN usr.user_access_requests.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_access_requests.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_access_requests.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_access_requests.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.user_access_requests.status_reason
IS 'Причини за отказан достъп при отказ за одобрение на заявка за специален достъп.';

COMMENT ON CONSTRAINT user_access_requests_access_status_chk ON usr.user_access_requests
IS 'Валидация на статус на достъп.';

COMMENT ON CONSTRAINT user_access_requests_created_by_fk ON usr.user_access_requests
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT user_access_requests_updated_by_fk ON usr.user_access_requests
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT user_access_requests_user_id_fk ON usr.user_access_requests
IS 'Връзка към таблицата с потребителите за конкретен профил';

COMMENT ON CONSTRAINT user_access_requests_pkey ON usr.user_access_requests
IS 'Уникален идентификатор на запис за заявка за специален достъп.';

CREATE INDEX user_access_requests_user_id_idx ON usr.user_access_requests
  USING btree (user_id);
