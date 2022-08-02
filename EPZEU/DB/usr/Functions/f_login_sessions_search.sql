CREATE OR REPLACE FUNCTION usr.f_login_sessions_search (
  p_login_session_ids uuid [],
  p_user_session_id uuid,
  p_user_id integer,
  p_login_date_from timestamptz,
  p_login_date_to timestamptz,
  p_ip_address cidr,
  p_authentication_type smallint,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_login_sessions refcursor
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
  v_stmt := ' SELECT ls.login_session_id,
                     ls.user_session_id,
                     ls.user_id,
                     ls.login_date,
                     ls.logout_date,
                     ls.ip_address,
                     ls.authentication_type,
                     ls.certificate_id,
                     ls.created_by,
                     ls.created_on,
                     ls.updated_by,
                     ls.updated_on,
                     ls.operation_id,
                     u.email,
                     (SELECT ua.username 
                        FROM usr.user_authentications ua
                       WHERE ua.user_id = u.user_id
                         AND ua.authentication_type = 2) username
                FROM usr.login_sessions ls, usr.users u
               WHERE ls.user_id = u.user_id
            ';    
 IF p_login_session_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.login_session_id = ANY($1)
	';
  END IF;  
  
  IF p_user_session_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.user_session_id = $2
	';
  END IF; 
  
  IF p_user_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.user_id = $3
	';
  END IF; 
  
  IF p_login_date_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.login_date >= $4
	';
  END IF;   
  
  IF p_login_date_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.login_date < $5
	';
  END IF;   
  
  IF p_ip_address IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.ip_address = $6
	';
  END IF; 
  
  IF p_authentication_type IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND ls.authentication_type = $7
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
      USING p_login_session_ids, p_user_session_id, p_user_id, p_login_date_from, p_login_date_to, p_ip_address, p_authentication_type, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;
  
  v_stmt := v_stmt || ' ORDER BY ls.login_date desc LIMIT $8 OFFSET $9 - 1 ';

  OPEN p_ref_login_sessions FOR EXECUTE v_stmt
  USING p_login_session_ids, p_user_session_id, p_user_id, p_login_date_from, p_login_date_to, p_ip_address, p_authentication_type, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
