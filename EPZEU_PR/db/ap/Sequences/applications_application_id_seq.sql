CREATE SEQUENCE ap.applications_application_id_seq
  INCREMENT 1 MINVALUE 1
  MAXVALUE 9223372036854775807 START 1
  CACHE 1;

ALTER SEQUENCE ap.applications_application_id_seq RESTART WITH 14;
