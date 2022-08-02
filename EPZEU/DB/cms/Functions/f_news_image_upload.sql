CREATE OR REPLACE FUNCTION cms.f_news_image_upload (
  p_news_id integer,
  p_image bytea,
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
  IF p_news_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
    -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- пром€на на запис за новина
  UPDATE cms.news
  SET image        = p_image,
      file_name    = p_file_name,
      file_size    = p_file_size,
      content_type = p_content_type,
      updated_by   = v_user_id,
      updated_on   = sys.f_current_timestamp()
  WHERE news_id = p_news_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
