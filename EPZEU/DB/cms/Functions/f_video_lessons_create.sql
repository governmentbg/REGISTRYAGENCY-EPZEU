CREATE OR REPLACE FUNCTION cms.f_video_lessons_create (
  p_register_id integer,
  p_title varchar,
  p_description varchar,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar,
  out p_lesson_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_register_id IS NULL OR p_title IS NULL OR p_description IS NULL OR
     p_file_name IS NULL OR p_file_size IS NULL OR p_content_type IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис
  INSERT INTO cms.video_lessons(
    register_id,
    title,
    description,
    status,
    file_name,
    file_size,
    content_type,
    content,
    created_by,
    created_on,
    updated_by,
    updated_on 
  )
  VALUES (
    p_register_id,
    p_title,
    p_description,
    0::SMALLINT,
    p_file_name,
    p_file_size,
    p_content_type,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING lesson_id
    INTO p_lesson_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
