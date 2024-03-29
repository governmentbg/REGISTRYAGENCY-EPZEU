CREATE TABLE audit.log_actions (
  log_action_id BIGINT DEFAULT nextval('audit.seq_log_actions'::regclass) NOT NULL,
  log_action_date TIMESTAMP WITH TIME ZONE NOT NULL,
  object_type_id SMALLINT NOT NULL,
  action_type_id SMALLINT NOT NULL,
  module_id SMALLINT NOT NULL,
  functionality_id SMALLINT NOT NULL,
  key VARCHAR(100),
  user_session_id UUID,
  login_session_id UUID,
  user_id INTEGER NOT NULL,
  ip_address INET NOT NULL,
  additional_data JSONB,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  operation_id VARCHAR(64) NOT NULL,
  data_access_level INTEGER DEFAULT 1 NOT NULL,
  CONSTRAINT log_actions_operation_id_key UNIQUE(operation_id),
  CONSTRAINT log_actions_pkey PRIMARY KEY(log_action_id),
  CONSTRAINT log_actions_action_type_fk FOREIGN KEY (action_type_id)
    REFERENCES audit.n_s_action_types(action_type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT log_actions_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT log_actions_functionality_id_fk FOREIGN KEY (functionality_id)
    REFERENCES public.n_s_functionalities(functionality_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT log_actions_module_id_fk FOREIGN KEY (module_id)
    REFERENCES public.n_s_modules(module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT log_actions_object_type_fk FOREIGN KEY (object_type_id)
    REFERENCES audit.n_s_object_types(object_type_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT log_actions_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE audit.log_actions
IS 'Одитен журнал';

COMMENT ON COLUMN audit.log_actions.log_action_id
IS 'Уникален идентификатор на събитието';

COMMENT ON COLUMN audit.log_actions.log_action_date
IS 'Дата и час на настъпване на събитието';

COMMENT ON COLUMN audit.log_actions.object_type_id
IS 'Тип на обект, за който е събитието';

COMMENT ON COLUMN audit.log_actions.action_type_id
IS 'Събитие, за което се записват данните за одит';

COMMENT ON COLUMN audit.log_actions.module_id
IS 'Портал/Система в която е функционалността/модула през който е настъпило събитието';

COMMENT ON COLUMN audit.log_actions.functionality_id
IS 'Функционалност през която е настъпило събитието';

COMMENT ON COLUMN audit.log_actions.key
IS 'Стойност на ключов атрибут на обекта';

COMMENT ON COLUMN audit.log_actions.user_session_id
IS 'Уникален идентификатор на потребителската сесия';

COMMENT ON COLUMN audit.log_actions.login_session_id
IS 'Уникален идентификатор на логин сесия';

COMMENT ON COLUMN audit.log_actions.user_id
IS 'Уникален идентификатор на потребителски профил';

COMMENT ON COLUMN audit.log_actions.ip_address
IS 'IP адрес на потребителя, извършващ действието';

COMMENT ON COLUMN audit.log_actions.additional_data
IS 'Допълнителна информация';

COMMENT ON COLUMN audit.log_actions.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN audit.log_actions.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN audit.log_actions.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN audit.log_actions.updated_on
IS 'Дата и час на pпоследна редакцията на записа.';

COMMENT ON COLUMN audit.log_actions.operation_id
IS 'Идентификатор за идемпотентност на операция';

COMMENT ON COLUMN audit.log_actions.data_access_level
IS 'Ниво на достъп до данните: 1 - достъп от потребители с право "Одит", 2 - достъп от потребители с право "Одит за разследващи органи"';

COMMENT ON CONSTRAINT log_actions_action_type_fk ON audit.log_actions
IS 'Връзка към действия за одит.';

COMMENT ON CONSTRAINT log_actions_created_by_fk ON audit.log_actions
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT log_actions_functionality_id_fk ON audit.log_actions
IS 'Връзка към Функционалности.';

COMMENT ON CONSTRAINT log_actions_module_id_fk ON audit.log_actions
IS 'Връзка към Портали/Системи.';

COMMENT ON CONSTRAINT log_actions_object_type_fk ON audit.log_actions
IS 'Връзка към обекти за одит.';

COMMENT ON CONSTRAINT log_actions_updated_by_fk ON audit.log_actions
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT log_actions_pkey ON audit.log_actions
IS 'Уникален идентификатор на запис в журнала.';

