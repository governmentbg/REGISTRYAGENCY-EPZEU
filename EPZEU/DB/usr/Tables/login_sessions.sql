CREATE TABLE usr.login_sessions (
  login_session_id UUID NOT NULL,
  user_session_id UUID NOT NULL,
  user_id INTEGER NOT NULL,
  login_date TIMESTAMP WITH TIME ZONE NOT NULL,
  logout_date TIMESTAMP WITH TIME ZONE,
  ip_address INET NOT NULL,
  authentication_type SMALLINT NOT NULL,
  certificate_id INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  operation_id UUID NOT NULL,
  CONSTRAINT login_sessions_pkey PRIMARY KEY(login_session_id),
  CONSTRAINT user_access_requests_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_access_requests_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE usr.login_sessions
IS '������������� �����';

COMMENT ON COLUMN usr.login_sessions.login_session_id
IS '�������� ������������� �� login ������';

COMMENT ON COLUMN usr.login_sessions.user_session_id
IS '�������� ������������� �� ������������� �����';

COMMENT ON COLUMN usr.login_sessions.user_id
IS '�������� ������������� �� ������������� ������';

COMMENT ON COLUMN usr.login_sessions.login_date
IS 'TIMESTAMP �� login';

COMMENT ON COLUMN usr.login_sessions.logout_date
IS 'TIMESTAMP �� logout';

COMMENT ON COLUMN usr.login_sessions.ip_address
IS 'IP �� ����� �� � ������ �����������';

COMMENT ON COLUMN usr.login_sessions.authentication_type
IS '��� ������������: 1 - ������������� ��� � ������, 2 - ������� ����������, 3 - ���������� ����������';

COMMENT ON COLUMN usr.login_sessions.certificate_id
IS '�������� ������������� �� ����������';

COMMENT ON COLUMN usr.login_sessions.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN usr.login_sessions.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN usr.login_sessions.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN usr.login_sessions.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN usr.login_sessions.operation_id
IS '������������� �� ������� ��������, � ����� � �������� ������.';