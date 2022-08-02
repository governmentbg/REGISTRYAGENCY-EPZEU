CREATE OR REPLACE FUNCTION stats.f_statistic_reports_upload (
  p_statistic_report_id integer,
  p_content bytea,
  p_offset integer,
  p_length integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_old_package_process_content BYTEA;
BEGIN
  IF (p_statistic_report_id IS NULL)
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_user_id := sys.f_currentuser_get();
  
  SELECT CONTENT 
    INTO v_old_package_process_content
    FROM stats.statistic_reports
   WHERE statistic_report_id = p_statistic_report_id;

  IF (v_old_package_process_content IS NULL OR p_content IS NULL)
    THEN
      UPDATE stats.statistic_reports
         SET content = p_content,
             date_upload =  sys.f_current_timestamp()
       WHERE statistic_report_id = p_statistic_report_id;
    ELSE
      UPDATE stats.statistic_reports
         SET content = overlay(content placing p_content from p_offset for GREATEST (p_length,  length(content))),
             date_upload =  sys.f_current_timestamp()
       WHERE statistic_report_id = p_statistic_report_id;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
