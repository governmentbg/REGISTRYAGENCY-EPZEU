CREATE OR REPLACE FUNCTION cms.f_message_recipients_delete (
  p_message_id integer,
  p_user_id integer
)
RETURNS void AS
$body$
DECLARE
   v_count INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_message_id IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  IF p_user_id IS NOT NULL 
  THEN
    -- изтриване на получател за дадено съобщение
    DELETE 
    FROM cms.message_recipients
    WHERE message_id = p_message_id
       AND user_id = p_user_id;
  
    GET DIAGNOSTICS v_count = ROW_COUNT;

    -- Проверка дали е изтрит точно един запис
    IF v_count != 1
    THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
    END IF;

  ELSE --  p_message_id IS NULL
     -- изтриване на всички получатели за дадено съобщение
     DELETE 
     FROM cms.message_recipients
     WHERE message_id = p_message_id;
  END IF;   
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;