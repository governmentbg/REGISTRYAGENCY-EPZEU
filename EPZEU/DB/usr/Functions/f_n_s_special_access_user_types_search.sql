CREATE OR REPLACE FUNCTION usr.f_n_s_special_access_user_types_search (
  p_special_access_user_types_ids integer [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_special_access_user_types refcursor
)
RETURNS record AS
$body$
BEGIN
  -- �������� �� �����������
  IF ( p_start_index IS NULL AND p_page_size IS NOT NULL ) OR (p_start_index IS NOT NULL AND p_page_size IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- 
  IF (p_special_access_user_types_ids IS NOT NULL)
  THEN
    IF (p_calculate_count)
    THEN
      
      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t
      WHERE t.user_type_id = ANY (p_special_access_user_types_ids);
        
              
    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    WHERE t.user_type_id = ANY (p_special_access_user_types_ids)
    ORDER BY t.user_type_id
    LIMIT p_page_size
    OFFSET p_start_index - 1;  
    

  ELSE -- p_permission_ids IS NULL 
    IF (p_calculate_count)
    THEN

      SELECT COUNT(*)
      INTO p_count
      FROM usr.n_s_special_access_user_types t;

    END IF;

    OPEN p_ref_special_access_user_types FOR
    SELECT t.*
    FROM usr.n_s_special_access_user_types t
    ORDER BY t.user_type_id
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

COMMENT ON FUNCTION usr.f_n_s_special_access_user_types_search(p_special_access_user_types_ids integer [], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_special_access_user_types refcursor)
IS '��������� ����� ������ � �������� ������ ���������� ��� ��������� ������, ���������� �� ���������� ��������. �������� � ����� ���� �� �� ����������.
��� �������� ������ ���������: 
 - p_special_access_user_types_ids integer [] - ����� �� �������� �������������� �� ������ ������ ���������� ��� ��������� ������, ��� ���������� �� ���������� � NULL �� �� ������� ������ 
 - p_start_index integer - ������ �� ������ ������� �� ����������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_page_size integer - ���� ������ �� ��������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_calculate_count boolean - ���� ���� �� �� ��������� ����� ���� �� ��������
��������� ����� record ��: 
 - out p_count integer - ��� ���� ������, ���������� �� ����������, ���������� �� ����������� �� ������������ 
 - out p_ref_special_access_user_types refcursor - ������ � ����� ���������� �� ���������� � ����������� �� ������������';
