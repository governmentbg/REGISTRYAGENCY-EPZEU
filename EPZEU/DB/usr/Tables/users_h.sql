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
IS '������� �� ��������� �� ������������� �������';

COMMENT ON COLUMN usr.users_h.user_id
IS '�������� ������������� �� ������������� ������';

COMMENT ON COLUMN usr.users_h.user_ver_id
IS '������ �� ������� �� ������������� ������';

COMMENT ON COLUMN usr.users_h.cin
IS '��������� ���������������� �����';

COMMENT ON COLUMN usr.users_h.email
IS '���������� ����';

COMMENT ON COLUMN usr.users_h.first_name
IS '��� �� �����������';

COMMENT ON COLUMN usr.users_h.middle_name
IS '������� �� �����������';

COMMENT ON COLUMN usr.users_h.family_name
IS '������� �� �����������';

COMMENT ON COLUMN usr.users_h.contact_data
IS '����� �� �������';

COMMENT ON COLUMN usr.users_h.organization
IS '����������� � ��������';

COMMENT ON COLUMN usr.users_h.special_access_user_type
IS '��� ������ ���������� ��� ��������� ������';

COMMENT ON COLUMN usr.users_h.cr_bulletin_acceptance
IS '�������� �� ��. ������� �� �������';

COMMENT ON COLUMN usr.users_h.pr_bulletin_acceptance
IS '�������� �� ��. ������� �� ��';

COMMENT ON COLUMN usr.users_h.status
IS '������ �� ������: 0 -  �����������, 1 - �������, 2 - ���������, 3 - ��������';

COMMENT ON COLUMN usr.users_h.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN usr.users_h.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN usr.users_h.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN usr.users_h.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN usr.users_h.is_system
IS '����, ������� ���� �������������� ������ � ��������';

COMMENT ON COLUMN usr.users_h.is_last
IS '����, ������� ���� �������� � ��������';

COMMENT ON COLUMN usr.users_h.deactivation_ver_id
IS '������������� �� ������ � ����� � ����������� ������';

COMMENT ON COLUMN usr.users_h.cr_message_acceptance
IS '�������� �� ��������� �� �������';

COMMENT ON COLUMN usr.users_h.pr_message_acceptance
IS '�������� �� ���������� �� ��';

COMMENT ON COLUMN usr.users_h.epzeu_message_acceptance
IS '�������� �� ��������� �� �����';
