CREATE OR REPLACE FUNCTION usr.f_users_delete (
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

  -- изтрива
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

COMMENT ON FUNCTION usr.f_users_delete(p_user_id integer)
IS 'Изтрива зададен потребител.';
