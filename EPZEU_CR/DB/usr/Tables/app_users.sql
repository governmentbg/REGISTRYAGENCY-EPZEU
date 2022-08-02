CREATE TABLE usr.app_users (
  user_id INTEGER DEFAULT nextval('usr.seq_app_users'::regclass) NOT NULL,
  cin INTEGER NOT NULL,
  display_name VARCHAR(1000) NOT NULL,
  is_system BOOLEAN NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT app_users_cin_key UNIQUE(cin),
  CONSTRAINT app_users_pkey PRIMARY KEY(user_id)
) 
WITH (oids = false);

COMMENT ON TABLE usr.app_users
IS 'Локална връзка към потребителските профили';

COMMENT ON COLUMN usr.app_users.user_id
IS 'Уникален идентификатор на локалната връзка на потребителския профил';

COMMENT ON COLUMN usr.app_users.cin
IS 'КИН на потребителския профил';

COMMENT ON COLUMN usr.app_users.display_name
IS 'Текст за представяне на потребителския профил';

COMMENT ON COLUMN usr.app_users.is_system
IS 'Флаг, дали е системен потребителския профил';

COMMENT ON COLUMN usr.app_users.created_by
IS 'Идентификатор на потребителя създал записа.';

COMMENT ON COLUMN usr.app_users.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN usr.app_users.updated_by
IS 'Идентификатор на потребителя последно редактирал записа.';

COMMENT ON COLUMN usr.app_users.updated_on
IS 'Дата и час на pпоследна редакцията на записа.';

COMMENT ON CONSTRAINT app_users_cin_key ON usr.app_users
IS 'Уникален потребителски КИН.';

COMMENT ON CONSTRAINT app_users_pkey ON usr.app_users
IS 'Уникален идентификатор на локална връзка към потребителските профили.';

ALTER TABLE usr.app_users
  OWNER TO epzeu_dev;