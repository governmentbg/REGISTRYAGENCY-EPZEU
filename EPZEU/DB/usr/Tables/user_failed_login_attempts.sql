CREATE TABLE usr.user_failed_login_attempts (
  attempt_id INTEGER DEFAULT nextval('usr.seq_user_failed_login_attempts'::regclass) NOT NULL,
  authentication_type SMALLINT NOT NULL,
  login_name VARCHAR(200),
  additional_data VARCHAR(200),
  failed_login_attempts INTEGER DEFAULT 0 NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  is_active BOOLEAN DEFAULT true,
  CONSTRAINT user_failed_login_attempts_pkey PRIMARY KEY(attempt_id),
  CONSTRAINT user_failed_login_attempts_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_failed_login_attempts_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON TABLE usr.user_failed_login_attempts
IS 'Неуспешни опити за вход в системата';

COMMENT ON COLUMN usr.user_failed_login_attempts.attempt_id
IS 'Уникален идентификатор на запис';

COMMENT ON COLUMN usr.user_failed_login_attempts.authentication_type
IS 'Вид автентикация: 1 - потребителско име и парола, 2 - активна директория, 3 - електронен сертификат';

COMMENT ON COLUMN usr.user_failed_login_attempts.login_name
IS 'Потребителско име, с което се извършва опита за вход в системата';

COMMENT ON COLUMN usr.user_failed_login_attempts.additional_data
IS 'Допълнителни данни за опита за вход';

COMMENT ON COLUMN usr.user_failed_login_attempts.failed_login_attempts
IS 'Брой неуспешни опити за вход';

COMMENT ON COLUMN usr.user_failed_login_attempts.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_failed_login_attempts.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_failed_login_attempts.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_failed_login_attempts.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.user_failed_login_attempts.is_active
IS 'Флаг, указващ дали записът е активен';
