CREATE OR REPLACE FUNCTION sys.f_service_operations_search (
  p_service_operation_id bigint,
  p_operation_id varchar,
  p_operation_type_id smallint,
  out ref_service_operations refcursor
)
RETURNS refcursor AS
$body$
DECLARE
  v_stmt TEXT; 
BEGIN
  IF p_service_operation_id IS NULL AND p_operation_id IS NULL AND p_operation_type_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  v_stmt := '
  SELECT *   
  FROM sys.service_operations so
  WHERE 1=1 ';

  IF (p_service_operation_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    AND so.service_operation_id = $1 ';
  END IF;

  IF (p_operation_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    AND so.operation_id = $2 ';
  END IF;
  
  IF (p_operation_type_id IS NOT NULL)
    THEN
    v_stmt := v_stmt || ' 
    AND so.operation_type_id = $3 ';
  END IF;
  
  OPEN ref_service_operations FOR EXECUTE v_stmt
  USING p_service_operation_id, p_operation_id, p_operation_type_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION sys.f_service_operations_search (p_service_operation_id bigint, p_operation_id varchar, p_operation_type_id smallint, out ref_service_operations refcursor)
  OWNER TO epzeu_dev;