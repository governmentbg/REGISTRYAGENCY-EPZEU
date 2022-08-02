CREATE TABLE cms.pages (
  page_id INTEGER DEFAULT nextval('cms.seq_pages'::regclass) NOT NULL,
  register_id SMALLINT NOT NULL,
  title VARCHAR(200) NOT NULL,
  content TEXT,
  type INTEGER NOT NULL,
  service_id INTEGER,
  application_id INTEGER,
  parent_id INTEGER,
  order_num INTEGER,
  is_group BOOLEAN NOT NULL,
  file_name VARCHAR(200),
  file_size INTEGER,
  content_type VARCHAR(100),
  file_content BYTEA,
  created_by INTEGER NOT NULL,
  created_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  updated_by INTEGER NOT NULL,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT sys.f_current_timestamp() NOT NULL,
  CONSTRAINT pages_pkey PRIMARY KEY(page_id),
  CONSTRAINT pages_fk_application_id FOREIGN KEY (application_id)
    REFERENCES nom.s_application_types(id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_fk_cb FOREIGN KEY (created_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_fk_parent_id FOREIGN KEY (parent_id)
    REFERENCES cms.pages(page_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_fk_service_id FOREIGN KEY (service_id)
    REFERENCES nom.d_services(service_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE,
  CONSTRAINT pages_fk_ub FOREIGN KEY (updated_by)
    REFERENCES usr.users(user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
    NOT DEFERRABLE
) 
WITH (oids = false);

ALTER TABLE cms.pages
  ALTER COLUMN page_id SET STATISTICS 0;

ALTER TABLE cms.pages
  ALTER COLUMN register_id SET STATISTICS 0;

ALTER TABLE cms.pages
  ALTER COLUMN title SET STATISTICS 0;

ALTER TABLE cms.pages
  ALTER COLUMN created_by SET STATISTICS 0;

ALTER TABLE cms.pages
  ALTER COLUMN created_on SET STATISTICS 0;

ALTER TABLE cms.pages
  ALTER COLUMN updated_by SET STATISTICS 0;

COMMENT ON COLUMN cms.pages.page_id
IS '������������� �� ����������';

COMMENT ON COLUMN cms.pages.register_id
IS '������������� �� ��������: 1 - ��������� �������� (CR), 2 - ������ �������� (PR)';

COMMENT ON COLUMN cms.pages.title
IS '��������';

COMMENT ON COLUMN cms.pages.content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.pages.type
IS '��� �� ��������: 1-�������� � ������; 2-�������� ��� ���������/�������/�������������; 3-�������� � ������� �� ���������; 4-�������� � ������������ ������;';

COMMENT ON COLUMN cms.pages.service_id
IS '������������� �� ������';

COMMENT ON COLUMN cms.pages.application_id
IS '������������� �� ���������';

COMMENT ON COLUMN cms.pages.parent_id
IS '������������� �� �������';

COMMENT ON COLUMN cms.pages.order_num
IS '������� �����';

COMMENT ON COLUMN cms.pages.is_group
IS '���� ������� ���� ���������� � �����';

COMMENT ON COLUMN cms.pages.file_name
IS '������������ �� ��������';

COMMENT ON COLUMN cms.pages.file_size
IS '������ �� �����';

COMMENT ON COLUMN cms.pages.content_type
IS '��� �� ���������';

COMMENT ON COLUMN cms.pages.file_content
IS '���������� �� ��������';

COMMENT ON COLUMN cms.pages.created_by
IS '������������� �� �����������, ������ ������.';

COMMENT ON COLUMN cms.pages.created_on
IS '���� � ��� �� ����������� �� ������.';

COMMENT ON COLUMN cms.pages.updated_by
IS '������������� �� �����������, ���������� ������';

COMMENT ON COLUMN cms.pages.updated_on
IS '���� � ��� �� ����������';
