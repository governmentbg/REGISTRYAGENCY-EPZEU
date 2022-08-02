CREATE OR REPLACE FUNCTION cms.f_video_lessons_i18n_update (
  p_lesson_id integer,
  p_language_id integer,
  p_title varchar,
  p_description varchar,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_lesson_id IS NULL OR p_language_id IS NULL OR p_title IS NULL OR p_description IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE cms.video_lessons_i18n
     SET title 	       	= p_title,
         description    = p_description,
         file_name      = p_file_name,
         file_size      = p_file_size,
         content_type   = p_content_type,
         updated_by     = v_user_id,
         updated_on     = sys.f_current_timestamp()
   WHERE lesson_id = p_lesson_id
  	 AND language_id = p_language_id;
    
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
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
