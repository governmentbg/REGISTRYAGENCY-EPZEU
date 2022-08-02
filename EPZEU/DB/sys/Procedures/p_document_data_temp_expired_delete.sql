-- PROCEDURE: sys.p_document_data_temp_expired_delete()

-- DROP PROCEDURE sys.p_document_data_temp_expired_delete();

CREATE OR REPLACE PROCEDURE sys.p_document_data_temp_expired_delete(
	)
LANGUAGE 'plpgsql'

AS $BODY$DECLARE
  v_rowcount integer;
  v_limit    integer := 1000;

BEGIN 
  
  v_rowcount := 1; -- за първия LOOP
  
  WHILE v_rowcount > 0 
  LOOP	   
	  WITH deleted AS 
	  (DELETE FROM sys.document_data_temp d
       USING ( SELECT ddt.document_id
               FROM sys.document_data_temp ddt
               WHERE ddt.invalid_after <= sys.f_current_timestamp()
		       LIMIT v_limit
              ) for_delete
       WHERE  d.document_id = for_delete.document_id
	   RETURNING d.document_id)
	  SELECT COUNT(*) INTO v_rowcount 
	  FROM deleted;
    
	  COMMIT;
  
  END LOOP;
  
END;
$BODY$;

COMMENT ON PROCEDURE sys.p_document_data_temp_expired_delete
    IS 'Процедурата изтрива временните файлове с изтекъл период на валидност.';
