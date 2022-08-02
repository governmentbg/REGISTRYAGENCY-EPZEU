CREATE TABLE nom.s_service_types (
  service_type_id SMALLINT NOT NULL,
  description VARCHAR,
  CONSTRAINT s_service_types_pkey PRIMARY KEY(service_type_id)
) 
WITH (oids = false);

ALTER TABLE nom.s_service_types
  ALTER COLUMN service_type_id SET STATISTICS 0;

COMMENT ON TABLE nom.s_service_types
IS 'Вид на услуга';

COMMENT ON COLUMN nom.s_service_types.service_type_id
IS 'Идентификатор на вид услуга';

COMMENT ON COLUMN nom.s_service_types.description
IS 'Описание на вид услуга';
