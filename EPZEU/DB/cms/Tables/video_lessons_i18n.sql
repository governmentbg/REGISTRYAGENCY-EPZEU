CREATE TABLE cms.video_lessons_i18n (
  lesson_id INTEGER NOT NULL,
  language_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  file_name VARCHAR(200),
  file_size INTEGER,
  content_type VARCHAR(100),
  content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT video_lessons_i18n_idx PRIMARY KEY(lesson_id, language_id),
  CONSTRAINT video_lessons_i18n_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT video_lessons_i18n_lang_fk FOREIGN KEY (language_id)
    REFERENCES nom.d_languages(language_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT video_lessons_i18n_lesson_id_fk FOREIGN KEY (lesson_id)
    REFERENCES cms.video_lessons(lesson_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT video_lessons_i18n_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.video_lessons_i18n
  ALTER COLUMN lesson_id SET STATISTICS 0;

COMMENT ON COLUMN cms.video_lessons_i18n.lesson_id
IS 'Идентификатор на видео урок';

COMMENT ON COLUMN cms.video_lessons_i18n.language_id
IS 'Идентификатор на езика, за който е превода на услугата';

COMMENT ON COLUMN cms.video_lessons_i18n.title
IS 'Заглавие на видео урок';

COMMENT ON COLUMN cms.video_lessons_i18n.description
IS 'Описание на видео урок';

COMMENT ON COLUMN cms.video_lessons_i18n.file_name
IS 'Наименование на файл';

COMMENT ON COLUMN cms.video_lessons_i18n.file_size
IS 'Размер на файл';

COMMENT ON COLUMN cms.video_lessons_i18n.content_type
IS 'Тип на файл';

COMMENT ON COLUMN cms.video_lessons_i18n.content
IS 'Съдържание на файл';

COMMENT ON COLUMN cms.video_lessons_i18n.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.video_lessons_i18n.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.video_lessons_i18n.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.video_lessons_i18n.updated_on
IS 'Дата и час на редакцията.';
