CREATE OR REPLACE FUNCTION public.f_data_service_limits_update (
  p_service_limit_id integer,
  p_service_code varchar,
  p_service_name varchar,
  p_module_id smallint,
  p_requests_interval interval,
  p_requests_number integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_count       INTEGER;
  v_user_id     INTEGER;
  v_service_limit_ver_id INTEGER;
  
BEGIN

  -- ѕроверка за невалидни вход€щи параметри
  IF p_service_limit_id  IS NULL OR
     p_service_code      IS NULL OR 
     p_service_name      IS NULL OR
     p_module_id         IS NULL OR
     p_requests_interval IS NULL OR
     p_requests_number   IS NULL OR
     p_status            IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- определ€не на верси€
  v_service_limit_ver_id := f_get_next_version_id(); 
  
  -- деактивиране на последната верси€
  UPDATE public.data_service_limits
    SET 
      is_last = 0::bit,
      deactivation_ver_id = v_service_limit_ver_id,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE service_limit_id = p_service_limit_id
      AND is_last = 1::bit             -- последната верси€
      AND deactivation_ver_id IS NULL; -- последната верси€ не е деактивирана
  
  -- проверка за наличие на една последна активна верси€
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
  -- създаване на нова верси€ 
  INSERT INTO public.data_service_limits (
    service_limit_id,
    service_limit_ver_id,
    service_code,
    service_name,
    module_id,
    requests_interval,
    requests_number,
    status,
    is_last,
    deactivation_ver_id,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_service_limit_id,
    v_service_limit_ver_id,
    p_service_code,
    p_service_name,
    p_module_id,
    p_requests_interval,
    p_requests_number,
    p_status,
    1::bit,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
