CREATE OR REPLACE FUNCTION cms.f_forbidden_words_search (
  p_word_ids integer [],
  p_word varchar,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_forbidden_words refcursor
)
RETURNS record AS
$body$
DECLARE

BEGIN
  
-- проверка на параметрите
IF ( p_word_ids IS NULL AND 
     p_word IS NULL AND
     p_start_index IS NULL AND
     p_page_size IS NULL) 
THEN
  PERFORM sys.f_raise_excp_invalid_params();
END IF;


  IF (p_calculate_count = TRUE)
   THEN
         
     SELECT COUNT(*)
     INTO p_count
    FROM cms.forbidden_words w
   WHERE (p_word_ids IS NULL OR w.word_id = ANY(p_word_ids) )
     AND (p_word IS NULL OR w.word LIKE concat(lower(p_word), '%') );
          
  END IF;
  
  OPEN p_ref_forbidden_words FOR
    SELECT w.word_id,
           w.word,
           w.created_by,
           w.created_on,
           w.updated_by,
           w.updated_on
      FROM cms.forbidden_words w
     WHERE (p_word_ids IS NULL OR w.word_id = ANY(p_word_ids) )
       AND (p_word IS NULL OR w.word LIKE concat(lower(p_word), '%') )
  ORDER BY w.word
  LIMIT p_page_size
  OFFSET p_start_index - 1;  
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
