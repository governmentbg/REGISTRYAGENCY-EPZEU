CREATE TABLE cms.news (
  news_id INTEGER DEFAULT nextval('cms.seq_news'::text::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  image BYTEA,
  title VARCHAR(1000) NOT NULL,
  short_description VARCHAR(2000),
  description TEXT NOT NULL,
  news_date TIMESTAMP WITH TIME ZONE NOT NULL,
  publication_date TIMESTAMP WITH TIME ZONE,
  expiration_date TIMESTAMP WITH TIME ZONE,
  is_hot_news BOOLEAN NOT NULL,
  status INTEGER,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  file_name VARCHAR(200),
  file_size INTEGER,
  content_type VARCHAR(100),
  CONSTRAINT news_pkey PRIMARY KEY(news_id),
  CONSTRAINT news_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT news_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.news
IS '������';

COMMENT ON COLUMN cms.news.news_id
IS '�������� ������������� �� ������';

COMMENT ON COLUMN cms.news.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';

COMMENT ON COLUMN cms.news.image
IS '����������� ��� ����������';

COMMENT ON COLUMN cms.news.title
IS '�������� �� ������';

COMMENT ON COLUMN cms.news.short_description
IS '������ ��������';

COMMENT ON COLUMN cms.news.description
IS '����������� HTML ���������� �� ������';

COMMENT ON COLUMN cms.news.news_date
IS '���� �� ����� � ��������';

COMMENT ON COLUMN cms.news.publication_date
IS '���� �� �����������';

COMMENT ON COLUMN cms.news.expiration_date
IS '���� �� ��������';

COMMENT ON COLUMN cms.news.is_hot_news
IS '������ ������';

COMMENT ON COLUMN cms.news.status
IS '������ �� ������: 0 - �������������, 1 - �����������';

COMMENT ON COLUMN cms.news.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.news.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.news.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN cms.news.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';

COMMENT ON COLUMN cms.news.file_name
IS '������������ �� ���� �� �����������';

COMMENT ON COLUMN cms.news.file_size
IS '������ �� ���� �� �����������';

COMMENT ON COLUMN cms.news.content_type
IS '��� �� ���� �� �����������';
