CREATE OR REPLACE FUNCTION usr.f_app_users_search (
  p_user_id integer,
  p_cin integer,
  out ref_app_users refcursor
)
RETURNS refcursor AS'
DECLARE
  v_stmt TEXT;

BEGIN
  IF p_user_id IS NULL AND  p_cin IS NULL
    THEN
    RAISE EXCEPTION ''Invalid input parameters'';
  END IF;

  v_stmt := ''
  SELECT *
  FROM usr.app_users u
  WHERE 1=1
'';

  IF (p_user_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ''
    AND u.user_id = $1
	'';
  END IF;

  IF (p_cin IS NOT NULL)
    THEN
    v_stmt := v_stmt || ''
    AND u.cin = $2
	'';
  END IF;

  OPEN ref_app_users FOR EXECUTE v_stmt
  USING p_user_id, p_cin;

END;
'LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

