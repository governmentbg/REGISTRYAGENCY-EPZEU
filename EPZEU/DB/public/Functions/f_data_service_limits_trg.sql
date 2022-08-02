CREATE OR REPLACE FUNCTION public.f_data_service_limits_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('data_service_limits');
	PERFORM sys.f_notify_cache_invalidation('public.data_service_limits');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;