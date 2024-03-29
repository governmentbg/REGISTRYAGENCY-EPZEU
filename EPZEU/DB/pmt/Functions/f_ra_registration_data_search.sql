CREATE OR REPLACE FUNCTION pmt.f_ra_registration_data_search (
  p_type integer,
  out p_registration_data refcursor
)
RETURNS refcursor AS
$body$
BEGIN

  OPEN p_registration_data FOR
  SELECT 
    cin,
    email,
    secret_word,
    validity_period,
    url,
    url_response, 
    url_services, 
    updated_by,
    updated_on
  FROM pmt.ra_registration_data
  WHERE type = p_type; 
    
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
