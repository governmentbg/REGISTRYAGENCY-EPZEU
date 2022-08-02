CREATE OR REPLACE FUNCTION usr.f_user_permissions_delete (
  p_user_id integer,
  p_permission_id integer []
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL OR p_permission_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


 -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();


 -- update-ва
  UPDATE usr.user_permissions u
     SET is_active   = FALSE ,
         updated_by  = v_user_id,
         updated_on  = sys.f_current_timestamp()
   WHERE u.user_id = p_user_id
     AND u.permission_id =  ANY( p_permission_id )
     AND u.is_active = TRUE;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е променен точно един запис
  IF v_count != array_length(p_permission_id::INTEGER[], 1)
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

COMMENT ON FUNCTION usr.f_user_permissions_delete(p_user_id integer, p_permission_id integer [])
IS 'Деактивиране на дадено право на потребител.';
