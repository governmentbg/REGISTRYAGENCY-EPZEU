CREATE OR REPLACE FUNCTION cms.f_video_lessons_i18n_content_upload (
  p_lesson_id integer,
  p_language_id integer,
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
  IF (p_lesson_id IS NULL) THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_user_id := 1; /* sys.f_currentuser_get();*/
  
  SELECT CONTENT 
    INTO v_old_package_process_content
    FROM cms.video_lessons_i18n
   WHERE lesson_id = p_lesson_id
     AND language_id = p_language_id;

  IF (v_old_package_process_content IS NULL OR p_content IS NULL)
    THEN
      UPDATE cms.video_lessons_i18n
         SET content = p_content
       WHERE lesson_id = p_lesson_id
         AND language_id = p_language_id;
    ELSE
      UPDATE cms.video_lessons_i18n
         SET content = overlay(content placing p_content from p_offset for GREATEST (p_length,  length(content)))
       WHERE lesson_id = p_lesson_id
         AND language_id = p_language_id;
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
