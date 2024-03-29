CREATE TABLE sys.service_operations (
  service_operation_id BIGSERIAL,
  operation_id VARCHAR(64) NOT NULL,
  operation_type_id SMALLINT NOT NULL,
  is_completed BOOLEAN NOT NULL,
  result VARCHAR(2000),
  next_ops VARCHAR(2000),
  created_by INTEGER,
  created_on TIMESTAMP(3) WITH TIME ZONE,
  updated_by INTEGER,
  updated_on TIMESTAMP(3) WITH TIME ZONE,
  CONSTRAINT service_operations_pkey PRIMARY KEY(service_operation_id),
  CONSTRAINT fk_service_operations FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_service_operations_cb FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN sys.service_operations.created_by
IS 'Идентификатор на потребителя,създал записа.';

COMMENT ON COLUMN sys.service_operations.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN sys.service_operations.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN sys.service_operations.updated_on
IS 'Дата и час на редакцията.';

COMMENT ON CONSTRAINT fk_service_operations ON sys.service_operations
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

COMMENT ON CONSTRAINT fk_service_operations_cb ON sys.service_operations
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

CREATE UNIQUE INDEX service_operations_oper_id_oper_typr_idx ON sys.service_operations
  USING btree (operation_id COLLATE pg_catalog."default", operation_type_id);

ALTER TABLE sys.service_operations
  OWNER TO epzeu_dev;