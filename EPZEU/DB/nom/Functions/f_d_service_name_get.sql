CREATE OR REPLACE FUNCTION nom.f_d_service_name_get (
  p_service_id integer
)
RETURNS varchar AS
$body$
DECLARE
  v_name   VARCHAR;
BEGIN
 
  
  SELECT COALESCE(s.name, 
                 (SELECT i.name 
                    FROM nom.d_iisda_services i 
                   WHERE i.iisda_service_id = s.iisda_service_id)) 
    INTO v_name                  
    FROM nom.d_services s 
  WHERE s.service_id = p_service_id;
  
  RETURN v_name;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
