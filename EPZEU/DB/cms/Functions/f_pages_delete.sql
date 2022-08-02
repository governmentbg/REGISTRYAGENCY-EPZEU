CREATE OR REPLACE FUNCTION cms.f_pages_delete (
  p_page_id integer
)
RETURNS void AS
$body$
DECLARE
   v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_page_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- изтриване на преводите за страница
  PERFORM cms.f_pages_i18n_delete(p_page_id);
  
  -- изтриване на страница
  DELETE 
    FROM cms.pages p
   WHERE p.page_id = p_page_id
     AND p.parent_id IS NOT NULL;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;


  -- Проверка дали е изтрит точно един запис
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
