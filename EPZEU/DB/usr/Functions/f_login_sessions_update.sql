CREATE OR REPLACE FUNCTION usr.f_login_sessions_update (
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
 v_count   INTEGER;
 
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_login_session_id IS NULL OR
     p_user_session_id  IS NULL OR
     p_user_id          IS NULL OR 
     p_login_date       IS NULL OR 
     p_ip_address       IS NULL OR 
     p_authentication_type IS NULL OR 
     p_operation_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- пром€на на данните
  UPDATE usr.login_sessions
     SET user_session_id     = p_user_session_id,
         user_id             = p_user_id,
         login_date          = p_login_date,
         logout_date         = p_logout_date,
         ip_address          = p_ip_address,
         authentication_type = p_authentication_type,
         certificate_id      = p_certificate_id,
         updated_by          = v_user_id,
         updated_on          = sys.f_current_timestamp(),
         operation_id		 = p_operation_id
  WHERE login_session_id = p_login_session_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
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