CREATE OR REPLACE FUNCTION ap.f_application_documents_update (
  p_application_document_id bigint,
  p_name varchar,
  p_application_id bigint,
  p_document_type_id varchar,
  p_file_size integer,
  p_html_template_content text,
  p_incoming_number varchar,
  p_backoffice_guid uuid,
  p_signing_guid uuid
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_application_document_id IS NULL OR p_name IS NULL OR p_backoffice_guid IS NULL OR p_application_id IS NULL OR p_document_type_id IS NULL OR p_file_size IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.application_documents
  SET
    name = p_name,
    backoffice_guid = p_backoffice_guid,
    application_id = p_application_id,
    document_type_id = p_document_type_id,
    file_size = p_file_size,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    html_template_content = p_html_template_content,
    signing_guid = p_signing_guid,
    incoming_number = p_incoming_number
  WHERE
    application_document_id = p_application_document_id;

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
