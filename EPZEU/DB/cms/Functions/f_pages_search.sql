CREATE OR REPLACE FUNCTION cms.f_pages_search (
  p_pages_ids integer [],
  p_parent_id integer,
  p_type integer,
  p_register_id integer,
  p_lang_id integer,
  p_load_content boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  out p_last_updated_on timestamptz,
  out p_ref_pages refcursor
)
RETURNS record AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
/*
  IF ( p_pages_ids   IS NULL AND 
       p_parent_id   IS NULL AND 
       p_type        IS NULL AND
       p_register_id IS NULL
       ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
*/    
 
 SELECT MAX(last_updated_on) INTO p_last_updated_on
 FROM nom.nomenclature_changes
 WHERE tablename = 'pages' OR tablename = 'pages_i18n' 
 	OR tablename = 'd_services' OR tablename = 'd_services_i18n'
    OR tablename = 'nom.s_application_types' OR tablename = 'nom.s_application_types_i18n';

 OPEN p_ref_pages FOR
    SELECT  page_id,
            is_translated,
            register_id,
            (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n( title_i18n, title) ELSE title END)  AS title,
            (CASE WHEN (p_load_separate_value_i18n ) THEN title_i18n ELSE NULL END) as title_i18n,      
            content,
            content_i18n,
            type,
            service_id,
            (CASE WHEN service_id IS NOT NULL THEN title ELSE NULL END) AS service_name,
            application_id, 
            app_code,
            (CASE WHEN application_id IS NOT NULL THEN title ELSE NULL END) AS application_name,
            url,
            parent_id,
            order_num,
            is_group,
            element_count,
            file_name,
            content_type,
            file_size,
            created_by,
            created_on,
            updated_by,
            updated_on 
      FROM (SELECT p.page_id,
                  (CASE WHEN p_i18n.page_id IS NULL THEN 0 ELSE 1 END) as is_translated,   
                   p.register_id,
                   (CASE WHEN (p_load_content) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(p_i18n.content, p.content) ELSE p.content END) END) as content,
                   (CASE WHEN (p_load_content AND p_load_separate_value_i18n ) THEN p_i18n.content END) as content_i18n,            
                   p.type,
                   p.service_id,
                   p.application_id,
                   (CASE WHEN p.application_id IS NOT NULL THEN (select a.app_code from nom.s_application_types a where a.id = p.application_id) ELSE NULL END) AS app_code,
                   (CASE WHEN p.application_id IS NOT NULL THEN (select a.url from nom.s_application_types a where a.id = p.application_id) ELSE NULL END) AS  url,
                   (CASE WHEN  p.service_id IS NOT NULL 
                         THEN nom.f_d_service_name_get(p.service_id)
                         WHEN p.application_id IS NOT NULL
                         THEN (SELECT a.name FROM nom.s_application_types a WHERE a.id = p.application_id)
                         ELSE p.title
                    END ) AS title,
                   (CASE WHEN  p.service_id IS NOT NULL 
                         THEN (SELECT d_i18n.name
                               FROM nom.d_services_i18n d_i18n 
                               WHERE d_i18n.service_id = p.service_id
                                 AND d_i18n.language_id = p_lang_id ) 
                         WHEN p.application_id IS NOT NULL
                         THEN (SELECT a_i18n.name
                               FROM nom.s_application_types_i18n a_i18n 
                               WHERE a_i18n.id = p.application_id
                                 AND a_i18n.language_id = p_lang_id ) 
                         ELSE p_i18n.title
                    END ) AS title_i18n,
                   p.parent_id,
                   p.order_num,
                   p.is_group,
                   (select count(1) from cms.pages t where t.parent_id = p.page_id and t.is_group = FALSE) element_count,
                   p.file_name,
                   p.content_type,
                   p.file_size,
                   p.created_by,
                   p.created_on,
                   p.updated_by,
                   p.updated_on
              FROM cms.pages p
         LEFT JOIN cms.pages_i18n p_i18n ON (p.page_id = p_i18n.page_id AND p_i18n.language_id = p_lang_id)
             WHERE (p_pages_ids IS NULL OR p.page_id = ANY (p_pages_ids))
               AND (p_parent_id IS NULL OR p.parent_id = p_parent_id OR (p_parent_id = 0 AND p.parent_id IS NULL) )
               AND (p_type IS NULL OR p.type = p_type)
               AND (p_register_id IS NULL OR p.register_id = p_register_id)
               AND (COALESCE(p_load_only_untranslated ,FALSE) = FALSE OR
                    (p_load_only_untranslated = TRUE AND NOT exists (SELECT 1 
                                                               FROM cms.pages_i18n pl
                                                              WHERE pl.page_id = p.page_id
                                                                AND pl.language_id = p_lang_id))) 
       ) T
       ORDER BY type, parent_id, order_num;  
              
   
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
