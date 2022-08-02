CREATE OR REPLACE FUNCTION ap.f_application_process_contents_update (
  p_application_process_content_id bigint,
  p_application_process_id bigint,
  p_type ap.enum_content_type
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_application_process_content_id IS NULL OR 
     p_application_process_id IS NULL OR 
     p_type IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.application_process_contents
  SET
    application_process_id = p_application_process_id,
    content = NULL,
    type = p_type,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE
    application_process_content_id = p_application_process_content_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

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
