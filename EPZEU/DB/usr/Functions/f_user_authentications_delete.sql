CREATE OR REPLACE FUNCTION usr.f_user_authentications_delete (
  p_authentication_id integer
)
RETURNS void AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_authentication_id IS NULL ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтриване
  DELETE
  FROM usr.user_authentications
  WHERE authentication_id = p_authentication_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_authentications_delete(p_authentication_id integer)
IS 'Функция за изтриване на запис за автентикация на потребителски профил';
