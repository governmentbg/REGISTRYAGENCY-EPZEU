CREATE OR REPLACE FUNCTION cms.f_forbidden_words_create (
  p_word varchar,
  out p_word_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
  
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_word IS NULL  	
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  SELECT COUNT(1)
    INTO v_count
    FROM cms.forbidden_words w
   WHERE w.word =  lower(p_word); 
    
  -- Проверка дали е вече съществува такава забранена дума
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(7);
  END IF;
  
  
  -- създаване на запис
  INSERT INTO cms.forbidden_words( 
    word,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    lower(p_word),
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING word_id
    INTO p_word_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
