CREATE OR REPLACE FUNCTION cms.f_news_search (
  p_news_ids integer [],
  p_register_id integer,
  p_title varchar,
  p_news_date_from timestamptz,
  p_news_date_to timestamptz,
  p_is_hot_news boolean,
  p_is_active boolean,
  p_status integer,
  p_lang_id integer,
  p_load_short_description boolean,
  p_load_description boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_news refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
    
BEGIN

  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  v_stmt := 'SELECT n.news_id,
                    n.register_id,
                    (CASE WHEN n_i18n.news_id IS NULL THEN 0 ELSE 1 END) as is_translated,
                    (CASE WHEN ($1 = FALSE) THEN sys.f_search_coalesce_i18n(n_i18n.title, n.title) ELSE n.title END) as title,
                    (CASE WHEN ($1 ) THEN n_i18n.title END) as title_i18n,
                    (CASE WHEN ($2) THEN (CASE WHEN ($1 = FALSE) THEN sys.f_search_coalesce_i18n(n_i18n.short_description, n.short_description) ELSE n.short_description END) END) as short_description,
                    (CASE WHEN ($2 AND $1 ) THEN n_i18n.short_description END) as short_description_i18n,
                    (CASE WHEN ($3) THEN (CASE WHEN ($1 = FALSE) THEN sys.f_search_coalesce_i18n(n_i18n.description, n.description) ELSE n.description END) END) as description,
                    (CASE WHEN ($3 AND $1 ) THEN n_i18n.description END) as description_i18n,
                    n.news_date,
                    n.publication_date,
                    n.expiration_date,
                    n.is_hot_news,
                    n.status,
                    n.file_name,
                    n.file_size,    
                    n.content_type,
                    n.updated_by,
                    n.updated_on
               FROM cms.news n  
          LEFT JOIN cms.news_i18n n_i18n ON (n.news_id = n_i18n.news_id AND n_i18n.language_id = $4)
              WHERE 1 = 1 ';
  
  IF p_news_ids IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.news_id = ANY($5) ';
  END IF;

  IF p_register_id IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.register_id = $6 ';
  END IF;
  
  IF p_title IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.title ILIKE concat(''%'',$7, ''%'')';
  END IF;

  IF p_news_date_from IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.news_date >= $8 ';
  END IF;
  
  IF p_news_date_to IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.news_date <= $9 ';
  END IF;
  
  IF p_is_hot_news IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.is_hot_news = $10 ';
  END IF;  
  
    
  IF p_is_active 
  THEN
      v_stmt := v_stmt || ' AND (n.expiration_date > sys.f_current_timestamp() OR n.expiration_date IS NULL) ';
  END IF; 
  
  IF p_status IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND n.status = $11 ';
  END IF;  
  
  IF p_load_only_untranslated = TRUE
    THEN
       v_stmt := v_stmt || ' and not exists (select 1 from cms.news_i18n where news_id = n.news_id and language_id = $4) ';
    END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) t';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_load_separate_value_i18n, p_load_short_description, p_load_description, p_lang_id, p_news_ids, p_register_id, p_title, p_news_date_from, p_news_date_to, p_is_hot_news, p_status;

  END IF;

  v_stmt := v_stmt || ' ORDER BY n.news_date desc, n.register_id, n.title LIMIT $12 OFFSET $13 - 1 ';

  OPEN p_ref_news FOR EXECUTE v_stmt
  USING p_load_separate_value_i18n, p_load_short_description, p_load_description, p_lang_id, p_news_ids, p_register_id, p_title, p_news_date_from, p_news_date_to, p_is_hot_news, p_status, p_page_size, p_start_index;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
