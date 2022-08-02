CREATE OR REPLACE FUNCTION cms.f_public_search (
  p_content_type smallint,
  p_search_criteria varchar,
  p_lang_id integer,
  p_start_index integer,
  p_page_size integer,
  out p_ref_result refcursor
)
RETURNS refcursor AS
$body$
BEGIN

  -- търсене по вид съдържание
  CASE p_content_type
  WHEN 1 THEN -- Новини
 
 	OPEN p_ref_result FOR
    SELECT news_id, language_id, register_id, news_date, title, short_description
    FROM cms.f_news_public_search(p_search_criteria) t
    ORDER BY t.language_id = p_lang_id desc nulls last, register_id, news_date desc, title 
    LIMIT p_page_size OFFSET p_start_index - 1 ;

   
  WHEN 2 THEN -- Видео уроци
    
    OPEN p_ref_result FOR
    SELECT lesson_id, language_id, title, description
    FROM cms.f_video_lessons_public_search(p_search_criteria) t
    ORDER BY t.language_id = p_lang_id desc nulls last, title 
    LIMIT p_page_size OFFSET p_start_index - 1 ;

  WHEN 3 THEN -- HTML страници – предефинирани и въведени от потребителя
    
    OPEN p_ref_result FOR
    SELECT t.page_id, t.language_id, t.title, t.type, t.url, t.register_id
    FROM(
      SELECT page_id, language_id, title, NULL AS type, url, NULL AS register_id
      FROM cms.f_html_pages_public_search(p_search_criteria) 
      UNION ALL
      SELECT page_id, language_id, title, TYPE, NULL AS url, register_id
      FROM cms.f_pages_parents_public_search(p_search_criteria)
      )t
      ORDER BY t.language_id = p_lang_id desc nulls last, title 
    LIMIT p_page_size OFFSET p_start_index - 1 ;
    
  WHEN 4 THEN -- Нормативна уредба
    
    OPEN p_ref_result FOR 
    SELECT page_id, language_id, title
    FROM cms.f_pages_public_search(p_search_criteria, 4) t
    ORDER BY t.language_id = p_lang_id desc nulls last, title 
    LIMIT p_page_size OFFSET p_start_index - 1 ;
    
  WHEN 5 THEN -- Образци на документи
    
    OPEN p_ref_result FOR 
    SELECT page_id, language_id, title
    FROM cms.f_pages_public_search(p_search_criteria, 3) t
    ORDER BY t.language_id = p_lang_id desc nulls last, title 
    LIMIT p_page_size OFFSET p_start_index - 1 ;

  END CASE;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
