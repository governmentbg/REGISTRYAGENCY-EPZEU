CREATE OR REPLACE FUNCTION usr.f_users_update (
  p_user_id integer,
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
  p_status integer,
  out p_user_ver_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF p_user_id IS NULL OR p_email IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  SELECT COUNT(1)
    INTO v_count
    FROM usr.users u
   WHERE lower(u.email) =  lower(p_email)
     AND u.user_id != p_user_id; 
    
  -- �������� ���� � ���� ���������� ���������� � ������ ���������� ����
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(4);
  END IF;
  
  -- update-��
  UPDATE usr.users u
  SET 
    email = p_email,
    first_name = p_first_name,
    middle_name = p_middle_name,
    family_name = p_family_name,
    contact_data = p_contact_data,
    organization = p_organization,
    special_access_user_type = p_special_user_access_type,
    cr_bulletin_acceptance = p_cr_bulletin_acceptance,
    pr_bulletin_acceptance = p_pr_bulletin_acceptance,
    cr_message_acceptance = p_cr_message_acceptance,
    pr_message_acceptance = p_pr_message_acceptance,
    epzeu_message_acceptance = p_epzeu_message_acceptance,
    status = p_status,
    updated_by    = v_user_id,
    updated_on    = sys.f_current_timestamp()
  WHERE u.user_id  = p_user_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- �������� ���� � ���������� ����� ���� �����
  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
  -- ��������� �� ������� �� �������
  p_user_ver_id := usr.f_users_h_create ( p_user_id, 2::smallint);
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_users_update(p_user_id integer, p_email varchar, p_first_name varchar, p_middle_name varchar, p_family_name varchar, p_contact_data varchar, p_organization varchar, p_special_user_access_type integer, p_cr_bulletin_acceptance boolean, p_pr_bulletin_acceptance boolean, p_cr_message_acceptance boolean, p_pr_message_acceptance boolean, p_epzeu_message_acceptance boolean, p_status integer, out p_user_ver_id integer)
IS '�������� �� �����������.';
