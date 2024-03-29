CREATE OR REPLACE FUNCTION ap.f_application_processes_search (
  out p_count integer,
  out ref_application_processes refcursor,
  out ref_application refcursor,
  out ref_application_documents refcursor,
  out ref_application_contents refcursor,
  p_application_process_id bigint,
  p_applicant_cin integer,
  p_main_application_type_id smallint,
  p_load_applications boolean,
  p_load_application_documents boolean,
  p_load_application_contents boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  p_signing_giud uuid
)
RETURNS record AS
$body$
DECLARE
  v_applicant_id INTEGER;
  v_stmt TEXT;
  v_count_stmt TEXT;
  pp_application_processes ap.application_processes[];

BEGIN
  -- Проверка за невалидни входящи параметри
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR
     ( p_start_index IS NOT NULL AND p_page_size IS NULL ) OR
     ( p_start_index IS NULL AND p_page_size IS NULL AND p_application_process_id IS NULL AND p_applicant_cin IS NULL AND p_main_application_type_id IS NULL AND p_signing_giud IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- взимаме user_id по подадения КИН
  -- SELECT INTO не връща NO_DATA_FOUND/TOO_MANY_ROWS ако не се ползва STRICT клауза
  -- При подаване на невалиден КИН, заявката ще върне NULL, в този случай функцията не трябва да връща нищо
  -- TOO_MANY_ROWS не би трябвало да е проблем, тъй като usr.app_users.cin е UNIQUE
  IF p_applicant_cin IS NOT  NULL
  THEN
  	SELECT user_id INTO v_applicant_id FROM usr.app_users where cin = p_applicant_cin;
  END IF;


  v_stmt := 'SELECT pp.application_process_id,
                    pp.applicant_id,
                    pp.main_application_id,
                    NULL,
                    created_on,
                    NULL,
                    updated_on,
                    pp.main_application_type_id,
                    pp.status,
                    pp.signing_guid,
                    pp.incoming_numbers,
                    pp.error_message,
                    pp.additional_data
               FROM ap.application_processes pp
              WHERE 1=1 ';

  IF (p_application_process_id IS NOT NULL)
  THEN
    v_stmt := v_stmt || ' AND pp.application_process_id = $1';
  END IF;

  IF (p_applicant_cin IS NOT NULL) -- ако v_applicant_id е NULL филтърът ще се приложи, но няма да връща резултат (pp.applicant_id = NULL)
  THEN
    v_stmt := v_stmt || ' AND pp.applicant_id = $2';
  END IF;

  IF (p_main_application_type_id IS NOT NULL )
  THEN
    v_stmt := v_stmt || ' AND pp.main_application_type_id = $3';
  END IF;

  IF (p_signing_giud IS NOT NULL)
  THEN
    v_stmt := v_stmt || ' AND pp.signing_guid = $4
	';
  END IF;


  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM ( ' || v_stmt || ' ) tt';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || ' LIMIT $5 + 1';
    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING  p_application_process_id, v_applicant_id, p_main_application_type_id, p_signing_giud, p_max_nor + 1;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;

  v_stmt :=  v_stmt || ' ORDER BY pp.application_process_id LIMIT $5 OFFSET $6 - 1';
  v_stmt := 'SELECT array_agg(tt.*) FROM (' || v_stmt || ') tt';


  EXECUTE v_stmt
  INTO pp_application_processes
  USING p_application_process_id, v_applicant_id, p_main_application_type_id, p_signing_giud, p_page_size, p_start_index;

  OPEN ref_application_processes FOR
  SELECT application_process_id,
         applicant_id,
         main_application_id,
         main_application_type_id,
         status,
         signing_guid,
         created_on,
    	 updated_on,
         incoming_numbers,
         error_message,
         additional_data
    FROM unnest(pp_application_processes);

  IF p_load_applications
  THEN
    OPEN ref_application FOR
    SELECT a.application_id,
           a.application_process_id,
           a.application_content_id,
           a.order,
           a.application_type_id,
           a.additional_data
      FROM ap.applications a
     WHERE a.application_process_id in (SELECT pp.application_process_id FROM unnest(pp_application_processes) pp);
  END IF;

  IF p_load_application_documents
  THEN
    OPEN ref_application_documents FOR
    SELECT ad.application_document_id,
           ad.name,
           ad.backoffice_guid,
           ad.application_id,
           ad.document_type_id,
           ad.file_size,
           ad.html_template_content,
           ad.signing_guid,
           ad.incoming_number
      FROM unnest(pp_application_processes) pp
      INNER JOIN ap.applications a ON pp.application_process_id = a.application_process_id
      INNER JOIN ap.application_documents ad ON a.application_id = ad.application_id;
  END IF;

  IF p_load_application_contents
  THEN
    OPEN ref_application_contents FOR
    SELECT ppc.application_process_content_id,
           ppc.application_process_id,
           ppc.type,
           NULL as content
      FROM unnest(pp_application_processes) pp
      INNER JOIN ap.application_process_contents ppc ON ppc.application_process_id = pp.application_process_id;
  END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION ap.f_application_processes_search (out p_count integer, out ref_application_processes refcursor, out ref_application refcursor, out ref_application_documents refcursor, out ref_application_contents refcursor, p_application_process_id bigint, p_applicant_cin integer, p_main_application_type_id smallint, p_load_applications boolean, p_load_application_documents boolean, p_load_application_contents boolean, p_start_index integer, p_page_size integer, p_calculate_count boolean, p_max_nor integer, p_signing_giud uuid)
  OWNER TO epzeu_dev;