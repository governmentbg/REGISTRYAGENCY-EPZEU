CREATE OR REPLACE FUNCTION usr.f_user_access_request_docs_search (
  p_doc_ids integer [],
  p_request_ids integer [],
  out p_access_request_docs refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  ( p_doc_ids IS NULL AND p_request_ids IS NULL) OR ( p_doc_ids IS NOT NULL AND p_request_ids IS NOT NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  IF p_doc_ids IS NOT NULL
  THEN
    OPEN p_access_request_docs FOR
    SELECT doc_id,
           request_id,
           name,
           file_size, 
           content_type,
           updated_by,
           updated_on  
      FROM usr.user_access_request_docs t
      WHERE t.doc_id = ANY (p_doc_ids); 
      
  ELSE -- p_doc_ids IS NULL AND p_request_id IS NOT NULL
    OPEN p_access_request_docs FOR
    SELECT doc_id,
           request_id,
           name,
           file_size, 
           content_type,
           updated_by,
           updated_on  
      FROM usr.user_access_request_docs t
      WHERE t.request_id = ANY (p_request_ids);       
  END IF;
      
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_access_request_docs_search(p_doc_ids integer [], p_request_ids integer [], out p_access_request_docs refcursor)
IS 'Функция за търсене на запис(и) за документ(и) за специален достъп. Функцията не връща съдържанието на документа';
