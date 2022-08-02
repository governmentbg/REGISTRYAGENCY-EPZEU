CREATE OR REPLACE FUNCTION public.f_data_service_user_limits_search (
  p_user_limit_ids integer [],
  p_service_limit_id integer,
  p_user_id integer,
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_user_limits refcursor
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
  v_stmt := ' SELECT           
                u.user_id,
                u.email,
                (SELECT aut.username
                 FROM usr.user_authentications aut 
                 WHERE aut.user_id = u.user_id 
                   AND aut.authentication_type = 2) AS user_name, 
                u.first_name,
                u.middle_name,
                u.family_name,
                u.organization,
                u.status as user_status, 
                m.name AS module_name, 
                l.service_code, 
                l.service_name, 
                l.status AS service_status, 
                ul.user_limit_id,
                ul.service_limit_id,
                ul.user_id,
                ul.requests_interval,
                ul.requests_number,
                ul.status,
                ul.updated_by,
                ul.updated_on
              FROM  public.data_service_user_limits ul, 
                    public.data_service_limits l, 
                    usr.users u, 
                    public.n_s_modules m
              WHERE ul.service_limit_id = l.service_limit_id
                AND ul.is_last = 1::bit
                AND ul.deactivation_ver_id IS NULL
                AND l.is_last = 1::bit
                AND l.deactivation_ver_id IS NULL
                AND ul.user_id = u.user_id
                AND l.module_id = m.module_id
            ';    

  -- добавяне на критерии
  IF p_user_limit_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and ul.user_limit_id = ANY($1)
	';
  END IF;  
  
  IF p_service_limit_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and ul.service_limit_id = $2
	';
  END IF;  

  IF p_user_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and ul.user_id = $3
	';
  END IF;  
  
  IF p_status IS NOT NULL
  THEN
    v_stmt := v_stmt || ' and ul.status = $4
	';
  END IF; 
  

  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) tc ';

    EXECUTE v_count_stmt
    INTO p_count
    USING p_user_limit_ids, p_service_limit_id, p_user_id, p_status;

  END IF;
  
  v_stmt := v_stmt || ' ORDER BY email, first_name, middle_name, family_name, service_limit_id  LIMIT $5 OFFSET $6 - 1';
  
  OPEN p_ref_user_limits 
  FOR EXECUTE v_stmt
  USING p_user_limit_ids, p_service_limit_id, p_user_id, p_status, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
