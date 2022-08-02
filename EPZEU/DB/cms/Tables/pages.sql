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
IS 'Идентификатор на съдържание';

COMMENT ON COLUMN cms.pages.register_id
IS 'Идентификатор на регистър: 1 - Търговски регистър (CR), 2 - Имотен регистър (PR)';

COMMENT ON COLUMN cms.pages.title
IS 'Заглавие';

COMMENT ON COLUMN cms.pages.content
IS 'Съдържание на страница';

COMMENT ON COLUMN cms.pages.type
IS 'Тип на страница: 1-страници с услуги; 2-страница със заявления/искания/удостоверения; 3-страница с образци на документи; 4-страница с нормативната уредва;';

COMMENT ON COLUMN cms.pages.service_id
IS 'Идентификатор на услуга';

COMMENT ON COLUMN cms.pages.application_id
IS 'Идентификатор на заявление';

COMMENT ON COLUMN cms.pages.parent_id
IS 'Идентификатор на родител';

COMMENT ON COLUMN cms.pages.order_num
IS 'Пореден номер';

COMMENT ON COLUMN cms.pages.is_group
IS 'Флаг указващ дали страницата е група';

COMMENT ON COLUMN cms.pages.file_name
IS 'Наименование на документ';

COMMENT ON COLUMN cms.pages.file_size
IS 'Размер на файла';

COMMENT ON COLUMN cms.pages.content_type
IS 'Тип на документа';

COMMENT ON COLUMN cms.pages.file_content
IS 'Съдържание на документ';

COMMENT ON COLUMN cms.pages.created_by
IS 'Идентификатор на потребителя, създал записа.';

COMMENT ON COLUMN cms.pages.created_on
IS 'Дата и час на създаването на записа.';

COMMENT ON COLUMN cms.pages.updated_by
IS 'Идентификатор на потребителя, редактирал записа';

COMMENT ON COLUMN cms.pages.updated_on
IS 'Дата и час на редакцията';
