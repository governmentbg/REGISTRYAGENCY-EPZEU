CREATE TABLE cms.pages_i18n (
  page_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT pages_i18n_pkey PRIMARY KEY(page_id, language_id),
  CONSTRAINT pages_i18n_fk_cb FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_i18n_fk_ub FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_i18n_language_id_fk FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_i18n_page_id_fk FOREIGN KEY (page_id)
    REFERENCES cms.pages(page_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.pages_i18n
IS 'Превод на страници с услуги, заявления/искания/удостоверения, образци на документи, нормативна уредба и ръководства за потребителите';

COMMENT ON COLUMN cms.pages_i18n.page_id
IS 'Идентификатор на съдържание';

COMMENT ON COLUMN cms.pages_i18n.title
IS 'Заглавие';

COMMENT ON COLUMN cms.pages_i18n.content
IS 'Съдържание на страница';

COMMENT ON COLUMN cms.pages_i18n.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.pages_i18n.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.pages_i18n.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.pages_i18n.updated_on
IS 'Дата и час на редакцията';