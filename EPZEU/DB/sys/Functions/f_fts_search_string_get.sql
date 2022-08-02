CREATE OR REPLACE FUNCTION sys.f_fts_search_string_get (
  p_search_criteria varchar
)
RETURNS varchar AS
$body$
DECLARE
  v_search_criteria VARCHAR(1000);
BEGIN
  v_search_criteria := COALESCE( phraseto_tsquery('simple', p_search_criteria)::text, '');
  IF v_search_criteria != ''
  THEN
    v_search_criteria := REPLACE(v_search_criteria, ''' ', ''':* ')||':* ';
  END IF;
  
  RETURN v_search_criteria; 
   
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;