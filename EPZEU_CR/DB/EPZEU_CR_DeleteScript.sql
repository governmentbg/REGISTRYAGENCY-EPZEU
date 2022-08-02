TRUNCATE TABLE ap.application_processes, ap.application_process_contents, ap.applications, ap.application_documents, ap.application_processes;

TRUNCATE TABLE sys.service_operations; 

DELETE FROM usr.app_users WHERE cin <> 1;