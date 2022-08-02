CREATE OR REPLACE FUNCTION usr.f_user_authentications_create (
  p_user_id integer,
  p_authentication_type smallint,
  p_password_hash varchar,
  p_username varchar,
  p_certificate_id integer,
  out p_authentication_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_user_id IS NULL ) OR
     ( p_authentication_type NOT IN (1, 2, 3, 4) ) OR
     ( p_authentication_type = 1 AND ( p_password_hash IS NULL     OR p_username IS NOT NULL OR p_certificate_id IS NOT NULL)) OR
     ( p_authentication_type = 2 AND ( p_password_hash IS NOT NULL OR p_username IS NULL     OR p_certificate_id IS NOT NULL)) OR
     ( p_authentication_type = 3 AND ( p_password_hash IS NOT NULL OR p_username IS NOT NULL OR p_certificate_id IS NULL)) OR
     ( p_authentication_type = 4 AND ( p_username IS NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


  SELECT COUNT(1)
    INTO v_count
    FROM usr.user_authentications ua
   WHERE 
   		lower(ua.username) =  lower(p_username)
  	AND authentication_type = p_authentication_type
    AND is_active = true;
    
  -- Проверка дали е вече съществува потребител с това потребителко име
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(8);
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO usr.user_authentications(
    user_id,
    authentication_type,
    password_hash,
    username,
    created_by,
    created_on,
    updated_by,
    updated_on,
    is_locked,
    locked_until,
    certificate_id,
    is_active
  )
  VALUES (
    p_user_id,
    p_authentication_type,
    p_password_hash,
    p_username,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    false,
    NULL,
    p_certificate_id,
    true
  )
  RETURNING authentication_id INTO p_authentication_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_authentications_create(p_user_id integer, p_authentication_type smallint, p_password_hash varchar, p_username varchar, p_certificate_id integer, out p_authentication_id integer)
IS 'Функция за създаване на запис за автентикация на потребителски профил';