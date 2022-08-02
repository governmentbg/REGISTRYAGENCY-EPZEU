CREATE OR REPLACE FUNCTION stats.f_statistic_reports_delete (
  p_statistic_report_id integer
)
RETURNS void AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_statistic_report_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE
    FROM stats.statistic_reports 
   WHERE statistic_report_id	 = p_statistic_report_id
     AND status = 1;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е изтрит точно един запис
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
