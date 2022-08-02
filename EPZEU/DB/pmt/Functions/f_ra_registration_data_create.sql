CREATE OR REPLACE FUNCTION pmt.f_ra_registration_data_create (
  p_type integer,
  p_cin varchar,
  p_email varchar,
  p_secret_word varchar,
  p_validity_period time,
  p_url varchar,
  p_url_response varchar,
  p_url_services varchar
)
RETURNS void AS
$body$
DECLARE
 v_user_id     INTEGER;

BEGIN

  IF p_type IS NULL OR 
     p_cin IS NULL OR 
     p_secret_word IS NULL OR 
     p_validity_period IS NULL OR
     p_url IS NULL OR
    (p_type = 1 AND p_email IS NULL) OR
    (p_type = 2 AND (p_url_response IS NULL OR p_url_services IS NULL))
  THEN
      PERFORM sys.f_raise_excp_invalid_params(); 
  END IF;

  -- определяне на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- създаване на запис
  INSERT INTO  pmt.ra_registration_data
  ( 
    type,
    cin,
    email,
    secret_word,
    validity_period,
    url, 
    url_response,
    url_services,
    created_by,
    created_on,
    updated_by,
    updated_on
  )
  VALUES (
    p_type, 
    p_cin,
    p_email,
    p_secret_word,
    p_validity_period,
    p_url, 
    p_url_response, 
    p_url_services,
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
