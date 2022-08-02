CREATE OR REPLACE FUNCTION ap.f_application_processes_update (
  p_application_process_id bigint,
  p_applicant_id integer,
  p_status ap.enum_process_status,
  p_main_application_id bigint,
  p_main_application_type_id smallint,
  p_incoming_numbers varchar [],
  p_error_message varchar,
  p_signing_guid uuid,
  p_additional_data jsonb
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR p_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE
    ap.application_processes
  SET
    applicant_id = p_applicant_id,
    status = p_status,
    main_application_id = p_main_application_id,
    main_application_type_id = p_main_application_type_id,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    signing_guid = p_signing_guid,
    incoming_numbers = p_incoming_numbers,
    error_message = p_error_message,
    additional_data = p_additional_data
  WHERE
    application_process_id = p_application_process_id;

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

ALTER FUNCTION ap.f_application_processes_update (p_application_process_id bigint, p_applicant_id integer, p_status ap.enum_process_status, p_main_application_id bigint, p_main_application_type_id smallint, p_incoming_numbers varchar [], p_error_message varchar, p_signing_guid uuid, p_additional_data jsonb)
  OWNER TO epzeu_dev;