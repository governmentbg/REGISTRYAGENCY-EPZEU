-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Structure for table db_errors (OID = 19395) : 
--
SET search_path = sys, pg_catalog;
CREATE TABLE sys.db_errors (
    error_id integer NOT NULL,
    message varchar(1000),
    created_by integer NOT NULL,
    created_on timestamp without time zone DEFAULT f_current_timestamp() NOT NULL,
    updated_by integer NOT NULL,
    updated_on timestamp without time zone DEFAULT f_current_timestamp() NOT NULL
)
WITH (oids = false);
--
-- Definition for index n_s_db_errors_error_id_uindex (OID = 19403) : 
--
CREATE UNIQUE INDEX n_s_db_errors_error_id_uindex ON db_errors USING btree (error_id);
--
-- Definition for index n_s_db_errors_pkey (OID = 19401) : 
--
ALTER TABLE ONLY db_errors
    ADD CONSTRAINT n_s_db_errors_pkey
    PRIMARY KEY (error_id);
--
-- Comments
--
COMMENT ON TABLE sys.db_errors IS 'Таблица за системни грешки от базата';
COMMENT ON COLUMN sys.db_errors.error_id IS 'Уникален идентификатор на грешка';
COMMENT ON COLUMN sys.db_errors.message IS 'съобщение за грешка';
COMMENT ON COLUMN sys.db_errors.created_by IS 'Идентификатор на потребителя,създал записа.';
COMMENT ON COLUMN sys.db_errors.created_on IS 'Дата и час на създаването на записа;подаване на заявката.';
COMMENT ON COLUMN sys.db_errors.updated_by IS 'Идентификатор на потребителя, редактирал записа.';
COMMENT ON COLUMN sys.db_errors.updated_on IS 'Дата и час на редакцията.';
