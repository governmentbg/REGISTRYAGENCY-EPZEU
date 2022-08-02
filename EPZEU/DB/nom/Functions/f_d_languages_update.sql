CREATE OR REPLACE FUNCTION nom.f_d_languages_update (
  p_language_id integer,
  p_code varchar,
  p_name varchar,
  p_is_active boolean
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_language_id IS NULL
     OR p_code IS NULL
     OR p_name IS NULL
     OR p_is_active IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- update-ва
  UPDATE nom.d_languages
  SET
  	code 		= p_code,
    name    	= p_name,
  	is_active  	= p_is_active,
    updated_by  = v_user_id,
    updated_on  = sys.f_current_timestamp()
  WHERE language_id = p_language_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
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
