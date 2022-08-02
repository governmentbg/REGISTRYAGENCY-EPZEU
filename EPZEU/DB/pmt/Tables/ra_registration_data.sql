CREATE TABLE pmt.ra_registration_data (
  type INTEGER NOT NULL,
  cin VARCHAR(100) NOT NULL,
  email VARCHAR(200),
  secret_word VARCHAR(200) NOT NULL,
  validity_period TIME(0) WITHOUT TIME ZONE NOT NULL,
  url VARCHAR(1000),
  url_response VARCHAR(1000),
  url_services VARCHAR(1000),
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT ra_registration_data_type_key UNIQUE(type),
  CONSTRAINT ra_registration_data_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT ra_registration_data_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE pmt.ra_registration_data
IS '�������������� ����� �� �� � ��������� �� �������� �������� ePay';

COMMENT ON COLUMN pmt.ra_registration_data.type
IS '��� �� ���������������� �����: 1 - ePay, 2 - ��� �� ����';

COMMENT ON COLUMN pmt.ra_registration_data.cin
IS '��� �� �� - ��������� ����� � ������� ����� �� ���������';

COMMENT ON COLUMN pmt.ra_registration_data.email
IS 'E-mail �� �� �� �����������';

COMMENT ON COLUMN pmt.ra_registration_data.secret_word
IS '������� ������� �������� ���� ���������� �� ePay';

COMMENT ON COLUMN pmt.ra_registration_data.validity_period
IS '������ �� ��������� �� ������� - ��������� �� ���������� �� �������� ���� � ��� �� ����������� �� ��������� ���� ���������';

COMMENT ON COLUMN pmt.ra_registration_data.url
IS '����� �� ������';

COMMENT ON COLUMN pmt.ra_registration_data.url_response
IS '���������� ����� �� ����������� - ���������� �����, �� ����� �� ������� ��������� �� �������� ������ �� ������ �� �������';

COMMENT ON COLUMN pmt.ra_registration_data.url_services
IS 'URL �� ������ �� �������� �� ��� �� ����';

COMMENT ON COLUMN pmt.ra_registration_data.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN pmt.ra_registration_data.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN pmt.ra_registration_data.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN pmt.ra_registration_data.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON CONSTRAINT ra_registration_data_created_by_fk ON pmt.ra_registration_data
IS '������ ��� ��������� � ������������� �� ����������� ������ ������.';

COMMENT ON CONSTRAINT ra_registration_data_updated_by_fk ON pmt.ra_registration_data
IS '������ ��� ��������� � ������������� �� ����������� �������� ���������� ������.';

