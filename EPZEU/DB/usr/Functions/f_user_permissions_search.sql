CREATE OR REPLACE FUNCTION usr.f_user_permissions_search (
  p_users_ids integer [],
  out p_users_permission_ids refcursor
)
RETURNS refcursor AS
$body$
DECLARE

BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_users_ids IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  
  OPEN p_users_permission_ids FOR
  SELECT u.*
    FROM usr.user_permissions u
   WHERE u.user_id = ANY (p_users_ids)
     AND u.is_active = TRUE
  ORDER BY u.user_id, u.permission_id;  
      
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_permissions_search(p_users_ids integer [], out p_users_permission_ids refcursor)
IS 'Връща всички активни права за даден потребител/списък от потребители.';
