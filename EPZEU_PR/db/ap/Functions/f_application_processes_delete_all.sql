CREATE OR REPLACE FUNCTION ap.f_application_processes_delete_all (
  p_application_process_id bigint
)
RETURNS void AS
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE from ap.application_documents WHERE application_id in (select application_id from ap.applications WHERE application_process_id = p_application_process_id);

  UPDATE ap.application_processes SET main_application_id = null
  WHERE
      application_process_id = p_application_process_id;
  	
  DELETE FROM ap.applications WHERE application_process_id = p_application_process_id;

  DELETE FROM ap.application_process_contents WHERE application_process_id = p_application_process_id;

  DELETE FROM ap.application_processes
  WHERE
      application_process_id = p_application_process_id;
      
  GET DIAGNOSTICS v_count = ROW_COUNT;

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

ALTER FUNCTION ap.f_application_processes_delete_all (p_application_process_id bigint)
  OWNER TO epzeu_dev;