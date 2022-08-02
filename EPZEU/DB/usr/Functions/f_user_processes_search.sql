CREATE OR REPLACE FUNCTION usr.f_user_processes_search (
  p_process_ids integer [],
  p_process_guids varchar [],
  p_process_type integer,
  p_user_ids integer [],
  p_invalid_after_from timestamptz,
  p_invalid_after_to timestamptz,
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_user_processes refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  
  -- Проверка за невалидни входящи параметри
  IF  ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
      ( p_start_index IS NOT NULL AND p_page_size IS NULL ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- Сглобяване на заявката за търсене
  v_stmt := ' SELECT 
                process_id,
                process_guid,
                process_type,
                user_id,
                invalid_after,
                status,
                updated_by,
                updated_on
              FROM usr.user_processes p
              WHERE 1 = 1 
              ';

  IF p_process_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_id = ANY($1)
	';
  END IF;
  
  IF p_process_guids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_guid = ANY($2)
	';
  END IF;

  IF p_process_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.process_type = $3
	';
  END IF;
  
  IF p_user_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.user_id = ANY($4)
	';
  END IF;

  IF p_invalid_after_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.invalid_after >= $5
	';
  END IF;
  
  IF p_invalid_after_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.invalid_after >= $6
	';
  END IF;
  
  IF p_status IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND p.status = $7
	';
  END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $8 + 1';

    END IF;

    v_count_stmt := v_count_stmt || ' ) tc ';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_process_ids, p_process_guids, p_process_type, p_user_ids, p_invalid_after_from, p_invalid_after_to, p_status, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY p.user_id LIMIT $8 OFFSET $9 - 1 ';

  OPEN p_ref_user_processes FOR EXECUTE v_stmt
  USING p_process_ids, p_process_guids, p_process_type, p_user_ids, p_invalid_after_from, p_invalid_after_to, p_status, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
