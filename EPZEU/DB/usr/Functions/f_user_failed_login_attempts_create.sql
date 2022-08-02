CREATE OR REPLACE FUNCTION usr.f_user_failed_login_attempts_create (
  p_authentication_type smallint,
  p_login_name varchar,
  p_additional_data varchar,
  p_failed_login_attempts integer,
  out p_attempt_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_authentication_type IS NULL OR p_failed_login_attempts IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис 
  INSERT INTO usr.user_failed_login_attempts(
    authentication_type,
    login_name,
    additional_data,
    failed_login_attempts,
    is_active,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_authentication_type,
    p_login_name,
    p_additional_data,
    p_failed_login_attempts,
    true,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING attempt_id INTO p_attempt_id;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_failed_login_attempts_create(p_authentication_type smallint, p_login_name varchar, p_additional_data varchar, p_failed_login_attempts integer, out p_attempt_id integer)
IS 'Функция за създаване на запис за неуспешен опит за вход в системата';
