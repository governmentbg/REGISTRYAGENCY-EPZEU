CREATE OR REPLACE FUNCTION usr.f_user_processes_update (
  p_process_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_process_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE usr.user_processes up
     SET status = p_status,
         updated_by   = v_user_id,
         updated_on   = sys.f_current_timestamp()
  WHERE up.process_id = p_process_id
    AND up.status = 0;

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
