CREATE OR REPLACE FUNCTION cms.f_themes_create (
  p_tittle text,
  out p_theme_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_tittle IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  IF cms.f_forbidden_word_scan(p_tittle) THEN
     PERFORM sys.f_raise_excp(9); 
  END IF; 
    
  -- създаване на запис
  INSERT INTO cms.themes( 
    title,
    status,
    last_comment_date,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_tittle,
    1,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING theme_id
    INTO p_theme_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
