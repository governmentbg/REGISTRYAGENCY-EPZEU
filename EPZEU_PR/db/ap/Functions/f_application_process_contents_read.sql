CREATE OR REPLACE FUNCTION ap.f_application_process_contents_read (
  p_application_process_content_id bigint
)
RETURNS bytea AS
$body$
DECLARE
	ref refcursor;
BEGIN
-- 	OPEN ref FOR 
	return (SELECT 
		apc.content
	FROM ap.application_process_contents apc
	WHERE apc.application_process_content_id = p_application_process_content_id);
	
-- 	return ref;
END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;
