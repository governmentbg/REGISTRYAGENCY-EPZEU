CREATE OR REPLACE FUNCTION nom.f_nomenclature_changes_update (
  p_tablename varchar,
  p_last_updated_on timestamptz = NULL::timestamp with time zone
)
RETURNS void AS
$body$
DECLARE 
  v_last_updated_on timestamp with time zone;
  v_affected_rows integer;
BEGIN
  IF (p_last_updated_on IS NOT NULL)
  THEN
  	v_last_updated_on = p_last_updated_on;
  ELSE 
  	v_last_updated_on = sys.f_current_timestamp();
  END IF;
  
  UPDATE nom.nomenclature_changes
    SET
    	last_updated_on = v_last_updated_on
   	WHERE 
    	tablename = p_tablename;
  
  GET DIAGNOSTICS v_affected_rows = ROW_COUNT;
  IF (v_affected_rows = 0)
  THEN
  		INSERT INTO nom.nomenclature_changes
  		VALUES (p_tablename, v_last_updated_on);
  END IF;
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;