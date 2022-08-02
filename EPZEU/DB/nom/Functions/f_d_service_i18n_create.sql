CREATE OR REPLACE FUNCTION nom.f_d_service_i18n_create (
  p_service_id integer,
  p_language_id integer,
  p_name varchar,
  p_description varchar
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR p_language_id IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  INSERT INTO nom.d_services_i18n(
    service_id,
    language_id,
    name,
    description,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_service_id,
    p_language_id,
    p_name,
    p_description,
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
