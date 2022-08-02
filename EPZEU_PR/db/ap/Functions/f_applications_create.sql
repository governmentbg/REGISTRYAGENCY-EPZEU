CREATE OR REPLACE FUNCTION ap.f_applications_create (
  out p_application_id bigint,
  p_application_process_id bigint,
  p_application_type_id smallint,
  p_application_content_id bigint,
  p_order smallint,
  p_additional_data jsonb
)
RETURNS bigint AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR 
     p_order IS NULL OR 
     p_application_type_id IS NULL OR
     p_application_content_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO
  ap.applications(
      application_process_id,
      application_type_id,
      application_content_id,
      created_by,
      created_on,
      updated_by,
      updated_on,
      "order",
      additional_data
    )
VALUES
    (
      p_application_process_id,
      p_application_type_id,
      p_application_content_id,
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp(),
      p_order,
      p_additional_data     
    )
RETURNING application_id
INTO p_application_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
