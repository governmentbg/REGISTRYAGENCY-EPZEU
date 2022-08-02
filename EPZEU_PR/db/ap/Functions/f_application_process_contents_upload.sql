CREATE OR REPLACE FUNCTION ap.f_application_process_contents_upload (
  p_application_process_content_id bigint,
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
  IF (p_application_process_content_id IS NULL)
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_user_id := sys.f_currentuser_get();
  SELECT CONTENT INTO v_old_package_process_content
  FROM ap.application_process_contents
  WHERE application_process_content_id = p_application_process_content_id;

  IF (v_old_package_process_content IS NULL OR p_content IS NULL)
    THEN
    UPDATE
      ap.application_process_contents
    SET
      content = p_content,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE
      application_process_content_id = p_application_process_content_id;
    ELSE
    UPDATE
      ap.application_process_contents
    SET
      content = overlay(content placing p_content from p_offset for GREATEST (p_length,  length(content))),
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE
      application_process_content_id = p_application_process_content_id;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;