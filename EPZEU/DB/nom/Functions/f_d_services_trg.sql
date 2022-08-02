CREATE OR REPLACE FUNCTION nom.f_d_services_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('d_services');
	PERFORM sys.f_notify_cache_invalidation('nom.d_services');
	PERFORM nom.f_nomenclature_changes_update('pages');
	PERFORM sys.f_notify_cache_invalidation('cms.pages');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION nom.f_d_services_trg ()
  OWNER TO epzeu_dev;