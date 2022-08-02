CREATE OR REPLACE FUNCTION cms.f_video_lessons_public_search (
  p_search_criteria varchar
)
RETURNS TABLE (
  lesson_id integer,
  language_id integer,
  register_id smallint,
  title varchar,
  description text
) AS
$body$
DECLARE
  v_search_config  VARCHAR(20);
  v_search_tsquery tsquery;

BEGIN
    
    v_search_config  := sys.f_fts_search_config();
    v_search_tsquery := sys.f_fts_search_string_to_tsquery(p_search_criteria);
    
    RETURN QUERY
    SELECT t.lesson_id, t.language_id, t.register_id, t.title, t.description
    FROM (
      SELECT v.lesson_id, 98 as language_id, v.register_id, v.title, v.description
      FROM cms.video_lessons v
      WHERE v.status = 1 -- публикуван
        AND to_tsvector(v_search_config::regconfig, coalesce(v.title,'') ||' '||coalesce(v.description,'')) @@ v_search_tsquery
      UNION ALL
      SELECT v.lesson_id, i18n.language_id, v.register_id, i18n.title, i18n.description
      FROM cms.video_lessons_i18n i18n, cms.video_lessons v, nom.d_languages l
      WHERE i18n.lesson_id = v.lesson_id
        AND i18n.language_id = l.language_id
        AND l.is_active = true                -- търси се само в активните езици
        AND v.status = 1 -- публикуван
        AND to_tsvector(v_search_config::regconfig, coalesce(i18n.title,'') ||' '||coalesce(i18n.description,'')) @@ v_search_tsquery
    ) t;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100 ROWS 1000;
