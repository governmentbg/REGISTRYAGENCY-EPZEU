CREATE OR REPLACE FUNCTION usr.f_app_users_ensure (
  p_cin integer,
  p_display_name varchar,
  p_is_system boolean,
  out p_user_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id     	INTEGER;
  v_affected_rows 	INTEGER;
BEGIN

  IF p_cin IS NULL OR
     p_display_name IS NULL OR
     p_is_system  IS NULL
  THEN
      PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  UPDATE usr.app_users
  SET     
  	display_name = p_display_name,
    is_system = p_is_system,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE
  	cin = p_cin
  RETURNING user_id INTO p_user_id;
  
  GET DIAGNOSTICS v_affected_rows = ROW_COUNT;
  IF (v_affected_rows = 0)
  THEN
  		-- създаване на запис
        INSERT INTO usr.app_users
          (cin,
           display_name,
           is_system,
           created_by,
           created_on,
           updated_by,
           updated_on
          )
        VALUES 
          (
            p_cin,
            p_display_name,
            p_is_system,
            v_user_id,
            sys.f_current_timestamp(),
            v_user_id,
            sys.f_current_timestamp()
          )
        RETURNING user_id INTO p_user_id;
  END IF; 
EXCEPTION WHEN unique_violation THEN		      
    SELECT user_id INTO p_user_id FROM usr.app_users 
    WHERE cin = p_cin;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION usr.f_app_users_ensure (p_cin integer, p_display_name varchar, p_is_system boolean, out p_user_id integer)
  OWNER TO epzeu_dev;