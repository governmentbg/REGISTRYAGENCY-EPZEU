CREATE OR REPLACE FUNCTION stats.f_statistic_search (
  p_statistic_ids integer [],
  p_register_id smallint,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_statistic refcursor
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
  

  v_stmt := 'SELECT s.statistic_id,
                    s.register_id,
                    s.name,
                    s.type_genarate,
                    s.url,
                    s.created_by,
                    s.created_on,
                    s.updated_by,
                    s.updated_on,
                    sr.date_from,
                    sr.date_to,
                    element_count
              FROM (SELECT s.statistic_id,
                           s.register_id,
                           s.name,
                           s.type_genarate,
                           s.url,
                           s.created_by,
                           s.created_on,
                           s.updated_by,
                           s.updated_on,
                           s.order_num,
                           (SELECT MAX(date_to) max_date_to
                              FROM stats.statistic_reports r
                             WHERE r.statistic_id = s.statistic_id
                               AND r.status = 2
                          GROUP BY r.statistic_id  ),
                          (SELECT COUNT(1) element_count
                              FROM stats.statistic_reports r
                             WHERE r.statistic_id = s.statistic_id
                               AND r.status = 2
                          GROUP BY r.statistic_id  )
                      FROM stats.statistics s
                     WHERE 1 = 1 ';
                      
  IF p_statistic_ids IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND s.statistic_id = ANY($1) ';
  END IF;
  
  IF p_register_id IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND s.register_id = $2 ';
  END IF;   
  
  v_stmt := v_stmt || ') s
                 LEFT JOIN stats.statistic_reports sr 
                      ON s.statistic_id = sr.statistic_id
                      AND sr.date_to = max_date_to 
                      AND sr.status = 2  ';

  
 
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) t';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_statistic_ids, p_register_id ;

  END IF;

  v_stmt := v_stmt || ' ORDER BY s.register_id, s.order_num LIMIT $3 OFFSET $4 - 1 ';

  OPEN p_ref_statistic FOR EXECUTE v_stmt
  USING p_statistic_ids, p_register_id, p_page_size, p_start_index;
 
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
