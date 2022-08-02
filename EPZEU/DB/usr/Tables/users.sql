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
IS '������������� �������';

COMMENT ON COLUMN usr.users.user_id
IS '�������� ������������� �� ������������� ������';

COMMENT ON COLUMN usr.users.cin
IS '��������� ���������������� �����';

COMMENT ON COLUMN usr.users.email
IS '���������� ����';

COMMENT ON COLUMN usr.users.first_name
IS '��� �� �����������';

COMMENT ON COLUMN usr.users.middle_name
IS '������� �� �����������';

COMMENT ON COLUMN usr.users.family_name
IS '������� �� �����������';

COMMENT ON COLUMN usr.users.contact_data
IS '����� �� �������';

COMMENT ON COLUMN usr.users.organization
IS '����������� � ��������';

COMMENT ON COLUMN usr.users.special_access_user_type
IS '��� ������ ���������� ��� ��������� ������';

COMMENT ON COLUMN usr.users.cr_bulletin_acceptance
IS '�������� �� ��. ������� �� �������';

COMMENT ON COLUMN usr.users.pr_bulletin_acceptance
IS '�������� �� ��. ������� �� ��';

COMMENT ON COLUMN usr.users.status
IS '������ �� ������: 0 -  �����������, 1 - �������, 2 - ���������, 3 - ��������';

COMMENT ON COLUMN usr.users.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN usr.users.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN usr.users.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN usr.users.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN usr.users.is_system
IS '����, ������� ���� �������������� ������ � ��������';

COMMENT ON COLUMN usr.users.cr_message_acceptance
IS '�������� �� ���������� �� �������';

COMMENT ON COLUMN usr.users.pr_message_acceptance
IS '�������� �� ���������� �� ��';

COMMENT ON COLUMN usr.users.epzeu_message_acceptance
IS '�������� �� ��������� �� �����';

COMMENT ON CONSTRAINT users_status_chk ON usr.users
IS '0 - �����������, 1 - �������, 2 - ���������, 3 - ��������';

CREATE INDEX users_email_lower_idx ON usr.users
  USING btree ((lower((email)::text)) COLLATE pg_catalog."default");

CREATE INDEX users_family_name_idx ON usr.users
  USING btree (lower(family_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);

CREATE INDEX users_first_name_idx ON usr.users
  USING btree (lower(first_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);

CREATE INDEX users_middle_name_idx ON usr.users
  USING btree (lower(middle_name) COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);
