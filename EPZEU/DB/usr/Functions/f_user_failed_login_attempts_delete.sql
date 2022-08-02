CREATE OR REPLACE FUNCTION usr.f_user_failed_login_attempts_delete (
  p_attempt_id integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF p_attempt_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  -- ������������ �� �����
  UPDATE usr.user_failed_login_attempts
  SET is_active = false,
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

COMMENT ON FUNCTION usr.f_user_failed_login_attempts_delete(p_attempt_id integer)
IS '������� �� ������������ �� ����� �� ��������� ���� �� ���� � ���������';
