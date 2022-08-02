CREATE OR REPLACE FUNCTION sys.f_service_operations_update (
  p_service_operation_id bigint,
  p_operation_id varchar,
  p_operation_type_id smallint,
  p_is_completed boolean,
  p_result varchar,
  p_next_ops varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_service_operation_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  UPDATE sys.service_operations 
  SET 
  	operation_id = p_operation_id,
  	operation_type_id = p_operation_type_id,
    is_completed = p_is_completed,
    result = p_result,
    next_ops = p_next_ops,
    updated_by = v_user_id,
    updated_on = sys.f_current_timestamp()
  WHERE service_operation_id = p_service_operation_id;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION sys.f_service_operations_update (p_service_operation_id bigint, p_operation_id varchar, p_operation_type_id smallint, p_is_completed boolean, p_result varchar, p_next_ops varchar)
  OWNER TO epzeu_dev;