CREATE OR REPLACE FUNCTION cms.f_pages_trg (
)
RETURNS trigger AS
$body$
BEGIN
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
