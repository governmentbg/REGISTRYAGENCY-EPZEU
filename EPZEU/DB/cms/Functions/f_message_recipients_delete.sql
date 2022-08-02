CREATE OR REPLACE FUNCTION cms.f_message_recipients_delete (
  p_message_id integer,
  p_user_id integer
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
  
  IF p_user_id IS NOT NULL 
  THEN
    -- ��������� �� ��������� �� ������ ���������
    DELETE 
    FROM cms.message_recipients
    WHERE message_id = p_message_id
       AND user_id = p_user_id;
  
    GET DIAGNOSTICS v_count = ROW_COUNT;

    -- �������� ���� � ������ ����� ���� �����
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;

  ELSE --  p_message_id IS NULL
     -- ��������� �� ������ ���������� �� ������ ���������
     DELETE 
     FROM cms.message_recipients
     WHERE message_id = p_message_id;
  END IF;   
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;