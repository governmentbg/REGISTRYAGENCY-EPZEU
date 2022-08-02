CREATE OR REPLACE FUNCTION usr.f_users_delete_all (
  p_user_id integer
)
RETURNS void AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- Одит
  PERFORM usr.f_users_audit_create(p_user_id);
  
  -- Изтриване на всички данни 
  DELETE
    FROM usr.user_access_request_docs uard
   WHERE uard.request_id in ( SELECT uar.request_id
                                FROM usr.user_access_requests uar
                               WHERE uar.user_id = p_user_id);

  DELETE
    FROM usr.user_access_requests uar
   WHERE uar.user_id = p_user_id;


  DELETE
    FROM usr.user_authentications ua
   WHERE ua.user_id = p_user_id;

  DELETE
    FROM usr.user_permissions up
   WHERE up.user_id = p_user_id;
 
  DELETE 
    FROM usr.user_processes up
   WHERE up.user_id =  p_user_id;
   
  DELETE 
    FROM usr.users_h up
   WHERE up.user_id =  p_user_id;  

  DELETE
    FROM usr.users u
   WHERE u.user_id = p_user_id
     AND u.is_system = FALSE;

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

COMMENT ON FUNCTION usr.f_users_delete_all(p_user_id integer)
IS 'Функция за изтриване на всички данни за неактивен потребителски профил. Функцията прави audit запис';
