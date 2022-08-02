CREATE TABLE nom.d_languages (
  language_id SERIAL,
  code VARCHAR(10) NOT NULL,
  name VARCHAR(100) NOT NULL,
  is_active BOOLEAN NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  is_default BOOLEAN NOT NULL,
  CONSTRAINT d_languages_pkey PRIMARY KEY(language_id),
  CONSTRAINT d_languages_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT d_languages_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN nom.d_languages.language_id
IS 'Уникален идентификатор на запис за език';

COMMENT ON COLUMN nom.d_languages.code
IS 'код на език';

COMMENT ON COLUMN nom.d_languages.name
IS 'наименование на език изписано на съответния език';

COMMENT ON COLUMN nom.d_languages.is_active
IS 'флаг, указващ дали езикът е маркиран като активен';

COMMENT ON COLUMN nom.d_languages.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN nom.d_languages.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN nom.d_languages.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN nom.d_languages.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN nom.d_languages.is_default
IS 'флаг, указващ дали езикът е маркиран като език "по подразбиране"';

CREATE TRIGGER d_languages_buffer_notify_changes
  AFTER INSERT OR UPDATE OR DELETE 
  ON nom.d_languages
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE nom.buffer_notify_d_languages();