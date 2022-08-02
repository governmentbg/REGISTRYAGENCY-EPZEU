CREATE OR REPLACE FUNCTION public.f_n_s_module_search (
  p_module_ids integer [],
  out p_ref_modules refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  IF p_module_ids IS NOT NULL
  THEN
    OPEN p_ref_modules FOR
    SELECT 
      module_id,
      name,
      description,
      updated_by,
      updated_on
    FROM public.n_s_modules
    WHERE module_id = ANY( p_module_ids )
    ORDER BY name;

  ELSE
    OPEN p_ref_modules FOR
    SELECT 
      module_id,
      name,
      description,
      updated_by,
      updated_on
    FROM public.n_s_modules
    ORDER BY name;
  
  END IF;      

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
