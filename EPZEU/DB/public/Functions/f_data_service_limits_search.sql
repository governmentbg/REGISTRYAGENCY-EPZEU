CREATE OR REPLACE FUNCTION public.f_data_service_limits_search (
  p_service_limit_ids integer [],
  p_service_code varchar,
  p_service_name varchar,
  p_module_id smallint,
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_limits refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
    -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- Сглобяване на заявката за търсене
  v_stmt := ' SELECT l.service_limit_id,
                     l.service_limit_ver_id,
                     l.service_code,
                     l.service_name,
                     l.module_id,
                     l.requests_interval,
                     l.requests_number,
                     l.status,
                     l.updated_by,
                     l.updated_on
                FROM public.data_service_limits l,
                     public.n_s_modules m
               WHERE l.is_last = 1::bit
                 AND l.deactivation_ver_id IS NULL 
                 AND l.module_id = m.module_id ';    
  -- добавяне на критерии
  IF p_service_limit_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and l.service_limit_id = ANY($1)
	';
  END IF;  
  
  IF p_service_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and l.service_code = $2 
	';
  END IF;  
  
  IF p_service_name IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and lower(l.service_name) LIKE concat(''%'',lower($3), ''%'') 
	';
  END IF;  
  
  IF p_module_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and l.module_id = $4 
	';
  END IF; 
  
  IF p_status IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and l.status = $5
	';
  END IF; 
 
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_service_limit_ids, p_service_code,  p_service_name, p_module_id, p_status;

  END IF;
 
  v_stmt := v_stmt || ' ORDER BY m.name, service_code, service_name, service_limit_id  LIMIT $6 OFFSET $7 - 1';

  OPEN p_ref_limits 
  FOR EXECUTE v_stmt
  USING p_service_limit_ids, p_service_code,  p_service_name, p_module_id, p_status, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;