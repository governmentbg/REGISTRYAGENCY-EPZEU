CREATE OR REPLACE FUNCTION cms.f_themes_comments_create (
  p_theme_id integer,
  p_comment text,
  out p_theme_comment_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id  INTEGER;
  v_count    INTEGER;
  v_is_first BOOLEAN := TRUE;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_theme_id IS NULL OR p_comment IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  IF cms.f_forbidden_word_scan(p_comment) THEN
     PERFORM sys.f_raise_excp(10); 
  END IF;
  
  SELECT count(*) 
    INTO v_count
    FROM cms.themes_comments tc
   WHERE tc.theme_id = p_theme_id ; 
    
  -- Проверка дали е вече съществува вече коментар по дадената тема
  IF v_count > 0
  THEN
    v_is_first := FALSE;
  END IF;
 
  -- създаване на запис
  INSERT INTO cms.themes_comments( 
    theme_id,
    comment,
    status,
    is_first,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_theme_id,
    p_comment,
    1,
    v_is_first,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING theme_comment_id
    INTO p_theme_comment_id;
  
  
  UPDATE cms.themes
     SET last_comment_date = sys.f_current_timestamp()
   WHERE theme_id = p_theme_id;
   
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
