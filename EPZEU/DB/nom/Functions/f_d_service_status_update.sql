CREATE OR REPLACE FUNCTION nom.f_d_service_status_update (
  p_service_id integer,
  p_status_date timestamptz,
  p_status integer,
  p_pending_status_date timestamptz,
  p_pending_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_service_id IS NULL OR
     (p_pending_status IS NOT NULL AND p_pending_status_date IS NULL) OR
     (p_pending_status IS NULL     AND p_pending_status_date IS NOT NULL) OR
     (p_status = -1 AND p_pending_status != 0 ) OR 
     (p_status =  0 AND p_pending_status != 1 ) OR  
     (p_status =  1 AND p_pending_status != 0 )   
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- update на статусите
  UPDATE nom.d_services s
     SET status_date       = p_status_date,
         status            = p_status,
         pending_status_date = p_pending_status_date,
         pending_status      = p_pending_status,
         updated_by        = v_user_id,
         updated_on        = sys.f_current_timestamp()
  WHERE s.service_id = p_service_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  -- Проверка дали е редактиран точно един запис
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
