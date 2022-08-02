CREATE OR REPLACE FUNCTION ap.f_application_process_contents_create (
  p_application_process_id bigint,
  p_type ap.enum_content_type,
  out p_application_process_content_id bigint
)
RETURNS bigint AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR p_type IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис

  INSERT INTO ap.application_process_contents
   (application_process_id,
    type,
    content,
    created_by,
    created_on,
    updated_by,
    updated_on)
  VALUES
    (p_application_process_id,
     p_type,
     NULL,
     v_user_id,
     sys.f_current_timestamp(),
     v_user_id,
     sys.f_current_timestamp())
  RETURNING application_process_content_id
  INTO p_application_process_content_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
