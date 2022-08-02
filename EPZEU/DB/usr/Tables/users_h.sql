CREATE TABLE usr.users_h (
  user_id INTEGER NOT NULL,
  user_ver_id INTEGER NOT NULL,
  cin INTEGER NOT NULL,
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
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  cr_message_acceptance BOOLEAN,
  pr_message_acceptance BOOLEAN,
  epzeu_message_acceptance BOOLEAN,
  CONSTRAINT users_h_pkey PRIMARY KEY(user_id, user_ver_id),
  CONSTRAINT users_h_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_h_special_access_user_type_fk FOREIGN KEY (special_access_user_type)
    REFERENCES usr.n_s_special_access_user_types(user_type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_h_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT users_h_user_id_fk FOREIGN KEY (user_id)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE usr.users_h
IS 'История на промените на Потребителски профили';

COMMENT ON COLUMN usr.users_h.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN usr.users_h.user_ver_id
IS 'Версия на данните на потребителски профил';

COMMENT ON COLUMN usr.users_h.cin
IS 'Клиентски идентификационен номер';

COMMENT ON COLUMN usr.users_h.email
IS 'Електронна поща';

COMMENT ON COLUMN usr.users_h.first_name
IS 'Име на потребителя';

COMMENT ON COLUMN usr.users_h.middle_name
IS 'Презиме на потребителя';

COMMENT ON COLUMN usr.users_h.family_name
IS 'Фамилия на потребителя';

COMMENT ON COLUMN usr.users_h.contact_data
IS 'Данни за контакт';

COMMENT ON COLUMN usr.users_h.organization
IS 'Организация и длъжност';

COMMENT ON COLUMN usr.users_h.special_access_user_type
IS 'Вид външен потребител със специален достъп';

COMMENT ON COLUMN usr.users_h.cr_bulletin_acceptance
IS 'Съгласие за ел. бюлетин за ТРРЮЛНЦ';

COMMENT ON COLUMN usr.users_h.pr_bulletin_acceptance
IS 'Съгласие за ел. бюлетин за ИР';

COMMENT ON COLUMN usr.users_h.status
IS 'Статус на профил: 0 -  Непотвърден, 1 - Активен, 2 - Неактивен, 3 - Заключен';

COMMENT ON COLUMN usr.users_h.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.users_h.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.users_h.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.users_h.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.users_h.is_system
IS 'Флаг, указващ дали потребителския профил е системен';

COMMENT ON COLUMN usr.users_h.is_last
IS 'Флаг, указващ дали версията е последна';

COMMENT ON COLUMN usr.users_h.deactivation_ver_id
IS 'Идентификатор на версия с която е деактивиран записа';

COMMENT ON COLUMN usr.users_h.cr_message_acceptance
IS 'Съгласие за съобщения от ТРРЮЛНЦ';

COMMENT ON COLUMN usr.users_h.pr_message_acceptance
IS 'Съгласие за съобщениея от ИР';

COMMENT ON COLUMN usr.users_h.epzeu_message_acceptance
IS 'Съгласие за съобщения от ЕПЗЕУ';
