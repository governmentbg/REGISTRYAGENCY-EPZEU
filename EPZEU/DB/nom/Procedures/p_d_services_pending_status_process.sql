-- PROCEDURE: nom.p_d_services_pending_status_process()

-- DROP PROCEDURE nom.p_d_services_pending_status_process();

CREATE OR REPLACE PROCEDURE nom.p_d_services_pending_status_process(
	)
LANGUAGE 'plpgsql'

AS $BODY$DECLARE
  v_rec RECORD;
  --
  v_succeeded    INTEGER := 0;
  v_failed_count INTEGER := 0;
  --
  v_err_state   TEXT;
  v_err_message TEXT;
  v_err_detail  TEXT;
  v_err_hint    TEXT;
  v_err_context TEXT;
  v_exception_message TEXT := ''; -- не трябва да е NULL
	
 BEGIN
   
  PERFORM sys.f_currentuser_set(1); -- след ROLLBACK на транзакцията се губи стойността
  COMMIT;
  -- If SET is issued within a transaction that is later aborted, the effects of the SET command disappear when the transaction is rolled back. 
  -- Once the surrounding transaction is committed, the effects will persist until the end of the session, unless overridden by another SET.
  
   
   FOR v_rec IN
     SELECT s.service_id, s.pending_status, s.pending_status_date
     FROM nom.d_services s
     WHERE s.pending_status_date IS NOT NULL
       AND s.pending_status_date <= sys.f_current_timestamp()
	 ORDER BY s.pending_status_date, s.service_id   
	 FOR UPDATE SKIP LOCKED
   LOOP	   
     v_succeeded := 0; 
     BEGIN
      
	   PERFORM nom.f_d_service_status_update( 
		   v_rec.service_id, 
		   v_rec.pending_status_date, 
		   v_rec.pending_status,
		   NULL::timestamptz,
		   NULL::integer
		);   
       
	   v_succeeded := 1;
    
     EXCEPTION 
       WHEN OTHERS THEN   
	     GET STACKED DIAGNOSTICS
           v_err_state   = returned_sqlstate,
           v_err_message = message_text,
           v_err_detail  = pg_exception_detail,
           v_err_hint    = pg_exception_hint,
           v_err_context = pg_exception_context;
        
	     v_exception_message := v_exception_message || E'\n'   ||
                                'Exception for ID: ' || v_rec.service_id  || E'\n' ||
                                '  state  : ' || v_err_state   || E'\n' ||
                                '  message: ' || v_err_message || E'\n' ||
                                '  detail : ' || v_err_detail  || E'\n' ||
                                '  hint   : ' || v_err_hint    || E'\n'  ||
                                '  context: ' || v_err_context || E'\n';                          
	     v_succeeded := 2;
		 v_failed_count := v_failed_count + 1; 
    
      END;
	  
	  IF v_succeeded = 2 THEN
   	    ROLLBACK;
	  ELSE
	    COMMIT;
	  END IF;   
	  
   END LOOP;

   IF v_failed_count > 0 THEN
     RAISE EXCEPTION '%', v_exception_message;
   END IF;

END;$BODY$;

COMMENT ON PROCEDURE nom.p_d_services_pending_status_process
    IS 'Процедурата обработва статусите на услугите, зададени с бъдеща дата.';
