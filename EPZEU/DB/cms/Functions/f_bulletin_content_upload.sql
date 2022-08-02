CREATE OR REPLACE FUNCTION cms.f_bulletin_content_upload (
  p_bulletin_id integer,
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
  IF (p_bulletin_id IS NULL)
    THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_user_id := sys.f_currentuser_get();
  
  SELECT CONTENT 
    INTO v_old_package_process_content
    FROM cms.bulletins
   WHERE bulletin_id = p_bulletin_id;

  IF (v_old_package_process_content IS NULL OR p_content IS NULL)
    THEN
      UPDATE cms.bulletins
         SET content = p_content
       WHERE bulletin_id = p_bulletin_id;
    ELSE
      UPDATE cms.bulletins
         SET content = overlay(content placing p_content from p_offset for GREATEST (p_length,  length(content)))
       WHERE bulletin_id = p_bulletin_id;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
