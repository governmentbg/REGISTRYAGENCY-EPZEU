-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Structure for table sub_templates_ver (OID = 19197) : 
--
SET search_path = templates, pg_catalog;
CREATE TABLE templates.sub_templates_ver (
    sub_template_id integer NOT NULL,
    sub_template_ver_id integer NOT NULL,
    template_id integer NOT NULL,
    template_ver_id integer NOT NULL,
    created_by integer NOT NULL,
    created_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    updated_by integer NOT NULL,
    updated_on timestamp with time zone DEFAULT sys.f_current_timestamp() NOT NULL,
    is_last bit(1) NOT NULL,
    deactivation_ver_id integer
)
WITH (oids = false);
--
-- Definition for index sub_templates_ver_is_last_idx (OID = 19207) : 
--
CREATE UNIQUE INDEX sub_templates_ver_is_last_idx ON sub_templates_ver USING btree (sub_template_id) WHERE (is_last = (1)::bit(1));
--
-- Definition for index sub_templates_ver_fk_idx (OID = 19208) : 
--
CREATE INDEX sub_templates_ver_fk_idx ON sub_templates_ver USING btree (template_id, template_ver_id);
--
-- Definition for index sub_templates_ver_fk (OID = 19202) : 
--
ALTER TABLE ONLY sub_templates_ver
    ADD CONSTRAINT sub_templates_ver_fk
    FOREIGN KEY (template_id, template_ver_id) REFERENCES templates_ver(template_id, template_ver_id);
--
-- Definition for index sub_templates_ver_pkey (OID = 19209) : 
--
ALTER TABLE ONLY sub_templates_ver
    ADD CONSTRAINT sub_templates_ver_pkey
    PRIMARY KEY (sub_template_id, sub_template_ver_id);
--
-- Comments
--
COMMENT ON TABLE templates.sub_templates_ver IS 'Шаблонна таблица с подчинени обекти с версии';
COMMENT ON COLUMN templates.sub_templates_ver.sub_template_id IS 'Уникален идентификатор на под-шаблон';
COMMENT ON COLUMN templates.sub_templates_ver.sub_template_ver_id IS 'Версия на под-шаблон';
COMMENT ON COLUMN templates.sub_templates_ver.template_id IS 'идентификатор на шаблон';
COMMENT ON COLUMN templates.sub_templates_ver.template_ver_id IS 'идентификатор на версия на шаблон';
COMMENT ON COLUMN templates.sub_templates_ver.created_by IS 'Идентификатор на потребителя,създал записа.';
COMMENT ON COLUMN templates.sub_templates_ver.created_on IS 'Дата и час на създаването на записа;подаване на заявката.';
COMMENT ON COLUMN templates.sub_templates_ver.updated_by IS 'Идентификатор на потребителя, редактирал записа.';
COMMENT ON COLUMN templates.sub_templates_ver.updated_on IS 'Дата и час на редакцията.';
COMMENT ON COLUMN templates.sub_templates_ver.is_last IS 'Флаг, указващ дали версията на обекта е последна';
COMMENT ON COLUMN templates.sub_templates_ver.deactivation_ver_id IS 'Идентификатор на версия с която е деактивиран записа';
