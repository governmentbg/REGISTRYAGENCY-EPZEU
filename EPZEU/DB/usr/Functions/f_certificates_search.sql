CREATE OR REPLACE FUNCTION usr.f_certificates_search (
  p_certificate_ids integer [],
  p_cert_hash varchar,
  p_cert_sernum varchar,
  p_load_content boolean,
  out p_ref_certificates refcursor
)
RETURNS refcursor AS
$body$
DECLARE
  v_stmt       TEXT;
BEGIN

  -- Проверка за невалидни входящи параметри
  IF (p_certificate_ids IS NULL AND p_cert_hash IS NULL AND p_cert_sernum IS NULL) OR
     (p_certificate_ids IS NOT NULL AND p_cert_hash IS NOT NULL AND p_cert_sernum IS NOT NULL)
  THEN
    PERFORM sys.f_raise_excp_invalid_params();
  END IF;
  
  v_stmt := 'SELECT 
      certificate_id, 
      serial_number,
      issuer,
      subject,
      not_after,
      not_before,
      cert_hash,
      CASE 
      	WHEN $1 THEN c.content 
      	ELSE null 
        END as content,
      created_by,
      created_on
    FROM usr.certificates c
    WHERE ';
    
  IF p_certificate_ids IS NOT NULL
  THEN
    v_stmt := v_stmt || ' c.certificate_id = ANY ($2) 
    ';
  END IF;
  
  IF p_cert_hash IS NOT NULL
  THEN
    v_stmt := v_stmt || ' c.cert_hash = $3
    ';
  END IF;
  
  IF p_cert_sernum IS NOT NULL
  THEN
    v_stmt := v_stmt || ' c.serial_number = $4
    ';
  END IF;
  
  
  OPEN p_ref_certificates FOR EXECUTE v_stmt
  USING p_load_content, p_certificate_ids, p_cert_hash, p_cert_sernum; 

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION usr.f_certificates_search (p_certificate_ids integer [], p_cert_hash varchar, p_cert_sernum varchar, p_load_content boolean, out p_ref_certificates refcursor)
  OWNER TO epzeu_dev;