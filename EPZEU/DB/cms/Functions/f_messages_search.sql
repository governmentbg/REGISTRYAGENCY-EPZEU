CREATE OR REPLACE FUNCTION cms.f_messages_search (
  p_message_ids integer [],
  p_about varchar,
  p_status integer,
  p_updated_by_from timestamptz,
  p_updated_by_to timestamptz,
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  p_load_recipients boolean,
  out p_count integer,
  out p_ref_messages refcursor,
  out p_ref_message_recipients refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
    
BEGIN

  -- проверка на параметрите
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  

  v_stmt := 'SELECT m.message_id,
                    m.about,
                    m.content,
                    m.status,
                    m.is_to_all_cr,
                    m.is_to_all_pr,
                    m.is_to_all_epzeu,
                    m.updated_by,
                    m.updated_on
             FROM cms.messages m
             WHERE 1 = 1 ';

  
  IF p_message_ids IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND m.message_id = ANY($1) ';
  END IF;

  IF p_about IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND m.about ILIKE concat(''%'',$2, ''%'')';
  END IF;

  IF p_status IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND m.status = $3 ';
  END IF;  

  IF p_updated_by_from IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND m.updated_on >= $4 ';
  END IF;
  
  IF p_updated_by_to IS NOT NULL
  THEN
      v_stmt := v_stmt || ' AND m.updated_on <= $5 ';
  END IF;
  
  IF p_calculate_count
  THEN
    v_count_stmt := 'SELECT COUNT(*) FROM ( ' || v_stmt || ' ) t';
      
    EXECUTE v_count_stmt
       INTO p_count
      USING p_message_ids, p_about, p_status, p_updated_by_from, p_updated_by_to ;

  END IF;

  v_stmt := v_stmt || ' ORDER BY m.updated_on DESC, m.message_id LIMIT $6 OFFSET $7 - 1 ';

  OPEN p_ref_messages FOR EXECUTE v_stmt
  USING p_message_ids, p_about, p_status, p_updated_by_from, p_updated_by_to, p_page_size, p_start_index;
 
  IF p_load_recipients AND p_message_ids IS NOT NULL
    THEN       
        OPEN p_ref_message_recipients FOR
          SELECT u.user_id,
                 u.first_name,
                 u.middle_name,
                 u.family_name,
                 u.email
            FROM cms.message_recipients mr,
                 usr.users u
           WHERE mr.message_id = ANY(p_message_ids) 
             AND u.user_id = mr.user_id
        ORDER BY u.first_name, u.middle_name, u.family_name;  
    END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
