CREATE OR REPLACE FUNCTION public.f_app_parameters_search (
  p_app_param_ids integer [],
  p_functionality_id integer,
  p_module_id integer,
  p_code varchar,
  p_description varchar,
  p_is_system boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_last_updated_on timestamptz,
  out p_ref_params refcursor
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
  
  SELECT last_updated_on INTO p_last_updated_on
  FROM nom.nomenclature_changes
  WHERE tablename = 'app_parameters';
 
  -- Сглобяване на заявката за търсене
  v_stmt := 'SELECT p.app_param_id,
                    p.app_param_ver_id,
                    f.functionality_id,
                    f.name as functionality_name,
                    m.name as module_name,
                    p.code,
                    p.description,
                    p.is_system,
                    p.is_last,
                    p.deactivation_ver_id,
                    p.created_by,
                    p.created_on,
                    p.updated_by,
                    p.updated_on,
                    p.param_type,
                    p.value_datetime,
                    p.value_interval,
                    p.value_string,
                    p.value_int,
                    p.value_hour
               FROM public.app_parameters p,
                    public.n_s_functionalities f, 
                    public.n_s_modules m
              WHERE p.is_last = 1 :: BIT
                AND p.deactivation_ver_id IS NULL
                AND p.functionality_id = f.functionality_id 
                AND m.module_id = f.module_id ';    
                
  -- добавяне на критерии
  IF p_app_param_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and p.app_param_id = ANY($1)	';
  END IF;  
  
  IF p_functionality_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and p.functionality_id = $2 ';
  END IF;  
  
  IF p_module_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and m.module_id = $3 ';
  END IF;
  
  IF p_code IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and lower(p.code) LIKE concat(''%'', $4, ''%'') 	';
  END IF;  
  
  IF p_description IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and lower(p.description) LIKE concat(''%'',$5, ''%'') ';
  END IF; 
  
  IF p_is_system IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and p.is_system = $6 	';
  END IF; 
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_app_param_ids, p_functionality_id, p_module_id, sys.f_replace_like_str(lower(p_code)), sys.f_replace_like_str(lower(p_description)), p_is_system;

  END IF;
  
  v_stmt := v_stmt || ' ORDER BY m.name, f.name, p.code LIMIT $7 OFFSET $8 - 1 ';
  
  OPEN p_ref_params
  FOR EXECUTE v_stmt
  USING p_app_param_ids, p_functionality_id, p_module_id, sys.f_replace_like_str(lower(p_code)), sys.f_replace_like_str(lower(p_description)), p_is_system, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
