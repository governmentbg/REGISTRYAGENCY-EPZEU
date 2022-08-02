CREATE OR REPLACE FUNCTION cms.f_forbidden_word_scan (
  p_text text,
  out p_forbidden_word_exist boolean
)
RETURNS boolean AS
$body$
DECLARE
   v_text  TEXT;
   v_count INTEGER;
BEGIN
   -- ѕремахване на препинателни знаци
    v_text := regexp_replace(regexp_replace(p_text, '\.|\,|\!|\?|\-|\/|\(|\)|\\|\@|\#|'||chr(10), ' '),
                             '( ){2,}',
                             ' ');
    -- ѕроверка за наличие на забранени думи
    SELECT COUNT(*)
      INTO v_count
      FROM cms.forbidden_words
     WHERE POSITION(' ' || lower(word) || ' ' in ' ' || lower(v_text) || ' ') > 0;
     
    IF v_count > 0 then 
       p_forbidden_word_exist := TRUE;
    ELSE 
       p_forbidden_word_exist := FALSE;
    END IF;    
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
