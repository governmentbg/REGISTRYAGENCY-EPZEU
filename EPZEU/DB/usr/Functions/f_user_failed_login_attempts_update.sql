CREATE OR REPLACE FUNCTION usr.f_user_failed_login_attempts_update (
  p_attempt_id integer,
  p_authentication_type smallint,
  p_login_name varchar,
  p_additional_data varchar,
  p_failed_login_attempts integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF p_attempt_id IS NULL OR p_authentication_type IS NULL OR p_failed_login_attempts IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  -- ������� �� �������
  UPDATE usr.user_failed_login_attempts
  SET authentication_type = p_authentication_type,
      login_name = p_login_name,
      additional_data = p_additional_data,
      failed_login_attempts = p_failed_login_attempts,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp() 
  WHERE attempt_id = p_attempt_id
    AND is_active = true;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- �������� ���� � ���������� ����� ���� �����
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

COMMENT ON FUNCTION usr.f_user_failed_login_attempts_update(p_attempt_id integer, p_authentication_type smallint, p_login_name varchar, p_additional_data varchar, p_failed_login_attempts integer)
IS '������� �� ������� �� ����� �� ��������� ���� �� ���� � ���������';
