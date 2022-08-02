CREATE OR REPLACE FUNCTION public.f_n_s_functionalities_search (
  p_functionality_ids smallint [],
  p_module_id smallint,
  out p_ref_functionalities refcursor
)
RETURNS refcursor AS
$body$
DECLARE

BEGIN
  
  /*
  -- проверка на параметрите
  IF ( p_functionality_ids IS NULL AND p_module_id IS NOT NULL ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  */

  OPEN p_ref_functionalities FOR
    SELECT f.functionality_id,
           f.module_id,
           f.name,
           f.description,
           f.created_by,
           f.created_on,
           f.updated_by,
           f.updated_on
      FROM public.n_s_functionalities f
     WHERE (p_functionality_ids IS NULL OR f.functionality_id = ANY(p_functionality_ids) )
       AND (p_module_id IS NULL OR f.module_id = p_module_id)
  ORDER BY f.name;
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
