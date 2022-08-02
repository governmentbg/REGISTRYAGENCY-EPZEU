CREATE OR REPLACE FUNCTION nom.f_s_application_types_i18n_create (
  p_id smallint,
  p_language_id integer,
  p_name varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_id IS NULL OR 
     p_language_id IS NULL OR
     p_name IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.s_application_types_i18n
  (
    id,
	language_id,
    name,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_id,
    p_language_id,
    p_name,
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
