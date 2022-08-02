CREATE OR REPLACE FUNCTION public.f_data_service_user_limits_status_update (
  p_service_limit_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_user_limit_ver_id INTEGER;

BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_service_limit_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- определяне на версия
  v_user_limit_ver_id := f_get_next_version_id();

  -- създаване на версии за променените записи
  WITH upd AS (
    UPDATE public.data_service_user_limits
      SET
        is_last = 0::bit,
        deactivation_ver_id = v_user_limit_ver_id,
        updated_by = v_user_id,
        updated_on = sys.f_current_timestamp()
      WHERE service_limit_id = p_service_limit_id
        AND is_last = 1::bit             -- последната версия
        AND deactivation_ver_id IS NULL  -- последната версия не е деактивирана
        AND status != p_status
      RETURNING *
  )
  INSERT INTO public.data_service_user_limits (
    user_limit_id,
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
  SELECT
    user_limit_id,
    v_user_limit_ver_id,
    service_limit_id,
    public.f_data_service_limits_get_last_version(service_limit_id),
    user_id,
    requests_interval,
    requests_number,
    p_status,
    1::bit,
    NULL,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  FROM  upd;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
