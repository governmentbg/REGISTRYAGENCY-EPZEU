CREATE TABLE nom.d_labels_i18n (
  label_id INTEGER NOT NULL,
  label_ver_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  value VARCHAR(1000) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT d_labels_i18n_pkey PRIMARY KEY(label_id, language_id),
  CONSTRAINT d_labels_i18n_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_labels_i18n_fk_d_labels FOREIGN KEY (label_id, label_ver_id)
    REFERENCES nom.d_labels(label_id, label_ver_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_labels_i18n_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT fk_d_labels_i18n_d_languages FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN nom.d_labels_i18n.label_id
IS 'Уникален идентификатор на запис за етикет';

COMMENT ON COLUMN nom.d_labels_i18n.label_ver_id
IS 'Уникален идентификатор на версия на етикет';

COMMENT ON COLUMN nom.d_labels_i18n.language_id
IS 'Уникален идентификатор на запис за език';

COMMENT ON COLUMN nom.d_labels_i18n.value
IS 'текст на превод на етикет';

COMMENT ON COLUMN nom.d_labels_i18n.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN nom.d_labels_i18n.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_labels_i18n.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN nom.d_labels_i18n.updated_on
IS 'TIMESTAMP на последна промяна на записа';

CREATE TRIGGER d_labels_i18n_buffer_notify_changes
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_labels_i18n
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.buffer_notify_d_labels_i18n();