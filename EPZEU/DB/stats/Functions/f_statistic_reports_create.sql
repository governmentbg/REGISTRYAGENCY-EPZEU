CREATE OR REPLACE FUNCTION stats.f_statistic_reports_create (
  p_statistic_id integer,
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_status smallint,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar,
  out p_statistic_report_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_statistic_id IS NULL  OR p_date_from IS NULL OR p_date_to IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
    SELECT COUNT(1)
    INTO v_count
    FROM stats.statistic_reports r
   WHERE r.statistic_id = p_statistic_id
     AND (p_date_from between r.date_from and r.date_to OR 
          p_date_to between r.date_from and r.date_to OR
          r.date_from between p_date_from and p_date_to OR
          r.date_to between p_date_from and p_date_to  )
     AND r.status = 2; 
    
  -- Проверка дали е вече съществува публикуван отчет за този период
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(13);
  END IF;
  
  -- създаване на запис
  INSERT INTO stats.statistic_reports(       
		statistic_id,
		date_from,
		date_to,
		status,
		date_change_status,
        date_upload,
		file_name,
		file_size,
		content_type,
		content,
		created_by,
		created_on,
		updated_by,
		updated_on
  )
  VALUES
  ( p_statistic_id,
    p_date_from,
    p_date_to,
    p_status,
    sys.f_current_timestamp(),
    NULL,
    p_file_name,
    p_file_size,
    p_content_type,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING  statistic_report_id
    INTO p_statistic_report_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
