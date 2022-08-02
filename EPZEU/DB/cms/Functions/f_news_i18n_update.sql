CREATE OR REPLACE FUNCTION cms.f_news_i18n_update (
  p_news_id integer,
  p_language_id integer,
  p_title varchar,
  p_short_description varchar,
  p_description text
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF ( p_news_id IS NULL OR p_language_id IS NULL OR p_title IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  UPDATE cms.news_i18n
     SET title 	           = p_title,
         short_description = p_short_description,
         description       = p_description,
         updated_by        = v_user_id,
         updated_on        = sys.f_current_timestamp()
   WHERE news_id = p_news_id
  	 AND language_id = p_language_id;
    
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
