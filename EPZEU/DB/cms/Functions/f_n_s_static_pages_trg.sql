BEGIN
	PERFORM nom.f_nomenclature_changes_update('n_s_static_pages');
	PERFORM sys.f_notify_cache_invalidation('cms.n_s_static_pages');
	RETURN NULL;    
END;