CREATE OR REPLACE FUNCTION usr.f_user_access_level_get (
  p_user_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_count INTEGER;
BEGIN

  SELECT COUNT(p.permission_id) -- връща 0 или 1
  INTO v_count
  FROM usr.user_permissions up,
       usr.n_s_permissions p
  WHERE up.permission_id = p.permission_id
    AND up.is_active = TRUE
    AND p.permission_key = 'EP_AUDIT_INVESTIGATING_AUTHORITIES' -- Одит за разследващи органи
    AND up.user_id = p_user_id;
  IF v_count > 0 
  THEN
    RETURN 2; -- преглед от разследващи органи  
  ELSE
    RETURN 1; -- преглед от администратори 
  END IF;        
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION usr.f_user_access_level_get (p_user_id integer)
  OWNER TO epzeu_dev;