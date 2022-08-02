CREATE OR REPLACE FUNCTION cms.f_pages_public_search (
  p_search_criteria varchar,
  p_type integer
)
RETURNS TABLE (
  page_id integer,
  language_id integer,
  register_id smallint,
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
    SELECT t.page_id, t.language_id, t.register_id, t.title
    FROM (
      SELECT p.page_id,  98 as language_id, p.register_id, p.title 
      FROM cms.pages p
      WHERE p.parent_id IS NOT NULL -- не е страница
        AND p.is_group = false -- не е група
        AND p.type = p_type
        AND to_tsvector(v_search_config::regconfig, coalesce(p.title,'') ||' '||coalesce(p.content,'')) @@ v_search_tsquery
      UNION ALL
      SELECT p.page_id, i18n.language_id,  p.register_id, i18n.title
      FROM cms.pages_i18n i18n, cms.pages p, nom.d_languages l
      WHERE i18n.page_id = p.page_id
        AND i18n.language_id = l.language_id
        AND l.is_active = true                -- търси се само в активните езици
        AND p.parent_id IS NOT NULL -- не е страница
        AND p.is_group = false -- не е група
        AND p.type = p_type
        AND to_tsvector(v_search_config::regconfig, coalesce(i18n.title,'') ||' '||coalesce(i18n.content,'')) @@ v_search_tsquery
    ) t;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100 ROWS 1000;
