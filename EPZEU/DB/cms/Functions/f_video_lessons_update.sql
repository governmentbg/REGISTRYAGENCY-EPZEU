CREATE OR REPLACE FUNCTION cms.f_video_lessons_update (
  p_lesson_id integer,
  p_register_id integer,
  p_title varchar,
  p_description text,
  p_status smallint,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_lesson_id IS NULL OR 
     p_register_id IS NULL OR
     p_title IS NULL OR 
     p_description IS NULL OR
     p_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE cms.video_lessons l
  SET 
    register_id   = p_register_id,
    title         = p_title,
    description   = p_description,
    status        = p_status,
    file_name     = p_file_name,
    file_size     = p_file_size,
    content_type  = p_content_type,
    updated_by    = v_user_id,
    updated_on    = sys.f_current_timestamp()
  WHERE l.lesson_id  = p_lesson_id;

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
