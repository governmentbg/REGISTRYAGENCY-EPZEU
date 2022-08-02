CREATE OR REPLACE FUNCTION cms.f_public_search_count (
  p_search_criteria varchar,
  out p_ref_result refcursor
)
RETURNS refcursor AS
$body$
BEGIN
  
  IF p_search_criteria = ''
  THEN

    OPEN p_ref_result FOR
    SELECT 	unnest(ARRAY[1,2,3,4,5]) as search_type, 0;
    
  ELSE 

    -- изчисляване на брой резултати по вид съдържание
    OPEN p_ref_result FOR
      SELECT 1 AS search_type, COUNT(*)            -- новини
      FROM cms.f_news_public_search(p_search_criteria) t
      UNION ALL  
      SELECT 2 AS search_type, COUNT(*)            -- видео уроци
      FROM cms.f_video_lessons_public_search(p_search_criteria) t
      UNION ALL  
      SELECT 3 AS search_type, SUM(t.pages_count) 
      FROM ( SELECT COUNT(*) AS pages_count           -- HTML страници
             FROM cms.f_html_pages_public_search(p_search_criteria) t
             UNION ALL
             SELECT COUNT(*) AS pages_count           -- йерархични страници
             FROM cms.f_pages_parents_public_search(p_search_criteria)) t
      UNION ALL  
      SELECT 4 AS search_type, COUNT(*)            -- Нормативна уредба
      FROM cms.f_pages_public_search(p_search_criteria, 4) t
      UNION ALL  
      SELECT 5 AS search_type, COUNT(*)            -- Образци на документи
      FROM cms.f_pages_public_search(p_search_criteria, 3) t;
  
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

