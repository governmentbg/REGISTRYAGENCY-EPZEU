CREATE TABLE cms.messages (
  message_id INTEGER DEFAULT nextval('cms.seq_messages'::text::regclass) NOT NULL,
  about VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  status INTEGER NOT NULL,
  is_to_all_cr BOOLEAN,
  is_to_all_pr BOOLEAN,
  is_to_all_epzeu BOOLEAN,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT messages_pkey PRIMARY KEY(message_id),
  CONSTRAINT messages_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT messages_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.messages
IS 'Съобщения';

COMMENT ON COLUMN cms.messages.message_id
IS 'Уникален идентификатор на съобщение';

COMMENT ON COLUMN cms.messages.about
IS 'Относно';

COMMENT ON COLUMN cms.messages.content
IS 'Текст на съобщение';

COMMENT ON COLUMN cms.messages.status
IS 'Статус на съобщение: 0-неизпратено; 1-изпратено';

COMMENT ON COLUMN cms.messages.is_to_all_cr
IS 'Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ТРРЮЛНЦ';

COMMENT ON COLUMN cms.messages.is_to_all_pr
IS 'Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ИР';

COMMENT ON COLUMN cms.messages.is_to_all_epzeu
IS 'Флаг, указващ дали съобщението е до всички потребители заявили съгласие за получаване на съобщения от ЕПЗЕУ';

COMMENT ON COLUMN cms.messages.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN cms.messages.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN cms.messages.updated_by
IS 'Уникален message_recipients на потребител направил последна промяна на записа';

COMMENT ON COLUMN cms.messages.updated_on
IS 'TIMESTAMP на последна промяна на записа';
