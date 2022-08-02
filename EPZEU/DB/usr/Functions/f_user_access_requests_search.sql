CREATE OR REPLACE FUNCTION usr.f_user_access_requests_search (
  p_request_ids integer [],
  p_users_ids integer [],
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_access_status_ids integer [],
  p_email varchar,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_user_access_requests refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_request_ids IS NULL AND
      p_users_ids IS NULL AND 
      p_date_from  IS NULL AND
      p_date_to  IS NULL AND
      p_access_status_ids IS NULL AND 
      p_email  IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL  
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  v_stmt := 'SELECT uar.*, u.cin, u.email, u.first_name, u.middle_name, u.family_name,
                   (SELECT ua.authentication_type 
                      FROM usr.user_authentications ua
                     WHERE ua.user_id = u.user_id
                       AND ua.authentication_type in(1, 2)
                  GROUP BY ua.authentication_type ) as authentication_type
               FROM usr.user_access_requests uar,
                    usr.users u
              WHERE uar.user_id = u.user_id';

  IF p_request_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.request_id = ANY($1) ';
  END IF;

  IF p_users_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.user_id = ANY($2) ';
  END IF;


    
  IF p_date_from IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.created_on >= $3 ';
  END IF;
  
  IF p_date_to IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.created_on  <=  $4 ';
  END IF;
   
  IF p_access_status_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND uar.access_status = ANY($5) ';
  END IF;
  
  IF p_email IS NOT NULL
  THEN
    v_stmt := v_stmt || ' AND u.email = $6 ';
  END IF;

  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $7 + 1';

    END IF;

    v_count_stmt := v_count_stmt || ' ) tc ';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_request_ids, p_users_ids, p_date_from, p_date_to, p_access_status_ids, p_email, p_max_nor;

    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
  END IF;

  v_stmt := v_stmt || ' ORDER BY uar.created_on DESC, uar.request_id LIMIT $7 OFFSET $8 - 1 ';

  OPEN p_ref_user_access_requests FOR EXECUTE v_stmt
  USING p_request_ids, p_users_ids, p_date_from, p_date_to, p_access_status_ids, p_email, p_page_size, p_start_index;

 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_access_requests_search(p_request_ids integer [], p_users_ids integer [], p_date_from timestamptz, p_date_to timestamptz, p_access_status_ids integer [], p_email varchar, p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_user_access_requests refcursor)
IS 'Търсене в исканията за достъп.';
