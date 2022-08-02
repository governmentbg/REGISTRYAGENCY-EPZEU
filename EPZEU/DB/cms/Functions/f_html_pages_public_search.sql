CREATE OR REPLACE FUNCTION cms.f_html_pages_public_search (
  p_search_criteria varchar
)
RETURNS TABLE (
  page_id integer,
  language_id integer,
  module_id integer,
  title varchar,
  url text
) AS
$body$
DECLARE
  v_search_config  VARCHAR(20);
  v_search_tsquery tsquery;

BEGIN
    v_search_config  := sys.f_fts_search_config();
    v_search_tsquery := sys.f_fts_search_string_to_tsquery(p_search_criteria);
    
    RETURN QUERY
    SELECT t.page_id, t.language_id, t.module_id, t.title, t.url
    FROM (
      SELECT p.page_id, 98 as language_id, p.module_id, p.title, p.url
      FROM cms.html_pages p
      WHERE p.status = 1 -- публикувана
        AND to_tsvector(v_search_config::regconfig, coalesce(p.title,'') ||' '||coalesce(p.content,'')) @@ v_search_tsquery
      UNION ALL
      SELECT p.page_id, i18n.language_id, p.module_id, i18n.title, p.url
      FROM cms.html_pages_i18n i18n, cms.html_pages p, nom.d_languages l
      WHERE i18n.page_id = p.page_id
        AND i18n.language_id = l.language_id
        AND l.is_active = true                -- търси се само в активните езици
        AND p.status = 1 -- публикувана
        AND to_tsvector(v_search_config::regconfig, coalesce(i18n.title,'') ||' '||coalesce(i18n.content,'')) @@ v_search_tsquery
    ) t;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100 ROWS 1000;
