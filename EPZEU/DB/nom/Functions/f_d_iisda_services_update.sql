CREATE OR REPLACE FUNCTION nom.f_d_iisda_services_update (
  p_iisda_service_id integer,
  p_service_number integer,
  p_name varchar,
  p_description varchar,
  p_read_date timestamptz,
  p_is_discontinued boolean,
  p_has_epayment boolean,
  p_short_description varchar
)
RETURNS void AS
$body$
DECLARE
  v_user_id INTEGER;
  v_count   INTEGER;
BEGIN
  -- ѕроверка за невалидни вход€щи параметри
  IF ( p_iisda_service_id IS NULL OR p_name IS NULL OR p_description IS NULL OR 
       p_read_date IS NULL OR p_service_number IS NULL OR p_short_description IS NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;

  -- определ€не на текущ потребител
  v_user_id := sys.f_currentuser_get();

  UPDATE nom.d_iisda_services 
  SET  service_number = p_service_number,
       name 		= p_name,
       description  = p_description,
       read_date	= p_read_date,
       is_discontinued = p_is_discontinued,
       has_epayment = p_has_epayment,
       short_description = p_short_description,
       updated_by    = v_user_id,
       updated_on    = sys.f_current_timestamp()
  WHERE 
       iisda_service_id = p_iisda_service_id;
    
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