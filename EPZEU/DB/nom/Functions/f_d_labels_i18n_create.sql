CREATE OR REPLACE FUNCTION nom.f_d_labels_i18n_create (
  p_label_id integer,
  p_language_id integer,
  p_value varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_label_id IS NULL
  	OR p_language_id IS NULL
    OR p_value IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO nom.d_labels_i18n
  (
    label_id,
	label_ver_id,
    language_id,
    value,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES
  (
    p_label_id,
    nom.f_labels_get_last_version(p_label_id),
    p_language_id,
    p_value,
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
