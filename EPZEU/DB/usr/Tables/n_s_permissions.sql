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
IS 'Права';

COMMENT ON COLUMN usr.n_s_permissions.permission_id
IS 'Уникален идентификатор на право';

COMMENT ON COLUMN usr.n_s_permissions.permission_key
IS 'Ключ на право';

COMMENT ON COLUMN usr.n_s_permissions.name
IS 'Наименование на право';

COMMENT ON COLUMN usr.n_s_permissions."order"
IS 'Подредба на правата в списъци';

COMMENT ON COLUMN usr.n_s_permissions.group_id
IS 'Групи права: 1-Специализиран достъп;2-Безплатен достъп;3-Администраторски права;';