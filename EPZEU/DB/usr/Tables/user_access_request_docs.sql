CREATE TABLE usr.user_access_request_docs (
  doc_id INTEGER DEFAULT nextval('usr.seq_user_access_requests_docs'::regclass) NOT NULL,
  request_id INTEGER NOT NULL,
  name VARCHAR(200) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  content BYTEA NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  file_size INTEGER NOT NULL,
  CONSTRAINT user_access_requests_docs_pkey PRIMARY KEY(doc_id),
  CONSTRAINT user_access_requests_docs_created_by_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_access_requests_docs_request_id_fk FOREIGN KEY (request_id)
    REFERENCES usr.user_access_requests(request_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT user_access_requests_docs_updated_by_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
)
WITH (oids = false);

COMMENT ON TABLE usr.user_access_request_docs
IS 'Документи за специален достъп';

COMMENT ON COLUMN usr.user_access_request_docs.doc_id
IS 'Уникален идентификатор на документ за специален достъп';

COMMENT ON COLUMN usr.user_access_request_docs.request_id
IS 'Уникален идентификатор на заявка за специален достъп';

COMMENT ON COLUMN usr.user_access_request_docs.name
IS 'Наименование на документ';

COMMENT ON COLUMN usr.user_access_request_docs.content_type
IS 'Тип на документа';

COMMENT ON COLUMN usr.user_access_request_docs.content
IS 'Съдържание на документ';

COMMENT ON COLUMN usr.user_access_request_docs.created_by
IS 'Уникален идентификатор на потребител създал записа';

COMMENT ON COLUMN usr.user_access_request_docs.created_on
IS 'TIMESTAMP на създаване на записа';

COMMENT ON COLUMN usr.user_access_request_docs.updated_by
IS 'Уникален идентификатор на потребител направил последна промяна на записа';

COMMENT ON COLUMN usr.user_access_request_docs.updated_on
IS 'TIMESTAMP на последна промяна на записа';

COMMENT ON COLUMN usr.user_access_request_docs.file_size
IS 'Размер на файла';

CREATE INDEX user_access_requests_docs_request_id_idx ON usr.user_access_request_docs
  USING btree (request_id);
