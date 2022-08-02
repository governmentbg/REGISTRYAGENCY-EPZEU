CREATE OR REPLACE FUNCTION ap.f_application_documents_delete (
  p_application_document_id bigint,
  p_backoffice_guid uuid
)
RETURNS void AS
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_application_document_id IS NULL AND p_backoffice_guid IS NULL ) OR
     ( p_application_document_id IS NOT NULL AND p_backoffice_guid IS NOT NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтриване на съответния запис
  IF p_application_document_id IS NOT NULL
  THEN

    DELETE
    FROM
      ap.application_documents
    WHERE
      application_document_id = p_application_document_id;

  ELSE -- p_backoffice_guid IS NOT NULL AND p_application_document_id IS NULL

   DELETE
    FROM
      ap.application_documents
    WHERE
      backoffice_guid = p_backoffice_guid;

  END IF;

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
