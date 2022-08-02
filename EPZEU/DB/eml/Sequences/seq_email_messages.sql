-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



SET check_function_bodies = false;
--
-- Definition for sequence seq_email_messages (OID = 90246) : 
--
SET search_path = eml, pg_catalog;
CREATE SEQUENCE eml.seq_email_messages
    START WITH 1
    INCREMENT BY 1
    NO MAXVALUE
    NO MINVALUE
    CACHE 1;
