CREATE OR REPLACE FUNCTION stats.f_statistic_reports_status_update (
  p_statistic_report_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id   INTEGER;
  v_count     INTEGER;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_statistic_report_id IS NULL OR p_status IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
    -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  IF (p_status = 2 ) THEN
  
      SELECT COUNT(1)
        INTO v_count
        FROM stats.statistic_reports r1, stats.statistic_reports r2
       WHERE r1.statistic_id = r2.statistic_id
         AND (r2.date_from between r1.date_from and r1.date_to OR 
              r2.date_to between r1.date_from and r1.date_to  OR
              r1.date_from between r2.date_from and r2.date_to OR
              r1.date_to between r2.date_from and r2.date_to  )
         AND r1.status = 2
         AND r1.statistic_report_id != r2.statistic_report_id
         AND r2.statistic_report_id = p_statistic_report_id; 
        
      -- Проверка дали е вече съществува публикуван отчет за този период
      IF v_count > 0
      THEN
        PERFORM sys.f_raise_excp(13);
      END IF;
  END IF;
  
  -- промяна на статус на отчет 
  UPDATE stats.statistic_reports r
     SET status             = p_status,
         date_change_status = sys.f_current_timestamp(),
         updated_by         = v_user_id,
         updated_on         = sys.f_current_timestamp()
   WHERE statistic_report_id = p_statistic_report_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
