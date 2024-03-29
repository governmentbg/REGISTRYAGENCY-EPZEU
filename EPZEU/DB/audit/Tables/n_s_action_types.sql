CREATE TABLE audit.n_s_action_types (
  action_type_id INTEGER NOT NULL,
  name VARCHAR(200) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT n_s_action_type_pkey PRIMARY KEY(action_type_id)
) 
WITH (oids = false);

COMMENT ON TABLE audit.n_s_action_types
IS 'Действия за одит';

COMMENT ON COLUMN audit.n_s_action_types.action_type_id
IS 'Идентификатор на действие за одит.';

COMMENT ON COLUMN audit.n_s_action_types.name
IS 'Име на действието.';

COMMENT ON COLUMN audit.n_s_action_types.description
IS 'Описание на действието.';

COMMENT ON COLUMN audit.n_s_action_types.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN audit.n_s_action_types.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN audit.n_s_action_types.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN audit.n_s_action_types.updated_on
IS 'Дата и час на редакцията.';