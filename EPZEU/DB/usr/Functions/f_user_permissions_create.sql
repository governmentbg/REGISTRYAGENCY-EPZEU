CREATE OR REPLACE FUNCTION usr.f_user_permissions_create (
  p_user_id integer,
  p_permission_id integer []
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL OR p_permission_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.user_permissions(
      user_id,
      permission_id,
      is_active,
      created_by,
      created_on,
      updated_by,
      updated_on
  )
  SELECT 
    p_user_id,
    p.permission_id,
    TRUE,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  FROM ( SELECT UNNEST(p_permission_id) AS permission_id) p;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_permissions_create(p_user_id integer, p_permission_id integer [])
IS 'Добавяне на право към потребител.';
