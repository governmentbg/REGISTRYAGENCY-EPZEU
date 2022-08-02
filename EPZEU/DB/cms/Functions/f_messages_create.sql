CREATE OR REPLACE FUNCTION cms.f_messages_create (
  p_about varchar,
  p_content text,
  p_is_to_all_cr boolean,
  p_is_to_all_pr boolean,
  p_is_to_all_epzeu boolean,
  out p_message_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_about IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- създаване на запис за съобщение
  INSERT INTO cms.messages
  (
    about,
    content,
    status,
    is_to_all_cr,
    is_to_all_pr,
    is_to_all_epzeu,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_about,
    p_content,
    0,
    p_is_to_all_cr,
    p_is_to_all_pr,
    p_is_to_all_epzeu,
    v_user_id,
    sys.f_current_timestamp(),
    v_user_id,
    sys.f_current_timestamp()
  )
  RETURNING message_id INTO p_message_id;
 
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
