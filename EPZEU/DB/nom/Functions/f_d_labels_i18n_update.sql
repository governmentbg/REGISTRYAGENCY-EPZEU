CREATE OR REPLACE FUNCTION nom.f_d_labels_i18n_update (
  p_label_id integer,
  p_language_id integer,
  p_value varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF p_label_id IS NULL
     OR p_value IS NULL
     OR p_language_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

 UPDATE nom.d_labels_i18n
    SET
      label_ver_id = nom.f_labels_get_last_version(p_label_id),
      value = p_value,
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp()
    WHERE label_id = p_label_id
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
