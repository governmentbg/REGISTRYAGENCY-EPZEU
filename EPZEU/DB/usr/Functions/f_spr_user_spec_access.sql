CREATE OR REPLACE FUNCTION usr.f_spr_user_spec_access (
  p_date_from timestamptz,
  p_date_to timestamptz,
  out p_ref_users_spec_access refcursor,
  out p_ref_users_permissions refcursor
)
RETURNS record AS
$body$
DECLARE
  v_stmt       TEXT;
 
BEGIN

   v_stmt := 'SELECT t.user_type_id, t.name, 
                     t.count_by_spec, 
                     SUM( t.count_by_spec) OVER () AS  count_by_all,
                     round((t.count_by_spec::numeric*100)/ SUM(t.count_by_spec) OVER (), 2) percent_per_spec 
              FROM (
                    SELECT st.user_type_id, st.name, COUNT(u.user_id) count_by_spec
                    FROM usr.users u
                    LEFT JOIN usr.n_s_special_access_user_types st 
                           ON u.special_access_user_type = st.user_type_id  
                    WHERE u.is_system = FALSE
                      AND u.status = 1';
                         
   IF p_date_from IS NOT NULL
   THEN
     v_stmt := v_stmt || ' AND u.created_on >= $1 ';
   END IF;
    
   IF p_date_to IS NOT NULL
   THEN
     v_stmt := v_stmt || ' AND u.created_on <= $2 ';
   END IF;

   v_stmt := v_stmt || ' GROUP BY st.user_type_id, st.name ) t 
                         ORDER BY t.user_type_id    ';

   OPEN p_ref_users_spec_access FOR EXECUTE v_stmt
   USING p_date_from, p_date_to;

       
     v_stmt := 'SELECT  p.group_id, p."order", p.permission_id, p.name AS permission_name, 
                        u.special_access_user_type, sa.name AS special_access_name, 
                        COUNT(u.user_id) AS user_count
                FROM usr.users u 
                LEFT JOIN usr.user_permissions up ON up.user_id = u.user_id  AND up.is_active = TRUE
                LEFT JOIN usr.n_s_permissions p ON up.permission_id = p.permission_id
                LEFT JOIN usr.n_s_special_access_user_types sa ON u.special_access_user_type = sa.user_type_id
                WHERE u.is_system = FALSE
                  AND u.status = 1
               ';

    IF p_date_from IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.created_on >= $1 ';
    END IF;
    
    IF p_date_to IS NOT NULL
    THEN
      v_stmt := v_stmt || ' AND u.created_on <= $2 ';
    END IF;

    v_stmt := v_stmt || 'GROUP BY p.group_id, p."order", p.permission_id, p.name, u.special_access_user_type, sa.name
                         ORDER BY p.group_id, p."order", u.special_access_user_type ';

    OPEN p_ref_users_permissions FOR EXECUTE v_stmt
    USING p_date_from, p_date_to;



 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
