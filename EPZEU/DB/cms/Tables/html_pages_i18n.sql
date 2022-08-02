CREATE TABLE cms.html_pages_i18n (
  page_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT html_pages_i18n_pkey PRIMARY KEY(page_id, language_id),
  CONSTRAINT html_pages_i18n_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT html_pages_i18n_id_fk FOREIGN KEY (page_id)
    REFERENCES cms.html_pages(page_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT html_pages_i18n_language_id_fk FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT html_pages_i18n_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON COLUMN cms.html_pages_i18n.page_id
IS '������������� �� ��������';

COMMENT ON COLUMN cms.html_pages_i18n.language_id
IS '������������� �� �����, �� ����� � ������� �� ��������';

COMMENT ON COLUMN cms.html_pages_i18n.title
IS '�������� �� ��������';

COMMENT ON COLUMN cms.html_pages_i18n.content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.html_pages_i18n.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.html_pages_i18n.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.html_pages_i18n.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN cms.html_pages_i18n.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
