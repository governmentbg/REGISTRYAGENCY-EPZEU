CREATE TABLE cms.n_s_static_pages (
  page_key VARCHAR(200) NOT NULL,
  module_id INTEGER NOT NULL,
  label_key VARCHAR(200),
  url TEXT NOT NULL,
  CONSTRAINT n_s_static_pages_pkey PRIMARY KEY(page_key),
  CONSTRAINT n_s_static_pages_fk FOREIGN KEY (module_id)
    REFERENCES public.n_s_modules(module_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

COMMENT ON TABLE cms.n_s_static_pages
IS 'Статични страници';

COMMENT ON COLUMN cms.n_s_static_pages.page_key
IS 'Ключ на страница';

COMMENT ON COLUMN cms.n_s_static_pages.module_id
IS 'Система';

COMMENT ON COLUMN cms.n_s_static_pages.label_key
IS 'Ключ на етикет с наименование на страница';

COMMENT ON COLUMN cms.n_s_static_pages.url
IS 'URL адрес на страница';

CREATE TRIGGER trg_n_s_static_pages
  AFTER INSERT OR UPDATE OR DELETE 
  ON cms.n_s_static_pages
  
FOR EACH STATEMENT 
  EXECUTE PROCEDURE cms.f_n_s_static_pages_trg();