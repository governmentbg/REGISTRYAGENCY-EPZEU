CREATE OR REPLACE FUNCTION usr.f_n_s_permissions_search (
  p_permission_ids integer [],
  p_permission_keys varchar [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_permissions refcursor
)
RETURNS record AS
$body$
BEGIN
  -- �������� �� �����������
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR 
     ( p_start_index IS NOT NULL AND p_page_size IS NULL ) OR 
     ( p_permission_ids IS NOT NULL AND p_permission_keys IS NOT NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- 
  IF (p_permission_ids IS NOT NULL)
  THEN
    IF (p_calculate_count)
    THEN
      
      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t
      WHERE t.permission_id = ANY (p_permission_ids);
        
              
    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    WHERE t.permission_id = ANY (p_permission_ids)
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
    
  ELSIF (p_permission_keys IS NOT NULL) -- p_permission_ids IS NULL
  THEN
    IF (p_calculate_count)
    THEN
      
      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t
      WHERE t.permission_key = ANY (p_permission_keys);
        
              
    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    WHERE t.permission_key = ANY (p_permission_keys)
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
    
  ELSE -- p_permission_ids IS NULL AND p_permission_keys IS NULL
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_permissions t;

    END IF;

    OPEN p_ref_permissions FOR
    SELECT t.*
    FROM usr.n_s_permissions t
    ORDER BY t.order, t.permission_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
  
  END IF;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_n_s_permissions_search(p_permission_ids integer [], p_permission_keys varchar [], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_permissions refcursor)
IS '��������� ����� ������ � �������� �����, ���������� �� ���������� ��������. �������� � ����� ���� �� �� ����������.
��� �������� ������ ���������: 
 - p_permission_ids integer [] - ����� �� �������� �������������� �� ������ �����, ��� ���������� �� ���������� � NULL �� �� ������� ������ 
 - p_start_index integer - ������ �� ������ ������� �� ����������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_page_size integer - ���� ������ �� ��������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_calculate_count boolean - ���� ���� �� �� ��������� ����� ���� �� ��������
��������� ����� record ��: 
 - out p_count integer - ��� ���� ������, ���������� �� ����������, ���������� �� ����������� �� ������������ 
 - out p_ref_permissions refcursor - ������ � ����� ���������� �� ���������� � ����������� �� ������������';
