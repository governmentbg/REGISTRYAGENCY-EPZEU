CREATE OR REPLACE FUNCTION cms.f_video_lessons_search (
  p_lesson_ids integer [],
  p_status smallint,
  p_register_id integer,
  p_lang_id integer,
  p_load_description boolean,
  p_load_content_info boolean,
  p_load_separate_value_i18n boolean,
  p_load_only_untranslated boolean,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_lessons refcursor
)
RETURNS record AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


  IF (p_calculate_count = TRUE)
   THEN
         
     SELECT COUNT(*)
       INTO p_count
      FROM cms.video_lessons l
     WHERE (p_lesson_ids IS NULL OR l.lesson_id = ANY(p_lesson_ids))
       AND (p_status IS NULL OR l.status = p_status)
       AND (p_register_id IS NULL OR l.register_id = p_register_id)  ;
          
  END IF;

  OPEN p_ref_lessons FOR
    SELECT l.lesson_id,
           l.register_id,
           (CASE WHEN l_i18n.lesson_id IS NULL THEN 0 ELSE 1 END) as is_translated,   
           (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(l_i18n.title,l.title) ELSE l.title END) as title,
           (CASE WHEN (p_load_separate_value_i18n ) THEN l_i18n.title END) as title_i18n,          
           (CASE WHEN (p_load_description) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(l_i18n.description,l.description) ELSE l.description END) END) as description,
           (CASE WHEN (p_load_description AND p_load_separate_value_i18n ) THEN l_i18n.description END) as description_i18n,
           l.status,
           (CASE WHEN (p_load_content_info) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(l_i18n.file_name,l.file_name) ELSE l.file_name END) END) as file_name,
           (CASE WHEN (p_load_content_info AND p_load_separate_value_i18n ) THEN l_i18n.file_name END) as file_name_i18n,
           (CASE WHEN (p_load_content_info) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN COALESCE(l_i18n.file_size, l.file_size) ELSE l.file_size END) END) as file_size,
           (CASE WHEN (p_load_content_info AND p_load_separate_value_i18n ) THEN l_i18n.file_size END) as file_size_i18n,
           (CASE WHEN (p_load_content_info) THEN (CASE WHEN (p_load_separate_value_i18n = FALSE) THEN sys.f_search_coalesce_i18n(l_i18n.content_type, l.content_type) ELSE l.content_type END) END) as content_type,
           (CASE WHEN (p_load_content_info AND p_load_separate_value_i18n ) THEN l_i18n.content_type END) as content_type_i18n,
           l.created_by,
           l.created_on,
           l.updated_by,
           l.updated_on
      FROM cms.video_lessons l
     LEFT JOIN cms.video_lessons_i18n l_i18n ON (l.lesson_id = l_i18n.lesson_id AND l_i18n.language_id = p_lang_id)
     WHERE (p_lesson_ids IS NULL OR l.lesson_id = ANY(p_lesson_ids) )
       AND (p_status IS NULL OR l.status = p_status) 
       AND (p_register_id IS NULL OR l.register_id = p_register_id) 
       AND (p_load_only_untranslated IS NULL OR
            p_load_only_untranslated = FALSE OR
            (p_load_only_untranslated = TRUE AND NOT exists (SELECT 1 
                                                               FROM cms.video_lessons_i18n vl
                                                              WHERE vl.lesson_id = l.lesson_id
                                                                AND vl.language_id = p_lang_id))) 
  ORDER BY l.register_id, l.title
  LIMIT p_page_size
  OFFSET p_start_index - 1;  
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
