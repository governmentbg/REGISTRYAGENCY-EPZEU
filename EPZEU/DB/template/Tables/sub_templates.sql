-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Structure for table sub_templates (OID = 18795) : 
--
SET search_path = templates, pg_catalog;
CREATE TABLE templates.sub_templates (
    sub_template_id integer NOT NULL,
    template_id integer,
    created_by integer NOT NULL,
    created_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    updated_by integer NOT NULL,
    updated_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL
)
WITH (oids = false);
--
-- Definition for index sub_templates_pkey (OID = 18798) : 
--
ALTER TABLE ONLY sub_templates
    ADD CONSTRAINT sub_templates_pkey
    PRIMARY KEY (sub_template_id);
--
-- Comments
--
COMMENT ON TABLE templates.sub_templates IS 'Шаблонна таблица с подчинени обекти';
COMMENT ON COLUMN templates.sub_templates.sub_template_id IS 'Уникален идентификатор на под-шаблон';
COMMENT ON COLUMN templates.sub_templates.template_id IS 'Идентификатор на шаблон';
COMMENT ON COLUMN templates.sub_templates.created_by IS 'Идентификатор на потребителя,създал записа.';
COMMENT ON COLUMN templates.sub_templates.created_on IS 'Дата и час на създаването на записа;подаване на заявката.';
COMMENT ON COLUMN templates.sub_templates.updated_by IS 'Идентификатор на потребителя, редактирал записа.';
COMMENT ON COLUMN templates.sub_templates.updated_on IS 'Дата и час на редакцията.';
