CREATE OR REPLACE FUNCTION public.f_data_service_user_limits_create (
  p_service_limit_id integer,
  p_user_id integer,
  p_requests_interval interval,
  p_requests_number integer,
  p_status integer,
  out p_user_limit_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_count       INTEGER;
  v_user_id     INTEGER;
  v_user_limit_ver_id INTEGER;
  
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_service_limit_id     IS NULL OR 
     p_user_id              IS NULL OR
     p_requests_interval    IS NULL OR
     p_requests_number      IS NULL OR
     p_status               IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- определяне на версия
  v_user_limit_ver_id := f_get_next_version_id(); 
  
  SELECT COUNT(1)
    INTO v_count
    FROM public.data_service_user_limits l
   WHERE l.service_limit_id = p_service_limit_id
     AND l.user_id = p_user_id
     AND l.is_last =  1::bit ;
    
  -- Проверка дали е за потребителя съществува лимит за услугата
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(6);
  END IF;
  
  -- създаване на първа версия 
  INSERT INTO public.data_service_user_limits (
    user_limit_ver_id,
    service_limit_id,
    service_limit_ver_id,
    user_id,
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
    v_user_limit_ver_id,
    p_service_limit_id,
    public.f_data_service_limits_get_last_version(p_service_limit_id),
    p_user_id,
    p_requests_interval,
    p_requests_number,
    p_status,
    1::bit,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING user_limit_id INTO p_user_limit_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
