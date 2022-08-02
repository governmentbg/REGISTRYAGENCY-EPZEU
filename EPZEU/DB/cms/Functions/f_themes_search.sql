CREATE OR REPLACE FUNCTION cms.f_themes_search (
  p_theme_ids integer [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_themes refcursor
)
RETURNS record AS
$body$
DECLARE

BEGIN
  
  -- проверка на параметрите
  IF ( p_theme_ids IS NULL AND 
       p_start_index IS NULL AND
       p_page_size IS NULL) 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;


  IF (p_calculate_count = TRUE)
   THEN
         
     SELECT COUNT(*)
       INTO p_count
      FROM cms.themes t
     WHERE (p_theme_ids IS NULL OR t.theme_id = ANY(p_theme_ids) )
       AND t.status = 1 ;
          
  END IF;
  
  OPEN p_ref_themes FOR
    SELECT t.theme_id,
           t.title,
           u.first_name,
           tc.comment, 
           (SELECT count(1)
              FROM cms.themes_comments c
             WHERE c.theme_id = t.theme_id
               AND c.STATUS  = 1) comments_num,
           t.last_comment_date,
           t.created_by,
           t.created_on,
           t.updated_by,
           t.updated_on     
      FROM cms.themes t, usr.users u, cms.themes_comments tc
     WHERE (p_theme_ids IS NULL OR t.theme_id = ANY(p_theme_ids) )
       AND t.status = 1
       AND u.user_id = t.created_by
       AND tc.theme_id = t.theme_id
       AND tc.is_first = TRUE
  ORDER BY t.last_comment_date desc
  LIMIT p_page_size
  OFFSET p_start_index - 1;  
     
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
