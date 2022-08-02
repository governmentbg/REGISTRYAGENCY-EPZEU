CREATE TABLE aspnetcore.data_protection_keys (
  id VARCHAR(50) NOT NULL,
  keyxml TEXT NOT NULL,
  creation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  activation_date TIMESTAMP WITH TIME ZONE NOT NULL,
  expiration_date TIMESTAMP WITH TIME ZONE NOT NULL,
  CONSTRAINT data_protection_keys_key PRIMARY KEY(id)
) 
WITH (oids = false);

COMMENT ON TABLE aspnetcore.data_protection_keys
IS '������� �� ���������� �� ���������, ����� �� ������ �� Aspnet Core DataProtection.';

COMMENT ON COLUMN aspnetcore.data_protection_keys.id
IS '�������� ������������� �� �����';

COMMENT ON COLUMN aspnetcore.data_protection_keys.keyxml
IS '����� �� �����';

COMMENT ON COLUMN aspnetcore.data_protection_keys.creation_date
IS '���� �� ��������� �� �����.';

COMMENT ON COLUMN aspnetcore.data_protection_keys.activation_date
IS '���� �� ���������� �� �����.';

COMMENT ON COLUMN aspnetcore.data_protection_keys.expiration_date
IS '���� �� �������� �� �����';