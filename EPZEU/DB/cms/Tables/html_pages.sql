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
IS '������������� �� ��������';

COMMENT ON COLUMN cms.html_pages.module_id
IS '������';

COMMENT ON COLUMN cms.html_pages.title
IS '�������� �� ��������';

COMMENT ON COLUMN cms.html_pages.content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.html_pages.type
IS '��� �� ����������:0-������������� �������� � html ���������� ; 1- �������� � html ����������, ��������� �� �����������;';

COMMENT ON COLUMN cms.html_pages.status
IS '������ �� ����������:0 - �������������, 1 - �����������';

COMMENT ON COLUMN cms.html_pages.url
IS 'URL ����� �� ����������';

COMMENT ON COLUMN cms.html_pages.created_by
IS '������������� �� �����������, ������ ������.';

COMMENT ON COLUMN cms.html_pages.created_on
IS '���� � ��� �� ����������� �� ������.';

COMMENT ON COLUMN cms.html_pages.updated_by
IS '������������� �� �����������, ���������� ������';

COMMENT ON COLUMN cms.html_pages.updated_on
IS '���� � ��� �� ����������';
