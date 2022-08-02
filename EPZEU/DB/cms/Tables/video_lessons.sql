CREATE TABLE cms.video_lessons (
  lesson_id INTEGER DEFAULT nextval('cms.seq_video_lessons'::text::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  status SMALLINT NOT NULL,
  file_name VARCHAR(200),
  file_size INTEGER,
  content_type VARCHAR(100),
  content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT video_lessons_pkey PRIMARY KEY(lesson_id),
  CONSTRAINT video_lessons_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT video_lessons_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.video_lessons
  ALTER COLUMN lesson_id SET STATISTICS 0;

COMMENT ON COLUMN cms.video_lessons.lesson_id
IS 'Идентификатор на видео урок';

COMMENT ON COLUMN cms.video_lessons.register_id
IS 'Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)';

COMMENT ON COLUMN cms.video_lessons.title
IS 'Заглавие на видео урок';

COMMENT ON COLUMN cms.video_lessons.description
IS 'Описание на видео урок';

COMMENT ON COLUMN cms.video_lessons.status
IS 'Статус на видео урок: 0-непубликуван; 1- публикуван';

COMMENT ON COLUMN cms.video_lessons.file_name
IS 'Наименование на файл';

COMMENT ON COLUMN cms.video_lessons.file_size
IS 'Размер на файл';

COMMENT ON COLUMN cms.video_lessons.content_type
IS 'Тип на файл';

COMMENT ON COLUMN cms.video_lessons.content
IS 'Съдържание на файл';

COMMENT ON COLUMN cms.video_lessons.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.video_lessons.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.video_lessons.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.video_lessons.updated_on
IS 'Дата и час на редакцията.';
