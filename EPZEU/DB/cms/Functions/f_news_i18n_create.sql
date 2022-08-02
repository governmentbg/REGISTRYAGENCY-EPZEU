CREATE OR REPLACE FUNCTION cms.f_news_i18n_create (
  p_news_id integer,
  p_language_id integer,
  p_title varchar,
  p_short_description varchar,
  p_description text
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_news_id IS NULL OR p_language_id IS NULL OR p_title IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO cms.news_i18n(
    news_id,
    language_id,
    title,
    short_description,
    description,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_news_id,
    p_language_id,
    p_title,
    p_short_description,
    p_description,
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
