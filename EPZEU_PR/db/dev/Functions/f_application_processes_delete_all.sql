CREATE OR REPLACE FUNCTION dev.f_application_processes_delete_all (
  p_application_processes bigint
)
RETURNS void AS
$body$
DECLARE

BEGIN

    DELETE FROM ap.application_documents
    WHERE application_id in (select application_id from ap.applications where application_process_id = p_application_processes);

    UPDATE ap.application_processes
    SET main_application_id = null
    WHERE application_process_id = p_application_processes;

    DELETE FROM ap.applications
    WHERE application_process_id = p_application_processes;

    DELETE FROM ap.application_process_contents
    WHERE application_process_id = p_application_processes;

    DELETE FROM ap.application_processes
    WHERE application_process_id = p_application_processes;

END;
$body$
LANGUAGE 'plpgsql'
VOLATILE
CALLED ON NULL INPUT
SECURITY INVOKER
COST 100;

ALTER FUNCTION dev.f_application_processes_delete_all (p_application_processes bigint)
  OWNER TO epzeu_dev;