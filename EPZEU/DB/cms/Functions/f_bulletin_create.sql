CREATE OR REPLACE FUNCTION cms.f_bulletin_create (
  p_date_from timestamptz,
  p_date_to timestamptz,
  p_temp_doc_id uuid,
  out p_billetin_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
  
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_date_from IS NULL  OR p_date_to IS NULL OR p_temp_doc_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
    
  -- изтриване на временните документи и запис в оригиналната таблица
  WITH temp_docs AS (
    DELETE FROM sys.document_data_temp tmp
    WHERE tmp.document_id = p_temp_doc_id
    RETURNING tmp.file_name, tmp.file_size, tmp.content_type, tmp.content
  ),
  orig_docs AS (
    INSERT INTO cms.bulletins( 
      date_from, date_to, status, 
      file_name, file_size, content_type, content, 
      created_by, created_on, updated_by, updated_on
    )
    SELECT p_date_from, p_date_to, 0, 
           temp_docs.file_name, temp_docs.file_size, temp_docs.content_type, temp_docs.content,
           v_user_id, sys.f_current_timestamp(), v_user_id, sys.f_current_timestamp()
    FROM temp_docs
    RETURNING bulletin_id)
  SELECT bulletin_id INTO p_billetin_id
  FROM orig_docs;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

