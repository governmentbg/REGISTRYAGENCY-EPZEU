CREATE OR REPLACE FUNCTION usr.f_user_authentications_search (
  p_authentication_id integer [],
  p_user_id integer,
  p_authentication_type smallint,
  p_username varchar,
  out p_user_authentications refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF (( p_authentication_id IS NOT NULL AND p_user_id IS NOT NULL AND p_username IS NOT NULL) OR
      ( p_authentication_id IS NULL AND p_user_id IS NULL AND p_username IS NULL))
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_authentication_id IS NOT NULL
  THEN
  
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE t.authentication_id = ANY (p_authentication_id);

  ELSEIF p_user_id IS NOT NULL
  THEN
  
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE t.user_id = p_user_id
      AND ( p_authentication_type IS NULL OR t.authentication_type = p_authentication_type);
      
  ELSEIF p_username IS NOT NULL
  THEN
  	
    OPEN p_user_authentications FOR
    SELECT t.*
    FROM usr.user_authentications t
    WHERE lower(t.username) = lower(p_username)
      AND ( p_authentication_type IS NULL OR t.authentication_type = p_authentication_type);
 
  END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_authentications_search(p_authentication_id integer [], p_user_id integer, p_authentication_type smallint, p_username varchar, out p_user_authentications refcursor)
IS 'Функция за търсене на запис(и) за автентикация на потребителски профил';
