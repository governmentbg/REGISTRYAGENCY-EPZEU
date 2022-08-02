CREATE OR REPLACE FUNCTION cms.f_bulletin_content_read (
  p_bulletin_id integer,
  out p_content bytea
)
RETURNS bytea AS
$body$
BEGIN
  -- проверка на параметрите
  IF (p_bulletin_id IS NULL)
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;
  
  SELECT b.content
    INTO p_content
    FROM cms.bulletins b
   WHERE b.bulletin_id = p_bulletin_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
