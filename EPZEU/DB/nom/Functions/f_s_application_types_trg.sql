CREATE OR REPLACE FUNCTION nom.f_s_application_types_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('s_application_types');
	PERFORM sys.f_notify_cache_invalidation('nom.s_application_types');
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

ALTER FUNCTION nom.f_s_application_types_trg ()
  OWNER TO epzeu_dev;