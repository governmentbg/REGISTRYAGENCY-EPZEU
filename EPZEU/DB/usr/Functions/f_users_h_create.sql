CREATE OR REPLACE FUNCTION usr.f_users_h_create (
  p_user_id integer,
  p_operation smallint,
  out p_user_ver_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- определяне на версия
  p_user_ver_id := f_get_next_version_id(); 

  IF p_operation = 2 -- update
  THEN
    -- деактивиране на последната версия
    UPDATE usr.users_h
    SET 
      is_last = 0::bit,
      deactivation_ver_id = p_user_ver_id,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE user_id = p_user_id
      AND is_last = 1::bit    -- последната версия
      AND deactivation_ver_id IS NULL; -- последната версия не е деактивирана
  
    -- проверка за наличие на една последна активна версия
    GET DIAGNOSTICS v_count = ROW_COUNT;

    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;
  END IF;
  -- създаване на нова версия 
  INSERT INTO usr.users_h(
    user_id,
    user_ver_id,
    cin,
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
    is_last,
    deactivation_ver_id,
    cr_message_acceptance,
    pr_message_acceptance,
    epzeu_message_acceptance
  )
  SELECT
    u.user_id,
    p_user_ver_id,
    u.cin,
    u.email,
    u.first_name,
    u.middle_name,
    u.family_name,
    u.contact_data,
    u.organization,
    u.special_access_user_type,
    u.cr_bulletin_acceptance,
    u.pr_bulletin_acceptance,
    u.status,
    u.created_by,
    u.created_on,
    u.created_by,
    u.created_on,
    u.is_system,
    1::bit,
    NULL,
    u.cr_message_acceptance,
    u.pr_message_acceptance,
    u.epzeu_message_acceptance
  FROM usr.users u
  WHERE u.user_id = p_user_id;
  
  -- проверка за създааване на 1 запис
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
