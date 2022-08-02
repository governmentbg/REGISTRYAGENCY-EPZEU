CREATE OR REPLACE FUNCTION usr.f_user_access_request_docs_delete (
  p_doc_id integer
)
RETURNS void AS
$body$
DECLARE
  v_count NUMERIC;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF p_doc_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ��������� �� ����� 
  DELETE
  FROM usr.user_access_request_docs
  WHERE doc_id = p_doc_id;
  
  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- �������� ���� � ������ ����� ���� �����
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

COMMENT ON FUNCTION usr.f_user_access_request_docs_delete(p_doc_id integer)
IS '������� �� ��������� �� ����� �� �������� �� ��������� ������';
