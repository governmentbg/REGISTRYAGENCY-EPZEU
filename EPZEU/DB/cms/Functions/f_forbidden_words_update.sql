CREATE OR REPLACE FUNCTION cms.f_forbidden_words_update (
  p_word_id integer,
  p_word varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_word_id IS NULL OR p_word IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  SELECT COUNT(1)
    INTO v_count
    FROM cms.forbidden_words w
   WHERE w.word =  lower(p_word)
     AND w.word_id != p_word_id; 
    
  -- Проверка дали е вече съществува такава забранена дума
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(7);
  END IF;
  
  -- update-ва
  UPDATE cms.forbidden_words w
  SET 
    word          = lower(p_word),
    updated_by    = v_user_id,
    updated_on    = sys.f_current_timestamp()
  WHERE w.word_id  = p_word_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- Проверка дали е редактиран точно един запис
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
