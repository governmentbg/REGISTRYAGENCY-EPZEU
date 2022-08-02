CREATE OR REPLACE FUNCTION cms.f_pages_update (
  p_page_id integer,
  p_title varchar,
  p_content text,
  p_file_name varchar,
  p_file_size integer,
  p_content_type varchar,
  p_file_content bytea
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_page_id IS NULL OR p_title IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE cms.pages p
  SET 
    title         = p_title,
    content       = p_content,
    file_name     = p_file_name,
    file_size     = p_file_size,
    content_type  = p_content_type,
    file_content  = p_file_content,
    updated_by    = v_user_id,
    updated_on    = sys.f_current_timestamp()
  WHERE p.page_id  = p_page_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
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
