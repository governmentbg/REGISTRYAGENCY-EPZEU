-- FUNCTION: cms.f_messages_send(integer)

-- DROP FUNCTION cms.f_messages_send(integer);

CREATE OR REPLACE FUNCTION cms.f_messages_send(
	p_message_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
AS $BODY$DECLARE
  v_email_id        INTEGER;
  v_user_id         INTEGER;
  v_count           INTEGER;
  v_about           VARCHAR(500);
  v_content         TEXT;
  v_is_to_all_cr    BOOLEAN;
  v_is_to_all_pr    BOOLEAN;
  v_is_to_all_epzeu BOOLEAN;
  rec               RECORD;  
  v_recipient       eml.email_recipient;
  v_recipients      eml.email_recipient[];
  v_operation_id	VARCHAR(64);
BEGIN
    -- Проверка за невалидни входящи параметри
     IF p_message_id IS NULL
     THEN
       PERFORM sys.f_raise_excp_invalid_params();
     END IF;
    
    -- определяне на текущ потребител
    v_user_id := sys.f_currentuser_get();
	v_operation_id := cast(uuid_generate_v1() as character varying(64));
	
    -- Промяна на статуса на съобщението
    UPDATE cms.messages
    SET status      = 1,
        updated_by  = v_user_id,
        updated_on  = sys.f_current_timestamp()
    WHERE message_id = p_message_id
      AND status = 0
    RETURNING about, content, COALESCE(is_to_all_cr, FALSE), COALESCE(is_to_all_pr,FALSE), COALESCE(is_to_all_epzeu, FALSE)
      INTO v_about,v_content,v_is_to_all_cr,v_is_to_all_pr,v_is_to_all_epzeu;
   
   GET DIAGNOSTICS v_count = ROW_COUNT;

   -- Проверка дали е редактиван точно един запис
   IF v_count != 1
   THEN
      PERFORM sys.f_raise_excp_invalid_affected_rows();
   END IF;
   
   --delete from cms.test;
   
   CASE 
   WHEN( v_is_to_all_cr = FALSE AND v_is_to_all_pr = FALSE AND v_is_to_all_epzeu = FALSE) 
   THEN
        -- В случайте, когато са избрани конкретни потребители
        FOR rec IN  SELECT u.user_id, 
                           u.first_name,
                           u.family_name,
                           u.email
                      FROM cms.message_recipients mr,
                           usr.users u
                     WHERE mr.message_id = p_message_id 
                       AND u.user_id = mr.user_id
                       AND u.status = 1
                       AND (u.cr_message_acceptance OR u.pr_message_acceptance OR u.epzeu_message_acceptance) 
        LOOP
           v_recipient.address = rec.email;
           --v_recipient.display_name = rec.first_name;
           v_recipient.type = 1;
           v_recipients[1] = v_recipient;
                

           v_email_id = eml.f_emails_create(1::SMALLINT, 10::SMALLINT, 'АВ-ЕПЗЕУ: ' || v_about, v_content, TRUE, 'public',  v_recipients, v_operation_id);
           --insert into cms.test(email) VALUES (v_email_id);
        END LOOP;
        
   WHEN ( v_is_to_all_cr::INTEGER + v_is_to_all_pr ::INTEGER + v_is_to_all_epzeu::INTEGER IN (1, 2))
   THEN
        -- В случайте, когато е избран конкретен регистър
        FOR rec IN  SELECT u.user_id, 
                           u.first_name,
                           u.family_name,
                           u.email
                      FROM usr.users u
                     WHERE u.status = 1
                       AND ((v_is_to_all_cr AND u.cr_message_acceptance) OR                
                            (v_is_to_all_epzeu AND u.epzeu_message_acceptance) OR
                            (v_is_to_all_pr AND u.pr_message_acceptance))
        LOOP
           v_recipient.address = rec.email;
           --v_recipient.display_name = rec.first_name;
           v_recipient.type = 1;
           v_recipients[1] = v_recipient;
                  
           v_email_id = eml.f_emails_create(1::SMALLINT, 10::SMALLINT, 'АВ-ЕПЗЕУ: ' || v_about, v_content, TRUE, 'public',  v_recipients, v_operation_id);
          -- insert into cms.test(email) VALUES (v_email_id);
        END LOOP;
    
   WHEN ( v_is_to_all_cr::INTEGER + v_is_to_all_pr ::INTEGER + v_is_to_all_epzeu::INTEGER = 3)
   THEN
      -- В случайте, когато се изпраща до всички
      FOR rec IN  SELECT u.user_id, 
                         u.first_name,
                         u.family_name,
                         u.email
                    FROM usr.users u
                   WHERE u.status = 1
                     AND (u.cr_message_acceptance OR u.pr_message_acceptance OR u.epzeu_message_acceptance) 
      LOOP
         v_recipient.address = rec.email;
        -- v_recipient.display_name = rec.first_name;
         v_recipient.type = 1;
         v_recipients[1] = v_recipient;
                
         v_email_id = eml.f_emails_create(1::SMALLINT, 10::SMALLINT, 'АВ-ЕПЗЕУ: ' || v_about, v_content, TRUE, 'public',  v_recipients, v_operation_id);
      END LOOP;
      
    END CASE;

END;
$BODY$;

ALTER FUNCTION cms.f_messages_send(integer)
    OWNER TO epzeu_dev;
