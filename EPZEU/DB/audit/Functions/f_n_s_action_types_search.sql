CREATE OR REPLACE FUNCTION audit.f_n_s_action_types_search (
  p_action_type_ids integer [],
  out p_ref_action_types refcursor
)
RETURNS refcursor AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
  /*IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  */

  OPEN p_ref_action_types FOR
    SELECT t.action_type_id,
           t.name,
           t.description,
           t.created_by,
           t.created_on,
           t.updated_by,
           t.updated_on
      FROM audit.n_s_action_types t
     WHERE (p_action_type_ids IS NULL OR t.action_type_id = ANY(p_action_type_ids));  
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
