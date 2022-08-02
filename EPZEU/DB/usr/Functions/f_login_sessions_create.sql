CREATE OR REPLACE FUNCTION usr.f_login_sessions_create (
  p_login_session_id uuid,
  p_user_session_id uuid,
  p_user_id integer,
  p_login_date timestamp,
  p_logout_date timestamp,
  p_ip_address inet,
  p_authentication_type smallint,
  p_certificate_id integer,
  p_operation_id uuid
)
RETURNS void AS
$body$
DECLARE
 v_user_id INTEGER;
 
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_login_session_id IS NULL OR
     p_user_session_id  IS NULL OR
     p_user_id          IS NULL OR 
     p_login_date       IS NULL OR 
     p_ip_address        IS NULL OR 
     p_authentication_type IS NULL OR 
     p_operation_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис 
  INSERT INTO usr.login_sessions(
    login_session_id,
    user_session_id,
    user_id,
    login_date,
    logout_date,
    ip_address,
    authentication_type,
    certificate_id,
    created_by,
    created_on,
    updated_by,
    updated_on,
    operation_id
  )
  VALUES (
    p_login_session_id,
    p_user_session_id,
    p_user_id,
    p_login_date,
    p_logout_date,
    p_ip_address,
    p_authentication_type,
    p_certificate_id,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_operation_id
  );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;