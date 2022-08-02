CREATE OR REPLACE FUNCTION nom.f_s_application_types_i18n_update (
  p_id smallint,
  p_language_id integer,
  p_name varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_id IS NULL OR
     p_language_id IS NULL OR
     p_name IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

 UPDATE nom.s_application_types_i18n 
    SET name  = p_name,
        updated_by = v_user_id,
        updated_on = sys.f_current_timestamp()
  WHERE id = p_id
    AND language_id = p_language_id;
    
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
