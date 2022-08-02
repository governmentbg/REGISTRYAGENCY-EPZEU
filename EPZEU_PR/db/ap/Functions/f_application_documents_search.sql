CREATE OR REPLACE FUNCTION ap.f_application_documents_search (
  p_application_ids bigint [],
  p_application_document_ids bigint [],
  out ref_application_documents refcursor
)
RETURNS refcursor AS
$body$
DECLARE
  v_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_ids IS NULL AND 
     p_application_document_ids IS NULL 
  THEN
     PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := ' SELECT ad.application_document_id,
                     ad.name,
                     ad.backoffice_guid,
                     ad.application_id,
                     ad.document_type_id,
                     ad.file_size,
                     ad.html_template_content,
                     ad.signing_guid,
                     ad.incoming_number   
                FROM ap.application_documents ad
               WHERE 1 = 1';

  IF (p_application_ids IS NOT NULL)
  THEN
    v_stmt := v_stmt || ' AND ad.application_id = ANY($1)';
  END IF;

  IF (p_application_document_ids IS NOT NULL)
  THEN
    v_stmt := v_stmt || ' AND ad.application_document_id = ANY($2)';
  END IF;

  v_stmt := v_stmt || ' ORDER BY ad.application_document_id ';

  OPEN ref_application_documents FOR EXECUTE v_stmt
  USING p_application_ids, p_application_document_ids;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
