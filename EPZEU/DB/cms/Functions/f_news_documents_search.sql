CREATE OR REPLACE FUNCTION cms.f_news_documents_search (
  p_doc_ids integer [],
  p_news_ids integer [],
  out p_ref_news_documents refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  ( p_doc_ids IS NULL AND p_news_ids IS NULL) OR ( p_doc_ids IS NOT NULL AND p_news_ids IS NOT NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  IF p_doc_ids IS NOT NULL
  THEN
    OPEN p_ref_news_documents FOR
    SELECT doc_id,
           news_id,
           file_name,
           file_size, 
           content_type,
           updated_by,
           updated_on  
      FROM cms.news_documents t
      WHERE t.doc_id = ANY (p_doc_ids); 
      
  ELSE -- p_doc_ids IS NULL AND p_news_ids IS NOT NULL
    OPEN p_ref_news_documents FOR
    SELECT doc_id,
           news_id,
           file_name,
           file_size, 
           content_type,
           updated_by,
           updated_on  
      FROM cms.news_documents t
      WHERE t.news_id = ANY (p_news_ids);       
  END IF;
      
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
