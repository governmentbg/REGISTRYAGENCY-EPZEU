CREATE OR REPLACE FUNCTION stats.f_statistic_reports_update (
  p_statistic_report_id integer,
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id      INTEGER;
  v_count        INTEGER := 0;
  v_status       INTEGER;
  v_statistic_id INTEGER;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_statistic_report_id IS NULL OR 
     p_date_from IS NULL OR 
     p_date_to IS NULL OR 
     p_file_name IS NULL OR 
     p_file_size IS NULL OR 
     p_content_type IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  SELECT r.status, r.statistic_id 
    INTO v_status, v_statistic_id
    FROM stats.statistic_reports r
   WHERE r.statistic_report_id = p_statistic_report_id; 
    
  IF v_status = 2 THEN   
  
     SELECT COUNT(1)
      INTO v_count
      FROM stats.statistic_reports r
     WHERE r.statistic_id = v_statistic_id
       AND (p_date_from between r.date_from and r.date_to OR 
            p_date_to between r.date_from and r.date_to  OR
            r.date_from between p_date_from and p_date_to OR
            r.date_to between p_date_from and p_date_to  )
       AND r.status = 2
       AND r.statistic_report_id != p_statistic_report_id; 
       
  END IF;
      
  -- Проверка дали е вече съществува публикуван отчет за този период
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(13);
  END IF;
    
  -- update-ва
  UPDATE stats.statistic_reports
     SET date_from    = p_date_from,
         date_to      = p_date_to,
         file_name    = p_file_name,
         file_size    = p_file_size,
         content_type = p_content_type,         
         updated_by   = v_user_id,
         updated_on   = sys.f_current_timestamp()
   WHERE statistic_report_id = p_statistic_report_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
