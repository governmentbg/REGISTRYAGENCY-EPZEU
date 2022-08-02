CREATE TABLE usr.users (
  user_id INTEGER DEFAULT nextval('usr.seq_users'::regclass) NOT NULL,
  cin INTEGER DEFAULT nextval('usr.seq_users_cin'::regclass) NOT NULL,
  email VARCHAR(200) NOT NULL,
  first_name VARCHAR(50),
  middle_name VARCHAR(50),
  family_name VARCHAR(50),
  contact_data VARCHAR(500),
  organization VARCHAR(120),
  special_access_user_type INTEGER,
  cr_bulletin_acceptance BOOLEAN,
  pr_bulletin_acceptance BOOLEAN,
  status INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  is_system BOOLEAN NOT NULL,
  cr_message_acceptance BOOLEAN,
  pr_message_acceptance BOOLEAN,
  epzeu_message_acceptance BOOLEAN,
  CONSTRAINT users_cin_key UNIQUE(cin),
  CONSTRAINT users_email_key UNIQUE(email),
  CONSTRAINT users_pkey PRIMARY KEY(user_id),
  CONSTRAINT users_status_chk CHECK (status = ANY (ARRAY[0, 1, 2, 3])),
  CONSTRAINT users_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_special_access_user_type_fk FOREIGN KEY (special_access_user_type)
    REFERENCES usr.n_s_special_access_user_types(user_type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE usr.users
IS 'Потребителски профили';

COMMENT ON COLUMN usr.users.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.users.cin
IS 'Клиентски идентификационен номер';

COMMENT ON COLUMN usr.users.email
IS 'Електронна поща';

COMMENT ON COLUMN usr.users.first_name
IS 'Име на потребителя';

COMMENT ON COLUMN usr.users.middle_name
IS 'Презиме на потребителя';

COMMENT ON COLUMN usr.users.family_name
IS 'Фамилия на потребителя';

COMMENT ON COLUMN usr.users.contact_data
IS 'Данни за контакт';

COMMENT ON COLUMN usr.users.organization
IS 'Организация и длъжност';

COMMENT ON COLUMN usr.users.special_access_user_type
IS 'Вид външен потребител със специален достъп';

COMMENT ON COLUMN usr.users.cr_bulletin_acceptance
IS 'Съгласие за ел. бюлетин за ТРРЮЛНЦ';

COMMENT ON COLUMN usr.users.pr_bulletin_acceptance
IS 'Съгласие за ел. бюлетин за ИР';

COMMENT ON COLUMN usr.users.status
IS 'Статус на профил: 0 -  Непотвърден, 1 - Активен, 2 - Неактивен, 3 - Заключен';

COMMENT ON COLUMN usr.users.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.users.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.users.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.users.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.users.is_system
IS 'Флаг, указващ дали потребителския профил е системен';

COMMENT ON COLUMN usr.users.cr_message_acceptance
IS 'Съгласие за съобщениея от ТРРЮЛНЦ';

COMMENT ON COLUMN usr.users.pr_message_acceptance
IS 'Съгласие за съобщениея от ИР';

COMMENT ON COLUMN usr.users.epzeu_message_acceptance
IS 'Съгласие за съобщения от ЕПЗЕУ';

COMMENT ON CONSTRAINT users_status_chk ON usr.users
IS '0 - Непотвърден, 1 - Активен, 2 - Неактивен, 3 - Заключен';

CREATE INDEX users_email_lower_idx ON usr.users
  USING btree ((lower((email)::text)) COLLATE pg_catalog."default");

CREATE INDEX users_family_name_idx ON usr.users
  USING btree (lower(family_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);

CREATE INDEX users_first_name_idx ON usr.users
  USING btree (lower(first_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);

CREATE INDEX users_middle_name_idx ON usr.users
  USING btree (lower(middle_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);
