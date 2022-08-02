CREATE OR REPLACE FUNCTION cms.f_html_pages_create (
  p_module_id integer,
  p_title varchar,
  p_content text,
  out p_page_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_module_id IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  p_page_id := nextval('cms.seq_html_pages');
  
  -- създаване на запис за съобщение
  INSERT INTO cms.html_pages
  (   page_id,
      module_id,
      title,
      content,
      type,
      status,
      url,
      created_by,
      created_on,
      updated_by,
      updated_on 
  )
  VALUES (
    p_page_id,
    p_module_id,
    p_title,
    p_content,
    1,
    1,
    concat( 'page/', p_page_id),
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
