CREATE OR REPLACE FUNCTION public.f_app_parameters_update (
  p_app_param_id integer,
  p_functionality_id integer,
  p_code varchar,
  p_description varchar,
  p_param_type integer,
  p_value_datetime timestamptz,
  p_value_interval interval,
  p_value_string text,
  p_value_int integer,
  p_value_hour time
)
RETURNS void AS
$body$
DECLARE
  v_count            INTEGER;
  v_user_id          INTEGER;
  v_app_param_ver_id INTEGER;
  
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_app_param_id      IS NULL OR
     p_functionality_id  IS NULL OR 
     p_code              IS NULL OR
     p_description       IS NULL OR
     p_param_type        IS NULL OR
     (p_value_datetime IS NULL AND p_value_interval IS NULL AND p_value_string IS NULL AND p_value_int IS NULL AND p_value_hour IS NULL )
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- определяне на версия
  v_app_param_ver_id := f_get_next_version_id(); 
  
  -- деактивиране на последната версия
  UPDATE public.app_parameters
     SET is_last = 0::bit,
         deactivation_ver_id = v_app_param_ver_id,
         updated_by = v_user_id,
         updated_on = sys.f_current_timestamp()
   WHERE app_param_id = p_app_param_id
     AND is_last = 1::bit             -- последната версия
     AND deactivation_ver_id IS NULL  -- последната версия не е деактивирана
     AND is_system = FALSE;           -- не е системен параметър
  
  -- проверка за наличие на една последна активна версия
  GET DIAGNOSTICS v_count = ROW_COUNT;

  IF v_count != 1
  THEN
    PERFORM sys.f_raise_excp_invalid_affected_rows();
  END IF;
  
  -- създаване на нова версия 
  INSERT INTO public.app_parameters (
    app_param_id,
    app_param_ver_id,
    functionality_id,
    code,
    description,
    is_system,
    is_last,
    deactivation_ver_id,
    created_by,
    created_on,
    updated_by,
    updated_on,
    param_type,
    value_datetime,
    value_interval,
    value_string,
    value_int,
    value_hour
  )
  VALUES (
    p_app_param_id,
    v_app_param_ver_id,
    p_functionality_id,
    p_code,
    p_description,
    FALSE,
    1::bit,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_param_type,
    p_value_datetime,
    p_value_interval,
    p_value_string,
    p_value_int,
    p_value_hour
  );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
