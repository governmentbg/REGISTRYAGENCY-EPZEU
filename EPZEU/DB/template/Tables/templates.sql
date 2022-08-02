-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Structure for table templates (OID = 18716) : 
--
SET search_path = templates, pg_catalog;
CREATE TABLE templates.templates (
    template_id integer DEFAULT nextval('seq_templates'::regclass) NOT NULL,
    name varchar(50) NOT NULL,
    document_text text,
    is_boolean boolean,
    file_content bytea,
    type smallint,
    created_by integer NOT NULL,
    created_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    updated_by integer NOT NULL,
    updated_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    status enm_template_statuses
)
WITH (oids = false);
--
-- Definition for index templates_type_idx (OID = 18838) : 
--
CREATE INDEX templates_type_idx ON templates USING btree (type);
--
-- Definition for index templates_name_idx (OID = 28250) : 
--
CREATE INDEX templates_name_idx ON templates USING btree (name varchar_pattern_ops);
--
-- Definition for index templates_pkey (OID = 18722) : 
--
ALTER TABLE ONLY templates
    ADD CONSTRAINT templates_pkey
    PRIMARY KEY (template_id);
--
-- Comments
--
COMMENT ON TABLE templates.templates IS 'Шаблонна таблица, която да служи за пример';
COMMENT ON COLUMN templates.templates.template_id IS 'Уникален идентификатор на шаблон';
COMMENT ON COLUMN templates.templates.name IS 'име на шаблона';
COMMENT ON COLUMN templates.templates.document_text IS 'текст на документа';
COMMENT ON COLUMN templates.templates.is_boolean IS 'Флаг указващ дали шаблона е булев';
COMMENT ON COLUMN templates.templates.file_content IS 'Фаилово съдържание';
COMMENT ON COLUMN templates.templates.type IS 'Тип на шаблона';
COMMENT ON COLUMN templates.templates.created_by IS 'Идентификатор на потребителя,създал записа.';
COMMENT ON COLUMN templates.templates.created_on IS 'Дата и час на създаването на записа;подаване на заявката.';
COMMENT ON COLUMN templates.templates.updated_by IS 'Идентификатор на потребителя, редактирал записа.';
COMMENT ON COLUMN templates.templates.updated_on IS 'Дата и час на редакцията.';
COMMENT ON COLUMN templates.templates.status IS 'статус на шаблона';
