CREATE OR REPLACE FUNCTION usr.f_user_access_requests_create (
  p_user_id integer,
  out p_request_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO usr.user_access_requests(  
       user_id,
       access_status,
       status_reason,
       processing_date,
       created_by,
       created_on,
       updated_by,
       updated_on
  )
  VALUES
  (
    p_user_id,
    0,
    NULL,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING request_id
    INTO p_request_id;



END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

COMMENT ON FUNCTION usr.f_user_access_requests_create(p_user_id integer, out p_request_id integer)
IS 'Създаване на искане за достъп.';
