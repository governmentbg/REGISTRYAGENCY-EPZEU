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
IS '���������';

COMMENT ON COLUMN cms.messages.message_id
IS '�������� ������������� �� ���������';

COMMENT ON COLUMN cms.messages.about
IS '�������';

COMMENT ON COLUMN cms.messages.content
IS '����� �� ���������';

COMMENT ON COLUMN cms.messages.status
IS '������ �� ���������: 0-�����������; 1-���������';

COMMENT ON COLUMN cms.messages.is_to_all_cr
IS '����, ������� ���� ����������� � �� ������ ����������� ������� �������� �� ���������� �� ��������� �� �������';

COMMENT ON COLUMN cms.messages.is_to_all_pr
IS '����, ������� ���� ����������� � �� ������ ����������� ������� �������� �� ���������� �� ��������� �� ��';

COMMENT ON COLUMN cms.messages.is_to_all_epzeu
IS '����, ������� ���� ����������� � �� ������ ����������� ������� �������� �� ���������� �� ��������� �� �����';

COMMENT ON COLUMN cms.messages.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.messages.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.messages.updated_by
IS '�������� message_recipients �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN cms.messages.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
