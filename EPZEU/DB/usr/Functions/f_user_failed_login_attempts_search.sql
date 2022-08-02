CREATE OR REPLACE FUNCTION usr.f_user_failed_login_attempts_search (
  p_attempt_id integer [],
  p_login_name varchar,
  out p_failed_login_attempts refcursor
)
RETURNS refcursor AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF (( p_attempt_id IS NOT NULL AND p_login_name IS NOT NULL) OR
      ( p_attempt_id IS NULL AND p_login_name IS NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_attempt_id IS NOT NULL
  THEN
  
    OPEN p_failed_login_attempts FOR
    SELECT t.*
    FROM usr.user_failed_login_attempts t
    WHERE t.attempt_id = ANY (p_attempt_id);

  ELSE -- p_attempt_id IS NULL AND p_login_name IS NOT NULL
  
    OPEN p_failed_login_attempts FOR
    SELECT t.*
    FROM usr.user_failed_login_attempts t
    WHERE t.login_name = p_login_name
      AND t.is_active = true;
      
  END IF;    
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_failed_login_attempts_search(p_attempt_id integer [], p_login_name varchar, out p_failed_login_attempts refcursor)
IS 'Функция за търсене на запис(и) за неуспешен опит за вход в системата';
