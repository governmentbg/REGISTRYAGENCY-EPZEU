CREATE OR REPLACE FUNCTION cms.f_bulletin_update (
  p_bulletin_id integer,
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_temp_doc_id uuid
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
  v_status      INTEGER;
BEGIN

  -- �������� �� ��������� ������� ���������
  IF p_bulletin_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();
  
  -- �������� �� ������� ������ �� ��������
  -- ��� � � ������ ����������, �� ��������� ���� ���������� ���� ���������� ������� �� ��������� ������ 
  SELECT status
  INTO v_status
  FROM cms.bulletins 
  WHERE bulletin_id = p_bulletin_id;
  
  IF ( v_status = 1 )
  THEN 
    SELECT COUNT(1)
    INTO v_count
    FROM cms.bulletins b
    WHERE (p_date_from between b.date_from and b.date_to OR 
           p_date_to between b.date_from and b.date_to  OR
           b.date_from between p_date_from and p_date_to OR
           b.date_to between p_date_from and p_date_to  )
       AND b.status = 1
       AND b.bulletin_id != p_bulletin_id; 
    
    -- �������� ���� � ���� ���������� ���������� ������� �� ���� ������
    IF v_count > 0
    THEN
      PERFORM sys.f_raise_excp(11);
    END IF;

  END IF;
    
  IF p_temp_doc_id IS NULL -- ��� p_temp_doc_id � NULL �� �� ������� ��������� ����������
  THEN
    
    -- update-��, ��� ��������� ����������
    UPDATE cms.bulletins b
       SET date_from    = p_date_from,
           date_to      = p_date_to,
           updated_by   = v_user_id,
           updated_on   = sys.f_current_timestamp()
    WHERE b.bulletin_id = p_bulletin_id;
    
  ELSE -- ������� �� � ��������� ����������
  
    -- ��������� �� ��������� �������� � ����� � ������������ �������
    WITH temp_docs AS (
      DELETE FROM sys.document_data_temp tmp
      WHERE tmp.document_id = p_temp_doc_id
      RETURNING tmp.file_name, tmp.file_size, tmp.content_type, tmp.content
    )
    UPDATE cms.bulletins b
       SET date_from    = p_date_from,
           date_to      = p_date_to,
           file_name    = temp_docs.file_name,
           file_size    = temp_docs.file_size,
           content_type = temp_docs.content_type,
           content      = temp_docs.content, 
           updated_by   = v_user_id,
           updated_on   = sys.f_current_timestamp()
    FROM temp_docs       
    WHERE b.bulletin_id = p_bulletin_id;

  END IF;    

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
