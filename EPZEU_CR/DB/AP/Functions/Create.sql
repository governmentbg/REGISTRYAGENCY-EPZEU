-- SQL Manager for PostgreSQL 5.9.4.51539
-- ---------------------------------------
-- Host      : vm-av-epzeu-db2.dev.local
-- Database  : epzeu_cr_dev
-- Version   : PostgreSQL 11.5 on x86_64-pc-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-36), 64-bit



--
-- Definition for function f_application_documents_create (OID = 33276) : 
--
SET search_path = ap, pg_catalog;
SET check_function_bodies = false;
CREATE FUNCTION ap.f_application_documents_create (
  p_name character varying,
  p_backoffice_guid character varying,
  p_application_id bigint,
  p_document_type_id character varying,
  p_is_original boolean,
  p_rejected_application_process_id bigint,
  p_html_template_content text,
  p_signing_guid uuid,
  p_incoming_number character varying,
  out p_application_document_id bigint
)
RETURNS bigint
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_name IS NULL   	
    OR p_application_id IS NULL 
    OR p_document_type_id IS NULL    
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- Потребител може да създава записи само ако са свързани с процес на който е заявител
  IF NOT EXISTS(
    SELECT 1 from ap.application_processes ap
    INNER JOIN ap.applications a
    ON a.application_process_id = ap.application_process_id
    WHERE ap.applicant_id = v_user_id
          AND a.application_id = p_application_id
          )
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- създаване на запис
INSERT INTO 
  ap.application_documents
(
  name,
  backoffice_guid,
  application_id,
  document_type_id,
  is_original,
  created_by,
  created_on,
  updated_by,
  updated_on,
  rejected_application_process_id,
  html_template_content,
  signing_guid,
  incoming_number
)
VALUES (
  p_name,
  p_backoffice_guid,
  p_application_id,
  p_document_type_id,
  p_is_original,
  v_user_id,
  sys.f_current_timestamp(),
  v_user_id,
  sys.f_current_timestamp(),
  p_rejected_application_process_id,
  p_html_template_content,
  p_signing_guid,
  p_incoming_number
) RETURNING application_document_id
  INTO p_application_document_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_documents_delete (OID = 33277) : 
--
CREATE FUNCTION ap.f_application_documents_delete (
  p_application_document_id bigint
)
RETURNS void
AS 
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_document_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива

  DELETE
  FROM
    ap.application_documents
  WHERE
    application_document_id = p_application_document_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_documents_search (OID = 33278) : 
--
CREATE FUNCTION ap.f_application_documents_search (
  p_application_ids bigint[],
  p_application_document_ids bigint[],
  p_application_document_guids character varying[],
  p_signing_guid uuid,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  out p_count integer,
  out ref_application_documents refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt TEXT;
  v_count_stmt TEXT;
BEGIN
  IF (p_start_index IS NULL OR p_page_size IS NULL OR
  	  ((p_signing_guid IS NULL) AND
        (p_application_ids IS NULL AND 
        p_application_document_ids IS NULL AND 
        p_application_document_guids IS NULL)))
    THEN
    RAISE EXCEPTION 'Invalid input parameters';
  END IF;

  v_stmt := ' 
  SELECT ad.application_document_id,
         ad.name,
         ad.backoffice_guid,
         ad.application_id,
         ad.document_type_id,
         ad.is_original,
         ad.rejected_application_process_id,  
         ad.html_template_content,
         ad.signing_guid,
         ad.incoming_number     
    FROM ap.application_documents ad
   WHERE ap.f_has_user_access_to_row(ad.created_by, ad.updated_by)
';

  IF (p_application_ids IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
      AND ad.application_id = ANY($1)
	';
  END IF;

  IF (p_application_document_ids IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND ad.application_document_id = ANY($2)
	';
  END IF;
  
    IF (p_application_document_guids IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND ad.backoffice_guid = ANY($3)
	';
  END IF;

    IF (p_signing_guid IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND ad.signing_guid = $4
	';
  END IF;

  IF p_calculate_count
    THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $5 + 1';

    END IF;
    
    v_count_stmt := v_count_stmt || ' ) tc ';
	
    EXECUTE v_count_stmt
    INTO p_count
    USING p_application_ids, p_application_document_ids, p_application_document_guids, p_signing_guid, p_max_nor;
    
    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
    
  END IF;

  v_stmt := v_stmt || ' ORDER BY ad.application_document_id LIMIT $5 OFFSET $6 - 1 ';

  OPEN ref_application_documents FOR EXECUTE v_stmt
  USING p_application_ids, p_application_document_ids, p_application_document_guids, p_signing_guid, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_documents_update (OID = 33279) : 
--
CREATE FUNCTION ap.f_application_documents_update (
  p_application_document_id bigint,
  p_name character varying,
  p_backoffice_guid character varying,
  p_application_id bigint,
  p_document_type_id character varying,
  p_is_original boolean,
  p_rejected_application_process_id bigint,
  p_html_template_content text,
  p_signing_guid uuid,
  p_incoming_number character varying
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_document_id IS NULL OR p_name IS NULL OR p_application_id IS NULL OR p_document_type_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.application_documents
  SET
    name = p_name,
    backoffice_guid = p_backoffice_guid,
    application_id = p_application_id,
    document_type_id = p_document_type_id,
    is_original = p_is_original,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    rejected_application_process_id = p_rejected_application_process_id,
    html_template_content = p_html_template_content,
    signing_guid = p_signing_guid,
    incoming_number = p_incoming_number
  WHERE
    application_document_id = p_application_document_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_create (OID = 33280) : 
--
CREATE FUNCTION ap.f_application_process_contents_create (
  p_application_process_id bigint,
  p_type smallint,
  out p_application_process_content_id bigint
)
RETURNS bigint
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR p_type IS NULL OR p_type IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- Потребител може да създава записи само ако са свързани с процес на който е заявител
  IF NOT EXISTS(
    SELECT 1 from ap.application_processes ap
    WHERE ap.applicant_id = v_user_id
          AND ap.application_process_id = p_application_process_id
          )
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- създаване на запис

  INSERT INTO
    ap.application_process_contents(application_process_id,
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
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_delete (OID = 33281) : 
--
CREATE FUNCTION ap.f_application_process_contents_delete (
  p_application_process_content_id bigint
)
RETURNS void
AS 
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_content_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива

  DELETE
  FROM
    ap.application_process_contents
  WHERE
    application_process_content_id = p_application_process_content_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_read (OID = 33282) : 
--
CREATE FUNCTION ap.f_application_process_contents_read (
  p_application_process_content_id bigint
)
RETURNS bytea
AS 
$body$
DECLARE
	ref refcursor;
BEGIN
-- 	OPEN ref FOR 
	return (SELECT 
		apc.content
	FROM ap.application_process_contents apc
	WHERE apc.application_process_content_id = p_application_process_content_id
    and ap.f_has_user_access_to_row(apc.created_by, apc.updated_by));
	
-- 	return ref;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_search (OID = 33283) : 
--
CREATE FUNCTION ap.f_application_process_contents_search (
  p_application_process_id bigint,
  p_application_ids bigint[],
  p_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  out p_count integer,
  out ref_application_process_contents refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt TEXT;
  v_count_stmt TEXT;
BEGIN
  IF (p_start_index IS NULL OR p_page_size IS NULL AND
      (p_application_process_id IS NULL OR p_application_ids IS NULL)) THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := '
  SELECT 
        ppc.application_process_content_id,
        ppc.application_process_id,
        ppc.type,
        NULL as content
  FROM 
  		ap.application_process_contents ppc
  ';
  
IF (p_application_ids IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    INNER JOIN ap.applications a ON a.application_content_id = ppc.application_process_content_id
    AND a.application_id IN (SELECT * FROM unnest($1))
	';
  END IF;
  
 v_stmt := v_stmt ||  ' WHERE ap.f_has_user_access_to_row(ppc.created_by, ppc.updated_by)
';

  IF (p_application_process_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND ppc.application_process_id = $2
	';
  END IF;

  IF (p_type IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND ppc.type = $3
	';
  END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $4 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_application_ids, p_application_process_id, p_type, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;
  
  v_stmt := v_stmt || ' ORDER BY ppc.application_process_content_id LIMIT $4 OFFSET $5 - 1 ';

  OPEN ref_application_process_contents FOR EXECUTE v_stmt
  USING p_application_ids, p_application_process_id, p_type, p_page_size, p_start_index;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_update (OID = 33284) : 
--
CREATE FUNCTION ap.f_application_process_contents_update (
  p_application_process_content_id bigint,
  p_application_process_id bigint,
  p_type smallint
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_content_id IS NULL OR p_application_process_id IS NULL
    OR p_type IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.application_process_contents
  SET
    application_process_id = p_application_process_id,
    content = NULL,
    type = p_type,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE
    application_process_content_id = p_application_process_content_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_processes_create (OID = 33286) : 
--
CREATE FUNCTION ap.f_application_processes_create (
  p_uic text,
  p_applicant_id integer,
  p_status smallint,
  p_main_application_id bigint,
  p_main_application_type_id smallint,
  p_signing_guid uuid,
  p_parent_application_process_id bigint,
  p_incoming_number character varying,
  p_error_message character varying,
  p_additional_data jsonb,
  out p_application_process_id bigint
)
RETURNS bigint
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_applicant_id IS NULL OR p_status IS NULL
    OR p_main_application_type_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF ;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- Потребител може да създава записи само ако са свързани с процес на който е заявител
  IF p_applicant_id != v_user_id
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- създаване на запис
  INSERT INTO
    ap.application_processes(
    uic,
    applicant_id,
    status,    
    main_application_id,
    main_application_type_id,
    signing_guid,
    created_by,
    created_on,
    updated_by,
    updated_on,
    parent_application_process_id,
    incoming_number,
    error_message,
    additional_data)
  VALUES
    (p_uic,
    p_applicant_id,
    p_status,   
    p_main_application_id,
    p_main_application_type_id,
    p_signing_guid,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_parent_application_process_id,
    p_incoming_number,
    p_error_message,
    p_additional_data)
  RETURNING application_process_id
  INTO p_application_process_id;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_processes_delete (OID = 33287) : 
--
CREATE FUNCTION ap.f_application_processes_delete (
  p_application_process_id bigint
)
RETURNS void
AS 
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива

  DELETE
  FROM
    ap.application_processes
  WHERE
    application_process_id = p_application_process_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_processes_search (OID = 33288) : 
--
CREATE FUNCTION ap.f_application_processes_search (
  p_application_process_id bigint,
  p_applicant_cin integer,
  p_application_type smallint,
  p_is_parent boolean,
  p_signing_giud uuid,
  p_load_applications boolean,
  p_load_application_documents boolean,
  p_load_application_contents boolean,
  p_load_child_application_processes boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  out p_count integer,
  out ref_application_processes refcursor,
  out ref_application refcursor,
  out ref_application_documents refcursor,
  out ref_application_contents refcursor,
  out ref_child_application_processes refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt TEXT;
  v_count_stmt TEXT;
  v_applicant_id INTEGER;
  pp_application_processes ap.application_processes [ ];
BEGIN
  IF (p_start_index IS NULL OR p_page_size IS NULL AND
      (p_application_process_id IS NULL AND p_applicant_cin IS NULL)) THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  IF p_applicant_cin IS NOT  NULL
  THEN  
  	SELECT user_id INTO v_applicant_id FROM usr.app_users where cin = p_applicant_cin;
  END IF;

  v_stmt := '
  SELECT 
        pp.application_process_id,
        pp.uic,
        pp.applicant_id,
        pp.main_application_id,
        pp.main_application_type_id,
        NULL,
        pp.created_on,
        NULL,
        (SELECT MAX(app.updated_on) FROM ap.applications app WHERE app.application_process_id = pp.application_process_id GROUP BY app.application_process_id),
        pp.status,
        pp.signing_guid,
        pp.parent_application_process_id,
        pp.incoming_number,
        pp.error_message,
        pp.additional_data        
  FROM 
  		ap.application_processes pp
  WHERE ap.f_has_user_access_to_row(pp.created_by, pp.updated_by)
  ';

  IF (p_application_process_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND pp.application_process_id = $1
	';
  END IF;

  IF (p_applicant_cin IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND pp.applicant_id = $2
	';
  END IF;

  IF (p_application_type IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND main_application_type_id = $3
	';
  END IF;
  
  IF (p_signing_giud IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND pp.signing_guid = $4
	';
  END IF;
  
  IF (p_is_parent = TRUE)
    THEN
    v_stmt := v_stmt || ' AND pp.parent_application_process_id IS NULL
	';
  END IF;
  
  IF (p_is_parent = FALSE)
    THEN
    v_stmt := v_stmt || ' AND pp.parent_application_process_id IS NOT NULL
	';
  END IF;
  
   IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM ( ' || v_stmt || ' ) tt';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $5 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING  p_application_process_id, v_applicant_id, p_application_type, p_signing_giud, p_max_nor + 1;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;
  
  v_stmt :=  v_stmt || ' ORDER BY pp.application_process_id LIMIT $5 OFFSET $6 - 1
	';
  v_stmt := 'SELECT array_agg(tt.*) FROM (' || v_stmt || ') tt';
  
  EXECUTE v_stmt
  INTO pp_application_processes
  USING p_application_process_id, v_applicant_id, p_application_type, p_signing_giud, p_page_size, p_start_index;

  OPEN ref_application_processes FOR
  SELECT
    application_process_id,
    uic,
    applicant_id,
    main_application_id,
    main_application_type_id,
    status,
    signing_guid,
    created_on,
    updated_on,
    parent_application_process_id,
    incoming_number,
    error_message,
    additional_data     
  FROM
    unnest(pp_application_processes);

  IF(p_load_applications = TRUE)
    THEN
    OPEN ref_application FOR
    SELECT
      a.application_id,
      a.application_process_id,
      a.application_type_id,
      a.application_content_id,
      a.order,
      a.additional_data      
    FROM
      ap.applications a
    WHERE
      a.application_process_id in (
      SELECT
        pp.application_process_id
      FROM
        unnest(pp_application_processes) pp
      );
  END IF;

  IF(p_load_application_documents = TRUE)
    THEN
    OPEN ref_application_documents FOR
    SELECT
      ad.application_document_id,
      ad.name,
      ad.backoffice_guid,
      ad.application_id,
      ad.document_type_id,
      ad.is_original,
      ad.rejected_application_process_id,
      ad.html_template_content,
      ad.signing_guid,
      ad.incoming_number  
    FROM
      unnest(pp_application_processes) pp
      INNER JOIN ap.applications a ON pp.application_process_id = a.application_process_id
      INNER JOIN ap.application_documents ad ON a.application_id = ad.application_id;

  END IF;

  IF(p_load_application_contents = TRUE)
    THEN
    OPEN ref_application_contents FOR
    SELECT
      ppc.application_process_content_id,
      ppc.application_process_id,
      ppc.type,
      NULL as content
    FROM
      unnest(pp_application_processes) pp
      INNER JOIN ap.applications a ON pp.application_process_id = a.application_process_id
      INNER JOIN ap.application_process_contents ppc ON ppc.application_process_content_id = a.application_content_id;

  END IF;

  IF(p_load_child_application_processes = TRUE)
    THEN
    OPEN ref_child_application_processes FOR
    SELECT
      cp.application_process_id,
      cp.uic,
      cp.applicant_id,
      cp.main_application_id,
      cp.main_application_type_id,
      cp.status,
      cp.signing_guid,
      cp.created_on,
      cp.updated_on,
      cp.parent_application_process_id,  
      cp.incoming_number,
      cp.error_message,
      cp.additional_data
    FROM
      unnest(pp_application_processes) pp
      INNER JOIN ap.application_processes cp ON cp.parent_application_process_id = pp.application_process_id;

  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_processes_update (OID = 33291) : 
--
CREATE FUNCTION ap.f_application_processes_update (
  p_application_process_id bigint,
  p_uic text,
  p_applicant_id integer,
  p_status smallint,
  p_main_application_id bigint,
  p_main_application_type_id smallint,
  p_signing_guid uuid,
  p_parent_application_process_id bigint,
  p_incoming_number character varying,
  p_error_message character varying,
  p_additional_data jsonb
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR p_status IS NULL
    OR p_main_application_type_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.application_processes
  SET
    uic = p_uic,
    applicant_id = p_applicant_id,
    status = p_status,    
    main_application_id = p_main_application_id,
    main_application_type_id = p_main_application_type_id,
    signing_guid = p_signing_guid,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    parent_application_process_id = p_parent_application_process_id,
    incoming_number = p_incoming_number,
    error_message = p_error_message,
    additional_data = p_additional_data   
  WHERE
    application_process_id = p_application_process_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_applications_create (OID = 33292) : 
--
CREATE FUNCTION ap.f_applications_create (
  out p_application_id bigint,
  p_application_process_id bigint,
  p_application_type_id smallint,
  p_application_content_id bigint,
  p_order smallint,
  p_additional_data jsonb
)
RETURNS bigint
AS 
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL OR p_application_type_id IS NULL OR p_order IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- Потребител може да създава записи само ако са свързани с процес на който е заявител
  IF NOT EXISTS(
    SELECT 1 from ap.application_processes ap
    WHERE ap.application_process_id = p_application_process_id
          AND ap.applicant_id = v_user_id
          )
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- създаване на запис
  INSERT INTO
  ap.applications
    (
      application_process_id,
      application_type_id,
      application_content_id,
      created_by,
      created_on,
      updated_by,
      updated_on,
      "order",
      "additional_data"      
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
LANGUAGE plpgsql;
--
-- Definition for function f_applications_delete (OID = 33293) : 
--
CREATE FUNCTION ap.f_applications_delete (
  p_application_id bigint
)
RETURNS void
AS 
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива

  DELETE
  FROM
    ap.applications
  WHERE
    application_id = p_application_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_applications_search (OID = 33294) : 
--
CREATE FUNCTION ap.f_applications_search (
  p_application_process_id bigint,
  p_application_ids bigint[],
  p_load_application_documents boolean,
  p_load_application_content boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  out p_count integer,
  out ref_applications refcursor,
  out ref_application_documents refcursor,
  out ref_application_content refcursor
)
RETURNS record
AS 
$body$
DECLARE
  v_stmt TEXT;
  v_count_stmt TEXT;
  aa_applications ap.applications [ ];
BEGIN
  IF (p_start_index IS NULL OR p_page_size IS NULL OR
      (p_application_ids IS NULL AND p_application_process_id IS NULL))
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := '
  SELECT 
        a.application_id,
        a.application_process_id,
        a.application_type_id,
        a.application_content_id,
        NULL,
        NULL,
        NULL,
        NULL,
        a.order,
        a.additional_data
  FROM 
  		ap.applications a
  WHERE ap.f_has_user_access_to_row(a.created_by, a.updated_by)
';

  IF (p_application_process_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND a.application_process_id = $1
	';
  END IF;

  IF (p_application_ids IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' AND a.application_id IN (SELECT * FROM unnest($2))
	';
  END IF;

  IF p_calculate_count
    THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM ( ' || v_stmt || ' ) tt';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $3 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING p_application_process_id, p_application_ids, p_max_nor + 1;

    IF (p_max_nor IS NOT NULL AND
        p_max_nor < p_count)
      THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;

  v_stmt := v_stmt || ' ORDER BY a.application_id LIMIT $3 OFFSET $4
	';
  v_stmt := 'SELECT array_agg(tt.*) FROM (' || v_stmt || ') tt';
  EXECUTE
    v_stmt
  INTO aa_applications USING p_application_process_id,
       p_application_ids,
       p_page_size,
       (p_start_index - 1);

  OPEN ref_applications FOR
  SELECT  	
    a.application_id,
    a.application_process_id,
    a.application_type_id,
    a.application_content_id,
    a.order,
    a.additional_data
  FROM
    unnest(aa_applications) a;
    
  IF(p_load_application_documents = TRUE)
    THEN
    OPEN ref_application_documents FOR
    SELECT
      ad.application_document_id,
      ad.name,
      ad.backoffice_guid,
      ad.application_id,
      ad.document_type_id,
      ad.is_original,
      ad.rejected_application_process_id,
      ad.html_template_content,
      ad.signing_guid,
      ad.incoming_number
    FROM
      ap.application_documents ad
    WHERE
      ad.application_id IN (SELECT application_id FROM unnest(aa_applications));
  END IF;
    
  IF(p_load_application_content = TRUE)
    THEN
    OPEN ref_application_content FOR
    SELECT
      ppc.application_process_content_id,
      ppc.application_process_id,
      ppc.type,
      NULL as content 
    FROM
      ap.application_process_contents ppc
    WHERE
      ppc.application_process_content_id IN (SELECT a.application_content_id FROM unnest(aa_applications) a);
  END IF;
  
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_applications_update (OID = 33295) : 
--
CREATE FUNCTION ap.f_applications_update (
  p_application_id bigint,
  p_application_process_id bigint,
  p_application_type_id smallint,
  p_application_content_id bigint,
  p_order smallint,
  p_additional_data jsonb
)
RETURNS void
AS 
$body$
DECLARE
  v_user_id INTEGER;
  v_count NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_id IS NULL OR p_application_process_id IS NULL
    OR p_application_type_id IS NULL OR p_application_content_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва

  UPDATE
    ap.applications
  SET
    application_process_id = p_application_process_id,
    application_type_id = p_application_type_id,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp(),
    application_content_id = p_application_content_id,
    "order" = p_order,
    additional_data = p_additional_data    
  WHERE
    application_id = p_application_id
    and ap.f_has_user_access_to_row(created_by, updated_by);

  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_has_user_access_to_row (OID = 33296) : 
--
CREATE FUNCTION ap.f_has_user_access_to_row (
  p_created_by integer,
  p_updated_by integer
)
RETURNS boolean
AS 
$body$
DECLARE
 v_user_id INTEGER;
 v_has_access BOOLEAN;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_created_by IS NULL   	
    OR p_updated_by IS NULL     
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  if p_created_by = v_user_id 
      OR 1 = v_user_id
            then
            	v_has_access:= true;
            else
               v_has_access:= false;
            end if;
            
RETURN (v_has_access);

END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_has_user_doc_draft_access (OID = 33297) : 
--
CREATE FUNCTION ap.f_has_user_doc_draft_access (
  p_doc_guid character varying,
  p_cin integer,
  p_is_user_identifiable boolean,
  out p_has_access boolean
)
RETURNS boolean
AS 
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_doc_guid IS NULL   	
    OR p_cin IS NULL     
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  if exists(select 1 from ap.application_documents ad 
            inner join ap.applications a on a.application_id = ad.application_id
            inner join ap.application_processes ap on ap.application_process_id = a.application_process_id
            inner join usr.app_users u on u.user_id = ap.applicant_id
            where ad.backoffice_guid = p_doc_guid
            and u.cin = p_cin
            and (ad.incoming_number is null OR (ad.incoming_number is not null and p_is_user_identifiable = true)))
            then
            	p_has_access:= true;
            else
               p_has_access:= false;
            end if;



END;
$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_process_contents_upload (OID = 1044676) : 
--
CREATE FUNCTION ap.f_application_process_contents_upload (
  p_application_process_content_id bigint,
  p_content bytea,
  p_offset integer
)
RETURNS void
AS 
$body$

BEGIN
 IF (p_application_process_content_id IS NULL)
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  UPDATE
      ap.application_process_contents
    SET
      content = 
		  (CASE
	  		WHEN (content is null OR p_content IS NULL) THEN p_content
	  		ELSE 
				overlay(content placing p_content from p_offset)
		   END)
    WHERE
      application_process_content_id = p_application_process_content_id
      and ap.f_has_user_access_to_row(created_by, updated_by);
END;

$body$
LANGUAGE plpgsql;
--
-- Definition for function f_application_processes_delete_all (OID = 1451173) : 
--
CREATE FUNCTION ap.f_application_processes_delete_all (
  p_application_process_id bigint
)
RETURNS void
AS 
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE from ap.application_documents WHERE application_id in (select application_id from ap.applications WHERE application_process_id = p_application_process_id);

  UPDATE ap.application_processes SET main_application_id = null
  WHERE
      application_process_id = p_application_process_id;
  	
  DELETE FROM ap.applications WHERE application_process_id = p_application_process_id;

  DELETE FROM ap.application_process_contents WHERE application_process_id = p_application_process_id;

  DELETE FROM ap.application_processes
  WHERE
      application_process_id = p_application_process_id;
      
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
    THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;

END;
$body$
LANGUAGE plpgsql;
