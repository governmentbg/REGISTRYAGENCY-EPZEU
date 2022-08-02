CREATE OR REPLACE FUNCTION ap.f_applications_update (
  p_application_id bigint,
  p_application_process_id bigint,
  p_application_content_id bigint,
  p_order smallint,
  p_application_type_id smallint,
  p_additional_data jsonb
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_application_id IS NULL OR 
     p_application_process_id IS NULL OR
     p_application_content_id IS NULL OR
     p_application_type_id IS NULL     
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.applications
  SET
    application_process_id = p_application_process_id,
    application_type_id = p_application_type_id,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    application_content_id = p_application_content_id,
    "order" = p_order,
    additional_data = p_additional_data
  WHERE
    application_id = p_application_id;

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
