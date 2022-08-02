CREATE OR REPLACE FUNCTION cms.f_pages_top_list (
  p_type integer,
  p_register_id integer,
  p_limit integer,
  p_lang_id integer,
  out p_ref_pages refcursor
)
RETURNS refcursor AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
  IF ( p_type        IS NULL AND
       p_register_id IS NULL
       ) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
    

 OPEN p_ref_pages FOR    
      SELECT g.page_id,
             g.register_id,
             g.type,
             g.service_id,
             g.application_id,
             (select a.app_code from nom.s_application_types a where a.id = g.application_id) app_code,   
             (select a.url from nom.s_application_types a where a.id = g.application_id) url,             
             g.parent_id,
             g.order_num,
             g.is_group,    
             order_num *100 + COALESCE(g.parent_order_num, group_count + 1)  new_order,
             sys.f_search_coalesce_i18n((CASE WHEN  g.service_id IS NOT NULL 
                                              THEN (SELECT d_i18n.name
                                                    FROM nom.d_services_i18n d_i18n 
                                                    WHERE d_i18n.service_id = g.service_id
                                                      AND d_i18n.language_id = p_lang_id ) 
                                              WHEN g.application_id IS NOT NULL
                                              THEN (SELECT a_i18n.name
                                                    FROM nom.s_application_types_i18n a_i18n 
                                                    WHERE a_i18n.id = g.application_id
                                                     AND a_i18n.language_id = p_lang_id ) 
                                              ELSE p_i18n.title
                                        END),             
                                        g.title) AS title
      FROM (SELECT t.*, 
                   (SELECT count(1) FROM cms.pages p WHERE p.parent_id = parent_id_min and p.is_group = true) group_count,
                   (SELECT p.order_num FROM cms.pages p WHERE p.page_id = t.parent_id) parent_order_num
            FROM (SELECT p.page_id,
                         p.register_id,
                         (CASE WHEN  p.service_id IS NOT NULL 
                               THEN nom.f_d_service_name_get(p.service_id)
                               WHEN p.application_id IS NOT NULL
                               THEN (SELECT a.name FROM nom.s_application_types a WHERE a.id = p.application_id)
                               ELSE p.title
                          END ) AS title,
                          p.content,
                          p.type,
                          p.service_id,
                          p.application_id,
                          p.parent_id,
                          p.order_num,
                          p.is_group,   
                          min(parent_id) over () parent_id_min
                  FROM cms.pages p 
                  WHERE p.register_id = p_register_id
                    AND p.type = p_type
                    AND p.parent_id is not null) t)g
      LEFT JOIN cms.pages_i18n p_i18n ON (g.page_id = p_i18n.page_id AND p_i18n.language_id = p_lang_id)
      WHERE g.is_group = FALSE   
      ORDER BY new_order 
      LIMIT p_limit;  
              
   
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
