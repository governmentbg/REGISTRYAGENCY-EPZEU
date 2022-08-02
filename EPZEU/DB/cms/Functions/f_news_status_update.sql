CREATE OR REPLACE FUNCTION cms.f_news_status_update (
  p_news_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;

BEGIN

  -- �������� �� ��������� ������� ���������
  IF p_news_id IS NULL OR p_status IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
    -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  -- ������� �� ������ �� ������ 
  -- ������ �� ����������� �� ������� ���� ��� �������� � 1 - �����������
  UPDATE cms.news n
  SET status            = p_status,
      publication_date  = (CASE WHEN p_status = 1 THEN sys.f_current_timestamp() ELSE  publication_date END),
      updated_by        = v_user_id,
      updated_on        = sys.f_current_timestamp()
  WHERE news_id = p_news_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
