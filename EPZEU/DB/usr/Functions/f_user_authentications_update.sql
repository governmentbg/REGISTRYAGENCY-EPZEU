CREATE OR REPLACE FUNCTION usr.f_user_authentications_update (
  p_authentication_id integer,
  p_authentication_type smallint,
  p_password_hash varchar,
  p_username varchar,
  p_is_locked boolean,
  p_locked_until timestamptz
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_authentication_id IS NULL ) OR
     ( p_authentication_type NOT IN (1, 2, 3) ) OR
     ( p_authentication_type = 1 AND ( p_password_hash IS NULL     OR p_username IS NOT NULL )) OR
     ( p_authentication_type = 2 AND ( p_password_hash IS NOT NULL OR p_username IS NULL)) OR
     ( p_authentication_type = 3 AND ( p_password_hash IS NOT NULL OR p_username IS NOT NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  SELECT COUNT(1)
    INTO v_count
    FROM usr.user_authentications ua
   WHERE lower(ua.username) =  lower(p_username)
     AND ua.authentication_id !=  p_authentication_id; 
    
  -- Проверка дали е вече съществува потребител с това потребителко име
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(8);
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- промяна на данните
  UPDATE usr.user_authentications
     SET password_hash = p_password_hash,
         username      = p_username,
         is_locked     = p_is_locked,
         locked_until  = p_locked_until,
         updated_by    = v_user_id,
         updated_on    = sys.f_current_timestamp()
  WHERE authentication_id = p_authentication_id
    AND authentication_type = p_authentication_type;
    
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
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

COMMENT ON FUNCTION usr.f_user_authentications_update(p_authentication_id integer, p_authentication_type smallint, p_password_hash varchar, p_username varchar, p_is_locked boolean, p_locked_until timestamptz)
IS 'Функция за промяна на запис за автентикация на потребителски профил';
