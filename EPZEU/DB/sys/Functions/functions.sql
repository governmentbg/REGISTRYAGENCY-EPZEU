-- SQL Manager for PostgreSQL 5.9.2.50807
-- ---------------------------------------
-- Host      : vm-av-epzeu-db1.dev.local
-- Database  : epzeu_dev
-- Version   : PostgreSQL 10.4 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.4.7 20120313 (Red Hat 4.4.7-18), 64-bit



--
-- Definition for function f_current_timestamp (OID = 19685) : 
--
SET search_path = sys, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION sys.f_current_timestamp (
)
RETURNS timestamp with time zone
AS 
$body$
DECLARE
  v_timestamp TIMESTAMPTZ;
BEGIN
  SELECT CURRENT_TIMESTAMP INTO v_timestamp;
  RETURN v_timestamp;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_currentuser_get (OID = 19686) : 
--
CREATE FUNCTION sys.f_currentuser_get (
)
RETURNS integer
AS 
$body$
DECLARE
	v_userID int;

BEGIN

    SELECT current_setting('epzeu.context_user_id') INTO v_userID;
	RETURN v_userID;
    
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_currentuser_set (OID = 19687) : 
--
CREATE FUNCTION sys.f_currentuser_set (
  p_userid integer
)
RETURNS void
AS 
$body$
BEGIN
  PERFORM set_config('epzeu.context_user_id', p_userid::varchar, FALSE);
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_notify_cache_invalidation (OID = 19688) : 
--
CREATE FUNCTION sys.f_notify_cache_invalidation (
  p_tablename character varying
)
RETURNS void
AS 
$body$
DECLARE
notification json;

BEGIN

  notification = json_build_object('tableName', p_tablename);  						
  PERFORM pg_notify('cache_invalidation',  notification::text);
  
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_raise_excp (OID = 19689) : 
--
CREATE FUNCTION sys.f_raise_excp (
  p_error_id integer
)
RETURNS void
AS 
$body$
DECLARE
   v_message varchar(4000);
   v_code varchar(5);
BEGIN

  SELECT e.message into v_message FROM sys.db_errors e WHERE error_id = p_error_id;
  v_code := TRIM(to_char(p_error_id, '009'));
  v_code := 'EP' || v_code;
  
  SELECT sys.f_raise_excp(v_code, v_message);
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_raise_excp (OID = 19690) : 
--
CREATE FUNCTION sys.f_raise_excp (
  p_code text,
  p_message text
)
RETURNS void
AS 
$body$
BEGIN
   RAISE EXCEPTION '%', p_message USING ERRCODE = p_code;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_raise_excp_invalid_affected_rows (OID = 19691) : 
--
CREATE FUNCTION sys.f_raise_excp_invalid_affected_rows (
)
RETURNS void
AS 
$body$
BEGIN
  SELECT sys.f_raise_excp(3);
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_raise_excp_invalid_params (OID = 19692) : 
--
CREATE FUNCTION sys.f_raise_excp_invalid_params (
)
RETURNS void
AS 
$body$
BEGIN

  SELECT sys.f_raise_excp(1);
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_raise_excp_max_nor_exceeded (OID = 19693) : 
--
CREATE FUNCTION sys.f_raise_excp_max_nor_exceeded (
)
RETURNS void
AS 
$body$
BEGIN
  SELECT sys.f_raise_excp(2);
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_replace_like_str (OID = 41948) : 
--
CREATE FUNCTION sys.f_replace_like_str (
  v_str character varying
)
RETURNS varchar
AS 
$body$
DECLARE
 
BEGIN
  return  REPLACE(REPLACE(v_str, '_', '\_'), '%', '\%');

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_search_coalesce_i18n (OID = 47154) : 
--
CREATE FUNCTION sys.f_search_coalesce_i18n (
  p_str_1 character varying = NULL::character varying,
  p_str_2 character varying = NULL::character varying,
  p_str_3 character varying = NULL::character varying
)
RETURNS varchar
AS 
$body$
DECLARE

BEGIN
  IF p_str_1 IS NOT NULL AND p_str_1 != '' THEN 
     RETURN p_str_1;
  ELSIF p_str_2 IS NOT NULL AND p_str_2 != '' THEN 
     RETURN p_str_2 ;   
  ELSE 
     RETURN p_str_3;
  END IF;   


END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_fts_search_config (OID = 52017) : 
--
CREATE FUNCTION sys.f_fts_search_config (
)
RETURNS varchar
AS 
$body$
BEGIN
  RETURN 'simple';
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_fts_search_string_get (OID = 52232) : 
--
CREATE FUNCTION sys.f_fts_search_string_get (
  p_search_criteria character varying
)
RETURNS varchar
AS 
$body$
DECLARE
  v_search_criteria VARCHAR(1000);
BEGIN
  
  RETURN array_to_string(string_to_array(p_search_criteria, ' ', ''), ':* <1> ')|| ':*';
  
END;
$body$
LANGUAGE plpgsql;
--
-- Comments
--
COMMENT ON FUNCTION sys.f_current_timestamp () IS 'Функция за взимане на време';
COMMENT ON FUNCTION sys.f_currentuser_get () IS 'Функция за взимане на контекстния потребител';
COMMENT ON FUNCTION sys.f_currentuser_set (p_userid integer) IS 'Функция за слагане на контекстен потребител';
COMMENT ON FUNCTION sys.f_raise_excp (p_error_id integer) IS 'Функция за вдигане на изключение';
COMMENT ON FUNCTION sys.f_raise_excp (p_code text, p_message text) IS 'Функция за вдигане на изключение';
COMMENT ON FUNCTION sys.f_raise_excp_invalid_affected_rows () IS 'Функция за вдигане на изключение, че трябва да бъде обработен точно един запис';
COMMENT ON FUNCTION sys.f_raise_excp_invalid_params () IS 'Функция за вдигане на изключение за невалидни входящи параметри';
COMMENT ON FUNCTION sys.f_raise_excp_max_nor_exceeded () IS 'Функция за вдигане на изключение за надвишаване на максимално допустим брой записи за четене от базата';
