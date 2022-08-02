CREATE TABLE cms.themes (
  theme_id INTEGER DEFAULT nextval('cms.seq_theme'::regclass) NOT NULL,
  title TEXT NOT NULL,
  status SMALLINT NOT NULL,
  last_comment_date TIMESTAMP WITH TIME ZONE,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT theme_pkey PRIMARY KEY(theme_id),
  CONSTRAINT theme_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT theme_up_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.themes
IS 'Тема';

COMMENT ON COLUMN cms.themes.theme_id
IS 'Идентификатор на тема';

COMMENT ON COLUMN cms.themes.title
IS 'Заглавие на тема';

COMMENT ON COLUMN cms.themes.status
IS 'Статус на темата: 0- неподходящ; 1-публикуван;';

COMMENT ON COLUMN cms.themes.last_comment_date
IS 'Дата на последен коментар';

COMMENT ON COLUMN cms.themes.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.themes.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.themes.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.themes.updated_on
IS 'Дата и час на редакцията.';
