CREATE OR REPLACE FUNCTION usr.f_users_search (
  p_users_ids integer [],
  p_cin integer,
  p_email varchar,
  p_username varchar,
  p_first_name varchar,
  p_middle_name varchar,
  p_family_name varchar,
  p_special_access_user_type integer [],
  p_status integer [],
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_authentication_type smallint,
  p_organization varchar,
  p_bulletin_acceptance smallint [],
  p_start_index integer,
  p_page_size integer,
  p_max_nor integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_users refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
  v_count_stmt TEXT;
BEGIN

 -- Проверка за невалидни входящи параметри
  IF  p_users_ids IS NULL AND 
      p_cin  IS NULL AND
      p_email  IS NULL AND
      p_username  IS NULL AND
      p_first_name  IS NULL AND
      p_middle_name  IS NULL AND
      p_family_name  IS NULL AND
      p_special_access_user_type  IS NULL AND 
      p_status  IS NULL AND
      p_date_from  IS NULL AND
      p_date_to  IS NULL AND
      p_authentication_type  IS NULL AND
      p_start_index  IS NULL AND
      p_page_size  IS NULL AND
      p_max_nor  IS NULL AND
      p_organization IS NULL AND
      p_bulletin_acceptance IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  --
  
  
  IF (p_users_ids is not null ) then
   
     IF (p_calculate_count = TRUE)
      THEN
        
        SELECT COUNT(*)
        INTO p_count
        FROM usr.users u
        WHERE u.user_id = ANY (p_users_ids);
          
      END IF;

      OPEN p_ref_users FOR
      SELECT u.user_id,
             u.cin, 
             u.contact_data, 
             u.email, 
             u.first_name, 
             u.family_name, 
             u.middle_name,
             u.contact_data,
             u.organization, 
             u.special_access_user_type,
             u.cr_bulletin_acceptance,
             u.pr_bulletin_acceptance,
             u.cr_message_acceptance,
             u.pr_message_acceptance,
             u.epzeu_message_acceptance,
             u.status, 
             u.created_by, 
             u.created_on, 
             u.updated_by, 
             u.updated_on,
             (SELECT ua.username 
                FROM usr.user_authentications ua
               WHERE ua.user_id = u.user_id
                 AND ua.authentication_type = 2)
        FROM usr.users u 
       WHERE u.user_id = ANY (p_users_ids)
         AND u.is_system = FALSE
      ORDER BY u.user_id
      LIMIT p_page_size
      OFFSET p_start_index - 1;  
      
    ELSE
                 
        v_stmt := 'SELECT u.user_id,
                          u.cin, 
                          u.contact_data, 
                          u.email, 
                          u.first_name, 
                          u.family_name, 
                          u.middle_name,
                          u.contact_data,
                          u.organization, 
                          u.special_access_user_type,
                          u.cr_bulletin_acceptance,
                          u.pr_bulletin_acceptance,
                          u.cr_message_acceptance,
                          u.pr_message_acceptance,
                          u.epzeu_message_acceptance,
                          u.status, 
                          u.created_by, 
                          u.created_on, 
                          u.updated_by, 
                          u.updated_on,
                          ( SELECT ua.username 
                              FROM usr.user_authentications ua
                             WHERE ua.user_id = u.user_id
                               AND ua.authentication_type = 2)
                     FROM usr.users u 
                    WHERE u.is_system = FALSE ';


    IF p_cin IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.cin = $1 ';
    END IF;

    IF p_email IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.email) = $2 ';
    END IF;

     IF p_username IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND EXISTS (SELECT 1 FROM usr.user_authentications ua WHERE ua.user_id = u.user_id AND  lower(ua.username) LIKE concat(replace($3, ''\'', ''\\''), ''%'')  AND ua.authentication_type = 2) ';
    END IF;
 
    IF p_first_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.first_name)  LIKE concat($4, ''%'')   ';
    END IF;
    
    IF p_middle_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.middle_name)  LIKE concat($5, ''%'')   ';
    END IF;
    
    IF p_family_name IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.family_name)  LIKE concat($6, ''%'')    ';
    END IF;
    
    IF p_special_access_user_type IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.special_access_user_type = ANY($7) ';
    END IF;
    
    IF p_status IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.status = ANY($8) ';
    END IF;
    
    
    IF p_date_from IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.updated_on >= $9 ';
    END IF;
    
    IF p_date_to IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.updated_on <= $10 ';
    END IF;
        
    IF p_authentication_type IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND EXISTS (SELECT 1 FROM usr.user_authentications ua WHERE ua.user_id = u.user_id AND ua.authentication_type = $11) ';
    END IF;
       
    IF p_organization IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND lower(u.organization) LIKE concat($12, ''%'') ';
    END IF;

    IF p_bulletin_acceptance IS NOT NULL
    THEN
       IF p_bulletin_acceptance = '{1,2}'
       THEN
         v_stmt := v_stmt || ' AND ( u.cr_bulletin_acceptance OR u.pr_bulletin_acceptance)';
       ELSIF p_bulletin_acceptance = '{1}'
       THEN 
         v_stmt := v_stmt || ' AND u.cr_bulletin_acceptance';
       ELSIF p_bulletin_acceptance = '{2}'
       THEN 
         v_stmt := v_stmt || ' AND u.pr_bulletin_acceptance';
       END IF;  
    END IF;
    
    IF p_calculate_count
    THEN
      v_count_stmt := 'SELECT COUNT(*) FROM ( SELECT * FROM ( ' || v_stmt || ' ) t';

      IF (p_max_nor IS NOT NULL)
      THEN
        v_count_stmt := v_count_stmt || '
                                LIMIT $13 + 1';

      END IF;

      v_count_stmt := v_count_stmt || ' ) tc ';
      
      EXECUTE v_count_stmt
      INTO p_count
      USING p_cin, lower(p_email), lower(p_username), lower(p_first_name), lower(p_middle_name), lower(p_family_name), p_special_access_user_type, p_status, p_date_from, p_date_to, p_authentication_type, lower(p_organization), p_max_nor;

      IF p_max_nor IS NOT NULL AND
          p_max_nor < p_count
      THEN
        PERFORM sys.f_raise_excp_max_nor_exceeded();
      END IF;
    END IF;

    v_stmt := v_stmt || ' ORDER BY u.updated_on DESC, u.user_id LIMIT $13 OFFSET $14 - 1 ';

    OPEN p_ref_users FOR EXECUTE v_stmt
    USING p_cin, lower(p_email), lower(p_username), lower(p_first_name), lower(p_middle_name), lower(p_family_name), p_special_access_user_type, p_status, p_date_from, p_date_to, p_authentication_type, lower(p_organization), p_page_size, p_start_index;
 END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_users_search(p_users_ids integer [], p_cin integer, p_email varchar, p_username varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_special_access_user_type integer [], p_status integer [], p_date_from timestamptz, p_date_to timestamptz, p_authentication_type smallint, p_organization varchar, p_bulletin_acceptance smallint [], p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_users refcursor)
IS 'Търсене в потребителите по зададени критерий.';

ALTER FUNCTION usr.f_users_search (p_users_ids integer [], p_cin integer, p_email varchar, p_username varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_special_access_user_type integer [], p_status integer [], p_date_from timestamptz, p_date_to timestamptz, p_authentication_type smallint, p_organization varchar, p_bulletin_acceptance smallint [], p_start_index integer, p_page_size integer, p_max_nor integer, p_calculate_count boolean, out p_count integer, out p_ref_users refcursor)
  OWNER TO epzeu_dev;