CREATE OR REPLACE FUNCTION usr.f_user_access_request_docs_create (
  p_request_id integer,
  p_name varchar,
  p_file_size integer,
  p_content_type varchar,
  p_content bytea,
  out p_doc_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_request_id IS NULL OR p_name IS NULL OR p_file_size IS NULL OR p_content_type IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис 
  INSERT INTO usr.user_access_request_docs(
    request_id,
    name,
    file_size, 
    content_type,
    content,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_request_id,
    p_name,
    p_file_size, 
    p_content_type,
    p_content,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING doc_id into p_doc_id;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_access_request_docs_create(p_request_id integer, p_name varchar, p_file_size integer, p_content_type varchar, p_content bytea, out p_doc_id integer)
IS 'Функция за създаване на запис за документ за специален достъп';
