CREATE OR REPLACE FUNCTION usr.f_user_access_requests_update (
  p_request_id integer,
  p_access_status smallint,
  p_status_reason text
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_request_id IS NULL OR p_access_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE usr.user_access_requests u
     SET access_status   = p_access_status,
         status_reason   = p_status_reason,
         processing_date = sys.f_current_timestamp(),
         updated_by      = v_user_id,
         updated_on      = sys.f_current_timestamp()
   WHERE request_id = p_request_id
     AND access_status = 0;

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

COMMENT ON FUNCTION usr.f_user_access_requests_update(p_request_id integer, p_access_status smallint, p_status_reason text)
IS 'Променя стратуса на искане за достъп.';

