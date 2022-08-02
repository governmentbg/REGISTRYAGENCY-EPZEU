CREATE OR REPLACE FUNCTION cms.f_news_documents_delete (
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
  FROM cms.news_documents
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
