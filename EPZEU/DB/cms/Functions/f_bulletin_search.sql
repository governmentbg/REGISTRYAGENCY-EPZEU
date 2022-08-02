CREATE OR REPLACE FUNCTION cms.f_bulletin_search (
  p_bulletin_ids integer [],
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_bulletins refcursor
)
RETURNS record AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


  IF (p_calculate_count = TRUE)
   THEN
         
     SELECT COUNT(*)
       INTO p_count
      FROM cms.bulletins b
     WHERE (p_bulletin_ids IS NULL OR b.bulletin_id = ANY(p_bulletin_ids))
       AND (p_status IS NULL OR b.status = p_status);
          
  END IF;

  OPEN p_ref_bulletins FOR
    SELECT b.bulletin_id,
           b.date_from,
           b.date_to,
           b.status,
           b.file_name,
           b.file_size,
           b.content_type,
           b.created_by,
           b.created_on,
           b.updated_by,
           b.updated_on
      FROM cms.bulletins b
     WHERE (p_bulletin_ids IS NULL OR b.bulletin_id = ANY(p_bulletin_ids))
       AND ( p_status IS NULL OR b.status = p_status)
  ORDER BY b.date_from desc
     LIMIT p_page_size
    OFFSET p_start_index - 1;  
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
