CREATE OR REPLACE FUNCTION pmt.f_n_s_ra_account_purposes_search (
  p_purpose_ids integer [],
  out ref_account_purposes refcursor
)
RETURNS refcursor AS
$body$
BEGIN

  IF (p_purpose_ids IS NOT NULL)
  THEN
    OPEN ref_account_purposes FOR
    SELECT p.*
    FROM pmt.n_s_ra_account_purposes p
    WHERE p.purpose_id = ANY (p_purpose_ids)
    ORDER BY p.purpose_id ;

  ELSE
    OPEN ref_account_purposes FOR
    SELECT p.*
    FROM pmt.n_s_ra_account_purposes p
    ORDER BY p.purpose_id ;

  END IF;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
