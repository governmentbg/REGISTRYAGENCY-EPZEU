CREATE OR REPLACE FUNCTION nom.f_d_labels_trg (
)
RETURNS trigger AS
$body$
BEGIN
	PERFORM nom.f_nomenclature_changes_update('d_labels');
	PERFORM sys.f_notify_cache_invalidation('nom.d_labels');
	RETURN NULL;    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
