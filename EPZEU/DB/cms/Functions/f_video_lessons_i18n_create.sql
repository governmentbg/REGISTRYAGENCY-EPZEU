CREATE OR REPLACE FUNCTION cms.f_video_lessons_i18n_create (
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
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_lesson_id IS NULL OR p_language_id IS NULL OR p_title IS NULL OR p_description IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO cms.video_lessons_i18n(
    lesson_id,
    language_id,
    title,
    description,
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
    p_lesson_id,
    p_language_id,
    p_title,
    p_description,
    p_file_name,
    p_file_size,
    p_content_type,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
