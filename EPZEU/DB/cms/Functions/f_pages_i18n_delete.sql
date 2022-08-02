CREATE OR REPLACE FUNCTION cms.f_pages_i18n_delete (
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
  
  -- изтриване на превод на страница
  DELETE 
    FROM cms.pages_i18n p
   WHERE p.page_id = p_page_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
