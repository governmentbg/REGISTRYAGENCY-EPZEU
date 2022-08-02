CREATE OR REPLACE FUNCTION ap.f_applications_search (
  p_application_process_id bigint,
  p_application_ids bigint [],
  p_load_application_documents boolean,
  p_load_application_content boolean,
  out ref_applications refcursor,
  out ref_application_content refcursor,
  out ref_application_documents refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt TEXT;
  aa_applications ap.applications [ ];
BEGIN

 -- Проверка за невалидни входящи параметри
  IF p_application_ids IS NULL AND 
     p_application_process_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := 'SELECT a.application_id,
                    a.application_process_id,
                    a.application_content_id,
                    NULL,
                    NULL,
                    NULL,
                    NULL,
                    a.order,   
                    a.application_type_id,
                    a.additional_data
               FROM ap.applications a
              WHERE 1 = 1';

  IF (p_application_process_id IS NOT NULL)
  THEN 
     v_stmt := v_stmt || ' AND a.application_process_id = $1';
  END IF;

  IF (p_application_ids IS NOT NULL)
  THEN  
     v_stmt := v_stmt || ' AND a.application_id = ANY($2)';
  END IF;
 
  v_stmt := v_stmt || ' ORDER BY a.application_id ';

  v_stmt := 'SELECT array_agg(tt.*) FROM (' || v_stmt || ') tt';

  EXECUTE v_stmt
     INTO aa_applications 
    USING p_application_process_id,
          p_application_ids;

  OPEN ref_applications FOR
  SELECT a.application_id,
         a.application_process_id,
         a.application_content_id,
         a.order,
         a.application_content_id,
         a.application_type_id 
    FROM unnest(aa_applications) a;
    
  IF p_load_application_content
  THEN
    OPEN ref_application_content FOR
    SELECT ppc.application_process_content_id,
           ppc.application_process_id,
           ppc.type,
           NULL as content
      FROM ap.application_process_contents ppc
    WHERE  ppc.application_process_content_id IN (SELECT a.application_content_id FROM unnest(aa_applications) a);
  END IF;
  
  IF p_load_application_documents
  THEN
    OPEN ref_application_documents FOR
    SELECT ad.application_document_id,
           ad.name,
           ad.backoffice_guid,
           ad.application_id,
           ad.document_type_id
      FROM ap.application_documents ad
     WHERE ad.application_id IN (SELECT application_id FROM unnest(aa_applications));
  END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
