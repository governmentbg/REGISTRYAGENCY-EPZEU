CREATE OR REPLACE FUNCTION nom.f_d_iisda_services_markasread (
  p_iisda_service_id integer,
  p_read_date timestamptz
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF ( p_iisda_service_id IS NULL OR p_read_date IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  UPDATE nom.d_iisda_services 
  SET  read_date	= p_read_date,
       updated_by   = v_user_id,
       updated_on   = sys.f_current_timestamp()
  WHERE 
       iisda_service_id = p_iisda_service_id;
    
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
