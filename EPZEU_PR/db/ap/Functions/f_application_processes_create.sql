CREATE OR REPLACE FUNCTION ap.f_application_processes_create (
  out p_application_process_id bigint,
  p_applicant_id integer,
  p_status ap.enum_process_status,
  p_main_application_id bigint,
  p_main_application_type_id smallint,
  p_incoming_numbers varchar [],
  p_error_message varchar,
  p_signing_guid uuid,
  p_additional_data jsonb
)
RETURNS bigint AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_applicant_id IS NULL OR
     p_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис

  INSERT INTO ap.application_processes(
    applicant_id,
    status,
    main_application_id,
    main_application_type_id,
    created_by,
    created_on,
    updated_by,
    updated_on,
    signing_guid,
    incoming_numbers,
    error_message,
    additional_data
    )
  VALUES (
    p_applicant_id,
    p_status,
    p_main_application_id,
    p_main_application_type_id,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_signing_guid,
    p_incoming_numbers,
    p_error_message,
    p_additional_data
    )
  RETURNING application_process_id
  INTO p_application_process_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION ap.f_application_processes_create (out p_application_process_id bigint, p_applicant_id integer, p_status ap.enum_process_status, p_main_application_id bigint, p_main_application_type_id smallint, p_incoming_numbers varchar [], p_error_message varchar, p_signing_guid uuid, p_additional_data jsonb)
  OWNER TO epzeu_dev;