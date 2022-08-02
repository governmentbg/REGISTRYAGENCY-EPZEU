CREATE OR REPLACE FUNCTION cms.f_bulletin_status_update (
  p_bulletin_id integer,
  p_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id   INTEGER;
  v_count     INTEGER;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF p_bulletin_id IS NULL OR p_status IS NULL 
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
    -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  IF (p_status = 1 ) THEN
  
      SELECT COUNT(1)
        INTO v_count
        FROM cms.bulletins b1,cms.bulletins b2
       WHERE (b2.date_from between b1.date_from and b1.date_to OR 
              b2.date_to between b1.date_from and b1.date_to  OR
              b1.date_from between b2.date_from and b2.date_to OR
              b1.date_to between b2.date_from and b2.date_to  )
         AND b1.status = 1
         AND b1.bulletin_id != b2.bulletin_id
         AND b2.bulletin_id = p_bulletin_id; 
        
      -- Проверка дали е вече съществува публикуван бюлетин за този период
      IF v_count > 0
      THEN
        PERFORM sys.f_raise_excp(11);
      END IF;
  END IF;
  
  -- промяна на статус на бюлетин 
  UPDATE cms.bulletins b
     SET status            = p_status,
         updated_by        = v_user_id,
         updated_on        = sys.f_current_timestamp()
   WHERE bulletin_id = p_bulletin_id;
  
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
