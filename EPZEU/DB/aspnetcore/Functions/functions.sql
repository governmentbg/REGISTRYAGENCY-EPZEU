-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : vm-av-epzeu-db1.dev.local
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.4 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-18), 64-bit



--
-- Definition for function f_data_protection_keys_create (OID = 24439) : 
--
SET search_path = aspnetcore, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION aspnetcore.f_data_protection_keys_create (
  p_id character varying,
  p_keyxml text,
  p_creation_date timestamp with time zone,
  p_activation_date timestamp with time zone,
  p_expiration_date timestamp with time zone
)
RETURNS void
AS 
$body$
DECLARE
  --v_user_id     INTEGER;
  
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_id   	IS NULL OR 
     p_keyxml  	IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  --v_user_id := sys.f_currentuser_get();  
  
  -- създаване на първа версия 
  INSERT INTO aspnetcore.data_protection_keys (
    id,
    keyxml,
    creation_date,
    activation_date,
    expiration_date
  )
  VALUES (
    p_id,
    p_keyxml,
    p_creation_date,
    p_activation_date,
    p_expiration_date
  );

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_data_protection_keys_search (OID = 24441) : 
--
CREATE FUNCTION aspnetcore.f_data_protection_keys_search (
  out p_ref_data refcursor
)
RETURNS refcursor
AS 
$body$
BEGIN

  OPEN p_ref_data FOR
    SELECT 
  		*
    FROM aspnetcore.data_protection_keys;    

END;
$body$
LANGUAGE plpgsql;
