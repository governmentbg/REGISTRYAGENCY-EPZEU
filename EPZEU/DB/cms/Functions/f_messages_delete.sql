CREATE OR REPLACE FUNCTION cms.f_messages_delete (
  p_message_id integer
)
RETURNS void AS
$body$
DECLARE
   v_count INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF p_message_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- ��������� �� ������ ���������� �� ���������
  PERFORM cms.f_message_recipients_delete(p_message_id, NULL);
  
  -- ��������� �� ���������
  DELETE 
    FROM cms.messages
   WHERE message_id = p_message_id
     AND status = 0;
  
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