
alter table ap.application_documents add column document_type_id2 varchar(50);

COMMENT ON COLUMN ap.application_documents.document_type_id2
IS 'Тип на приложения документ';

update ap.application_documents
set
	document_type_id2 = cast(document_type_id as varchar);

alter table ap.application_documents drop column document_type_id;
alter table ap.application_documents rename column document_type_id2 to document_type_id;
