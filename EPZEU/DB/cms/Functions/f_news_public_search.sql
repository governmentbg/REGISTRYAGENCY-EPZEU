CREATE OR REPLACE FUNCTION cms.f_news_public_search (
  p_search_criteria varchar
)
RETURNS TABLE (
  news_id integer,
  language_id integer,
  register_id smallint,
  news_date timestamptz,
  title varchar,
  short_description varchar
) AS
$body$
DECLARE
  v_search_config  VARCHAR(20);
  v_search_tsquery tsquery;

BEGIN
    v_search_config  := sys.f_fts_search_config();
    v_search_tsquery := sys.f_fts_search_string_to_tsquery(p_search_criteria);
    
    RETURN QUERY
    SELECT t.news_id, t.language_id, t.register_id, t.news_date, t.title, t.short_description
    FROM (
      SELECT n.news_id, 98 AS language_id, n.register_id, n.news_date, n.title, n.short_description              
      FROM cms.news n
      WHERE n.status = 1 -- публикувана
        AND n.publication_date <= sys.f_current_timestamp() -- публикувана преди текущата дата
        AND (n.expiration_date > sys.f_current_timestamp() OR n.expiration_date IS NULL) -- не е изтекла
        AND to_tsvector(v_search_config::regconfig, coalesce(n.title,'') ||' '||coalesce(n.short_description,'')||' '||coalesce(n.description,'')) @@ v_search_tsquery
      UNION ALL
      SELECT n.news_id, i18n.language_id, n.register_id, n.news_date, i18n.title, i18n.short_description              
      FROM cms.news_i18n i18n, cms.news n, nom.d_languages l
      WHERE i18n.news_id = n.news_id
        AND i18n.language_id = l.language_id
        AND l.is_active = true                -- търси се само в активните езици
        AND n.status = 1 -- публикувана
        AND n.publication_date <= sys.f_current_timestamp() -- публикувана преди текущата дата
        AND (n.expiration_date > sys.f_current_timestamp() OR n.expiration_date IS NULL) -- не е изтекла
        AND to_tsvector(v_search_config::regconfig, coalesce(i18n.title,'') ||' '||coalesce(i18n.short_description,'')||' '||coalesce(i18n.description,'')) @@ v_search_tsquery
    ) t;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100 ROWS 1000;
