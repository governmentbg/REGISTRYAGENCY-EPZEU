CREATE OR REPLACE FUNCTION cms.f_html_pages_update (
  p_page_id integer,
  p_module_id integer,
  p_title varchar,
  p_content text
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_page_id IS NULL OR p_title IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- промяна на запис за съобщение
  UPDATE cms.html_pages
  SET module_id       = p_module_id,
      title           = p_title,
      content         = p_content,
     updated_by      = v_user_id,
      updated_on      = sys.f_current_timestamp()
  WHERE page_id = p_page_id;
 
 GET DIAGNOSTICS v_count = ROW_COUNT;

 -- Проверка дали е редактиван точно един запис
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
