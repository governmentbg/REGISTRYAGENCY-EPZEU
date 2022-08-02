CREATE OR REPLACE FUNCTION cms.f_pages_content_read (
  p_page_id integer,
  out p_content bytea
)
RETURNS bytea AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_page_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT p.file_content
    INTO p_content
    FROM cms.pages p
   WHERE p.page_id = p_page_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
