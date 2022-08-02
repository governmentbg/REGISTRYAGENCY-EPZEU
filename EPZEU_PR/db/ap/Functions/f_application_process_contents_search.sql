CREATE OR REPLACE FUNCTION ap.f_application_process_contents_search (
  p_application_process_id bigint,
  p_application_ids bigint [],
  p_type varchar,
  out ref_application_process_contents refcursor
)
RETURNS refcursor AS
$body$
DECLARE
  v_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL AND
     p_application_ids IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := ''SELECT ppc.application_process_content_id,
                    ppc.application_process_id,
                    ppc.type,
                    NULL as content
               FROM ap.application_process_contents ppc '';

IF (p_application_ids IS NOT NULL)
THEN
    v_stmt := v_stmt || ''  INNER JOIN ap.applications a
                           ON a.application_content_id = ppc.application_process_content_id
                           AND a.application_id = ANY($1)'';
  END IF;

 v_stmt := v_stmt ||  '' WHERE 1=1 '';

  IF (p_application_process_id IS NOT NULL)
  THEN
      v_stmt := v_stmt || '' AND ppc.application_process_id = $2	'';
  END IF;

  IF (p_type IS NOT NULL)
  THEN
    v_stmt := v_stmt || '' AND ppc.type = $3 '';
  END IF;

  v_stmt := v_stmt || '' ORDER BY ppc.application_process_content_id  '';

  OPEN ref_application_process_contents FOR EXECUTE v_stmt
  USING p_application_ids, p_application_process_id, p_type::ap.enum_content_type;

END;
$body$
LANGUAGE ''plpgsql''
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;