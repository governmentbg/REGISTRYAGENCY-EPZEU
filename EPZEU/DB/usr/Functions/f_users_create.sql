CREATE OR REPLACE FUNCTION usr.f_users_create (
  p_email varchar,
  p_first_name varchar,
  p_middle_name varchar,
  p_family_name varchar,
  p_contact_data varchar,
  p_organization varchar,
  p_special_user_access_type integer,
  p_cr_bulletin_acceptance boolean,
  p_pr_bulletin_acceptance boolean,
  p_cr_message_acceptance boolean,
  p_pr_message_acceptance boolean,
  p_epzeu_message_acceptance boolean,
  p_status integer = 0,
  out p_user_id integer,
  out p_cin integer,
  out p_user_ver_id integer
)
RETURNS record AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_email IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  SELECT COUNT(1)
    INTO v_count
    FROM usr.users u
   WHERE lower(u.email) =  lower(p_email); 
    
  -- Проверка дали е вече съществува потребител с такава електронна поща
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(4);
  END IF;
  
  -- създаване на запис
  INSERT INTO usr.users(  
        email,
        first_name,
        middle_name,
        family_name,
        contact_data,
        organization,
        special_access_user_type,
        cr_bulletin_acceptance,
        pr_bulletin_acceptance,
        status,
        created_by,
        created_on,
        updated_by,
        updated_on,
        is_system,
        cr_message_acceptance,
        pr_message_acceptance,
        epzeu_message_acceptance
  )
  VALUES
  (
    p_email,
    p_first_name,
    p_middle_name,
    p_family_name,
    p_contact_data,
    p_organization,
    p_special_user_access_type,
    p_cr_bulletin_acceptance,
    p_pr_bulletin_acceptance,
    p_status,    
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    FALSE,
    p_cr_message_acceptance,
    p_pr_message_acceptance,
    p_epzeu_message_acceptance
  )
  RETURNING user_id, cin
    INTO p_user_id, p_cin;
  
  -- създаване на история за профила
  p_user_ver_id := usr.f_users_h_create ( p_user_id, 1::smallint);

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_users_create(p_email varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_contact_data varchar, p_organization varchar, p_special_user_access_type integer, p_cr_bulletin_acceptance boolean, p_pr_bulletin_acceptance boolean, p_cr_message_acceptance boolean, p_pr_message_acceptance boolean, p_epzeu_message_acceptance boolean, p_status integer, out p_user_id integer, out p_cin integer, out p_user_ver_id integer)
IS 'Функция за създаване на потребител.';
