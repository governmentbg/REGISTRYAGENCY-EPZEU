CREATE OR REPLACE FUNCTION ap.f_application_documents_create (
  out p_application_document_id bigint,
  p_name varchar,
  p_application_id bigint,
  p_document_type_id varchar,
  p_file_size integer,
  p_html_template_content text,
  p_incoming_number varchar,
  p_backoffice_guid uuid,
  p_signing_guid uuid
)
RETURNS bigint AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_name IS NULL OR p_backoffice_guid IS NULL OR p_application_id IS NULL OR p_document_type_id IS NULL OR p_file_size  IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO  ap.application_documents(
    name,
    backoffice_guid,
    application_id,
    document_type_id,
    created_by,
    created_on,
    updated_by,
    updated_on,
    file_size,
    html_template_content,
    signing_guid,
    incoming_number
  )
  VALUES (
    p_name,
    p_backoffice_guid,
    p_application_id,
    p_document_type_id,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_file_size,
    p_html_template_content,
    p_signing_guid,
    p_incoming_number
  ) RETURNING application_document_id
    INTO p_application_document_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
