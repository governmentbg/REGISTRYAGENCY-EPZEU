CREATE TABLE cms.forbidden_words (
  word_id INTEGER DEFAULT nextval('cms.seq_forbidden_words'::regclass) NOT NULL,
  word VARCHAR(200) NOT NULL,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT forbidden_words_pkey PRIMARY KEY(word_id),
  CONSTRAINT forbidden_words_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT forbidden_words_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.forbidden_words
  ALTER COLUMN word_id SET STATISTICS 0;

ALTER TABLE cms.forbidden_words
  ALTER COLUMN word SET STATISTICS 0;

ALTER TABLE cms.forbidden_words
  ALTER COLUMN created_by SET STATISTICS 0;

ALTER TABLE cms.forbidden_words
  ALTER COLUMN created_on SET STATISTICS 0;

ALTER TABLE cms.forbidden_words
  ALTER COLUMN updated_by SET STATISTICS 0;

ALTER TABLE cms.forbidden_words
  ALTER COLUMN updated_on SET STATISTICS 0;

COMMENT ON COLUMN cms.forbidden_words.word_id
IS 'Идентификатор на забранена дума';

COMMENT ON COLUMN cms.forbidden_words.word
IS 'Забранена дума';

COMMENT ON COLUMN cms.forbidden_words.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.forbidden_words.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.forbidden_words.updated_by
IS 'Идентификатор на потребителя, редактирал записа.';

COMMENT ON COLUMN cms.forbidden_words.updated_on
IS 'Дата и час на редакцията';

CREATE INDEX forbidden_words_idx ON cms.forbidden_words
  USING btree (word COLLATE pg_catalog."default" pg_catalog.varchar_pattern_ops);
