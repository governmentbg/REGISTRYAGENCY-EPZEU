CREATE OR REPLACE FUNCTION cms.f_pages_i18n_trg (
)
RETURNS trigger AS
$body$
BEGIN
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
