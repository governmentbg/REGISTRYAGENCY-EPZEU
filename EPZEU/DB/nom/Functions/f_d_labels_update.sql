CREATE OR REPLACE FUNCTION nom.f_d_labels_update (
  p_label_id integer,
  p_code varchar,
  p_value varchar,
  p_description varchar,
  out p_label_ver_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   NUMERIC;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_label_id IS NULL
     OR p_value IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

 -- определяне на версия
  p_label_ver_id = f_get_next_version_id(); 


  -- деактивиране на съществуващата последна версия
    UPDATE nom.d_labels
    SET
      updated_by = v_user_id,
      updated_on = sys.f_current_timestamp(),
      is_last = 0::bit,
      deactivation_ver_id = p_label_ver_id
    WHERE label_id = p_label_id
      AND is_last = 1::bit -- последна версия
      AND deactivation_ver_id IS NULL; -- версията не е деактивирана
    
    GET DIAGNOSTICS v_count = ROW_COUNT;
    -- Проверка дали е редактиран точно един запис
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;
    
    -- създаване на нова версия
    INSERT INTO nom.d_labels
      ( label_id, 
        label_ver_id,
        code,
        value,
        description,
        created_by,
        created_on,
        updated_by,
        updated_on,
        is_last,
        deactivation_ver_id
      )
    VALUES 
      ( p_label_id,
        p_label_ver_id,
        p_code,
        p_value,
        p_description,
        v_user_id,
        sys.f_current_timestamp(),
        v_user_id,
        sys.f_current_timestamp(),
        1::bit,
        NULL
      );
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
