CREATE OR REPLACE FUNCTION nom.f_d_languages_create (
  p_code varchar,
  p_name varchar,
  p_is_active boolean,
  out p_language_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_code IS NULL
  	OR p_name IS NULL
    OR p_is_active IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.d_languages
  (
    code,
    name,
    is_active,
    created_by,
    created_on,
    updated_by,
    updated_on,
    is_default
  )
  VALUES
  (
    p_code,
    p_name,
    p_is_active,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp(),
    false
  )
  RETURNING language_id
    INTO p_language_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
