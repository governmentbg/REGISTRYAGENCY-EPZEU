CREATE OR REPLACE FUNCTION sys.f_replace_like_str (
  v_str varchar
)
RETURNS varchar AS
$body$
DECLARE
 
BEGIN
  return  REPLACE(REPLACE(v_str, '_', '\_'), '%', '\%');

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
