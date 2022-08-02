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
IS '������������� �� ����� ����';

COMMENT ON COLUMN cms.video_lessons.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';

COMMENT ON COLUMN cms.video_lessons.title
IS '�������� �� ����� ����';

COMMENT ON COLUMN cms.video_lessons.description
IS '�������� �� ����� ����';

COMMENT ON COLUMN cms.video_lessons.status
IS '������ �� ����� ����: 0-������������; 1- ����������';

COMMENT ON COLUMN cms.video_lessons.file_name
IS '������������ �� ����';

COMMENT ON COLUMN cms.video_lessons.file_size
IS '������ �� ����';

COMMENT ON COLUMN cms.video_lessons.content_type
IS '��� �� ����';

COMMENT ON COLUMN cms.video_lessons.content
IS '���������� �� ����';

COMMENT ON COLUMN cms.video_lessons.created_by
IS '������������� �� �����������, ������ ������.';

COMMENT ON COLUMN cms.video_lessons.created_on
IS '���� � ��� �� ����������� �� ������.';

COMMENT ON COLUMN cms.video_lessons.updated_by
IS '������������� �� �����������, ���������� ������';

COMMENT ON COLUMN cms.video_lessons.updated_on
IS '���� � ��� �� ����������.';
