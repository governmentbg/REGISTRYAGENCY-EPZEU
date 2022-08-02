CREATE OR REPLACE FUNCTION nom.f_d_iisda_services_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('d_iisda_services');
	PERFORM sys.f_notify_cache_invalidation('nom.d_iisda_services');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
