CREATE OR REPLACE FUNCTION nom.f_d_iisda_services_create (
  p_iisda_service_id integer,
  p_service_number integer,
  p_name varchar,
  p_description varchar,
  p_read_date timestamptz,
  p_is_discontinued boolean,
  p_has_epayment boolean,
  p_short_description varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR 
       p_read_date IS NULL OR p_service_number IS NULL OR p_short_description IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO nom.d_iisda_services(
    iisda_service_id,
    service_number,
    name,
    description,
    read_date,
    is_discontinued,
    created_by,
    created_on,
    updated_by,
    updated_on,
    has_epayment,
    short_description
  )
  VALUES (
    p_iisda_service_id,
    p_service_number,
    p_name,
    p_description,
    p_read_date,
    p_is_discontinued,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    p_has_epayment,
    p_short_description
  );

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;