CREATE OR REPLACE FUNCTION cms.f_forbidden_words_delete (
  p_word_id integer
)
RETURNS void AS
$body$
DECLARE
  v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_word_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- изтрива
  DELETE
    FROM cms.forbidden_words w
   WHERE w.word_id	 = p_word_id;

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
