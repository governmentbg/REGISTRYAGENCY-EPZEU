-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Definition for type enm_template_statuses (OID = 18734) : 
--
SET search_path = templates, pg_catalog;
CREATE TYPE templates.enm_template_statuses AS ENUM (
  'initiated', 'rejected', 'completed', 'test2'
);
