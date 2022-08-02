CREATE TABLE cms.message_recipients (
  message_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT message_recipients_pkey PRIMARY KEY(message_id, user_id),
  CONSTRAINT message_recipients_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT message_recipients_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.message_recipients
IS 'Получатели на съобщения';

COMMENT ON COLUMN cms.message_recipients.message_id
IS 'Уникален идентификатор на съобщение';

COMMENT ON COLUMN cms.message_recipients.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN cms.message_recipients.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN cms.message_recipients.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN cms.message_recipients.updated_by
IS 'Уникален message_recipients на потребител направил последна промяна на записа';

COMMENT ON COLUMN cms.message_recipients.updated_on
IS 'TIMESTAMP на последна промяна на записа';
