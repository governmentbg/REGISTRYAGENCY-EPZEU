CREATE OR REPLACE FUNCTION nom.f_d_services_i18n_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('d_services_i18n');
	PERFORM sys.f_notify_cache_invalidation('nom.d_services_i18n');
    PERFORM nom.f_nomenclature_changes_update('pages_i18n');
	PERFORM sys.f_notify_cache_invalidation('cms.pages_i18n');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION nom.f_d_services_i18n_trg ()
  OWNER TO epzeu_dev;