CREATE OR REPLACE FUNCTION nom.f_d_service_update (
  p_service_id integer,
  p_register_id smallint,
  p_iisda_service_id integer,
  p_app_type_id smallint,
  p_service_type_ids smallint [],
  p_payment_type_ids smallint [],
  p_status_date timestamptz,
  p_status integer,
  p_name varchar,
  p_description varchar,
  p_short_description varchar,
  p_is_adm boolean,
  p_pending_status_date timestamptz,
  p_pending_status integer
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- Проверка за невалидни входящи параметри
  IF p_service_id IS NULL OR
     p_register_id IS NULL OR
     (p_iisda_service_id IS NULL AND (p_name IS NULL OR p_description IS NULL OR p_short_description IS NULL)) OR
     p_app_type_id  IS NULL OR
     p_service_type_ids IS NULL OR
     p_status_date IS NULL OR
     p_status IS NULL OR 
     p_is_adm IS NULL OR
     (p_pending_status IS NOT NULL AND p_pending_status_date IS NULL) OR
     (p_pending_status IS NULL     AND p_pending_status_date IS NOT NULL) OR
     (p_status = -1 AND p_pending_status != 0 )     
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();

  -- Проверка дали услугата вече е добавена
  IF (p_iisda_service_id IS NOT NULL)
  THEN
    SELECT COUNT(1)
      INTO v_count
      FROM nom.d_services d
     WHERE d.iisda_service_id = p_iisda_service_id
       AND d.service_id != p_service_id;
      
    IF v_count > 0
    THEN
      PERFORM sys.f_raise_excp(14);
    END IF;
  END IF;
  
  
  -- Проверка дали е вече избраното заявление се използва от друга услуга
  SELECT COUNT(1)
    INTO v_count
    FROM nom.d_services d
   WHERE d.app_type_id = p_app_type_id
     AND d.service_id != p_service_id;
    
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(5);
  END IF;
  
  -- update-ва
  UPDATE nom.d_services s
     SET register_id       = p_register_id,
         iisda_service_id  = p_iisda_service_id,
         app_type_id       = p_app_type_id,
         service_type_ids  = p_service_type_ids,
         payment_type_ids  = p_payment_type_ids,
         status_date       = p_status_date,
         status            = p_status,
         updated_by        = v_user_id,
         updated_on        = sys.f_current_timestamp(),
         name              = p_name,
         description       = p_description,
         short_description = p_short_description,
         is_adm            = p_is_adm,
         pending_status_date = p_pending_status_date,
         pending_status      = p_pending_status
   WHERE s.service_id = p_service_id;

  GET DIAGNOSTICS v_count = ROW_COUNT;
  
  -- Проверка дали е редактиран точно един запис
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
