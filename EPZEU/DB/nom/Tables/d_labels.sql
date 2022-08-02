CREATE TABLE nom.d_labels (
  label_id SERIAL,
  label_ver_id INTEGER NOT NULL,
  code VARCHAR(200) NOT NULL,
  value VARCHAR(1000) NOT NULL,
  description VARCHAR(2000) DEFAULT NULL::character varying,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  is_last BIT(1) NOT NULL,
  deactivation_ver_id INTEGER,
  CONSTRAINT d_labels_pkey PRIMARY KEY(label_id, label_ver_id),
  CONSTRAINT d_labels_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_labels_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE nom.d_labels
IS 'Таблица съхраняваща преводите за ресурсите на Български език.';

COMMENT ON COLUMN nom.d_labels.label_id
IS 'Уникален идентификатор на запис за етикет';

COMMENT ON COLUMN nom.d_labels.label_ver_id
IS 'Уникален идентификатор на версия на етикет';

COMMENT ON COLUMN nom.d_labels.code
IS 'код на етикет';

COMMENT ON COLUMN nom.d_labels.value
IS 'текст на етикет';

COMMENT ON COLUMN nom.d_labels.description
IS 'описание на етикет';

COMMENT ON COLUMN nom.d_labels.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN nom.d_labels.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_labels.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN nom.d_labels.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN nom.d_labels.is_last
IS 'флаг, указващ дали това е последната версия на етикета';

COMMENT ON COLUMN nom.d_labels.deactivation_ver_id
IS 'Идентификатор на версия, с която е деактивиран записът';

COMMENT ON CONSTRAINT d_labels_created_by_fk ON nom.d_labels
IS 'Връзка към таблицата с потребителите за потребителя създал записа.';

COMMENT ON CONSTRAINT d_labels_updated_by_fk ON nom.d_labels
IS 'Връзка към таблицата с потребителите за потребителя последно редактирал записа.';

CREATE UNIQUE INDEX d_labels_code_is_last_idx ON nom.d_labels
  USING btree (code COLLATE pg_catalog."default")
  WHERE (is_last = (1)::bit(1));

COMMENT ON CONSTRAINT d_labels_pkey ON nom.d_labels
IS 'Уникален идентификатор за превод на ресурс.';

CREATE TRIGGER trg_d_labels_aiuds
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_labels
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.f_d_labels_trg();