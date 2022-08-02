CREATE TABLE cms.html_pages (
  page_id INTEGER DEFAULT nextval('cms.seq_html_pages'::regclass) NOT NULL,
  module_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  type INTEGER NOT NULL,
  status INTEGER,
  url TEXT,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT pages_html_pkey PRIMARY KEY(page_id),
  CONSTRAINT html_pages_cb_fk FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT html_pages_module_fk FOREIGN KEY (module_id)
    REFERENCES public.n_s_modules(module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT html_pages_ub_fk FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.html_pages
  ALTER COLUMN page_id SET STATISTICS 0;

COMMENT ON COLUMN cms.html_pages.page_id
IS 'Идентификатор на страница';

COMMENT ON COLUMN cms.html_pages.module_id
IS 'Портал';

COMMENT ON COLUMN cms.html_pages.title
IS 'Заглавие на страница';

COMMENT ON COLUMN cms.html_pages.content
IS 'Съдържание на страница';

COMMENT ON COLUMN cms.html_pages.type
IS 'Тип на страницата:0-Предифинирани страници с html съдържание ; 1- Страници с html съдържание, създадени от потребители;';

COMMENT ON COLUMN cms.html_pages.status
IS 'Статус на страницата:0 - Непубликувана, 1 - Публикувана';

COMMENT ON COLUMN cms.html_pages.url
IS 'URL адрес на страницата';

COMMENT ON COLUMN cms.html_pages.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.html_pages.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.html_pages.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.html_pages.updated_on
IS 'Дата и час на редакцията';
