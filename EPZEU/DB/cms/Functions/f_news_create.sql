CREATE OR REPLACE FUNCTION cms.f_news_create (
  p_register_id integer,
  p_title varchar,
  p_short_description varchar,
  p_description text,
  p_news_date timestamptz,
  p_expiration_date timestamptz,
  p_is_hot_news boolean,
  out p_news_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_register_id IS NULL OR p_title IS NULL OR p_description IS NULL OR
     p_news_date IS NULL OR p_is_hot_news IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис за новина
  INSERT INTO cms.news
  (
    register_id,
    image,
    title,
    short_description,
    description,
    news_date,
    publication_date,
    expiration_date,
    is_hot_news,
    status,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_register_id,
    NULL,
    p_title,
    p_short_description,
    p_description,
    p_news_date,
    NULL,               -- новината се създава като непубликувана
    p_expiration_date,
    p_is_hot_news,
    0,                  -- непубликувана
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING news_id INTO p_news_id;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
