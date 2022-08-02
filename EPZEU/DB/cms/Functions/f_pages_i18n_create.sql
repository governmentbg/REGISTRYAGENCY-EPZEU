CREATE OR REPLACE FUNCTION cms.f_pages_i18n_create (
  p_page_id integer,
  p_language_id integer,
  p_title varchar,
  p_content text
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_page_id IS NULL OR p_language_id IS NULL OR p_title IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO cms.pages_i18n(
    page_id,
    language_id,
    title,
    content,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_page_id,
    p_language_id,
    p_title,
    p_content,
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
