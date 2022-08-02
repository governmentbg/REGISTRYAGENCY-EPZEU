CREATE OR REPLACE FUNCTION ap.f_application_process_contents_delete (
  p_application_process_content_id bigint
)
RETURNS void AS
$body$
DECLARE
  v_count numeric;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_application_process_content_id IS NULL THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива

  DELETE
  FROM
    ap.application_process_contents
  WHERE
    application_process_content_id = p_application_process_content_id;

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
