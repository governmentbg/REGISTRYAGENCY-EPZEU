CREATE OR REPLACE FUNCTION nom.f_d_service_create (
  p_register_id smallint,
  p_iisda_service_id integer,
  p_app_type_id smallint,
  p_service_type_ids smallint [],
  p_payment_type_ids smallint [],
  p_status_date timestamptz,
  p_status integer,
  p_name varchar,
  p_description text,
  p_short_description varchar,
  p_is_adm boolean,
  p_pending_status_date timestamptz,
  p_pending_status integer,
  out p_service_id integer
)
RETURNS integer AS
$body$
DECLARE
  v_user_id     INTEGER;
  v_count       INTEGER;
  
BEGIN

  IF p_register_id IS NULL OR
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
     WHERE d.iisda_service_id = p_iisda_service_id;
      
    IF v_count > 0
    THEN
      PERFORM sys.f_raise_excp(14);
    END IF;
  END IF;

  -- Проверка дали е вече избраното заявление се използва от друга услуга
  SELECT COUNT(1)
    INTO v_count
    FROM nom.d_services d
   WHERE d.app_type_id = p_app_type_id;
  
  IF v_count > 0
  THEN
    PERFORM sys.f_raise_excp(5);
  END IF;
    
  -- създаване на запис
  INSERT INTO nom.d_services
     (register_id,
      iisda_service_id,
      app_type_id,
      service_type_ids,
      payment_type_ids,
      status_date,
      status,
      created_by,
      created_on,
      updated_by,
      updated_on,
      name,
      description,
      short_description,
      is_adm,
      pending_status_date,
      pending_status)
  VALUES 
    ( p_register_id,
      p_iisda_service_id,
      p_app_type_id,
      p_service_type_ids,
      p_payment_type_ids,
      p_status_date,
      p_status,
      v_user_id,
      sys.f_current_timestamp(),
      v_user_id,
      sys.f_current_timestamp(),
      p_name,
      p_description,
      p_short_description,
      p_is_adm,
      p_pending_status_date,
      p_pending_status)
  RETURNING service_id INTO p_service_id;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
