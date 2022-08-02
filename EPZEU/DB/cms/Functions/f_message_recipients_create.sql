CREATE OR REPLACE FUNCTION cms.f_message_recipients_create (
  p_message_id integer,
  p_user_id integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_message_id IS NULL OR p_user_id IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис за новина
  INSERT INTO cms.message_recipients
  (
    message_id,
    user_id,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_message_id ,
    p_user_id,
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
