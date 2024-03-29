CREATE TABLE eml.email_messages (
  email_id INTEGER DEFAULT nextval('eml.seq_email_messages'::regclass) NOT NULL,
  priority SMALLINT NOT NULL,
  status SMALLINT NOT NULL,
  try_count INTEGER NOT NULL,
  send_date TIMESTAMP WITH TIME ZONE,
  subject VARCHAR(500) NOT NULL,
  body TEXT NOT NULL,
  is_body_html BOOLEAN NOT NULL,
  do_not_process_before TIMESTAMP WITH TIME ZONE,
  sending_provider_name VARCHAR(50) NOT NULL,
  recipients eml.email_recipient[] NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  operation_id character varying(64) COLLATE pg_catalog."default",
  CONSTRAINT email_messages_pkey PRIMARY KEY(email_id)
) 
WITH (oids = false);

COMMENT ON COLUMN eml.email_messages.email_id
IS 'Идентификатор на съобщение.';

COMMENT ON COLUMN eml.email_messages.priority
IS 'Приоритет. 1: Normal, 2: Low, 3: High';

COMMENT ON COLUMN eml.email_messages.status
IS 'Статус: 1 - Очаква изпращане(Pending), 2 - Изпратен (Sent), 3 - Грешка(Failed)';

COMMENT ON COLUMN eml.email_messages.try_count
IS 'Брой оставащи опити за изпращане.';

COMMENT ON COLUMN eml.email_messages.send_date
IS 'Дата и час на изпращане.';

COMMENT ON COLUMN eml.email_messages.subject
IS 'Тема.';

COMMENT ON COLUMN eml.email_messages.body
IS 'Тяло на съобщението.';

COMMENT ON COLUMN eml.email_messages.is_body_html
IS 'Флаг, указващ дали съдържанието е HTML.';

COMMENT ON COLUMN eml.email_messages.do_not_process_before
IS 'Дата и час, преди които съобщението не може да бъде изпратено.';

COMMENT ON COLUMN eml.email_messages.sending_provider_name
IS 'Име на изпращаща услуга.';

COMMENT ON COLUMN eml.email_messages.recipients
IS 'Получатели на имейла.Съдържа тройки: Адрес на електронна поща; Име на получател; Тип на адрес. To - 1, Cc - 2, Bcc - 3';

COMMENT ON COLUMN eml.email_messages.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN eml.email_messages.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN eml.email_messages.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN eml.email_messages.updated_on
IS 'Дата и час на редакцията.';

CREATE INDEX email_messages_pending_idx ON eml.email_messages
  USING btree (priority DESC, email_id)
  WHERE (status = 1);