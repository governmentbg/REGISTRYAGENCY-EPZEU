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
IS '���������� �� ���������';

COMMENT ON COLUMN cms.message_recipients.message_id
IS '�������� ������������� �� ���������';

COMMENT ON COLUMN cms.message_recipients.user_id
IS '�������� ������������� �� ������������� ������';

COMMENT ON COLUMN cms.message_recipients.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.message_recipients.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.message_recipients.updated_by
IS '�������� message_recipients �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN cms.message_recipients.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
