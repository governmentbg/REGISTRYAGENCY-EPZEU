CREATE OR REPLACE FUNCTION nom.f_s_document_template_fields_search (
  p_keys varchar [],
  p_start_index integer,
  p_page_size integer,
  p_calculate_count boolean,
  out p_count integer,
  out p_ref_template_fields refcursor
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
  IF (p_keys IS NOT NULL)
  THEN
      IF p_calculate_count
      THEN

        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t
        WHERE t.key = ANY (p_keys);

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      WHERE t.key = ANY (p_keys)
      ORDER BY t.key
      LIMIT p_page_size
      OFFSET p_start_index - 1;  

  ELSE
    IF p_calculate_count
      THEN
        SELECT COUNT(*)
        INTO p_count
        FROM nom.s_document_template_fields t;

      END IF;

      OPEN p_ref_template_fields FOR
      SELECT t.*
      FROM nom.s_document_template_fields t
      ORDER BY t.key
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

COMMENT ON FUNCTION nom.f_s_document_template_fields_search(p_keys varchar [], p_start_index integer, p_page_size integer, p_calculate_count boolean, out p_count integer, out p_ref_template_fields refcursor)
IS '��������� ����� ������ � ��������� ������ �� ������� �� ���������, ���������� �� ���������� ��������. �������� ���� �� �� ����������.
��� �������� ������ ���������: 
 - p_keys varchar [] - ����� �� ������� �� ������� ������, ��� ���������� �� ���������� � NULL �� �� ������� ������ 
 - p_start_index integer - ������ �� ������ ������� �� ����������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_page_size integer - ���� ������ �� ��������, ��� ��� ������������, � �������� ������ ���������� ������ �� � NULL
 - p_calculate_count boolean - ���� ���� �� �� ��������� ����� ���� �� ��������

��������� ����� record ��: 
 - out p_count integer - ��� ���� ������, ���������� �� ����������, ���������� �� ����������� �� ������������ 
 - out p_ref_template_fields refcursor - ������ � ����� ���������� �� ���������� � ����������� �� ������������';
