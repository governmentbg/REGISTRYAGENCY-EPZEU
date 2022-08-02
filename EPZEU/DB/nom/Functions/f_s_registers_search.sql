CREATE OR REPLACE FUNCTION nom.f_s_registers_search (
  p_registers_ids smallint [],
  out ref_registers refcursor
)
RETURNS refcursor AS
$body$
DECLARE

BEGIN

IF (p_registers_ids IS NOT NULL)
THEN
      OPEN ref_registers FOR
          SELECT r.*
            FROM nom.s_registers r
           WHERE r.register_id = ANY (p_registers_ids)
        ORDER BY r.register_id ;  

  ELSE
   OPEN ref_registers FOR
          SELECT r.*
            FROM nom.s_registers r
        ORDER BY r.register_id ;  
  
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
