CREATE OR REPLACE FUNCTION cms.f_news_documents_content_read (
  p_doc_id integer,
  out p_content bytea
)
RETURNS bytea AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_doc_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT t.content
  INTO p_content
  FROM cms.news_documents t
  WHERE t.doc_id = p_doc_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
