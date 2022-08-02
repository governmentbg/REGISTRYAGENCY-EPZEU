CREATE TABLE cms.themes_comments (
  theme_comment_id INTEGER DEFAULT nextval('cms.seq_theme_comment'::regclass) NOT NULL,
  theme_id INTEGER NOT NULL,
  comment TEXT,
  status SMALLINT NOT NULL,
  is_first BOOLEAN NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT themes_comments_pkey PRIMARY KEY(theme_comment_id),
  CONSTRAINT themes_comments_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    DEFERRABLE
    INITIALLY IMMEDIATE,
  CONSTRAINT themes_comments_fk FOREIGN KEY (theme_id)
    REFERENCES cms.themes(theme_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT themes_comments_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.themes_comments
  ALTER COLUMN theme_comment_id SET STATISTICS 0;

COMMENT ON COLUMN cms.themes_comments.theme_comment_id
IS 'Идентификатор на коментар по дадена тема';

COMMENT ON COLUMN cms.themes_comments.theme_id
IS 'Идентификатор на тема';

COMMENT ON COLUMN cms.themes_comments.comment
IS 'Коментар';

COMMENT ON COLUMN cms.themes_comments.status
IS 'Статус на коментар: 0- неподходящ;1-публикуван;';

COMMENT ON COLUMN cms.themes_comments.is_first
IS 'Флаг указващ, дали даден коментар е първи по темата';

COMMENT ON COLUMN cms.themes_comments.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.themes_comments.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.themes_comments.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN cms.themes_comments.updated_on
IS 'Дата и час на редакцията.';
