CREATE OR REPLACE FUNCTION sys.f_service_operations_update (
  p_service_operation_id bigint,
  p_operation_id varchar,
  p_type sys.enum_operation_type,
  p_is_completed boolean,
  p_result varchar,
  p_next_ops varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_service_operation_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE sys.service_operations
  SET
  	operation_id = p_operation_id,
  	type = p_type,
    is_completed = p_is_completed,
    result = p_result,
    next_ops = p_next_ops,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE service_operation_id = p_service_operation_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

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
