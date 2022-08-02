CREATE TABLE cms.news_documents (
  doc_id INTEGER DEFAULT nextval('cms.seq_news_documents'::regclass) NOT NULL,
  news_id INTEGER NOT NULL,
  file_name VARCHAR(200) NOT NULL,
  file_size INTEGER NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  content BYTEA NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT news_documents_pkey PRIMARY KEY(doc_id),
  CONSTRAINT news_documents_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT news_documents_news_id_fk FOREIGN KEY (news_id)
    REFERENCES cms.news(news_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT news_documents_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.news_documents
IS '��������� ��������� ��� ������';

COMMENT ON COLUMN cms.news_documents.doc_id
IS '�������� ������������� �� �������� ��������';

COMMENT ON COLUMN cms.news_documents.news_id
IS '�������� ������������� �� ������';

COMMENT ON COLUMN cms.news_documents.file_name
IS '������������ �� ��������';

COMMENT ON COLUMN cms.news_documents.file_size
IS '������ �� �����';

COMMENT ON COLUMN cms.news_documents.content_type
IS '��� �� ���������';

COMMENT ON COLUMN cms.news_documents.content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.news_documents.created_by
IS '�������� ������������� �� ���������� ������ ������';

COMMENT ON COLUMN cms.news_documents.created_on
IS 'TIMESTAMP �� ��������� �� ������';

COMMENT ON COLUMN cms.news_documents.updated_by
IS '�������� ������������� �� ���������� �������� �������� ������� �� ������';

COMMENT ON COLUMN cms.news_documents.updated_on
IS 'TIMESTAMP �� �������� ������� �� ������';
