CREATE OR REPLACE FUNCTION sys.f_service_operations_create (
  p_operation_id varchar,
  p_operation_type_id smallint,
  out p_service_operation_id_out bigint,
  out p_is_completed_out boolean,
  out p_result_out varchar,
  out p_next_ops varchar
)
RETURNS record AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_operation_id IS NULL   	
    OR p_operation_type_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  SELECT so.service_operation_id, so.is_completed, so.result, so.next_ops
  INTO p_service_operation_id_out, p_is_completed_out, p_result_out, p_next_ops
  FROM sys.service_operations so
  WHERE so.operation_id = p_operation_id and so.operation_type_id = p_operation_type_id;
  
  IF p_service_operation_id_out IS NULL
  THEN
    -- определяне на текущ потребител
    v_user_id := sys.f_currentuser_get();

  	-- създаване на запис
    INSERT INTO 
    sys.service_operations
    (
      operation_id,
      operation_type_id,      
      is_completed,   
      created_by,
      created_on,
      updated_by,
      updated_on
    )
    VALUES (
      p_operation_id,
      p_operation_type_id,
      false,     
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp()
    ) RETURNING service_operation_id
      INTO p_service_operation_id_out;
      
  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION sys.f_service_operations_create (p_operation_id varchar, p_operation_type_id smallint, out p_service_operation_id_out bigint, out p_is_completed_out boolean, out p_result_out varchar, out p_next_ops varchar)
  OWNER TO epzeu_dev;