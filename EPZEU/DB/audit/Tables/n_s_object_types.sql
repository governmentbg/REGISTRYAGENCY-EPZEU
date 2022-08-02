CREATE TABLE audit.n_s_object_types (
  object_type_id INTEGER NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT n_s_object_type_pkey PRIMARY KEY(object_type_id)
) 
WITH (oids = false);

COMMENT ON TABLE audit.n_s_object_types
IS 'Обекти за одит';

COMMENT ON COLUMN audit.n_s_object_types.object_type_id
IS 'Идентификатор на обект за одит.';

COMMENT ON COLUMN audit.n_s_object_types.name
IS 'Име на обект.';

COMMENT ON COLUMN audit.n_s_object_types.description
IS 'Описание на обект.';

COMMENT ON COLUMN audit.n_s_object_types.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN audit.n_s_object_types.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN audit.n_s_object_types.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN audit.n_s_object_types.updated_on
IS 'Дата и час на редакцията.';