CREATE OR REPLACE FUNCTION usr.f_user_access_request_docs_content_read (
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
  FROM usr.user_access_request_docs t
  WHERE t.doc_id = p_doc_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_access_request_docs_content_read(p_doc_id integer, out p_content bytea)
IS 'Функция за извличане на съдържание на документ за специален достъп';
