CREATE OR REPLACE FUNCTION cms.f_themes_comments_search (
  p_theme_comment_ids integer [],
  p_theme_id integer,
  p_status integer,
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_title varchar,
  p_comment varchar,
  p_name varchar,
  p_first_load boolean,
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_themes_comments refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

 -- Проверка за невалидни входящи параметри
  IF  p_theme_comment_ids IS NULL AND 
      p_theme_id  IS NULL AND
      p_status  IS NULL AND
      p_date_from  IS NULL AND
      p_date_to  IS NULL AND
      p_title  IS NULL AND
      p_comment  IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  
  
  IF (p_theme_comment_ids is not null ) then
   
     IF (p_calculate_count = TRUE)
      THEN
        
        SELECT COUNT(*)
          INTO p_count
          FROM cms.themes_comments tc
         WHERE tc.theme_comment_id = ANY (p_theme_comment_ids);
          
      END IF;

      OPEN p_ref_themes_comments FOR
      SELECT tc.theme_comment_id,
             tc.theme_id, 
             t.title,
             u.first_name,
             t.status as theme_status,
             tc.comment,
             tc.is_first,
             tc.status,
             tc.created_by,
             tc.created_on, 
             tc.updated_by,
             tc.updated_on
        FROM cms.themes_comments tc, cms.themes t, usr.users u
       WHERE tc.theme_comment_id = ANY (p_theme_comment_ids)
         AND (p_first_load IS NULL OR p_first_load  OR (p_first_load = FALSE AND tc.is_first = FALSE)) 
         AND t.theme_id = tc.theme_id
         AND u.user_id = tc.created_by
    ORDER BY tc.created_on DESC
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
      
    ELSE
                 
        v_stmt := ' SELECT tc.theme_comment_id,
                           tc.theme_id, 
                           t.title,
                           u.first_name,
                           t.status as theme_status,
                           tc.comment,
                           tc.is_first,
                           tc.status,
                           tc.created_by,
                           tc.created_on, 
                           tc.updated_by,
                           tc.updated_on
                      FROM cms.themes_comments tc, cms.themes t, usr.users u
                     WHERE t.theme_id = tc.theme_id
                       AND u.user_id = tc.created_by ';


    IF p_theme_id IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND tc.theme_id = $1 ';
    END IF;

    IF p_status IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND tc.status = $2 ';
    END IF;

    IF p_date_from IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND tc.updated_on >= $3 ';
    END IF;
    
    IF p_date_to IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND tc.updated_on <= $4 ';
    END IF;
        
    IF p_title IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(t.title) LIKE concat(''%'', $5, ''%'') ';
    END IF;
     
    IF p_comment IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(tc.comment) LIKE concat(''%'', $6, ''%'') ';
    END IF;

    IF p_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.first_name) LIKE concat($7, ''%'') ';
    END IF;
    
    IF p_first_load IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND ($8  OR ($8 = FALSE AND tc.is_first = FALSE)) ';
    END IF;
    
    
    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      IF (p_max_nor IS NOT NULL)
      THEN
        v_count_stmt := v_count_stmt || '
                                LIMIT $9 + 1';

      END IF;

      v_count_stmt := v_count_stmt || ' ) tc ';
      
      EXECUTE v_count_stmt
         INTO p_count
        USING p_theme_id, p_status, p_date_from, p_date_to, lower(p_title), lower(p_comment), lower(p_name), p_first_load, p_max_nor;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    v_stmt := v_stmt || ' ORDER BY tc.created_on DESC LIMIT $9 OFFSET $10 - 1 ';

    OPEN p_ref_themes_comments FOR EXECUTE v_stmt
    USING p_theme_id, p_status, p_date_from, p_date_to, lower(p_title), lower(p_comment), lower(p_name), p_first_load, p_page_size, p_start_index;
 END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
