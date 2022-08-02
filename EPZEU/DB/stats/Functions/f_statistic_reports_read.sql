CREATE OR REPLACE FUNCTION stats.f_statistic_reports_read (
  p_statistic_report_id integer,
  out p_content bytea
)
RETURNS bytea AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_statistic_report_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT s.content
    INTO p_content
    FROM stats.statistic_reports s
   WHERE s.statistic_report_id = p_statistic_report_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
