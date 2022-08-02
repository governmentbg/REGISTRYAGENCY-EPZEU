CREATE OR REPLACE FUNCTION cms.f_messages_update (
  p_message_id integer,
  p_about varchar,
  p_content text,
  p_is_to_all_cr boolean,
  p_is_to_all_pr boolean,
  p_is_to_all_epzeu boolean
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
    
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_message_id IS NULL OR p_about IS NULL OR p_content IS NULL
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- промяна на запис за съобщение
  UPDATE cms.messages
  SET about           = p_about,
      content         = p_content,
      is_to_all_cr    = p_is_to_all_cr,
      is_to_all_pr    = p_is_to_all_pr,
      is_to_all_epzeu = p_is_to_all_epzeu,
      updated_by      = v_user_id,
      updated_on      = sys.f_current_timestamp()
  WHERE message_id = p_message_id
    AND status = 0;
 
 GET DIAGNOSTICS v_count = ROW_COUNT;

 -- Проверка дали е редактиван точно един запис
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
