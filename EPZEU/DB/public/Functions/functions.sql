-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : 192.168.8.175
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.2 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-16), 64-bit



--
-- Definition for function f_get_next_version_id (OID = 18801) : 
--
SET search_path = public, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION public.f_get_next_version_id (
)
RETURNS integer
AS 
$body$
DECLARE
  v_version_id INTEGER;
  v_user_id    INTEGER;
BEGIN
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис за версия
  INSERT INTO versions
  (
    created_on,
    created_by
  )
  VALUES (
    sys.f_current_timestamp(),
    v_user_id
  )
  RETURNING version_id INTO v_version_id;

  RETURN v_version_id;
  
END;
$body$
LANGUAGE plpgsql;
