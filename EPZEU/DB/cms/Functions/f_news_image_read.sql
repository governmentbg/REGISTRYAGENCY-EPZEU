CREATE OR REPLACE FUNCTION cms.f_news_image_read (
  p_news_id integer,
  out p_image bytea
)
RETURNS bytea AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_news_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT t.image
    INTO p_image
    FROM cms.news t
   WHERE t.news_id = p_news_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
