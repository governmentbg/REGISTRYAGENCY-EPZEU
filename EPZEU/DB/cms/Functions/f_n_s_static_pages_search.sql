CREATE OR REPLACE FUNCTION cms.f_n_s_static_pages_search (
  p_module_id integer,
  out p_last_updated_on timestamptz,
  out p_ref_pages refcursor
)
RETURNS record AS
$body$
BEGIN
    SELECT last_updated_on INTO p_last_updated_on
    FROM nom.nomenclature_changes
    WHERE tablename = 'n_s_static_pages';
  
  OPEN p_ref_pages FOR
  	SELECT s.page_key, s.module_id, s.label_key, s.url
    FROM cms.n_s_static_pages s
    WHERE p_module_id IS NULL OR s.module_id = p_module_id;
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;