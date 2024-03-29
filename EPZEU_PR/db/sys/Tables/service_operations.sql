CREATE TABLE sys.service_operations (
  service_operation_id BIGINT DEFAULT nextval('sys.seq_service_operations'::regclass) NOT NULL,
  operation_id VARCHAR(100) NOT NULL,
  type sys.enum_operation_type NOT NULL,
  is_completed BOOLEAN NOT NULL,
  result VARCHAR(2000),
  next_ops VARCHAR(2000),
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT operation_pkey PRIMARY KEY(service_operation_id),
  CONSTRAINT operation_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT operation_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.app_users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON COLUMN sys.service_operations.created_by
IS 'Идентификатор на потребителя,създал записа';

COMMENT ON COLUMN sys.service_operations.created_on
IS 'Дата и час на създаването на записа';

COMMENT ON COLUMN sys.service_operations.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN sys.service_operations.updated_on
IS 'Дата и час на редакцията';

CREATE UNIQUE INDEX service_operations_oper_id_oper_typr_idx ON sys.service_operations
  USING btree (operation_id COLLATE pg_catalog."default", type);


ALTER TABLE sys.service_operations
  OWNER TO epzeu_dev;
