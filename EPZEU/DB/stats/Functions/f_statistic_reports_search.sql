CREATE OR REPLACE FUNCTION stats.f_statistic_reports_search (
  p_statistic_report_id integer [],
  p_statistic_id integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_statistic_reports refcursor
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
  

  v_stmt := 'SELECT s.statistic_report_id,
                    s.statistic_id,
                    s.date_from,
                    s.date_to,
                    s.status,
                    s.date_change_status,
                    s.date_upload,
                    s.file_name,
                    s.file_size,
                    s.content_type,
                    s.content,
                    s.created_by,
                    s.created_on,
                    s.updated_by,
                    s.updated_on
               FROM stats.statistic_reports s, stats.statistics t
              WHERE s.statistic_id = t.statistic_id ';

  
  IF p_statistic_report_id IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND s.statistic_report_id = ANY($1) ';
  END IF;
    
  IF p_statistic_id IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND s.statistic_id = $2 ';
  END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) t';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_statistic_report_id, p_statistic_id ;

  END IF;

  v_stmt := v_stmt || ' ORDER BY t.register_id, t.name, s.date_to DESC LIMIT $3 OFFSET $4 - 1 ';

  OPEN p_ref_statistic_reports FOR EXECUTE v_stmt
  USING p_statistic_report_id, p_statistic_id, p_page_size, p_start_index;
 
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
