CREATE OR REPLACE FUNCTION usr.f_users_audit_create (
  p_user_id integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;

BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO usr.users_audit (
    user_id,
    user_data,
    created_by,
    created_on)
  SELECT x.user_id, to_jsonb(x.*), v_user_id, sys.f_current_timestamp()
  FROM ( SELECT   u.*  AS user, 
                 (SELECT json_agg(auth.*) FROM usr.user_authentications auth WHERE auth.user_id = u.user_id)  AS authentications,
                 (SELECT json_agg(perm.*) FROM usr.user_permissions perm     WHERE perm.user_id = u.user_id) AS permissions,
                 (SELECT json_agg(ar.*)   FROM usr.user_access_requests ar   WHERE ar.user_id = u.user_id) AS access_requests,
                 (SELECT json_agg(up.*)   FROM usr.user_processes up         WHERE up.user_id = u.user_id) AS processes
         FROM usr.users u
         WHERE u.user_id = p_user_id) x ;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_users_audit_create(p_user_id integer)
IS 'Функция за създаване на одит за потребителски профил. Данните за документите за специален достъп не се взимат';
