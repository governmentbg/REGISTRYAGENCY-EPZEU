CREATE OR REPLACE FUNCTION cms.f_themes_comments_status_update (
  p_theme_comment_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_is_first BOOLEAN := FALSE;
  v_theme_id INTEGER;
  v_user_id INTEGER;
BEGIN
  -- �������� �� ��������� ������� ���������
  IF  p_theme_comment_id IS NULL OR 
      p_status IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- ���������� �� ����� ����������
  v_user_id := sys.f_currentuser_get();

  UPDATE cms.themes_comments 
     SET status     = p_status, 
         updated_by = v_user_id,
         updated_on = sys.f_current_timestamp()
   WHERE theme_comment_id = p_theme_comment_id
     AND status != p_status
  RETURNING is_first, theme_id INTO v_is_first, v_theme_id;
     
  IF v_is_first THEN
     UPDATE cms.themes
        SET status     = p_status,
            updated_by = v_user_id,
            updated_on = sys.f_current_timestamp()
      WHERE theme_id = v_theme_id;  
        
      IF p_status  = 0 THEN 
         /* ��� ��������� �� ����� �������� �� ���������� ��������� ����������� ������� ������ �������� 
            ��������� �� ������ �� �����������*/ 
         UPDATE cms.themes_comments 
            SET status     = p_status,
                updated_by = v_user_id,
                updated_on = sys.f_current_timestamp()
          WHERE theme_id = v_theme_id
            AND theme_comment_id != p_theme_comment_id
            AND status != p_status;
      END IF;
          
  END IF;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
