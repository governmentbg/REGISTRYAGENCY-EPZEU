CREATE OR REPLACE FUNCTION usr.f_user_processes_create (
  p_process_guid varchar,
  p_process_type integer,
  p_user_id integer,
  p_invalid_after timestamptz,
  out p_process_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_process_guid IS NULL OR p_process_type IS NULL OR p_user_id IS NULL OR p_invalid_after IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- деактивиране на неприключили процеси за потребителя от същия тип
  UPDATE usr.user_processes p
  SET status     = 2, -- Отказан
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
  WHERE p.user_id = p_user_id
    AND p.process_type = p_process_type
    AND p.status = 0;

  -- създаване на запис 
  INSERT INTO usr.user_processes(
    process_guid,
    process_type,
    user_id,
    invalid_after,
    status,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_process_guid,
    p_process_type,
    p_user_id,
    p_invalid_after,
    0, -- Неприключил
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING process_id INTO p_process_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
