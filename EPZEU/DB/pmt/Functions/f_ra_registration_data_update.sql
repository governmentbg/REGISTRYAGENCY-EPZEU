CREATE OR REPLACE FUNCTION pmt.f_ra_registration_data_update (
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
 v_count       INTEGER;

BEGIN

  -- ѕроверка за невалидни вход€щи параметри
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

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();
  
  -- пром€на на запис
  UPDATE pmt.ra_registration_data 
  SET 
    cin             = p_cin,
    email           = p_email,
    secret_word     = p_secret_word,
    validity_period = p_validity_period,
    url             = p_url, 
    url_response    = p_url_response,
    url_services    = p_url_services,
    updated_by      = v_user_id,
	updated_on      = sys.f_current_timestamp()
  WHERE 
    type = p_type; 

  GET DIAGNOSTICS v_count = ROW_COUNT;

  -- ѕроверка дали е редактиран точно един запис
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
