CREATE TABLE usr.n_s_special_access_user_types (
  user_type_id INTEGER DEFAULT nextval('usr.seq_n_s_special_access_user_types'::text::regclass) NOT NULL,
  name VARCHAR(200),
  CONSTRAINT s_special_access_user_types_pkey PRIMARY KEY(user_type_id)
)
WITH (oids = false);

COMMENT ON TABLE usr.n_s_special_access_user_types
IS 'Видове потребители със специален достъп';

COMMENT ON COLUMN usr.n_s_special_access_user_types.user_type_id
IS 'Уникален идентификатор на вид потребител със специален достъп';

COMMENT ON COLUMN usr.n_s_special_access_user_types.name
IS 'Наименование на вид потребител със специален достъп';
