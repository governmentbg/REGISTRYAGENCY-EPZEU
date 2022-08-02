CREATE OR REPLACE FUNCTION nom.f_d_iisda_services_search (
  p_language_id integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_last_updated_on timestamptz,
  out p_ref_services refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF  p_start_index  IS NULL AND
      p_page_size  IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  	/* WORK IN PROCESS ...
    */
  	IF (p_calculate_count = TRUE)
    THEN
        
      SELECT COUNT(*)
        INTO p_count
        FROM nom.d_iisda_services s;
          
    END IF;
    
    SELECT last_updated_on INTO p_last_updated_on
    FROM nom.nomenclature_changes
    WHERE tablename = 'd_iisda_services';

    OPEN p_ref_services FOR
    SELECT 
    	s.iisda_service_id,
        s.service_number,
        s.name,
        s.short_description,
        s.description,
        s.read_date,
        s.is_discontinued,
        s.has_epayment
      FROM nom.d_iisda_services s
     LIMIT p_page_size
    OFFSET p_start_index - 1;     
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;