CREATE OR REPLACE FUNCTION cms.f_pages_parents_public_search (
  p_search_criteria varchar
)
RETURNS TABLE (
  page_id integer,
  language_id integer,
  register_id smallint,
  type integer,
  title varchar
) AS
$body$
DECLARE
  v_search_config  VARCHAR(20);
  v_search_tsquery tsquery;

BEGIN
    v_search_config  := sys.f_fts_search_config();
    v_search_tsquery := sys.f_fts_search_string_to_tsquery(p_search_criteria);
    
    RETURN QUERY
    SELECT t.page_id, t.language_id, t.register_id, t.type, t.title
    FROM (
      WITH 
      pages_root_bg AS (
        SELECT COALESCE(p.parent_id, p.page_id) AS page_id
        FROM cms.pages p
        WHERE ( p.parent_id IS NULL OR p.is_group = true ) -- cтраница или група
          AND to_tsvector(v_search_config::regconfig, coalesce(p.title,'') ||' '||coalesce(p.content,'')) @@ v_search_tsquery
        GROUP BY COALESCE(p.parent_id, p.page_id)
      ),
      pages_root_i18n AS (
        SELECT COALESCE(p.parent_id, p.page_id) AS page_id, i18n.language_id, p.register_id, p.type
        FROM cms.pages_i18n i18n, cms.pages p, nom.d_languages l
        WHERE i18n.page_id = p.page_id
          AND i18n.language_id = l.language_id
          AND l.is_active = true                -- търси се само в активните езици
          AND ( p.parent_id IS NULL OR p.is_group = true ) -- cтраница или група
          AND to_tsvector(v_search_config::regconfig, coalesce(i18n.title,'') ||' '||coalesce(i18n.content,'')) @@ v_search_tsquery
        GROUP BY COALESCE(p.parent_id, p.page_id), p.register_id, i18n.language_id, p.type
      )
      SELECT p.page_id,  98 as language_id, p.register_id, p.type, p.title 
      FROM cms.pages p, pages_root_bg rbg
      WHERE p.page_id = rbg.page_id
      UNION ALL
      SELECT ri18n.page_id,  ri18n.language_id as language_id, ri18n.register_id, ri18n.type, sys.f_search_coalesce_i18n(i18n.title, p.title) 
      FROM cms.pages p
      JOIN pages_root_i18n ri18n ON p.page_id = ri18n.page_id --AND i18n.language_id = ri18n.language_id
      LEFT JOIN cms.pages_i18n i18n ON i18n.page_id = ri18n.page_id AND i18n.language_id = ri18n.language_id        
    ) t;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100 ROWS 1000;
