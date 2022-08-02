CREATE TABLE usr.user_authentications (
  authentication_id SERIAL,
  user_id INTEGER NOT NULL,
  authentication_type SMALLINT NOT NULL,
  password_hash VARCHAR(200),
  username VARCHAR(100),
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  is_locked BOOLEAN DEFAULT false,
  locked_until TIMESTAMP(0) WITH TIME ZONE,
  CONSTRAINT users_authentications_pkey PRIMARY KEY(authentication_id),
  CONSTRAINT user_authentications_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_authentications_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_authentications_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE usr.user_authentications
IS 'Автентикации на потребителски профил';

COMMENT ON COLUMN usr.user_authentications.authentication_id
IS 'Уникален идентификатор на автентикация';

COMMENT ON COLUMN usr.user_authentications.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.user_authentications.authentication_type
IS 'Вид автентикация: 1 - потребителско име и парола, 2 - активна директория, 3 - електронен сертификат';

COMMENT ON COLUMN usr.user_authentications.password_hash
IS 'Хеш на парола.';

COMMENT ON COLUMN usr.user_authentications.username
IS 'Потребителско име';

COMMENT ON COLUMN usr.user_authentications.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_authentications.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_authentications.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_authentications.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.user_authentications.is_locked
IS 'Флаг, указващ дали автентикацията е заключена';

COMMENT ON COLUMN usr.user_authentications.locked_until
IS 'TIMESTAMP до кога е заключена автентикацията';

CREATE INDEX user_authentications_user_id_idx ON usr.user_authentications
  USING btree (user_id);

CREATE UNIQUE INDEX user_authentications_username_idx ON usr.user_authentications
  USING btree (username COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops, authentication_type)
  WHERE (is_active = true);
