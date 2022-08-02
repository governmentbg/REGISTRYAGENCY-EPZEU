CREATE OR REPLACE FUNCTION usr.f_app_users_search (
  p_user_id integer,
  p_cin integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_max_nor integer,
  out p_count integer,
  out ref_app_users refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt TEXT;
  v_count_stmt TEXT;
BEGIN
  IF p_start_index IS NULL OR p_page_size IS NULL OR
      (p_user_id IS NULL AND  p_cin IS NULL)
    THEN
    RAISE EXCEPTION 'Invalid input parameters';
  END IF;

  v_stmt := ' 
  SELECT *    
  FROM usr.app_users u
  WHERE 1=1
';

  IF (p_user_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    AND u.user_id = $1
	';
  END IF;

  IF (p_cin IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    AND u.cin = $2
	';
  END IF;
      
  IF p_calculate_count
    THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

    IF (p_max_nor IS NOT NULL)
    THEN
      v_count_stmt := v_count_stmt || '
                              LIMIT $3 + 1';

    END IF;
    
    v_count_stmt := v_count_stmt || ' ) tc ';
	
    EXECUTE v_count_stmt
    INTO p_count
    USING p_user_id, p_cin, p_max_nor;
    
    IF p_max_nor IS NOT NULL AND
        p_max_nor < p_count
    THEN
      PERFORM sys.f_raise_excp_max_nor_exceeded();
    END IF;
    
  END IF;

  v_stmt := v_stmt || ' LIMIT $3 OFFSET $4 - 1 ';

  OPEN ref_app_users FOR EXECUTE v_stmt
  USING p_user_id, p_cin, p_page_size, p_start_index;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION usr.f_app_users_search (p_user_id integer, p_cin integer, p_start_index integer, p_page_size integer, p_calculate_count boolean, p_max_nor integer, out p_count integer, out ref_app_users refcursor)
  OWNER TO epzeu_dev;