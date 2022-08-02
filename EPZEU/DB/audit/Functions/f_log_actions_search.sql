CREATE OR REPLACE FUNCTION audit.f_log_actions_search (
  p_log_action_ids bigint [],
  p_log_action_date_from timestamptz,
  p_log_action_date_to timestamptz,
  p_object_type_id smallint,
  p_action_type_id smallint,
  p_module_id smallint,
  p_functionality_id smallint,
  p_key varchar,
  p_user_session_id uuid,
  p_login_session_id uuid,
  p_user_id integer,
  p_ip_address inet,
  p_is_export boolean,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out ref_log_actions refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
  v_user_access_level integer;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_start_index IS NULL OR p_page_size IS NULL /*OR p_log_action_date_from IS NULL OR p_log_action_date_to IS NULL*/
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на ниво на достъп до данните на потребителя от сесията
  -- нивата са 1 - потребители с право Одит и 2 - потребители с право Одит за разследващи органи
  v_user_access_level = usr.f_user_access_level_get(sys.f_currentuser_get());
  
  v_stmt := 'SELECT t.log_action_id,
                    t.log_action_date,
                    t.object_type_id,
                    t.action_type_id,
                    t.module_id,
                    t.functionality_id,
                    t.key,
                    t.user_session_id,
                    t.login_session_id,
                    t.user_id,
                    t.ip_address,
                    t.additional_data,
                    t.operation_id,
                    u.is_system,
                    u.email,
                    u.first_name,
                    u.middle_name,
                    u.family_name,
                    u.cin,
                    (SELECT ua.username 
                       FROM usr.user_authentications ua
                      WHERE ua.user_id = u.user_id
                        AND ua.authentication_type = 2) username ';
  IF (p_is_export ) 
  THEN v_stmt :=     v_stmt || ', ls.authentication_type,  CASE WHEN authentication_type=3 THEN c.serial_number END serial_number, c.issuer, c.not_after, c.subject
                                FROM
                                  audit.log_actions t 
                                JOIN usr.users u ON
                                  u.user_id = t.user_id     
                                LEFT JOIN usr.login_sessions ls ON
                                  ls.login_session_id = t.login_session_id 
                                LEFT JOIN usr.certificates c ON
                                  c.certificate_id = ls.certificate_id
                                WHERE  1 = 1 ';  
                              
  ELSE v_stmt :=     v_stmt || ' FROM audit.log_actions t, 
                                      usr.users u 
                                WHERE t.user_id = u.user_id';        
  END IF;                        
                        
  -- 
  IF v_user_access_level = 1 THEN -- ниво 1 не вижда записите с по-високо ниво, ниво 2 вижда всичко
    v_stmt := v_stmt || ' AND t.data_access_level = $1  
	';
  END IF;
  
  IF p_log_action_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.log_action_id = ANY( $2 ) 
	';
  END IF;  
  IF p_log_action_date_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.log_action_date >= $3 
	';
  END IF;  
  
  IF p_log_action_date_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.log_action_date <= $4 
	';
  END IF;

  IF p_object_type_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.object_type_id = $5 
	';
  END IF;

  IF p_action_type_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.action_type_id = $6 
	';
  END IF;

  IF p_module_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.module_id = $7 
	';
  END IF;  
   

  IF p_functionality_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.functionality_id = $8 
	';
  END IF;   
   
  IF p_key IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.key = $9
	';
  END IF; 
  
  IF p_user_session_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.user_session_id = $10
	';
  END IF; 
   
  IF p_login_session_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.login_session_id = $11 
	';
  END IF;    
  
  IF p_user_id IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.user_id = $12
	';
  END IF;    
  
  IF p_ip_address IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND t.ip_address = $13
	';
  END IF;  
   
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM (SELECT * FROM( ' || v_stmt || ' ) tt ';

    IF p_max_nor IS NOT NULL
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $14 + 1';

    END IF;

	v_count_stmt := v_count_stmt || ' ) tc ';
    
    EXECUTE v_count_stmt
    INTO p_count
    USING v_user_access_level, p_log_action_ids, p_log_action_date_from, p_log_action_date_to, p_object_type_id, p_action_type_id, p_module_id, p_functionality_id, p_key, 
          p_user_session_id, p_login_session_id, p_user_id, p_ip_address, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;

  END IF;

  v_stmt := 'SELECT
              tt.*
             FROM (' || v_stmt || ') tt
             ORDER BY tt.log_action_date DESC LIMIT $14 OFFSET $15 - 1';

  OPEN ref_log_actions FOR 
  EXECUTE v_stmt 
  USING v_user_access_level, p_log_action_ids, p_log_action_date_from, p_log_action_date_to, p_object_type_id, p_action_type_id, p_module_id, p_functionality_id, p_key, 
        p_user_session_id, p_login_session_id, p_user_id, p_ip_address, p_page_size, p_start_index;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION audit.f_log_actions_search(p_log_action_ids bigint [], p_log_action_date_from timestamptz, p_log_action_date_to timestamptz, p_object_type_id smallint, p_action_type_id smallint, p_module_id smallint, p_functionality_id smallint, p_key varchar, p_user_session_id uuid, p_login_session_id uuid, p_user_id integer, p_ip_address inet, p_is_export boolean, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out ref_log_actions refcursor)
IS 'Функция за търсене на записи в одит.';
