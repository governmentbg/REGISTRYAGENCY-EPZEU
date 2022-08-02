CREATE OR REPLACE FUNCTION cms.f_html_pages_search (
  p_page_ids integer [],
  p_type integer,
  p_status integer,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_lang_id integer,
  p_load_content boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_html_pages refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

 -- Проверка за невалидни входящи параметри
  IF  p_page_ids IS NULL AND 
      p_type  IS NULL AND
      p_status IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL      
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  
  
  IF (p_page_ids is not null ) then
   
     IF (p_calculate_count = TRUE)
      THEN
        
        SELECT COUNT(*)
          INTO p_count
          FROM cms.html_pages p
         WHERE p.page_id = ANY (p_page_ids);
          
      END IF;

      OPEN p_ref_html_pages FOR
      SELECT p.page_id,
             (CASE WHEN p_i18n.page_id IS NULL THEN 0 ELSE 1 END) as is_translated,   
             p.module_id,
             (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n( p_i18n.title, p.title) ELSE p.title END) as title,
             (CASE WHEN (p_load_separate_value_i18n ) THEN p_i18n.title END) as title_i18n,          
             (CASE WHEN (p_load_content) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE ) THEN sys.f_search_coalesce_i18n(p_i18n.content, p.content) ELSE p.content END) END) as content,
             (CASE WHEN (p_load_content AND p_load_separate_value_i18n ) THEN p_i18n.content END) as content_i18n,
             p.type,
             p.status,
             p.url,
             p.created_by,
             p.created_on,
             p.updated_by,
             p.updated_on
        FROM cms.html_pages p
   LEFT JOIN cms.html_pages_i18n p_i18n ON (p.page_id = p_i18n.page_id AND p_i18n.language_id = p_lang_id)
       WHERE p.page_id = ANY (p_page_ids)  
         AND (p_status IS NULL OR p.status = p_status)  
         AND (p_load_only_untranslated IS NULL OR
              p_load_only_untranslated = FALSE OR
              (p_load_only_untranslated = TRUE AND NOT exists (SELECT 1 
                                                                 FROM cms.html_pages_i18n pl
                                                                WHERE pl.page_id = p.page_id
                                                                  AND pl.language_id = p_lang_id)))     
    ORDER BY p.module_id, p.title
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
      
    ELSE
                 
        v_stmt := ' SELECT p.page_id,
                           (CASE WHEN p_i18n.page_id IS NULL THEN 0 ELSE 1 END) as is_translated,   
                           p.module_id,
                           (CASE WHEN ($1 = FALSE) THEN sys.f_search_coalesce_i18n( p_i18n.title, p.title) ELSE p.title END) as title,
                           (CASE WHEN ($1) THEN p_i18n.title END) as title_i18n,
                           (CASE WHEN ($2) THEN (CASE WHEN ($1 = FALSE)THEN sys.f_search_coalesce_i18n(p_i18n.content,p.content) ELSE p.content END) END) as content,
                           (CASE WHEN ($2 AND $1 ) THEN p_i18n.content END) as content_i18n,                             
                            p.type,
                            p.status,
                            p.url,
                            p.created_by,
                            p.created_on,
                            p.updated_by,
                            p.updated_on
                       FROM cms.html_pages p
                  LEFT JOIN cms.html_pages_i18n p_i18n ON (p.page_id = p_i18n.page_id AND p_i18n.language_id = $3)
                      WHERE 1 = 1 ';


    IF p_type IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND p.type = $4 ';
    END IF;
    
    IF p_status IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND p.status = $5 ';
    END IF;
    
    IF p_load_only_untranslated = TRUE
    THEN
       v_stmt := v_stmt || ' and not exists (select 1 from cms.html_pages_i18n where page_id = p.page_id and language_id = $3) ';
    END IF;
    
    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      IF (p_max_nor IS NOT NULL)
      THEN
        v_count_stmt := v_count_stmt || '
                                LIMIT $6 + 1';

      END IF;

      v_count_stmt := v_count_stmt || ' ) tc ';
      
      EXECUTE v_count_stmt
         INTO p_count
        USING p_load_separate_value_i18n, p_load_content, p_lang_id, p_type, p_status, p_max_nor;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    v_stmt := v_stmt || ' ORDER BY  p.module_id, p.title LIMIT $6 OFFSET $7 - 1 ';

    OPEN p_ref_html_pages FOR EXECUTE v_stmt
    USING p_load_separate_value_i18n, p_load_content, p_lang_id, p_type, p_status, p_page_size, p_start_index;
 END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
