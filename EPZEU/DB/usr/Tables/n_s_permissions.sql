CREATE TABLE usr.n_s_permissions (
  permission_id INTEGER NOT NULL,
  permission_key VARCHAR(100),
  name VARCHAR(200),
  "order" INTEGER,
  group_id INTEGER,
  CONSTRAINT s_permissions_pkey PRIMARY KEY(permission_id)
) 
WITH (oids = false);

COMMENT ON TABLE usr.n_s_permissions
IS '�����';

COMMENT ON COLUMN usr.n_s_permissions.permission_id
IS '�������� ������������� �� �����';

COMMENT ON COLUMN usr.n_s_permissions.permission_key
IS '���� �� �����';

COMMENT ON COLUMN usr.n_s_permissions.name
IS '������������ �� �����';

COMMENT ON COLUMN usr.n_s_permissions."order"
IS '�������� �� ������� � �������';

COMMENT ON COLUMN usr.n_s_permissions.group_id
IS '����� �����: 1-������������� ������;2-��������� ������;3-���������������� �����;';