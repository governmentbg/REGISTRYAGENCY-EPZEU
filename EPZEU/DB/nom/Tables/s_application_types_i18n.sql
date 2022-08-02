CREATE TABLE nom.s_application_types_i18n (
  id SMALLINT NOT NULL,
  language_id INTEGER NOT NULL,
  name VARCHAR NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT s_application_types_i18n_pkey PRIMARY KEY(id, language_id),
  CONSTRAINT s_application_types_i18n_cb FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT s_application_types_i18n_fk_id FOREIGN KEY (id)
    REFERENCES nom.s_application_types(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT s_application_types_i18n_fk_lang_id FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT s_application_types_i18n_fk_ub FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE nom.s_application_types_i18n
  ALTER COLUMN id SET STATISTICS 0;

COMMENT ON COLUMN nom.s_application_types_i18n.id
IS '������������� �� ��� ���������';

COMMENT ON COLUMN nom.s_application_types_i18n.language_id
IS '������������� �� ����';

COMMENT ON COLUMN nom.s_application_types_i18n.name
IS '������������ �� ��� ���������';

COMMENT ON COLUMN nom.s_application_types_i18n.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN nom.s_application_types_i18n.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN nom.s_application_types_i18n.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN nom.s_application_types_i18n.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
