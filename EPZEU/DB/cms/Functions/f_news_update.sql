CREATE OR REPLACE FUNCTION cms.f_news_update (
  p_news_id integer,
  p_register_id integer,
  p_title varchar,
  p_short_description varchar,
  p_description text,
  p_news_date timestamptz,
  p_expiration_date timestamptz,
  p_is_hot_news boolean
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_news_id IS NULL OR p_register_id IS NULL OR p_title IS NULL OR p_description IS NULL OR
     p_news_date IS NULL OR p_is_hot_news IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- пром€на на запис за новина
  UPDATE cms.news
  SET register_id       = p_register_id, 
      title             = p_title,
      short_description = p_short_description,
      description       = p_description,
      news_date         = p_news_date,
      expiration_date   = p_expiration_date,
      is_hot_news       = p_is_hot_news,
      updated_by        = v_user_id,
      updated_on        = sys.f_current_timestamp()
  WHERE news_id = p_news_id;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
