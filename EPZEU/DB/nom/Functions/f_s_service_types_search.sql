CREATE OR REPLACE FUNCTION nom.f_s_service_types_search (
  p_service_type_ids smallint [],
  out ref_service_types refcursor
)
RETURNS refcursor AS
$body$
BEGIN

IF (p_service_type_ids IS NOT NULL)
THEN
      OPEN ref_service_types FOR
          SELECT s.*
            FROM nom.s_service_types s
           WHERE s.service_type_id = ANY (p_service_type_ids)
        ORDER BY s.service_type_id ;  

  ELSE
   OPEN ref_service_types FOR
          SELECT s.*
            FROM nom.s_service_types s
        ORDER BY s.service_type_id ;  
  
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;