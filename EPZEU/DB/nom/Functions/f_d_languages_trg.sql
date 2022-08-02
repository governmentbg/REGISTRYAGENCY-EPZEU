CREATE OR REPLACE FUNCTION nom.f_d_languages_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('d_languages');
	PERFORM sys.f_notify_cache_invalidation('nom.d_languages');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
