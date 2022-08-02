-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Structure for table templates_ver (OID = 18751) : 
--
SET search_path = templates, pg_catalog;
CREATE TABLE templates.templates_ver (
    template_id integer DEFAULT nextval('seq_templates_ver'::regclass) NOT NULL,
    template_ver_id integer NOT NULL,
    name varchar(50),
    document_text text,
    is_boolean boolean,
    file_content bytea,
    type smallint,
    created_by integer NOT NULL,
    created_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    updated_by integer NOT NULL,
    updated_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    status enm_template_statuses,
    is_last bit(1) NOT NULL,
    deactivation_ver_id integer
)
WITH (oids = false);
--
-- Definition for index templates_ver_is_last_idx (OID = 19185) : 
--
CREATE UNIQUE INDEX templates_ver_is_last_idx ON templates_ver USING btree (template_id) WHERE (is_last = (1)::bit(1));
--
-- Definition for index templates_ver_pkey (OID = 18758) : 
--
ALTER TABLE ONLY templates_ver
    ADD CONSTRAINT templates_ver_pkey
    PRIMARY KEY (template_id, template_ver_id);
--
-- Comments
--
COMMENT ON TABLE templates.templates_ver IS 'Шаблонна таблица с версии, която да служи за пример';
COMMENT ON COLUMN templates.templates_ver.template_id IS 'Уникален идентификатор, стойността се взима от SEQUENCE';
COMMENT ON COLUMN templates.templates_ver.template_ver_id IS 'Уникален идентификатор на версия';
COMMENT ON COLUMN templates.templates_ver.name IS 'Име на документа';
COMMENT ON COLUMN templates.templates_ver.document_text IS 'Текст на документа';
COMMENT ON COLUMN templates.templates_ver.is_boolean IS 'Флаг указващ дали шаблона е булев';
COMMENT ON COLUMN templates.templates_ver.file_content IS 'Файлово съдържание';
COMMENT ON COLUMN templates.templates_ver.type IS 'Тип на шаблона';
COMMENT ON COLUMN templates.templates_ver.created_by IS 'Идентификатор на потребителя,създал записа.';
COMMENT ON COLUMN templates.templates_ver.created_on IS 'Дата и час на създаването на записа;подаване на заявката.';
COMMENT ON COLUMN templates.templates_ver.updated_by IS 'Идентификатор на потребителя, редактирал записа.';
COMMENT ON COLUMN templates.templates_ver.updated_on IS 'Дата и час на редакцията.';
COMMENT ON COLUMN templates.templates_ver.status IS 'Статус на шаблона';
COMMENT ON COLUMN templates.templates_ver.is_last IS 'Флаг, указващ дали версията на обекта е последна';
COMMENT ON COLUMN templates.templates_ver.deactivation_ver_id IS 'Идентификатор на версия с която е деактивиран записа';
